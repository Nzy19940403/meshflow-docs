[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SetRuleOptions

# Interface: SetRuleOptions\<NM, TKeys, K\>

Defined in: [types/types.ts:278](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L278)

节点规则配置接口

## Params

logic - 桶计算的逻辑块，一个桶里面可以装多个逻辑块，根据策略进行计算，逻辑块入参参考{}

## Type Parameters

### NM

`NM`

状态大盘的类型定义

### TKeys

`TKeys` *extends* `SuggestKey`\<`NM`\> \| `Exclude`\<[`InternalKeys`](TypeAlias.InternalKeys.md), `"state"`\>

当前节点关联的键集合

### K

`K` *extends* `SuggestKey`\<`NM`\>

## Properties

### cacheStrategy?

> `optional` **cacheStrategy?**: `"none"` \| `"shallow"`

Defined in: [types/types.ts:335](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L335)

桶的缓存策略
*

#### Description

控制计算结果的记忆化 (Memoization) 行为。
- `shallow` (默认): 基于依赖项进行浅比较，未变则直接复用缓存。
- `none`: 彻底禁用缓存，每次唤醒必执行。

***

### effect?

> `optional` **effect?**: (`args`) => `any`

Defined in: [types/types.ts:320](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L320)

后置副作用 (Post-Settlement Effect)
*

#### Parameters

##### args

`IsAny`\<`NM`\> *extends* `true` ? `Record`\<`string` & `object` \| [`InternalKeys`](TypeAlias.InternalKeys.md) \| `K`, `any`\> : `Record`\<[`InternalKeys`](TypeAlias.InternalKeys.md) \| `SuggestKey`\<`NM`\> \| `K`, `any`\>

由 [effectArgs](#effectargs) 指定的实时数据快照。

#### Returns

`any`

#### Description

节点计算完成后的回调钩子。

*

***

### effectArgs?

> `optional` **effectArgs?**: `IsAny`\<`NM`\> *extends* `true` ? (`string` & `object` \| [`InternalKeys`](TypeAlias.InternalKeys.md) \| `K`)[] : ([`InternalKeys`](TypeAlias.InternalKeys.md) \| `SuggestKey`\<`NM`\> \| `K`)[]

Defined in: [types/types.ts:327](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L327)

📥 副作用参数声明
*

#### Description

显式定义需要注入给 `effect` 函数的参数。
引擎会从全局状态大盘 (NM) 中摘取这些字段的最新值，打包传递给副作用函数。

***

### forceNotify?

> `optional` **forceNotify?**: `boolean`

Defined in: [types/types.ts:294](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L294)

***

### logic

> **logic**: (`api`) => `any`

Defined in: [types/types.ts:312](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L312)

[BOT] 核心逻辑片段 (Logic Fragment)
节点规则的执行体。允许针对同一节点注册多个逻辑片段。

**策略影响:**
- **OR**: 任一返回 truthy → 终止计算并输出 value
- **PRIORITY**: 按 priority 顺序，取第一个非 undefined 返回值
- **MERGE**: 执行所有逻辑片段，结果进行结构化合并

#### Parameters

##### api

[`logicApi`](Interface.logicApi.md)\<`NM`, `TKeys`\>

注入的运行上下文 [logicApi](Interface.logicApi.md)
*

#### Returns

`any`

#### Description

* **策略影响 (Strategy Impact)：**
- **OR (逻辑或)**: 只要有一个逻辑片段返回真值，即终止计算并输出该值。
- **PRIORITY (优先级)**: 按 `priority` 顺序执行，取第一个非 `undefined` 的返回值。
- **MERGE (增量聚合)**: 执行所有逻辑片段，并将结果进行深度合并 (Object/Array)。
*

***

### priority?

> `optional` **priority?**: `number`

Defined in: [types/types.ts:293](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L293)

逻辑优先级 (仅在 PRIORITY 策略下生效)

***

### triggerKeys?

> `optional` **triggerKeys?**: `TKeys`[]

Defined in: [types/types.ts:344](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L344)

触发键定义 (精准点火开关)
*

#### Description

定义该“法条”对源节点中哪些字段的变更敏感。
* **触发行为：**
- **已定义**：仅当列表中的 Key 发生变更时，才执行 `logic`。实现精准的按需计算。
- **未定义 (Default)**：源节点（TriggerPath）内的**任意**字段变更都会唤醒本条逻辑。

***

### value?

> `optional` **value?**: `any`

Defined in: [types/types.ts:289](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/types/types.ts#L289)

结果覆盖值 (静态产出)
*

#### Description

规则命中后的确定性结果。其行为在不同策略下表现如下：
* - **【必备】OR 策略**：作为 If-Then 模型的成果。当 logic 返回真值时，此字段提供节点最终产出的数据。
- **【可选】PRIORITY 策略**：作为静态覆盖。若配置此值，将无条件替换 logic 的计算结果；若不配置，则直接采用 logic 的返回值。
- **【可选】MERGE 策略**：作为结构化补丁。用于在逻辑运算之外，额外合并一份静态的配置增量。
*

#### Note

💡 **最佳实践**：
在 `OR` 模式下，建议永远配合 `value` 使用以获得明确的业务状态。
