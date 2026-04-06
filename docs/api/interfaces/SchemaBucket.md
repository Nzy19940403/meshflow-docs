[**MeshFlow Core API**](../README.md)

***

[MeshFlow Core API](../README.md) / SchemaBucket

# Interface: SchemaBucket\<P\>

Defined in: [engine/bucket.ts:261](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L261)

## Type Parameters

### P

`P`

## Properties

### contract

> **contract**: `ContractType`

Defined in: [engine/bucket.ts:266](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L266)

***

### promiseToken

> **promiseToken**: `any` = `null`

Defined in: [engine/bucket.ts:284](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L284)

***

### useCache

> **useCache**: `boolean` = `true`

Defined in: [engine/bucket.ts:286](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L286)

## Methods

### evaluate()

> **evaluate**(`api`): `any`

Defined in: [engine/bucket.ts:455](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L455)

#### Parameters

##### api

`any`

#### Returns

`any`

***

### forceNotify()

> **forceNotify**(): `void`

Defined in: [engine/bucket.ts:311](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L311)

#### Returns

`void`

***

### getSideEffect()

> **getSideEffect**(): `object`[]

Defined in: [engine/bucket.ts:451](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L451)

#### Returns

`object`[]

***

### isForceNotify()

> **isForceNotify**(): `boolean`

Defined in: [engine/bucket.ts:315](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L315)

#### Returns

`boolean`

***

### setDefaultRule()

> **setDefaultRule**(`value`): `void`

Defined in: [engine/bucket.ts:323](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L323)

#### Parameters

##### value

`any`

#### Returns

`void`

***

### setRule()

> **setRule**\<`TKeys`\>(`value`, `DepsArray?`): (() => `void`) \| `undefined`

Defined in: [engine/bucket.ts:393](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L393)

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

\[`number`, (`"type"` \| `"path"` \| `"uid"` \| `"meta"` \| `TKeys`)[], `any`\][]

#### Returns

(() => `void`) \| `undefined`

***

### setRules()

> **setRules**\<`TKeys`\>(`value`, `DepsArray?`): () => `void`

Defined in: [engine/bucket.ts:329](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L329)

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

\[`number`, (`"type"` \| `"path"` \| `"uid"` \| `"meta"` \| `TKeys`)[], `any`\][]

#### Returns

() => `void`

***

### setSideEffect()

> **setSideEffect**(`data`): `void`

Defined in: [engine/bucket.ts:447](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L447)

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

Defined in: [engine/bucket.ts:319](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L319)

#### Parameters

##### type

[`DefaultStrategy`](../enumerations/DefaultStrategy.md)

#### Returns

`void`

***

### setUseCache()

> **setUseCache**(`val`): `void`

Defined in: [engine/bucket.ts:307](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L307)

#### Parameters

##### val

`boolean`

#### Returns

`void`

***

### updateDeps()

> **updateDeps**\<`TKeys`\>(`DepsArray`): `void`

Defined in: [engine/bucket.ts:376](https://github.com/Nzy19940403/meshflow/blob/6a4b044441d79e8fd7ef78238d15993e3c41f1d5/utils/core/engine/bucket.ts#L376)

#### Type Parameters

##### TKeys

`TKeys`

#### Parameters

##### DepsArray

\[`number`, (`"type"` \| `"path"` \| `"uid"` \| `"meta"` \| `TKeys`)[], `any`\][]

#### Returns

`void`
