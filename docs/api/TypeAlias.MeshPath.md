[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshPath

# Type Alias: MeshPath

> **MeshPath** = `string` \| `number` \| `symbol`

Defined in: [types/types.ts:144](https://github.com/Nzy19940403/meshflow/blob/ddcad53ce63eb1da4003692fadea127f15dea6a7/utils/core/types/types.ts#L144)

MeshPath：多模态路径标识符

## Description

定义 MeshFlow 节点的唯一寻址路径。支持多种原始类型以适配不同的业务场景：
- **string**: 💡 推荐。语义化最强，支持深度路径嵌套（如 `user.profile.id`）。
- **number**: ✅ 稳定。常用于位操作、枚举 ID 或高性能数组索引节点，与引擎内部 UID 逻辑契合度高。
- **symbol**: ⚠️ **实验性**。用于创建绝对私有的节点，防止意外覆盖。

## Note

**关于 Symbol 的约束**：
目前版本下，Symbol 路径无法被标准 JSON 序列化，可能会出现意料之外的bug。
