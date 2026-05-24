[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshScheduler

# Class: MeshScheduler\<T, P, B, NM\>

Defined in: [engine/useScheduler.ts:14](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L14)

🌟 核心重构：MeshScheduler 类
将所有局部变量提升为类属性，所有局部函数提升为原型方法 (Prototype Methods)
彻底消灭闭包引起的 Context 内存泄漏

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

Defined in: [engine/useScheduler.ts:54](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L54)

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

[`InternalMeshFlowHistory`](TypeAlias.InternalMeshFlowHistory.md)

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

Defined in: [engine/useScheduler.ts:344](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L344)

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

Defined in: [engine/useScheduler.ts:143](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L143)

#### Returns

`Promise`\<`void`\>

***

### GetBucket()

> **GetBucket**(`bucketId`): [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

Defined in: [engine/useScheduler.ts:304](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L304)

#### Parameters

##### bucketId

`number`

#### Returns

[`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

***

### GetGroupByPath()

> **GetGroupByPath**(`path`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

Defined in: [engine/useScheduler.ts:293](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L293)

#### Parameters

##### path

[`MeshPath`](TypeAlias.MeshPath.md)

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

***

### GetMaxUid()

> **GetMaxUid**(): `number`

Defined in: [engine/useScheduler.ts:310](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L310)

#### Returns

`number`

***

### GetNodeByPath()

> **GetNodeByPath**(`path`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:271](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L271)

#### Parameters

##### path

`P`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetNodeByUid()

> **GetNodeByUid**(`uid`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:283](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L283)

#### Parameters

##### uid

`number`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetPathByUid()

> **GetPathByUid**(`uid`): `P`

Defined in: [engine/useScheduler.ts:289](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L289)

#### Parameters

##### uid

`number`

#### Returns

`P`

***

### notify()

> **notify**(`path`, `key`): `void`

Defined in: [engine/useScheduler.ts:314](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L314)

#### Parameters

##### path

`P`

##### key

[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

#### Returns

`void`

***

### registerGroupNode()

> **registerGroupNode**(`groupMeta`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

Defined in: [engine/useScheduler.ts:249](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L249)

#### Parameters

##### groupMeta

`Omit`\<[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>, `"createView"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"`\>

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

***

### registerNode()

> **registerNode**(`nodeMeta`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:218](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L218)

#### Parameters

##### nodeMeta

`Omit`\<[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>, `"createView"` \| `"proxy"` \| `"dependOn"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"` \| `"nodeBucket"` \| `"_syncCache"`\>

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### requestUpdate()

> **requestUpdate**(): `void`

Defined in: [engine/useScheduler.ts:158](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L158)

#### Returns

`void`

***

### SetBucket()

> **SetBucket**(`newBucket`): `number`

Defined in: [engine/useScheduler.ts:300](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L300)

#### Parameters

##### newBucket

[`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

#### Returns

`number`

#### Internal

***

### SilentSet()

> **SilentSet**(`path`, `key`, `value`): `boolean`

Defined in: [engine/useScheduler.ts:423](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L423)

#### Parameters

##### path

`P`

##### key

[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

##### value

`any`

#### Returns

`boolean`

## Properties

### \_timeScheduler

> **\_timeScheduler**: `object`

Defined in: [engine/useScheduler.ts:49](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L49)

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

Defined in: [engine/useScheduler.ts:55](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L55)

#### NODE\_QUOTA\_PER\_FRAME

> **NODE\_QUOTA\_PER\_FRAME**: `number`

#### useEntangleStep

> **useEntangleStep**: `number`

#### useGreedy

> **useGreedy**: `boolean`

***

### dependency

> **dependency**: `object`

Defined in: [engine/useScheduler.ts:56](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L56)

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

Defined in: [engine/useScheduler.ts:41](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L41)

#### Returns

`void`

***

### history

> **history**: [`InternalMeshFlowHistory`](TypeAlias.InternalMeshFlowHistory.md)

Defined in: [engine/useScheduler.ts:64](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L64)

***

### hooks

> **hooks**: `object`

Defined in: [engine/useScheduler.ts:65](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L65)

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

Defined in: [engine/useScheduler.ts:46](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L46)

#### Parameters

##### array

[`TransactionArray`](TypeAlias.TransactionArray.md)\<`P`, `NM`\>

#### Returns

`void`

***

### uid

> **uid**: `number` = `0`

Defined in: [engine/useScheduler.ts:20](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L20)

***

### UITrigger

> **UITrigger**: `B`

Defined in: [engine/useScheduler.ts:66](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/engine/useScheduler.ts#L66)
