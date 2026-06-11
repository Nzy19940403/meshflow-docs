[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useMeshFlowDefiner

# Function: useMeshFlowDefiner()

> **useMeshFlowDefiner**\<`P`, `S`, `NM`\>(): \<`T`, `M`\>(`id`, `schema`, `options`) => `Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `destroyPlugin`: () => `void`; `dispose`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: [`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md); `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `any`, `NM`\>; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`, `K`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:394](https://github.com/Nzy19940403/meshflow/blob/0aa9aa4ca802d007f7bdb0a89e97b12aa9103ab7/utils/core/engine/useEngineManager.ts#L394)

[BOT] 类型工厂（Currying）——预先锁定泛型，生成专属实例化函数

## 与 `useMeshFlow` 的差异
| | `useMeshFlow` | `useMeshFlowDefiner` |
|--|--------------|---------------------|
| 泛型位置 | 每次调用都写 | 工厂定义时写一次 |
| 路径推导 | 从 Schema 推导 | 手动锁定 |
| 适用场景 | 单页面/简单项目 | 大型项目、多次实例化 |

工作流:
1. 配置文件中定义: `const mesh = useMeshFlowDefiner<MyPaths, MyMeta>();`
2. 业务中实例化: `const engine = mesh('app-engine', schema, { ... });`

## Type Parameters

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md)

— 预锁定的路径字面量类型

### S

`S` *extends* `any`[] \| `Record`\<`string`, `any`\> = `any`

— Schema 结构类型

### NM

`NM` *extends* `Record`\<`string`, `any`\> = `any`

— 预锁定的 MetaType

## Returns

返回一个接收 (id, schema, options) 的实例化函数

\<`T`, `M`\>(`id`, `schema`, `options`) => `Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `destroyPlugin`: () => `void`; `dispose`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: [`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md); `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `any`, `NM`\>; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`, `K`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

## See

useMeshFlow 直接创建引擎
