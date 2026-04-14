<template>
    <div class="meshflow-dashboard">
      <div class="dashboard-container">
        
        <header class="dashboard-header">
          <div class="header-titles">
            <h1>Meshflow Matrix <span>9-Node Projection</span></h1>
            <p class="subtitle">通过底层纯净的分布式运算，实时推导拓扑收敛态。</p>
          </div>
          <div class="header-actions">
            <div class="ignition-group">
              <span class="ignition-label">真空点火初始能量:</span>
              <input 
                type="number" 
                v-model="ignitionValue" 
                class="ignition-input"
              />
            </div>

            <button class="btn btn-primary" @click="resetSystem">
              🚀 真空点火 (N5)
            </button>
            <button class="btn btn-danger" @click="randomPerturb">
              🎲 随机全盘扰动
            </button>
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
              <div class="formula-label">🧠 纠缠公式 (实时编译):</div>
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
  import { useMatrixData } from '../core/matrix'; // 替换为你的路径
  import { useLogger } from "@meshflow/logger";
  
  // 🌟 用户自定义点火值
  const ignitionValue = ref(500);

  // 1. 初始化 Meshflow 引擎
  const engine = useMeshFlow('9-mesh-solver', [], {
    UITrigger: { 
      signalCreator: () => ref(0), 
      signalTrigger: (signal) => signal.value++ 
    },
    config: { useGreedy: true, useEntangleStep: 100 },
    modules: { useMatrixData }
  });
  
  // const logger = useLogger();
  // engine.config.usePlugin(logger);
  
  const { list } = engine.modules.matrixData;
  
  // 2. 人工打破平衡 (直接修改 UI 投影，触发纯净注入)
  const onUpdate = (node: any, val: number) => {
    // 当用户手动输入时，我们应当将其视为一次纯粹的神谕注入
    engine.data.SetValue(node.path, "count", val || 0);
  };
  
  // 3. 注入中心能量：纯净降噪重置
  const resetSystem = () => {
    try {
      list.forEach(node => {
          // 强行降噪，切断所有背景余波
          engine.data.SilentSet(node.path, "count", 0);
      });
      // 🌟 使用用户输入的值引爆
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
            // 【虚拟解耦】如果公式中剥离了该节点，拦截引擎计算流
            if (!formula || !formula.includes(causeNode.path)) return;
  
            try {
              const context: any = {};
              list.forEach(n => context[n.path] = n.state.count ?? 0);
              
              const runner = new Function(...Object.keys(context), `return ${formula}`);
              const raw = runner(...Object.values(context));
  
              if (typeof raw !== 'number' || isNaN(raw)) return;
  
              const current = tgt.state.count ?? 0;
              
              if (Math.abs(raw - current) > threshold) {
                propose.set("count", raw);
              }
            } catch (e) {
              // 静默处理表达式构建过程中的半成品语法错误
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
    // 全面唤醒引擎，确立初始静态背景
    engine.config.notifyAll();
  });

  onUnmounted(()=>{
    deleteEngine('9-mesh-solver')
  })
  </script>
  
  <style scoped>
  /* 全局暗黑科技风设定 */
  .meshflow-dashboard {
    background: #0f172a;
    min-height: 100vh;
    color: #f8fafc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 40px 20px;
  }
  
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* 头部样式 */
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 24px;
    border-bottom: 1px solid #1e293b;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .header-titles h1 {
    margin: 0;
    color: #38bdf8;
    font-size: 32px;
    letter-spacing: -0.5px;
  }
  
  .header-titles h1 span {
    font-size: 16px;
    color: #64748b;
    font-weight: normal;
    margin-left: 12px;
    border-left: 2px solid #334155;
    padding-left: 12px;
  }
  
  .subtitle {
    color: #94a3b8;
    font-size: 15px;
    margin: 8px 0 0 0;
  }
  
  /* 按钮样式 */
  .header-actions {
    display: flex;
    align-items: center; /* 确保输入框和按钮对齐 */
    gap: 12px;
  }

  /* 🌟 新增：点火输入框样式，不影响全局 */
  .ignition-group {
    display: flex;
    align-items: center;
    background: #1e293b;
    border: 1px solid #334155;
    padding: 2px 12px;
    border-radius: 8px;
    height: 38px; /* 匹配按钮高度感 */
  }

  .ignition-label {
    font-size: 12px;
    color: #94a3b8;
    margin-right: 8px;
    white-space: nowrap;
  }

  .ignition-input {
    background: transparent;
    border: none;
    color: #38bdf8;
    font-family: 'Fira Code', monospace;
    font-size: 16px;
    font-weight: bold;
    width: 60px;
    outline: none;
    text-align: center;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  }
  
  .btn-primary {
    background: #0ea5e9;
    color: white;
    box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.39);
  }
  
  .btn-primary:hover {
    background: #0284c7;
    transform: translateY(-1px);
  }
  
  .btn-danger {
    background: #e11d48;
    color: white;
    box-shadow: 0 4px 14px 0 rgba(225, 29, 72, 0.39);
  }
  
  .btn-danger:hover {
    background: #be123c;
    transform: translateY(-1px);
  }
  
  /* 架构说明卡片 */
  .architecture-note {
    background: rgba(30, 41, 59, 0.5);
    border-left: 4px solid #8b5cf6;
    padding: 20px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 30px;
    font-size: 14px;
    color: #cbd5e1;
    line-height: 1.6;
  }
  
  .note-title {
    color: #c4b5fd;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .architecture-note ul {
    margin: 10px 0 0 0;
    padding-left: 20px;
  }
  
  .architecture-note li {
    margin-bottom: 6px;
  }
  
  .architecture-note strong {
    color: #e2e8f0;
  }
  
  /* 响应式网格 (核心适配逻辑) */
  .matrix-grid {
    display: grid;
    /* 自动填充，卡片最小 300px，最大 1fr */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  
  /* 节点卡片样式 */
  .node-card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 20px;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  
  .node-card:hover {
    border-color: #475569;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
  }
  
  .node-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .node-identity {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .node-path {
    background: #38bdf8;
    color: #0f172a;
    padding: 4px 12px;
    border-radius: 6px;
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 1px;
  }
  
  .node-label {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 600;
  }
  
  .node-signal {
    font-size: 11px;
    color: #f59e0b;
    font-family: 'Fira Code', monospace;
    background: rgba(245, 158, 11, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }
  
  /* 公式输入框 */
  .node-formula {
    margin-bottom: 20px;
  }
  
  .formula-label {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 8px;
  }
  
  .formula-input {
    width: 100%;
    box-sizing: border-box;
    background: #0f172a;
    border: 1px solid #475569;
    color: #a78bfa;
    padding: 12px;
    font-family: 'Fira Code', monospace;
    font-size: 14px;
    border-radius: 8px;
    outline: none;
    transition: all 0.2s;
  }
  
  .formula-input:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
  
  /* 投影数值区 */
  .node-projection {
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
    border: 1px inset #334155;
    text-align: center;
  }
  
  .projection-label {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 12px;
  }
  
  .projection-input {
    width: 100%;
    background: transparent;
    border: none;
    color: #f8fafc;
    font-size: 42px;
    font-weight: 900;
    text-align: center;
    outline: none;
    font-family: system-ui;
    margin-bottom: 8px;
  }
  
  .raw-value {
    font-size: 12px;
    color: #10b981;
    font-family: 'Fira Code', monospace;
    border-top: 1px dashed #334155;
    padding-top: 12px;
  }
  </style>