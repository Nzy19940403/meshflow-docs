[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / useScheduler

# Function: useScheduler()

> **useScheduler**\<`T`, `P`, `B`, `NM`\>(`config`, `dependency`, `history`, `hooks`, `UITrigger`): `object`

Defined in: [engine/useScheduler.ts:8](https://github.com/Nzy19940403/meshflow/blob/4d9f648c486613b32bfc0f05f797f5a9e64fb45d/utils/core/engine/useScheduler.ts#L8)

## Type Parameters

### T

`T`

### P

`P` *extends* [`MeshPath`](../type-aliases/MeshPath.md)

### B

`B` *extends* `Record`\<`string`, `any`\> = `StandardUITrigger`\<`T`\>

### NM

`NM` = `any`

## Parameters

### config

#### useEntangleStep

`number`

#### useGreedy

`boolean`

### dependency

#### GetAllNextDependency

(`targetUid`) => `number`[]

#### GetAllPrevDependency

(`targetUid`) => `number`[]

#### GetDependencyOrder

() => `number`[][]

#### GetNextDependency

(`targetUid`) => `number`[]

#### GetPrevDependency

(`targetUid`) => `number`[]

#### GetUidToLevelMap

() => `Map`\<`number`, `number`\>

### history

`Partial`\<\{ `createHistoryAction`: `any`; `pushIntoHistory`: `any`; \}\>

### hooks

#### callOnError

`any`

#### callOnStart

`any`

#### callOnSuccess

`any`

#### emit

[`MeshEmit`](../type-aliases/MeshEmit.md)

### UITrigger

`B`

## Returns

`object`

### batchNotify

> **batchNotify**: (`updates`) => `void`

#### Parameters

##### updates

`object`[]

#### Returns

`void`

### CancelTask

> **CancelTask**: () => `void`

#### Returns

`void`

### GetBucket

> **GetBucket**: (`bucketId`) => [`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>

#### Parameters

##### bucketId

`number`

#### Returns

[`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>

### GetGroupByPath

> **GetGroupByPath**: (`path`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>

#### Parameters

##### path

[`MeshPath`](../type-aliases/MeshPath.md)

#### Returns

[`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<[`MeshPath`](../type-aliases/MeshPath.md)\>

### GetNodeByPath

> **GetNodeByPath**: (`path`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

#### Parameters

##### path

`P`

#### Returns

[`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

### notify

> **notify**: (`path`) => `void`

#### Parameters

##### path

`P`

#### Returns

`void`

### notifyAll

> **notifyAll**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

### registerGroupNode

> **registerGroupNode**: (`groupMeta`) => [`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>

#### Parameters

##### groupMeta

`Omit`\<[`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>, `"createView"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"`\>

#### Returns

[`MeshFlowGroupNode`](../interfaces/MeshFlowGroupNode.md)\<`P`\>

### registerNode

> **registerNode**: (`nodeMeta`) => [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

#### Parameters

##### nodeMeta

`Omit`\<[`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`\>, `"createView"` \| `"proxy"` \| `"dependOn"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"` \| `"nodeBucket"`\>

#### Returns

[`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

### SetBucket

> **SetBucket**: (`newBucket`) => `number`

#### Parameters

##### newBucket

[`SchemaBucket`](../interfaces/SchemaBucket.md)\<`P`\>

#### Returns

`number`

### UidToNodeMap

> **UidToNodeMap**: [`MeshFlowTaskNode`](../interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]

### UITrigger

> **UITrigger**: `B`

### updateEntangleLevel

> **updateEntangleLevel**: () => `void`

#### Returns

`void`

### useEntangle

> **useEntangle**: (`config`) => `void`

#### Parameters

##### config

`EntangleArgType`\<`P`\>

#### Returns

`void`
