---
title: 🏭 工业联动逻辑原型
editLink: false
---

# 🏭 工业联动：逻辑原型演示 (Lite)



::: info 演示说明
本案例通过模拟一个具有 **能源（A区）**、**供给（B区）** 和 **补偿（C区）** 的三位一体工厂模型，全方位展示 MeshFlow 在处理复杂依赖时的核心特性。  
为了保证交互流畅度，当前演示采用 **3×3 逻辑矩阵**（共 10 个核心联动节点）。
若需体验 **600+ 节点** 的极限性能压测，[立即跳转体验 600 节点](https://meshflow-factory-demo-600nodes.vercel.app/)。
:::

---

## 🏗️ 场景架构与规则

整个工厂被划分为三个逻辑区，模拟真实的生产流转与数据对齐：

| 区域 | 逻辑特征 | 联动规则说明 |
| :--- | :--- | :--- |
| **A 区 (能源)** | **线性传播** | 模拟电力传输。A区节点`n` 变动会触发 `n+1`的变动 |
| **B 区 (供给)** | **异步汇聚** | b区节点 **每逢 7 号节点产生 200ms 延迟**，`n`节点受b区的`n-1`节点和A区`n`节点影响,b1不受任何节点影响。 |
| **C 区 (补偿)** | **跨域远亲依赖** | 最终汇聚点。 C_i = B_i + A_{(length - i + 1)}
全球实时效能指数是c区所有值的和的平均值

## 依赖图
![Factory Dependency Graph](/images/factory-dependency.png)
 
**在线交互 Demo：** [点击进入 StackBlitz 编辑器](https://stackblitz.com/edit/vitejs-vite-zwzqbnhn?file=src%2Fcomponents%2FEditor.vue)