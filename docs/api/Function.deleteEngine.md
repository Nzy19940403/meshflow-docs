[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / deleteEngine

# Function: deleteEngine()

> **deleteEngine**(`id`): `void`

Defined in: [engine/useEngineManager.ts:414](https://github.com/Nzy19940403/meshflow/blob/e51ccf7a7adb4f228cd37b5e3258184c5e5f210f/utils/core/engine/useEngineManager.ts#L414)

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
