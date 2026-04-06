[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / TransformModuleKey

# Type Alias: TransformModuleKey\<T\>

> **TransformModuleKey**\<`T`\> = `T` *extends* `"useMeshRenderGate"` ? `"render"` : `T` *extends* `` `use${infer Rest}` `` ? `Uncapitalize`\<`Rest`\> : `T`

Defined in: [engine/useEngineManager.ts:43](https://github.com/Nzy19940403/meshflow/blob/9bafa68a569a7cd262f7efea04182988da755396/utils/core/engine/useEngineManager.ts#L43)

## Type Parameters

### T

`T`
