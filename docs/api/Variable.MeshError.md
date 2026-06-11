[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshError

# Variable: MeshError

> `const` **MeshError**: `object`

Defined in: [types/types.ts:552](https://github.com/Nzy19940403/meshflow/blob/0aa9aa4ca802d007f7bdb0a89e97b12aa9103ab7/utils/core/types/types.ts#L552)

异常字典：汇总内核运行时的循环依赖、实例缺失等核心错误

## Type Declaration

### cycle

> `readonly` **cycle**: `"Circular dependency detected"` = `"Circular dependency detected"`

[BOT] 检测到环路——DAG 中存在首尾相接的依赖链

### DuplicatePath

> `readonly` **DuplicatePath**: (`path`) => `string`

[BOT] 节点路径已被注册——检查是否误创建了重复节点

#### Parameters

##### path

`any`

#### Returns

`string`

### EngineIdRepeated

> `readonly` **EngineIdRepeated**: `"engineID repeated"` = `"engineID repeated"`

[BOT] 引擎 ID 已被占用——请使用不同 ID 或先 deleteEngine

### EngineNotFound

> `readonly` **EngineNotFound**: `"Engine not found."` = `"Engine not found."`

[BOT] 引擎实例未找到——useEngine(id) 时 ID 不存在

### WrongId

> `readonly` **WrongId**: `"Wrong id"` = `"Wrong id"`

[BOT] 节点路径或 UID 无效——访问了不存在的节点

## Description

该枚举定义了 MeshFlow 在拓扑计算、引擎初始化及节点校验阶段可能抛出的标准化错误。
建议在逻辑层通过 `try-catch` 捕获并匹配这些错误常量，以实现精确的错误处理。
