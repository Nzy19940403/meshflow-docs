[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowTaskNode

# Interface: MeshFlowTaskNode\<P, V, NM\>

Defined in: [types/types.ts:180](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L180)

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

Defined in: [types/types.ts:200](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L200)

***

### createView

> **createView**: \<`E`\>(`extraProps?`) => `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

Defined in: [types/types.ts:204](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L204)

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

Defined in: [types/types.ts:203](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L203)

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

Defined in: [types/types.ts:196](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L196)

***

### meta

> **meta**: `NM`

Defined in: [types/types.ts:202](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L202)

***

### nodeBucket

> **nodeBucket**: `Record`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>, `number`\>

Defined in: [types/types.ts:192](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L192)

***

### notifyKeys

> **notifyKeys**: `Set`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>\>

Defined in: [types/types.ts:193](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L193)

***

### path

> **path**: `P`

Defined in: [types/types.ts:185](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L185)

***

### proxy

> **proxy**: `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`\>

Defined in: [types/types.ts:198](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L198)

***

### state

> **state**: `V`

Defined in: [types/types.ts:189](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L189)

***

### type

> **type**: `string`

Defined in: [types/types.ts:187](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L187)

***

### uid

> **uid**: `number`

Defined in: [types/types.ts:186](https://github.com/Nzy19940403/meshflow/blob/62a6c503185589091dc940cfb810a9dc353606b5/utils/core/types/types.ts#L186)
