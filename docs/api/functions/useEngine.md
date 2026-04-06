[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / useEngine

# Function: useEngine()

> **useEngine**\<`M`, `P`, `NM`, `S`, `T`\>(`id`): [`Engine`](../type-aliases/Engine.md)\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<`MeshFlowHistory`\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `UidToNodeMap`: [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SetTrace`: (`myPath`, `onUpdate`) => `object`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `useEntangle`: (`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:317](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/engine/useEngineManager.ts#L317)

获取 Engine 实例

## Type Parameters

### M

`M` *extends* `Record`\<`string`, `any`\> = \{ \}

手动注入的模块映射 (例如 { useHistory: typeof useHistory })

### P

`P` *extends* [`MeshPath`](../type-aliases/MeshPath.md) = `any`

ID 类型 (支持 string | number | symbol)

### NM

`NM` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

### S

`S` = `any`

### T

`T` = `any`

## Parameters

### id

[`MeshPath`](../type-aliases/MeshPath.md)

## Returns

[`Engine`](../type-aliases/Engine.md)\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<`MeshFlowHistory`\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `UidToNodeMap`: [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SetTrace`: (`myPath`, `onUpdate`) => `object`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `useEntangle`: (`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>
