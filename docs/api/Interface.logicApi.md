[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / logicApi

# Interface: logicApi\<NM, TKeys\>

Defined in: [types/types.ts:252](https://github.com/Nzy19940403/meshflow/blob/560f2a0855f2e23742a3e6890c2024b848a7571b/utils/core/types/types.ts#L252)

## Description

桶计算的逻辑块入参类型

## Type Parameters

### NM

`NM`

### TKeys

`TKeys` *extends* `SuggestKey`\<`NM`\>

## Properties

### slot

> **slot**: `object`

Defined in: [types/types.ts:253](https://github.com/Nzy19940403/meshflow/blob/560f2a0855f2e23742a3e6890c2024b848a7571b/utils/core/types/types.ts#L253)

#### affectedTatget

> **affectedTatget**: `any`

#### targetMeta

> **targetMeta**: `any`

#### triggerTargets

> **triggerTargets**: `Record`\<`IsNever`\<`TKeys`\> *extends* `true` ? `SuggestKey`\<`NM`\> \| [`InternalKeys`](TypeAlias.InternalKeys.md) : `TKeys`, `any`\> & `object`[]
