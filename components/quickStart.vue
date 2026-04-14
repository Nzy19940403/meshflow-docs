<template>
  <div class="meshflow-demo">
    <div class="form-card">
      <h3>🚀 {{ isEn ? "quick start" : "快速开始" }}</h3>
      <p class="subtitle">
        {{
          isEn
            ? "Headless Architecture: Logic Drives Signals, Signals Drive Views"
            : "Headless 架构：逻辑驱动信号，信号驱动视图"
        }}
      </p>

      <div v-if="form" class="billing-container">
        <div class="group-header">
          <span class="icon">📦</span> {{ form.meta.label }}
        </div>

        <div
          v-for="child in form.children"
          :key="child.path"
          class="field-item"
        >
          <div class="field-label">
            {{ child.meta.label }}
            <span class="signal-tag" title="Dirty Signal Value">
              Signal: {{ child.dirtySignal.value }}
            </span>
          </div>

          <div class="field-input-wrapper">
            <input
              v-if="child.type === 'number'"
              type="number"
              :value="child.state.value"
              :readonly="child.path === 'billing.totalPrice'"
              :class="{ 'is-readonly': child.path === 'billing.totalPrice' }"
              @input="e => onUpdate(child, (e.target as HTMLInputElement).valueAsNumber)"
            />

            <input
              v-else
              type="text"
              :value="child.state.value"
              @input="e => onUpdate(child, (e.target as HTMLInputElement).value)"
            />
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="btn-snapshot" @click="handleGetSnapshot">
          {{ isEn ? "Get Snapshot" : "获取表单快照" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import {
  useMeshFlow,
  useScheduler,
  MeshPath,
  deleteEngine,
} from "@meshflow/core";

const props = withDefaults(defineProps<{
  name?: string; // 变成可选
}>(), {
  name: 'zh' // 默认为中文
});
const name = props.name;
const isEn = computed(() => props.name === "en");

/**
 * 1. 业务 Schema 定义 (动态国际化)
 * 使用 computed 确保当 props.name 改变时，schema 能够同步更新
 */
 const schema = {
  type: "group",

  name: "billing",
  path: "billing",
  label: "计费与汇总",

  children: [
    { type: "number", name: "count",path: "count", label: "购买数量", value: 1 },

    { type: "number", name: "price",path: "price", label: "单价", value: 1000 },

    { type: "number", name: "totalPrice",path: "totalPrice", label: "预估月度总价", value: 0 },

    {
      type: "input",
      name: "priceDetail",
      path: "priceDetail",
      label: "计费项说明",
      value: "基础配置费用",
    },
  ],
} as const;

const enSchema = {
  type: "group",

  name: "billing",
  path: "billing",
  label: "Billing & Summary",

  children: [
    { type: "number", name: "count", path: "count", label: "Quantity", value: 1 },

    { type: "number", name: "price", path: "price", label: "Unit Price", value: 1000 },

    {
      type: "number",
      name: "totalPrice",
      path: "totalPrice",
      label: "Estimated Monthly Total",
      value: 0,
    },

    {
      type: "input",
      name: "priceDetail",
      path: "priceDetail",
      label: "Billing Description",
      value: "Base Configuration Fee",
    },
  ],
} as const;

function useInternalForm<T, P extends MeshPath>(
  scheduler: ReturnType<typeof useScheduler<T, P>>,
  rootSchema: any
) {
  // 注册根节点 Group
  const billingGroup = scheduler.registerGroupNode({
    path: "billing" as P,
    type: "group",
    children: [
      "billing.count",
      "billing.price",
      "billing.totalPrice",
      "billing.priceDetail",
    ] as P[],
    meta: rootSchema,
  });

  // 批量注册叶子节点
  const renderedChildren = rootSchema.children.map((field: any) => {
    const currentPath = `billing.${field.name}` as P;
    const node = scheduler.registerNode({
      path: currentPath,
      type: field.type,
      state: { value: field.value },
      meta: field,
      notifyKeys: new Set(),
    });
    return node.createView();
  });

  const uiSchema = billingGroup.createView({
    children: renderedChildren,
  });

  const GetFormData = () => {
    return {
      billing: {
        count: scheduler.GetNodeByPath("billing.count" as P).state.value,
        price: scheduler.GetNodeByPath("billing.price" as P).state.value,
        totalPrice: scheduler.GetNodeByPath("billing.totalPrice" as P).state
          .value,
        priceDetail: scheduler.GetNodeByPath("billing.priceDetail" as P).state
          .value,
      },
    };
  };

  return { uiSchema, GetFormData };
}

/**
 * 3. 初始化 MeshFlow 引擎
 */
const engine = useMeshFlow(name, isEn.value ? enSchema : schema, {
  UITrigger: {
    signalCreator: () => ref(0), // 使用 Vue ref 作为信号源
    signalTrigger(signal) {
      signal.value++; // 拨动信号，触发订阅该信号的组件局部刷新
    },
  },
  modules: {
    useInternalForm,
  },
});

// 拿到你注册模块产出的 UI Schema
const form = engine.modules.internalForm.uiSchema;

// 轨道一：count * price -> totalPrice
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

// 轨道二：totalPrice -> priceDetail
engine.config.SetRule("billing.totalPrice", "billing.priceDetail", "value", {
  logic: ({ slot }) => {
    const [total] = slot.triggerTargets;

    // 根据当前语言环境返回对应的描述文字
    if (isEn.value) {
      return total.value > 5000
        ? "VIP Discount Applied"
        : "Base Configuration Fee";
    }

    return total.value > 5000 ? "大客户特惠折扣价" : "基础配置费用";
  },
  triggerKeys: ["value"],
});
// 激活首屏全量演化
engine.config.notifyAll();

/**
 * 5. UI 事件处理
 */
const onUpdate = (node: any, val: any) => {
  node.dependOn(() => val);
};

const handleGetSnapshot = () => {
  const data = engine.modules.internalForm.GetFormData();

  const logLabel = isEn.value
    ? "[MeshFlow] Current Snapshot:"
    : "[MeshFlow] 当前表单快照:";
  const alertMsg = isEn.value
    ? "Snapshot captured, please check the console."
    : "已获取快照，请查看控制台";

  console.log(logLabel, data);
  alert(alertMsg);
};

onUnmounted(() => {
  deleteEngine(name);
});
</script>

<style scoped>
.meshflow-demo {
  padding: 24px;
  /* 使用 VitePress 页面背景色 */
  background: var(--vp-c-bg-alt);
  display: flex;
  justify-content: center;
  transition: background 0.3s ease;
}

.form-card {
  /* 使用 VitePress 的卡片背景色和边框色 */
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  padding: 24px;
  width: 100%;
  max-width: 480px;
  transition: all 0.3s ease;
}

h3 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
}

.subtitle {
  margin: 0 0 24px 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.billing-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.group-header {
  /* 深色模式下会自动变暗 */
  background: var(--vp-c-default-soft);
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.field-item {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.field-item:last-child {
  border-bottom: none;
}

.field-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 信号标签颜色适配 */
.signal-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
}

.field-input-wrapper input {
  width: 100%;
  padding: 8px 12px;
  /* 输入框背景和文字颜色 */
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  box-sizing: border-box;
}

.field-input-wrapper input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

/* 只读状态：总价 */
.is-readonly {
  background-color: var(--vp-c-default-soft) !important;
  color: var(--vp-c-brand-1) !important;
  font-weight: bold;
}

.actions {
  margin-top: 24px;
  text-align: center;
}

/* 按钮适配主题色 */
.btn-snapshot {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}

.btn-snapshot:hover {
  opacity: 0.8;
}
</style>
