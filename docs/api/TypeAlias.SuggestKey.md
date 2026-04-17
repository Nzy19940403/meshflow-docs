[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SuggestKey

# Type Alias: SuggestKey\<T\>

> **SuggestKey**\<`T`\> = `IsAny`\<`T`\> *extends* `true` ? [`MeshPath`](TypeAlias.MeshPath.md) : `IsNever`\<`T`\> *extends* `true` ? [`MeshPath`](TypeAlias.MeshPath.md) : `T` *extends* `any` ? keyof `T` : `never` \| `string` & `object`

Defined in: [types/types.ts:781](https://github.com/Nzy19940403/meshflow/blob/45cffaf8471706896c11a9da691ebe0cf281c838/utils/core/types/types.ts#L781)

## Type Parameters

### T

`T`
