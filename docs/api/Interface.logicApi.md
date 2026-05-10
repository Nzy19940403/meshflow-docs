[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / logicApi

# Interface: logicApi\<NM, TKeys\>

Defined in: [types/types.ts:247](https://github.com/Nzy19940403/meshflow/blob/0353dfa02467f8f1fc093cd007216804aeff6295/utils/core/types/types.ts#L247)

## Description

桶计算的逻辑块入参类型

## Type Parameters

### NM

`NM`

### TKeys

`TKeys` *extends* [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\>

## Properties

### slot

> **slot**: `object`

Defined in: [types/types.ts:248](https://github.com/Nzy19940403/meshflow/blob/0353dfa02467f8f1fc093cd007216804aeff6295/utils/core/types/types.ts#L248)

#### affectedTatget

> **affectedTatget**: `any`

#### targetMeta

> **targetMeta**: `any`

#### triggerTargets

> **triggerTargets**: `Record`\<`IsNever`\<`TKeys`\> *extends* `true` ? [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\> \| [`InternalKeys`](TypeAlias.InternalKeys.md) : `TKeys`, `any`\> & `object`[]
