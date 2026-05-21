[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshError

# Variable: MeshError

> `const` **MeshError**: `object`

Defined in: [types/types.ts:520](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/types/types.ts#L520)

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
