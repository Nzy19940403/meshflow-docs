[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / deleteEngine

# Function: deleteEngine()

> **deleteEngine**(`id`): `void`

Defined in: [engine/useEngineManager.ts:414](https://github.com/Nzy19940403/meshflow/blob/370b128ce2a13d22c13707773b2b84f6343b4fd5/utils/core/engine/useEngineManager.ts#L414)

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
