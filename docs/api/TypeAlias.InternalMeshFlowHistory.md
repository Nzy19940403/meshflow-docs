[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / InternalMeshFlowHistory

# Type Alias: InternalMeshFlowHistory

> **InternalMeshFlowHistory** = `object`

Defined in: [types/types.ts:133](https://github.com/Nzy19940403/meshflow/blob/4f3e87071c19a7fafbb4c69a7797322513a58d49/utils/core/types/types.ts#L133)

## Properties

### CommitTransaction

> **CommitTransaction**: (`version`) => `void`

Defined in: [types/types.ts:135](https://github.com/Nzy19940403/meshflow/blob/4f3e87071c19a7fafbb4c69a7797322513a58d49/utils/core/types/types.ts#L135)

#### Parameters

##### version

`number`

#### Returns

`void`

***

### GetCurrentVersion

> **GetCurrentVersion**: () => `number`

Defined in: [types/types.ts:138](https://github.com/Nzy19940403/meshflow/blob/4f3e87071c19a7fafbb4c69a7797322513a58d49/utils/core/types/types.ts#L138)

#### Returns

`number`

***

### RecordMutation

> **RecordMutation**: (`path`, `key`, `oldVal`, `newVal`) => `void`

Defined in: [types/types.ts:136](https://github.com/Nzy19940403/meshflow/blob/4f3e87071c19a7fafbb4c69a7797322513a58d49/utils/core/types/types.ts#L136)

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

Defined in: [types/types.ts:137](https://github.com/Nzy19940403/meshflow/blob/4f3e87071c19a7fafbb4c69a7797322513a58d49/utils/core/types/types.ts#L137)

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

Defined in: [types/types.ts:134](https://github.com/Nzy19940403/meshflow/blob/4f3e87071c19a7fafbb4c69a7797322513a58d49/utils/core/types/types.ts#L134)

#### Returns

`void`
