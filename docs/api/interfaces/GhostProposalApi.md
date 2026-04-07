[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / GhostProposalApi

# Interface: GhostProposalApi\<T\>

Defined in: [types/types.ts:186](https://github.com/Nzy19940403/meshflow/blob/1c1e459b6c781a1712afce2f8b15740760f99c59/utils/core/types/types.ts#L186)

## Type Parameters

### T

`T`

## Properties

### patch

> **patch**: (`key`, `patchFn`) => `void`

Defined in: [types/types.ts:192](https://github.com/Nzy19940403/meshflow/blob/1c1e459b6c781a1712afce2f8b15740760f99c59/utils/core/types/types.ts#L192)

#### Parameters

##### key

`string`

##### patchFn

(`oldState`) => `T`

#### Returns

`void`

***

### set

> **set**: (`key`, `value`, `weight?`) => `void`

Defined in: [types/types.ts:188](https://github.com/Nzy19940403/meshflow/blob/1c1e459b6c781a1712afce2f8b15740760f99c59/utils/core/types/types.ts#L188)

#### Parameters

##### key

`string`

##### value

`any`

##### weight?

`number`

#### Returns

`void`

***

### update

> **update**: (`key`, `delta`, `op?`) => `void`

Defined in: [types/types.ts:190](https://github.com/Nzy19940403/meshflow/blob/1c1e459b6c781a1712afce2f8b15740760f99c59/utils/core/types/types.ts#L190)

#### Parameters

##### key

`string`

##### delta

`any`

##### op?

`EntangleOp`

#### Returns

`void`
