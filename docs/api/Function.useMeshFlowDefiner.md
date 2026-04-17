[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useMeshFlowDefiner

# Function: useMeshFlowDefiner()

> **useMeshFlowDefiner**\<`P`, `S`, `NM`\>(): \<`T`, `M`\>(`id`, `schema`, `options`) => `Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<[`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md)\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `GetNodeByUid`: (`uid`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `refresTarget`: (`uid`) => `void`; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `SettleTasks`: (`array`) => `void`; `stageValueFn`: (`uid`, `key`, `value`) => `void`; `UidToNodeMap`: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:349](https://github.com/Nzy19940403/meshflow/blob/f6d044f0cbb5c9f2586bf43067cad3728e2f8639/utils/core/engine/useEngineManager.ts#L349)

类型工厂：锁定全局路径与元数据类型，生成定制化的实例化函数。

## Type Parameters

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md)

当前项目定义的路径字面量类型 (MeshPath)

### S

`S` *extends* `any`[] \| `Record`\<`string`, `any`\> = `any`

初始 Schema 的结构定义

### NM

`NM` *extends* `Record`\<`string`, `any`\> = `any`

节点元数据 (Node Metadata) 的类型定义

## Returns

\<`T`, `M`\>(`id`, `schema`, `options`) => `Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<[`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md)\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `GetNodeByUid`: (`uid`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `refresTarget`: (`uid`) => `void`; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `SettleTasks`: (`array`) => `void`; `stageValueFn`: (`uid`, `key`, `value`) => `void`; `UidToNodeMap`: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

## Description

这是一个高阶函数（Currying），旨在解决泛型冗余。通过预先注入 `MeshPath` (P) 和 `MetaType` (NM)，
你会得到一个“专属”的实例化工具，从而避免在业务代码中反复书写冗长的泛型尖括号。
**工作流：**
1. 在项目初始化/配置文件中定义：`const defineMesh = useMeshFlowDefiner<MyPaths, MyMeta>();`
2. 在业务逻辑中实例化：`const engine = defineMesh('app-engine', schema, { ... });`
