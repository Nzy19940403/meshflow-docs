[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SchemaBucket

# Interface: SchemaBucket\<P\>

Defined in: [engine/bucket.ts:259](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L259)

## Type Parameters

### P

`P`

## Methods

### evaluate()

> **evaluate**(`api`): `any`

Defined in: [engine/bucket.ts:466](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L466)

#### Parameters

##### api

`any`

#### Returns

`any`

***

### forceNotify()

> **forceNotify**(): `void`

Defined in: [engine/bucket.ts:313](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L313)

#### Returns

`void`

***

### getSideEffect()

> **getSideEffect**(): `object`[]

Defined in: [engine/bucket.ts:437](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L437)

#### Returns

`object`[]

***

### isForceNotify()

> **isForceNotify**(): `boolean`

Defined in: [engine/bucket.ts:317](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L317)

#### Returns

`boolean`

***

### setDefaultRule()

> **setDefaultRule**(`value`): `void`

Defined in: [engine/bucket.ts:325](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L325)

#### Parameters

##### value

`any`

#### Returns

`void`

***

### setRule()

> **setRule**\<`TKeys`\>(`value`, `DepsArray?`): (() => `void`) \| `undefined`

Defined in: [engine/bucket.ts:396](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L396)

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

Defined in: [engine/bucket.ts:343](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L343)

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

Defined in: [engine/bucket.ts:433](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L433)

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

Defined in: [engine/bucket.ts:321](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L321)

#### Parameters

##### type

`any`

#### Returns

`void`

***

### setUseCache()

> **setUseCache**(`val`): `void`

Defined in: [engine/bucket.ts:309](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L309)

#### Parameters

##### val

`boolean`

#### Returns

`void`

***

### updateDeps()

> **updateDeps**\<`TKeys`\>(`DepsArray`): `void`

Defined in: [engine/bucket.ts:374](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L374)

#### Type Parameters

##### TKeys

`TKeys`

#### Parameters

##### DepsArray

\[`number`, `any`[], `any`\][]

#### Returns

`void`

## Properties

### contract

> **contract**: `ContractType`

Defined in: [engine/bucket.ts:263](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L263)

***

### promiseToken

> **promiseToken**: `any` = `null`

Defined in: [engine/bucket.ts:272](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L272)

***

### useCache

> **useCache**: `boolean` = `true`

Defined in: [engine/bucket.ts:273](https://github.com/Nzy19940403/meshflow/blob/0e4b3fc2d75935e79eaacfe75a0a8d0bc23b82cd/utils/core/engine/bucket.ts#L273)
