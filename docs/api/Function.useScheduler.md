[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useScheduler

# Function: useScheduler()

> **useScheduler**\<`T`, `P`, `B`, `NM`\>(`config`, `dependency`, `history`, `hooks`, `UITrigger`): [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `B`, `NM`\>

Defined in: [engine/useScheduler.ts:774](https://github.com/Nzy19940403/meshflow/blob/6ba1a5a670c6bd5da3e5570ddbc73eb78fba3a65/utils/core/engine/useScheduler.ts#L774)

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

`Partial`\<\{ `createHistoryAction`: `any`; `pushIntoHistory`: `any`; \}\>

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
