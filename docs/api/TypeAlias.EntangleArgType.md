[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EntangleArgType

# Type Alias: EntangleArgType\<P, State, NM, IsProxy\>

> **EntangleArgType**\<`P`, `State`, `NM`, `IsProxy`\> = `object`

Defined in: [types/types.ts:408](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L408)

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

Defined in: [types/types.ts:409](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L409)

***

### emit

> **emit**: (`cause`, `impact`, `propose`) => `void` \| `EntangleGhost`\<`State`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`State`\> \| `undefined`\>

Defined in: [types/types.ts:424](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L424)

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

Defined in: [types/types.ts:417](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L417)

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

Defined in: [types/types.ts:410](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L410)

***

### isProxy?

> `optional` **isProxy?**: `IsProxy`

Defined in: [types/types.ts:416](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L416)

***

### via

> **via**: [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>[]

Defined in: [types/types.ts:411](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L411)
