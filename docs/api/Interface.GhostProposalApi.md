[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / GhostProposalApi

# Interface: GhostProposalApi\<State, NM\>

Defined in: [types/types.ts:339](https://github.com/Nzy19940403/meshflow/blob/4f22e67d20008cf640ed98ce72606669d06f3c53/utils/core/types/types.ts#L339)

幽灵提案 API (Ghost Proposal API)
* ### 架构思想：延迟决议 (Deferred Resolution)
在复杂的 DAG (有向无环图) 状态机中，如果在副作用函数中直接修改目标状态（如 `tgt.price = 100`），
极易引发不可控的竞态条件 (Race Condition)、级联重绘或死循环。
  为了系统性地规避上述风险，MeshFlow 设计了 **“幽灵提案”** 机制。其核心交互模式借鉴了 **Git 的 Pull Request**：
1. **📝 提交提案 (Propose)**：引擎限制了对状态的直接修改。所有通过此 API 发起的操作（`set` / `update` / `patch`）
都不会立即生效，而是转化为数据对象并暂存于引擎的缓冲池 (`_ghostBuffer`) 中。
2. **🛡️ 统一清算 (Resolve)**：当当前批次的所有计算流执行完毕后，引擎会作为调度中心，统一收集并合并这些提案。
3. **⚖️ 权重裁决 (Weight)**：面对多源并发修改，引擎严格按照提案的**权重 (`weight`)** 和预设策略进行确定性计算，而非依赖执行的先后顺序。
> **💡 总结**：幽灵提案机制将不可控的“时间依赖”转化为了安全的“逻辑依赖”，从而保证了每次状态计算的原子性与确定性。

## Example

```ts
// 场景：多个规则并发更新购物车总价
engine.config.useEntangle({
// ...
emit: (src, tgt, propose) => {
// 提交增量修改提案，而非直接操作 tgt.totalPrice
propose.update('totalPrice', src.price, 'add');
}
});
```

## Type Parameters

### State

`State`

### NM

`NM`

## Properties

### patch

> **patch**: \<`K`, `V`\>(`key`, `patchFn`) => `void`

Defined in: [types/types.ts:366](https://github.com/Nzy19940403/meshflow/blob/4f22e67d20008cf640ed98ce72606669d06f3c53/utils/core/types/types.ts#L366)

提交【函数式补丁】提案

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol` \| `string` & `object`

##### V

`V` = `IsAny`\<`State`\> *extends* `false` ? `State` : `IsNever`\<`NM`\> *extends* `true` ? `any` : `IsAny`\<`NM`\> *extends* `false` ? `K` *extends* keyof `NM` ? `NM`\[`K`\] : `any` : `any`

#### Parameters

##### key

`K`

目标节点的状态属性名

##### patchFn

(`oldState`) => `V`

状态计算回调。接收该 key 的当前旧值 (`oldState`)，需返回计算后的新值。
*

#### Returns

`void`

#### Description

基于目标节点的当前状态进行纯函数推导，适用于高度依赖旧值的复杂状态计算。

#### Note

⚠️ **性能预警**：
`patch` 模式虽然具备最高的自由度，在常规业务逻辑（如表单联动、状态切换）中可放心使用。
但由于其返回对象通常会触发堆内存分配，在高频纠缠的情况下会显著增加 GC压力。
为了追求极致的内存性能并减少 GC 压力，请优先考虑性能更优的update方法。

***

### set

> **set**: (`key`, `value`, `weight?`) => `void`

Defined in: [types/types.ts:347](https://github.com/Nzy19940403/meshflow/blob/4f22e67d20008cf640ed98ce72606669d06f3c53/utils/core/types/types.ts#L347)

提交【绝对值覆盖】提案

#### Parameters

##### key

[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

目标节点的状态属性名

##### value

`any`

期望设置的新值

##### weight?

`number`

提案权重 (默认: 1)。当同一批次内有多个规则试图 `set` 同一个 key 时，权重最高者获胜。

#### Returns

`void`

#### Description

直接用新值覆盖目标节点的指定状态。

***

### update

> **update**: (`key`, `delta`, `op?`) => `void`

Defined in: [types/types.ts:355](https://github.com/Nzy19940403/meshflow/blob/4f22e67d20008cf640ed98ce72606669d06f3c53/utils/core/types/types.ts#L355)

提交【增量运算】提案

#### Parameters

##### key

[`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

目标节点的状态属性名

##### delta

`any`

增量数据 (如累加的数值、需追加的数组元素)

##### op?

[`EntangleOp`](TypeAlias.EntangleOp.md)

运算策略 (默认: 'add')。支持：累加(add)、移除(remove)、交集(intersect)、并集(union)、深度合并(merge)。

#### Returns

`void`

#### Description

提交一个增量操作，引擎会在清算时将其与目标节点的旧值进行合并计算。
