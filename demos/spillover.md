---
outline: deep
aside: false
---
 
<script setup>
// 请确保路径指向你实际的组件位置
import SpilloverComponent from '../components/spillover.vue'
</script>

## 优先级溢流调度 (Priority Spillover)

在 **MeshFlow** 体系中，UI 布局被建模为一套 **分布式资源调度系统 (Distributed Resource Scheduling)**。

本示例展示了引擎如何处理 **确定性抢占 (Deterministic Preemption)** 逻辑：每一个 **Cell** 的物理位移，本质上是拓扑图中纠缠关系的 **状态收敛 (State Convergence)**。当资源（Zone Capacity）受限时，引擎通过高优抢占与自动溢流，确保逻辑拓扑始终处于全局最优解。

<div class="demo-container">
  <SpilloverComponent />
</div>

<style>
.demo-container {
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}
</style>

## 🏗️ 架构分层 (Architectural Layers)

为了实现复杂场景下的数据一致性，我们将调度逻辑拆分为三个解耦的响应层：

::: tip 1. 资源状态层 (Resource Sensing / Zones)
**Zone** 是系统的“传感器”。它并不直接控制格子，而是实时聚合内部所有 **Cell** 的负载权重，并向全局广播当前的 **容量百分比 (Capacity)**。当水位溢出时，它会触发系统的“压力响应”。
:::

::: warning 2. 中央调度层 (Global Arbitration / Judge)
**中央法官** 是系统的“决策大脑”。它同时监听所有 Zone 的压力信号与公海池的待命队列。其核心职责仅有一个：执行 **Parent Reassignment（父级重分配）**。
根据 **UID（优先级）** 策略，法官会强制修改格子的归属权，决定谁该留下，谁该被剔除回缓冲区。
:::

::: info 3. 局部布局层 (Autonomous Local Positioning / Cells)
**Cell** 是布局的“自治执行者”。物理坐标的计算完全是 **去中心化** 的。
格子并不关心法官在想什么，它只通过 `useEntangle` 监听自己的 `parent` 和 **兄弟节点 (Siblings)** 的位置。一旦归属权发生变化，它会立即启动局部纠缠，自发寻找到新的排队坐标。
:::

---

## ⚖️ 调度算法深度解析 (Deep Dive)

| 核心法则 | 内部机制 (Internal Logic) | 工业价值 |
| :--- | :--- | :--- |
| **顺序准入** | **Sequential Admission**：后续节点仅在排头兵进入稳态后才激活纠缠。 | **Zero-Oscillation**：彻底消除复杂拓扑下的画面震荡。 |
| **反应式位移** | **Reactive Displacement**：节点通过监听前序 `pos` 快照，自发执行空间补偿。 | **Decentralized Layout**：无需中心计算，节点间自发对齐。 |
| **强权置换** | **Priority Preemption**：当容量满载，高优节点强制执行“末位淘汰”。 | **Resource Guarantee**：确保关键任务的物理运行空间。 |

---
 
## 🎮 交互实验清单 (Interactive Guide)

1. **动态扩容 (Dynamic Scaling)**：点击 Zone 的 **[ + ] / [ - ]**，观察格子如何像流体一样在不同容器间自动迁移。
2. **流水线负载 (Pipeline Simulation)**：开启 **[ 启动流水线 ]**，观察 Cell 在消耗完工作量（Workload）后如何优雅消亡，并触发全链路的 **Dynamic Refilling（自动补货）**。
3. **全局坍缩 (State Reset)**：点击 **[ 重新洗牌 ]**，见证引擎如何在 100ms 内完成数十个节点的依赖重组与重绘。

---
 
 
 