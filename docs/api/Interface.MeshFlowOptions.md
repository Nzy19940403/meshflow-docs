[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowOptions

# Interface: MeshFlowOptions\<NM, M, T\>

Defined in: [types/types.ts:739](https://github.com/Nzy19940403/meshflow/blob/a19432738970824077614d3e200d71817d20b169/utils/core/types/types.ts#L739)

MeshFlow 引擎初始化配置项

## Type Parameters

### NM

`NM` = `any`

元数据对象的类型定义，会根据这个类型解析出键值，这些键值就是triggerKeys的来源

### M

`M` = `any`

动态扩展模块的映射类型

### T

`T` = `any`

UI 触发器的信号类型

## Properties

### config?

> `optional` **config?**: `object`

Defined in: [types/types.ts:749](https://github.com/Nzy19940403/meshflow/blob/a19432738970824077614d3e200d71817d20b169/utils/core/types/types.ts#L749)

引擎运行参数配置

#### useEntangleStep?

> `optional` **useEntangleStep?**: `number`

量子纠缠步长

##### Description

控制 `useEntangle` 触发时的递归深度限制。

#### useGreedy

> **useGreedy**: `boolean`

是否开启贪婪模式

##### Default

```ts
false
```

##### Description

开启后，引擎会尝试在单次微任务循环中执行尽可能多的逻辑。

***

### metaType?

> `optional` **metaType?**: `NM`

Defined in: [types/types.ts:744](https://github.com/Nzy19940403/meshflow/blob/a19432738970824077614d3e200d71817d20b169/utils/core/types/types.ts#L744)

元数据类型声明

#### Description

显式指定状态大盘中各节点的类型定义。

***

### modules?

> `optional` **modules?**: `M`

Defined in: [types/types.ts:766](https://github.com/Nzy19940403/meshflow/blob/a19432738970824077614d3e200d71817d20b169/utils/core/types/types.ts#L766)

扩展模块挂载

#### Description

传入您想在 `engine.modules` 中使用的插件或工具（如 history, validator 等）。

#### Example

```ts
{ history: useHistory, form: useInternalForm }
```

***

### UITrigger?

> `optional` **UITrigger?**: `object`

Defined in: [types/types.ts:772](https://github.com/Nzy19940403/meshflow/blob/a19432738970824077614d3e200d71817d20b169/utils/core/types/types.ts#L772)

UI 框架桥接触发器

#### signalCreator

> **signalCreator**: () => `T`

信号创建函数

##### Returns

`T`

#### signalTrigger

> **signalTrigger**: (`signal`) => `void`

信号触发回调

##### Parameters

###### signal

`T`

##### Returns

`void`

#### Description

用于和 React/Vue 等框架的响应式系统进行底层解耦通信。
