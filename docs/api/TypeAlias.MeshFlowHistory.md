[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / MeshFlowHistory

# Type Alias: MeshFlowHistory

> **MeshFlowHistory** = `object`

Defined in: [types/types.ts:99](https://github.com/Nzy19940403/meshflow/blob/d471fe40db8a2746b027e015c9931162dbbe48dd/utils/core/types/types.ts#L99)

## Properties

### CreateHistoryAction

> **CreateHistoryAction**: (`metadata`, `cb`) => `object`

Defined in: [types/types.ts:105](https://github.com/Nzy19940403/meshflow/blob/d471fe40db8a2746b027e015c9931162dbbe48dd/utils/core/types/types.ts#L105)

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

Defined in: [types/types.ts:104](https://github.com/Nzy19940403/meshflow/blob/d471fe40db8a2746b027e015c9931162dbbe48dd/utils/core/types/types.ts#L104)

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

Defined in: [types/types.ts:101](https://github.com/Nzy19940403/meshflow/blob/d471fe40db8a2746b027e015c9931162dbbe48dd/utils/core/types/types.ts#L101)

#### Returns

`void`

***

### Undo

> **Undo**: () => `void`

Defined in: [types/types.ts:100](https://github.com/Nzy19940403/meshflow/blob/d471fe40db8a2746b027e015c9931162dbbe48dd/utils/core/types/types.ts#L100)

#### Returns

`void`

***

### updateRedoSize

> **updateRedoSize**: `any`

Defined in: [types/types.ts:103](https://github.com/Nzy19940403/meshflow/blob/d471fe40db8a2746b027e015c9931162dbbe48dd/utils/core/types/types.ts#L103)

***

### updateUndoSize

> **updateUndoSize**: `any`

Defined in: [types/types.ts:102](https://github.com/Nzy19940403/meshflow/blob/d471fe40db8a2746b027e015c9931162dbbe48dd/utils/core/types/types.ts#L102)
