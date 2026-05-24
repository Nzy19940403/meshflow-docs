[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useScheduler

# Function: useScheduler()

> **useScheduler**\<`T`, `P`, `B`, `NM`\>(`config`, `dependency`, `history`, `hooks`, `UITrigger`): [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `B`, `NM`\>

Defined in: [engine/useScheduler.ts:448](https://github.com/Nzy19940403/meshflow/blob/bb8ac06d2d7a4dc18987a7772c49930013ca25b2/utils/core/engine/useScheduler.ts#L448)

🌟 暴露给外部的兼容 API 层
保证外部业务代码完全不需要修改，无缝切换到 Class 引擎！

## Type Parameters

### T

`T`

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md)

### B

`B` *extends* `Record`\<`string`, `any`\> = `StandardUITrigger`\<`T`\>

### NM

`NM` = `any`

## Parameters

### config

#### NODE_QUOTA_PER_FRAME

`number`

#### useEntangleStep

`number`

#### useGreedy

`boolean`

### dependency

#### _GetAllNextDependency

(`targetUid`) => `number`[]

#### _GetAllPrevDependency

(`targetUid`) => `number`[]

#### _GetNextDependency

(`targetUid`) => `number`[]

#### _GetPrevDependency

(`targetUid`) => `number`[]

#### _GetUidToLevelMap

() => `Map`\<`number`, `number`\>

#### GetDependencyOrder

() => `number`[][]

### history

[`InternalMeshFlowHistory`](TypeAlias.InternalMeshFlowHistory.md)

### hooks

#### callOnError

`any`

#### callOnStart

`any`

#### callOnSuccess

`any`

#### emit

`MeshEmit`

### UITrigger

`B`

## Returns

[`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `B`, `NM`\>
