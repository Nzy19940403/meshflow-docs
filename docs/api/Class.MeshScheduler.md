[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshScheduler

# Class: MeshScheduler\<T, P, B, NM\>

Defined in: [engine/useScheduler.ts:12](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L12)

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

Defined in: [engine/useScheduler.ts:52](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L52)

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

Defined in: [engine/useScheduler.ts:342](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L342)

#### Parameters

##### updates

`object`[]

##### source?

`number` = `0`

#### Returns

`void`

***

### flushUpdate()

> **flushUpdate**(): `Promise`\<`void`\>

Defined in: [engine/useScheduler.ts:141](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L141)

#### Returns

`Promise`\<`void`\>

***

### GetBucket()

> **GetBucket**(`bucketId`): `SchemaBucket`\<`P`\>

Defined in: [engine/useScheduler.ts:302](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L302)

#### Parameters

##### bucketId

`number`

#### Returns

`SchemaBucket`\<`P`\>

***

### GetGroupByPath()

> **GetGroupByPath**(`path`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

Defined in: [engine/useScheduler.ts:291](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L291)

#### Parameters

##### path

[`MeshPath`](TypeAlias.MeshPath.md)

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

***

### GetMaxUid()

> **GetMaxUid**(): `number`

Defined in: [engine/useScheduler.ts:308](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L308)

#### Returns

`number`

***

### GetNodeByPath()

> **GetNodeByPath**(`path`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:269](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L269)

#### Parameters

##### path

`P`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetNodeByUid()

> **GetNodeByUid**(`uid`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:281](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L281)

#### Parameters

##### uid

`number`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetPathByUid()

> **GetPathByUid**(`uid`): `P`

Defined in: [engine/useScheduler.ts:287](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L287)

#### Parameters

##### uid

`number`

#### Returns

`P`

***

### notify()

> **notify**(`path`, `key`): `void`

Defined in: [engine/useScheduler.ts:312](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L312)

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

Defined in: [engine/useScheduler.ts:247](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L247)

#### Parameters

##### groupMeta

`Omit`\<[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>, `"createView"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"`\>

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

***

### registerNode()

> **registerNode**(`nodeMeta`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:216](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L216)

#### Parameters

##### nodeMeta

`Omit`\<[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>, `"createView"` \| `"proxy"` \| `"dependOn"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"` \| `"nodeBucket"` \| `"_syncCache"`\>

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### requestUpdate()

> **requestUpdate**(): `void`

Defined in: [engine/useScheduler.ts:156](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L156)

#### Returns

`void`

***

### SetBucket()

> **SetBucket**(`newBucket`): `number`

Defined in: [engine/useScheduler.ts:298](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L298)

#### Parameters

##### newBucket

`SchemaBucket`\<`P`\>

#### Returns

`number`

#### Internal

***

### SilentSet()

> **SilentSet**(`path`, `key`, `value`): `boolean`

Defined in: [engine/useScheduler.ts:421](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L421)

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

### \_timeScheduler

> **\_timeScheduler**: `object`

Defined in: [engine/useScheduler.ts:47](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L47)

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

Defined in: [engine/useScheduler.ts:53](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L53)

#### NODE\_QUOTA\_PER\_FRAME

> **NODE\_QUOTA\_PER\_FRAME**: `number`

#### useEntangleStep

> **useEntangleStep**: `number`

#### useGreedy

> **useGreedy**: `boolean`

***

### dependency

> **dependency**: `object`

Defined in: [engine/useScheduler.ts:54](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L54)

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

Defined in: [engine/useScheduler.ts:39](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L39)

#### Returns

`void`

***

### history

> **history**: `InternalMeshFlowHistory`

Defined in: [engine/useScheduler.ts:62](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L62)

***

### hooks

> **hooks**: `object`

Defined in: [engine/useScheduler.ts:63](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L63)

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

Defined in: [engine/useScheduler.ts:44](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L44)

#### Parameters

##### array

[`TransactionArray`](TypeAlias.TransactionArray.md)\<`P`, `NM`\>

#### Returns

`void`

***

### uid

> **uid**: `number` = `0`

Defined in: [engine/useScheduler.ts:18](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L18)

***

### UITrigger

> **UITrigger**: `B`

Defined in: [engine/useScheduler.ts:64](https://github.com/Nzy19940403/meshflow/blob/61df854e65a3fdef4d2a3bab7038e0276bc8e459/utils/core/engine/useScheduler.ts#L64)
