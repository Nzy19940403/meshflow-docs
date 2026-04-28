[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / logicApi

# Interface: logicApi\<NM, TKeys\>

Defined in: [types/types.ts:229](https://github.com/Nzy19940403/meshflow/blob/4759c57363bfccb11176b66927a1929c0359f45b/utils/core/types/types.ts#L229)

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

Defined in: [types/types.ts:230](https://github.com/Nzy19940403/meshflow/blob/4759c57363bfccb11176b66927a1929c0359f45b/utils/core/types/types.ts#L230)

#### affectedTatget

> **affectedTatget**: `any`

#### targetMeta

> **targetMeta**: `any`

#### triggerTargets

> **triggerTargets**: `Record`\<`IsNever`\<`TKeys`\> *extends* `true` ? [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\> \| [`InternalKeys`](TypeAlias.InternalKeys.md) : `TKeys`, `any`\> & `object`[]
