[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EntangleArgType

# Type Alias: EntangleArgType\<P, State, NM, IsProxy\>

> **EntangleArgType**\<`P`, `State`, `NM`, `IsProxy`\> = `object`

Defined in: [types/types.ts:442](https://github.com/Nzy19940403/meshflow/blob/9e0d2b2bc0bec331d407a212e3e825d58b2cd4b7/utils/core/types/types.ts#L442)

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

Defined in: [types/types.ts:443](https://github.com/Nzy19940403/meshflow/blob/9e0d2b2bc0bec331d407a212e3e825d58b2cd4b7/utils/core/types/types.ts#L443)

***

### emit

> **emit**: (`cause`, `impact`, `propose`) => `void` \| `EntangleGhost`\<`State`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`State`\> \| `undefined`\>

Defined in: [types/types.ts:458](https://github.com/Nzy19940403/meshflow/blob/9e0d2b2bc0bec331d407a212e3e825d58b2cd4b7/utils/core/types/types.ts#L458)

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

Defined in: [types/types.ts:451](https://github.com/Nzy19940403/meshflow/blob/9e0d2b2bc0bec331d407a212e3e825d58b2cd4b7/utils/core/types/types.ts#L451)

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

Defined in: [types/types.ts:444](https://github.com/Nzy19940403/meshflow/blob/9e0d2b2bc0bec331d407a212e3e825d58b2cd4b7/utils/core/types/types.ts#L444)

***

### isProxy?

> `optional` **isProxy?**: `IsProxy`

Defined in: [types/types.ts:450](https://github.com/Nzy19940403/meshflow/blob/9e0d2b2bc0bec331d407a212e3e825d58b2cd4b7/utils/core/types/types.ts#L450)

***

### via

> **via**: `SuggestKey`\<`NM`\>[]

Defined in: [types/types.ts:445](https://github.com/Nzy19940403/meshflow/blob/9e0d2b2bc0bec331d407a212e3e825d58b2cd4b7/utils/core/types/types.ts#L445)
