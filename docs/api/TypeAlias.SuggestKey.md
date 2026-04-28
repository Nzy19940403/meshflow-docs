[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SuggestKey

# Type Alias: SuggestKey\<T\>

> **SuggestKey**\<`T`\> = `IsAny`\<`T`\> *extends* `true` ? [`MeshPath`](TypeAlias.MeshPath.md) : `IsNever`\<`T`\> *extends* `true` ? [`MeshPath`](TypeAlias.MeshPath.md) : `T` *extends* `any` ? keyof `T` : `never` \| `string` & `object`

Defined in: [types/types.ts:790](https://github.com/Nzy19940403/meshflow/blob/173877798807b1be581b02c053d441e636e24e27/utils/core/types/types.ts#L790)

## Type Parameters

### T

`T`
