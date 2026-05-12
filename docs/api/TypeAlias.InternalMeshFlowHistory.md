[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / InternalMeshFlowHistory

# Type Alias: InternalMeshFlowHistory

> **InternalMeshFlowHistory** = `object`

Defined in: [types/types.ts:131](https://github.com/Nzy19940403/meshflow/blob/b14c04694109dc080c72e63a6780d0f4de2f3894/utils/core/types/types.ts#L131)

## Properties

### CommitTransaction

> **CommitTransaction**: (`version`) => `void`

Defined in: [types/types.ts:133](https://github.com/Nzy19940403/meshflow/blob/b14c04694109dc080c72e63a6780d0f4de2f3894/utils/core/types/types.ts#L133)

#### Parameters

##### version

`number`

#### Returns

`void`

***

### GetCurrentVersion

> **GetCurrentVersion**: () => `number`

Defined in: [types/types.ts:136](https://github.com/Nzy19940403/meshflow/blob/b14c04694109dc080c72e63a6780d0f4de2f3894/utils/core/types/types.ts#L136)

#### Returns

`number`

***

### RecordMutation

> **RecordMutation**: (`path`, `key`, `oldVal`, `newVal`) => `void`

Defined in: [types/types.ts:134](https://github.com/Nzy19940403/meshflow/blob/b14c04694109dc080c72e63a6780d0f4de2f3894/utils/core/types/types.ts#L134)

#### Parameters

##### path

[`MeshPath`](TypeAlias.MeshPath.md)

##### key

`any`

##### oldVal

`any`

##### newVal

`any`

#### Returns

`void`

***

### RecordSilentMutation

> **RecordSilentMutation**: (`path`, `key`, `oldVal`, `newVal`) => `void`

Defined in: [types/types.ts:135](https://github.com/Nzy19940403/meshflow/blob/b14c04694109dc080c72e63a6780d0f4de2f3894/utils/core/types/types.ts#L135)

#### Parameters

##### path

`string`

##### key

`string`

##### oldVal

`any`

##### newVal

`any`

#### Returns

`void`

***

### StartTransaction

> **StartTransaction**: () => `void`

Defined in: [types/types.ts:132](https://github.com/Nzy19940403/meshflow/blob/b14c04694109dc080c72e63a6780d0f4de2f3894/utils/core/types/types.ts#L132)

#### Returns

`void`
