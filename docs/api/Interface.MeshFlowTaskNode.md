[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowTaskNode

# Interface: MeshFlowTaskNode\<P, V, NM\>

Defined in: [types/types.ts:162](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L162)

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

Defined in: [types/types.ts:182](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L182)

***

### createView

> **createView**: \<`E`\>(`extraProps?`) => `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

Defined in: [types/types.ts:186](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L186)

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

Defined in: [types/types.ts:185](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L185)

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

Defined in: [types/types.ts:178](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L178)

***

### meta

> **meta**: `NM`

Defined in: [types/types.ts:184](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L184)

***

### nodeBucket

> **nodeBucket**: `Record`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>, `number`\>

Defined in: [types/types.ts:174](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L174)

***

### notifyKeys

> **notifyKeys**: `Set`\<[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>\>

Defined in: [types/types.ts:175](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L175)

***

### path

> **path**: `P`

Defined in: [types/types.ts:167](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L167)

***

### proxy

> **proxy**: `MeshNodeProxy`\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`\>

Defined in: [types/types.ts:180](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L180)

***

### state

> **state**: `V`

Defined in: [types/types.ts:171](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L171)

***

### type

> **type**: `string`

Defined in: [types/types.ts:169](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L169)

***

### uid

> **uid**: `number`

Defined in: [types/types.ts:168](https://github.com/Nzy19940403/meshflow/blob/e65302d39f2f86648a3cd07ecfe2394d19279992/utils/core/types/types.ts#L168)
