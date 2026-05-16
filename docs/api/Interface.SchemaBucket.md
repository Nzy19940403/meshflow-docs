[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SchemaBucket

# Interface: SchemaBucket\<P\>

Defined in: [engine/bucket.ts:260](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L260)

## Type Parameters

### P

`P`

## Methods

### \_evaluate()

> **\_evaluate**(`api`): `any`

Defined in: [engine/bucket.ts:500](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L500)

#### Parameters

##### api

`any`

#### Returns

`any`

***

### \_getSideEffect()

> **\_getSideEffect**(): `object`[]

Defined in: [engine/bucket.ts:442](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L442)

#### Returns

`object`[]

***

### \_isForceNotify()

> **\_isForceNotify**(): `boolean`

Defined in: [engine/bucket.ts:318](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L318)

#### Returns

`boolean`

***

### \_setSideEffect()

> **\_setSideEffect**(`data`): `void`

Defined in: [engine/bucket.ts:438](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L438)

#### Parameters

##### data

###### args

`any`[]

###### fn

(`args`) => `any`

#### Returns

`void`

***

### \_syncCache()

> **\_syncCache**(`val`): `void`

Defined in: [engine/bucket.ts:321](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L321)

#### Parameters

##### val

`any`

#### Returns

`void`

***

### forceNotify()

> **forceNotify**(): `void`

Defined in: [engine/bucket.ts:314](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L314)

#### Returns

`void`

***

### setRule()

> **setRule**\<`TKeys`\>(`value`, `DepsArray?`): (() => `void`) \| `undefined`

Defined in: [engine/bucket.ts:401](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L401)

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

Defined in: [engine/bucket.ts:347](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L347)

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

### setStrategy()

> **setStrategy**(`type`): `void`

Defined in: [engine/bucket.ts:325](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L325)

#### Parameters

##### type

`any`

#### Returns

`void`

***

### setUseCache()

> **setUseCache**(`val`): `void`

Defined in: [engine/bucket.ts:310](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L310)

#### Parameters

##### val

`boolean`

#### Returns

`void`

## Properties

### contract

> **contract**: `ContractType`

Defined in: [engine/bucket.ts:264](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L264)

***

### promiseToken

> **promiseToken**: `any` = `null`

Defined in: [engine/bucket.ts:273](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L273)

***

### useCache

> **useCache**: `boolean` = `true`

Defined in: [engine/bucket.ts:274](https://github.com/Nzy19940403/meshflow/blob/91cd3596ef5e0c5dd0f2ea0297df1188c1919be6/utils/core/engine/bucket.ts#L274)
