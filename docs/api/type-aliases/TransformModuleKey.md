[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / TransformModuleKey

# Type Alias: TransformModuleKey\<T\>

> **TransformModuleKey**\<`T`\> = `T` *extends* `"useMeshRenderGate"` ? `"render"` : `T` *extends* `` `use${infer Rest}` `` ? `Uncapitalize`\<`Rest`\> : `T`

Defined in: [engine/useEngineManager.ts:43](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/useEngineManager.ts#L43)

## Type Parameters

### T

`T`
