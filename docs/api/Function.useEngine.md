[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useEngine

# Function: useEngine()

> **useEngine**\<`M`, `P`, `NM`, `S`, `T`\>(`id`): `Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<[`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md)\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `GetNodeByUid`: (`uid`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `refresTarget`: (`uid`) => `void`; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `SettleTasks`: (`array`) => `void`; `stageValueFn`: (`uid`, `key`, `value`) => `void`; `UidToNodeMap`: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:385](https://github.com/Nzy19940403/meshflow/blob/ddcad53ce63eb1da4003692fadea127f15dea6a7/utils/core/engine/useEngineManager.ts#L385)

实例检索：跨文件/组件获取已激活的 Engine 实例

## Type Parameters

### M

`M` *extends* `Record`\<`string`, `any`\> = \{ \}

动态插件类型 (可选)

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md) = `any`

路径类型标识 (可选)

### NM

`NM` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

### S

`S` = `any`

### T

`T` = `any`

## Parameters

### id

[`MeshPath`](TypeAlias.MeshPath.md)

引擎实例的唯一 ID

## Returns

`Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<[`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md)\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `GetNodeByUid`: (`uid`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `refresTarget`: (`uid`) => `void`; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `SettleTasks`: (`array`) => `void`; `stageValueFn`: (`uid`, `key`, `value`) => `void`; `UidToNodeMap`: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

## Description

只要引擎通过 `useMeshFlow` 或 `defineMesh` 初始化过，你就可以在任何地方通过 ID 直接拿到它。
无需 Prop Drilling，它是跨组件通讯的核心桥梁。

## Throws

如果 ID 对应实例不存在则抛错
