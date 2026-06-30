[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / NodeStatus

# Enumeration: NodeStatus

Defined in: [types/types.ts:528](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L528)

## Description

节点状态类型

## Enumeration Members

### DIRTY

> **DIRTY**: `8`

Defined in: [types/types.ts:538](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L538)

[BOT] 预留——标记节点数据已脏需重算（当前版本未启用）

***

### NONE

> **NONE**: `0`

Defined in: [types/types.ts:530](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L530)

[BOT] 初始态——节点尚未被本轮 Flow 触及

***

### PROCESSED

> **PROCESSED**: `16`

Defined in: [types/types.ts:540](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L540)

[BOT] 已完成——本轮不再参与调度（可被纠缠复活清除）

***

### PROCESSING

> **PROCESSING**: `32`

Defined in: [types/types.ts:542](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L542)

[BOT] 执行中——正在运行 executorNodeCalculate 桶计算

***

### READY

> **READY**: `1`

Defined in: [types/types.ts:532](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L532)

[BOT] 就绪——已通过安检，等待 flushQueue 取出执行

***

### RESURE

> **RESURE**: `4`

Defined in: [types/types.ts:536](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L536)

[BOT] 挂起——节点层级高于当前水位，等待水位推进后唤醒

***

### STAGING

> **STAGING**: `2`

Defined in: [types/types.ts:534](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L534)

[BOT] 阻塞——还有活跃上游父节点未完成，暂存 stagingQueue
