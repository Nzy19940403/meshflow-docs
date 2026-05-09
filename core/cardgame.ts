import { useScheduler, MeshPath } from "@meshflow/core";

export function useSolitaireModule<T, P extends MeshPath>(
    scheduler: ReturnType<typeof useScheduler<T, P>>,
    initialData: any 
) {
   
    // 1. 注册牌堆 (Stock) -> 返回 View
    const stockView = scheduler.registerNode({
        path: "game.stock" as P,
        type: "deck",
        state: { cards: initialData.stock },
        meta: { label: "发牌区", canClick: true,  }, 
        notifyKeys: new Set(["cards"]),
    }).createView(); 

    // 2. 注册 10 列牌阵 (Tableau) -> 返回 View 数组
    const tableauViews = Array.from({ length: 10 }).map((_, i) => {
 
        return scheduler.registerNode({
            path: `game.tableau.${i}` as P,
            type: "column",
            state: { cards: initialData.tableau[i] },
            meta: { columnIndex: i, title: `第 ${i + 1} 列`, dropZone: true ,cards: initialData.tableau[i]},
            notifyKeys: new Set(["cards"]), 
        }).createView();
    });

    // 3. 注册 8 个完成槽位 (Foundations) -> 返回 View 数组
    // const foundationViews = Array.from({ length: 8 }).map((_, i) => {
    //     return scheduler.registerNode({
    //         path: `game.foundation.${i}` as P,
    //         type: "foundation",
    //         state: { completedSuits: 0 }, 
    //         meta: { foundationIndex: i, targetSuit: null }, 
    //         notifyKeys: new Set(["completedSuits"]),
    //     }).createView();
    // });

    // 4. 注册全局状态 (Status) -> 返回 View
    const statusView = scheduler.registerNode({
        path: "game.status" as P,
        type: "status",
        state: { score: 500, moves: 0, isWin: false },
        meta: { showTimer: true },
        notifyKeys: new Set(["score", "moves", "isWin"]),
    }).createView();

    // ==========================================
    // 🌟 5. 新增：UI 意图接收中心 (Intent Node)
    // 这个虚拟节点就是我们力场架构的触发引擎 (Cause)
    // ==========================================
    const intentView = scheduler.registerNode({
        path: "game.intent" as P,
        type: "intent",
        // 初始状态定义好两个槽位：拖拽载荷 与 发牌时间戳
        state: { dragPayload: null, dealTrigger: 0 ,action:{}}, 
        meta: { description: "UI 操作信号接线员" },
        notifyKeys: new Set(["dragPayload", "dealTrigger","action"]),
    }).createView();

    // 🌟 重点在这里：将 intent 也 Return 出去，闭环完成！
    return {
        stock: stockView,
        tableaus: tableauViews,
        // foundations: foundationViews,
        status: statusView,
        intent: intentView // 👈 这里加上
    };
};



// initData.ts

// 1. 定义卡牌数据结构
export interface Card {
    id: string;        // 唯一ID，给 Vue 的 key 和引擎追踪用
    suit: number;      // 0: 黑桃♠, 1: 红桃♥, 2: 梅花♣, 3: 方块♦
    rank: number;      // 1 (A) 到 13 (K)
    isFaceUp: boolean; // 是否翻开（正面朝上）
  }
  
  // 2. 生成两副完整的扑克牌 (共104张)
  function generateDecks(): Card[] {
    const decks: Card[] = [];
    let idCounter = 0;
    
    // 循环两次，生成两副牌
    for (let deck = 0; deck < 2; deck++) {
      for (let suit = 0; suit < 4; suit++) { // 4种花色
        for (let rank = 1; rank <= 13; rank++) { // 13个点数
          decks.push({
            id: `card_${idCounter++}`,
            suit,
            rank,
            isFaceUp: false // 刚生成时全部背面朝上
          });
        }
      }
    }
    return decks;
  }
  
  // 3. 经典洗牌算法 (Fisher-Yates)
  function shuffle(array: Card[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // 4. 模拟游戏开局，分配卡牌
  function createInitialGameData() {
    // 洗好 104 张牌
    const allCards = shuffle(generateDecks());
    
    // 🌟 关键修改 1：桌面上的 10 个列，初始必须全是空数组 []
    // 只有这样，后续引擎把牌 push 进来时，Vue 才会触发飞入动画！
    const tableau: Card[][] = Array.from({ length: 10 }, () => []);
    
    // 🌟 关键修改 2：把洗好的 104 张牌，原封不动地全部放入发牌区 (Stock)
    const stock: Card[] = [...allCards];
    
    return {
      tableau, // 长这样: [ [], [], [], [], [], [], [], [], [], [] ] 
      stock    // 长这样: [ 104张牌 ]
    };
  }
  // 导出生成好的开局数据
  export const initData = createInitialGameData();