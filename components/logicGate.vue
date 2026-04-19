<template>
    <div class="logic-gate-container">
      <div class="header">
        <h2>MeshFlow</h2>
        <p>绿色：垂直瀑布 | 品红：二维波前 | 白色：逻辑干涉</p>
      </div>
      
      <div ref="pixiContainer" class="pixi-viewport"></div>
  
      <div class="ui-panel">
        <div class="stats">节点总数：{{ ROWS * COLS }}</div>
        <button @click="ignition" class="action-btn v-btn">🚀 垂直点火</button>
        <button @click="ignitionVal2" class="action-btn w-btn">🚀 二位波前</button>
        <button @click="resetAll" class="action-btn reset">🧹 重置</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import * as PIXI from 'pixi.js';
  import { useMeshFlow, deleteEngine } from '@meshflow/core';
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useLogicGates, ROWS, COLS } from '../core/useLogicGate'; 
  import { useMeshRenderGate } from "@meshflow/rendergate";
 
  
  
 
  
  const SCALE = 2;
  const pixiContainer = ref<HTMLElement | null>(null);
  
  let app: PIXI.Application;
  let logicTexture: PIXI.Texture;
  const textureBuffer = new Uint8Array(COLS * ROWS * 4); 
  
  const engine = useMeshFlow('logic_domino', [] as any, {
    config: { useGreedy: true },
    modules: {
      logicGates: useLogicGates,
      useMeshRenderGate,
    }
  });
  
 
  
  const { vnodes } = engine.modules.logicGates;
  
  onMounted(async () => {
    // 1. 初始化 PixiJS v8
    app = new PIXI.Application();
    await app.init({
      preference: 'webgl',
      width: COLS * SCALE,
      height: ROWS * SCALE,
      backgroundColor: 0x050505,
      antialias: false,
      resolution: window.devicePixelRatio || 2, // 🌟 关键：利用手机的 2倍或3倍屏
      autoDensity: true,
    });
    
    if (pixiContainer.value) {
      pixiContainer.value.appendChild(app.canvas);
    }
  
    // 🌟 2. 修复后的纹理创建逻辑
    // 首先创建 BufferImageSource
    const bufferSource = new PIXI.BufferImageSource({
      resource: textureBuffer,
      width: COLS,
      height: ROWS,
    });
  
    // 🌟 在这里设置缩放模式，避开 TextureOptions 的类型报错
    bufferSource.style.scaleMode = 'nearest';
  
    // 然后再用这个 source 创建纹理
    logicTexture = new PIXI.Texture({
      source: bufferSource,
    });
  
    const sprite = new PIXI.Sprite(logicTexture);
    sprite.width = COLS * SCALE;
    sprite.height = ROWS * SCALE;
    app.stage.addChild(sprite);
  
    // 3. 布线逻辑
    vnodes.forEach((vnode: any) => {
      const targetPath = vnode.path;
      if (vnode.v_inputs.length > 0) {
        engine.config.SetRules(vnode.v_inputs, targetPath, "val", {
          logic: (api) => {
            const targets = api.slot.triggerTargets;
            if (targets.length < 2) return 0;
          
            return (targets[0].val !== targets[1].val) ? 1 : 0;
          },
          triggerKeys: ["val"],
        });
      }
      if (vnode.w_inputs.length > 0) {
        engine.config.SetRules(vnode.w_inputs, targetPath, "val2", {
          logic: (api) => {
            const targets = api.slot.triggerTargets;
            if (targets.length === 1) return targets[0].val2; 
           
            return (targets[0].val2 !== targets[1].val2) ? 1 : 0;
          },
          triggerKeys: ["val2"],
        });
      }
    });
  
    // 4. 脏数据监听
    engine.modules.render.onDirty((dirtyMap: Record<string, any>) => {
      for (const path in dirtyMap) {
        const node = dirtyMap[path];
        const idx = node.meta?.index;
        if (idx === undefined) continue;
  
        const p = idx * 4;
        const v1 = node.val;
        const v2 = node.val2;
  
        // 填充像素 (RGBA)
        if (v1 && v2) { 
          textureBuffer[p] = 255; textureBuffer[p+1] = 255; textureBuffer[p+2] = 255;
        } else if (v1) { 
          textureBuffer[p] = 0;   textureBuffer[p+1] = 255; textureBuffer[p+2] = 153;
        } else if (v2) { 
          textureBuffer[p] = 255; textureBuffer[p+1] = 0;   textureBuffer[p+2] = 255;
        } else { 
          textureBuffer[p] = 0;   textureBuffer[p+1] = 0;   textureBuffer[p+2] = 0;
        }
        textureBuffer[p+3] = 255;
      }
      
      // 🌟 通知 GPU 源数据已更新
      logicTexture.source.update();
    }, ['vnode']);
  });
  
  // --- 点火控制 ---
  const ignition = () => {
    const force = vnodes.filter((v: any) => v.meta.row === 0).map((v: any) => ({
      path: v.path, key: 'val', value: Math.random() > 0.5 ? 1 : 0
    }));
    // console.log(force)
    engine.data.SetValues(force);
  
   
  };
  
  const ignitionVal2 = () => {
    const seeds = [1,2,3,4]; // 质数序列通常能产生更好看的非对称图案
    const mod = seeds[Math.floor(Math.random() * seeds.length)];
    const offset = Math.floor(Math.random() * mod);
   
  // 🌟 1. 关键：只保留那些真正被选为“点亮”的节点
  const firePoints = vnodes
      .filter(v => v.row === 0 && v.col % mod === 0 )
      .map(v => ({
        path: v.path,
        key: 'val2',
        value: v.val2 === 1 
          ? 0 : 1 // 🌟 强行翻转，确保触发变更
      }));
  
    if (firePoints.length > 0) {
      // 2. 注入初始力
      // console.log(firePoints)
      engine.data.SetValues(firePoints);
    }
    ;
  
//   const randomCol = Math.floor(Math.random() * COLS);
   
//     const firePoints = vnodes
//       .filter((v: any) => v.meta.row === 0 && v.meta.col === randomCol)
//       .map((v: any) => ({
//         path: v.path,
//         key: 'val2',
//         // 点火：强行设为 1。如果已经是 1 就设为 0 制造波动
//         value: v.val2 === 1 ? 0 : 1 
//       }));
  
//     if (firePoints.length > 0) {
//       engine.data.SetValues(firePoints);
//     }
    
  };
  
  const resetAll = () => {
    textureBuffer.fill(0);
    const resetForce = vnodes.map((v: any) => ([
      { path: v.path, key: 'val', value: 0 },
      { path: v.path, key: 'val2', value: 0 }
    ])).flat();
    engine.data.SetValues(resetForce);
   logicTexture.source.update();
  };
  
  engine.hooks.onSuccess(()=>{
    console.log('success')
    console.log(vnodes.map(item=>item.val))
  })
  
  onUnmounted(() => {
    if (app) app.destroy(true, { children: true, texture: true });
    deleteEngine('logic_domino');
  });
  </script>
  
  <style scoped>
  .logic-gate-container {
    display: flex; flex-direction: column; align-items: center;
    background: #050505; color: #00ff99; height: 100vh; padding: 20px;
  }
  .header { text-align: center; margin-bottom: 20px; }
  .pixi-viewport { border: 1px solid #222; background: #000; overflow: hidden; }
  .ui-panel {
    margin-top: 25px; display: flex; gap: 15px; align-items: center;
    background: #111; padding: 15px 25px; border-radius: 50px;
  }
  .action-btn {
    padding: 10px 24px; border: none; border-radius: 25px; cursor: pointer;
  }
  .v-btn { background: #00ff99; color: #000; }
  .w-btn { background: #ff00ff; color: #fff; }
  .reset { background: #333; color: #ccc; }
  .stats { color: #888; font-family: monospace; }
  </style>