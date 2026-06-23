[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EntangleArgType

# Type Alias: EntangleArgType\<P, State, NM, IsProxy\>

> **EntangleArgType**\<`P`, `State`, `NM`, `IsProxy`\> = `object`

Defined in: [types/types.ts:465](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/types/types.ts#L465)

量子纠缠机制的配置选项

## Type Parameters

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md)

路径标识类型

### State

`State` = `any`

### NM

`NM` = `any`

### IsProxy

`IsProxy` *extends* `boolean` = `boolean`

## Properties

### cause

> **cause**: `P`

Defined in: [types/types.ts:466](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/types/types.ts#L466)

***

### emit

> **emit**: (`cause`, `impact`, `propose`) => `void` \| `EntangleGhost`\<`State`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`State`\> \| `undefined`\>

Defined in: [types/types.ts:481](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/types/types.ts#L481)

#### Parameters

##### cause

`IsProxy` *extends* `true` ? `any` : [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>

##### impact

`IsProxy` *extends* `true` ? `any` : [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>

##### propose

[`GhostProposalApi`](Interface.GhostProposalApi.md)\<`State`, `NM`\>

#### Returns

`void` \| `EntangleGhost`\<`State`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`State`\> \| `undefined`\>

#### Params

propose  提案调用参考[GhostProposalApi](Interface.GhostProposalApi.md)

***

### filter?

> `optional` **filter?**: (`cause`, `impact`) => `boolean`

Defined in: [types/types.ts:474](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/types/types.ts#L474)

#### Parameters

##### cause

`IsProxy` *extends* `true` ? `any` : [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>

##### impact

`IsProxy` *extends* `true` ? `any` : [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>

#### Returns

`boolean`

***

### impact

> **impact**: `P`

Defined in: [types/types.ts:467](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/types/types.ts#L467)

***

### isProxy?

> `optional` **isProxy?**: `IsProxy`

Defined in: [types/types.ts:473](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/types/types.ts#L473)

***

### via

> **via**: `SuggestKey`\<`NM`\>[]

Defined in: [types/types.ts:468](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/types/types.ts#L468)
