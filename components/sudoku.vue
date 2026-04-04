<template>
    <div class="dashboard-wrapper">
      <div class="control-panel">
        <div class="mode-selector">
          <div class="selector-label"> {{ isEn ? 'Strategy:' : '解题策略：'}}</div>
          <div class="radio-group">
            <label :class="['radio-item', { active: layoutMode === 'oscillation' }]">
              <input type="radio" v-model="layoutMode" value="oscillation" />
              <span class="radio-dot"></span>
              <span class="text">{{ isEn ? 'Constraint Collapse' : '约束坍缩'}}</span>
            </label>
          </div>
        </div>
        <div class="controls">
          <button class="replay-btn" @click="replay">
            <span class="icon">⚡</span> {{ isEn ? 'Re-Collapse' : '坍缩重放'}}
          </button>
          <button class="reset-btn" @click="reset">
            <span class="icon">↻</span> {{ isEn ? 'Zero-State Deduction' : '清空棋盘'}}
          </button>
        </div>
      </div>
  
      <div class="playground" @click="selectedCell = null">
        <div class="status-toast-container" :class="{ visible: gameStatus !== 'playing' }">
          <div class="status-toast" :class="gameStatus">
 
            <span class="toast-msg">
              {{
                gameStatus === "solved"
                  ? (isEn ? "Constraints converged!" : "物理约束已收敛，全盘坍缩完成！")
                  : (isEn ? "Topological deadlock!" : "拓扑网络死锁，请根据案发现场排查！")
              }}
            </span>
 
          </div>
        </div>
  
        <div class="playground-canvas">
          <div class="sudoku-board">
            <div
              v-for="cell in CellArray"
              :key="cell.path"
              class="cell"
              :class="{
                'has-value': cell.value !== null,
                'border-r': cell.col % 3 === 2 && cell.col !== 8,
                'border-b': cell.row % 3 === 2 && cell.row !== 8,
                'is-selected': selectedCell?.path === cell.path,
                'is-dead-end': deadEndCells.includes(cell.path),
                'is-suspect': suspectCells.includes(cell.path),
              }"
              :style="{
                '--trigger': cell.dirtySignal.value,
                position: 'absolute',
                top: '0',
                left: '0',
                /* 🌟 核心修改 1：绝对的百分比宽高，100/9 */
                width: '11.1111%',
                height: '11.1111%',
                /* 🌟 核心修改 2：100% 相对的是自身宽度，完美平移 */
                transform: `translate(calc(${cell.col} * 100%), calc(${cell.row} * 100%))`,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }"
            >
              <div v-if="cell.value !== null" class="final-value">
                {{ cell.value }}
              </div>
              <div v-else class="candidates-grid" :style="{ opacity: cell.candidates.length < 9 ? 1 : 0.1 }">
                <span v-for="n in 9" :key="n" :class="['c-num', { hidden: !cell.candidates.includes(n) }]">
                  {{ n }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, onUnmounted, nextTick, computed } from "vue";
  import { useMeshFlow, deleteEngine } from "@meshflow/core";
  import { useSudokuLayout } from "../core/useSudokuLayout";
  // import { useLogger } from "@/utils/plugins/logger/useLogger";
  
  // ==========================================================
  // 🚀 终极维度控制器
  // ==========================================================
  const GRID_SIZE: number = 9; 
  const SUB_SIZE = Math.sqrt(GRID_SIZE); 
  const ALL_NUMS = Array.from({ length: GRID_SIZE }, (_, i) => i + 1); 
  
  const layoutMode = ref("oscillation");
  const selectedCell = ref<any>(null);
  const editInputValue = ref<number | "">("");
  const inputRef = ref<HTMLInputElement | null>(null);
  
  const isDeadlocked = ref(false);
  const deadEndCells = ref<string[]>([]);
  const suspectCells = ref<string[]>([]);
  const gameStatus = ref<'playing' | 'solved' | 'failed'>('playing'); 
  
  // 🌟 版本控制器 (Decision Level)
  const currentLevel = ref(0); 
  // 记录每一层做了什么猜测： level -> { path, val }
  const levelGuesses = ref<Record<number, { path: string, val: number }>>({});
  
   
  
  // 👇 就是漏了下面这三行，把它们加回来！
  const CELL_PX = GRID_SIZE === 16 ? 40 : 56; 
  const CELL_GAP = GRID_SIZE === 16 ? 42 : 58; 
  const BOARD_PX = GRID_SIZE * CELL_GAP; 
  
  const props = defineProps<{
  name: string;
  }>();
 
  const isEn = computed(() => props.name === "en");
   
  
  const handleCellClick = async (cell: any) => {
    selectedCell.value = cell;
    editInputValue.value = cell.value !== null ? cell.value : "";
    await nextTick();
    if (inputRef.value) inputRef.value.focus();
  };
  
  const applyEdit = () => {
    if (!selectedCell.value) return;
    const path = selectedCell.value.path;
    const val = editInputValue.value;
  
    if (val === 0 || val === "") {
      engine.data.SetValues([
        { path, key: "value", value: null },
        { path, key: "isGiven", value: false },
        { path, key: "version", value: -1 }
      ]);
    } else if (typeof val === "number" && val >= 1 && val <= GRID_SIZE) {
      engine.data.SetValues([
        { path, key: "value", value: val },
        { path, key: "isGiven", value: true },
        { path, key: "version", value: 0 } // 手动注入的算作原住民 (v0)
      ]);
    }
  
    isDeadlocked.value = false;
    deadEndCells.value = [];
    suspectCells.value = [];
    gameStatus.value = 'playing';
    selectedCell.value = null;
  };
  
  // 🚀 注入引擎
  const { data, useSudokuModule } = useSudokuLayout(GRID_SIZE);
  const engine = useMeshFlow("sudoku_engine", data, {
    UITrigger: { signalCreator: () => ref(0), signalTrigger: (signal) => signal.value++ },
    config: { useGreedy: true },
    modules: { useSudokuModule },
  });
  
 

  // const logger = useLogger();
  // engine.config.usePlugin(logger);
  
  const { CellArray, judgementNode } = engine.modules.sudokuModule;
  
  // ==========================================================
  // 🎮 棋盘控制方法 (已恢复并适配 Version)
  // ==========================================================
  const startSolving = () => {
    isDeadlocked.value = false;
    deadEndCells.value = [];
    suspectCells.value = [];
    gameStatus.value = 'playing';
    currentLevel.value = 0;
    levelGuesses.value = {};
  
    let puzzle  = [
      { r: 0, c: 0, v: 5 }, { r: 0, c: 1, v: 3 }, { r: 0, c: 4, v: 7 },
      { r: 1, c: 0, v: 6 }, { r: 1, c: 3, v: 1 }, { r: 1, c: 4, v: 9 }, { r: 1, c: 5, v: 5 },
      { r: 2, c: 1, v: 9 }, { r: 2, c: 2, v: 8 }, { r: 2, c: 7, v: 6 },
      { r: 3, c: 0, v: 8 }, { r: 3, c: 4, v: 6 }, { r: 3, c: 8, v: 3 },
      { r: 4, c: 0, v: 4 }, { r: 4, c: 3, v: 8 }, { r: 4, c: 5, v: 3 }, { r: 4, c: 8, v: 1 },
      { r: 5, c: 0, v: 7 }, { r: 5, c: 4, v: 2 }, { r: 5, c: 8, v: 6 },
      { r: 6, c: 1, v: 6 }, { r: 6, c: 6, v: 2 }, { r: 6, c: 7, v: 8 },
      { r: 7, c: 3, v: 4 }, { r: 7, c: 4, v: 1 }, { r: 7, c: 5, v: 9 }, { r: 7, c: 8, v: 5 },
      { r: 8, c: 4, v: 8 }, { r: 8, c: 7, v: 7 }, { r: 8, c: 8, v: 9 },
    ];
  
    let res: any[] = [];
    CellArray.forEach((c) => {
      res.push({ path: c.path, key: "version", value: -1 });
      res.push({ path: c.path, key: "banned", value: [] });
    });
  
    puzzle.forEach((p) => {
      res.push({ path: `cell_${p.r * GRID_SIZE + p.c}`, key: "value", value: p.v });
      res.push({ path: `cell_${p.r * GRID_SIZE + p.c}`, key: "isGiven", value: true });
      res.push({ path: `cell_${p.r * GRID_SIZE + p.c}`, key: "version", value: 0 }); 
    });
    engine.data.SetValues(res);
  };
  
  const reset = () => {
    isDeadlocked.value = false;
    deadEndCells.value = [];
    suspectCells.value = [];
    gameStatus.value = 'playing';
    selectedCell.value = null; 
    currentLevel.value = 0;
    levelGuesses.value = {};
  
    let res: any[] = [];
    CellArray.forEach((c) => {
      res.push({ path: c.path, key: "value", value: null });
      res.push({ path: c.path, key: "candidates", value: [...ALL_NUMS] }); 
      res.push({ path: c.path, key: "forbidden", value: {} });
      res.push({ path: c.path, key: "neighbors", value: {} });
      res.push({ path: c.path, key: "banned", value: [] });
      res.push({ path: c.path, key: "isGiven", value: false });
      res.push({ path: c.path, key: "version", value: -1 }); // 重置版本
    });
    engine.data.SetValues(res);
  };
  
  const replay = () => {
    isDeadlocked.value = false;
    deadEndCells.value = [];
    suspectCells.value = [];
    gameStatus.value = 'playing';
    currentLevel.value = 0;
    levelGuesses.value = {};
  
    let res: any[] = [];
    CellArray.forEach((c) => {
      if (!c.isGiven) {
        res.push({ path: c.path, key: "value", value: null });
        res.push({ path: c.path, key: "banned", value: [] });
        res.push({ path: c.path, key: "candidates", value: [...ALL_NUMS] }); 
        res.push({ path: c.path, key: "version", value: -1 }); // 清除非给定格子的版本
      }
    });
    engine.data.SetValues(res);
  };
  
  // ==========================================================
  // 🚀 引擎推演规则 (Propagator)
  // ==========================================================
  const setupSudokuEntangle = () => {
    const sharedDistRow = Object.create(null);
    const sharedDistCol = Object.create(null);
    const sharedDistBox = Object.create(null);
  
    CellArray.forEach((cell) => {
      const myNeighbors = CellArray.filter(
        (c) => c.path !== cell.path && (c.row === cell.row || c.col === cell.col || c.box === cell.box)
      );
  
      // 邻居互斥更新
      myNeighbors.forEach((neighbor) => {
        engine.config.useEntangle({
          cause: neighbor.path,
          impact: cell.path,
          via: ["value"],
          emit: async(causeState, impactState, propose) => {
            const prevValue = impactState.state.neighbors?.[causeState.path];
            const newValue = causeState.state.value;
            if (prevValue === newValue) return;
            // await new Promise<void>((resolve)=>setTimeout(() => {
            //   resolve()
            // }, 30));
            propose.patch("forbidden", (oldForbidden: any) => {
              const next = { ...(oldForbidden || {}) };
              if (prevValue !== null && prevValue !== undefined) {
                next[prevValue] = Math.max(0, (next[prevValue] || 0) - 1);
                if (next[prevValue] === 0) delete next[prevValue];
              }
              if (newValue !== null && newValue !== undefined) {
                next[newValue] = (next[newValue] || 0) + 1;
              }
              return next;
            });
            propose.patch("neighbors", (oldNeighbors) => ({ ...oldNeighbors, [causeState.path]: newValue }));
          }
        });
      });
  
      // 计算可用候选数
      engine.config.useEntangle({
        cause: cell.path,
        impact: cell.path,
        via: ["forbidden", "banned"],
        filter: (causeState, impactState) => impactState.state.value === null,
        emit: async(causeState, impactState, propose) => {
          if (!causeState.state.forbidden) return;
          const banned = causeState.state.banned || [];
          const forbidden = causeState.state.forbidden;
          const validCands: number[] = [];
          for (let v = 1; v <= GRID_SIZE; v++) {
            if ((!forbidden[v] || forbidden[v] === 0) && banned.indexOf(v) === -1) validCands.push(v);
          }
          await new Promise<void>((resolve)=>setTimeout(() => {
            resolve()
          }, 30));
          const oldCands = impactState.state.candidates || [];
          let isSame = oldCands.length === validCands.length;
          if (isSame) {
            for (let i = 0; i < validCands.length; i++) {
              if (oldCands[i] !== validCands[i]) { isSame = false; break; }
            }
          }
          if (!isSame) propose.set("candidates", validCands);
        }
      });
  
      // 🌟 唯一候选数自动落子 (附带版本号血缘继承)
      engine.config.useEntangle({
        cause: cell.path,
        impact: cell.path,
        via: ["candidates"],
        filter: (causeState, impactState) => {
          if (impactState.state.value !== null) return false;
          if (causeState.state.candidates.length !== 1) return false;
          return (impactState.state.banned || []).indexOf(causeState.state.candidates[0]) === -1;
        },
        emit: async (causeState, impactState, propose) => {
          // await new Promise<void>((resolve)=>setTimeout(() => {
          //   resolve()
          // }, 30));
          propose.set("value", causeState.state.candidates[0]);
          propose.set("version", currentLevel.value); // 继承当前最高的世界线版本号
        },
      });
  
      // 全局 CellMap 维护
      engine.config.useEntangle({
        cause: cell.path,
        impact: judgementNode.path,
        via: ["forbidden", "value"],
        emit:async (causeState, impactState, propose) => {
          // await new Promise<void>((resolve)=>setTimeout(() => {
          //   resolve()
          // }, 30));
          propose.update("cellMap", {
            [causeState.path]: {
              path: causeState.path,
              row: causeState.state.row,
              col: causeState.state.col,
              box: causeState.state.box,
              value: causeState.state.value,
              forbidden: { ...causeState.state.forbidden },
              banned: [...(causeState.state.banned || [])],
              isGiven: causeState.state.isGiven || false,
            }
          }, "merge");
        }
      });
  
      // 极速全局分布与区块推演
      engine.config.useEntangle({
        cause: judgementNode.path,
        impact: judgementNode.path,
        via: ["cellMap"],
        emit: (causeState, impactState, propose) => {
          const uniqueDist: any = {};
          const pointingPairs:any = [];
          const cellMap = causeState.state.cellMap || {};
  
          for (const r in sharedDistRow) for (const n in sharedDistRow[r]) sharedDistRow[r][n].length = 0;
          for (const c in sharedDistCol) for (const n in sharedDistCol[c]) sharedDistCol[c][n].length = 0;
          for (const b in sharedDistBox) for (const n in sharedDistBox[b]) sharedDistBox[b][n].length = 0;
  
          for (const path in cellMap) {
            const c = cellMap[path];
            if (c.value !== null) continue;
            const forbidden = c.forbidden || {};
            const banned = c.banned || [];
  
            for (let num = 1; num <= GRID_SIZE; num++) {
              if ((!forbidden[num] || forbidden[num] === 0) && banned.indexOf(num) === -1) {
                if (!sharedDistRow[c.row]) sharedDistRow[c.row] = Object.create(null);
                if (!sharedDistRow[c.row][num]) sharedDistRow[c.row][num] = [];
                sharedDistRow[c.row][num].push(c);
  
                if (!sharedDistCol[c.col]) sharedDistCol[c.col] = Object.create(null);
                if (!sharedDistCol[c.col][num]) sharedDistCol[c.col][num] = [];
                sharedDistCol[c.col][num].push(c);
  
                if (!sharedDistBox[c.box]) sharedDistBox[c.box] = Object.create(null);
                if (!sharedDistBox[c.box][num]) sharedDistBox[c.box][num] = [];
                sharedDistBox[c.box][num].push(c);
              }
            }
          }
  
          for (let i = 0; i < GRID_SIZE; i++) {
            for (let num = 1; num <= GRID_SIZE; num++) {
              if (sharedDistRow[i] && sharedDistRow[i][num] && sharedDistRow[i][num].length === 1) uniqueDist[`r_${i}_n_${num}`] = sharedDistRow[i][num][0].path;
              if (sharedDistCol[i] && sharedDistCol[i][num] && sharedDistCol[i][num].length === 1) uniqueDist[`c_${i}_n_${num}`] = sharedDistCol[i][num][0].path;
              if (sharedDistBox[i] && sharedDistBox[i][num] && sharedDistBox[i][num].length === 1) uniqueDist[`b_${i}_n_${num}`] = sharedDistBox[i][num][0].path;
            }
          }
  
          for (let b = 0; b < GRID_SIZE; b++) {
            for (let num = 1; num <= GRID_SIZE; num++) {
              if (!sharedDistBox[b] || !sharedDistBox[b][num]) continue;
              const cells = sharedDistBox[b][num];
              if (cells.length > 1 && cells.length <= SUB_SIZE) {
                let isSameRow = true, isSameCol = true;
                const firstRow = cells[0].row, firstCol = cells[0].col;
                for (let k = 1; k < cells.length; k++) {
                  if (cells[k].row !== firstRow) isSameRow = false;
                  if (cells[k].col !== firstCol) isSameCol = false;
                }
                if (isSameRow) pointingPairs.push({ type: "row", index: firstRow, num: num, excludeBox: b });
                if (isSameCol) pointingPairs.push({ type: "col", index: firstCol, num: num, excludeBox: b });
              }
            }
          }
          propose.set("globalDistribution", { unique: uniqueDist, pointing: pointingPairs, cellMap: cellMap });
        }
      });
  
      // 🌟 唯一分布落子 (附带版本号血缘继承)
      engine.config.useEntangle({
        cause: judgementNode.path,
        impact: cell.path,
        via: ["globalDistribution"],
        filter: (causeState, impactState) => impactState.state.value === null,
        emit: (causeState, impactState, propose) => {
          const { unique, cellMap } = causeState.state.globalDistribution || {};
          if (!unique || !cellMap) return;
  
          for (let num = 1; num <= GRID_SIZE; num++) {
            if (
              unique[`r_${impactState.state.row}_n_${num}`] === impactState.path ||
              unique[`c_${impactState.state.col}_n_${num}`] === impactState.path ||
              unique[`b_${impactState.state.box}_n_${num}`] === impactState.path
            ) {
              if (!impactState.state.candidates.includes(num)) continue;
              if ((impactState.state.banned || []).includes(num)) continue;
              if (impactState.state.forbidden && (impactState.state.forbidden[num] || 0) > 0) continue;
  
              let isPhysicallyValid = true;
              for (const otherPath in cellMap) {
                const otherCell = cellMap[otherPath];
                if (otherCell.path === impactState.path) continue;
                if ((otherCell.row === impactState.state.row || otherCell.col === impactState.state.col || otherCell.box === impactState.state.box) && otherCell.value === num) {
                  isPhysicallyValid = false; break;
                }
              }
  
              if (isPhysicallyValid) {
                propose.set("value", num);
                propose.set("version", currentLevel.value); 
                return; 
              }
            }
          }
        },
      });
  
      engine.config.useEntangle({
        cause: judgementNode.path,
        impact: cell.path,
        via: ["globalDistribution"],
        filter: (causeState, impactState) => impactState.state.value === null,
        emit: (causeState, impactState, propose) => {
          const { pointing } = causeState.state.globalDistribution || {};
          if (!pointing || pointing.length === 0) return;
  
          const oldCands = impactState.state.candidates;
          const toRemove = new Set();
          for (let i = 0; i < pointing.length; i++) {
            const rule = pointing[i];
            if (((rule.type === "row" && impactState.state.row === rule.index) || (rule.type === "col" && impactState.state.col === rule.index)) && impactState.state.box !== rule.excludeBox) {
              toRemove.add(rule.num);
            }
          }
          if (toRemove.size > 0) {
            const newCands:any = [];
            let changed = false;
            for (let i = 0; i < oldCands.length; i++) {
              if (!toRemove.has(oldCands[i])) newCands.push(oldCands[i]);
              else changed = true;
            }
            if (changed) propose.set("candidates", newCands);
          }
        },
      });
    });
  };
  
  setupSudokuEntangle();
  engine.config.notifyAll();
  
  // ==========================================================
  // 🧠 外部决策器 (负责快照、精准追杀、以及抛出UI死锁状态)
  // ==========================================================
  engine.hooks.onSuccess( async () => {
    const emptyCells = CellArray.filter((c) => c.value === null);
    
    await new Promise<void>((resolve)=>setTimeout(() => {
            resolve()
          }, 30));
    if (emptyCells.length === 0) {
      gameStatus.value = 'solved';
      isDeadlocked.value = false;
      deadEndCells.value = [];
      suspectCells.value = [];
      console.log("求解成功！");
      console.log(CellArray.map(item=>item.value))
      return;
    }
  
    // 检测死局：是否有空格子的候选数为 0
    const deadCells = emptyCells.filter(c => c.candidates.length === 0);
  
    if (deadCells.length > 0) {
      // 🚑 发生死局！
      // 如果已经退回到了第 0 层（意味着所有的尝试和推断全错），说明题目彻底无解
      if (currentLevel.value === 0) {
        gameStatus.value = 'failed';
        isDeadlocked.value = true;
        deadEndCells.value = deadCells.map(c => c.path);
  
        // 恢复你最喜欢的 UI 功能：红框显示罪魁祸首！
        const suspects = new Set<string>();
        deadCells.forEach(dead => {
          CellArray.forEach(c => {
            if (c.value !== null && !c.isGiven) {
              const isNeighbor = c.row === dead.row || c.col === dead.col || c.box === dead.box;
              if (isNeighbor) suspects.add(c.path);
            }
          });
        });
        suspectCells.value = Array.from(suspects);
        console.log("此题无解！");
        return;
      }
  
      // ======================================
      // 启动“外科手术式”回滚
      // ======================================
      const badLevel = currentLevel.value;
      const updates: any[] = [];
  
      // 1. 诛灭九族：找到所有属于这个版本的格子
      CellArray.forEach(c => {
        if (c.version >= badLevel) {
          // 清除它们的值、版本和黑历史，让它们彻底变回无知状态
          updates.push({ path: c.path, key: "value", value: null });
          updates.push({ path: c.path, key: "version", value: -1 });
          updates.push({ path: c.path, key: "banned", value: [] }); 
        }
      });
  
      // 2. 罪魁祸首拉黑
      const badGuess = levelGuesses.value[badLevel];
      if (badGuess) {
        const targetCell = CellArray.find(c => c.path === badGuess.path);
        // 给原罪格子打上永久的思想钢印
        updates.push({ 
          path: badGuess.path, 
          key: "banned", 
          value: [...(targetCell?.banned || []), badGuess.val] 
        });
        delete levelGuesses.value[badLevel];
      }
  
      // 3. 时光倒流
      currentLevel.value--;
      
      // 4. 重置盘面，交由引擎重新推演
      engine.data.SetValues(updates);
      return;
    }
  
    // 🎲 正常推进：找一个最有希望的格子做一次新的猜想
    emptyCells.sort((a, b) => a.candidates.length - b.candidates.length);
    const targetCell = emptyCells[0];
  
    currentLevel.value++;
    
    const randomIndex = Math.floor(Math.random() * targetCell.candidates.length);
    const guessValue = targetCell.candidates[randomIndex];
    levelGuesses.value[currentLevel.value] = { path: targetCell.path, val: guessValue };
  
    engine.data.SetValues([
      { path: targetCell.path, key: "value", value: guessValue },
      { path: targetCell.path, key: "version", value: currentLevel.value }
    ]);
  });
  
  onMounted(() => startSolving());
  onUnmounted(() => deleteEngine("sudoku_engine"));
  </script>
  
  <style scoped>
  .dashboard-wrapper {
    background: #0d1117;
    border: 1px solid var(--vp-c-divider, rgba(255, 255, 255, 0.1));
    border-radius: 12px;
    overflow: hidden;
    margin: 24px 0;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    font-family: sans-serif;
  }
  .control-panel {
    padding: 16px 24px;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .controls {
    display: flex;
    gap: 12px;
  }
  .reset-btn {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 6px 16px;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .reset-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .mode-selector {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .selector-label {
    color: #888;
    font-size: 13px;
  }
  .radio-group {
    display: flex;
    gap: 10px;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .radio-item {
    cursor: pointer;
    padding: 6px 16px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
  }
  .radio-item input {
    display: none;
  }
  .radio-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #444;
    transition: all 0.3s;
  }
  .radio-item .text {
    font-size: 12px;
    transition: all 0.3s;
  }
  .radio-item.active {
    background: rgba(24, 144, 255, 0.15);
  }
  .radio-item.active:first-child .radio-dot {
    background: #1890ff;
    box-shadow: 0 0 8px #1890ff;
  }
  .radio-item.active:first-child .text {
    color: #fff;
    font-weight: bold;
  }
  
  /* 🌟 修改点 3：外层容器清理定宽定高，改为弹性流式布局 */
  .playground {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* 🌟 修改点 4：留出空间给顶部的 Toast 弹窗 */
  .playground-canvas {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 90px 16px 40px; /* 顶部留 90px 防遮挡，左右留 16px 边距 */
    box-sizing: border-box;
  }
  
  /* 🌟 修改点 5：棋盘容器改为 aspect-ratio 1/1 完美正方形 */
  .sudoku-board {
    position: relative;
    width: 100%;
    max-width: 520px; /* PC 端最大不超过 520px */
    aspect-ratio: 1 / 1; /* 强制保持正方形 */
    background: #1a1e24;
    border: 2px solid #40a9ff;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(24, 144, 255, 0.15);
  }
  
  .cell {
    background: linear-gradient(135deg, #2b323b 0%, #1a1e24 100%);
    border: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 4px;
    box-sizing: border-box; /* 必须加，确保边框不撑开百分比 */
    cursor: pointer;
  }
  .cell:hover {
    box-shadow: inset 0 0 10px rgba(24, 144, 255, 0.3);
  }
  .cell.is-selected {
    box-shadow: inset 0 0 15px rgba(255, 170, 0, 0.6);
    border-color: #ffaa00;
    z-index: 30;
  }
  .cell.border-r {
    border-right: 2px solid #40a9ff;
  }
  .cell.border-b {
    border-bottom: 2px solid #40a9ff;
  }
  .cell.has-value {
    background: rgba(24, 144, 255, 0.1);
    border-color: rgba(24, 144, 255, 0.3);
  }
  
  /* 🌟 修改点 6：字体随容器宽度流式缩放 */
  .final-value {
    font-size: clamp(16px, 6vw, 28px);
    font-weight: 800;
    color: #00e5ff;
    text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  }
  .candidates-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 100%;
    height: 100%;
    padding: 2px;
    box-sizing: border-box;
  }
  .c-num {
    font-size: clamp(8px, 2.5vw, 11px);
    line-height: 1;
    color: #ffaa00;
    font-family: monospace;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
  }
  .c-num.hidden {
    opacity: 0;
  }
  .editor-popover {
    position: absolute;
    z-index: 100;
    background: #1a1e24;
    border: 1px solid #40a9ff;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 12px rgba(24, 144, 255, 0.3);
    width: 140px;
    transform: translateY(-50%);
  }
  .popover-title {
    color: #888;
    font-size: 12px;
    margin-bottom: 8px;
    text-align: center;
  }
  .popover-input-group {
    display: flex;
    gap: 6px;
  }
  .popover-input-group input {
    flex: 1;
    width: 0;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid #444;
    border-radius: 4px;
    color: #00e5ff;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    outline: none;
    padding: 4px 0;
  }
  .popover-input-group input:focus {
    border-color: #00e5ff;
  }
  .popover-input-group input::-webkit-outer-spin-button,
  .popover-input-group input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .btn-confirm {
    background: rgba(24, 144, 255, 0.2);
    color: #40a9ff;
    border: 1px solid #40a9ff;
    border-radius: 4px;
    padding: 0 10px;
    cursor: pointer;
    transition: 0.2s;
  }
  .btn-confirm:hover {
    background: #40a9ff;
    color: #fff;
  }
  .popover-hint {
    font-size: 10px;
    color: #555;
    text-align: center;
    margin-top: 6px;
  }
  
  .cell.is-dead-end {
    background: rgba(255, 77, 79, 0.2) !important;
    border-color: #ff4d4f !important;
    box-shadow: inset 0 0 20px rgba(255, 77, 79, 0.5),
      0 0 10px rgba(255, 77, 79, 0.8) !important;
    animation: pulse-dead 1.5s infinite;
    z-index: 40 !important;
  }
  
  .cell.is-suspect {
    background: rgba(250, 173, 20, 0.15) !important;
    border-color: #faad14 !important;
    box-shadow: inset 0 0 15px rgba(250, 173, 20, 0.5),
      0 0 8px rgba(250, 173, 20, 0.3) !important;
    z-index: 35 !important;
  }
  
  .cell.is-suspect .final-value {
    color: #faad14 !important;
    text-shadow: 0 0 10px rgba(250, 173, 20, 0.8) !important;
  }
  
  .banned-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 9px;
    color: #ff4d4f;
    background: rgba(0, 0, 0, 0.6);
    padding: 1px 4px;
    border-radius: 4px;
    border: 1px solid rgba(255, 77, 79, 0.4);
  }
  
  @keyframes pulse-dead {
    0% {
      box-shadow: inset 0 0 20px rgba(255, 77, 79, 0.5), 0 0 5px rgba(255, 77, 79, 0.5);
    }
    50% {
      box-shadow: inset 0 0 30px rgba(255, 77, 79, 0.8), 0 0 15px rgba(255, 77, 79, 0.8);
    }
    100% {
      box-shadow: inset 0 0 20px rgba(255, 77, 79, 0.5), 0 0 5px rgba(255, 77, 79, 0.5);
    }
  }
  
  .replay-btn {
    background: rgba(187, 134, 252, 0.1);
    color: #bb86fc;
    border: 1px solid rgba(187, 134, 252, 0.3);
    padding: 6px 16px;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
    overflow: hidden;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .replay-btn:hover {
    background: rgba(187, 134, 252, 0.2);
    border-color: #bb86fc;
    color: #fff;
    box-shadow: 0 0 15px rgba(187, 134, 252, 0.4);
    transform: translateY(-1px);
  }
  
  .replay-btn:active {
    transform: translateY(1px) scale(0.96);
    box-shadow: 0 0 5px rgba(187, 134, 252, 0.2);
  }
  
  .replay-btn .icon {
    font-size: 14px;
    filter: drop-shadow(0 0 2px #bb86fc);
  }
  
  .replay-btn::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -60%;
    width: 20%;
    height: 200%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(187, 134, 252, 0.4),
      transparent
    );
    transform: rotate(30deg);
    transition: 0.5s;
  }
  
  .replay-btn:hover::after {
    left: 120%;
    transition: 0.5s;
  }
  
  .status-toast-container {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 1000;
    width: 90%;
    display: flex;
    justify-content: center;
  }
  
  .status-toast-container.visible {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  
  .status-toast {
    padding: 12px 28px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 16px;
    font-weight: bold;
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    text-align: center;
  }
  
  .status-toast.solved {
    background: rgba(82, 196, 26, 0.15);
    border: 1px solid #52c41a;
    color: #52c41a;
    box-shadow: 0 0 20px rgba(82, 196, 26, 0.3),
      inset 0 0 10px rgba(82, 196, 26, 0.2);
  }
  
  .status-toast.failed {
    background: rgba(255, 77, 79, 0.15);
    border: 1px solid #ff4d4f;
    color: #ff4d4f;
    box-shadow: 0 0 20px rgba(255, 77, 79, 0.3),
      inset 0 0 10px rgba(255, 77, 79, 0.2);
  }
  
  .toast-icon {
    font-size: 22px;
  }
  
  .toast-msg {
    letter-spacing: 1px;
  }
  
  .pulse-animation {
    animation: bounce-joy 1.2s infinite cubic-bezier(0.28, 0.84, 0.42, 1);
    display: inline-block;
  }
  
  @keyframes bounce-joy {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-6px) scale(1.1);
    }
  }
  
  .shake-animation {
    animation: shake-alert 0.5s infinite;
    display: inline-block;
  }
  
  @keyframes shake-alert {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-3px) rotate(-5deg);
    }
    75% {
      transform: translateX(3px) rotate(5deg);
    }
  }
  
  /* 🌟 修改点 7：彻底删除针对棋盘的 scale 缩放代码，仅优化顶部控制栏的手机端排版 */
  @media (max-width: 600px) {
    .control-panel {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .controls {
      width: 100%;
      justify-content: space-between;
    }
    .controls button {
      flex: 1;
      justify-content: center;
    }
  
    .status-toast {
      font-size: 13px;
      padding: 8px 16px;
      flex-wrap: wrap; /* 允许文字超长换行 */
    }
  }
  </style>