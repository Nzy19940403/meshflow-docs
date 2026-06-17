<template>
  <div class="meshflow-arena">
    <div class="controls-panel">
      <button @click="prevStep" :disabled="currentStep === 0">{{ t.prev }}</button>
      <button @click="nextStep" :disabled="currentStep === 5">{{ t.next }}</button>
      <button @click="toggleAutoPlay">{{ isPlaying ? t.pause : t.auto }}</button>
      <button @click="resetSimulation">{{ t.reset }}</button>
      <span class="step-indicator">{{ t.step }}: {{ currentStep }} / 5</span>
    </div>

    <div class="flow-container">
      <ClientOnly>
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          :default-zoom="1"
          :min-zoom="0.5"
          :max-zoom="2"
          fit-view-on-init
          class="dark-theme-flow"
        >
         
        </VueFlow>
      </ClientOnly>
    </div>

    <div class="log-overlay" :class="{ 'is-epoch-title': currentStep === 4 }">
      <span class="log-icon">⚡</span>
      <span class="log-text">{{ stepLogs[currentStep] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, Ref, computed } from 'vue'
import { VueFlow } from '@vue-flow/core'

// @ts-ignore
import '@vue-flow/core/dist/style.css'
// @ts-ignore
import '@vue-flow/core/dist/theme-default.css'

const props = withDefaults(defineProps<{ lang?: 'zh' | 'en' }>(), { lang: 'zh' })

const i18n = {
  zh: {
    prev: '上一步', next: '下一步', pause: '暂停', auto: '自动演示', reset: '重置', step: '步骤',
    nodes: ['节点 A\n(数据源)', '节点 B\n(依赖 A)', '节点 C\n(依赖 A)', '节点 D\n(依赖 C)', '节点 E\n(最终汇总)'],
    logs: [
      '⏱️ 初始状态：逻辑阵列已就绪，等待推倒第一块骨牌 A。',
      '🚀 Step 1: 节点 A 位能改变！能量激荡，单向引力轨道自发向下游传递。',
      '⏳ Step 2: 链路分流！B 计算完毕进入【水位线挂起】；C 的能量顺利传导至 D。',
      '⚙️ Step 3: D 正在高频对账重算中... B 节点持续在栅栏前原地阻尼拦截。',
      '⚖️ Step 4: 依赖 100% 对齐！水位线越过临界大坝，阻尼解除，B 和 D 共同放行放水！',
      '✅ Step 5: 汇总节点 E 在当前 Epoch 接收到全量一致快照，单次触发，整网完美收敛。'
    ]
  },
  en: {
    prev: 'Prev', next: 'Next', pause: 'Pause', auto: 'Auto Play', reset: 'Reset', step: 'Step',
    nodes: ['Node A\n(Source)', 'Node B\n(depends on A)', 'Node C\n(depends on A)', 'Node D\n(depends on C)', 'Node E\n(Final Merge)'],
    logs: [
      '⏱️ Initial state: Logic array ready, waiting to push domino A.',
      '🚀 Step 1: Node A potential changed! Energy propagates down unidirectional gravity tracks.',
      '⏳ Step 2: Pipeline splits! B finishes and enters [Watermark Hold]; C\'s energy flows to D.',
      '⚙️ Step 3: D is computing... Node B remains blocked at the watermark barrier.',
      '⚖️ Step 4: Dependencies 100% aligned! Watermark dam breaks — B and D release simultaneously!',
      '✅ Step 5: Node E receives a fully consistent snapshot in this Epoch. Single trigger, perfect convergence.'
    ]
  }
}

const t = computed(() => i18n[props.lang])

// ==========================================
// 🎨 1. 基础样式定义
// ==========================================
const baseNodeStyle = { background: '#313244', color: '#cdd6f4', border: '2px solid #585b70', borderRadius: '8px', transition: 'all 0.3s ease', padding: '10px 16px', textAlign: 'center' }
const panelStyle = { background: '#11111b', color: '#cdd6f4', border: '2px solid #89b4fa', borderRadius: '8px', transition: 'all 0.3s ease', padding: '10px 16px', textAlign: 'center' }
const courtStyle = { background: '#181825', color: '#f9e2af', border: '2px solid #f38ba8', borderRadius: '50%', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', fontWeight: 'bold' }

// ==========================================
// 📐 2. 拓扑图结构定义（非对称管线）
// ==========================================
const nodes: Ref<any> = ref([
  { id: 'node-A', label: t.value.nodes[0], position: { x: 50, y: 240 }, type: 'input', style: { ...baseNodeStyle }, class: 'mesh-node' },
  { id: 'node-B', label: t.value.nodes[1], position: { x: 350, y: 100 }, type: 'default', style: { ...panelStyle }, class: 'mesh-node' },
  { id: 'node-C', label: t.value.nodes[2], position: { x: 350, y: 380 }, type: 'default', style: { ...panelStyle }, class: 'mesh-node' },
  { id: 'node-D', label: t.value.nodes[3], position: { x: 600, y: 380 }, type: 'default', style: { ...panelStyle }, class: 'mesh-node' },
  { id: 'node-E', label: t.value.nodes[4], position: { x: 800, y: 240 }, type: 'output', style: { ...courtStyle }, class: 'mesh-node' },
])

const edges = ref([
  { id: 'e-a-b', source: 'node-A', target: 'node-B', type: 'smoothstep', style: { stroke: '#585b70', strokeWidth: 2 }, class: '' },
  { id: 'e-a-c', source: 'node-A', target: 'node-C', type: 'smoothstep', style: { stroke: '#585b70', strokeWidth: 2 }, class: '' },
  { id: 'e-c-d', source: 'node-C', target: 'node-D', type: 'smoothstep', style: { stroke: '#585b70', strokeWidth: 2 }, class: '' },
  { id: 'e-b-e', source: 'node-B', target: 'node-E', type: 'smoothstep', style: { stroke: '#585b70', strokeWidth: 2 }, class: '' },
  { id: 'e-d-e', source: 'node-D', target: 'node-E', type: 'smoothstep', style: { stroke: '#585b70', strokeWidth: 2 }, class: '' },
])

// ==========================================
// 🎬 3. 时序状态机与日志描述
// ==========================================
const currentStep = ref(0)
const isPlaying = ref(false)
let playTimer: any = null

const stepLogs = computed(() => t.value.logs)

// ==========================================
// 🎛️ 4. 动画状态机控制核心 (精准突变 Class)
// ==========================================
const updateFlowState = (step: number) => {
  // 恢复所有默认样式，避免对象重建污染
  nodes.value.forEach((n: { class: string }) => { n.class = 'mesh-node' })
  edges.value.forEach(e => { e.class = ''; (e as any).animated = false })

  switch (step) {
    case 1:
      nodes.value[0].class = 'mesh-node is-evaluating' // A 闪烁
      edges.value[0].class = 'pulse-eval'; (edges.value[0] as any).animated = true // A -> B
      edges.value[1].class = 'pulse-eval'; (edges.value[1] as any).animated = true // A -> C
      break
    case 2:
      nodes.value[1].class = 'mesh-node is-blocked' // B 挂起
      nodes.value[2].class = 'mesh-node is-evaluating' // C 计算
      edges.value[2].class = 'pulse-eval'; (edges.value[2] as any).animated = true // C -> D
      break
    case 3:
      nodes.value[1].class = 'mesh-node is-blocked' // B 持续锁定
      nodes.value[3].class = 'mesh-node is-evaluating' // D 重算
      break
    case 4:
      nodes.value[1].class = 'mesh-node is-released' // B 释放
      nodes.value[3].class = 'mesh-node is-released' // D 释放
      edges.value[3].class = 'pulse-resolve'; (edges.value[3] as any).animated = true // B -> E
      edges.value[4].class = 'pulse-resolve'; (edges.value[4] as any).animated = true // D -> E
      break
    case 5:
      nodes.value[4].class = 'mesh-node is-updated' // E 最终演化更新
      break
  }
}

// 监听步数，控制视觉效果
watch(currentStep, (newStep) => {
  updateFlowState(newStep)
})

// ==========================================
// 🎮 5. 播放器基础 API
// ==========================================
const nextStep = () => { if (currentStep.value < 5) currentStep.value++ }
const prevStep = () => { if (currentStep.value > 0) currentStep.value-- }
const resetSimulation = () => {
  currentStep.value = 0
  isPlaying.value = false
  clearInterval(playTimer)
  updateFlowState(0)
}

const toggleAutoPlay = () => {
  if (isPlaying.value) {
    clearInterval(playTimer)
    isPlaying.value = false
  } else {
    isPlaying.value = true
    playTimer = setInterval(() => {
      if (currentStep.value >= 5) {
        currentStep.value = 0
      } else {
        currentStep.value++
      }
    }, 1500)
  }
}

onUnmounted(() => clearInterval(playTimer))
</script>

<style>
.meshflow-arena {
  width: 100%;
  height: 600px;
  background-color: #1e1e2e;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #313244;
  display: flex;
  flex-direction: column;
}

.controls-panel {
  padding: 12px;
  background: rgba(17, 17, 27, 0.7);
  border-bottom: 1px solid #313244;
  display: flex;
  gap: 10px;
  align-items: center;
  z-index: 10;
}

.controls-panel button {
  background: #313244;
  color: #cdd6f4;
  border: 1px solid #45475a;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.controls-panel button:hover:not(:disabled) { background: #45475a; }
.controls-panel button:disabled { opacity: 0.4; cursor: not-allowed; }
.step-indicator { color: #a6adc8; font-family: monospace; margin-left: auto; }

.flow-container { flex: 1; width: 100%; height: 100%; }
.dark-theme-flow { width: 100%; height: 100%; }
.vue-flow__attribution { display: none; }

/* 控制台浮层 */
.log-overlay {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(17, 17, 27, 0.9);
  color: #a6e3a1;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid #89b4fa;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.log-overlay.is-epoch-title {
  bottom: 50%;
  transform: translate(-50%, 50%) scale(1.1);
  border-color: #cba6f7;
  color: #cba6f7;
  box-shadow: 0 0 30px rgba(203, 166, 247, 0.3);
}

.log-icon { animation: pulse-blink 1s infinite alternate; }
@keyframes pulse-blink { from { opacity: 0.4; } to { opacity: 1; } }

/* ==========================================
   ⚡ 核心动效样式：直接贴在底层 path 上
   ========================================== */
.pulse-eval .vue-flow__edge-path {
  stroke-dasharray: 8 20 !important;
  animation: fly-forward 0.5s linear infinite !important;
  stroke: #f9e2af !important;
  filter: drop-shadow(0 0 4px #f9e2af);
}

.pulse-resolve .vue-flow__edge-path {
  stroke-dasharray: 8 20 !important;
  animation: fly-forward 0.5s linear infinite !important;
  stroke: #cba6f7 !important;
  filter: drop-shadow(0 0 5px #cba6f7);
}

@keyframes fly-forward {
  from { stroke-dashoffset: 28; }
  to { stroke-dashoffset: 0; }
}

/* 节点状态变色门控 */
.is-evaluating { border-color: #f9e2af !important; box-shadow: 0 0 20px rgba(249, 226, 175, 0.6) !important; }
.is-blocked { border-color: #f38ba8 !important; background: rgba(243, 139, 168, 0.1) !important; box-shadow: 0 0 20px rgba(243, 139, 168, 0.5) !important; }
.is-released { border-color: #89b4fa !important; box-shadow: 0 0 25px rgba(137, 180, 250, 0.7) !important; }
.is-updated { border-color: #a6e3a1 !important; box-shadow: 0 0 30px rgba(166, 227, 161, 0.8) !important; background: rgba(166, 227, 161, 0.15) !important; }
</style>