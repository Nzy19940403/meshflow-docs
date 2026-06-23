[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshScheduler

# Class: MeshScheduler\<T, P, B, NM\>

Defined in: [engine/useScheduler.ts:24](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L24)

[BOT] MeshScheduler — 引擎核心调度器

职责:
  1. 节点注册中心 — Path→UID 映射 / UID→Node 索引
  2. 拓扑推演入口 — `notify` / `_batchNotify` / `_notifyAll` 三种点火方式
  3. UI 刷新协调 — 收集脏节点 → rAF 批量触发 `signalTrigger` / `emit`
  4. 子系统编排 — 组装 `useMeshTask` / `useSetEntangle` / `transactionScheduler`

子系统:
- `_meshTaskSystem`  — 拓扑执行循环 (TaskRunner + flushQueue)
- `_entangleSystem`  — 纠缠预言与幽灵提案 (Turnstile)
- `_taskSchduler`    — 事务链调度器 (串行异步任务)
- `_timeScheduler`   — 时间切片管理器 (帧预算与 yield)

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

Defined in: [engine/useScheduler.ts:79](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L79)

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

Defined in: [engine/useScheduler.ts:402](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L402)

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

Defined in: [engine/useScheduler.ts:196](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L196)

#### Returns

`void`

***

### flushUpdate()

> **flushUpdate**(): `Promise`\<`void`\>

Defined in: [engine/useScheduler.ts:172](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L172)

#### Returns

`Promise`\<`void`\>

***

### GetBucket()

> **GetBucket**(`bucketId`): `SchemaBucket`\<`P`\>

Defined in: [engine/useScheduler.ts:342](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L342)

#### Parameters

##### bucketId

`number`

#### Returns

`SchemaBucket`\<`P`\>

***

### GetGroupByPath()

> **GetGroupByPath**(`path`): [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

Defined in: [engine/useScheduler.ts:331](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L331)

#### Parameters

##### path

[`MeshPath`](TypeAlias.MeshPath.md)

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>

***

### GetMaxUid()

> **GetMaxUid**(): `number`

Defined in: [engine/useScheduler.ts:348](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L348)

#### Returns

`number`

***

### GetNodeByPath()

> **GetNodeByPath**(`path`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:309](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L309)

#### Parameters

##### path

`P`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetNodeByUid()

> **GetNodeByUid**(`uid`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:321](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L321)

#### Parameters

##### uid

`number`

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### GetPathByUid()

> **GetPathByUid**(`uid`): `P`

Defined in: [engine/useScheduler.ts:327](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L327)

#### Parameters

##### uid

`number`

#### Returns

`P`

***

### notify()

> **notify**(`path`, `key`): `void`

Defined in: [engine/useScheduler.ts:352](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L352)

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

Defined in: [engine/useScheduler.ts:287](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L287)

#### Parameters

##### groupMeta

`Omit`\<[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>, `"createView"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"`\>

#### Returns

[`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<`P`\>

***

### registerNode()

> **registerNode**(`nodeMeta`): [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

Defined in: [engine/useScheduler.ts:256](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L256)

#### Parameters

##### nodeMeta

`Omit`\<[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>, `"createView"` \| `"proxy"` \| `"dependOn"` \| `"calledBy"` \| `"uid"` \| `"dirtySignal"` \| `"nodeBucket"` \| `"_syncCache"`\>

#### Returns

[`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

***

### SetBucket()

> **SetBucket**(`newBucket`): `number`

Defined in: [engine/useScheduler.ts:338](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L338)

#### Parameters

##### newBucket

`SchemaBucket`\<`P`\>

#### Returns

`number`

#### Internal

***

### SilentSet()

> **SilentSet**(`path`, `key`, `value`): `boolean`

Defined in: [engine/useScheduler.ts:481](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L481)

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

Defined in: [engine/useScheduler.ts:47](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L47)

***

### \_timeScheduler

> **\_timeScheduler**: `object`

Defined in: [engine/useScheduler.ts:64](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L64)

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

Defined in: [engine/useScheduler.ts:80](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L80)

#### NODE\_QUOTA\_PER\_FRAME

> **NODE\_QUOTA\_PER\_FRAME**: `number`

#### useEntangleStep

> **useEntangleStep**: `number`

#### useGreedy

> **useGreedy**: `boolean`

***

### dependency

> **dependency**: `object`

Defined in: [engine/useScheduler.ts:81](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L81)

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

Defined in: [engine/useScheduler.ts:56](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L56)

#### Returns

`void`

***

### history

> **history**: `InternalMeshFlowHistory`

Defined in: [engine/useScheduler.ts:89](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L89)

***

### hooks

> **hooks**: `object`

Defined in: [engine/useScheduler.ts:90](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L90)

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

Defined in: [engine/useScheduler.ts:61](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L61)

#### Parameters

##### array

[`TransactionArray`](TypeAlias.TransactionArray.md)\<`P`, `NM`\>

#### Returns

`void`

***

### uid

> **uid**: `number` = `0`

Defined in: [engine/useScheduler.ts:30](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L30)

***

### UITrigger

> **UITrigger**: `B`

Defined in: [engine/useScheduler.ts:91](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useScheduler.ts#L91)
