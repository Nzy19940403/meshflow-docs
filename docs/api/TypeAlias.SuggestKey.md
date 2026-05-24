[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SuggestKey

# Type Alias: SuggestKey\<T\>

> **SuggestKey**\<`T`\> = `IsAny`\<`T`\> *extends* `true` ? [`MeshPath`](TypeAlias.MeshPath.md) : `IsNever`\<`T`\> *extends* `true` ? [`MeshPath`](TypeAlias.MeshPath.md) : `T` *extends* `any` ? keyof `T` : `never` \| `string` & `object`

Defined in: [types/types.ts:818](https://github.com/Nzy19940403/meshflow/blob/bb8ac06d2d7a4dc18987a7772c49930013ca25b2/utils/core/types/types.ts#L818)

## Type Parameters

### T

`T`
