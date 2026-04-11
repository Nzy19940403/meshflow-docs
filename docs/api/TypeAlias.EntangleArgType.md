[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / EntangleArgType

# Type Alias: EntangleArgType\<P, T, IsProxy\>

> **EntangleArgType**\<`P`, `T`, `IsProxy`\> = `object`

Defined in: [types/types.ts:383](https://github.com/Nzy19940403/meshflow/blob/9abe0421af55a0540911971b38d7e62bd578ea71/utils/core/types/types.ts#L383)

量子纠缠机制的配置选项

## Type Parameters

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md)

路径标识类型

### T

`T` = `any`

### IsProxy

`IsProxy` *extends* `boolean` = `boolean`

## Properties

### cause

> **cause**: `P`

Defined in: [types/types.ts:384](https://github.com/Nzy19940403/meshflow/blob/9abe0421af55a0540911971b38d7e62bd578ea71/utils/core/types/types.ts#L384)

***

### emit

> **emit**: (`cause`, `impact`, `propose`) => `void` \| `EntangleGhost`\<`T`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`T`\> \| `undefined`\>

Defined in: [types/types.ts:395](https://github.com/Nzy19940403/meshflow/blob/9abe0421af55a0540911971b38d7e62bd578ea71/utils/core/types/types.ts#L395)

#### Parameters

##### cause

`IsProxy` *extends* `true` ? `any` : [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>

##### impact

`IsProxy` *extends* `true` ? `any` : [`MeshFlowTaskNode`](Interface.MeshFlowTaskNode.md)\<`P`\>

##### propose

[`GhostProposalApi`](Interface.GhostProposalApi.md)\<`T`\>

#### Returns

`void` \| `EntangleGhost`\<`T`\> \| `undefined` \| `Promise`\<`void` \| `EntangleGhost`\<`T`\> \| `undefined`\>

#### Params

propose  提案调用参考[GhostProposalApi](Interface.GhostProposalApi.md)

***

### filter?

> `optional` **filter?**: (`cause`, `impact`) => `boolean`

Defined in: [types/types.ts:388](https://github.com/Nzy19940403/meshflow/blob/9abe0421af55a0540911971b38d7e62bd578ea71/utils/core/types/types.ts#L388)

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

Defined in: [types/types.ts:385](https://github.com/Nzy19940403/meshflow/blob/9abe0421af55a0540911971b38d7e62bd578ea71/utils/core/types/types.ts#L385)

***

### isProxy?

> `optional` **isProxy?**: `IsProxy`

Defined in: [types/types.ts:387](https://github.com/Nzy19940403/meshflow/blob/9abe0421af55a0540911971b38d7e62bd578ea71/utils/core/types/types.ts#L387)

***

### via

> **via**: `string`[]

Defined in: [types/types.ts:386](https://github.com/Nzy19940403/meshflow/blob/9abe0421af55a0540911971b38d7e62bd578ea71/utils/core/types/types.ts#L386)
