---
title: 🧠 Core Principles
---
# 🧠 Core Principles

The core design goal of MeshFlow is singular: **to ensure absolute "causal determinism" in the state evolution of complex topological networks.**

The "Logic Force Field" is not a fictional theory, but a design model that **abstracts logic into physical potential energy**. In the causal flow centered around `SetRule`, MeshFlow simulates the spontaneous convergence of the physical world through the following dimensions:

## 1. Logical Depth = Physical Height (Topological Gradient)
**Problem Solved: How do complex dependency paths unfold in an orderly manner?**

In MeshFlow, every node resides at a different "altitude." The causal relationships between nodes form a strict **DAG (Directed Acyclic Graph)**.
- **Gravitational Tracks**: The sequence defined by `SetRule` essentially establishes "gravitational tracks" across the network, flowing from high to low. The engine assigns all nodes to different execution Layers, ensuring that the physical execution order of logical downstream nodes strictly follows the upstream ones.
- **Spontaneous Evolution**: Once the source data changes, the system utilizes this "potential energy difference" to drive data automatically downstream along the topological paths, just like water flowing, without manual triggering. This is the foundational physical rule to eliminate redundant computations caused by "diamond dependencies."

## 2. Watermark Scheduling: Controlling the Rhythm of Evolution
**Problem Solved: How to prevent nodes from "jumping the gun" when data is unaligned?**

If gravitational tracks determine the **direction of flow**, then the watermark acts as the **floodgate**.
- **Synchronization Barrier**: Even if an upstream node at a high watermark finishes computing and attempts to flow downstream, the watermark mechanism intercepts it at key junctions. It verifies whether all dependencies of the downstream node have accumulated to a "committable" watermark within the current evolution cycle.
- **Anti-Premature Execution**: The watermark ensures that downstream nodes are absolutely never triggered during an "out-of-step" moment where some upstream nodes are updated while others remain in an old state. This completely eradicates logical "dirty reads" and intermediate state oscillations.

## 3. Reactive Pruning and Displacement Perception
**Problem Solved: How to minimize computation density and truncate invalid ripples?**

Not all changes need to send shockwaves across the entire network. MeshFlow truncates invalid causal propagation through "mutation declarations" and "displacement detection," much like setting up a drought sensor on a gravitational track.
- **Precise Reactive Surface (`notifyKeys`)**: When registering a node, you can define precise "perception windows."
    - **Fully Sensitive (Default)**: If `notifyKeys` is not specified, any change in the node's state will cascade downstream.
    - **Surgical Updates**: By explicitly declaring `notifyKeys`, the floodgates open only when specific keys shift. This significantly reduces topological oscillations when handling large nodes with complex metadata.
- **Semantic Displacement Pruning (Path Pruning)**: Even if a node is awakened and completes its computation, the engine still compares its output fingerprint. If the computation yields no substantial semantic displacement (the value remains unchanged), the engine immediately **truncates the path**, and the subsequent gravitational tracks remain completely silent.
- **Manual Forced Bypass (`forceNotify`)**: In specific business scenarios, developers can call the `forceNotify` method to forcefully whip up waves and awaken downstream evolution, regardless of whether the node's state has substantially changed.

## 4. Version Tokens: Defending Against Spatiotemporal Dislocation
**Problem Solved: How to ensure slow asynchronous tasks do not overwrite the new values from fast tasks?**

In asynchronous linkages, the "late arrival of old values" (Race Conditions) is a common occurrence. MeshFlow safeguards state consistency via **Version (Logical Version)** and **Token (Execution Token)**:
- **Logical Clock**: Every drop triggered by the source generates a globally incrementing `Version`.
- **Token Validation**: Asynchronous tasks carry the current `Version Token` upon initiation. When a task completes and prepares to submit its result, the engine validates the token. If it detects that a higher version has already been generated (meaning newer currents have washed over), the legacy asynchronous result is **forcefully discarded**, ensuring the state always converges towards the latest logical endpoint.

## 5. Static Cycle Fusing (Cycle Detection)
**Problem Solved: Zero tolerance for anti-gravity logical infinite loops.**

In pure causal evolution (`SetRule`), the flow of time and gravity is unidirectional, much like a waterfall that cannot flow backward.
- MeshFlow conducts strict **Directed Acyclic Graph (DAG) validation** after rule orchestration is complete and before official execution begins.
- The moment it detects a head-to-tail circular dependency in the causal chain (an attempt to make water flow uphill), the engine will directly throw an exception and blow the fuse on the deduction, eradicating memory overflows and infinite recursion at the root.