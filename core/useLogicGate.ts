// useLogicGate.ts
import {   MeshPath,useScheduler } from "@meshflow/core";

const checkIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
         || window.innerWidth < 768;
};

const isMobile = checkIsMobile();

// 🌟 2. 动态分配规模：手机端约 3W，电脑端约 16W+
export const ROWS = isMobile ? 300 : 1500; 
export const COLS = isMobile ? 100 : 300;

export const useLogicGates = <T, P extends MeshPath>(scheduler:ReturnType<typeof useScheduler<T, P>>,) => {
  const vnodeViews: any[] = [];
  const entityViews: any[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const vPath = `vnode.gate_${r}_${c}` as P;
      const index = r * COLS + c;

      // --- 🌟 拓扑链 A：垂直瀑布依赖 (Vertical Waterfall) ---
      const v_inputs = r > 0 ? [
        `vnode.gate_${r - 1}_${(c - 1 + COLS) % COLS}` as P, // 左上
        `vnode.gate_${r - 1}_${c}` as P                     // 正上
      ] : [];

      // --- 🌟 拓扑链 B：二维波前依赖 (2D Wavefront) ---
      // 逻辑：依赖正上方邻居和左侧邻居
      const w_inputs: P[] = [];
      // 逻辑：跳跃式依赖
      if (r > 1 && c > 0) w_inputs.push(`vnode.gate_${r - 2}_${c - 1}` as P);
      if (r > 0 && c > 1) w_inputs.push(`vnode.gate_${r - 1}_${c - 2}` as P);

 

      const logicalNode = scheduler.registerNode({
        path: vPath,
        type: "vnode",
 
        state: { 
          val: 0,   // 响应垂直逻辑
          val2: 0   // 响应波前逻辑
        },
        meta: { 
          index, 
          row: r, 
          col: c,
          v_inputs, // 存储垂直依赖
          w_inputs  // 存储二维波前依赖
        },
        // 🌟 核心：监听两个 Key 的变化，任何一个变了都会向后传播
        notifyKeys: new Set(["val", "val2"]), 
   
      });

      // 物理节点 (与逻辑节点共享状态 key)
      // const entityNode = scheduler.registerNode({
      //   path: `gate_${r}_${c}` as P,
      //   type: 'entity',
      //   uid: 0,
      //   state: { val: 0, val2: 0 },
      //   meta: { index, row: r, col: c },
      //   notifyKeys: new Set(["val", "val2"]),
      //   nodeBucket: {},
      //   dependOn: null as any,
      // });

      vnodeViews.push(logicalNode.createView({ path: vPath }));
      // entityViews.push(entityNode.createView({ path: `gate_${r}_${c}` as P }));
    }
  }
  return { vnodes: vnodeViews, entities: entityViews };
};