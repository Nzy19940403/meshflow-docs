[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshScheduler

# Class: MeshScheduler\<T, P, B, NM\>

Defined in: [engine/useScheduler.ts:461](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L461)

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

Defined in: [engine/useScheduler.ts:489](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L489)

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

`Partial`\<\{ `createHistoryAction`: `any`; `pushIntoHistory`: `any`; \}\>

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

> **batchNotify**(`updates`): `void`

Defined in: [engine/useScheduler.ts:724](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L724)

#### Parameters

##### updates

`object`[]

#### Returns

`void`

***

### flushUpdate()

> **flushUpdate**(): `Promise`\<`void`\>

Defined in: [engine/useScheduler.ts:545](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L545)

#### Returns

`Promise`\<`void`\>

***

### GetBucket()

> **GetBucket**(`bucketId`): [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

Defined in: [engine/useScheduler.ts:686](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L686)

#### Parameters

##### bucketId

`number`

#### Returns

[`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

***

### GetGroupByPath()

> **GetGroupByPath**(`path`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

Defined in: [engine/useScheduler.ts:677](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L677)

#### Parameters

##### path

[`MeshPath`](TypeAlias.MeshPath.md)

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

***

### GetMaxUid()

> **GetMaxUid**(): `number`

Defined in: [engine/useScheduler.ts:692](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L692)

#### Returns

`number`

***

### GetNodeByPath()

> **GetNodeByPath**(`path`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:659](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L659)

#### Parameters

##### path

`P`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetNodeByUid()

> **GetNodeByUid**(`uid`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:667](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L667)

#### Parameters

##### uid

`number`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetPathByUid()

> **GetPathByUid**(`uid`): `P`

Defined in: [engine/useScheduler.ts:673](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L673)

#### Parameters

##### uid

`number`

#### Returns

`P`

***

### notify()

> **notify**(`path`): `void`

Defined in: [engine/useScheduler.ts:697](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L697)

#### Parameters

##### path

`P`

#### Returns

`void`

***

### notifyAll()

> **notifyAll**(): `Promise`\<`void`\>

Defined in: [engine/useScheduler.ts:708](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L708)

#### Returns

`Promise`\<`void`\>

***

### refresTarget()

> **refresTarget**(`uid`): `void`

Defined in: [engine/useScheduler.ts:765](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L765)

#### Parameters

##### uid

`number`

#### Returns

`void`

***

### registerGroupNode()

> **registerGroupNode**(`groupMeta`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

Defined in: [engine/useScheduler.ts:637](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L637)

#### Parameters

##### groupMeta

`Omit`\<[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>, `"createView"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"`\>

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

***

### registerNode()

> **registerNode**(`nodeMeta`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:607](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L607)

#### Parameters

##### nodeMeta

`Omit`\<[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>, `"createView"` \| `"proxy"` \| `"dependOn"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"` \| `"nodeBucket"`\>

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### requestUpdate()

> **requestUpdate**(): `void`

Defined in: [engine/useScheduler.ts:560](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L560)

#### Returns

`void`

***

### SetBucket()

> **SetBucket**(`newBucket`): `number`

Defined in: [engine/useScheduler.ts:682](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L682)

#### Parameters

##### newBucket

[`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>

#### Returns

`number`

## Properties

### AllBuckets

> **AllBuckets**: [`SchemaBucket`](Interface.SchemaBucket.md)\<`P`\>[] = `[]`

Defined in: [engine/useScheduler.ts:472](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L472)

***

### CancelTask

> **CancelTask**: `any`

Defined in: [engine/useScheduler.ts:479](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L479)

***

### config

> **config**: `object`

Defined in: [engine/useScheduler.ts:490](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L490)

#### NODE\_QUOTA\_PER\_FRAME

> **NODE\_QUOTA\_PER\_FRAME**: `number`

#### useEntangleStep

> **useEntangleStep**: `number`

#### useGreedy

> **useGreedy**: `boolean`

***

### dependency

> **dependency**: `any`

Defined in: [engine/useScheduler.ts:491](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L491)

***

### entangleSystem

> **entangleSystem**: `any`

Defined in: [engine/useScheduler.ts:486](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L486)

***

### flushPathSet

> **flushPathSet**: `Set`\<`number`\>

Defined in: [engine/useScheduler.ts:475](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L475)

***

### history

> **history**: `Partial`\<\{ `createHistoryAction`: `any`; `pushIntoHistory`: `any`; \}\>

Defined in: [engine/useScheduler.ts:492](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L492)

***

### hooks

> **hooks**: `object`

Defined in: [engine/useScheduler.ts:493](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L493)

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

Defined in: [engine/useScheduler.ts:474](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L474)

***

### meshTaskSystem

> **meshTaskSystem**: `any`

Defined in: [engine/useScheduler.ts:487](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L487)

***

### PathToUidMap

> **PathToUidMap**: `Map`\<[`MeshPath`](TypeAlias.MeshPath.md), `number`\>

Defined in: [engine/useScheduler.ts:468](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L468)

***

### SettleTasks

> **SettleTasks**: `any`

Defined in: [engine/useScheduler.ts:481](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L481)

***

### stageValueFn

> **stageValueFn**: `any`

Defined in: [engine/useScheduler.ts:480](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L480)

***

### taskSchduler

> **taskSchduler**: `object`

Defined in: [engine/useScheduler.ts:485](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L485)

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

[`TransactionArray`](TypeAlias.TransactionArray.md)

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

Defined in: [engine/useScheduler.ts:484](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L484)

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

Defined in: [engine/useScheduler.ts:467](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L467)

***

### UidToGroupMap

> **UidToGroupMap**: [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>[] = `[]`

Defined in: [engine/useScheduler.ts:470](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L470)

***

### UidToNodeMap

> **UidToNodeMap**: [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>[] = `[]`

Defined in: [engine/useScheduler.ts:469](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L469)

***

### UidToPathMap

> **UidToPathMap**: `P`[] = `[]`

Defined in: [engine/useScheduler.ts:471](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L471)

***

### UITrigger

> **UITrigger**: `B`

Defined in: [engine/useScheduler.ts:494](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L494)

***

### updateEntangleLevel

> **updateEntangleLevel**: `any`

Defined in: [engine/useScheduler.ts:478](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L478)

***

### useEntangle

> **useEntangle**: `any`

Defined in: [engine/useScheduler.ts:477](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/engine/useScheduler.ts#L477)
