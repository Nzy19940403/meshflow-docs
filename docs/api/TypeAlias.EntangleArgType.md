[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EntangleArgType

# Type Alias: EntangleArgType\<P, State, NM, IsProxy\>

> **EntangleArgType**\<`P`, `State`, `NM`, `IsProxy`\> = `object`

Defined in: [types/types.ts:440](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/types/types.ts#L440)

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

Defined in: [types/types.ts:441](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/types/types.ts#L441)

***

### emit

> **emit**: (`cause`, `impact`, `propose`) => `void` \| `EntangleGhost`\<`State`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`State`\> \| `undefined`\>

Defined in: [types/types.ts:456](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/types/types.ts#L456)

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

Defined in: [types/types.ts:449](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/types/types.ts#L449)

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

Defined in: [types/types.ts:442](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/types/types.ts#L442)

***

### isProxy?

> `optional` **isProxy?**: `IsProxy`

Defined in: [types/types.ts:448](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/types/types.ts#L448)

***

### via

> **via**: [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>[]

Defined in: [types/types.ts:443](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/types/types.ts#L443)
