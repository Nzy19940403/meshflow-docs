// ================================================================
// Hermes Discord Bot — Cloudflare Worker
// ================================================================
// Supports two commands:
//   /chat   — talk to DeepSeek API directly
//   /hermes — route through CF Tunnel to your local Hermes (SSE streaming)
//
// Environment variables (set in wrangler.toml or CF Dashboard):
//   DISCORD_PUBLIC_KEY    — from Discord Developer Portal
//   DISCORD_APPLICATION_ID — your bot's application ID
//   DISCORD_BOT_TOKEN     — for editing messages (needed for streaming)
//   DEEPSEEK_API_KEY      — DeepSeek API key (for /chat)
//   HERMES_TUNNEL_URL     — CF Tunnel URL pointing to localhost:39335
//                            e.g. https://hermes.yourdomain.com
// ================================================================

// ----- polyfill for crypto.subtle (CF Workers have it natively) -----
const subtleCrypto = globalThis.crypto?.subtle || crypto.subtle;

// ----- Discord interaction types -----
const InteractionType = { PING: 1, APPLICATION_COMMAND: 2 };
const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
};

// ----- Slash command definitions -----
const HERMES_COMMAND = {
  name: "hermes",
  description: "Send a task to your local Hermes Agent (streaming)",
  options: [
    {
      name: "message",
      description: "What do you want Hermes to do?",
      type: 3, // STRING
      required: true,
    },
  ],
};

const CHAT_COMMAND = {
  name: "chat",
  description: "Chat with DeepSeek AI",
  options: [
    {
      name: "message",
      description: "Your message",
      type: 3,
      required: true,
    },
  ],
};

const ALL_COMMANDS = [HERMES_COMMAND, CHAT_COMMAND];

// ----- Ed25519 signature verification -----
function hexToU8(hex) {
  const matches = hex.match(/.{1,2}/g);
  if (!matches) throw new Error("Invalid hex");
  return new Uint8Array(matches.map((b) => parseInt(b, 16)));
}

function concatU8(a, b) {
  const merged = new Uint8Array(a.length + b.length);
  merged.set(a);
  merged.set(b, a.length);
  return merged;
}

async function verifyKey(body, signature, timestamp, publicKeyHex) {
  try {
    const timestampData = new TextEncoder().encode(timestamp);
    const bodyData = typeof body === "string" ? new TextEncoder().encode(body) : body;
    const message = concatU8(timestampData, bodyData);
    const publicKey = await subtleCrypto.importKey(
      "raw",
      hexToU8(publicKeyHex),
      { name: "ed25519", namedCurve: "ed25519" },
      false,
      ["verify"]
    );
    return await subtleCrypto.verify(
      { name: "ed25519" },
      publicKey,
      hexToU8(signature),
      message
    );
  } catch {
    return false;
  }
}

// ================================================================
// Discord message helpers — handles the 2000-char limit
// ================================================================
const DISCORD_MAX_CHARS = 1950; // safe margin below 2000
const webhookBase = (env, token) =>
  `https://discord.com/api/v10/webhooks/${env.DISCORD_APPLICATION_ID}/${token}`;

// Edit the @original (first) message
async function editOriginal(env, token, content) {
  const safe = content.substring(0, DISCORD_MAX_CHARS);
  await fetch(`${webhookBase(env, token)}/messages/@original`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: safe }),
  });
}

// Create a NEW follow-up message, returns its ID
async function createFollowUp(env, token, content) {
  const safe = content.substring(0, DISCORD_MAX_CHARS);
  const res = await fetch(`${webhookBase(env, token)}?wait=true`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: safe }),
  });
  if (!res.ok) return null;
  const msg = await res.json();
  return msg.id;
}

// Edit an existing follow-up message by ID
async function editFollowUp(env, token, messageId, content) {
  const safe = content.substring(0, DISCORD_MAX_CHARS);
  await fetch(`${webhookBase(env, token)}/messages/${messageId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: safe }),
  });
}

// Split content into ≤DISCORD_MAX_CHARS chunks, sync them to Discord.
// followUpIds is mutated — tracks existing follow-up message IDs for editing.
async function pushToDiscord(env, token, content, followUpIds) {
  const chunks = [];
  let remaining = content;
  while (remaining.length > 0) {
    chunks.push(remaining.substring(0, DISCORD_MAX_CHARS));
    remaining = remaining.substring(DISCORD_MAX_CHARS);
  }

  // Ensure at least one chunk
  if (chunks.length === 0) chunks.push("...");

  // First chunk always → @original
  await editOriginal(env, token, chunks[0]);

  // Overflow → follow-up messages
  for (let i = 1; i < chunks.length; i++) {
    if (followUpIds[i - 1]) {
      await editFollowUp(env, token, followUpIds[i - 1], chunks[i]);
    } else {
      const mid = await createFollowUp(env, token, chunks[i]);
      if (mid) followUpIds[i - 1] = mid;
    }
  }
}

// ================================================================
// Hermes callback client
// ================================================================
// CF Workers have a ~30s waitUntil limit on free plan.
// Instead of polling, we pass the Discord webhook token to serve.js.
// serve.js calls Discord directly when Hermes finishes — no Worker timeout.
async function fireAndForgetHermes(env, applicationToken, userMessage) {
  const tunnelUrl = env.HERMES_TUNNEL_URL || "https://agent.nzyhave.fun";

  // Immediately update Discord from default "正在响应" to "思考中..."
  try {
    await editOriginal(env, applicationToken, ":clock3: Thinking...");
  } catch (e) { /* non-critical */ }

  try {
    await fetch(`${tunnelUrl}/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        discord_app_id: env.DISCORD_APPLICATION_ID,
        discord_token: applicationToken,
      }),
    });
  } catch (e) {
    await editOriginal(env, applicationToken,
      `:x: Cannot reach Hermes tunnel: ${e.message}`);
  }
}

// ================================================================
// DeepSeek /chat handler (also chunked now)
// ================================================================
async function getDeepSeekReply(apiKey, message) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: message }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return `DeepSeek API error (${response.status}): ${err.substring(0, 500)}`;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "(DeepSeek returned empty response)";
}

// ----- Main Worker -----
export default {
  async fetch(request, env, ctx) {
    // ---------- CORS preflight ----------
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Signature-Ed25519, X-Signature-Timestamp",
        },
      });
    }

    const url = new URL(request.url);

    // ---------- GET / — health check ----------
    if (request.method === "GET" && url.pathname === "/") {
      return new Response(`Hermes Bot is running. App ID: ${env.DISCORD_APPLICATION_ID}`);
    }

    // ---------- GET /debug — dump env variable NAMES (for troubleshooting) ----------
    if (request.method === "GET" && url.pathname === "/debug") {
      const keys = Object.keys(env).sort();
      const info = {
        envKeys: keys,
        hasHERMES_TUNNEL_URL: keys.includes("HERMES_TUNNEL_URL"),
        HERMES_TUNNEL_URL_value: env.HERMES_TUNNEL_URL || "(empty/missing)",
        hasBOT_TOKEN: keys.includes("DISCORD_BOT_TOKEN"),
      };
      return new Response(JSON.stringify(info, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // ---------- POST / — Discord interactions ----------
    if (request.method === "POST" && url.pathname === "/") {
      // Verify Discord signature
      const signature = request.headers.get("X-Signature-Ed25519") || "";
      const timestamp = request.headers.get("X-Signature-Timestamp") || "";
      const rawBody = await request.text();

      const isValid = await verifyKey(
        rawBody,
        signature,
        timestamp,
        env.DISCORD_PUBLIC_KEY
      );

      if (!isValid) {
        return new Response("Invalid signature", { status: 401 });
      }

      const interaction = JSON.parse(rawBody);

      // PING
      if (interaction.type === InteractionType.PING) {
        return new Response(
          JSON.stringify({ type: InteractionResponseType.PONG }),
          { headers: { "Content-Type": "application/json" } }
        );
      }

      // APPLICATION_COMMAND
      if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        const { name, options } = interaction.data;
        const userMessage = options?.[0]?.value || "";
        const appToken = interaction.token;

        // ----- /chat (DeepSeek, non-streaming) -----
        if (name === "chat") {
          ctx.waitUntil(
            (async () => {
              const reply = await getDeepSeekReply(env.DEEPSEEK_API_KEY, userMessage);
              const content = `**Q:** ${userMessage}\n\n**A:** ${reply}`;
              await pushToDiscord(env, appToken, content, []);
            })()
          );

          return new Response(
            JSON.stringify({
              type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        }

        // ----- /hermes (local Hermes via CF Tunnel, callback) -----
        if (name === "hermes") {
          ctx.waitUntil(fireAndForgetHermes(env, appToken, userMessage));

          return new Response(
            JSON.stringify({
              type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ error: "Unknown command" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Unknown interaction type" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ---------- POST /register — register slash commands ----------
    // Visit this once to register commands with Discord:
    //   curl https://your-worker.workers.dev/register
    if (request.method === "POST" && url.pathname === "/register") {
      const results = [];
      for (const cmd of ALL_COMMANDS) {
        const res = await fetch(
          `https://discord.com/api/v10/applications/${env.DISCORD_APPLICATION_ID}/commands`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
            },
            body: JSON.stringify(cmd),
          }
        );
        results.push({
          command: cmd.name,
          status: res.status,
          body: await res.text(),
        });
      }
      return new Response(JSON.stringify(results, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
