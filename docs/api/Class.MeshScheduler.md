[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshScheduler

# Class: MeshScheduler\<T, P, B, NM\>

Defined in: [engine/useScheduler.ts:12](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L12)

## Type Parameters

### T

`T`

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md)

### B

`B` *extends* `Record`\<`string`, `any`\> = `StandardUITrigger`\<`T`\>

### NM

`NM` = `any`

## Constructors

### Constructor

> **new MeshScheduler**\<`T`, `P`, `B`, `NM`\>(`config`, `dependency`, `history`, `hooks`, `UITrigger`): `MeshScheduler`\<`T`, `P`, `B`, `NM`\>

Defined in: [engine/useScheduler.ts:67](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L67)

#### Parameters

##### config

###### NODE_QUOTA_PER_FRAME

`number`

###### useEntangleStep

`number`

###### useGreedy

`boolean`

##### dependency

###### _GetAllNextDependency

(`targetUid`) => `number`[]

###### _GetAllPrevDependency

(`targetUid`) => `number`[]

###### _GetNextDependency

(`targetUid`) => `number`[]

###### _GetPrevDependency

(`targetUid`) => `number`[]

###### _GetUidToLevelMap

() => `Map`\<`number`, `number`\>

###### GetDependencyOrder

() => `number`[][]

##### history

`InternalMeshFlowHistory`

##### hooks

###### callOnError

`any`

###### callOnStart

`any`

###### callOnSuccess

`any`

###### emit

`MeshEmit`

##### UITrigger

`B`

#### Returns

`MeshScheduler`\<`T`, `P`, `B`, `NM`\>

## Methods

### \_batchNotify()

> **\_batchNotify**(`updates`, `source?`): `void`

Defined in: [engine/useScheduler.ts:371](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L371)

#### Parameters

##### updates

`object`[]

##### source?

`number` = `0`

#### Returns

`void`

***

### \_requestUpdate()

> **\_requestUpdate**(): `void`

Defined in: [engine/useScheduler.ts:184](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L184)

#### Returns

`void`

***

### flushUpdate()

> **flushUpdate**(): `Promise`\<`void`\>

Defined in: [engine/useScheduler.ts:160](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L160)

#### Returns

`Promise`\<`void`\>

***

### GetBucket()

> **GetBucket**(`bucketId`): `SchemaBucket`\<`P`\>

Defined in: [engine/useScheduler.ts:330](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L330)

#### Parameters

##### bucketId

`number`

#### Returns

`SchemaBucket`\<`P`\>

***

### GetGroupByPath()

> **GetGroupByPath**(`path`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

Defined in: [engine/useScheduler.ts:319](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L319)

#### Parameters

##### path

[`MeshPath`](TypeAlias.MeshPath.md)

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

***

### GetMaxUid()

> **GetMaxUid**(): `number`

Defined in: [engine/useScheduler.ts:336](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L336)

#### Returns

`number`

***

### GetNodeByPath()

> **GetNodeByPath**(`path`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:297](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L297)

#### Parameters

##### path

`P`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetNodeByUid()

> **GetNodeByUid**(`uid`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:309](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L309)

#### Parameters

##### uid

`number`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetPathByUid()

> **GetPathByUid**(`uid`): `P`

Defined in: [engine/useScheduler.ts:315](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L315)

#### Parameters

##### uid

`number`

#### Returns

`P`

***

### notify()

> **notify**(`path`, `key`): `void`

Defined in: [engine/useScheduler.ts:340](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L340)

#### Parameters

##### path

`P`

##### key

`SuggestKey`\<`NM`\>

#### Returns

`void`

***

### registerGroupNode()

> **registerGroupNode**(`groupMeta`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

Defined in: [engine/useScheduler.ts:275](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L275)

#### Parameters

##### groupMeta

`Omit`\<[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>, `"createView"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"`\>

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

***

### registerNode()

> **registerNode**(`nodeMeta`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:244](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L244)

#### Parameters

##### nodeMeta

`Omit`\<[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>, `"createView"` \| `"proxy"` \| `"dependOn"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"` \| `"nodeBucket"` \| `"_syncCache"`\>

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### SetBucket()

> **SetBucket**(`newBucket`): `number`

Defined in: [engine/useScheduler.ts:326](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L326)

#### Parameters

##### newBucket

`SchemaBucket`\<`P`\>

#### Returns

`number`

#### Internal

***

### SilentSet()

> **SilentSet**(`path`, `key`, `value`): `boolean`

Defined in: [engine/useScheduler.ts:451](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L451)

#### Parameters

##### path

`P`

##### key

`SuggestKey`\<`NM`\>

##### value

`any`

#### Returns

`boolean`

## Properties

### \_flushPathPendingMap

> **\_flushPathPendingMap**: `number`[] = `[]`

Defined in: [engine/useScheduler.ts:35](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L35)

***

### \_timeScheduler

> **\_timeScheduler**: `object`

Defined in: [engine/useScheduler.ts:52](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L52)

#### \_getIsFirstFrame

> **\_getIsFirstFrame**: () => `boolean`

##### Returns

`boolean`

#### \_shouldYield()

> **\_shouldYield**(): `boolean`

##### Returns

`boolean`

#### \_yieldToMain()

> **\_yieldToMain**(): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

#### reset()

> **reset**(): `void`

##### Returns

`void`

***

### config

> **config**: `object`

Defined in: [engine/useScheduler.ts:68](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L68)

#### NODE\_QUOTA\_PER\_FRAME

> **NODE\_QUOTA\_PER\_FRAME**: `number`

#### useEntangleStep

> **useEntangleStep**: `number`

#### useGreedy

> **useGreedy**: `boolean`

***

### dependency

> **dependency**: `object`

Defined in: [engine/useScheduler.ts:69](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L69)

#### \_GetAllNextDependency

> **\_GetAllNextDependency**: (`targetUid`) => `number`[]

##### Parameters

###### targetUid

`number`

##### Returns

`number`[]

#### \_GetAllPrevDependency

> **\_GetAllPrevDependency**: (`targetUid`) => `number`[]

##### Parameters

###### targetUid

`number`

##### Returns

`number`[]

#### \_GetNextDependency

> **\_GetNextDependency**: (`targetUid`) => `number`[]

##### Parameters

###### targetUid

`number`

##### Returns

`number`[]

#### \_GetPrevDependency

> **\_GetPrevDependency**: (`targetUid`) => `number`[]

##### Parameters

###### targetUid

`number`

##### Returns

`number`[]

#### \_GetUidToLevelMap

> **\_GetUidToLevelMap**: () => `Map`\<`number`, `number`\>

##### Returns

`Map`\<`number`, `number`\>

#### GetDependencyOrder

> **GetDependencyOrder**: () => `number`[][]

##### Returns

`number`[][]

***

### dispose

> **dispose**: () => `void`

Defined in: [engine/useScheduler.ts:44](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L44)

#### Returns

`void`

***

### history

> **history**: `InternalMeshFlowHistory`

Defined in: [engine/useScheduler.ts:77](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L77)

***

### hooks

> **hooks**: `object`

Defined in: [engine/useScheduler.ts:78](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L78)

#### callOnError

> **callOnError**: `any`

#### callOnStart

> **callOnStart**: `any`

#### callOnSuccess

> **callOnSuccess**: `any`

#### emit

> **emit**: `MeshEmit`

***

### SettleTasks

> **SettleTasks**: (`array`) => `void`

Defined in: [engine/useScheduler.ts:49](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L49)

#### Parameters

##### array

[`TransactionArray`](TypeAlias.TransactionArray.md)\<`P`, `NM`\>

#### Returns

`void`

***

### uid

> **uid**: `number` = `0`

Defined in: [engine/useScheduler.ts:18](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L18)

***

### UITrigger

> **UITrigger**: `B`

Defined in: [engine/useScheduler.ts:79](https://github.com/Nzy19940403/meshflow/blob/409c929c8843356c73cf4b3c75dea27951a96593/utils/core/engine/useScheduler.ts#L79)
