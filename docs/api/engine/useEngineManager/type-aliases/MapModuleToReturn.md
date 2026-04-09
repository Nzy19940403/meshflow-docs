[**MeshFlow Core API**](../../../README.md)

***

[MeshFlow Core API](../../../README.md) / [engine/useEngineManager](../README.md) / MapModuleToReturn

# Type Alias: MapModuleToReturn\<K, F, P\>

> **MapModuleToReturn**\<`K`, `F`, `P`\> = `K` *extends* `"useSchemaValidators"` \| `"schemaValidators"` ? `object` : `K` *extends* `"useHistory"` \| `"history"` \| `"useMeshRenderGate"` \| `"meshRenderGate"` ? `F` *extends* (...`args`) => infer R ? `R` *extends* (...`args`) => infer R2 ? `R2` : `R` : `any` : `F` *extends* (...`args`) => infer R ? `R` : `any`

Defined in: [engine/useEngineManager.ts:49](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/engine/useEngineManager.ts#L49)

## Type Parameters

### K

`K`

### F

`F`

### P

`P` *extends* [`MeshPath`](MeshPath.md)
