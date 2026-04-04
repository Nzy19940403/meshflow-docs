[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / useEngineManager

# ~~Function: useEngineManager()~~

> **useEngineManager**\<`S`, `T`, `M`, `NM`, `P`\>(`id`, `Schema`, `options`): [`Engine`](../type-aliases/Engine.md)\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<`MeshFlowHistory`\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `UidToNodeMap`: [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SetTrace`: (`myPath`, `onUpdate`) => `object`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `useEntangle`: (`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:93](https://github.com/Nzy19940403/meshflow/blob/06255bb01ccac6c7e81729dae21d316af549df18/utils/core/engine/useEngineManager.ts#L93)

## Type Parameters

### S

`S` *extends* `any`[] \| `Record`\<`string`, `any`\>

### T

`T`

### M

`M` *extends* `Record`\<`string`, `any`\>

### NM

`NM` *extends* `Record`\<`string`, `any`\> = [`InferLeafType`](../type-aliases/InferLeafType.md)\<`S`\>

### P

`P` *extends* [`MeshPath`](../type-aliases/MeshPath.md) = \[[`InferLeafPath`](../type-aliases/InferLeafPath.md)\<`S`\>\] *extends* \[`never`\] ? [`MeshPath`](../type-aliases/MeshPath.md) : `string` & `object` \| [`InferLeafPath`](../type-aliases/InferLeafPath.md)\<`S`\>

## Parameters

### id

[`MeshPath`](../type-aliases/MeshPath.md)

### Schema

`S`

### options

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

[`Engine`](../type-aliases/Engine.md)\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<`MeshFlowHistory`\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `UidToNodeMap`: [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SetTrace`: (`myPath`, `onUpdate`) => `object`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `useEntangle`: (`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

## Deprecated

请使用新的 useMeshFlow 别名
