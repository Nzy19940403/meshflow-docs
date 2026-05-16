[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useScheduler

# Function: useScheduler()

> **useScheduler**\<`T`, `P`, `B`, `NM`\>(`config`, `dependency`, `history`, `hooks`, `UITrigger`): [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `B`, `NM`\>

Defined in: [engine/useScheduler.ts:425](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/useScheduler.ts#L425)

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

`any`

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
