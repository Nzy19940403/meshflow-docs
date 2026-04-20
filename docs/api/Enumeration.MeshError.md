[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshError

# Enumeration: MeshError

Defined in: [types/types.ts:484](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L484)

异常字典：汇总内核运行时的循环依赖、实例缺失等核心错误

## Description

该枚举定义了 MeshFlow 在拓扑计算、引擎初始化及节点校验阶段可能抛出的标准化错误。
建议在逻辑层通过 `try-catch` 捕获并匹配这些错误常量，以实现精确的错误处理。

## Enumeration Members

### cycle

> **cycle**: `"Circular dependency detected"`

Defined in: [types/types.ts:485](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L485)

***

### EngineIdRepeated

> **EngineIdRepeated**: `"engineID repeated"`

Defined in: [types/types.ts:487](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L487)

***

### EngineNotFound

> **EngineNotFound**: `"Engine not found."`

Defined in: [types/types.ts:486](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L486)

***

### WrongId

> **WrongId**: `"Wrong id"`

Defined in: [types/types.ts:488](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L488)
