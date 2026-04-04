---
title: 🚀 快速开始
aside: true
---

# 🚀 快速开始

#### 1.安装核心

```bash
npm install @meshflow/core
```

#### 2. 架构理念：Headless 与信号驱动

MeshFlow 采用完全的 Headless 设计，核心逻辑与表现层（View）物理隔离。通过 UITrigger 配置，您可以为逻辑节点注入 Dirty Signal（脏检查信号）。

当拓扑网络中的节点状态发生演化时，信号会被精准触发，从而驱动 Vue 或 React 进行原子级的局部视图更新。

#### 3. 逻辑编排：自定义注册模块
在 MeshFlow 中，数据注册是通过“协议模块”实现的。你可以针对特定业务（如表单、画布）实现自己的注册逻辑。下面是一个基于计费场景的基础注册模块实现：

```typescript
import { useScheduler, MeshPath } from "@meshflow/core";

function useInternalForm<T, P extends MeshPath>(
  scheduler: ReturnType<typeof useScheduler<T, P>>,
  rootSchema: any
) {
  // 注册根节点 Group
  const billingGroup = scheduler.registerGroupNode({
    path: "billing" as P,
    type: "group",
    children: [
      "billing.count",
      "billing.price",
      "billing.totalPrice",
      "billing.priceDetail",
    ] as P[],
    meta: rootSchema,
  });

  // 批量注册叶子节点
  const renderedChildren = rootSchema.children.map((field: any) => {
    const currentPath = `billing.${field.name}` as P;
    const node = scheduler.registerNode({
      path: currentPath,
      type: field.type,
      state: { value: field.value },
      meta: field,
      notifyKeys: new Set(),
    });
    return node.createView();
  });

  const uiSchema = billingGroup.createView({
    children: renderedChildren,
  });

  const GetFormData = () => {
    return {
      billing: {
        count: scheduler.GetNodeByPath("billing.count" as P).state.value,
        price: scheduler.GetNodeByPath("billing.price" as P).state.value,
        totalPrice: scheduler.GetNodeByPath("billing.totalPrice" as P).state
          .value,
        priceDetail: scheduler.GetNodeByPath("billing.priceDetail" as P).state
          .value,
      },
    };
  };

  return { uiSchema, GetFormData };
}
```

#### 4. 激活逻辑大脑
利用注册模块完成原始数据的注入。此时，MeshFlow 将作为整个系统的“计算大脑”接管所有状态的调度。

::: code-group

```typescript [Vue]
import { ref } from "vue";
import { useMeshFlow } from "@meshflow/core";

const schema = {
  type: "group",
  name: "billing",
  label: "计费与汇总",
  children: [
    { type: "number", name: "count", label: "购买数量", value: 1 },
    { type: "number", name: "price", label: "单价", value: 1000 },
    { type: "number", name: "totalPrice", label: "预估月度总价", value: 0 },
    {
      type: "input",
      name: "priceDetail",
      label: "计费项说明",
      value: "基础配置费用",
    },
  ],
};
const engine = useMeshFlow("engine", schema, {
  UITrigger: {
    // Vue 响应式绑定
    signalCreator: () => ref(0),
    signalTrigger(signal) {
      signal.value++;
    },
  },
  modules: {
    useInternalForm,
  },
});
```

```typescript [React]
import { useState } from "react";
import { useMeshFlow } from "@meshflow/core";

const schema = {
  type: "group",
  name: "billing",
  label: "计费与汇总",
  children: [
    { type: "number", name: "count", label: "购买数量", value: 1 },
    { type: "number", name: "price", label: "单价", value: 1000 },
    { type: "number", name: "totalPrice", label: "预估月度总价", value: 0 },
    {
      type: "input",
      name: "priceDetail",
      label: "计费项说明",
      value: "基础配置费用",
    },
  ],
};
const engine = useMeshFlow("main", schema, {
  UITrigger: {
    signalCreator: () => {
      const [_, setTick] = useState(0);
      return () => setTick((t) => t + 1);
    },
    signalTrigger(trigger) {
      trigger();
    },
  },
  modules: {
    useInternalForm,
  },
});
```

:::

#### 5. 建立因果轨道 (SetRules)
在 MeshFlow 中，联动不再是碎片化的事件监听，而是有序的因果链条。水位线机制确保了无论逻辑链路多深，每一帧演化都是确定且原子的。

```typescript
// 轨道一：count * price -> totalPrice
engine.config.SetRules(
  ["billing.count", "billing.price"],
  "billing.totalPrice",
  "value",
  {
    logic: ({ slot }) => {
      const [count, price] = slot.triggerTargets;

      return count.value * price.value;
    },
    triggerKeys: ["value"],
  }
);

// 轨道二：totalPrice -> priceDetail
engine.config.SetRule("billing.totalPrice", "billing.priceDetail", "value", {
  logic: ({ slot }) => {
    const [total] = slot.triggerTargets;
    return total.value > 5000 ? "大客户特惠折扣价" : "基础配置费用";
  },
  triggerKeys: ["value"],
});

// 激活首屏全量演化
engine.config.notifyAll();
```
#### 6. 确定性演化演示
下面的交互 Demo 展示了上述代码的实际运行效果。当 Input 变更时，调用节点的 dependOn 函数，MeshFlow 内部的演化算法将自动开启新一轮的拓扑结算。
<ClientOnly>
<QuickStart></QuickStart>
</ClientOnly>

::: tip  
对于普通业务表单，可以直接使用 @meshflow/form。它在 Core 之上提供了注册逻辑，能以更低的开发成本实现复杂的校验与联动。
:::

<script setup>
import  QuickStart from '../components/quickStart.vue'
</script>
