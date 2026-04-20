[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useScheduler

# Function: useScheduler()

> **useScheduler**\<`T`, `P`, `B`, `NM`\>(`config`, `dependency`, `history`, `hooks`, `UITrigger`): `object`

Defined in: [engine/useScheduler.ts:14](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/engine/useScheduler.ts#L14)

## Type Parameters

### T

`T`

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md)

### B

`B` *extends* `Record`\<`string`, `any`\> = `StandardUITrigger`\<`T`\>

### NM

`NM` = `any`

## Parameters

### config

#### NODE_QUOTA_PER_FRAME

`number`

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

`MeshEmit`

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

> **GetBucket**: (`bucketId`) => [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

#### Parameters

##### bucketId

`number`

#### Returns

[`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

### GetGroupByPath

> **GetGroupByPath**: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

#### Parameters

##### path

[`MeshPath`](TypeAlias.MeshPath.md)

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

### GetNodeByPath

> **GetNodeByPath**: (`path`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

#### Parameters

##### path

`P`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

### GetNodeByUid

> **GetNodeByUid**: (`uid`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

#### Parameters

##### uid

`number`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

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

### refresTarget

> **refresTarget**: (`uid`) => `void`

#### Parameters

##### uid

`number`

#### Returns

`void`

### registerGroupNode

> **registerGroupNode**: (`groupMeta`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

#### Parameters

##### groupMeta

`Omit`\<[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>, `"createView"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"`\>

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

### registerNode

> **registerNode**: (`nodeMeta`) => [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

#### Parameters

##### nodeMeta

`Omit`\<[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>, `"createView"` \| `"proxy"` \| `"dependOn"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"` \| `"nodeBucket"`\>

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

### SetBucket

> **SetBucket**: (`newBucket`) => `number`

#### Parameters

##### newBucket

[`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

#### Returns

`number`

### SettleTasks

> **SettleTasks**: (`array`) => `void` = `taskSchduler.settleTasks`

#### Parameters

##### array

[`TransactionArray`](TypeAlias.TransactionArray.md)

#### Returns

`void`

### stageValueFn

> **stageValueFn**: (`uid`, `key`, `value`) => `void`

#### Parameters

##### uid

`number`

##### key

[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

##### value

`any`

#### Returns

`void`

### UidToNodeMap

> **UidToNodeMap**: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[]

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

[`EntangleArgType`](TypeAlias.EntangleArgType.md)\<`P`\>

#### Returns

`void`
