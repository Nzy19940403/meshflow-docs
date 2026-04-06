[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / TransformModuleKey

# Type Alias: TransformModuleKey\<T\>

> **TransformModuleKey**\<`T`\> = `T` *extends* `"useMeshRenderGate"` ? `"render"` : `T` *extends* `` `use${infer Rest}` `` ? `Uncapitalize`\<`Rest`\> : `T`

Defined in: [engine/useEngineManager.ts:43](https://github.com/Nzy19940403/meshflow/blob/e259a6e485fc52435b132166020a182f8a3408b7/utils/core/engine/useEngineManager.ts#L43)

## Type Parameters

### T

`T`
