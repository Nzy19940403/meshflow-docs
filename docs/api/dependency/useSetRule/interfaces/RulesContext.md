[**MeshFlow Core API**](../../../README.md)

***

[MeshFlow Core API](../../../README.md) / [dependency/useSetRule](../README.md) / RulesContext

# Interface: RulesContext\<P, NM\>

Defined in: [dependency/useSetRule.ts:78](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/dependency/useSetRule.ts#L78)

## Type Parameters

### P

`P`

### NM

`NM`

## Properties

### DAG

#### SetRule

> **SetRule**: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`

Defined in: [dependency/useSetRule.ts:100](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/dependency/useSetRule.ts#L100)

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

[`SetRuleOptions`](../../../engine/useEngineManager/interfaces/SetRuleOptions.md)\<`NM`, `TKeys`\>

##### Returns

`void`

##### Description

建立一对一依赖关系，并自动加入异步校验队列。
*

##### Remarks

**安全性保障**：引擎会自动探测循环依赖（Cycle Detection）。
**性能优化**：校验逻辑被设计为“异步批量执行”。即便你在一个宏任务（如同步代码块）内连续调用 100 次 `SetRule`，
引擎也只会通过微任务（Microtask）在下一刻触发 **一次** 全局环路扫描，确保初始化零负担。
*

##### Throws

当新建立的规则与现有规则构成环路（如 A -> B -> A）时抛出。
*

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

***

#### SetRules

> **SetRules**: \<`K`, `TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`

Defined in: [dependency/useSetRule.ts:127](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/dependency/useSetRule.ts#L127)

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

[`SetRuleOptions`](../../../engine/useEngineManager/interfaces/SetRuleOptions.md)\<`NM`, `TKeys`\>

##### Returns

`void`

##### Description

建立多对一的聚合依赖关系，将多个源节点状态收敛至目标节点。
*

##### Remarks

**聚合逻辑**：只要 `outDegreePaths` 数组中的任何一个节点发生变更（匹配 `triggerKeys`），
引擎就会触发一次目标节点的 `logic` 计算。
**数据快照**：`slot.triggerTargets` 将按照你传入路径的顺序，完整提供所有源节点的数据快照。
**性能保障**：同样受“微任务批处理”保护，自动检测跨节点构成的复杂环路。
*

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
