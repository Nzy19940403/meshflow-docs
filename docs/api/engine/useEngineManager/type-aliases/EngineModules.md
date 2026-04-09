[**MeshFlow Core API**](../../../README.md)

***

[MeshFlow Core API](../../../README.md) / [engine/useEngineManager](../README.md) / EngineModules

# Type Alias: EngineModules\<M, P\>

> **EngineModules**\<`M`, `P`\> = `{ [K in keyof M as TransformModuleKey<string & K>]: M[K] extends (args: any) => any ? MapModuleToReturn<K, M[K], P> : M[K] extends Record<string, any> ? EngineModules<M[K], P> : M[K] }`

Defined in: [engine/useEngineManager.ts:73](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/engine/useEngineManager.ts#L73)

## Type Parameters

### M

`M` *extends* `Record`\<`string`, `any`\>

### P

`P` *extends* [`MeshPath`](MeshPath.md)
