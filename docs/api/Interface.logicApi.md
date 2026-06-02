[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / logicApi

# Interface: logicApi\<NM, TKeys\>

Defined in: [types/types.ts:252](https://github.com/Nzy19940403/meshflow/blob/fcf39d06b1824095391fde69e095c3c3c26e602b/utils/core/types/types.ts#L252)

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

Defined in: [types/types.ts:253](https://github.com/Nzy19940403/meshflow/blob/fcf39d06b1824095391fde69e095c3c3c26e602b/utils/core/types/types.ts#L253)

#### affectedTatget

> **affectedTatget**: `any`

#### targetMeta

> **targetMeta**: `any`

#### triggerTargets

> **triggerTargets**: `Record`\<`IsNever`\<`TKeys`\> *extends* `true` ? `SuggestKey`\<`NM`\> \| [`InternalKeys`](TypeAlias.InternalKeys.md) : `TKeys`, `any`\> & `object`[]
