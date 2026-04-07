[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / useMeshFlowDefiner

# Function: useMeshFlowDefiner()

> **useMeshFlowDefiner**\<`P`, `S`, `NM`\>(): \<`T`, `M`\>(`id`, `schema`, `options`) => [`Engine`](../type-aliases/Engine.md)\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<`MeshFlowHistory`\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `UidToNodeMap`: [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SetTrace`: (`myPath`, `onUpdate`) => `object`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `useEntangle`: (`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:288](https://github.com/Nzy19940403/meshflow/blob/1c1e459b6c781a1712afce2f8b15740760f99c59/utils/core/engine/useEngineManager.ts#L288)

## Type Parameters

### P

`P` *extends* [`MeshPath`](../type-aliases/MeshPath.md)

### S

`S` *extends* `any`[] \| `Record`\<`string`, `any`\> = `any`

### NM

`NM` *extends* `Record`\<`string`, `any`\> = `any`

## Returns

\<`T`, `M`\>(`id`, `schema`, `options`) => [`Engine`](../type-aliases/Engine.md)\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `CancelTask`: () => `void`; `destroyPlugin`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: `Partial`\<`MeshFlowHistory`\>; `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: \{ `batchNotify`: (`updates`) => `void`; `CancelTask`: () => `void`; `GetBucket`: (`bucketId`) => [`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>; `GetNodeByPath`: (`path`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `notify`: (`path`) => `void`; `notifyAll`: () => `Promise`\<`void`\>; `registerGroupNode`: (`groupMeta`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>; `registerNode`: (`nodeMeta`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>; `SetBucket`: (`newBucket`) => `number`; `UidToNodeMap`: [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]; `UITrigger`: `any`; `updateEntangleLevel`: () => `void`; `useEntangle`: (`config`) => `void`; \}; `SetRule`: \<`TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SetTrace`: (`myPath`, `onUpdate`) => `object`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `useEntangle`: (`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>
