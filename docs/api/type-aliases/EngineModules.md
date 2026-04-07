[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / EngineModules

# Type Alias: EngineModules\<M, P\>

> **EngineModules**\<`M`, `P`\> = `{ [K in keyof M as TransformModuleKey<string & K>]: M[K] extends (args: any) => any ? MapModuleToReturn<K, M[K], P> : M[K] extends Record<string, any> ? EngineModules<M[K], P> : M[K] }`

Defined in: [engine/useEngineManager.ts:73](https://github.com/Nzy19940403/meshflow/blob/4d9f648c486613b32bfc0f05f797f5a9e64fb45d/utils/core/engine/useEngineManager.ts#L73)

## Type Parameters

### M

`M` *extends* `Record`\<`string`, `any`\>

### P

`P` *extends* [`MeshPath`](MeshPath.md)
