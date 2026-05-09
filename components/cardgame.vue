<template>
    <div class="solitaire-board" :data-tick="boardTick">
      <div class="control-panel">
        <div class="glass-buttons">
          <button class="action-btn" @click="undo" title="撤销 (Undo)">
             撤销
          </button>
          <button class="action-btn" @click="redo" title="重做 (Redo)">
            重做 
          </button>
          <div class="divider"></div>
          <button class="action-btn restart" @click="restartGame">重新开始</button>
        </div>
      </div>
      
      <div class="tableaus-area">
        <div 
          v-for="(col, colIndex) in tableaus" 
          :key="colIndex" 
          class="tableau-column"
          @dragover.prevent
          @drop="onDrop($event, colIndex)"
        >
          <div class="card-slot column-bg"></div>
          
          <TransitionGroup :name="isDealing ? 'deal-anim' : 'no-anim'">
            <div 
              v-for="(card, cardIndex) in col.state.cards" 
              :key="card.id"
              class="card"
              :class="[
                isRed(card.suit) ? 'red-suit' : 'black-suit',
                { 'not-draggable': card.isFaceUp && !checkCanDragSeq(col.state.cards, cardIndex) },
                { 'is-visually-dragging': isCardDragging(card.id) } /* ✨ 本地视觉隐身斗篷 */
              ]"
              :style="{ top: `${cardIndex * 24}px`, zIndex: cardIndex }"
              :draggable="card.isFaceUp && checkCanDragSeq(col.state.cards, cardIndex)"
              @dragstart="onDragStart($event, colIndex, cardIndex)"
              @dragend="onDragEnd"
            >
              <div class="card-inner" :class="{ 'is-flipped': !card.isFaceUp }">
                
                <div class="card-face card-front">
                  <div class="card-top-left">
                    <span class="rank">{{ getRankDisplay(card.rank) }}</span>
                    <span class="suit">{{ getSuitSymbol(card.suit) }}</span>
                  </div>
                </div>
                
                <div class="card-face card-back"></div>
              </div>
  
            </div>
          </TransitionGroup>
        </div>
      </div>
    
      <div class="footer-area">
        <div class="stock-pile" @click="handleDealClick">
          <div v-if="getStockCount() > 0" class="card stock-card" :class="{'is-dealing-stock': isDealing}">
            <div class="stock-text">发牌<br>({{ getStockCount() }})</div>
          </div>
       
        </div>
      </div>
    
      <div v-if="isGameWon" class="win-overlay">
        <div class="win-modal">
          <h1>🎉 恭喜通关！</h1>
          <p>你已经解开了这个死局。</p>
          <button class="retry-btn" @click="restartGame">再来一局</button>
        </div>
      </div>
    </div>
  </template>
    
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useMeshFlow, deleteEngine } from '@meshflow/core';
  import { useSolitaireModule ,initData} from '../core/cardgame'; 
 
  import { useLogger } from '@meshflow/logger';
  import { useHistory } from '@meshflow/history';
  
  const boardTick = ref(0);
  const isDealing = ref(false); 
  
  // ✨ 核心重构：纯本地的视觉拖拽状态（不进引擎，不进历史记录！）
  const activeDrag = ref<{
    sourceCol: number;
    cardIndex: number;
    movingCards: any[];
  } | null>(null);
  
  const engine = useMeshFlow('spider-solitaire', initData, {
    UITrigger: { 
      signalCreator: () => boardTick, 
      signalTrigger: (signal) => { signal.value++; } 
    },
    config: { useGreedy: true }, 
    modules: { solitaireModule: useSolitaireModule, useHistory:useHistory(200) } 
  });
  
  const { tableaus } = engine.modules.solitaireModule;
  const logger = useLogger();
  let cancel = engine.config.usePlugin(logger);
  
  const isGameWon = computed(() => {
    const allEmpty = tableaus.every(col => col.state.cards.length === 0);
    const stockEmpty = getStockCount() === 0;
    return allEmpty && stockEmpty && !isDealing.value;
  });
  
  const restartGame = () => { window.location.reload(); };
  
  const undo = () => { engine.modules.history.Undo(); };
  const redo = () => { engine.modules.history.Redo(); };
  
  // ==========================================
  // 1. 声明式物理力场 (Topology Logic)
  // ==========================================
  onMounted(() => {
    for (let i = 0; i < 10; i++) {
      const tableauPath = `game.tableau.${i}`;
  
      engine.config.useEntangle({
        cause: 'game.intent',
        impact: tableauPath,
        via: ['action'],
        emit: (cause, impact, propose) => {
          const { action } = cause.state;
          if (!action) return;
              
          // 🌊 分支 1：发牌逻辑
          if (action.type === 'deal_step') {
            if (action.step % 10 !== i || impact.state.lastProcessedStep === action.step) return;
  
            const stockData = engine.data.GetValue('game.stock', 'state');
            if (!stockData?.cards?.length) return;
  
            const nextCards = [...impact.state.cards];
            const limit = i < 4 ? 6 : 5;
            const shouldFaceUp = action.isInit ? (nextCards.length === limit - 1) : true;
            const newCard = { ...stockData.cards.slice(-1)[0], isFaceUp: shouldFaceUp };
  
            propose.set('cards', [...nextCards, newCard]);
            propose.set('lastProcessedStep', action.step);
            return;
          }
  
          // 🌊 分支 2：真正的物理放置 (Drag Success)
          if (action.type === 'drag_success') {
            if (impact.state.lastProcessedDragId === action._t) return;
  
            if (i === action.targetCol) {
              propose.set('cards', [...impact.state.cards, ...action.movingCards]);
              propose.set('lastProcessedDragId', action._t); 
            } else if (i === action.sourceCol) {
              const nextCards = [...impact.state.cards];
              nextCards.splice(action.cardIndex);
              if (nextCards.length > 0) {
                const lastIdx = nextCards.length - 1;
                nextCards[lastIdx] = { ...nextCards[lastIdx], isFaceUp: true };
              }
              propose.set('cards', nextCards);
              propose.set('lastProcessedDragId', action._t); 
            }
            return;
          }
  
          if (impact.state.lastProcessedStep !== -1) {
            propose.set('lastProcessedStep', -1);
          }
        }
      });
  
      engine.config.useEntangle({
        cause: tableauPath,
        impact: 'game.intent',
        via: ['lastProcessedStep'],
        filter: () => isDealing.value,
        emit: async (cause, impact, propose) => {
          const action = impact.state.action;
          if (action?.type !== 'deal_step' || cause.state.lastProcessedStep !== action.step) return;
  
          const nextStep = action.step + 1;
          if (nextStep < action.maxSteps) {
            await new Promise(r => setTimeout(r, 40));
            propose.set('action', { ...action, step: nextStep, _t: Date.now() });
          } else {
            await new Promise(r => setTimeout(r, 100));
            isDealing.value = false;
            propose.set('action', { type: 'idle', step: -1 });
          }
        }
      });
    }
  
    engine.config.useEntangle({
      cause: 'game.intent',
      impact: 'game.stock',
      via: ['action'],
      filter: (cause) => cause.state.action?.type === 'deal_step',
      emit: (cause, impact, propose) => {
        const currentStock = impact.state.cards;
        if (currentStock.length > 0) propose.set('cards', currentStock.slice(0, -1));
      }
    });
  
  
    isDealing.value = true;
    engine.data.SetValue('game.intent', 'action', { 
      type: 'deal_step', step: 0, maxSteps: 54, isInit: true 
    });
  });
  
  // ==========================================
  // 2. 控制器与交互 (User Actions)
  // ==========================================
  
  const handleDealClick = () => {
    if (isDealing.value || getStockCount() < 10) return;
    isDealing.value = true;
    if(getStockCount() === 104){
        engine.data.SetValue('game.intent', 'action', { 
            type: 'deal_step', step: 0, maxSteps: 54, isInit: true 
        });
        return;
    }
    engine.data.SetValue('game.intent', 'action', { 
      type: 'deal_step', step: 0, maxSteps: 10, isInit: false 
    });
  };
  
  const onDragStart = (event: DragEvent, colIndex: number, cardIndex: number) => {
    const state = engine.data.GetValue(`game.tableau.${colIndex}`, 'state');
    if (!checkCanDragSeq(state.cards, cardIndex)) { event.preventDefault(); return; }
  
    const movingCards = state.cards.slice(cardIndex);
  
    event.dataTransfer?.setData('text/plain', 'card');
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  
    const ghost = createGhostElement(movingCards);
    document.body.appendChild(ghost);
    event.dataTransfer?.setDragImage(ghost, 40, 20);
 
  
    setTimeout(() => {
    document.body.removeChild(ghost)
      activeDrag.value = {
        sourceCol: colIndex,
        cardIndex: cardIndex,
        movingCards: JSON.parse(JSON.stringify(movingCards))
      };
    }, 0);
  };
  
  const onDrop = (event: any, targetColIndex: number) => {
    if (!activeDrag.value) return; 
    
    const { sourceCol, cardIndex, movingCards } = activeDrag.value;
    const targetState = engine.data.GetValue(`game.tableau.${targetColIndex}`, 'state');
  
    const canDrop = sourceCol !== targetColIndex && 
                   (targetState.cards.length === 0 || targetState.cards.slice(-1)[0].rank === movingCards[0].rank + 1);
                   
    if (canDrop) {
      engine.data.SetValue('game.intent', 'action', {
        type: 'drag_success', 
        sourceCol: sourceCol,
        targetCol: targetColIndex, 
        cardIndex: cardIndex,
        movingCards: movingCards,
        _t: Date.now() 
      });
    }
  };
  
  const onDragEnd = () => { 
    activeDrag.value = null; 
  };
  
  // ==========================================
  // 3. 辅助函数
  // ==========================================
  const isCardDragging = (cardId: string) => {
    if (!activeDrag.value) return false;
    return activeDrag.value.movingCards.some(c => c.id === cardId);
  };
  
  const getStockCount = () => engine.data.GetValue('game.stock', 'state')?.cards.length || 0;
  const getSuitSymbol = (suit: number) => ['♠', '♥', '♣', '♦'][suit] || '';
  const isRed = (suit: number) => suit === 1 || suit === 3;
  const getRankDisplay = (rank: number) => {
    if (rank === 1) return 'A'; if (rank === 11) return 'J';
    if (rank === 12) return 'Q'; if (rank === 13) return 'K';
    return rank.toString();
  };
  const checkCanDragSeq = (cards: any[], start: number) => {
    for (let i = start; i < cards.length - 1; i++) {
      if (cards[i].suit !== cards[i + 1].suit || cards[i].rank !== cards[i + 1].rank + 1) return false;
    }
    return true;
  };
  const createGhostElement = (cards: any[]) => {
    const container = document.createElement('div');
    container.style.cssText = "position:absolute; top:-9999px; pointer-events:none; z-index:9999;";
    cards.forEach((card, idx) => {
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;top:${idx*24}px;width:80px;height:112px;background:#fff;border:1px solid #ccc;border-radius:6px;box-shadow:0 5px 15px rgba(0,0,0,0.5);padding:6px;box-sizing:border-box;font-family:Arial;color:${isRed(card.suit)?'#e74c3c':'#2c3e50'};display:flex;flex-direction:column;align-items:center;font-weight:bold;font-size:16px;`;
      el.innerHTML = `<span>${getRankDisplay(card.rank)}</span><span>${getSuitSymbol(card.suit)}</span>`;
      container.appendChild(el);
    });
    return container;
  };
  
  onUnmounted(() => deleteEngine('spider-solitaire'));
  </script>
    
  <style scoped>
  .solitaire-board { 
    position: relative; width: 100%; min-height: 100vh; background-color: #0c6126; 
    padding: 80px 20px 20px; box-sizing: border-box; overflow: hidden;
  }
  
  /* =========================================
     ✨ 顶部控制台：磨砂玻璃风格 (Glassmorphism)
  ========================================= */
  .control-panel {
    position: absolute; top: 20px; left: 50%; transform: translateX(-50%); z-index: 2000;
  }
  .glass-buttons {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px);
    padding: 8px 16px; border-radius: 30px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  .action-btn {
    background: transparent; color: white; border: none; font-size: 14px; font-weight: bold;
    cursor: pointer; padding: 8px 12px; border-radius: 20px; transition: all 0.2s ease;
    display: flex; align-items: center; gap: 6px;
  }
  .action-btn:hover { background: rgba(255, 255, 255, 0.2); transform: translateY(-1px); }
  .action-btn:active { transform: translateY(1px); }
  .action-btn.restart { color: #f1c40f; }
  .divider { width: 1px; height: 20px; background: rgba(255,255,255,0.3); margin: 0 5px; }
  
  
  /* =========================================
     布局与原始卡牌区域
  ========================================= */
  .footer-area { position: absolute; bottom: 240px; left: 240px; z-index: 1000; }
  .stock-pile { cursor: pointer; }
  .tableaus-area { display: flex; justify-content: center; gap: 12px; margin-top: 20px; }
  .card-slot { width: 80px; height: 112px; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 6px; }
  
  /* 确保卡牌父容器（列）有 3D 视距，不然翻转看起来是扁平的 */
  .tableau-column { 
    position: relative; 
    width: 80px; 
    min-height: 500px; 
    perspective: 1000px;  
  }
  
  /* =========================================
     ✨ 全新纯 CSS 3D 卡牌样式
  ========================================= */
  
  /* 外层容器：只负责排版、阴影和上下移动动画 */
  .card { 
    position: absolute; width: 80px; height: 112px; border-radius: 6px; 
    box-shadow: 0 1px 3px rgba(0,0,0,0.4); 
    transition: top 0.3s ease-out, opacity 0.2s ease; 
    perspective: 1000px; 
    background: transparent;
  }
  
  /* 发牌区牌堆：独立样式，不受 3D 翻转干扰 */
  .stock-card { 
    width: 80px; height: 112px; display: flex; align-items: center; justify-content: center; 
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5); 
    background: repeating-linear-gradient(45deg, #2980b9, #2980b9 5px, #3498db 5px, #3498db 10px); 
    border: 2px solid #fff; border-radius: 6px;
  }
  
  /* 内部 3D 翻转器 */
  .card-inner {
    position: relative; width: 100%; height: 100%;
    transform-style: preserve-3d;
    /* 只有这个 DOM 存活时，它的 class 发生变化，才会执行翻转！避免了拖拽重绘闪烁 */
    transition: transform 0.4s ease-out; 
  }
  
  /* 翻转状态：转 180 度露出背面 */
  .is-flipped {
    transform: rotateY(180deg);
  }
  
  /* 正反面通用约束 */
  .card-face {
    position: absolute; width: 100%; height: 100%;
    backface-visibility: hidden; /* 背对屏幕时隐身 */
    border-radius: 6px; box-sizing: border-box;
  }
  
  /* 你原版完美的正面样式 */
  .card-front { 
    background-color: #fff; border: 1px solid #ccc; 
    display: flex; padding: 6px; 
  }
  
  /* 你原版完美的背面样式 */
  .card-back { 
    background: repeating-linear-gradient(45deg, #2980b9, #2980b9 5px, #3498db 5px, #3498db 10px); 
    border: 2px solid #fff; 
    transform: rotateY(180deg); /* 初始就让它背对前方，配合 is-flipped 完美闭环 */
  }
  
  
  /* =========================================
     动画与其它细节
  ========================================= */
  .no-anim-move, 
  .no-anim-enter-active, 
  .no-anim-leave-active { 
    transition: none !important; 
    animation: none !important;
  }
  
  .deal-anim-enter-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .deal-anim-enter-from {
    opacity: 0;
    transform: translate(-30vw, 50vh) rotate(-120deg) scale(0.5);
  }
  .deal-anim-enter-to { opacity: 1; transform: translate(0, 0) rotate(0) scale(1); }
  
  .red-suit { color: #e74c3c; }
  .black-suit { color: #2c3e50; }
  .card-top-left { display: flex; flex-direction: column; align-items: center; font-weight: bold; font-size: 16px; line-height: 1; }
  
  .win-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    color: #e74c3c;
    background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;
  }
  .win-modal {
    background: white; padding: 40px; border-radius: 12px; text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  .retry-btn {
    margin-top: 20px; padding: 12px 30px; font-size: 18px; 
    background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer;
  }
  .retry-btn:hover { background: #2ecc71; }
  .is-visually-dragging {
    opacity: 0 !important;
    pointer-events: none;
  }
  </style>