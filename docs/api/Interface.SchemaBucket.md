[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / SchemaBucket

# Interface: SchemaBucket\<P\>

Defined in: [engine/bucket.ts:260](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L260)

## Type Parameters

### P

`P`

## Methods

### \_evaluate()

> **\_evaluate**(`api`): `any`

Defined in: [engine/bucket.ts:497](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L497)

#### Parameters

##### api

`any`

#### Returns

`any`

***

### \_getSideEffect()

> **\_getSideEffect**(): `object`[]

Defined in: [engine/bucket.ts:439](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L439)

#### Returns

`object`[]

***

### \_isForceNotify()

> **\_isForceNotify**(): `boolean`

Defined in: [engine/bucket.ts:318](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L318)

#### Returns

`boolean`

***

### \_setSideEffect()

> **\_setSideEffect**(`data`): `void`

Defined in: [engine/bucket.ts:435](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L435)

#### Parameters

##### data

###### args

`any`[]

###### fn

(`args`) => `any`

#### Returns

`void`

***

### forceNotify()

> **forceNotify**(): `void`

Defined in: [engine/bucket.ts:314](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L314)

#### Returns

`void`

***

### setRule()

> **setRule**\<`TKeys`\>(`value`, `DepsArray?`): (() => `void`) \| `undefined`

Defined in: [engine/bucket.ts:398](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L398)

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

Defined in: [engine/bucket.ts:344](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L344)

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

Defined in: [engine/bucket.ts:322](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L322)

#### Parameters

##### type

`any`

#### Returns

`void`

***

### setUseCache()

> **setUseCache**(`val`): `void`

Defined in: [engine/bucket.ts:310](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L310)

#### Parameters

##### val

`boolean`

#### Returns

`void`

## Properties

### contract

> **contract**: `ContractType`

Defined in: [engine/bucket.ts:264](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L264)

***

### promiseToken

> **promiseToken**: `any` = `null`

Defined in: [engine/bucket.ts:273](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L273)

***

### useCache

> **useCache**: `boolean` = `true`

Defined in: [engine/bucket.ts:274](https://github.com/Nzy19940403/meshflow/blob/02c48e27af789d6bc65707cc13100a17a3bc2317/utils/core/engine/bucket.ts#L274)
