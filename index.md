---
# VitePress 首页配置: https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "MeshFlow Core"
  text: "让拓扑联动回归确定性"
  tagline: 基于水位线调度的逻辑引擎。终结复杂联动中的异步竞态与计算冗余。

  image:
    src: /logo.svg
    alt: MeshFlow Logo
  actions:
    - theme: brand
      text: 快速开始 →
      link: /guide/getting-started
    - theme: alt
      text: 核心原理
      link: /guide/concepts

features:
  - title:  水位线调度
    details: 独创逻辑水位线机制，确保异步节点严格按序提交，彻底杜绝“旧数据覆盖新数据”的经典异步竞态难题。
    icon: 🌊
  - title:  层级拓扑引擎
    details: 基于 DAG 拓扑分析，自动合并重复计算路径。确保深层依赖节点在一次变更中仅执行单次原子更新。
    icon: 💎
  - title:  智能路径剪枝
    details: 引入“桶计算”记忆化机制，自动识别无效变更并截断传播路径，实现真正的计算最小化与高性能响应。
    icon: ⚡
  - title:  实时环路熔断
    details: 在规则定义阶段即提供 $O(V+E)$ 复杂度的实时循环依赖检测，提前扼杀死循环风险，保障系统健壮性。
    icon: ⭕
  - title:  框架无关 & 极轻量
    details: 零外部依赖，体积仅 ~8kB(zipped)。提供统一的触发信号接口，完美适配 Vue、React 或原生 JavaScript 项目。
    icon: 📦
  - title:  易于扩展
    details: 开放生命周期钩子与插件系统，支持开发者自定义逻辑拦截、状态快照及性能监控，满足复杂业务定制需求。
    icon: 🛠️
---

## 为什么选择 MeshFlow?

在现代中后台应用中，复杂的表单联动与数据依赖就像一团乱麻。传统的事件监听模式（Event-Emit / Watch）在面对**钻石依赖**和**异步 IO** 时显得力不从心：

> ❌ **传统模式 (台球碰撞)**：A 变了撞 B，B 变了撞 C，D 被反复触发。异步接口谁先返回谁就覆盖数据，结果不可预测。
>
> ✅ **MeshFlow 模式 (精密流水线)**：将业务逻辑构建为 **DAG (有向无环图)**。每一层节点都整齐划一，**水位线**像红绿灯一样指挥交通，确保无论链路多长、网络多慢，最终状态始终**确定**、**一致**、**原子化**。



---
 