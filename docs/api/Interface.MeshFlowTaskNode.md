[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowTaskNode

# Interface: MeshFlowTaskNode\<P, V, NM\>

Defined in: [types/types.ts:184](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L184)

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

### \_syncCache

> **\_syncCache**: (`bucket`, `val`) => `void`

Defined in: [types/types.ts:209](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L209)

#### Parameters

##### bucket

`any`

##### val

`any`

#### Returns

`void`

***

### calledBy

> **calledBy**: [`TriggerCause`](Enumeration.TriggerCause.md)

Defined in: [types/types.ts:204](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L204)

***

### createView

> **createView**: \<`E`\>(`extraProps?`) => `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

Defined in: [types/types.ts:208](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L208)

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

Defined in: [types/types.ts:207](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L207)

#### Parameters

##### cb

(`val`) => `V`

##### key?

`SuggestKey`\<`NM`\>

#### Returns

`void`

***

### dirtySignal

> **dirtySignal**: `any`

Defined in: [types/types.ts:200](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L200)

***

### meta

> **meta**: `NM`

Defined in: [types/types.ts:206](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L206)

***

### nodeBucket

> **nodeBucket**: `Record`\<`SuggestKey`\<`NM`\>, `number`\>

Defined in: [types/types.ts:196](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L196)

***

### notifyKeys

> **notifyKeys**: `Set`\<`SuggestKey`\<`NM`\>\>

Defined in: [types/types.ts:197](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L197)

***

### path

> **path**: `P`

Defined in: [types/types.ts:189](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L189)

***

### proxy

> **proxy**: `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`\>

Defined in: [types/types.ts:202](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L202)

***

### state

> **state**: `V`

Defined in: [types/types.ts:193](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L193)

***

### type

> **type**: `string`

Defined in: [types/types.ts:191](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L191)

***

### uid

> **uid**: `number`

Defined in: [types/types.ts:190](https://github.com/Nzy19940403/meshflow/blob/9cf0173783c64e54131010f9839ee55672e20255/utils/core/types/types.ts#L190)
