[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshError

# Enumeration: MeshError

Defined in: [types/types.ts:474](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L474)

异常字典：汇总内核运行时的循环依赖、实例缺失等核心错误

## Description

该枚举定义了 MeshFlow 在拓扑计算、引擎初始化及节点校验阶段可能抛出的标准化错误。
建议在逻辑层通过 `try-catch` 捕获并匹配这些错误常量，以实现精确的错误处理。

## Enumeration Members

### cycle

> **cycle**: `"Circular dependency detected"`

Defined in: [types/types.ts:475](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L475)

***

### EngineIdRepeated

> **EngineIdRepeated**: `"engineID repeated"`

Defined in: [types/types.ts:477](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L477)

***

### EngineNotFound

> **EngineNotFound**: `"Engine not found."`

Defined in: [types/types.ts:476](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L476)

***

### WrongId

> **WrongId**: `"Wrong id"`

Defined in: [types/types.ts:478](https://github.com/Nzy19940403/meshflow/blob/5771cc96ca6c8269a057370921103e9338d2b5ec/utils/core/types/types.ts#L478)
