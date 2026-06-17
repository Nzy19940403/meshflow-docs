---
title: Why MeshFlow
aside: true
---

<script setup>
import StartFlow from '../../components/startFlow.vue';
import StartDemo from '../../components/startDemo.vue';
</script>

# Why MeshFlow

MeshFlow is not an ordinary state management library — it's a **reactive task orchestration engine**.

In real-world development, the hard part isn't "how to store a variable." It's "when multiple variables and async tasks are intertwined, how do I guarantee they execute in the correct order without producing dirty data or infinite loops?"

MeshFlow's core value: **it abstracts logic linkage into a set of automatically executing dominoes. By defining topological or entanglement relationships, you push the first domino and the engine automatically schedules every affected node downstream — no matter how complex the chain, no manual scheduling glue required.**

---

## ⚡️ Interactive Demo: The Asymmetric Pipeline Problem

> **Click "Next" or "Auto Play"** to observe what happens when source node **A** updates across an asymmetric pipeline — one short path through B and a long path through C → D.

<ClientOnly>
  <StartFlow lang="en" />
</ClientOnly>

### 💡 Deep Dive: What the Animation is Actually Showing

This isn't a fancy delay effect. It demonstrates MeshFlow's scheduling core solving one of the most notorious problems in frontend reactive programming: **the time-gap trap**.

Notice that **Node B** and **Node D** reach **E** via paths of very different lengths. A natural timing gap exists between them.

#### ❌ The Traditional Reactive Disaster

```ts
// Traditional approach: manual locks, extremely bug-prone
let isBReady = false, isDReady = false;
watch(B, () => { isBReady = true; checkE(); });
watch(D, () => { isDReady = true; checkE(); });
function checkE() { if (isBReady && isDReady) runE(); }
```

::: info
With traditional `watch`, `useEffect`, or EventBus, when Node **A** updates, the system races uncontrollably:

1. **Dirty reads & wasted computation** — Even without async, the faster B fires E first, giving E a "new B + old D" combination. This causes meaningless UI flickers and burns CPU on invalid recalculations.

2. **Concurrent race conditions** — If the user rapidly triggers A, a slow-returning old async task for B might reset `isBReady` at the wrong moment, polluting the new task's computation with stale data (ghost data overwrite).

3. **Uncontrollable glue logic** — The real business logic (`runE`) gets buried in meaningless boolean flags. Once you have 5, 10 dependent nodes, this manual alignment approach becomes completely unmaintainable.
:::

---

### ✅ MeshFlow's Solution: Declarative Topology Orchestration

In MeshFlow's Logic Force Field, **you never write state locks**. You simply declare the causal relationships between nodes like building blocks, and the engine automatically constructs a strict DAG and takes over all scheduling:

```ts
// 🌟 Just declare the causal tracks — zero defensive code needed

// Track 1: A -> B (assume a very fast async request)
engine.config.SetRules(['node-A'], 'node-B', 'value', {
  logic: async ({ slot }) => fetchQuickDataB(slot.triggerTargets[0].value)
});

// Track 2: A -> C -> D (assume a long, complex computation chain)
engine.config.SetRules(['node-A'], 'node-C', 'value', {
  logic: ({ slot }) => complexCalculateC(slot.triggerTargets[0].value)
});
engine.config.SetRules(['node-C'], 'node-D', 'value', {
  logic: async ({ slot }) => fetchHeavyDataD(slot.triggerTargets[0].value)
});

// 🎯 Final convergence: B & D -> E
engine.config.SetRules(['node-B', 'node-D'], 'node-E', 'value', {
  logic: ({ slot }) => {
    // ✋ The engine absolutely guarantees: no matter how fast B is,
    // no matter how slow D is, no matter how often A is triggered —
    // this logic fires exactly ONCE, only after B and D are 100%
    // aligned within the same Epoch.
    const [valB, valD] = slot.triggerTargets;
    return valB.value + valD.value;
  }
});
```

**What's happening behind the scenes?**

- **Automatic topology mapping** — The moment you write these 4 `SetRules`, MeshFlow builds an internal physical model. It knows E has the lowest elevation and must execute last.
- **Watermark alignment** — MeshFlow's internal Epoch mechanism takes over sequencing. When B finishes but D hasn't, the engine holds B's data at the barrier — it absolutely will not trigger E's dirty read.
- **Reactive pruning** — If a change in A results in C computing the same value as last time (no semantic displacement), the engine instantly cuts transmission at C. D and E are never even knocked on, achieving **high-precision elimination of wasted computation**.

> **Hand the tedious timing alignment back to the engine. Return pure business logic to the developer.**

---

<ClientOnly>
  <StartDemo lang="en" />
</ClientOnly>
