[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshError

# Variable: MeshError

> `const` **MeshError**: `object`

Defined in: [types/types.ts:522](https://github.com/Nzy19940403/meshflow/blob/9e0d2b2bc0bec331d407a212e3e825d58b2cd4b7/utils/core/types/types.ts#L522)

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
