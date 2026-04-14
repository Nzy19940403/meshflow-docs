[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowTaskNode

# Interface: MeshFlowTaskNode\<P, V, NM\>

Defined in: [types/types.ts:152](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L152)

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

Defined in: [types/types.ts:172](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L172)

***

### createView

> **createView**: \<`E`\>(`extraProps?`) => `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

Defined in: [types/types.ts:176](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L176)

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

Defined in: [types/types.ts:175](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L175)

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

Defined in: [types/types.ts:168](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L168)

***

### meta

> **meta**: `NM`

Defined in: [types/types.ts:174](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L174)

***

### nodeBucket

> **nodeBucket**: `Record`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>, `number`\>

Defined in: [types/types.ts:164](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L164)

***

### notifyKeys

> **notifyKeys**: `Set`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>\>

Defined in: [types/types.ts:165](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L165)

***

### path

> **path**: `P`

Defined in: [types/types.ts:157](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L157)

***

### proxy

> **proxy**: `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`\>

Defined in: [types/types.ts:170](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L170)

***

### state

> **state**: `V`

Defined in: [types/types.ts:161](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L161)

***

### type

> **type**: `string`

Defined in: [types/types.ts:159](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L159)

***

### uid

> **uid**: `number`

Defined in: [types/types.ts:158](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L158)
