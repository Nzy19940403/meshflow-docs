[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / TriggerCause

# Enumeration: TriggerCause

Defined in: [types/types.ts:441](https://github.com/Nzy19940403/meshflow/blob/45cffaf8471706896c11a9da691ebe0cf281c838/utils/core/types/types.ts#L441)

引擎点火溯源标识 (Trigger Cause)
*

## Description

用于标识当前计算任务是被何种机制唤醒的。
在复杂的 DAG 图与量子纠缠网络中，精准的溯源不仅有助于 DevTools 的可视化链路追踪，
更是引擎底层防范“无间断递归”和“环路死锁”的核心判定依据。

## Enumeration Members

### CAUSALITY

> **CAUSALITY**: `0`

Defined in: [types/types.ts:447](https://github.com/Nzy19940403/meshflow/blob/45cffaf8471706896c11a9da691ebe0cf281c838/utils/core/types/types.ts#L447)

**正向因果推导 (CAUSALITY)**

#### Description

顺向的拓扑传播。即：上游依赖节点的值发生变更，导致当前节点按照标准的 DAG 边方向被触发重算。

#### Note

这是引擎最基础、最常规的自然点火原因。

***

### INVERSION

> **INVERSION**: `1`

Defined in: [types/types.ts:453](https://github.com/Nzy19940403/meshflow/blob/45cffaf8471706896c11a9da691ebe0cf281c838/utils/core/types/types.ts#L453)

**纠缠源头 (INVERSION)**

#### Description

当前节点作为量子纠缠 (`useEntangle`) 的**“直接标的”**被唤醒。
即：它是被幽灵提案直接修改的那个节点。它打破了原有的触发链，成为了新一轮拓扑计算的“新源头”。

***

### REPERCUSSION

> **REPERCUSSION**: `2`

Defined in: [types/types.ts:459](https://github.com/Nzy19940403/meshflow/blob/45cffaf8471706896c11a9da691ebe0cf281c838/utils/core/types/types.ts#L459)

**纠缠连锁余波 (REPERCUSSION)**

#### Description

由 `INVERSION` 节点引发的下游连带更新。
即：当前节点本身并没有被纠缠直接修改，但因为它的上游节点是被纠缠修改的，它顺着 DAG 拓扑被“余波”唤醒。
