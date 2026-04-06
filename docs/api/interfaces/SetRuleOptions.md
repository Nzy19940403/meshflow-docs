[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / SetRuleOptions

# Interface: SetRuleOptions\<NM, TKeys\>

Defined in: [types/types.ts:172](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L172)

## Type Parameters

### NM

`NM`

### TKeys

`TKeys` *extends* `KeysOfUnion`\<`NM`\>

## Properties

### cacheStrategy?

> `optional` **cacheStrategy?**: `"none"` \| `"shallow"`

Defined in: [types/types.ts:179](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L179)

***

### effect?

> `optional` **effect?**: (`args`) => `any`

Defined in: [types/types.ts:177](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L177)

#### Parameters

##### args

`any`

#### Returns

`any`

***

### effectArgs?

> `optional` **effectArgs?**: `KeysOfUnion`\<`NM`\>[]

Defined in: [types/types.ts:178](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L178)

***

### forceNotify?

> `optional` **forceNotify?**: `boolean`

Defined in: [types/types.ts:175](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L175)

***

### logic

> **logic**: (`api`) => `any`

Defined in: [types/types.ts:176](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L176)

#### Parameters

##### api

`logicApi`\<`TKeys`\>

#### Returns

`any`

***

### priority?

> `optional` **priority?**: `number`

Defined in: [types/types.ts:174](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L174)

***

### triggerKeys?

> `optional` **triggerKeys?**: (`"type"` \| `"path"` \| `"uid"` \| `"meta"` \| `TKeys`)[]

Defined in: [types/types.ts:180](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L180)

***

### value?

> `optional` **value?**: `any`

Defined in: [types/types.ts:173](https://github.com/Nzy19940403/meshflow/blob/851e3f10573edbcfafb6ad53b079e4487ddd4cd5/utils/core/types/types.ts#L173)
