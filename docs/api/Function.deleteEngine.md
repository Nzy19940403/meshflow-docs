[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / deleteEngine

# Function: deleteEngine()

> **deleteEngine**(`id`): `void`

Defined in: [engine/useEngineManager.ts:391](https://github.com/Nzy19940403/meshflow/blob/b7f91311a42ef1343f61c95646dc8eaa7375fde8/utils/core/engine/useEngineManager.ts#L391)

🗑️ 实例销毁：从全局池中注销并释放引擎资源。
*

## Parameters

### id

[`MeshPath`](TypeAlias.MeshPath.md)

待销毁引擎的唯一标识符

## Returns

`void`

## Description

彻底切断引擎与其所有插件、异步任务的联系，并从内存中移除引用。
*
