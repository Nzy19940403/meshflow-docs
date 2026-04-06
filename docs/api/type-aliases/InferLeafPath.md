[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / InferLeafPath

# Type Alias: InferLeafPath\<T, Prefix\>

> **InferLeafPath**\<`T`, `Prefix`\> = `Unwrap`\<`T`\> *extends* infer Node ? `Node` *extends* `object` ? `N` *extends* `string` ? `N` *extends* `""` ? `Node` *extends* `object` ? `InferLeafPath`\<`C`, `Prefix`\> : `never` : `Node` *extends* `object` ? `InferLeafPath`\<`C`, `Prefix` *extends* `""` ? `N` : `` `${Prefix}.${N}` ``\> : `Prefix` *extends* `""` ? `N` : `` `${Prefix}.${N}` `` : `N` *extends* `number` \| `symbol` ? `Node` *extends* `object` ? `InferLeafPath`\<`C`, `Prefix`\> : `N` : `never` : `never` : `never`

Defined in: [utils/util.ts:52](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/utils/util.ts#L52)

## Type Parameters

### T

`T`

### Prefix

`Prefix` *extends* `string` = `""`
