[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SuggestKey

# Type Alias: SuggestKey\<T\>

> **SuggestKey**\<`T`\> = `IsAny`\<`T`\> *extends* `true` ? [`MeshPath`](TypeAlias.MeshPath.md) : `IsNever`\<`T`\> *extends* `true` ? [`MeshPath`](TypeAlias.MeshPath.md) : `T` *extends* `any` ? keyof `T` : `never` \| `string` & `object`

Defined in: [types/types.ts:782](https://github.com/Nzy19940403/meshflow/blob/4f22e67d20008cf640ed98ce72606669d06f3c53/utils/core/types/types.ts#L782)

## Type Parameters

### T

`T`
