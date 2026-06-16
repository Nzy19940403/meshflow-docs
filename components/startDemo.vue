<template>
  <div class="meshflow-demo-card">
    <div v-show="false">{{ uiTick }}</div>

    <div class="header">
      <h3>MeshFlow 异步管线对齐演示 (Watermark Barrier)</h3>
      <p>观察管线流动：极速完成的 B 会向靶心 E 注入能量，但会被<strong>红色虚线栅栏</strong>死死挡住，直到龟速的 D 到达，能量才会瞬间汇聚。</p>
      <button class="trigger-btn" @click="triggerUpdate" :disabled="isComputing.A">
        🚀 点击推倒骨牌 (源头 A +100)
      </button>
    </div>

    <div class="flow-arena">
      <ClientOnly>
        <VueFlow
          v-model:nodes="vueNodes"
          :edges="vueEdges" 
          :default-zoom="1"
          :min-zoom="0.5"
          :max-zoom="2"
          fit-view-on-init
          class="dark-theme-flow"
        >
          <template #node-mesh="{ data }">
            <div 
              class="node-box" 
              :class="{ 
                computing: isComputing[data.id], 
                waiting: isWaiting[data.id], 
                'target-node': data.id === 'E' 
              }"
            >
              <Handle v-if="data.id !== 'A'" type="target" :position="Position.Top" class="custom-handle" />
              
              <div class="title">{{ data.label }}</div>
              <div class="val">{{ getDisplayValue(data.id) }}</div>
              <div class="status">{{ getStatusText(data.id) }}</div>
               <div class="meta">真实执行次数: {{ getSignalValue(data.id) }}</div>
              
              <Handle v-if="data.id !== 'E'" type="source" :position="Position.Bottom" class="custom-handle" />
            </div>
          </template>
          
          
        </VueFlow>
      </ClientOnly>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, computed } from 'vue'; // 🌟 引入 computed
import { MeshPath, useMeshFlow, useScheduler } from '@meshflow/core';
import { VueFlow, Position, Handle } from '@vue-flow/core';

// @ts-ignore
import '@vue-flow/core/dist/style.css';
// @ts-ignore
import '@vue-flow/core/dist/theme-default.css';

// ==========================================
// 🛠️ 1. 基础配置与全节点信号注册
// ==========================================
const uiTick = ref(0);

const isComputing = ref<Record<string, boolean>>({ A: false, B: false, C: false, D: false, E: false });
const isWaiting = ref<Record<string, boolean>>({ A: false, B: false, C: false, D: false, E: false });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const setupNodes = <T, P extends MeshPath>(
  scheduler: ReturnType<typeof useScheduler<T, P>>,
  nodeConfigs: any[]
) => {
  const views: Record<string, any> = {};
  nodeConfigs.forEach((config) => {
    const node = scheduler.registerNode({
      path: config.path as P,
      type: "node",
      state: { value: config.value },
      notifyKeys: new Set(),
      meta: { delta: config.delta }
    });
    views[config.path] = node.createView();
  });
  return views;
};

const testData = [
  { path: "nodeA", value: 100, delta: 0 },
  { path: "nodeB", value: 0, delta: 10 },
  { path: "nodeC", value: 0, delta: 20 },
  { path: "nodeD", value: 0, delta: 30 },
  { path: "nodeE", value: 0, delta: 0 },
];

const engine = useMeshFlow('startDemo', testData, {
  modules: { setupNodes },
  UITrigger: {
    signalCreator: () => ref(0),
    signalTrigger: (signal) => { signal.value++; } 
  },
  config: { useGreedy: false }, 
});

const { nodeA, nodeB, nodeC, nodeD, nodeE } = engine.modules.setupNodes;

// ==========================================
// 🕸️ 2. 编排引力轨道 (逻辑力场)
// ==========================================

engine.config.SetRules(['nodeA'], 'nodeB', 'value', {
  logic: async ({ slot }) => {
    isComputing.value.B = true;
    isWaiting.value.B = false;
    await sleep(800); 
    isComputing.value.B = false;
    isWaiting.value.B = true; 
    return slot.triggerTargets[0].value + slot.targetMeta.delta;
  }
});

engine.config.SetRules(['nodeA'], 'nodeC', 'value', {
  logic: async ({ slot }) => {
    isComputing.value.C = true;
    await sleep(1000);
    isComputing.value.C = false;
    return slot.triggerTargets[0].value + slot.targetMeta.delta;
  }
});

engine.config.SetRules(['nodeC'], 'nodeD', 'value', {
  logic: async ({ slot }) => {
    isComputing.value.D = true;
    await sleep(2000); 
    isComputing.value.D = false;
    return slot.triggerTargets[0].value + slot.targetMeta.delta;
  }
});

engine.config.SetRules(['nodeB', 'nodeD'], 'nodeE', 'value', {
  logic: async ({ slot }) => {
    isWaiting.value.B = false; // 水位线放行，解除 B 的红灯
    isComputing.value.E = true;
    await sleep(200); 
    isComputing.value.E = false;
    
    const [valB, valD] = slot.triggerTargets;
    return valB.value + valD.value; 
  }
});

engine.config.notifyAll();

// ==========================================
// 🎨 3. Vue Flow 拓扑图与【动态连线】
// ==========================================
const vueNodes = ref([
  { id: 'A', type: 'mesh', position: { x: 280, y: 20 }, data: { id: 'A', label: '源头节点 A(0ms)' } },
  { id: 'B', type: 'mesh', position: { x: 80, y: 250 }, data: { id: 'B', label: '极速节点 B (800ms)' } },
  { id: 'C', type: 'mesh', position: { x: 480, y: 250 }, data: { id: 'C', label: '节点 C (1000ms)' } },
  { id: 'D', type: 'mesh', position: { x: 480, y: 480 }, data: { id: 'D', label: '龟速节点 D (2000ms)' } },
  { id: 'E', type: 'mesh', position: { x: 280, y: 720 }, data: { id: 'E', label: '汇聚靶心 E' } },
]);

// 🌟 最核心的可视化逻辑：连线状态与引擎状态严格物理映射
const vueEdges = computed(() => [
  { 
    id: 'e-a-b', source: 'A', target: 'B', type: 'smoothstep', 
    animated: isComputing.value.B, // 只有 B 计算时，能量才在流动
    style: { 
      stroke: isComputing.value.B ? '#89b4fa' : '#45475a', 
      strokeWidth: isComputing.value.B ? 3 : 2 
    } 
  },
  { 
    id: 'e-a-c', source: 'A', target: 'C', type: 'smoothstep', 
    animated: isComputing.value.C, 
    style: { 
      stroke: isComputing.value.C ? '#89b4fa' : '#45475a', 
      strokeWidth: isComputing.value.C ? 3 : 2 
    } 
  },
  { 
    id: 'e-c-d', source: 'C', target: 'D', type: 'smoothstep', 
    animated: isComputing.value.D, 
    style: { 
      stroke: isComputing.value.D ? '#89b4fa' : '#45475a', 
      strokeWidth: isComputing.value.D ? 3 : 2 
    } 
  },
  { 
    id: 'e-b-e', source: 'B', target: 'E', type: 'smoothstep', 
    animated: isComputing.value.E, 
    style: { 
      // 🌟 视觉神来之笔：E 计算时变黄；B 算完等待时变红；空闲时变灰
      stroke: isComputing.value.E ? '#f9e2af' : (isWaiting.value.B ? '#f38ba8' : '#45475a'), 
      strokeWidth: isComputing.value.E ? 4 : (isWaiting.value.B ? 3 : 2),
      // 🌟 水位线栅栏隐喻：变成虚线
      strokeDasharray: (isWaiting.value.B && !isComputing.value.E) ? '6 6' : undefined
    } 
  },
  { 
    id: 'e-d-e', source: 'D', target: 'E', type: 'smoothstep', 
    animated: isComputing.value.E, 
    style: { 
      stroke: isComputing.value.E ? '#f9e2af' : '#45475a', 
      strokeWidth: isComputing.value.E ? 4 : 2 
    } 
  },
]);

const getDisplayValue = (id: string) => {
  const map: Record<string, any> = { A: nodeA, B: nodeB, C: nodeC, D: nodeD, E: nodeE };
  return map[id].state.value;
};

const getStatusText = (id: string) => {
  if (isComputing.value[id]) return '🔄 计算中...';
  if (isWaiting.value[id]) return '🚧 水位线拦截中';
  return '✅ 闲置就绪';
};
const getSignalValue = (id: string) => {
  const map: Record<string, any> = { A: nodeA, B: nodeB, C: nodeC, D: nodeD, E: nodeE };
  return map[id].dirtySignal.value;
};

// ==========================================
// 🎮 4. 用户交互触发
// ==========================================
const triggerUpdate = () => {
    isComputing.value = { A: true, B: false, C: false, D: false, E: false };
  isWaiting.value = { A: false, B: false, C: false, D: false, E: false };
  const currentA = engine.data.GetValue(nodeA.path, 'value') || 0;
  engine.data.SetValue(nodeA.path, 'value', currentA + 100);
  
  setTimeout(() => { isComputing.value.A = false; }, 200);
};
</script>

<style scoped>
.meshflow-demo-card {
  background: #11111b;
  border: 1px solid #313244;
  border-radius: 12px;
  padding: 24px;
  color: #cdd6f4;
  font-family: system-ui, -apple-system, sans-serif;
  margin: 1.5rem 0;
}

.header { text-align: center; margin-bottom: 20px; }
.trigger-btn {
  background: #cba6f7; color: #11111b; font-weight: bold;
  border: none; padding: 14px 28px; border-radius: 8px; cursor: pointer;
  transition: transform 0.1s, opacity 0.2s; font-size: 16px; margin-top: 10px;
}
.trigger-btn:active:not(:disabled) { transform: scale(0.95); }
.trigger-btn:disabled { opacity: 0.5; background: #585b70; cursor: not-allowed; }

.flow-arena {
  width: 100%;
  height: 950px;
  background: #1e1e2e;
  border-radius: 12px;
  border: 1px solid #45475a;
  overflow: hidden;
}

.node-box {
  width: 240px;
  background: #313244;
  border: 2px solid #585b70;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}

.node-box .title { font-size: 14px; color: #a6adc8; margin-bottom: 10px; font-weight: bold; }
.node-box .val { font-size: 32px; font-weight: bold; color: #cdd6f4; margin-bottom: 10px; }
.node-box .status { font-size: 14px; color: #a6e3a1; font-weight: 500;}
.node-box .meta { font-size: 12px; color: #f38ba8; margin-top: 12px; background: rgba(243,139,168,0.1); border-radius: 6px; padding: 4px;}

.custom-handle { border: 2px solid #1e1e2e; width: 10px; height: 10px; }

/* 状态动画 */
.computing {
  border-color: #89b4fa;
  box-shadow: 0 0 25px rgba(137, 180, 250, 0.4);
}
.computing .status { color: #89b4fa; animation: blink 1s infinite; }
.computing .val { color: #89b4fa; }

.waiting {
  border-color: #f38ba8;
  background: rgba(243, 139, 168, 0.15);
  box-shadow: 0 0 25px rgba(243, 139, 168, 0.3);
}
.waiting .status { color: #f38ba8; font-weight: bold; }

.target-node { border-width: 3px; border-color: #f9e2af; }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>