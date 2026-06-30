[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useMeshFlow

# Function: useMeshFlow()

> **useMeshFlow**\<`S`, `T`, `M`, `NM`, `P`\>(`id`, `Schema`, `options`): `Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `destroyPlugin`: () => `void`; `dispose`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: [`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md); `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `any`, `NM`\>; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`, `K`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:172](https://github.com/Nzy19940403/meshflow/blob/9444dddc0f7d1bdcee303c2beab39538d87d05dd/utils/core/engine/useEngineManager.ts#L172)

[BOT] 初始化并获取 MeshFlow 引擎实例——**这是所有 API 的入口**

## 返回的 Engine 对象包含五大模块
| 模块 | 用途 | 核心 API |
|------|------|----------|
| `engine.config` | 规则与拓扑编排 | `SetRule` `SetRules` `useEntangle` `notifyAll` |
| `engine.data` | 数据大盘读写 | `SetValue` `GetValue` `StageValue` `SilentSet` |
| `engine.hooks` | 生命周期钩子 | `onError` `onSuccess` `onStart` |
| `engine.dependency` | 图分析工具 | `GetAllDependency` `GetDependencyOrder` |
| `engine.modules` | 扩展模块 | `history` `form` `validator` `render` |

## 写入 API 速查
| 方法 | 触发拓扑? | 使用场景 |
|------|----------|---------|
| `SetValue` | 立即点火 | 用户交互、表单输入 |
| `SetValues` | 批量点火 | 一次修改多个节点 |
| `StageValue` | 微任务聚合 | WebSocket 高频推送 |
| `SilentSet` | 不点火 | 系统重置、背景降噪 |

* **查看完整 API 文档：** [EngineCoreAPI](Interface.EngineCoreAPI.md)

## Type Parameters

### S

`S` *extends* `Record`\<`string`, `any`\> \| readonly `Record`\<`string`, `any`\>[]

— Schema 类型定义（`as const` 可推导精确路径字面量）

### T

`T`

— UI 信号类型（Vue `Ref<number>` 或 React `()=>void`）

### M

`M` *extends* `Record`\<`string`, `any`\>

— 扩展模块映射类型（如 `{ useInternalForm, useHistory }`）

### NM

`NM` *extends* `Record`\<`string`, `any`\> = `IsNever`\<`NormalizeSchema`\<`S`\>\> *extends* `true` ? `Record`\<`KeysOfUnion`\<`NormalizeSchema`\<`S`\>\>, `any`\> : `InferLeafType`\<`S`\>

— MetaType，推导各节点的属性键名供 `triggerKeys` 自动补全

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md) = \[`InferLeafPath`\<`S`\>\] *extends* \[`never`\] ? [`MeshPath`](TypeAlias.MeshPath.md) : `string` & `object` \| `InferLeafPath`\<`S`\>

— 路径字面量联合类型（由 Schema 自动推导）

## Parameters

### id

[`MeshPath`](TypeAlias.MeshPath.md)

— 引擎实例唯一标识（字符串/数字/符号），跨组件通过此 ID 复用

### Schema

`S`

— 类型定义模板（仅 TS 类型推导，运行时通过 modules 注册节点）

### options

— 引擎配置项与扩展模块 [MeshFlowOptions](Interface.MeshFlowOptions.md)

#### config?

\{ `BACKPRESSURE_LIMIT?`: `number`; `MAX_CONCURRENT_TASKS?`: `number`; `NODE_QUOTA_PER_FRAME?`: `number`; `useEntangleStep?`: `number`; `useGreedy?`: `boolean`; \}

#### config.BACKPRESSURE_LIMIT?

`number`

#### config.MAX_CONCURRENT_TASKS?

`number`

#### config.NODE_QUOTA_PER_FRAME?

`number`

#### config.useEntangleStep?

`number`

#### config.useGreedy?

`boolean`

#### metaType?

`NM`

#### modules?

`M`

#### UITrigger?

\{ `signalCreator`: () => `T`; `signalTrigger`: (`signal`) => `void`; \}

#### UITrigger.signalCreator

() => `T`

#### UITrigger.signalTrigger

(`signal`) => `void`

## Returns

`Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `destroyPlugin`: () => `void`; `dispose`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: [`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md); `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `any`, `NM`\>; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`, `K`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Engine 对象，完整类型签名见 [EngineCoreAPI](Interface.EngineCoreAPI.md)

## Example

```ts
const engine = useMeshFlow('my-engine', schema, {
  UITrigger: {
    signalCreator: () => ref(0),      // Vue
    signalTrigger: (s) => s.value++,
  },
  modules: { useInternalForm },
});
engine.config.SetRule('a.path', 'b.path', 'value', {
  logic: ({ slot }) => slot.triggerTargets[0].count + 1,
});
engine.config.notifyAll();
```
