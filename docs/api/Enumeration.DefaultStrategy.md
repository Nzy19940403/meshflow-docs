[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / DefaultStrategy

# Enumeration: DefaultStrategy

Defined in: [types/types.ts:497](https://github.com/Nzy19940403/meshflow/blob/6ba1a5a670c6bd5da3e5570ddbc73eb78fba3a65/utils/core/types/types.ts#L497)

引擎预设的桶计算策略

## Description

决定了当一个节点绑定了多个规则时，引擎如何处理冲突、优先级以及最终值的推导。
所有策略均原生支持异步逻辑，并严格保障异步链条中的按序执行原则。

## Enumeration Members

### MERGE

> **MERGE**: `"MERGE"`

Defined in: [types/types.ts:533](https://github.com/Nzy19940403/meshflow/blob/6ba1a5a670c6bd5da3e5570ddbc73eb78fba3a65/utils/core/types/types.ts#L533)

**聚合策略 (MERGE)**
*

#### Description

收集桶内所有规则的产出，并按照规则定义的先后顺序进行**结构化合并**。
* **核心特性：**
1. **有序覆盖**：后执行的规则结果具有更高优先级。
- **对象**：执行浅层合并 `{ ...old, ...new }`，同名键值由后者覆盖。
- **数组**：执行末尾追加 `[...old, ...new]`。
2. **异步原子性**：原生支持异步规则。即使存在 Promise，引擎也会通过异步链条严格保证合并顺序与规则声明顺序一致。
3. **底色机制 (__base__)**：支持 `entityId` 为 `__base__` 的特殊规则。其产出作为节点的“底色数据”，会被普通规则的非空产出所覆盖。
*

#### Example

```ts
// 场景：多个规则共同定义一个配置对象
// Rule A: { a: 1 }
// Rule B (async): 返回 { b: 2 }
// 最终结果: { a: 1, b: 2 }
```

***

### OR

> **OR**: `"OR"`

Defined in: [types/types.ts:507](https://github.com/Nzy19940403/meshflow/blob/6ba1a5a670c6bd5da3e5570ddbc73eb78fba3a65/utils/core/types/types.ts#L507)

**逻辑或 / 短路回退策略 (OR)**
*

#### Description

按序执行规则。当找到第一个满足条件（逻辑返回真值）的规则时，立即中断后续规则执行（短路机制）。
* **核心行为：**
1. **短路匹配**：若 `rule.logic` 返回 truthy，将提取该规则的 `value` 作为最终结果并中断。
2. **异步原子性**：严格按照声明顺序 `await`，保证高优先级规则先被检验。
3. **底色回退**：若所有普通规则均未匹配（或返回 falsy），则回退使用 `__base__` 规则的值作为兜底保障。

***

### PRIORITY

> **PRIORITY**: `"PRIORITY"`

Defined in: [types/types.ts:516](https://github.com/Nzy19940403/meshflow/blob/6ba1a5a670c6bd5da3e5570ddbc73eb78fba3a65/utils/core/types/types.ts#L516)

**绝对优先级策略 (PRIORITY)**
*

#### Description

严格遵循规则顺序的“首中制”策略，适用于互斥型逻辑判断。
* **核心行为：**
1. **非空即中**：按序执行，首个返回 **非 `undefined`** 的规则直接获胜，立即中断后续计算。
2. **无视布尔值**：与 `OR` 策略不同，即使逻辑返回 `false`、`0` 或 `null`，只要不是 `undefined`，依然视为有效命中。
