[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / deleteEngine

# Function: deleteEngine()

> **deleteEngine**(`id`): `void`

Defined in: [engine/useEngineManager.ts:464](https://github.com/Nzy19940403/meshflow/blob/05e9c57e32f574e6032c4c7cb9387eb2db979ec3/utils/core/engine/useEngineManager.ts#L464)

[BOT] 实例销毁——从全局池注销并释放引擎全部资源

彻底切断引擎与其所有插件、异步任务的联系，并从内存中移除引用。

## Parameters

### id

[`MeshPath`](TypeAlias.MeshPath.md)

— 待销毁引擎的唯一标识符

## Returns

`void`

## See

 - useMeshFlow 创建引擎
 - useEngine 获取引擎
