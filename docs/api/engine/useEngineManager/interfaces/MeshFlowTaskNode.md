[**MeshFlow Core API**](../../../README.md)

***

[MeshFlow Core API](../../../README.md) / [engine/useEngineManager](../README.md) / MeshFlowTaskNode

# Interface: MeshFlowTaskNode\<P, V, NM\>

Defined in: [types/types.ts:112](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L112)

## Type Parameters

### P

`P` *extends* [`MeshPath`](../type-aliases/MeshPath.md) = [`MeshPath`](../type-aliases/MeshPath.md)

### V

`V` = `any`

### NM

`NM` = `any`

## Properties

### calledBy

> **calledBy**: [`TriggerCause`](../enumerations/TriggerCause.md)

Defined in: [types/types.ts:132](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L132)

***

### createView

> **createView**: \<`E`\>(`extraProps?`) => [`MeshNodeProxy`](../type-aliases/MeshNodeProxy.md)\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

Defined in: [types/types.ts:136](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L136)

#### Type Parameters

##### E

`E` *extends* `Record`\<`string`, `any`\> = \{ \}

#### Parameters

##### extraProps?

`E`

#### Returns

[`MeshNodeProxy`](../type-aliases/MeshNodeProxy.md)\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`, `E`\>

***

### dependOn

> **dependOn**: (`cb`, `key?`) => `void`

Defined in: [types/types.ts:135](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L135)

#### Parameters

##### cb

(`val`) => `V`

##### key?

keyof `NM`

#### Returns

`void`

***

### dirtySignal

> **dirtySignal**: `any`

Defined in: [types/types.ts:128](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L128)

***

### meta

> **meta**: `NM`

Defined in: [types/types.ts:134](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L134)

***

### nodeBucket

> **nodeBucket**: `Record`\<keyof `NM`, `number`\>

Defined in: [types/types.ts:124](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L124)

***

### notifyKeys

> **notifyKeys**: `Set`\<keyof `NM`\>

Defined in: [types/types.ts:125](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L125)

***

### path

> **path**: `P`

Defined in: [types/types.ts:117](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L117)

***

### proxy

> **proxy**: [`MeshNodeProxy`](../type-aliases/MeshNodeProxy.md)\<`MeshFlowTaskNode`\<`P`, `V`, `NM`\>, `V`, `NM`\>

Defined in: [types/types.ts:130](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L130)

***

### state

> **state**: `V`

Defined in: [types/types.ts:121](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L121)

***

### type

> **type**: `string`

Defined in: [types/types.ts:119](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L119)

***

### uid

> **uid**: `number`

Defined in: [types/types.ts:118](https://github.com/Nzy19940403/meshflow/blob/8c1ecd0b9cc43addfb610f9c38650dcef7391de1/utils/core/types/types.ts#L118)
