[**MeshFlow Core API**](../../../README.md)

***

[MeshFlow Core API](../../../README.md) / [engine/useEngineManager](../README.md) / MeshEvents

# Interface: MeshEvents

Defined in: [types/types.ts:62](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L62)

🌟 完整事件扩展定义
包含流程控制及“逆转未来”等特殊场景

## Extends

- `BaseMeshEvents`

## Properties

### 0

> **0**: `object`

Defined in: [types/types.ts:38](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L38)

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### token

> **token**: `symbol`

#### Inherited from

`BaseMeshEvents.0`

***

### 1

> **1**: `object`

Defined in: [types/types.ts:63](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L63)

#### duration

> **duration**: `string`

#### token

> **token**: `symbol`

***

### 10

> **10**: `object`

Defined in: [types/types.ts:46](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L46)

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### Inherited from

`BaseMeshEvents.10`

***

### 11

> **11**: `object`

Defined in: [types/types.ts:68](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L68)

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### triggerPath

> **triggerPath**: [`MeshPath`](../type-aliases/MeshPath.md)

***

### 12

> **12**: `object`

Defined in: [types/types.ts:48](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L48)

#### detail?

> `optional` **detail?**: `any`

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### type

> **type**: `number`

#### Inherited from

`BaseMeshEvents.12`

***

### 13

> **13**: `object`

Defined in: [types/types.ts:49](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L49)

#### detail?

> `optional` **detail?**: `any`

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### type

> **type**: `number`

#### Inherited from

`BaseMeshEvents.13`

***

### 14

> **14**: `object`

Defined in: [types/types.ts:50](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L50)

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### type

> **type**: `number`

#### Inherited from

`BaseMeshEvents.14`

***

### 15

> **15**: `object`

Defined in: [types/types.ts:52](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L52)

#### calledBy

> **calledBy**: `number`

#### key

> **key**: `string`

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### value

> **value**: `any`

#### Inherited from

`BaseMeshEvents.15`

***

### 16

> **16**: `object`

Defined in: [types/types.ts:54](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L54)

#### path

> **path**: `string`

#### type

> **type**: `"no_keys"` \| `"no_level"`

#### Inherited from

`BaseMeshEvents.16`

***

### 17

> **17**: `object`

Defined in: [types/types.ts:55](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L55)

#### count

> **count**: `number`

#### observer

> **observer**: `string`

#### target

> **target**: `string`

#### Inherited from

`BaseMeshEvents.17`

***

### 2

> **2**: `object`

Defined in: [types/types.ts:64](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L64)

#### type

> **type**: `number`

***

### 3

> **3**: `object`

Defined in: [types/types.ts:65](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L65)

#### token

> **token**: `symbol`

***

### 4

> **4**: `object`

Defined in: [types/types.ts:39](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L39)

#### detail?

> `optional` **detail?**: `any`

#### type

> **type**: `number`

#### Inherited from

`BaseMeshEvents.4`

***

### 5

> **5**: `object`

Defined in: [types/types.ts:40](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L40)

#### detail?

> `optional` **detail?**: `any`

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### type

> **type**: `number`

#### Inherited from

`BaseMeshEvents.5`

***

### 6

> **6**: `object`

Defined in: [types/types.ts:42](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L42)

#### calledBy

> **calledBy**: `number`

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### Inherited from

`BaseMeshEvents.6`

***

### 7

> **7**: `object`

Defined in: [types/types.ts:43](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L43)

#### calledBy

> **calledBy**: `number`

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### Inherited from

`BaseMeshEvents.7`

***

### 8

> **8**: `object`

Defined in: [types/types.ts:44](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L44)

#### calledBy

> **calledBy**: `number`

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### Inherited from

`BaseMeshEvents.8`

***

### 9

> **9**: `object`

Defined in: [types/types.ts:45](https://github.com/Nzy19940403/meshflow/blob/31d0736a20e62927e2bd9b4877bcced689822f29/utils/core/types/types.ts#L45)

#### error

> **error**: `any`

#### path

> **path**: [`MeshPath`](../type-aliases/MeshPath.md)

#### Inherited from

`BaseMeshEvents.9`
