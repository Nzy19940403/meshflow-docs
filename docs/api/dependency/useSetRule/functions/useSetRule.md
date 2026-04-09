[**MeshFlow Core API**](../../../README.md)

***

[MeshFlow Core API](../../../README.md) / [dependency/useSetRule](../README.md) / useSetRule

# Function: useSetRule()

> **useSetRule**\<`P`, `NM`\>(`Finder`, `SetBucket`, `GetBucket`, `dependencyGraph`, `predecessorGraph`, `_dependencyGraph`, `_predecessorGraph`, `activeTopologyUids`): [`RulesContext`](../interfaces/RulesContext.md)\<`P`, `NM`\>

Defined in: [dependency/useSetRule.ts:136](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/dependency/useSetRule.ts#L136)

## Type Parameters

### P

`P` *extends* [`MeshPath`](../../../engine/useEngineManager/type-aliases/MeshPath.md)

### NM

`NM`

## Parameters

### Finder

(`path`) => [`MeshFlowTaskNode`](../../../engine/useEngineManager/interfaces/MeshFlowTaskNode.md)\<`P`, `any`, `NM`\>

### SetBucket

(`newBucket`) => `number`

### GetBucket

(`bucketId`) => [`SchemaBucket`](../../../engine/useEngineManager/interfaces/SchemaBucket.md)\<`P`\>

### dependencyGraph

`number`[][]

### predecessorGraph

`number`[][]

### \_dependencyGraph

`Set`\<`number`\>[]

### \_predecessorGraph

`Set`\<`number`\>[]

### activeTopologyUids

`Map`\<`number`, `number`\>

## Returns

[`RulesContext`](../interfaces/RulesContext.md)\<`P`, `NM`\>
