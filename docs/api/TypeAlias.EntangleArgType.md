[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EntangleArgType

# Type Alias: EntangleArgType\<P, State, NM, IsProxy\>

> **EntangleArgType**\<`P`, `State`, `NM`, `IsProxy`\> = `object`

Defined in: [types/types.ts:437](https://github.com/Nzy19940403/meshflow/blob/3f57a6832b8a2cdca8cb9847508a109293344d7e/utils/core/types/types.ts#L437)

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

Defined in: [types/types.ts:438](https://github.com/Nzy19940403/meshflow/blob/3f57a6832b8a2cdca8cb9847508a109293344d7e/utils/core/types/types.ts#L438)

***

### emit

> **emit**: (`cause`, `impact`, `propose`) => `void` \| `EntangleGhost`\<`State`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`State`\> \| `undefined`\>

Defined in: [types/types.ts:453](https://github.com/Nzy19940403/meshflow/blob/3f57a6832b8a2cdca8cb9847508a109293344d7e/utils/core/types/types.ts#L453)

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

Defined in: [types/types.ts:446](https://github.com/Nzy19940403/meshflow/blob/3f57a6832b8a2cdca8cb9847508a109293344d7e/utils/core/types/types.ts#L446)

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

Defined in: [types/types.ts:439](https://github.com/Nzy19940403/meshflow/blob/3f57a6832b8a2cdca8cb9847508a109293344d7e/utils/core/types/types.ts#L439)

***

### isProxy?

> `optional` **isProxy?**: `IsProxy`

Defined in: [types/types.ts:445](https://github.com/Nzy19940403/meshflow/blob/3f57a6832b8a2cdca8cb9847508a109293344d7e/utils/core/types/types.ts#L445)

***

### via

> **via**: [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>[]

Defined in: [types/types.ts:440](https://github.com/Nzy19940403/meshflow/blob/3f57a6832b8a2cdca8cb9847508a109293344d7e/utils/core/types/types.ts#L440)
