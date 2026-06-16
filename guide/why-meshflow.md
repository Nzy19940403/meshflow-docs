---
title: 为什么选择 MeshFlow
aside: true
---

<script setup>
import StartFlow from '../components/StartFlow.vue';
import StartDemo from '../components/startDemo.vue';
</script>

# 为什么选择 MeshFlow

MeshFlow 并不是一个普通的状态管理库，而是一个**响应式任务编排引擎**。

在业务开发中，我们真正头疼的往往不是“如何保存一个变量”，而是“当多个变量和异步任务相互交织时，如何保证它们按正确的顺序执行，而不产生脏数据或死循环”。

MeshFlow 的核心价值就在于：**它将逻辑联动抽象为一组自动执行的多米诺骨牌。通过定义拓扑或纠缠关系，你只需推倒第一块骨牌，引擎便会自动调度后续所有受影响的节点。无论逻辑链路多么错综复杂，你都无需手动维护繁琐的中间调度代码。**

---

## ⚡️ 互动演示：非对称管线的调度难题

> **点击下方沙盒的“播放”按钮**，观察当源节点 **A** 发生更新时，一条包含长短链路（B 链路极短，C ➔ D 链路较长）的非对称管线会发生什么。

<ClientOnly>
  <StartFlow />
</ClientOnly>

### 💡 深度解析：动画背后的核心价值

刚才的动画并不是一个简单的延时特效，它展示了 MeshFlow 调度内核正在解决前端响应式编程里最臭名昭著的难题：**时间差陷阱**。

请观察节点 **B** 和节点 **D** 到达 **E** 的路径长度。它们天然存在“时差”。

#### ❌ 传统响应式的灾难
   ```ts
   // 传统做法：手动写锁，极易产生 Bug
   let isBReady = false, isDReady = false;
   watch(B, () => { isBReady = true; checkE(); });
   watch(D, () => { isDReady = true; checkE(); });
   function checkE() { if(isBReady && isDReady) runE(); }
   ```
::: info 
如果使用传统的 `watch`、`useEffect` 或事件总线（EventBus），当节点 **A** 发生更新时，系统会毫无秩序地“狂奔”。

1，**脏读与冗余废算** ：即使没有异步，跑得快的 B 也会先触发 E，导致 E 拿到了“新 B + 老 D”的错误组合。这不仅会导致 UI 无意义的闪烁，还让系统白白浪费算力进行无效重算。

2，**并发竞态陷阱** ：如果用户频繁触发 A，旧的异步任务 B 晚返回时，可能恰好重置了 isBReady，导致新任务的计算逻辑被“抢跑”的旧数据污染（幽灵数据覆盖）。

3，**失控的胶水逻辑** ：真实的业务逻辑（runE）被淹没在了无意义的布尔值标志位中。一旦依赖节点增加到 5 个、10 个，这种手动对齐逻辑将彻底丧失可维护性。
 
:::  
 
---

### ✅ MeshFlow 的解法：声明式拓扑编排

在 MeshFlow 的逻辑力场中，你**永远不需要手写状态锁**。你只需像搭积木一样，把节点间的因果关系声明出来，底层内核会自动构建出一张严密的有向无环图（DAG），并接管所有的调度：

```ts
// 🌟 只需要声明因果轨道，彻底告别防御性代码

// 链路 1：A -> B (假设这是一个耗时极短的异步请求)
engine.config.SetRules(['node-A'], 'node-B', 'value', {
  logic: async ({ slot }) => fetchQuickDataB(slot.triggerTargets[0].value)
});

// 链路 2：A -> C -> D (假设这是一条极其漫长且复杂的计算链路)
engine.config.SetRules(['node-A'], 'node-C', 'value', {
  logic: ({ slot }) => complexCalculateC(slot.triggerTargets[0].value)
});
engine.config.SetRules(['node-C'], 'node-D', 'value', {
  logic: async ({ slot }) => fetchHeavyDataD(slot.triggerTargets[0].value)
});

// 🎯 终点汇聚：B & D -> E
engine.config.SetRules(['node-B', 'node-D'], 'node-E', 'value', {
  logic: ({ slot }) => {
    // ✋ 引擎绝对担保：不管 B 有多快，不管 D 有多慢，不管用户多频繁地触发 A
    // 这里的逻辑永远只会在 B 和 D 在同一个 Epoch（纪元）内 100% 绝对对齐后，执行唯一的一次！
    const [valB, valD] = slot.triggerTargets;
    return valB.value + valD.value;
  }
});

```

**发生了什么魔法？**

* **自动测绘拓扑海拔**：当你写下这 4 个 `SetRules` 时，MeshFlow 已经在内部建立好了物理模型，它知道 E 的海拔最低，必须最后执行。
* **水位线对齐 (Watermark)**：MeshFlow 内部的 Epoch 纪元机制接管了时序。当 B 算完而 D 还没算完时，引擎会死死把 B 的数据按在栅栏前（自动挂起），绝不触发 E 的脏读。
* **反应性剪枝 (Pruning)**：如果某一次 A 的变动，导致计算出的 C 值与上次完全一样（没有产生语义位移），引擎会瞬间在 C 节点切断传导，后续的 D 和 E 连门都不会被敲响，实现了**极高精度的无用算力裁剪**。

> **把繁琐的时序对齐交还给引擎底层，把纯粹的业务逻辑还给开发者。**

---
<ClientOnly>
 <StartDemo/>
</ClientOnly>
 