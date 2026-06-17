---
aside: false
---

<script setup>
import MatrixComponent from '../../components/matrix.vue'
</script>

# Circular Dependency Convergence Demo

<ClientOnly>
    <MatrixComponent />
</ClientOnly>

## 🛠 Core Principles

### Proof of Timing-Independence (Determinism)

The key insight of this demo is that **MeshFlow's engine is completely unaffected by execution timing**.

**What you'll observe:** Whether you enable "Async Evolution" (which forces computation to be broken up via `setTimeout`) or disable it (synchronous, instant completion), the stable-state values the system converges to are identical within floating-point precision.

**Conclusion:** This proves that the engine's **Epoch (Epoch-based scheduling)** mechanism successfully isolates side effects. No matter how long the computation is stretched out, or how much async interference is present, the logical evolution path is absolutely deterministic.

#### Why does "Vacuum Ignition" produce 100% identical results?

When you click **🚀 Vacuum Ignition** (initial force fixed at N5=1000, all others at 0), the result is identical down to 16 decimal places every single time.

**Reason:** Because the **initial state (starting point)** and **formula topology (terrain)** are completely fixed.

**Path:** The floating-point errors and approximation paths the engine generates on each iteration are perfectly reproduced. Like a ball rolling from the exact same point on the rim of a bowl — the path it takes and where it finally comes to rest are identical every time.

**Live Interactive Demo:** [Open in StackBlitz Editor](https://stackblitz.com/edit/vitejs-vite-gy697u4z?file=src%2Fcomponents%2FHelloWorld.vue)
