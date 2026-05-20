[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SchemaBucket

# Interface: SchemaBucket\<P\>

Defined in: [engine/bucket.ts:260](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L260)

## Type Parameters

### P

`P`

## Methods

### evaluate()

> **evaluate**(`api`): `any`

Defined in: [engine/bucket.ts:500](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L500)

#### Parameters

##### api

`any`

#### Returns

`any`

***

### forceNotify()

> **forceNotify**(): `void`

Defined in: [engine/bucket.ts:314](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L314)

#### Returns

`void`

***

### getSideEffect()

> **getSideEffect**(): `object`[]

Defined in: [engine/bucket.ts:442](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L442)

#### Returns

`object`[]

***

### isForceNotify()

> **isForceNotify**(): `boolean`

Defined in: [engine/bucket.ts:318](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L318)

#### Returns

`boolean`

***

### setRule()

> **setRule**\<`TKeys`\>(`value`, `DepsArray?`): (() => `void`) \| `undefined`

Defined in: [engine/bucket.ts:401](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L401)

#### Type Parameters

##### TKeys

`TKeys` = `any`

#### Parameters

##### value

###### entityId?

`any`

###### logic

`any`

###### priority

`any`

###### targetUid

`number`

###### triggerUids

`number`[]

###### value

`any`

##### DepsArray?

\[`number`, `any`[], `any`\][]

#### Returns

(() => `void`) \| `undefined`

***

### setRules()

> **setRules**\<`TKeys`\>(`value`, `DepsArray?`): () => `void`

Defined in: [engine/bucket.ts:347](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L347)

#### Type Parameters

##### TKeys

`TKeys` = `any`

#### Parameters

##### value

###### entityId?

`any`

###### logic

`any`

###### priority

`any`

###### targetUid

`number`

###### triggerUids

`number`[]

###### value

`any`

##### DepsArray?

\[`number`, `any`[], `any`\][]

#### Returns

() => `void`

***

### setSideEffect()

> **setSideEffect**(`data`): `void`

Defined in: [engine/bucket.ts:438](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L438)

#### Parameters

##### data

###### args

`any`[]

###### fn

(`args`) => `any`

#### Returns

`void`

***

### setStrategy()

> **setStrategy**(`type`): `void`

Defined in: [engine/bucket.ts:325](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L325)

#### Parameters

##### type

`any`

#### Returns

`void`

***

### setUseCache()

> **setUseCache**(`val`): `void`

Defined in: [engine/bucket.ts:310](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L310)

#### Parameters

##### val

`boolean`

#### Returns

`void`

***

### syncCache()

> **syncCache**(`val`): `void`

Defined in: [engine/bucket.ts:321](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L321)

#### Parameters

##### val

`any`

#### Returns

`void`

## Properties

### \_contract

> **\_contract**: `ContractType`

Defined in: [engine/bucket.ts:264](https://github.com/Nzy19940403/meshflow/blob/147eb47b137334b28f467d2a28612c7db8cfee59/utils/core/engine/bucket.ts#L264)
