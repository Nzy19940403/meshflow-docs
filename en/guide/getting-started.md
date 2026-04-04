---
title: 🚀 Quick Start
---
 

# 🚀 Quick Start

MeshFlow Core is a **Headless** engine focused on logical topology scheduling. It holds no UI state, but instead constructs a rigorous "Logical Track" in memory to drive the **deterministic evolution** of data across the timeline.

#### 1. Installation

Drive your complex business logic through the core engine:

```bash
npm install @meshflow/core
```

#### 2. Architectural Concept: Headless & Signal-Driven

MeshFlow utilizes a completely **Headless** design, physically decoupling core logic from the View layer. Through `UITrigger` configuration, you can inject a **Dirty Signal** into logical nodes.

When the state of a node in the topology network evolves, the signal is precisely triggered, driving **atomic-level** local view updates in Vue or React.

#### 3. Logic Orchestration: Custom Registration Modules

In MeshFlow, data registration is achieved through "Protocol Modules." You can implement your own registration logic for specific domains (e.g., forms, canvas, low-code engines). Below is a basic registration module implementation based on a billing scenario:

```typescript
import { useScheduler, MeshPath } from "@meshflow/core";

function useInternalForm<T, P extends MeshPath>(
  scheduler: ReturnType<typeof useScheduler<T, P>>,
  rootSchema: any
) {
  // 1. Register Topology Root Node (Group)
  const billingGroup = scheduler.registerGroupNode({
    path: "billing" as P,
    type: "group",
    // Establish static topology path index
    children: [
      "billing.count",
      "billing.price",
      "billing.totalPrice",
      "billing.priceDetail",
    ] as P[],
    meta: rootSchema,
  });

  // 2. Batch Register Atomic Nodes (Tasks)
  const renderedChildren = rootSchema.children.map((field: any) => {
    const currentPath = `billing.${field.name}` as P;
    const node = scheduler.registerNode({
      path: currentPath,
      type: field.type,
      state: { value: field.value },
      meta: field,
      notifyKeys: new Set(),
    });
    return node.createView(); // Create UI View Object
  });

  const uiSchema = billingGroup.createView({
    children: renderedChildren,
  });

  // 3. Export State Snapshot
  const GetFormData = () => {
    return {
      billing: {
        count: scheduler.GetNodeByPath("billing.count" as P).state.value,
        price: scheduler.GetNodeByPath("billing.price" as P).state.value,
        totalPrice: scheduler.GetNodeByPath("billing.totalPrice" as P).state.value,
        priceDetail: scheduler.GetNodeByPath("billing.priceDetail" as P).state.value,
      },
    };
  };

  return { uiSchema, GetFormData };
}
```

#### 4. Activating the Logical Brain

Use the registration module to inject raw data. At this point, MeshFlow acts as the "Computing Brain" of the system, taking over all state scheduling.

::: code-group

```typescript [Vue]
import { ref } from "vue";
import { useMeshFlow } from "@meshflow/core";

const schema = {
  type: "group",
  name: "billing",
  label: "Billing & Summary",
  children: [
    { type: "number", name: "count", label: "Quantity", value: 1 },
    { type: "number", name: "price", label: "Unit Price", value: 1000 },
    { type: "number", name: "totalPrice", label: "Total Price", value: 0 },
    {
      type: "input",
      name: "priceDetail",
      label: "Description",
      value: "Base Fee",
    },
  ],
};
const engine = useMeshFlow("engine", schema, {
  UITrigger: {
    // Vue Reactive Binding: Map nodes to reactive signals
    signalCreator: () => ref(0),
    signalTrigger(signal) {
      signal.value++;
    },
  },
  modules: {
    useInternalForm,
  },
});
```

```typescript [React]
import { useState } from "react";
import { useMeshFlow } from "@meshflow/core";

const schema = {
  type: "group",
  name: "billing",
  label: "Billing & Summary",
  children: [
    { type: "number", name: "count", label: "Quantity", value: 1 },
    { type: "number", name: "price", label: "Unit Price", value: 1000 },
    { type: "number", name: "totalPrice", label: "Total Price", value: 0 },
    {
      type: "input",
      name: "priceDetail",
      label: "Description",
      value: "Base Fee",
    },
  ],
};
const engine = useMeshFlow("main", schema, {
  UITrigger: {
    // React Signal Binding: Trigger local re-render via closure
    signalCreator: () => {
      const [_, setTick] = useState(0);
      return () => setTick((t) => t + 1);
    },
    signalTrigger(trigger) {
      trigger();
    },
  },
  modules: {
    useInternalForm,
  },
});
```

:::

#### 5. Establishing Causality Tracks (Rules)

In MeshFlow, linkage is no longer a fragmented event listener, but an ordered **Causal Chain**. The Watermark mechanism ensures that no matter how deep the logic chain is, every evolution is deterministic and atomic.

```typescript
// Track 1: count * price -> totalPrice (Basic Calculation)
engine.config.SetRules(
  ["billing.count", "billing.price"],
  "billing.totalPrice",
  "value",
  {
    logic: ({ slot }) => {
      const [count, price] = slot.triggerTargets;
      return count.value * price.value;
    },
    triggerKeys: ["value"],
  }
);

// Track 2: totalPrice -> priceDetail (Cascading Evolution)
// This logic only triggers after totalPrice has settled
engine.config.SetRule("billing.totalPrice", "billing.priceDetail", "value", {
  logic: ({ slot }) => {
    const [total] = slot.triggerTargets;
    return total.value > 5000 ? "VIP Discount Applied" : "Base Configuration Fee";
  },
  triggerKeys: ["value"],
});

// Activate full evolution for the initial state
engine.config.notifyAll();
```

#### 6. Deterministic Evolution Demo

The interactive demo below demonstrates the actual execution of the code above. When an input changes, the node's `dependOn` function is called, and the evolution algorithm inside MeshFlow automatically initiates a new round of topology settlement.
<ClientOnly>
<QuickStart name="en"></QuickStart>
</ClientOnly>


<script setup>
import QuickStart from '../../components/quickStart.vue'
</script>

::: tip Geek Tip
For highly standardized business forms, it is recommended to use **[@meshflow/form](https://www.google.com/search?q=/guide/form-intro)** directly. It provides a declarative Schema protocol on top of Core, enabling complex validation and linkage with lower development costs.
:::