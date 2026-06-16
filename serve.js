var http = require('http');
var https = require('https');
var { spawn } = require('child_process');

var CONFIG = {
    PORT: 39335,
    HERMES_PATH: process.env.HERMES_PATH ||
        'C:/Users/Administrator/AppData/Local/hermes/hermes-agent/venv/Scripts/hermes.exe',
    TIMEOUT_MS: 600000,
    SESSION_MODE: 'resume',
    SESSION_NAME: 'discord',
    PROGRESS_INTERVAL_MS: 10000,
};

var requestQueue = [];
var processing = false;

function ts() { return new Date().toISOString().split('T')[1].split('.')[0]; }
function log(l, m) { console.log('[' + ts() + '] [' + l + '] ' + m); }

function dreq(appId, token, method, path, content) {
    return new Promise(function(ok) {
        var data = JSON.stringify({ content: content.substring(0, 1950) });
        var req = https.request({
            hostname: 'discord.com',
            path: '/api/v10/webhooks/' + appId + '/' + token + path,
            method: method,
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
        }, function(r) { r.on('end', function() { ok(r.statusCode); }); });
        req.on('error', function() { ok(0); });
        req.write(data); req.end();
    });
}
function dedit(a, t, c) { return dreq(a, t, 'PATCH', '/messages/@original', c); }
function dpost(a, t, c) { return dreq(a, t, 'POST', '', c); }

async function sendResult(appId, token, content) {
    var chunks = [], r = content;
    while (r.length > 0) { chunks.push(r.substring(0, 1950)); r = r.substring(1950); }
    for (var i = 0; i < chunks.length; i++) {
        if (i === 0) await dedit(appId, token, chunks[i]);
        else await dpost(appId, token, chunks[i]);
    }
    log('INFO', 'Delivered ' + chunks.length + ' chunks');
}

function extractProgress(text) {
    var m = text.match(/(\d+[.\d]*[KMB]?)\s*\/\s*(\d+[.\d]*[KMB]?)/);
    if (m) return m[1] + '/' + m[2] + ' tokens';
    return null;
}

function buildPrompt(userMsg) {
    var m = userMsg.trim();
    if (m.indexOf('[DISCORD]') === 0) return m;
    return '[DISCORD] You are replying inside Discord. Format for Discord Markdown: use **bold** for emphasis, *italic* for subtle, ```lang ... ``` for code, > for quotes. Keep paragraphs short (2-4 lines). Avoid complex tables. Max ~1800 chars per reply.\nUser message: ' + m;
}

function runOneshot(message, onProg) {
    return new Promise(function(resolve, reject) {
        var prompt = buildPrompt(message);
        var args = ['-z', prompt];
        var env = Object.assign({}, process.env, { PYTHONUNBUFFERED: '1' });
        if (CONFIG.SESSION_MODE === 'resume') args.unshift('--resume', CONFIG.SESSION_NAME);

        log('INFO', 'Spawning: ' + message.substring(0, 80));

        var proc = spawn(CONFIG.HERMES_PATH, args, {
            env: env, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
        });

        var stdout = '', stderr = '', lastProg = Date.now();

        proc.stdout.on('data', function(c) { stdout += c.toString(); });

        proc.stderr.on('data', function(c) {
            stderr += c.toString();
            var now = Date.now();
            if (onProg && now - lastProg > CONFIG.PROGRESS_INTERVAL_MS) {
                lastProg = now;
                onProg(extractProgress(stderr));
            }
        });

        var timer = setTimeout(function() { proc.kill(); reject(new Error('Timeout')); }, CONFIG.TIMEOUT_MS);

        proc.on('error', function(e) { clearTimeout(timer); log('ERROR', 'Spawn: ' + e.message); reject(e); });

        proc.on('close', function(code) {
            clearTimeout(timer);
            resolve(stdout.trim() || stderr.trim() || ('Hermes exited ' + code));
        });
    });
}

function processQueue() {
    if (requestQueue.length === 0 || processing) return;
    processing = true;

    var item = requestQueue.shift();
    var startTime = Date.now();
    var lastText = '', extra = '';

    function tick(info) {
        if (info) extra = info;
        if (!item.appId || !item.token) return;
        var elapsed = Math.floor((Date.now() - startTime) / 1000);
        var text = ':clock3: Working... (' + elapsed + 's';
        if (extra) text += ', ' + extra;
        text += ')';
        if (text !== lastText) { lastText = text; dedit(item.appId, item.token, text); }
    }

    var timer = setInterval(function() { tick(null); }, CONFIG.PROGRESS_INTERVAL_MS);
    tick('initializing');

    runOneshot(item.message, function(info) { tick(info); }).then(function(reply) {
        clearInterval(timer);
        processing = false;
        log('DONE', reply.length + ' chars, ' + Math.floor((Date.now() - startTime) / 1000) + 's');
        if (item.appId && item.token) { sendResult(item.appId, item.token, reply).then(function() { processQueue(); }); }
        else processQueue();
    }).catch(function(err) {
        clearInterval(timer);
        processing = false;
        if (item.appId && item.token) { sendResult(item.appId, item.token, ':x: ' + err.message).then(function() { processQueue(); }); }
        else processQueue();
    });
}

var server = http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', queue: requestQueue.length, processing: processing }));
        return;
    }
    if (req.method === 'POST' && req.url === '/webhook') {
        var body = '';
        req.on('data', function(c) { body += c.toString(); });
        req.on('end', function() {
            try {
                var p = JSON.parse(body);
                var m = p.message || p.content || p.text || '';
                if (!m) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Missing message' })); return; }
                log('REQUEST', '-> ' + m.substring(0, 120));
                requestQueue.push({ message: m.trim(), appId: p.discord_app_id || '', token: p.discord_token || '' });
                if (!processing) processQueue();
                res.writeHead(202, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'accepted' }));
            } catch (e) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Invalid JSON' })); }
        });
        return;
    }
    res.writeHead(404); res.end('Not Found');
});

server.listen(CONFIG.PORT, function() {
    console.log('='.repeat(55));
    console.log('  Hermes Pipeline Server');
    console.log('  Port: ' + CONFIG.PORT + ' | Session: ' + CONFIG.SESSION_NAME);
    console.log('  Discord formatting: enabled');
    console.log('='.repeat(55));
});

function shutdown() {
    log('INFO', 'Shutting down...');
    server.close(function() { log('INFO', 'Closed.'); process.exit(0); });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
