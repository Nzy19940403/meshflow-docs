[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowTaskNode

# Interface: MeshFlowTaskNode\<P, V, NM\>

Defined in: [types/types.ts:159](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L159)

## Description

task节点类型

## Type Parameters

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md) = [`MeshPath`](TypeAlias.MeshPath.md)

### V

`V` = `any`

### NM

`NM` = `any`

## Properties

### calledBy

> **calledBy**: [`TriggerCause`](Enumeration.TriggerCause.md)

Defined in: [types/types.ts:179](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L179)

***

### createView

> **createView**: \<`E`\>(`extraProps?`) => `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

Defined in: [types/types.ts:183](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L183)

#### Type Parameters

##### E

`E` *extends* `Record`\<`string`, `any`\> = \{ \}

#### Parameters

##### extraProps?

`E`

#### Returns

`MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

***

### dependOn

> **dependOn**: (`cb`, `key?`) => `void`

Defined in: [types/types.ts:182](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L182)

#### Parameters

##### cb

(`val`) => `V`

##### key?

[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

#### Returns

`void`

***

### dirtySignal

> **dirtySignal**: `any`

Defined in: [types/types.ts:175](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L175)

***

### meta

> **meta**: `NM`

Defined in: [types/types.ts:181](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L181)

***

### nodeBucket

> **nodeBucket**: `Record`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>, `number`\>

Defined in: [types/types.ts:171](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L171)

***

### notifyKeys

> **notifyKeys**: `Set`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>\>

Defined in: [types/types.ts:172](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L172)

***

### path

> **path**: `P`

Defined in: [types/types.ts:164](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L164)

***

### proxy

> **proxy**: `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`\>

Defined in: [types/types.ts:177](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L177)

***

### state

> **state**: `V`

Defined in: [types/types.ts:168](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L168)

***

### type

> **type**: `string`

Defined in: [types/types.ts:166](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L166)

***

### uid

> **uid**: `number`

Defined in: [types/types.ts:165](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L165)
