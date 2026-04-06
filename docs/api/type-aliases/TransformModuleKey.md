[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / TransformModuleKey

# Type Alias: TransformModuleKey\<T\>

> **TransformModuleKey**\<`T`\> = `T` *extends* `"useMeshRenderGate"` ? `"render"` : `T` *extends* `` `use${infer Rest}` `` ? `Uncapitalize`\<`Rest`\> : `T`

Defined in: [engine/useEngineManager.ts:43](https://github.com/Nzy19940403/meshflow/blob/47ac7d8887ac6f97774d28f8b40ad68bf4c44856/utils/core/engine/useEngineManager.ts#L43)

## Type Parameters

### T

`T`
