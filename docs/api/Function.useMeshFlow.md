[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useMeshFlow

# Function: useMeshFlow()

> **useMeshFlow**\<`S`, `T`, `M`, `NM`, `P`\>(`id`, `Schema`, `options`): `Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<[`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md)\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `GetNodeByUid`: (`uid`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `refresTarget`: (`uid`) => `void`; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `SettleTasks`: (`array`) => `void`; `stageValueFn`: (`uid`, `key`, `value`) => `void`; `UidToNodeMap`: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:136](https://github.com/Nzy19940403/meshflow/blob/a19432738970824077614d3e200d71817d20b169/utils/core/engine/useEngineManager.ts#L136)

初始化并获取 MeshFlow 引擎实例
*

## Type Parameters

### S

`S` *extends* `Record`\<`string`, `any`\> \| readonly `Record`\<`string`, `any`\>[]

### T

`T`

### M

`M` *extends* `Record`\<`string`, `any`\>

### NM

`NM` *extends* `Record`\<`string`, `any`\> = `IsNever`\<`NormalizeSchema`\<`S`\>\> *extends* `true` ? `Record`\<`KeysOfUnion`\<`NormalizeSchema`\<`S`\>\>, `any`\> : `InferLeafType`\<`S`\>

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md) = \[`InferLeafPath`\<`S`\>\] *extends* \[`never`\] ? [`MeshPath`](TypeAlias.MeshPath.md) : `string` & `object` \| `InferLeafPath`\<`S`\>

## Parameters

### id

[`MeshPath`](TypeAlias.MeshPath.md)

引擎实例的唯一 ID

### Schema

`S`

类型定义模板（仅用于 TS 类型约束，不参与运行逻辑）,注册节点通过模块的方式进行

### options

引擎配置项与扩展模块 [MeshFlowOptions](Interface.MeshFlowOptions.md)

#### config?

\{ `useEntangleStep?`: `number`; `useGreedy`: `boolean`; \}

#### config.useEntangleStep?

`number`

#### config.useGreedy

`boolean`

#### metaType?

`NM`

#### modules?

`M`

#### UITrigger?

\{ `signalCreator`: () => `T`; `signalTrigger`: (`signal`) => `void`; \}

#### UITrigger.signalCreator

() => `T`

#### UITrigger.signalTrigger

(`signal`) => `void`

## Returns

`Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<[`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md)\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `GetNodeByUid`: (`uid`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `refresTarget`: (`uid`) => `void`; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `SettleTasks`: (`array`) => `void`; `stageValueFn`: (`uid`, `key`, `value`) => `void`; `UidToNodeMap`: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

## Description

* **查看完整的引擎实例 API 文档，请点击这里：** [EngineCoreAPI](Interface.EngineCoreAPI.md)
