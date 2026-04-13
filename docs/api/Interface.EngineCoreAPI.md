[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EngineCoreAPI

# Interface: EngineCoreAPI\<P, NM\>

Defined in: [types/types.ts:533](https://github.com/Nzy19940403/meshflow/blob/470a2bbb58423517969e91b3e3fb125bc168017c/utils/core/types/types.ts#L533)

MeshFlow 引擎核心 API

## Description

提供了状态读写、规则注册、依赖分析及生命周期钩子等底层能力。

## Type Parameters

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md)

### NM

`NM`

## 核心模块

### config

> **config**: `object`

Defined in: [types/types.ts:538](https://github.com/Nzy19940403/meshflow/blob/470a2bbb58423517969e91b3e3fb125bc168017c/utils/core/types/types.ts#L538)

引擎配置与规则管理

#### hasRenderGate

> **hasRenderGate**: () => `boolean`

检查当前引擎是否启用了渲染网关 (Render Gate)

##### Returns

`boolean`

#### notifyAll

> **notifyAll**: () => `void`

触发全量拓扑计算

##### Returns

`void`

##### Description

强行无视当前节点的脏状态，从依赖网的所有源头节点（Root Nodes）开始，重新点火并贯穿执行整个拓扑图。
常用于引擎初始化完成、动态增删规则或需要强制同步全局状态的场景。

##### Async

##### Example

```ts
初始化最后调用
 engine.config.notifyAll();
* ### 核心运行机制：
1. **环路预检**：执行前自动调用 `CheckCycleInGraph`，确保图结构合法。
2. **拓扑分层**：基于依赖关系获取完整的拓扑排序，识别出所有入度为 0 的源头。
```

#### SetRule

> **SetRule**: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`

##### Type Parameters

###### K

`K` *extends* `string` \| `number` \| `symbol`

###### TKeys

`TKeys` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### outDegreePath

`P`

###### inDegreePath

`P`

###### key

`K`

###### options

[`SetRuleOptions`](Interface.SetRuleOptions.md)\<`NM`, `TKeys`\>

##### Returns

`void`

##### Description

建立一对一依赖关系，并自动加入异步校验队列。

##### Remarks

**安全性保障**：引擎会自动探测循环依赖（Cycle Detection）。
**性能优化**：校验逻辑被设计为“异步批量执行”。即便你在一个宏任务（如同步代码块）内连续调用 100 次 `SetRule`，
引擎也只会通过微任务（Microtask）在下一刻触发 **一次** 全局环路扫描，确保初始化零负担。

##### Throws

当新建立的规则与现有规则构成环路（如 A -> B -> A）时抛出。

##### Example

```ts
// 场景：A 节点的 count 变化时，B 节点的 value 自动加 1
engine.config.SetRule('path/A', 'path/B', 'value', {
  triggerKeys: ['count'],
  logic: ({ slot }) => {
    // 从 slot 中安全解构出触发源的数据快照
    const [sourceValue] = slot.triggerTargets;
    return sourceValue.count + 1;
  }
});
```

#### SetRules

> **SetRules**: \<`K`, `TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`

##### Type Parameters

###### K

`K` *extends* `string` \| `number` \| `symbol`

###### TKeys

`TKeys` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### outDegreePaths

`P`[]

###### inDegreePath

`P`

###### key

`K`

###### options

[`SetRuleOptions`](Interface.SetRuleOptions.md)\<`NM`, `TKeys`\>

##### Returns

`void`

##### Description

建立多对一的聚合依赖关系，将多个源节点状态收敛至目标节点。

##### Remarks

**聚合逻辑**：只要 `outDegreePaths` 数组中的任何一个节点发生变更（匹配 `triggerKeys`），
引擎就会触发一次目标节点的 `logic` 计算。
**数据快照**：`slot.triggerTargets` 将按照你传入路径的顺序，完整提供所有源节点的数据快照。
**性能保障**：同样受“微任务批处理”保护，自动检测跨节点构成的复杂环路。

##### Example

```ts
// 场景：计算总分。当 A 节点或 B 节点的 score 变化时，C 节点的 total 自动更新
engine.config.SetRules(['path/A', 'path/B'], 'path/C', 'total', {
  triggerKeys: ['score'],
  logic: ({ slot }) => {
    // 按照输入顺序解构：targetA 对应 path/A，targetB 对应 path/B
    const [targetA, targetB] = slot.triggerTargets;
    return targetA.score + targetB.score;
  }
});
```

#### SetStrategy

> **SetStrategy**: (`strategy`) => `void`

设置引擎的桶计算策略
*

##### Parameters

###### strategy

`string` \| *typeof* [`DefaultStrategy`](Enumeration.DefaultStrategy.md)

策略类型。支持传入预设的 [DefaultStrategy](Enumeration.DefaultStrategy.md)，也支持传入自定义策略的字符串标识。
*

##### Returns

`void`

##### Description

该配置决定了引擎在处理 DAG 节点冲突或多规则并行时的决策逻辑。
默认情况下，引擎可能使用 [DefaultStrategy.OR](Enumeration.DefaultStrategy.md#or) 策略。
*

##### Examples

```ts
// 设置为优先级模式，确保高权重规则生效
engine.config.SetStrategy(DefaultStrategy.PRIORITY);
*
```

```ts
// 设置为合并模式，适用于表单多字段联合校验或数据聚合
engine.config.SetStrategy(DefaultStrategy.MERGE);
```

#### SetTrace

> **SetTrace**: (`path`, `callback`) => `void`

##### Parameters

###### path

`P`

###### callback

(`status`) => `void`

##### Returns

`void`

#### useEntangle

> **useEntangle**: (`entangleFn`) => `void`

挂载量子纠缠 (Entanglement) 机制

##### Parameters

###### entangleFn

`any`

##### Returns

`void`

#### usePlugin

> **usePlugin**: (`plugin`) => `void`

挂载外部插件

##### Parameters

###### plugin

`any`

##### Returns

`void`

***

### data

> **data**: `object`

Defined in: [types/types.ts:641](https://github.com/Nzy19940403/meshflow/blob/470a2bbb58423517969e91b3e3fb125bc168017c/utils/core/types/types.ts#L641)

数据大盘读写接口

#### GetGroupByPath

> **GetGroupByPath**: (`path`) => `any`

根据路径获取对应分组的数据

##### Parameters

###### path

`P`

##### Returns

`any`

#### GetValue

> **GetValue**: (`path`, `key`) => `any`

读取指定节点的值

##### Parameters

###### path

`P`

###### key

`any`

##### Returns

`any`

#### SetValue

> **SetValue**: (`path`, `key`, `value`) => `void`

写入数据触发点火

##### Parameters

###### path

`P`

节点的唯一路径标识

###### key

`string` & `object` \| `KeysOfUnion`\<`NM`\>

###### value

`any`

要写入的最新值

##### Returns

`void`

#### SetValues

> **SetValues**: (`updates`) => `void`

批量写入数据

##### Parameters

###### updates

`object`[]

##### Returns

`void`

***

### dependency

> **dependency**: `object`

Defined in: [types/types.ts:663](https://github.com/Nzy19940403/meshflow/blob/470a2bbb58423517969e91b3e3fb125bc168017c/utils/core/types/types.ts#L663)

拓扑图与依赖分析

#### GetAllDependency

> **GetAllDependency**: () => `Record`\<`string`, `any`\>

获取整个图的完整依赖树快照

##### Returns

`Record`\<`string`, `any`\>

#### GetDependencyOrder

> **GetDependencyOrder**: () => `string`[]

获取当前 DAG 图的拓扑排序执行顺序

##### Returns

`string`[]

***

### hooks

> **hooks**: `object`

Defined in: [types/types.ts:675](https://github.com/Nzy19940403/meshflow/blob/470a2bbb58423517969e91b3e3fb125bc168017c/utils/core/types/types.ts#L675)

引擎生命周期钩子

#### onError

> **onError**: (`cb`) => `void`

引擎执行过程发生错误时的回调

##### Parameters

###### cb

(`err`) => `void`

##### Returns

`void`

#### onStart

> **onStart**: (`cb`) => `void`

引擎开始点火执行时的回调

##### Parameters

###### cb

() => `void`

##### Returns

`void`

#### onSuccess

> **onSuccess**: (`cb`) => `void`

当前批次任务全部执行成功时的回调

##### Parameters

###### cb

() => `void`

##### Returns

`void`
