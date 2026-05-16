[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EntangleArgType

# Type Alias: EntangleArgType\<P, State, NM, IsProxy\>

> **EntangleArgType**\<`P`, `State`, `NM`, `IsProxy`\> = `object`

Defined in: [types/types.ts:438](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/types/types.ts#L438)

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

Defined in: [types/types.ts:439](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/types/types.ts#L439)

***

### emit

> **emit**: (`cause`, `impact`, `propose`) => `void` \| `EntangleGhost`\<`State`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`State`\> \| `undefined`\>

Defined in: [types/types.ts:454](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/types/types.ts#L454)

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

Defined in: [types/types.ts:447](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/types/types.ts#L447)

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

Defined in: [types/types.ts:440](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/types/types.ts#L440)

***

### isProxy?

> `optional` **isProxy?**: `IsProxy`

Defined in: [types/types.ts:446](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/types/types.ts#L446)

***

### via

> **via**: [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>[]

Defined in: [types/types.ts:441](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/types/types.ts#L441)
