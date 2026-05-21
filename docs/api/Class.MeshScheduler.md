[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshScheduler

# Class: MeshScheduler\<T, P, B, NM\>

Defined in: [engine/useScheduler.ts:14](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L14)

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

Defined in: [engine/useScheduler.ts:42](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L42)

#### Parameters

##### config

###### NODE_QUOTA_PER_FRAME

`number`

###### useEntangleStep

`number`

###### useGreedy

`boolean`

##### dependency

`any`

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

### batchNotify()

> **batchNotify**(`updates`, `source?`): `void`

Defined in: [engine/useScheduler.ts:321](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L321)

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

Defined in: [engine/useScheduler.ts:124](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L124)

#### Returns

`Promise`\<`void`\>

***

### GetBucket()

> **GetBucket**(`bucketId`): [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

Defined in: [engine/useScheduler.ts:283](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L283)

#### Parameters

##### bucketId

`number`

#### Returns

[`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

***

### GetGroupByPath()

> **GetGroupByPath**(`path`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

Defined in: [engine/useScheduler.ts:274](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L274)

#### Parameters

##### path

[`MeshPath`](TypeAlias.MeshPath.md)

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

***

### GetMaxUid()

> **GetMaxUid**(): `number`

Defined in: [engine/useScheduler.ts:289](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L289)

#### Returns

`number`

***

### GetNodeByPath()

> **GetNodeByPath**(`path`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:252](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L252)

#### Parameters

##### path

`P`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetNodeByUid()

> **GetNodeByUid**(`uid`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:264](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L264)

#### Parameters

##### uid

`number`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetPathByUid()

> **GetPathByUid**(`uid`): `P`

Defined in: [engine/useScheduler.ts:270](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L270)

#### Parameters

##### uid

`number`

#### Returns

`P`

***

### notify()

> **notify**(`path`, `key`): `void`

Defined in: [engine/useScheduler.ts:293](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L293)

#### Parameters

##### path

`P`

##### key

[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

#### Returns

`void`

***

### notifyAll()

> **notifyAll**(): `Promise`\<`void`\>

Defined in: [engine/useScheduler.ts:305](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L305)

#### Returns

`Promise`\<`void`\>

***

### registerGroupNode()

> **registerGroupNode**(`groupMeta`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

Defined in: [engine/useScheduler.ts:230](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L230)

#### Parameters

##### groupMeta

`Omit`\<[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>, `"createView"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"`\>

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

***

### registerNode()

> **registerNode**(`nodeMeta`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:199](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L199)

#### Parameters

##### nodeMeta

`Omit`\<[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>, `"createView"` \| `"proxy"` \| `"dependOn"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"` \| `"nodeBucket"` \| `"syncCache"`\>

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### requestUpdate()

> **requestUpdate**(): `void`

Defined in: [engine/useScheduler.ts:139](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L139)

#### Returns

`void`

***

### SetBucket()

> **SetBucket**(`newBucket`): `number`

Defined in: [engine/useScheduler.ts:279](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L279)

#### Parameters

##### newBucket

[`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

#### Returns

`number`

***

### SilentSet()

> **SilentSet**(`path`, `key`, `value`): `boolean`

Defined in: [engine/useScheduler.ts:400](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L400)

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

### AllBuckets

> **AllBuckets**: [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>[] = `[]`

Defined in: [engine/useScheduler.ts:25](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L25)

***

### config

> **config**: `object`

Defined in: [engine/useScheduler.ts:43](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L43)

#### NODE\_QUOTA\_PER\_FRAME

> **NODE\_QUOTA\_PER\_FRAME**: `number`

#### useEntangleStep

> **useEntangleStep**: `number`

#### useGreedy

> **useGreedy**: `boolean`

***

### dependency

> **dependency**: `any`

Defined in: [engine/useScheduler.ts:44](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L44)

***

### dispose

> **dispose**: () => `void`

Defined in: [engine/useScheduler.ts:32](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L32)

#### Returns

`void`

***

### entangleSystem

> **entangleSystem**: `any`

Defined in: [engine/useScheduler.ts:39](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L39)

***

### flushPathSet

> **flushPathSet**: `Set`\<`number`\>

Defined in: [engine/useScheduler.ts:28](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L28)

***

### history

> **history**: [`InternalMeshFlowHistory`](TypeAlias.InternalMeshFlowHistory.md)

Defined in: [engine/useScheduler.ts:45](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L45)

***

### hooks

> **hooks**: `object`

Defined in: [engine/useScheduler.ts:46](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L46)

#### callOnError

> **callOnError**: `any`

#### callOnStart

> **callOnStart**: `any`

#### callOnSuccess

> **callOnSuccess**: `any`

#### emit

> **emit**: `MeshEmit`

***

### isPending

> **isPending**: `boolean` = `false`

Defined in: [engine/useScheduler.ts:27](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L27)

***

### meshTaskSystem

> **meshTaskSystem**: `MeshTask`\<`NM`\>

Defined in: [engine/useScheduler.ts:40](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L40)

***

### PathToUidMap

> **PathToUidMap**: `Map`\<[`MeshPath`](TypeAlias.MeshPath.md), `number`\>

Defined in: [engine/useScheduler.ts:21](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L21)

***

### SettleTasks

> **SettleTasks**: (`array`) => `void`

Defined in: [engine/useScheduler.ts:34](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L34)

#### Parameters

##### array

[`TransactionArray`](TypeAlias.TransactionArray.md)\<`P`, `NM`\>

#### Returns

`void`

***

### stageValueFn

> **stageValueFn**: (`uid`, `key`, `value`) => `void`

Defined in: [engine/useScheduler.ts:33](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L33)

#### Parameters

##### uid

`number`

##### key

[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

##### value

`any`

#### Returns

`void`

***

### taskSchduler

> **taskSchduler**: `object`

Defined in: [engine/useScheduler.ts:38](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L38)

#### apply

> **apply**: (`fn`) => `void`

##### Parameters

###### fn

() => `symbol`

##### Returns

`void`

#### reset

> **reset**: () => `void`

##### Returns

`void`

#### runNext

> **runNext**: () => `Promise`\<`boolean`\>

##### Returns

`Promise`\<`boolean`\>

#### settleTasks

> **settleTasks**: (`array`) => `void`

##### Parameters

###### array

[`TransactionArray`](TypeAlias.TransactionArray.md)\<`P`, `NM`\>

##### Returns

`void`

#### takeover

> **takeover**: (`token`) => `boolean`

##### Parameters

###### token

`symbol`

##### Returns

`boolean`

***

### timeScheduler

> **timeScheduler**: `object`

Defined in: [engine/useScheduler.ts:37](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L37)

#### getIsFirstFrame

> **getIsFirstFrame**: () => `boolean`

##### Returns

`boolean`

#### reset()

> **reset**(): `void`

##### Returns

`void`

#### shouldYield()

> **shouldYield**(): `boolean`

##### Returns

`boolean`

#### yieldToMain()

> **yieldToMain**(): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

***

### uid

> **uid**: `number` = `0`

Defined in: [engine/useScheduler.ts:20](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L20)

***

### UidToGroupMap

> **UidToGroupMap**: [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>[] = `[]`

Defined in: [engine/useScheduler.ts:23](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L23)

***

### UidToNodeMap

> **UidToNodeMap**: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[] = `[]`

Defined in: [engine/useScheduler.ts:22](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L22)

***

### UidToPathMap

> **UidToPathMap**: `P`[] = `[]`

Defined in: [engine/useScheduler.ts:24](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L24)

***

### UITrigger

> **UITrigger**: `B`

Defined in: [engine/useScheduler.ts:47](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L47)

***

### updateEntangleLevel

> **updateEntangleLevel**: `any`

Defined in: [engine/useScheduler.ts:31](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L31)

***

### useEntangle

> **useEntangle**: `any`

Defined in: [engine/useScheduler.ts:30](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useScheduler.ts#L30)
