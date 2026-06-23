[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / useEngine

# Function: useEngine()

> **useEngine**\<`M`, `P`, `NM`, `S`, `T`\>(`id`): `Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `destroyPlugin`: () => `void`; `dispose`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: [`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md); `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `any`, `NM`\>; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`, `K`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Defined in: [engine/useEngineManager.ts:435](https://github.com/Nzy19940403/meshflow/blob/265fbbaf4a2f94939a97c5a49f82c48c483acb86/utils/core/engine/useEngineManager.ts#L435)

[BOT] 实例检索——跨文件/组件获取已激活的 Engine 实例

只要引擎通过 `useMeshFlow` 初始化过，任何地方通过 ID 即可获取，无需 Prop Drilling。

## Type Parameters

### M

`M` *extends* `Record`\<`string`, `any`\> = \{ \}

— 动态插件类型 (可选)

### P

`P` *extends* [`MeshPath`](TypeAlias.MeshPath.md) = `any`

— 路径类型标识 (可选)

### NM

`NM` *extends* `Record`\<`string`, `any`\> = `Record`\<`string`, `any`\>

### S

`S` = `any`

### T

`T` = `any`

## Parameters

### id

[`MeshPath`](TypeAlias.MeshPath.md)

— 引擎实例的唯一 ID

## Returns

`Engine`\<\{ `batchRenderExport`: \{ `init`: `any`; \}; `destroyPlugin`: () => `void`; `dispose`: () => `void`; `formExports`: \{ \}; `GetAllDependency`: () => `number`[][]; `GetDependencyOrder`: () => `number`[][]; `GetGroupByPath`: (`path`) => [`MeshFlowGroupNode`](Interface.MeshFlowGroupNode.md)\<[`MeshPath`](TypeAlias.MeshPath.md)\>; `GetValue`: (`path`, `key`) => `any`; `hasRenderGate`: () => `boolean`; `historyExports`: [`MeshFlowHistory`](TypeAlias.MeshFlowHistory.md); `notifyAll`: () => `Promise`\<`void`\>; `onError`: (`cb`) => `Unsubscribe`; `onStart`: (`cb`) => () => `void`; `onSuccess`: (`cb`) => () => `void`; `scheduler`: [`MeshScheduler`](Class.MeshScheduler.md)\<`T`, `P`, `any`, `NM`\>; `SetRule`: \<`K`, `TKeys`\>(`outDegreePath`, `inDegreePath`, `key`, `options`) => `void`; `SetRules`: \<`TKeys`, `K`\>(`outDegreePaths`, `inDegreePath`, `key`, `options`) => `void`; `SetStrategy`: (`path`, `key`, `strategy`) => `void`; `SettleTasks`: (`array`) => `void`; `SetValue`: (`path`, `key`, `value`) => `void`; `SetValues`: (`updates`) => `void`; `SilentSet`: (`path`, `key`, `value`) => `boolean`; `StageValue`: (`path`, `key`, `value`) => `void`; `useEntangle`: \<`State`\>(`config`) => `void`; `usePlugin`: (`plugin`) => () => `void`; `validatorExports`: \{ `SetValidators?`: (`path`, `options`) => `void`; \}; \}, `M`, `P`\>

Engine 对象，与 `useMeshFlow` 返回类型一致

## Throws

MeshError.EngineNotFound — ID 对应的实例不存在

## See

 - useMeshFlow 创建引擎
 - deleteEngine 销毁引擎
