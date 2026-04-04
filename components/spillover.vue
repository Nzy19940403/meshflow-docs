<template>
  <div class="dashboard-wrapper" ref="boxRef">
    <div class="control-panel">
      <div class="settings-row">
        <div class="mode-selector">
          <div class="selector-label">排版策略</div>
          <div class="radio-group">
            <label :class="['radio-item', { active: layoutMode === 'judge' }]">
              <input type="radio" v-model="layoutMode" value="judge" />
              <span class="radio-dot"></span>
              <span class="text">中心分配</span>
            </label>

            <label :class="['radio-item', { active: layoutMode === 'oscillation' }]">
              <input type="radio" v-model="layoutMode" value="oscillation" />
              <span class="radio-dot"></span>
              <span class="text">物理震荡</span>
            </label>
          </div>
        </div>

        <div class="mode-selector">
          <div class="selector-label">Zone排序</div>
          <div class="radio-group" @change="syncStrategy">
            <label :class="['radio-item', { active: sortStrategy === 'uid' }]">
              <input type="radio" v-model="sortStrategy" value="uid" />
              <span class="radio-dot"></span>
              <span class="text">按UID</span>
            </label>
            <label :class="['radio-item', { active: sortStrategy === 'content' }]">
              <input type="radio" v-model="sortStrategy" value="content" />
              <span class="radio-dot"></span>
              <span class="text">按数量</span>
            </label>
          </div>
        </div>
      </div>

      <div class="actions-row">
        <button 
          :class="['action-btn play-btn', { 'is-playing': isSimulating }]" 
          @click="toggleSimulation"
        >
          <span class="icon">{{ isSimulating ? '⏸' : '▶' }}</span> 
          {{ isSimulating ? '暂停生产' : '启动流水线' }}
        </button>
        
        <div class="v-divider"></div>

        <button class="action-btn add-btn" @click="handleAddNew">
          <span class="icon">+</span> 手动空投
        </button>
        
        <button 
          :class="['action-btn auto-btn', { 'is-active': isAutoSpawning }]" 
          @click="toggleAutoSpawn"
          title="每 10 秒自动生产一个新格子"
        >
          <span class="icon">∞</span> {{ isAutoSpawning ? '停止空投' : '自动空投' }}
        </button>
        
        <div class="flex-spacer"></div>
 
        <button class="action-btn reset-btn" @click="reset">
          <span class="icon">↻</span> 重新洗牌
        </button>
      </div>
    </div>

    <div 
      class="playground" 
      ref="playgroundRef"
      :style="{ 
        height: `${containerHeight}px`, 
        transition: 'height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
      }"
    >
      <div 
        class="playground-canvas"
        :style="{
          width: `${logicalWidth}px`,
          transform: `scale(${scaleRatio})`,
          transformOrigin: 'top left',
          transition: 'transform 0.3s ease'
        }"
      >
        
        <div
          v-for="zone in ZoneArray"
          :key="zone.path"
          :class="['energy-box', { 'is-overload': zone.currentLoad > zone.capacity }]"
          :style="{
            '--trigger': zone.dirtySignal?.value,
            position: 'absolute',
            top: '120px',
            left: '0px',
            transform: `translate(${zone.position?.x || 0}px, ${zone.position?.y || 0}px)`,
            transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 10
          }"
        >
          <div class="box-header">
            <div class="path-label">
              <span class="status-dot"></span>
              {{ zone.path }}  
            </div>
            
            <div class="controls">
              <button class="btn-capacity" @click="changeCapacity(zone.path, -10)">-</button>
              <button class="btn-capacity" @click="changeCapacity(zone.path, 10)">+</button>
            </div>
          </div>
          <div class="load-value">
            Max: {{ zone.value }} | {{ Math.round(zone.capacity || 0) }}%
            <span style="color:#1890ff; margin-left: 8px;">[Idx: {{ zone.index }}]</span>
          </div>

          <div class="water-stage">
            <div
              class="water-layer current-load"
              :style="{ height: `${Math.min(zone.capacity || 0, 100)}%` }"
            ></div>
            <div v-if="zone.currentLoad > zone.capacity" class="overload-line"></div>
          </div>
        </div>
        
        <div :style="{'--version':version}">
            <div
            v-for="box in BoxArray"
            :key="box.path"
            :class="[
              'cell', 
              { 
                'is-processing': isSimulating && box.parent && box.parent !== '' && box.parent !== 'graveyard' && isHeadBox(box.path, box.parent),
                'is-dead': box.isDead 
              }
            ]"
            :style="{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: `${box.width}px`,
              height: `${box.height}px`,
              transform: `translate(${box.pos?.x || 0}px, ${box.pos?.y || 0}px)`,
              zIndex: box.isDead ? 0 : 20
            }"
          >
          
            <div class="cell-uid" title="优先级 (Priority)">UID: {{ box.uid }}</div>
            <div class="cell-path">{{ box.path }}</div>
            <div class="cell-load" title="消耗容量 (Weight)">W: {{ box.maxAmount }}</div>
            
            <div class="work-progress-bg">
              <div 
                class="work-progress-fill" 
                :style="{ width: `${Math.max(0, ((box.workLoad ?? box.maxAmount) / box.maxAmount) * 100)}%` }"
              ></div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import {
  useMeshFlow,
  DefaultStrategy,
  deleteEngine
} from "@meshflow/core";
import { useFlowLayout } from "../core/useFlowLayout";
import { useLogger } from "@meshflow/logger";

const layoutMode = ref('judge');
const sortStrategy = ref<'uid' | 'content'>('uid');
const playgroundRef = ref<HTMLElement | null>(null);
const boxRef = ref<any>(null);

const containerWidth = ref(1200); 
const logicalWidth = ref(1200);
const scaleRatio = ref(1);
const containerHeight = ref(820); 

let resizeObserver: ResizeObserver | null = null;

const { data, useFlowLayoutModule } = useFlowLayout();
const engine = useMeshFlow("layout", data, {
  UITrigger: {
    signalCreator: () => ref(0),
    signalTrigger: (signal) => signal.value++,
  },
  config: { useGreedy: true ,useEntangleStep:Infinity},
  modules: { flowLayoutModule: useFlowLayoutModule },
  metaType:{
    parent:"",
    isDead:false, 
    maxAmount:0,
    children:{},
    publicSeaMinUid:{},
    zoneChildren:{},
    cellAmounts:0,
    zoneMaxUidMap:{},
    zoneState:{},
    capacity:0,
    value:0
  }
});

// const logger = useLogger();
// engine.config.usePlugin(logger);
 
const { ZoneArray, BoxArray, judgementNode, AddNewBox } = engine.modules.flowLayoutModule;

let isInited = false;
let isResetting = false; 

const version = ref(BoxArray.length)

const syncStrategy = ( ) => {
  if (isInited) {
    engine.data.SetValue(judgementNode.path, 'sortStrategy', sortStrategy.value);
  }
};

// 🌟 只识别活着的格子作为排头兵
const isHeadBox = (boxPath: string, parentZone: string) => {
  if (!parentZone || parentZone === 'graveyard') return false;
  const siblings = BoxArray.filter(b => b.parent === parentZone && !b.isDead).sort((a, b) => a.uid - b.uid);
  return siblings.length > 0 && siblings[0].path === boxPath;
};

// 🌟 全局时钟相关状态
const isSimulating = ref(false);
let simulationFrameId: number | null = null;
let lastTickTime = 0;
const TICK_INTERVAL = 100; 

let isCourtBusy = false;

// 🌟 新增：自动补货相关状态
const isAutoSpawning = ref(false);
let spawnCounter = 0; 

// 核心时钟循环 (Game Loop)
const simulationLoop = (timestamp: number) => {
  if (!isSimulating.value) return;

  if (timestamp - lastTickTime >= TICK_INTERVAL) {
    lastTickTime = timestamp;

    if (isInited && !isResetting) {
      
      // 🌟 自动补货逻辑 (每 1.5 秒丢一个新格子)
      if (isAutoSpawning.value) {
        spawnCounter += TICK_INTERVAL;
        if (spawnCounter >= 10000) {
          handleAddNew();
          spawnCounter = 0;
        }
      }

      ZoneArray.forEach(zone => {
        const children = BoxArray.filter(b => b.parent === zone.path && !b.isDead)
                                 .sort((a, b) => a.uid - b.uid);
        
        if (children.length > 0) {
          const headBox = children[0];
          const currentWL = headBox.workLoad ?? headBox.maxAmount;
          
          if (currentWL <= 0) {
            engine.data.SetValues([
              { path: headBox.path, key: 'parent', value: 'graveyard' },
              { path: headBox.path, key: 'isDead', value: true }
            ]);
          } else {
            engine.data.SetValue(headBox.path, 'workLoad', currentWL - 1);
          }
        }
      });
    }
  }

  simulationFrameId = requestAnimationFrame(simulationLoop);
};

const toggleSimulation = () => {
  isSimulating.value = !isSimulating.value;
  
  if (isSimulating.value) {
    lastTickTime = performance.now();
    simulationFrameId = requestAnimationFrame(simulationLoop);
  } else {
    if (simulationFrameId) {
      cancelAnimationFrame(simulationFrameId);
      simulationFrameId = null;
    }
  }
};

const toggleAutoSpawn = () => {
  isAutoSpawning.value = !isAutoSpawning.value;
  // 如果开启自动补货，顺便把流水线也开了，体验更完整
  if (isAutoSpawning.value && !isSimulating.value) {
    toggleSimulation();
  }
};

const initBoxEntangle = (path:any)=>{
  ZoneArray.forEach((zone) => {
    engine.config.SetRule(path, zone.path, "children", {
      logic:   ({ slot }) => {
        // 🌟 改为对象
        let newChildren:any = {};
        for (let node of slot.triggerTargets) {
          
          if (node.parent == zone.path && !node.isDead) {
            newChildren[node.path] = node.maxAmount || 0;
          } else {
            newChildren[node.path] = 0;
          }
        }
        return newChildren;
      },
      triggerKeys: ["parent", "path", "isDead", "maxAmount"], 
   
    });  

    engine.config.SetStrategy(zone.path, "children", DefaultStrategy.MERGE);
    
    // 同步基准点 (忽略死者)
    engine.config.useEntangle({
      cause: zone.path,
      impact: path,
      via: ["children", "position"],
      filter: (causeState, impactState) => {
        if (impactState.state.isDead) return false;
        if(causeState.state.path===impactState.state.parent) return true;
        const childrenObj = causeState.state.children || {};
        return (childrenObj[impactState.path as string] || 0) > 0;
      
      },
      emit:(causeState, impactState, propose) => {
          const observer = causeState.state;
          const target = impactState.state;
          const nextX = (observer.position?.x ?? 0) 
          const nextY = (observer.position?.y ?? 0) + 240;
 
          if (target.parentPos?.x === nextX && target.parentPos?.y === nextY ) return;
         
          propose.set("parentPos", { x: nextX, y: nextY });
      },
    });

    // 🌟 向前补位引擎
    engine.config.useEntangle({
      cause: zone.path,
      impact: path,
      via: ["children"], 
      filter: (causeState, impactState) => {
        return impactState.state.parent === causeState.path && !impactState.state.isDead 
        // && layoutMode.value === 'judge';
      },
      emit:  async(causeState, impactState, propose) => {
        // if(layoutMode.value !== 'judge'){
        //   await new Promise((resolve) => setTimeout(resolve, 100)); 
        // }
        
        const obsPath = impactState.path as string;
        const parent = impactState.state.parent;
        const siblings = BoxArray.filter((b) => b.parent === parent && !b.isDead).sort((a, b) => a.uid - b.uid);
        const myIndex = siblings.findIndex((b) => b.path === obsPath);
        if (myIndex === -1) return;
     
        let nextX = 0; let nextY = 0;
   
        if (myIndex === 0) {
          nextX = (impactState.state.parentPos?.x || 0) + 20;
          nextY = impactState.state.parentPos?.y || 0;
        } else {
          const predecessor = siblings[myIndex - 1];
          const predPos = predecessor.state?.pos || predecessor.pos || { x: 0, y: 0 };
          const gap = 10; const padding = 20; const containerW = 400; const rowHeight = 120;
          const pPosX = impactState.state.parentPos?.x || 0;
          const predWidth = predecessor.width || 0;

          nextX = predPos.x + predWidth + gap;
          nextY = predPos.y;

          const obsBox = BoxArray.find(b => b.path === obsPath);
          const realWidth = obsBox ? obsBox.width : 0;
          if (nextX + realWidth > pPosX + containerW - padding) {
            nextX = pPosX + padding; nextY = predPos.y + rowHeight;
          }
        }

        const currentPos = impactState.state.pos || { x: 0, y: 0 };
        if (Math.abs(nextX - currentPos.x) < 0.5 && Math.abs(nextY - currentPos.y) < 0.5) return;

       
        propose.set("pos", { x: nextX, y: nextY });
      }
    });

    engine.config.useEntangle({
      cause: zone.path,
      impact: path, // 🌟 这里的 impact 就是传进来的单个 box 的 path
      via: [ 'currentLoad', 'value', 'children' ],
      filter: (causeState, impactState) => {
        if (layoutMode.value !== 'oscillation') return false;
        
        const myBox = impactState.state;
        const zoneData = causeState.state;

        // 不属于当前 Zone 的不管
        if (myBox.parent !== zone.path) return false;
        
        // 没超载的不管
        if ((zoneData.currentLoad || 0) <= (zoneData.value || 0)) return false;

        return true; 
      },
      emit: async (causeState, impactState, propose) => {
        const targetBoxPath = impactState.path as string;
        await  new Promise<void>(resolve=>setTimeout(() => {
          resolve()
        },150))
         
        // 2. 双重检查：复核容量和最弱者
        const siblings = BoxArray.filter((b) => b.parent === zone.path && !b.isDead);
        const realCurrentLoad = siblings.reduce((sum, b) => sum + (b.maxAmount || 0), 0);
        const realValue = zone.value || 100;

        if (realCurrentLoad <= realValue) return;

        const sortedByWeakness = siblings.sort((a, b) => b.uid - a.uid);
        if (sortedByWeakness.length === 0) return;

        const weakestBox = sortedByWeakness[0];
        if (weakestBox.path !== targetBoxPath) return; 
        
        // 🌟🌟🌟 3. 神级修复：动态计算“下一个 Zone”！
        // 注意：必须用 [...ZoneArray] 浅拷贝，防止 sort() 破坏原数组顺序！
        const sortedZones = [...ZoneArray].sort((a, b) => a.uid - b.uid);
        const myZoneIndex = sortedZones.findIndex(z => z.path === zone.path);
        
        // 如果我不是最后一个，就踢给下一个；如果是最后一个，踢回公海（""）
        const nextZonePath = (myZoneIndex !== -1 && myZoneIndex < sortedZones.length - 1) 
                             ? sortedZones[myZoneIndex + 1].path 
                             : "";

        // 4. 拿到目标坑位坐标，走人
        const targetZone = ZoneArray.find(z => z.path === nextZonePath);
        const targetZoneX = targetZone?.state?.position?.x ?? 0;
        const targetZoneY = (targetZone?.state?.position?.y || 0) + 240;

        propose.set('parent', nextZonePath);
        propose.set('parentPos', { x: targetZoneX, y: targetZoneY });
        
      }
    });

  });

 
 

  engine.config.SetRule(path, judgementNode.path, "cellAmounts", {
    logic: ({ slot }) => {
      const [trigger] = slot.triggerTargets;
      console.log(path,trigger.maxAmount)
      return { [trigger.path]: trigger.maxAmount || 0 };
    },
    triggerKeys: ["maxAmount", "path"],
  });
  engine.config.SetStrategy(judgementNode.path, "cellAmounts", DefaultStrategy.MERGE);

  engine.config.SetRule(path, judgementNode.path, "publicSeaMinUid", {
    logic: ({ slot }) => {
      const [trigger] = slot.triggerTargets;
      // 如果在公海且活着，参与计算
      if ((!trigger.parent || trigger.parent === "") && !trigger.isDead) {
        return { [trigger.path]: trigger.uid || Infinity };
      }
      return { [trigger.path]: Infinity }; // 不在公海的给一个极大值
    },
    triggerKeys: ["parent", "path","uid","isDead"],
   
    
  });
  engine.config.SetStrategy(judgementNode.path, "publicSeaMinUid", DefaultStrategy.MERGE);

  engine.config.SetRule(path, judgementNode.path, "zoneMaxUidMap", {
    logic:  ({ slot }) => {
      const [trigger] = slot.triggerTargets;
  
      if (trigger.parent && trigger.parent !== "" && !trigger.isDead) {
        return { [trigger.path]:trigger.uid || -1 };
      }
      return {}; // 离开 Zone 的不参与
    },
    triggerKeys: ["parent", "isDead", "uid","path"],
  });
  // 策略：先合并格子，再在内部算出每个 Zone 的最大值
  engine.config.SetStrategy(judgementNode.path, "zoneMaxUidMap", DefaultStrategy.MERGE);

  // 👨‍⚖️ 法官逻辑（招新与剔除）
  engine.config.useEntangle({
    cause: judgementNode.path,
    impact: path,
    via: ["zoneState", "trigger","publicSeaMinUid","zoneMaxUidMap"],
    filter: (causeState, impactState) => {
      if(!isInited || isResetting) return false;
      const obs = causeState.state;
      const tgt = impactState.state;
      
      if (tgt.isDead) return false; 
 
      const currentZone = tgt.parent;
      
      // 1. 公海格子：直接放行，让它们去 emit 里竞争坑位
      if (!currentZone || currentZone === "") return true;

      // 🌟 2. 正确解析公海最小 UID (从对象提取数值)
      const seaMap = obs.publicSeaMinUid || {};
      const seaVals = Object.values(seaMap) as number[];
      const minUidInSea = seaVals.length > 0 ? Math.min(...seaVals) : Infinity;

      // 🌟 3. 正确解析当前 Zone 的最大 UID
      const zoneMap = obs.zoneMaxUidMap || {};
      const zoneVals = Object.values(zoneMap) as number[];
      const maxUidInZone = zoneVals.length > 0 ? Math.max(...zoneVals) : -1;

      // 4. Zone 内格子：只有在“有威胁”或“超载”时才醒来
      const myZoneData = obs.zoneState?.[currentZone];
      
      // A. 区域满载报警 (这里我用了 100，你测试时可以保留你的 30)
      const isCrowded = myZoneData && myZoneData.capacity > 100; 
      
      // B. 威胁报警：外面有比我优先级高的，并且【我是这个 Zone 里的最弱者】
      // 加上 tgt.uid === maxUidInZone，可以防止 Zone 里的所有人都被唤醒，只精确唤醒该走的那一个
      const isThreatened = minUidInSea < maxUidInZone ; 

      return isCrowded || isThreatened;
    },
    emit:  async  (causeState, impactState, propose) => {
      await new Promise<void>((resolve)=>{
      setTimeout(() => {
        resolve()
      }, 100);
    })
      const observer = causeState.state;
      const target = impactState.state;
      const targetPath = impactState.path as string;
  
      const state = observer.zoneState || {};
      const zoneChildren = observer.zoneChildren || {};
      const cellAmounts = observer.cellAmounts || {};
      const currentZone = target.parent;
      const myAmount = cellAmounts[targetPath] || 0;

      // ==========================================
      // 1. 公海格子的处理逻辑
      // ==========================================
      if (!currentZone || currentZone === "") {
        const publicSeaBoxes = BoxArray.filter((b) => (!b.parent || b.parent === "") && !b.isDead);
        const strongestInSea = publicSeaBoxes.sort((a, b) => a.uid - b.uid)[0];

        if (strongestInSea && strongestInSea.path !== targetPath) return;

        if (isCourtBusy) return;
        isCourtBusy = true; 
      
        try {
          let bestZoneForNewbie: string | null = null;
          let minExpectedCapacity = 100;

          ZoneArray.forEach((z) => {
            const zoneName = z.path;
            const targetZoneData = state[zoneName];
            if(!targetZoneData) return;
            const targetCapacity = targetZoneData.capacity;
            const targetValue = targetZoneData.value;
            const expectedCapacity = targetCapacity + (myAmount / targetValue) * 100;

            if (expectedCapacity <= 100 && expectedCapacity < minExpectedCapacity) {
              minExpectedCapacity = expectedCapacity;
              bestZoneForNewbie = zoneName;
            }
          });

          if (bestZoneForNewbie) {
            if (target.parent === bestZoneForNewbie) return;
        
            propose.set("parent", bestZoneForNewbie);
            return;
          }
          if (layoutMode.value === 'oscillation') {
            const obs = causeState.state;
            const seaMap = obs.publicSeaMinUid || {};
            const seaVals = Object.values(seaMap) as number[];
            const minUidInSea = seaVals.length > 0 ? Math.min(...seaVals) : Infinity;

            // 🌟 3. 正确解析当前 Zone 的最大 UID
            const zoneMap = obs.zoneMaxUidMap || {};
            const zoneVals = Object.values(zoneMap) as number[];
            const maxUidInZone = zoneVals.length > 0 ? Math.max(...zoneVals) : -1;
            if(maxUidInZone>minUidInSea){
           
              propose.set("parent",'zone0')
            }
              
            return
          }
 
          return;
        } finally {
          isCourtBusy = false;
        }
      }

      if (layoutMode.value === 'oscillation') return;
      // ==========================================
      // 2. Zone 内格子的剔除与调度逻辑
      // ==========================================
      const myZoneData = state[currentZone] || { capacity: 0, value: 100 };
      const currentCapacity = myZoneData.capacity;

      // 🌟 在这里提取 minUidInSea 和 realTargetUid，供后续所有逻辑使用
      const seaMap = observer.publicSeaMinUid || {};
      const seaVals = Object.values(seaMap) as number[];
      const minUidInSea = seaVals.length > 0 ? Math.min(...seaVals) : Infinity;
      const realTargetUid = BoxArray.find(b => b.path === targetPath)?.uid ?? target.uid ?? 0;

      const isCrowded = currentCapacity > 100;
      const isThreatened = minUidInSea < realTargetUid;

      // 判断：只要自己超载了，或者被公海大佬威胁了，就启动离场判定
      if (isCrowded || isThreatened) {
        const myZoneChildrenObj = zoneChildren[currentZone] || {};
        const childrenInMyZone = Object.keys(myZoneChildrenObj).filter(k => (myZoneChildrenObj[k] || 0) > 0);
        
        if (childrenInMyZone.length === 0) return;

        const mySiblings = BoxArray.filter((b) => childrenInMyZone.includes(b.path));
        const targetToKick = mySiblings.sort((a, b) => b.uid - a.uid)[0];

        // 只有当前格子真的是 Zone 里最弱的，才执行踢出
        if (targetToKick.path !== targetPath) return;

        if (isCourtBusy) return;
        isCourtBusy = true;

        try {
          // 🌟🌟🌟 新增的核心拦截：优先级绝对让步！
          // 判断：如果我被踢了，但公海里有比我更强的大佬在排队，
          // 那我就没有资格去别的 Zone 找新坑位，必须直接回公海！
          if (minUidInSea < realTargetUid) {
            if (target.parent === "") return;
            propose.set("parent", "");
            return; // 直接 return，斩断满天飞的震荡！
          }

          // ===== 下面是正常的找坑位逻辑（只有在没有公海大佬威胁时才执行） =====
          let bestEmptyZone: string | null = null;
          let minExpectedCapacity = 100;
          let bestBullyZone: string | null = null;
          let maxWeakestUid = -1;

          ZoneArray.forEach((z) => {
            const zoneName = z.path;
            if (zoneName === currentZone) return;

            const targetZoneData = state[zoneName] || { capacity: 0, value: 100 };
            const targetCapacity = targetZoneData.capacity;
            const targetValue = targetZoneData.value || 100;
            const expectedCapacity = targetCapacity + (myAmount / targetValue) * 100;

            if (expectedCapacity <= 100) {
              if (expectedCapacity < minExpectedCapacity) {
                minExpectedCapacity = expectedCapacity;
                bestEmptyZone = zoneName;
              }
            }
            else {
              const targetChildrenObj = zoneChildren[zoneName] || {};
              const targetChildren = Object.keys(targetChildrenObj).filter(k => (targetChildrenObj[k] || 0) > 0);
              
              const targetSiblings = BoxArray.filter((b) => targetChildren.includes(b.path));
              const weakerGuys = targetSiblings.filter((b) => b.uid > realTargetUid);

              if (weakerGuys.length > 0) {
                const weakerTotalAmount = weakerGuys.reduce((sum, b) => sum + (cellAmounts[b.path] || 0), 0);
                const survivalCapacity = targetCapacity + ((myAmount - weakerTotalAmount) / targetValue) * 100;

                if (survivalCapacity <= 100) {
                  const weakest = weakerGuys.sort((a, b) => b.uid - a.uid)[0];
                  if (weakest.uid > maxWeakestUid) {
                    maxWeakestUid = weakest.uid;
                    bestBullyZone = zoneName;
                  }
                }
              }
            }
          });

          // await new Promise((resolve) => setTimeout(resolve, 10));

          if (bestEmptyZone) {
            if (target.parent === bestEmptyZone) return;
            propose.set("parent", bestEmptyZone);
            return;
          } else if (bestBullyZone) {
            if (target.parent === bestBullyZone) return; 
            propose.set("parent", bestBullyZone);
            return;
          } else {
            if (target.parent === "") return; 
            propose.set("parent", "");
            return;
          }
        } finally {
          isCourtBusy = false;
        }
      }
      return;
    }
  });

  // 5. 格子自发定位 (忽略死者)
// 👑 规则 1：老大锚定容器 (自我纠缠)
engine.config.useEntangle({
  cause: path, 
  impact: path, 
  // 🌟 核心：只要我换爹了，或者我爹动了，我就得重新看看我在哪
  via: ["parentPos", "parent"], 
  filter: (causeState, impactState) => {
    if (impactState.state.isDead) return false;
    return true; 
  },
  emit:(causeState, impactState, propose) => {
 
    
    const obs = causeState.state; 
    const obsPath = causeState.path as string;
    const isPublicSea = !obs.parent || obs.parent === "";

    // 护城河：真值穿透，防止外部数组滞后
    const siblings = BoxArray.map(b => b.path === obsPath ? { ...b, parent: obs.parent } : b)
      .filter((b) => b.parent === obs.parent && !b.isDead)
      .sort((a, b) => a.uid - b.uid);

    const myIndex = siblings.findIndex((b) => b.path === obsPath);
    if (myIndex === -1) return; 

    // 获取爹的真实坐标（兼容两种属性名）
    let pPosX = 0; let pPosY = 0;
    if (!isPublicSea) {
      const parentZone = ZoneArray.find(z => z.path === obs.parent);
      // pPosX = parentZone?.state?.position?.x ?? parentZone?.position?.x ?? obs.parentPos?.x ?? 0;
      // pPosY = parentZone?.state?.position?.y ?? parentZone?.position?.y ?? obs.parentPos?.y ?? 0;
      pPosX = obs.parentPos?.x ?? 0;
      pPosY = obs.parentPos?.y ?? 0;
    }

    let nextX = 0; let nextY = 0;
  
    if (myIndex === 0) {
      // 👑 我是老大：我的坐标只跟爹（Zone）有关
      if (isPublicSea) {
        nextX = 20; nextY = 0;
      } else {
        nextX = pPosX + 20; 
        nextY = pPosY + 20; 
      
      }
    } else {
      // 🚂 我是小弟：虽然我不该管兄弟的事，但因为我【刚落地】或者【爹动了】，我必须主动找前面的兄弟对齐一次！
      const predecessor = siblings[myIndex - 1];
      const predPos = predecessor.state?.pos || predecessor.pos || { x: 0, y: 0 };
      
      const gap = 10; const padding = 20;
      const containerW = isPublicSea ? 99999 : 400;
      const rowHeight = 120;
      const predWidth = predecessor.width || 0;
      const myWidth = obs.width || 0;
      
      nextX = predPos.x + predWidth + gap;
      nextY = predPos.y; // 🌟 直接继承前一个兄弟的精确 Y 坐标
      
      // 换行检测（同样依赖爹的基准 X）
      if (!isPublicSea && (nextX + myWidth > pPosX + containerW - padding)) {
        nextX = pPosX + padding; 
        nextY = predPos.y + rowHeight;
      }
    }

    const currentPos = obs.pos || { x: 0, y: 0 };
    
    // 阻尼消声器
    if (Math.abs(nextX - currentPos.x) < 0.5 && Math.abs(nextY - currentPos.y) < 0.5) return; 

    propose.set("pos", { x: nextX, y: nextY });
  },
});

// 🚂 规则 2：小弟跟随前驱 (链式纠缠)
BoxArray.forEach((nodeA) => {
  engine.config.useEntangle({
    cause: nodeA.path, // 前面的兄弟
    impact: path,      // 现在的我
    via: ["pos",], // 兄弟挪位了，或者兄弟换爹了
    filter: (causeState, impactState) => {
      const obs = causeState.state;
      const tgt = impactState.state;
      if (obs.isDead || tgt.isDead || obs.parent !== tgt.parent) return false;

      // 🌟 核心拦截：我必须紧紧跟在这个 cause 的屁股后面
      const siblings = BoxArray.filter((b) => b.parent === obs.parent && !b.isDead).sort((a, b) => a.uid - b.uid);
      const causeIndex = siblings.findIndex((b) => b.path === causeState.path);
      
      // 只有当 cause 排在我正前方（即 causeIndex + 1 就是我），才放行
      return siblings[causeIndex + 1]?.path === impactState.path;
    },
    emit:  (causeState, impactState, propose) => {
    
      const obs = causeState.state; // 前驱兄弟
      const tgt = impactState.state; // 我自己
      
      const isPublicSea = !obs.parent || obs.parent === "";
      const gap = 10;
      const padding = 20;
      const containerW = isPublicSea ? 99999 : 400;
      const rowHeight = 120;

      // 拿前驱的坐标和宽度
      const predPos = obs.pos || { x: 0, y: 0 };
      const predWidth = obs.width || 0;
      const myWidth = tgt.width || 0;

      // 获取父容器基准 X 坐标 (换行时需要用到)
      let pPosX = 0;
      if (!isPublicSea) {
        const parentZone = ZoneArray.find(z => z.path === obs.parent);
        pPosX = parentZone?.state?.position?.x ?? parentZone?.position?.x ?? tgt.parentPos?.x ?? 0;
      }

      // 默认排在兄弟右边
      let nextX = predPos.x + predWidth + gap;
      let nextY = predPos.y;

      // 🌟 换行检测：如果我排在右边会撞墙，我就掉到下一行
      if (!isPublicSea && nextX + myWidth > pPosX + containerW - padding) {
        nextX = pPosX + padding;
        nextY = predPos.y + rowHeight;
      }

      const currentPos = tgt.pos || { x: 0, y: 0 };
      if (Math.abs(nextX - currentPos.x) < 0.5 && Math.abs(nextY - currentPos.y) < 0.5) return; 
    
      propose.set("pos", { x: nextX, y: nextY });
    },
  });
});
}

const setupSortingEntangle = () => {
  // 1. Zone 的动态排序
  ZoneArray.forEach((zone) => {
    engine.config.useEntangle({
      cause: judgementNode.path,
      impact: zone.path,
      via: ["zoneChildren", "sortStrategy", "logicalWidth"],
      emit: (causeState, impactState, propose) => {
        const zoneChildren = causeState.state.zoneChildren || {};
        const currentStrategy = causeState.state.sortStrategy || 'uid';
        const currentWidth = causeState.state.logicalWidth || 1200;
        
        const stats = ZoneArray.map(z => {
          const childrenObj = zoneChildren[z.path] || {};
          const activeCount = Object.keys(childrenObj).filter(k => (childrenObj[k] || 0) > 0).length;
          return {
            path: z.path, uid: z.uid, count: activeCount
          };
        });

        stats.sort((a, b) => {
          if (currentStrategy === 'content') {
            if (b.count !== a.count) return b.count - a.count; 
          }
          return a.uid - b.uid; 
        });

        const myIndex = stats.findIndex(s => s.path === impactState.path);
        if (myIndex === -1) return;
        propose.set("index", myIndex); 

        const zoneW = 400, zoneH = 580, gap = 20, padding = 20;
        let nextX = padding, nextY = 0;

        for (let i = 0; i < myIndex; i++) {
          let tempX = nextX + zoneW + gap;
          if (tempX + zoneW > currentWidth) {
            nextX = padding; nextY = nextY + zoneH + gap;
          } else {
            nextX = tempX;
          }
        }

        const currPos = impactState.state.position || { x: 0, y: 0 };
        if (Math.abs(currPos.x - nextX) < 1 && Math.abs(currPos.y - nextY) < 1) return;
        propose.set("position", { x: nextX, y: nextY });
      }
    });

    // 🌟 2. Zone 的容量派生 (修改为监听 children，自动算出 currentLoad)
    engine.config.useEntangle({
      cause: zone.path,
      impact: zone.path,
      via: ["children", "value"], 
      emit: (causeState, impactState, propose) => {
     
        const obs = causeState.state;
        const realValue = obs.value ?? ZoneArray.find(z => z.path === causeState.path)?.value ?? 1;
        
        const childrenObj = obs.children || {};
        const load = Object.values(childrenObj).reduce((sum: number, val: any) => sum + (Number(val) || 0), 0);
       
        propose.set("currentLoad", load);
     
        propose.set("capacity", (load / realValue) * 100);
      }
    });
    // 3. 上报法官
    engine.config.SetRule(zone.path, judgementNode.path, "zoneState", {
      logic:({ slot }) => {
        const [trigger] = slot.triggerTargets;
        return { [trigger.path]: { capacity: trigger.capacity, value: trigger.value } };
       
      },
      triggerKeys: ["capacity", "path", "value"],
    });

    engine.config.SetRule(zone.path, judgementNode.path, "zoneChildren", {
      logic: ({ slot }) => {
        const [trigger] = slot.triggerTargets;
        return { [trigger.path]: trigger.children };
      },
      triggerKeys: ["children", "path"],
    });
  });

  engine.config.SetStrategy(judgementNode.path, "zoneChildren", DefaultStrategy.MERGE);
  engine.config.SetStrategy(judgementNode.path, "zoneState", DefaultStrategy.MERGE);
 
};

const handleAddNew = ()=>{
  const node = AddNewBox();
  const nodeProxy = node.createView();
  BoxArray.push(nodeProxy);
  version.value++;
  initBoxEntangle(nodeProxy.path);
  // 新格子一开始落在公海（为空字符串）并且满血复活
  engine.data.SetValues([
    { path: nodeProxy.path, key: 'parent', value: '' },
    { path: nodeProxy.path, key: 'isDead', value: false },
    { path: nodeProxy.path, key: 'workLoad', value: nodeProxy.maxAmount }
  ]);
  setTimeout(() => {
    engine.data.SetValue(judgementNode.path, 'trigger', Math.random());
  }, 50);
}

const reset = async () => {
  isResetting = true;
  if (isSimulating.value) toggleSimulation(); 
  if (isAutoSpawning.value) toggleAutoSpawn();

  let res:any = [];
  for (let box of BoxArray) {
    res.push(
      { path:box.path, key:'parent', value:'zone1' },
      { path:box.path, key:'isDead', value: false },  
      { path:box.path, key:'workLoad', value: box.maxAmount }
    )
  };

  engine.data.SetValues(res);

  await new Promise(resolve => setTimeout(resolve, 800));
  isResetting = false;
  engine.data.SetValue(judgementNode.path, 'trigger', Math.random());
}
  
const changeCapacity = (path: string, delta: number) => {
  const zone = ZoneArray.find((z) => z.path === path);
  if (zone) {
    const newValue = Math.max(1, (zone.value || 0) + delta);
    engine.data.SetValue(path, "value", newValue);
  }
};
  
onMounted(async() => {
  if (boxRef.value) {
    // offsetWidth 包括 padding 和 border
    const width = boxRef.value.offsetWidth 
    // getBoundingClientRect 可以获取更精确的小数宽度（受 CSS scale 影响）
    containerWidth.value = width;
    logicalWidth.value = width;
    
  }

  setupSortingEntangle();
  for(let box of BoxArray){
    initBoxEntangle(box.path);
  }
 
  // engine.data.SetValue(judgementNode.path, 'sortStrategy', sortStrategy.value);

  if (playgroundRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const realWidth = entry.contentRect.width;
        const zoneW = 400; const zoneH = 580; const gap = 20; const padding = 20;
        const minLogicalWidth = zoneW + padding * 2; 

        if (realWidth < minLogicalWidth) {
          scaleRatio.value = realWidth / minLogicalWidth;
          logicalWidth.value = minLogicalWidth;
        } else {
          scaleRatio.value = 1; logicalWidth.value = realWidth;
        }
        containerWidth.value = logicalWidth.value;
        if (isInited) engine.data.SetValue(judgementNode.path, 'logicalWidth', logicalWidth.value);
        
        let cols = Math.floor((logicalWidth.value - padding + gap) / (zoneW + gap));
        if (cols < 1) cols = 1;
        const rows = Math.ceil(ZoneArray.length / cols);
        const unscaledHeight = 120 + rows * zoneH + (rows > 0 ? rows - 1 : 0) * gap + 60;
        
        containerHeight.value = unscaledHeight * scaleRatio.value;
      }
    });
    resizeObserver.observe(playgroundRef.value);
  }

  engine.data.SetValue(judgementNode.path, 'logicalWidth', logicalWidth.value);

  let zoneres:any = [];
  for (let zone of ZoneArray) {
    zoneres.push({ path:zone.path, key:'position', value:{ x: 20, y: 0 } })
  }
  engine.data.SetValues(zoneres)
  
  await new Promise((resolve)=>setTimeout(resolve,500))
  isInited = true;

  let res:any = [];
  for (let box of BoxArray) {
    res.push(
      { path:box.path, key:'parent', value:'zone1' },
      { path:box.path, key:'workLoad', value: box.maxAmount },
      { path:box.path, key:'isDead', value: false } 
    )
  };

  engine.data.SetValues(res)
});
  
onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
  // if (simulationTimer) clearInterval(simulationTimer);
  if (simulationFrameId) cancelAnimationFrame(simulationFrameId);
  deleteEngine('layout')
})
</script>
  
<style scoped>
/* =========================================
   🌟 上半部分：画布、盒子、流水线的核心样式 (保留原有)
========================================= */
.dashboard-wrapper { background: #0d1117; border: 1px solid var(--vp-c-divider, rgba(255, 255, 255, 0.1)); border-radius: 12px; overflow: hidden; margin: 24px 0; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4); }
.playground { width: 100%; overflow: hidden; position: relative; }
.playground-canvas { position: absolute; top: 0; left: 0; height: 100%; padding: 0; }
.energy-box { width: 400px; height: 580px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); backdrop-filter: blur(8px); }
.energy-box.is-overload { border-color: rgba(255, 77, 79, 0.6); box-shadow: 0 0 20px rgba(255, 77, 79, 0.15); }
.box-header { padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; background: rgba(0, 0, 0, 0.3); z-index: 10; color: white; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
.path-label { font-size: 13px; font-weight: bold; letter-spacing: 0.5px; }
.status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #52c41a; margin-right: 8px; box-shadow: 0 0 8px #52c41a; }
.is-overload .status-dot { background: #ff4d4f; box-shadow: 0 0 8px #ff4d4f; animation: pulse 1s infinite; }
.btn-capacity { cursor: pointer; background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; font-weight: bold; }
.btn-capacity:hover { background: #1890ff; border-color: #1890ff; }
.load-value { padding: 8px 16px; font-size: 11px; color: #888; z-index: 10; font-family: monospace; }
.water-stage { position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
.water-layer { position: absolute; bottom: 0; left: 0; width: 100%; transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
.current-load { background: linear-gradient(180deg, rgba(24, 144, 255, 0.15) 0%, rgba(24, 144, 255, 0) 100%); border-top: 1px solid rgba(24, 144, 255, 0.4); }
.overload-line { position: absolute; top: 0; width: 100%; height: 2px; background: #ff4d4f; box-shadow: 0 0 8px #ff4d4f; }

.cell { background: linear-gradient(135deg, #2b323b 0%, #1a1e24 100%); border: 1px solid rgba(255, 255, 255, 0.15); z-index: 20; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); overflow: hidden; gap: 2px; transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s, border-color 0.3s, opacity 0.3s; }
.cell.is-processing { border-color: #52c41a; box-shadow: 0 0 15px rgba(82, 196, 26, 0.4); }
.cell.is-dead { opacity: 0; transform: scale(0) translateY(-50px) !important; pointer-events: none; }
.cell-uid { font-size: 10px; color: #ffaa00; font-weight: bold; }
.cell-path { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; }
.cell-load { font-size: 10px; color: #00e5ff; background: rgba(0, 0, 0, 0.4); padding: 2px 8px; border-radius: 10px; margin-top: 2px; }
.work-progress-bg { width: 80%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 6px; overflow: hidden; }
.work-progress-fill { height: 100%; background: #52c41a; transition: width 0.1s linear; }
@keyframes pulse { 50% { opacity: 0.5; } }

/* =========================================
   🌟 下半部分：控制台面板专属样式 (VitePress 适配版)
========================================= */
.control-panel { 
  padding: 16px 20px; 
  background: rgba(255, 255, 255, 0.02); 
  border-bottom: 1px solid rgba(255, 255, 255, 0.08); 
  display: flex; 
  flex-direction: column; /* 改为纵向排列双行 */
  gap: 16px; 
}

/* 行容器，支持弹性折行以适应侧边栏挤压 */
.settings-row, .actions-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.actions-row {
  background: rgba(0, 0, 0, 0.2);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.flex-spacer { flex: 1; min-width: 20px; }

.v-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 4px;
}

/* 🌟 选择器紧凑化 */
.mode-selector { display: flex; align-items: center; gap: 10px; }
.selector-label { color: #aaa; font-size: 12px; font-weight: bold; }
.radio-group { display: flex; gap: 6px; background: rgba(0, 0, 0, 0.3); padding: 3px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.1); }
.radio-item { cursor: pointer; padding: 4px 12px; border-radius: 4px; display: flex; align-items: center; gap: 6px; transition: all 0.2s ease; }
.radio-item input { display: none; }
.radio-dot { width: 6px; height: 6px; border-radius: 50%; background: #555; transition: all 0.3s; }
.radio-item .text { font-size: 12px; color: #888; }
.radio-item.active { background: rgba(24, 144, 255, 0.15); }
.radio-item.active .radio-dot { background: #1890ff; box-shadow: 0 0 6px #1890ff; }
.radio-item.active .text { color: #fff; font-weight: bold; }

/* 🌟 通用按钮基础样式 (缩小高度，适配文档排版) */
.action-btn {
  height: 32px;
  padding: 0 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: none;
}
.action-btn .icon { font-size: 14px; }

/* 启动流水线按钮 */
.play-btn { background: rgba(82, 196, 26, 0.15); color: #52c41a; border: 1px solid rgba(82, 196, 26, 0.3); }
.play-btn:hover { background: rgba(82, 196, 26, 0.25); transform: translateY(-1px); }
.play-btn.is-playing { background: rgba(255, 77, 79, 0.15); color: #ff4d4f; border-color: rgba(255, 77, 79, 0.3); }
.play-btn.is-playing:hover { background: rgba(255, 77, 79, 0.25); }

/* 手动空投按钮 */
.add-btn { background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%); color: white; border: 1px solid rgba(24, 144, 255, 0.4); box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2); }
.add-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(24, 144, 255, 0.4); background: linear-gradient(135deg, #40a9ff 0%, #1890ff 100%); }
.add-btn:active { transform: translateY(0); }

/* 自动补货按钮 */
.auto-btn { background: rgba(114, 46, 209, 0.15); color: #b37feb; border: 1px solid rgba(114, 46, 209, 0.3); }
.auto-btn:hover { background: rgba(114, 46, 209, 0.25); transform: translateY(-1px); }
.auto-btn.is-active { background: #722ed1; color: white; border-color: #9254de; box-shadow: 0 0 12px rgba(114, 46, 209, 0.5); animation: breathe 2s infinite ease-in-out; }

@keyframes breathe {
  0% { box-shadow: 0 0 8px rgba(114, 46, 209, 0.4); }
  50% { box-shadow: 0 0 16px rgba(114, 46, 209, 0.8); }
  100% { box-shadow: 0 0 8px rgba(114, 46, 209, 0.4); }
}

/* 洗牌按钮 */
.reset-btn { background: rgba(255, 255, 255, 0.08); color: #ccc; border: 1px solid rgba(255, 255, 255, 0.15); }
.reset-btn:hover { background: rgba(255, 255, 255, 0.15); color: #fff; transform: translateY(-1px); }

/* 🌟 极端窄屏适配 (手机端) */
@media (max-width: 640px) { 
  .settings-row { flex-direction: column; align-items: flex-start; }
  .actions-row { padding: 12px; }
  .flex-spacer, .v-divider { display: none; }
  .action-btn { flex: 1; min-width: 45%; justify-content: center; }
}
</style>