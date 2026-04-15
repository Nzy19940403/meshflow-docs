[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowHistory

# Type Alias: MeshFlowHistory

> **MeshFlowHistory** = `object`

Defined in: [types/types.ts:106](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L106)

## Properties

### CreateHistoryAction

> **CreateHistoryAction**: (`metadata`, `cb`) => `object`

Defined in: [types/types.ts:112](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L112)

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

Defined in: [types/types.ts:111](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L111)

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

Defined in: [types/types.ts:108](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L108)

#### Returns

`void`

***

### Undo

> **Undo**: () => `void`

Defined in: [types/types.ts:107](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L107)

#### Returns

`void`

***

### updateRedoSize

> **updateRedoSize**: `any`

Defined in: [types/types.ts:110](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L110)

***

### updateUndoSize

> **updateUndoSize**: `any`

Defined in: [types/types.ts:109](https://github.com/Nzy19940403/meshflow/blob/1cc7168177780e856bb93c303087b09e2f8eb72d/utils/core/types/types.ts#L109)
