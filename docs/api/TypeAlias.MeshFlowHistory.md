[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowHistory

# Type Alias: MeshFlowHistory

> **MeshFlowHistory** = `object`

Defined in: [types/types.ts:109](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L109)

## Properties

### CreateHistoryAction

> **CreateHistoryAction**: (`metadata`, `cb`) => `object`

Defined in: [types/types.ts:115](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L115)

#### Parameters

##### metadata

\[\{ `path`: `string`; `value`: `any`; \}, \{ `path`: `string`; `value`: `any`; \}\]

##### cb

`any`

#### Returns

`object`

##### redoAction

> **redoAction**: () => `any`

###### Returns

`any`

##### undoAction

> **undoAction**: () => `any`

###### Returns

`any`

***

### PushIntoHistory

> **PushIntoHistory**: (`action`, `cleanRedo?`) => `void`

Defined in: [types/types.ts:114](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L114)

#### Parameters

##### action

[`HistoryActionItem`](TypeAlias.HistoryActionItem.md)

##### cleanRedo?

`boolean`

#### Returns

`void`

***

### Redo

> **Redo**: () => `void`

Defined in: [types/types.ts:111](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L111)

#### Returns

`void`

***

### Undo

> **Undo**: () => `void`

Defined in: [types/types.ts:110](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L110)

#### Returns

`void`

***

### updateRedoSize

> **updateRedoSize**: `any`

Defined in: [types/types.ts:113](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L113)

***

### updateUndoSize

> **updateUndoSize**: `any`

Defined in: [types/types.ts:112](https://github.com/Nzy19940403/meshflow/blob/75f4b1d4cf2a9eb3f1a3128b809f2d48465439ba/utils/core/types/types.ts#L112)
