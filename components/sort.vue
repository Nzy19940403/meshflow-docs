<template>
  <div class="mesh-lab-container">
    <div class="lab-header">
      <div class="header-content">
        <h2 class="title">纠缠震荡排序实验室</h2>
        <p class="subtitle">
          稳定邻里纠缠模型：时间分片调度 + 边界空气墙 + 等值打破器
        </p>
      </div>
      <button class="action-btn" @click="shuffleValues">
        <span class="icon">🎲</span> 随机打乱势能
      </button>
    </div>

    <div class="lab-layout">
      <div class="main-stage">
        <div class="canvas-card">
          <div class="entities-container">
            <div
              v-for="item in entities"
              :key="item.uid"
              class="entity-item"
              :style="{
                '--trigger': item.dirtySignal?.value,
                left: `${item.x}px`,
                width: `${item.width}px`,
              }"
            >
              <div class="value-bubble" :style="{ backgroundColor: getBarColor(item.value || 0) }">
                {{ (item.value || 0).toFixed(0) }}
              </div>
              
              <div
                class="energy-bar"
                :style="{
                  height: `${(item.value || 0) * 2.5}px`,
                  backgroundColor: getBarColor(item.value || 0),
                
                }"
              >
                <span class="bar-text">{{ (item.value || 0).toFixed(0) }}</span>
              </div>
              
              <div class="pos-label">L{{ item.posIndex }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="side-panel">
        <div :class="['status-card', isStable ? 'stable' : 'running']">
          <div class="label">系统状态</div>
          <div class="value">{{ isStable ? "✅ 稳态" : "🔄 推演中..." }}</div>
        </div>

        <div class="details-card">
          <div class="card-title">逻辑排位详情</div>
          <ul class="node-list">
            <li v-for="v in vnodes" :key="v.path" class="node-item">
              <span class="node-name">{{ v.path.split(".").pop() }}</span>
              <span class="node-idx-tag">Idx: {{ v.posIndex }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { deleteEngine, useMeshFlow } from '@meshflow/core'
import { useSortAnimation } from "../core/useSortAnimation";
import { useLogger } from "@meshflow/logger"; // 如果 VitePress 找不到请先注释

const initialData = Array.from({ length: 30 }, (_, i) => ({
    type: "anim-item" as const,
    name: `item_${i}`,
    value: Math.floor(Math.random() * 100) + 10,
    width: 40,
  }));
  
  const engine = useMeshFlow("sorting-lab", initialData as any, {
    UITrigger: {
      signalCreator: () => ref(0),
      signalTrigger: (signal) => {
        signal.value++;
      },
    },
    config: { 
      useGreedy: true, 
      // useEntangleStep: Infinity
    },
    modules: { useSortAnimation },
  });
  
  const cancel = useLogger();
  engine.config.usePlugin(cancel);
  
  const { vnodes, entities, coordinator } = engine.modules.sortAnimation;
  const isStable = ref(true);
 
  
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  const setupSortingPhysics = () => {
    const GAP = 12; // 稍微调大一点点间距
    const BAR_WIDTH = 40;
    const MIN_IDX = 0;
    const MAX_IDX = vnodes.length - 1;
  
    // ==========================================
    // 1. 微观局部法则：邻居间的推搡与让位
    // ==========================================
    vnodes.forEach((vView) => {
      vnodes.forEach((otherView) => {
        if (vView.path === otherView.path) return;
        const myIdMatch = vView.path.match(/\d+/);
        const tarIdMatch = otherView.path.match(/\d+/);
        const myId = myIdMatch ? parseInt(myIdMatch[0], 10) : 0;
        const tarId = tarIdMatch ? parseInt(tarIdMatch[0], 10) : 0;
  
        // 🌟 完全对照新 API 翻译：
        engine.config.useEntangle({
          cause: vView.path,
          impact: otherView.path,
          via: ["posIndex", "value"],
          emit: async (causeState, impactState, propose) => {
            const myVal = causeState.state.value || 0;
            const tarVal = impactState.state.value || 0;
            const myIdx = causeState.state.posIndex;
            const tarIdx = impactState.state.posIndex;
            const diff = tarIdx - myIdx;
            const isTarBigger = tarVal > myVal || (tarVal === myVal && tarId > myId);
  
            await sleep(15); 
  
            // 处理重叠
            if (diff === 0) {
              if (!isTarBigger && myIdx > MIN_IDX) { propose.set("posIndex", myIdx - 1, 2); return; }
              if (isTarBigger && myIdx < MAX_IDX) { propose.set("posIndex", myIdx + 1, 2); return; }
              return;
            }
            // 邻居交换
            if (diff === -1 && isTarBigger) { propose.set("posIndex", tarIdx + 1, 2); return; }
            if (diff === 1 && !isTarBigger) { propose.set("posIndex", tarIdx - 1, 2); return; }
          },
        });
      });
  
      // 坐标渲染映射 (未改动)
      engine.config.SetRule(vView.path, vView.meta.entityPath, "posIndex", {
        logic: ({slot}) => slot.triggerTargets[0].posIndex,
        triggerKeys: ["posIndex"],
        effect: (args) => ({
          x: args.posIndex * (BAR_WIDTH + GAP),
          isChoosed: true,
        }),
        effectArgs: ["posIndex"],
      });
    });
  
    // ==========================================
    // 🌟 2. 宏观中介者：注入全场“真空吸力”场
    // ==========================================
    
    // A. 将所有节点的实时状态同步给 Coordinator (未改动)
    engine.config.SetRules(vnodes.map(item => item.path), coordinator.path, 'worldState', {
      logic: ({ slot }) => {
        const newWorld = slot.affectedTatget || {};
        slot.triggerTargets.forEach(vnode => {
          newWorld[vnode.path] = {
            pos: vnode.posIndex,
            val: vnode.value,
            uid: vnode.uid
          };
        });
        return { ...newWorld };
      },
      triggerKeys: ['posIndex', 'value', 'uid', 'path']
    });
  
    // 在 setupSortingPhysics 内部
    vnodes.forEach((vView) => {
      // 🌟 完全对照新 API 翻译：
      engine.config.useEntangle({
        cause: coordinator.path,
        impact: vView.path,
        via: ["version"], // 只有当 onSuccess 触发版本更新时，审计才上班
        emit: async (causeState, impactState, propose) => {
          const world = causeState.state.worldState;
          if (!world) return;
  
          // impactState.path 等同于原本的 target.path / vView.path
          const myPath = impactState.path;
          const myData = world[myPath as string];
          if (!myData) return;
  
          // 🌟 核心逻辑：计算全场名次
          // 将所有节点按 posIndex 排序，posIndex 相同的按 UID 排序
          const allNodes = Object.keys(world).map(path => ({
            path,
            ...world[path]
          }));
  
          allNodes.sort((a, b) => {
            if (a.pos !== b.pos) return a.pos - b.pos;
            return a.uid - b.uid; // UID 作为重叠时的最终打破者
          });
  
          // 找到我在全场中应该排在第几个（这就是理想的连续索引）
          const idealPos = allNodes.findIndex(n => n.path === myPath);
  
          // 如果当前位置和理想位置不一致（说明有空洞或重叠）
          if (myData.pos !== idealPos) {
            // 给一点点微小的延迟，让审计过程在视觉上有一个“咔哒”入位的捕捉感
            await sleep(10); 
            
            // 这里的 weight 设置为 1 即可，因为此时局部规则已经静止
            propose.set("posIndex", idealPos, 1);
          }
        }
      });
    });
  };
  
  const getBarColor = (val: number) => `hsl(${val * 1.2}, 70%, 50%)`;
  
  const shuffleValues = () => {
    isStable.value = false;
  

    let obj: any = [];
    
    vnodes.forEach((v, i) => {
      const num = Math.floor(Math.random() * 100) + 10;
      obj.push({ path: v.path, key: "value", value: num });
      obj.push({ path: v.entityPath, key: "value", value: num });

      engine.data.SetValue(v.entityPath, 'value', num);
      engine.data.SetValue(v.path, 'value', num);
    });
  
    // 🌟 强烈建议这里用批量更新 SetValues 替代循环 SetValue！
    // engine.data.SetValues(obj);
 
  };
  
  engine.hooks.onSuccess(() => {
    const world = engine.data.GetValue(coordinator.path, 'worldState');
  const allNodes = Object.values(world) as any[];

  // 2. 🌟 执行“终极审计”：检查是否有重叠或空隙
  // 这是一个 O(N) 的简单检查
  const posSet = new Set(allNodes.map(n => n.pos));
  const isBroken = posSet.size !== vnodes.length || Math.max(...posSet) !== vnodes.length - 1;

  if (isBroken) {
    // 情况 A：还没排好（有重叠或空洞）
    console.log("--- 审计未通过，启动修正脉冲 ---");
 
    // 拨动版本号。这会诱发中介者发出 Proposal
    // 只要有 Proposal，引擎就会开启新一轮 Task，跑完后会再次回到 onSuccess
    const ver = engine.data.GetValue(coordinator.path, 'version') || 0;
    engine.data.SetValue(coordinator.path, 'version', ver + 1);
    
  } else {
    // 情况 B：全场逻辑已自洽
    console.log("--- 审计通过，系统达成终极稳态 ---");
    isStable.value = true;
  }
    
  });
  
  onMounted(() => {
    isStable.value = false;
    setupSortingPhysics();
    engine.config.notifyAll();
  });
onUnmounted(()=>{
  deleteEngine('sorting-lab')
})
</script>

<style scoped>
.mesh-lab-container {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  padding: 20px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 12px;
  margin: 20px 0;
}

.lab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.subtitle {
  margin: 4px 0 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.action-btn {
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn:hover {
  background-color: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.lab-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 20px;
}

.canvas-card {
  background: #1a1a1a; /* 保持深色背景突出能量条 */
  height: 420px;
  border-radius: 12px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid var(--vp-c-divider);
}

.entities-container {
  position: relative;
  height: 100%;
  padding: 0 40px;
}

.entity-item {
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.energy-bar {
  width: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.bar-text {
  transform: rotate(-90deg);
  font-size: 10px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
}

.value-bubble {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  color: white;
  margin-bottom: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.entity-item:hover .value-bubble {
  opacity: 1;
}

.pos-label {
  margin-top: 12px;
  font-family: monospace;
  font-size: 11px;
  color: #888;
}

/* 状态面板 */
.status-card {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  color: white;
  transition: background-color 0.3s;
}

.status-card.stable { background-color: #1b5e20; }
.status-card.running { background-color: #01579b; }

.status-card .label { font-size: 0.75rem; opacity: 0.8; text-transform: uppercase; }
.status-card .value { font-size: 1.25rem; font-weight: bold; margin-top: 4px; }

.details-card {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.node-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.node-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 0.75rem;
}

.node-idx-tag {
  background-color: var(--vp-c-bg-soft);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}

/* 适配移动端 */
@media (max-width: 768px) {
  .lab-layout { grid-template-columns: 1fr; }
  .side-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
}
</style>