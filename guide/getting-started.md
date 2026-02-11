---
title: 🚀 快速开始
---
 
# 🚀 快速开始

#### 安装
```bash
npm install @meshflow/core
``` 
#### 初始化引擎
MeshFlow 采用框架无关设计。通过 UITrigger 配置，您可以轻松将其与 Vue 的响应式系统（如 ref）或 React 的状态管理无缝绑定。

::: code-group

```typescript [Vue] 
import { ref } from 'vue';
import { useMeshFlow } from "@meshflow/core";

const schema = {
    type: 'group',
    name: 'billing',
    label: '计费与汇总',
    children: [
        { type: 'number', name: 'totalPrice', label: '预估月度总价', value: 0, },
        { type: 'input', name: 'priceDetail', label: '计费项说明', value: '基础配置费用'}
    ]
};
const engine = useMeshFlow('engine', schema, {
  UITrigger: {
    // Vue 响应式绑定
    signalCreateor: () => ref(0),
    signalTrigger(signal) { 
      signal.value++; 
    }
  }
});
```
```typescript [React]
import { useState } from 'react';
import { useMeshFlow } from "@meshflow/core";

const schema = {
    type: 'group',
    name: 'billing',
    label: '计费与汇总',
    children: [
        { type: 'number', name: 'totalPrice', label: '预估月度总价', value: 0, },
        { type: 'input', name: 'priceDetail', label: '计费项说明', value: '基础配置费用'}
    ]
};
const engine = useMeshFlow('main', schema, {
  UITrigger: {
    signalCreateor: () => {
      const [_, setTick] = useState(0);
      return () => setTick(t => t + 1);
    },
    signalTrigger(trigger) { trigger(); }
  }
});
``` 

:::

#### 添加联动依赖
```typescript
//声明联动规则：当总价 > 2000 时，自动修改描述与主题
engine.config.SetRule("billing.totalPrice", "billing.priceDetail", "value", {
  logic: ({ slot }) => {
    const [total] = slot.triggerTargets; // 从触发目标中解构出 totalPrice
    return total > 2000 ? "大客户折扣" : undefined;
  }
});
engine.config.SetRule( "billing.totalPrice", "billing.priceDetail", "theme", {
    logic: (api) => {
        const [value] = api.slot.triggerTargets;
        return total > 2000 ? "warning" : undefined;
    },
});
//触发首屏计算
engine.config.notifyAll();
```