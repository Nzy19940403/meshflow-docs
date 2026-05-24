[**MeshFlow Core API**](README.md)

***

[MeshFlow Core API](README.md) / logicApi

# Interface: logicApi\<NM, TKeys\>

Defined in: [types/types.ts:250](https://github.com/Nzy19940403/meshflow/blob/bb8ac06d2d7a4dc18987a7772c49930013ca25b2/utils/core/types/types.ts#L250)

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

Defined in: [types/types.ts:251](https://github.com/Nzy19940403/meshflow/blob/bb8ac06d2d7a4dc18987a7772c49930013ca25b2/utils/core/types/types.ts#L251)

#### affectedTatget

> **affectedTatget**: `any`

#### targetMeta

> **targetMeta**: `any`

#### triggerTargets

> **triggerTargets**: `Record`\<`IsNever`\<`TKeys`\> *extends* `true` ? [`SuggestKey`](TypeAlias.SuggestKey.md)\<`NM`\> \| [`InternalKeys`](TypeAlias.InternalKeys.md) : `TKeys`, `any`\> & `object`[]
