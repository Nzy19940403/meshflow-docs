[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / CreateRule

# Function: CreateRule()

> **CreateRule**\<`K`, `NM`, `TKeys`\>(`targetUid`, `targetKey`, `options`): `object`

Defined in: [dependency/useSetRule.ts:99](https://github.com/Nzy19940403/meshflow/blob/5de7910444268e75421dd6837e9f280446469cde/utils/core/dependency/useSetRule.ts#L99)

## Type Parameters

### K

`K`

### NM

`NM`

### TKeys

`TKeys` *extends* `string` \| `number` \| `symbol` \| `string` & `object`

## Parameters

### targetUid

`number`

### targetKey

`K`

### options

#### logic

(`api`) => `any`

#### priority?

`number`

#### triggerKeys

([`InternalKeys`](TypeAlias.InternalKeys.md) \| `TKeys`)[]

#### triggerUids

`number`[]

#### value?

`any`

## Returns

`object`

### \_hasRun

> **\_hasRun**: `boolean` = `false`

### \_preAllocatedDeps

> **\_preAllocatedDeps**: `any`[] = `preAllocatedDeps`

### logic

> **logic**: (`api`) => `any` = `options.logic`

#### Parameters

##### api

[`logicApi`](Interface.logicApi.md)\<`NM`, `TKeys`\>

#### Returns

`any`

### priority

> **priority**: `number`

### targetKey

> **targetKey**: `K`

### targetUid

> **targetUid**: `number`

### triggerKeys

> **triggerKeys**: ([`InternalKeys`](TypeAlias.InternalKeys.md) \| `TKeys`)[]

### triggerUids

> **triggerUids**: `number`[] = `options.triggerUids`

### value

> **value**: `any` = `options.value`
