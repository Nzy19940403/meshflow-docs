[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / MapModuleToReturn

# Type Alias: MapModuleToReturn\<K, F, P\>

> **MapModuleToReturn**\<`K`, `F`, `P`\> = `K` *extends* `"useSchemaValidators"` \| `"schemaValidators"` ? `object` : `K` *extends* `"useHistory"` \| `"history"` \| `"useMeshRenderGate"` \| `"meshRenderGate"` ? `F` *extends* (...`args`) => infer R ? `R` *extends* (...`args`) => infer R2 ? `R2` : `R` : `any` : `F` *extends* (...`args`) => infer R ? `R` : `any`

Defined in: [engine/useEngineManager.ts:49](https://github.com/Nzy19940403/meshflow/blob/4d9f648c486613b32bfc0f05f797f5a9e64fb45d/utils/core/engine/useEngineManager.ts#L49)

## Type Parameters

### K

`K`

### F

`F`

### P

`P` *extends* [`MeshPath`](MeshPath.md)
