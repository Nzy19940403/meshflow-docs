[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowTaskNode

# Interface: MeshFlowTaskNode\<P, V, NM\>

Defined in: [types/types.ts:182](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L182)

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

Defined in: [types/types.ts:207](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L207)

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

Defined in: [types/types.ts:202](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L202)

***

### createView

> **createView**: \<`E`\>(`extraProps?`) => `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

Defined in: [types/types.ts:206](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L206)

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

Defined in: [types/types.ts:205](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L205)

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

Defined in: [types/types.ts:198](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L198)

***

### meta

> **meta**: `NM`

Defined in: [types/types.ts:204](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L204)

***

### nodeBucket

> **nodeBucket**: `Record`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>, `number`\>

Defined in: [types/types.ts:194](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L194)

***

### notifyKeys

> **notifyKeys**: `Set`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>\>

Defined in: [types/types.ts:195](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L195)

***

### path

> **path**: `P`

Defined in: [types/types.ts:187](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L187)

***

### proxy

> **proxy**: `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`\>

Defined in: [types/types.ts:200](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L200)

***

### state

> **state**: `V`

Defined in: [types/types.ts:191](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L191)

***

### type

> **type**: `string`

Defined in: [types/types.ts:189](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L189)

***

### uid

> **uid**: `number`

Defined in: [types/types.ts:188](https://github.com/Nzy19940403/meshflow/blob/67414c60f40940a74095c97ebed6aa4ead6c0079/utils/core/types/types.ts#L188)
