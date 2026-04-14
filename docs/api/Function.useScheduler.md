[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useScheduler

# Function: useScheduler()

> **useScheduler**\<`T`, `P`, `B`, `NM`\>(`config`, `dependency`, `history`, `hooks`, `UITrigger`): `object`

Defined in: [engine/useScheduler.ts:12](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/engine/useScheduler.ts#L12)

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
