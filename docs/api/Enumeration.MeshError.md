[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshError

# Enumeration: MeshError

Defined in: [types/types.ts:452](https://github.com/Nzy19940403/meshflow/blob/b7f91311a42ef1343f61c95646dc8eaa7375fde8/utils/core/types/types.ts#L452)

异常字典：汇总内核运行时的循环依赖、实例缺失等核心错误

## Description

该枚举定义了 MeshFlow 在拓扑计算、引擎初始化及节点校验阶段可能抛出的标准化错误。
建议在逻辑层通过 `try-catch` 捕获并匹配这些错误常量，以实现精确的错误处理。

## Enumeration Members

### cycle

> **cycle**: `"Circular dependency detected"`

Defined in: [types/types.ts:453](https://github.com/Nzy19940403/meshflow/blob/b7f91311a42ef1343f61c95646dc8eaa7375fde8/utils/core/types/types.ts#L453)

***

### EngineIdRepeated

> **EngineIdRepeated**: `"engineID repeated"`

Defined in: [types/types.ts:455](https://github.com/Nzy19940403/meshflow/blob/b7f91311a42ef1343f61c95646dc8eaa7375fde8/utils/core/types/types.ts#L455)

***

### EngineNotFound

> **EngineNotFound**: `"Engine not found."`

Defined in: [types/types.ts:454](https://github.com/Nzy19940403/meshflow/blob/b7f91311a42ef1343f61c95646dc8eaa7375fde8/utils/core/types/types.ts#L454)

***

### WrongId

> **WrongId**: `"Wrong id"`

Defined in: [types/types.ts:456](https://github.com/Nzy19940403/meshflow/blob/b7f91311a42ef1343f61c95646dc8eaa7375fde8/utils/core/types/types.ts#L456)
