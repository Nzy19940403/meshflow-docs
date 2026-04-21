[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshError

# Variable: MeshError

> `const` **MeshError**: `object`

Defined in: [types/types.ts:484](https://github.com/Nzy19940403/meshflow/blob/412a98ee125d862bb86944f9da6f4bbab235efd0/utils/core/types/types.ts#L484)

异常字典：汇总内核运行时的循环依赖、实例缺失等核心错误

## Type Declaration

### cycle

> `readonly` **cycle**: `"Circular dependency detected"` = `"Circular dependency detected"`

### DuplicatePath

> `readonly` **DuplicatePath**: (`path`) => `string`

#### Parameters

##### path

`any`

#### Returns

`string`

### EngineIdRepeated

> `readonly` **EngineIdRepeated**: `"engineID repeated"` = `"engineID repeated"`

### EngineNotFound

> `readonly` **EngineNotFound**: `"Engine not found."` = `"Engine not found."`

### WrongId

> `readonly` **WrongId**: `"Wrong id"` = `"Wrong id"`

## Description

该枚举定义了 MeshFlow 在拓扑计算、引擎初始化及节点校验阶段可能抛出的标准化错误。
建议在逻辑层通过 `try-catch` 捕获并匹配这些错误常量，以实现精确的错误处理。
