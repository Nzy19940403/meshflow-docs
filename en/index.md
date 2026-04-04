---
# VitePress 首页配置: https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MeshFlow Core"
  text: "Bringing Determinism Back to Topological Scheduling"
  tagline: A reactive topological scheduling engine powered by Logic Force Fields. Eliminating asynchronous race conditions and computational redundancy in complex state evolutions.
  image:
    src: /logo.svg
    alt: MeshFlow Logo
  actions:
    - theme: brand
      text: Get Started →
      link: /en/guide/getting-started
    - theme: alt
      text: Core Concepts
      link: /en/guide/setrule-concepts

features:
  - title: Watermark Scheduling
    details: Controls the execution sequence of directed operators via a logical watermark mechanism. Ensures strict ordered submission of asynchronous nodes, resolving the "old data overwriting new data" race condition at its root.
    icon: 🌊
  - title: Logic Force Field & Entanglement (UseEntangle)
    details: Introduces the "Logic Force Field" concept. By submitting state proposals within the same computation cycle, it transforms spatial circular dependencies into linear evolution on the timeline. Allows complex, mutually causal network relationships to spontaneously oscillate and eventually converge to an equilibrium state with the lowest entropy.
    icon: 🔗
  - title: Intelligent Path Pruning
    details: Utilizes a memoized "Bucket Computation" mechanism to automatically identify invalid mutations and truncate propagation paths, achieving true computation minimization and high-performance responsiveness.
    icon: ⚡
  - title: Framework Agnostic & Ultra-Lightweight
    details: Zero external dependencies, weighing only ~10kB (zipped). Provides a unified trigger signal interface, seamlessly adapting to Vue, React, or vanilla JavaScript projects.
    icon: 📦

---

## Why Choose MeshFlow?

In complex business systems, data evolution is often intertwined with asynchronous race conditions and circular dependencies. When handling **diamond dependencies** or **bidirectional constraints**, traditional event-listening patterns (Watch / EventEmitter) quickly drag the system into unpredictable chaos.

### ⚡ Scenario 1: Deterministic Causal Flow (`SetRule`)
**Typical Case: Order Price Calculation (Async I/O + Cascading Updates)**

> **Traditional Pattern (Collision & Diffusion)**:
> Changes in base price trigger a "discount request" and simultaneously a "shipping calculation". Due to network jitter, a "high discount result" sent earlier might return later than a "low discount result". Ultimately, old data overwrites new data, causing calculation errors.
>
> **MeshFlow Pattern (Execution Tracks)**:
> Orchestrates logic into a directed topology. It utilizes **Watermark Scheduling** to lock the execution sequence: no matter when the async request returns, the engine only allows results that match the logical timeline to be submitted. This ensures that no matter how long the chain or how slow the network is, the final state remains **deterministic** and **atomic**.

### 🔗 Scenario 2: Entanglement Pattern (`UseEntangle`)
**Typical Case: Multi-dimensional Unit Sync / Complex Form Linkage**

> **Traditional Pattern (Recursive Deadlock)**:
> Celsius and Fahrenheit listen to each other. Changing A triggers B, and B's update reversely triggers A. To prevent infinite recursion, developers must manually maintain numerous logical locks. The code becomes bloated and extremely prone to crashing in complex mesh linkages.
>
> **MeshFlow Pattern (Force Field Homeostasis)**:  
> Allows flexible combination of causal flows and constraint fields. You can define "Celsius drives Fahrenheit" as the dominant rule, while setting "Fahrenheit syncs Celsius" as a **Force Field Entanglement**.
> - **Unified Proposal Mechanism**: In MeshFlow's force field, state mutations are no longer brutal, direct overwrites (`Set`), but are submitted as "proposals".
> - **Automatic Convergence**: "Logical dead loops" in space are flattened into "linear evolution" on the timeline. The system calculates the resultant pull of all entangled nodes. As long as reasonable damping is set, the massive topology network will spontaneously approach the stable point of lowest entropy, much like solving a Sudoku puzzle. In cases of extreme conflict, the system safely lands upon reaching the fuse depth (circuit breaker) to prevent infinite loops.