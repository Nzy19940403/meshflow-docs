[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EntangleArgType

# Type Alias: EntangleArgType\<P, State, NM, IsProxy\>

> **EntangleArgType**\<`P`, `State`, `NM`, `IsProxy`\> = `object`

Defined in: [types/types.ts:411](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/types/types.ts#L411)

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

Defined in: [types/types.ts:412](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/types/types.ts#L412)

***

### emit

> **emit**: (`cause`, `impact`, `propose`) => `void` \| `EntangleGhost`\<`State`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`State`\> \| `undefined`\>

Defined in: [types/types.ts:427](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/types/types.ts#L427)

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

Defined in: [types/types.ts:420](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/types/types.ts#L420)

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

Defined in: [types/types.ts:413](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/types/types.ts#L413)

***

### isProxy?

> `optional` **isProxy?**: `IsProxy`

Defined in: [types/types.ts:419](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/types/types.ts#L419)

***

### via

> **via**: [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>[]

Defined in: [types/types.ts:414](https://github.com/Nzy19940403/meshflow/blob/7078ddee25482d18e0f3594460b24216a3ddb962/utils/core/types/types.ts#L414)
