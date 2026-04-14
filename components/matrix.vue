<template>
    <div class="meshflow-dashboard">
      <div class="dashboard-container">
        
        <header class="dashboard-header">
          <div class="header-titles">
            <h1>Meshflow Matrix <span>9-Node Projection</span></h1>
            <p class="subtitle">通过底层纯净的分布式运算，实时推导拓扑收敛态。</p>
          </div>
          
          <div class="header-actions">
            <div class="action-group">
              <div class="control-group">
                <span class="control-label">异步演进:</span>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="isAsyncMode">
                  <span class="slider"></span>
                </label>
              </div>
  
              <div class="ignition-group">
                <span class="ignition-label">点火能量:</span>
                <input 
                  type="number" 
                  v-model="ignitionValue" 
                  class="ignition-input"
                />
              </div>
            </div>
  
            <div class="action-group">
              <button class="btn btn-primary" @click="resetSystem">
                🚀 真空点火 (N5)
              </button>
              <button class="btn btn-danger" @click="randomPerturb">
                🎲 随机扰动
              </button>
            </div>
          </div>
        </header>
  
        <div class="matrix-grid">
          <div v-for="node in list" :key="node.path" class="node-card">
            <div class="node-header">
              <div class="node-identity">
                <span class="node-path">{{ node.path }}</span>
                <span class="node-label">{{ node.meta.label }}</span>
              </div>
              <span class="node-signal">⚡ PUSH: {{ node.dirtySignal.value }}</span>
            </div>
  
            <div class="node-formula">
              <div class="formula-label">纠缠公式:</div>
              <input 
                v-model="node.meta.formula" 
                placeholder="输入依赖公式 (如: N1*0.5)"
                class="formula-input"
              />
            </div>
  
            <div class="node-projection">
              <div class="projection-label">UI 整数投影 (投影态)</div>
              <input 
                type="number"
                :value="Math.round(node.state.count)"
                @input="e => onUpdate(node, (e.target as HTMLInputElement).valueAsNumber)"
                class="projection-input"
              />
              <div class="raw-value">
                底层动能: {{ typeof node.state.count === 'number' ? node.state.count.toFixed(4) : node.state.count }}
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { deleteEngine, useMeshFlow } from '@meshflow/core';
  import { useMatrixData } from '../core/matrix'; // 请确保路径正确
  import { useLogger } from "@meshflow/logger";
  
  // 🌟 控制参数
  const ignitionValue = ref(500);
  const isAsyncMode = ref(true); // 异步演进开关
  
  // 1. 初始化 Meshflow 引擎
  const engine = useMeshFlow('9-mesh-solver', [], {
    UITrigger: { 
      signalCreator: () => ref(0), 
      signalTrigger: (signal) => signal.value++ 
    },
    config: { 
      useGreedy: true, 
      useEntangleStep: Infinity // 允许无限次收敛尝试直到稳态
    },
    modules: { useMatrixData }
  });
  
  const { list } = engine.modules.matrixData;
  
  // 2. 人工打破平衡
  const onUpdate = (node: any, val: number) => {
    engine.data.SetValue(node.path, "count", val || 0);
  };
  
  // 3. 注入中心能量：纯净降噪重置
  const resetSystem = () => {
    try {
      list.forEach(node => {
          engine.data.SilentSet(node.path, "count", 0);
      });
      engine.data.SetValue("N5", "count", ignitionValue.value || 0);
    } catch (e) {
      console.error("引擎重置异常:", e);
    }
  };
  
  // 4. 混沌测试
  const randomPerturb = () => {
    list.forEach(node => {
      const randomVal = 100 + Math.random() * 800; 
      engine.data.StageValue(node.path, "count", randomVal);
    });
  };
  
  /**
   * 5. 核心：动态全连接拓扑矩阵
   */
  const setupDynamicSolver = () => {
    const threshold = 0.001; 
  
    list.forEach(targetNode => {
      const otherNodes = list.filter(n => n.path !== targetNode.path);
      
      otherNodes.forEach(causeNode => {
        engine.config.useEntangle({
          cause: causeNode.path,
          impact: targetNode.path,
          via: ["count"],
          emit: async (src, tgt, propose) => {
            const formula = tgt.meta.formula;
            if (!formula || !formula.includes(causeNode.path)) return;
            
             
              const context: any = {};
              list.forEach(n => context[n.path] = n.state.count ?? 0);
              
              const runner = new Function(...Object.keys(context), `return ${formula}`);
              const raw = runner(...Object.values(context));
  
              if (typeof raw !== 'number' || isNaN(raw)) return;
  
              const current = tgt.state.count ?? 0;
              
              // 🌟 核心开关逻辑：如果开启异步模式，则让出主线程
              if (isAsyncMode.value) {
                await new Promise((resolve) => {
                  // 使用 0ms 延迟来模拟微任务/宏任务切片，让 Vue 有机会渲染中间态
                  setTimeout(resolve, 0); 
                });
              }
  
              // 阈值检查，防止无限微调导致的性能损耗
              if (Math.abs(raw - current) > threshold) {
                propose.set("count", raw);
              }
           
          }
        });
      });
    });
  };
  
  engine.hooks.onSuccess(() => {
    console.log("稳态达成:", list.map(item => item.state.count));
  });
  
  onMounted(() => {
    setupDynamicSolver();
    engine.config.notifyAll();
  });
  
  onUnmounted(() => {
    deleteEngine('9-mesh-solver');
  });
  </script>
  
  <style scoped>
  /* 1. 变量与基础重置 */
  .meshflow-dashboard {
    --primary-blue: #38bdf8;
    --accent-purple: #a78bfa;
    --warning-amber: #f59e0b;
    --danger-rose: #e11d48;
    --bg-darker: #0f172a;
    --bg-card: #1e293b;
    --border-color: #334155;
  
    background: var(--bg-darker);
    min-height: 100vh;
    color: #f8fafc;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    padding: 16px;
    transition: all 0.3s ease;
  }
  
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* 2. 响应式 Header 布局 */
  .dashboard-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 32px;
  }
  
  @media (min-width: 1024px) {
    .dashboard-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
  
  .header-titles h1 {
    margin: 0;
    color: var(--primary-blue);
    font-size: clamp(20px, 5vw, 28px); /* 字体自适应 */
    font-weight: 800;
    text-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
  }
  
  .header-titles h1 span {
    font-size: 14px;
    color: #64748b;
    margin-left: 12px;
    border-left: 1px solid var(--border-color);
    padding-left: 12px;
    font-weight: 400;
  }
  
  .subtitle {
    color: #94a3b8;
    font-size: 14px;
    margin-top: 8px;
  }
  
  /* 3. 操作区：解决“挤”的核心逻辑 */
  .header-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
  
  @media (min-width: 768px) {
    .header-actions {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-end;
      width: auto;
    }
  }
  
  .action-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap; /* 空间不足自动换行，防止挤压 */
    flex: 1;
  }
  
  .control-group, .ignition-group, .btn {
    flex: 1; 
    min-width: 130px; /* 降低最小宽度，给换行留空间 */
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0 12px;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  /* 4. 按钮与交互件细节 */
  .btn {
    border: none;
    cursor: pointer;
    font-weight: 600;
    white-space: nowrap;
  }
  
  .btn-primary { background: #0ea5e9; color: white; }
  .btn-danger { background: var(--danger-rose); color: white; }
  .btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
  .btn:active { transform: translateY(0); }
  
  .control-label, .ignition-label {
    font-size: 11px;
    color: #94a3b8;
    white-space: nowrap;
  }
  
  .ignition-input {
    background: transparent;
    border: none;
    color: var(--primary-blue);
    font-size: 16px;
    font-weight: bold;
    width: 100%; /* 撑满容器 */
    max-width: 60px;
    outline: none;
    text-align: right;
  }
  
  /* 5. 矩阵网格自适应 */
  .matrix-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .node-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s;
  }
  
  .node-card:hover {
    border-color: #475569;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.3);
  }
  
  .node-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .node-path {
    background: var(--primary-blue);
    color: var(--bg-darker);
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 900;
    font-size: 14px;
  }
  
  .node-label { margin-left: 8px; color: #94a3b8; font-size: 12px; }
  
  .node-signal {
    font-size: 10px;
    color: var(--warning-amber);
    background: rgba(245, 158, 11, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }
  
  /* 6. 输入框细节优化 */
  .formula-input {
    width: 100%;
    background: var(--bg-darker);
    border: 1px solid #475569;
    color: var(--accent-purple);
    padding: 12px;
    border-radius: 8px;
    font-size: 13px;
    margin-top: 8px;
    outline: none;
    box-sizing: border-box;
  }
  
  .formula-input:focus {
    border-color: var(--accent-purple);
    box-shadow: 0 0 0 1px var(--accent-purple);
  }
  
  .node-projection {
    margin-top: 20px;
    background: rgba(15, 23, 42, 0.4);
    padding: 16px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.03);
  }
  
  .projection-input {
    width: 100%;
    background: transparent;
    border: none;
    color: #fff;
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 800;
    text-align: center;
    outline: none;
    transition: color 0.3s;
  }
  
  .projection-input:focus {
    color: var(--primary-blue);
  }
  
  .raw-value {
    font-size: 11px;
    color: #10b981;
    margin-top: 12px;
    text-align: right;
    border-top: 1px solid var(--border-color);
    padding-top: 10px;
    opacity: 0.8;
  }
  
  /* 7. 开关样式微调 */
  .toggle-switch {
    width: 36px;
    height: 18px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .slider:before {
    height: 12px;
    width: 12px;
    left: 3px;
    bottom: 3px;
  }
  
  input:checked + .slider:before {
    transform: translateX(18px);
  }
  </style>