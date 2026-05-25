<template>
    <div class="battle-arena">
        <div class="scoreboard" :data-tick="tick.dirtySignal.value">
            <h2>战斗引擎 (100ms/帧): <span class="highlight">{{ tick.tickversion }} </span> </h2>  
            <div class="time-machine" style="margin: 20px 0; background: #181825; padding: 15px; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #a6adc8;">
                    ⏳ 物理时空漫游 (当前帧: {{ sliderValue }} / 最远到达: {{ maxTick }})
                </p>
                <input type="range" class="time-slider" :min="0" :max="maxTick" :value="sliderValue"
                    @mousedown="onScrubStart" @input="onScrub" style="width: 100%; cursor: pointer;" />
            </div>
            <div class="controls" style="margin-top: 15px; display: flex; justify-content: center; gap: 10px;">
                <button @click="keepBattle" v-if="!tick.running" class="action-btn">继续</button>
                <button @click="pauseBattle" v-if="tick.running" class="action-btn">暂停</button>
                <button @click="resetBattle" class="action-btn">重置</button>
            </div>
            <div class="status" v-if="heroPanel.life <= 0 || bossPanel.life <= 0">
                💀 战斗结束！{{ heroPanel.life > 0 ? '勇者胜利！' : 'Boss胜利！' }}
            </div>
        </div>

        <div class="fighters-container">
            <div class="fighter-card hero" :class="{ 'dead': heroPanel.life <= 0 }">
                <div class="avatar" :class="{ 'attack-dash-right': heroPanel.showAttack && tick.running }"
                    :style="{ '--atk-speed': (1 / (heroPanel.displaySpeed || 1)).toFixed(2) + 's' }">🧙‍♂️</div>

                <div class="buff-bar">
                    <span v-for="(b, index) in (heroPanel.activeBuffs || [])" :key="index" :class="['buff-badge', b.effect]">
                        {{ b.effect === 'haste' ? '⚡疾风' : (b.effect === 'rage' ? '🔥狂暴' : b.name) }}
                    </span>
                </div>

                <h3 style="margin-top: 15px;">白羊勇者 (Hero) </h3>

                <div class="stats">
                    <div class="hp-bar-bg">
                        <div class="hp-bar" :style="{ width: Math.max(0, (heroPanel.life / heroPanel.displayLife) * 100) + '%' }"></div>
                    </div>
                    <p class="hp-text">HP: {{ Math.max(0, heroPanel.life) }} / {{ heroPanel.displayLife }}</p>

                    <div class="energy-square-box">
                        <div class="energy-square-fill hero-fill"
                            :style="{ background: heroPanel.energy > 0 ? `conic-gradient(#89dceb ${Math.min(360, (heroPanel.energy / (heroPanel.maxEnergy || 100)) * 360)}deg, #181825 0deg)` : '#181825' }">
                        </div>
                        <span class="energy-text-center">{{ Math.floor((heroPanel.energy / (heroPanel.maxEnergy || 100)) * 100) }}%</span>
                    </div>

                    <p>面板攻击 (ATK): <span class="highlight-text">{{ heroPanel.displayAttack }}</span></p>
                    <p>面板攻速 (SPD): <span class="highlight-text">{{ heroPanel.displaySpeed }}</span></p>
                </div>

                <div class="skills-panel">
                    <button v-for="skill in heroPanel.availableSkills" :key="skill.id"
                    @click="castSkill(skill)" 
                    class="skill-btn">
                        {{ hasBuff(heroPanel.activeBuffs, skill.effect) ? `${skill.name} 中...` : `${skill.icon || '⚡'} ${skill.name}` }}
                    </button>
                </div>

                <div class="signal-tag" :data-tick="heroPanel.dirtySignal.value">
                    Hero Tick: {{ heroPanel.tickversion }}
                </div>
            </div>

            <div class="vs-badge">VS</div>

            <div class="fighter-card boss" :class="{ 'dead': bossPanel.life <= 0 }">
                <div class="avatar" :class="{ 'attack-dash-left': bossPanel.showAttack && tick.running }">🦀</div>

                <div class="buff-bar"><span style="opacity: 0;">-</span></div>
                <h3 style="margin-top: 15px;">巨蟹魔王 (Boss)</h3>

                <div class="stats">
                    <div class="hp-bar-bg">
                        <div class="hp-bar boss-hp" :style="{ width: Math.max(0, (bossPanel.life / bossPanel.staticMaxLife) * 100) + '%' }"></div>
                    </div>
                    <p class="hp-text">HP: {{ Math.max(0, bossPanel.life) }} / {{ bossPanel.staticMaxLife }}</p>

                    <div class="energy-square-box">
                        <div class="energy-square-fill boss-fill"
                            :style="{ background: bossPanel.energy > 0 ? `conic-gradient(#fab387 ${Math.min(360, (bossPanel.energy / (bossPanel.maxEnergy || 100)) * 360)}deg, #181825 0deg)` : '#181825' }">
                        </div>
                        <span class="energy-text-center">{{ Math.floor((bossPanel.energy / (bossPanel.maxEnergy || 100)) * 100) }}%</span>
                    </div>

                    <p>面板攻击 (ATK): <span class="highlight-text">{{ bossPanel.displayAttack }}</span></p>
                    <p>面板攻速 (SPD): <span class="highlight-text">{{ bossPanel.displaySpeed }}</span></p>
                </div>

                <div class="signal-tag" :data-tick="bossPanel.dirtySignal.value">
                    Boss Tick: {{ bossPanel.tickversion }}
                </div>
            </div>
        </div>

        <!-- 🌟 新增的赛博能量分割线，增加空间感与下挂仪表的氛围 -->
        <div class="dock-divider">
            <span>NEURAL EQUIPMENT LINK</span>
        </div>

        <div class="weapon-dock-container">
            <div class="weapon-slot" :class="{ 'sandevistan-active': heroPanel.displayWeaponName && heroPanel.displayWeaponName !== '默认武器' }">
                <div class="slot-header">
                    <span class="dot"></span>
                    <span class="title">MATRIX WEAPON SLOT</span>
                </div>
                <div class="weapon-core">
                    <div class="weapon-meta">
                        <span class="status-tag">ACTIVE</span>
                        <h4 class="weapon-title">{{ heroPanel.displayWeaponName || '默认武器' }}</h4>
                    </div>
                    <button @click="pickWeapon" class="cyber-swap-btn">
                        <span class="btn-glow"></span>
                        <span class="btn-text">change</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="arch-tabs" style="display: flex; gap: 10px; margin-bottom: 15px;margin-top: 15px; justify-content: center;">
            <button class="action-btn" 
                    :style="{ background: activeTab === 'topology' ? '#89b4fa' : '#313244', color: activeTab === 'topology' ? '#11111b' : '#fff' }" 
                    @click="activeTab = 'topology'">
                🌐 拓扑纠缠网 (Topology)
            </button>
            <button class="action-btn" 
                    :style="{ background: activeTab === 'sequence' ? '#89b4fa' : '#313244', color: activeTab === 'sequence' ? '#11111b' : '#fff' }" 
                    @click="activeTab = 'sequence'">
                ⏳ 时空生命周期 (Sequence)
            </button>
        </div>

        
        <div class="graph-viewer">
            <div ref="mermaidContainer" class="mermaid"></div>
        </div>
       
</template>

<script setup lang="ts">
import { useMeshFlow,deleteEngine } from '@meshflow/core';
import { useHero } from '../core/hero';
import { ref, onMounted, onUnmounted,nextTick,watch } from 'vue';
import mermaid from 'mermaid';

// ==========================================
// 🌌 观测台图形源码配置 (Mermaid 脚本定义)
// ==========================================
const activeTab = ref<'topology' | 'sequence'>('topology');
const mermaidContainer = ref<HTMLElement | null>(null);

const topologyCode = `flowchart LR
    %% 样式定义
    classDef source fill:#313244,stroke:#585b70,stroke-width:2px,color:#cdd6f4;
    classDef panel fill:#11111b,stroke:#89b4fa,stroke-width:2px,color:#cdd6f4;
    classDef court fill:#181825,stroke:#f38ba8,stroke-width:2px,color:#f9e2af;

    subgraph L0 [Level 0: Immutable 配置源点]
        direction TB
        hero[hero]:::source
        boss[boss]:::source
        tick[tick]:::source
        weaponA[weapon实体]:::source
    end

    subgraph L1 [Level 1: 动态交汇与法庭推演]
        direction TB
        weaponPanel{{weaponPanel 武器舱}}:::panel
        damageCourt((damageCourt 时空法庭)):::court
    end

    subgraph L2 [Level 2: 最终坍缩观测面]
        direction TB
        heroPanel{{heroPanel 勇者面板}}:::panel
        bossPanel{{bossPanel 魔王面板}}:::panel
    end

    %% ==================================
    %% 1. SetRule 静态引力轨道 (粗实线)
    %% ==================================
    hero ==>|下发基础属性与先天技能| heroPanel
    boss ==>|下发基础属性| bossPanel
    tick ==>|同步时钟信号| heroPanel & bossPanel & damageCourt
    weaponA ==>|装卸开关信号| weaponPanel

    %% 斩断循环的关键单向流
    weaponPanel ==>|重新装填武器可用技能| heroPanel

    %% ==================================
    %% 2. useEntangle 动态预言与推演 (细虚线)
    %% ==================================
    heroPanel -.->|1. 发射战斗意图| damageCourt
    bossPanel -.->|1. 发射战斗意图| damageCourt
    weaponPanel -.->|1. 发射换装意图| damageCourt

    damageCourt -.->|2. 推演回写 HP/Buff| heroPanel
    damageCourt -.->|2. 推演回写 HP| bossPanel
    damageCourt -.->|2. 推演回写 武器使用记录| weaponPanel
`;

const sequenceCode = `sequenceDiagram
    autonumber
    actor UI as 玩家 (Vue 视图)
    participant Tick as tick (时钟源)
    participant H as heroPanel (勇者)
    participant B as bossPanel (魔王)
    participant Court as damageCourt (时空法庭)

    UI->>Tick: 时间流逝 (setInterval) 或 玩家 castSkill()
    
    Tick-->>H: 【SetRule】下发新帧号 (tickversion)
    Tick-->>B: 【SetRule】下发新帧号 (tickversion)
    Tick-->>Court: 【SetRule】下发新帧号 (tickversion)

    H-->>Court: 【useEntangle: 发射】写入勇者攻击与技能意图
    B-->>Court: 【useEntangle: 发射】写入魔王攻击意图
    
    Note over Court: actions 收集完毕，法庭开庭！
    
    activate Court
    Note over H,Court: 内部调用 simulateBattle(actions)<br/>⚔️ 空间上的双向战斗在此转化<br/>为时间轴推演
    deactivate Court

    Court-->>H: 【useEntangle: 回写】交付结算后的 HP/Energy/Buff
    Court-->>B: 【useEntangle: 回写】交付结算后的 HP/Energy
    
    H->>UI: 数据物理坍缩，刷新勇者血条与特效！
    B->>UI: 数据物理坍缩，刷新魔王血条与特效！
`;


const hasBuff = (buffs: any[] | undefined, effectName: string): boolean => {
    if (!buffs || buffs.length === 0) return false;
    for (let i = 0; i < buffs.length; i++) {
        const b = buffs[i];
        if (typeof b === 'string' ? b === effectName : b.effect === effectName) return true;
    }
    return false;
};

const engine = useMeshFlow('hero', [] as any, {
    config: { useGreedy: true },
    UITrigger: {
        signalCreator: () => ref(0),
        signalTrigger: (signal) => signal.value++
    },
    modules: { useHero }
});

const maxTick = ref(0);
const sliderValue = ref(0);

const { hero, heroPanel, boss, bossPanel, damageCourt, tick, weaponA, weaponPanel } = engine.modules.hero;

const castSkill = (skill: any) => {
    if (!engine.data.GetValue(tick.path, 'running')) return;
    engine.data.StageValue(heroPanel.path, 'skillIntent', { 
        ...skill, 
        id: Date.now() 
    });
};

const pickWeapon = () => {
    const currentStatus = engine.data.GetValue(weaponA.path, 'triggerPanel') || 0;
    const nextStatus = currentStatus === 0 ? 1 : 0; 
    engine.data.StageValue(weaponA.path, 'triggerPanel', nextStatus);
};

// ==========================================
// 初始化基础属性 (静态 DAG 拓扑)
// ==========================================
engine.config.SetRule(hero.path, heroPanel.path, 'staticMaxLife', {
    logic({ slot }) {  return slot.triggerTargets[0].baseMaxLife; },
    triggerKeys: ['baseMaxLife'],
    effect(args) { return { life: args.staticMaxLife }; },
    effectArgs: ['staticMaxLife']
});
engine.config.SetRule(hero.path, heroPanel.path, 'staticAttack', {
    logic({ slot }) { return slot.triggerTargets[0].baseAttack; },
    triggerKeys: ['baseAttack']
});
engine.config.SetRule(hero.path, heroPanel.path, 'staticSpeed', {
    logic({ slot }) { return slot.triggerTargets[0].baseSpeed; },
    triggerKeys: ['baseSpeed']
});
engine.config.SetRule(hero.path, heroPanel.path, 'maxEnergy', {
    logic({ slot }) { return slot.triggerTargets[0].baseMaxEnergy; },
    triggerKeys: ['baseMaxEnergy']
});

engine.config.SetRules(
    [hero.path, weaponPanel.path], heroPanel.path, 'availableSkills', {
        logic({ slot }) {
            const heroState = slot.triggerTargets[0];
            const weaponPanelState = slot.triggerTargets[1];
            return [...(heroState.innateSkills || []), ...(weaponPanelState.historicalWeapon?.weaponSkills || [])];
        },
        triggerKeys: ['innateSkills', 'historicalWeapon']
    }
);

engine.config.SetRule(boss.path, bossPanel.path, 'staticMaxLife', {
    logic({ slot }) { return slot.triggerTargets[0].baseMaxLife; },
    triggerKeys: ['baseMaxLife'],
    effect(args) { return { life: args.staticMaxLife }; },
    effectArgs: ['staticMaxLife']
});
engine.config.SetRule(boss.path, bossPanel.path, 'staticAttack', {
    logic({ slot }) { return slot.triggerTargets[0].baseAttack; },
    triggerKeys: ['baseAttack']
});
engine.config.SetRule(boss.path, bossPanel.path, 'staticSpeed', {
    logic({ slot }) { return slot.triggerTargets[0].baseSpeed; },
    triggerKeys: ['baseSpeed']
});
engine.config.SetRule(boss.path, bossPanel.path, 'maxEnergy', {
    logic({ slot }) { return slot.triggerTargets[0].baseMaxEnergy; },
    triggerKeys: ['baseMaxEnergy']
});

engine.config.SetRule(tick.path, heroPanel.path, 'tickversion', {
    logic({slot}) { return slot.triggerTargets[0].tickversion; },
    triggerKeys:['tickversion']
});
engine.config.SetRule(tick.path, bossPanel.path, 'tickversion', {
    logic({slot}) { return slot.triggerTargets[0].tickversion; },
    triggerKeys:['tickversion']
});
engine.config.SetRule(tick.path, damageCourt.path, 'currentTick', {
    logic({ slot }) { return slot.triggerTargets[0].tickversion; },
    triggerKeys: ['tickversion']
});

// ==========================================
// 发射意图与动作记录 (时空流)
// ==========================================
engine.config.useEntangle({
    cause: heroPanel.path, 
    impact: damageCourt.path,
    via: ['tickversion', 'skillIntent'], 
    emit(cause, impact, propose){
        const tickversion = cause.state.tickversion;
        if (tickversion == null) return;

        const actions = impact.state.actions || {}; 
        if (!actions[tickversion]) actions[tickversion] = [];
        let shouldUpdate = false;
 
        if (!actions[tickversion].some((atk: any) => atk.from === heroPanel.path && atk.isIntent)) {
            actions[tickversion].push({
                isIntent: true, from: heroPanel.path, to: cause.state.attacktargets, 
                attack: cause.state.displayAttack, speed: cause.state.displaySpeed,
                maxEnergy: cause.state.maxEnergy, life: cause.state.life  
            });
            shouldUpdate = true;
        }
      
        const skillIntent = cause.state.skillIntent;
        const consumedId = cause.state.consumedSkillId;
        if (skillIntent && skillIntent.id !== consumedId) {
            if (!actions[tickversion].some((a: any) => a.isSkill && a.id === skillIntent.id)) {
                actions[tickversion].push({
                    isSkill: true, from: heroPanel.path, skill: skillIntent, id: skillIntent.id
                });
                shouldUpdate = true;
            }
        }
        if (shouldUpdate) propose.set('actions', { ...actions }); 
    }
});

engine.config.useEntangle({
    cause: bossPanel.path,
    impact: damageCourt.path,
    via: ['tickversion'],
    emit(cause, impact, propose) {
        const tickversion = cause.state.tickversion;
        if (tickversion == null) return;
        
        const actions = impact.state.actions || {};
        if (!actions[tickversion]) actions[tickversion] = [];
        
        if (!actions[tickversion].some((atk: any) => atk.from === bossPanel.path && atk.isIntent)) {
            actions[tickversion].push({
                isIntent: true, from: bossPanel.path, to: cause.state.attacktargets,
                attack: cause.state.displayAttack, speed: cause.state.displaySpeed,
                maxEnergy: cause.state.maxEnergy, life: cause.state.life
            });
            propose.set('actions', { ...actions });
        }
    }
});

engine.config.useEntangle({
    cause: weaponPanel.path,
    impact: damageCourt.path,
    via: ['choosedWeapon'], 
    emit(cause, impact, propose) {
        const currentTick = engine.data.GetValue(tick.path, 'tickversion') || 0;
        const choosedWeapon = cause.state.choosedWeapon;

        const actions = impact.state.actions || {};
        if (!actions[currentTick]) actions[currentTick] = [];

        if (!actions[currentTick].some((a: any) => a.isWeaponChange && a.from === heroPanel.path)) {
            actions[currentTick].push({
                isWeaponChange: true,
                from: heroPanel.path,
                weapon: choosedWeapon 
            });
            propose.set('actions', { ...actions });
        }
    }
});

// ==========================================
// 💥 法庭历史回溯推演
// ==========================================
engine.config.useEntangle({
    cause: damageCourt.path,
    impact: weaponPanel.path,
    via: ['actions', 'currentTick'],
    emit(cause, impact, propose) {
        const { actions, currentTick } = cause.state;
        if (typeof actions !== 'object') return;

        const staticMaxLife = engine.data.GetValue(hero.path, 'baseMaxLife');
        const bossBaseLife = engine.data.GetValue(boss.path, 'baseMaxLife');
        
        const result = simulateBattle(actions, heroPanel.path, currentTick, staticMaxLife, bossBaseLife);
        if (result) propose.set('historicalWeapon', result.currentWeapon || null);
    }
});

engine.config.useEntangle({
    cause: damageCourt.path,
    impact: heroPanel.path,
    via: ['actions','currentTick'],
    emit(cause, impact, propose) {
        const { actions, currentTick } = cause.state;
        if (typeof actions !== 'object') return;

        const staticMaxLife = engine.data.GetValue(hero.path, 'baseMaxLife');
        const bossBaseLife = engine.data.GetValue(boss.path, 'baseMaxLife');
        
        const result = simulateBattle(actions, heroPanel.path, currentTick, staticMaxLife, bossBaseLife);
        if (!result) return;
        
        const weaponBonus = result.currentWeapon || {};
        const staticAttack = impact.state.staticAttack || 0;
        const staticSpeed = impact.state.staticSpeed || 0;

        const finalAttack = staticAttack + (weaponBonus.attack || 0);
        const finalSpeed = staticSpeed + (weaponBonus.speed || 0);

        const displayAttack = hasBuff(result.activeBuffs, 'rage') ? finalAttack * 2 : finalAttack;
        const displaySpeed = hasBuff(result.activeBuffs, 'haste') ? finalSpeed * 5 : finalSpeed;
        
        let displayLife = staticMaxLife;
        let newlife = result.life;
        
        if(weaponBonus.weaponid === '1') {
            displayLife = staticMaxLife * 0.8;
            newlife = Math.max(0, result.life - (staticMaxLife - displayLife));
        }

        propose.set('life', newlife);
        propose.set('energy', result.energy);
        propose.set('showAttack', result.showAttack || false);
        propose.set('activeBuffs', result.activeBuffs); 
        propose.set('displayAttack', displayAttack);
        propose.set('displaySpeed', displaySpeed);
        propose.set('displayLife', displayLife);
        propose.set('displayWeaponName', weaponBonus.name || '默认武器');

        const tickKeys = Object.keys(actions).map(Number).sort((a, b) => b - a);
        let lastSkillId = null;
        for (let i = 0; i < tickKeys.length; i++) {
            const t = tickKeys[i];
            if (t > currentTick) continue;
            const mySkill = actions[t].find((a: any) => a.isSkill && a.from === heroPanel.path);
            if (mySkill) {
                lastSkillId = mySkill.id;
                break;
            }
        }
        if (lastSkillId) propose.set('consumedSkillId', lastSkillId);
    }
});

engine.config.useEntangle({
    cause: damageCourt.path,
    impact: bossPanel.path,
    via: ['actions','currentTick'],
    emit(cause, impact, propose) {
        const { actions, currentTick } = cause.state;
        if (typeof actions !== 'object') return;
        
        const heroMaxLife = engine.data.GetValue(hero.path, 'baseMaxLife');
        const bossBaseLife = engine.data.GetValue(boss.path, 'baseMaxLife');

        const result = simulateBattle(actions, bossPanel.path, currentTick, heroMaxLife, bossBaseLife);
        if (result) {
            propose.set('life', result.life);
            propose.set('energy', result.energy);
            propose.set('showAttack', result.showAttack || false);
        }
    }
});

engine.config.SetRule(
    weaponA.path, weaponPanel.path, 'choosedWeapon',
    {
        logic({ slot }) {
            const [weapon] = slot.triggerTargets;
            if (weapon.triggerPanel === 0) return null; 
            return {
                attack: weapon.proxy.attackBonus,
                speed: weapon.proxy.speedBonus,
                skills: weapon.proxy.skills,
                name: weapon.proxy.name,
                weaponid: weapon.proxy.weaponid,
                weaponSkills: weapon.proxy.skills
            };
        },
        triggerKeys: ['triggerPanel']
    }
);

engine.config.notifyAll();

// ==========================================
// 运行循环与推演中心
// ==========================================
let timer: ReturnType<typeof setInterval> | null = null;
    const renderGraphs = async () => {
    if (!mermaidContainer.value) return;

    // 1. 🔥 核心自清洗：彻底擦除上一次渲染的 SVG，抹掉 data-processed 标记
    mermaidContainer.value.removeAttribute('data-processed');
    // 根据当前 Tab 动态注入文本，切断 Vue 的双向绑定干扰
    mermaidContainer.value.textContent = activeTab.value === 'topology' ? topologyCode : sequenceCode;

    await nextTick();

    // 2. 初始化 Mermaid，加入防塌陷配置
    mermaid.initialize({ 
        startOnLoad: false, 
        theme: 'dark',
        securityLevel: 'loose',
        sequence: {
            useMaxWidth: false, // 🌟 关键：关闭最大宽度限制，防止挤压导致高度塌陷
        },
        themeVariables: { background: '#11111b', primaryColor: '#313244', lineColor: '#a6adc8' }
    });

    // 3. 执行单点精准渲染
    await mermaid.run({ nodes: [mermaidContainer.value] });
};
onMounted(()=>{
    startBattle();
    renderGraphs();
});
onUnmounted(() => { 
    if (timer) clearInterval(timer); 
    deleteEngine('hero')
});
watch(activeTab, () => {
    setTimeout(() => {
        renderGraphs();
    }, 30);
});

function startBattle() {
    if (timer) clearInterval(timer);

    const currentTick = engine.data.GetValue(tick.path, 'tickversion') || 0;
    if (currentTick < maxTick.value) {
        const actions = engine.data.GetValue(damageCourt.path, 'actions') || {};
        let hasPruned = false;
        const prunedActions: Record<string, any> = {};
        for (const t in actions) {
            if (Number(t) <= currentTick) {
                prunedActions[t] = actions[t];
            } else {
                hasPruned = true;
            }
        }
        if (hasPruned) engine.data.StageValue(damageCourt.path, 'actions', prunedActions);
        maxTick.value = currentTick; 
    }

    engine.data.SetValue(tick.path, 'running', true);

    timer = setInterval(() => {
        if (!engine.data.GetValue(tick.path, 'running')) return;

        const heroHp = engine.data.GetValue(heroPanel.path, 'life');
        const bossHp = engine.data.GetValue(bossPanel.path, 'life');
        
        if (heroHp <= 0 || bossHp <= 0) {
            engine.data.StageValue(tick.path, 'running', false);
            if (timer) { clearInterval(timer); timer = null; }
            return;
        }

        const nextTick = (engine.data.GetValue(tick.path, 'tickversion') || 0) + 1;
        engine.data.StageValue(tick.path, 'tickversion', nextTick);
        maxTick.value = Math.max(maxTick.value, nextTick);
        sliderValue.value = nextTick;
    }, 20); 
}

function resetBattle() {
    if (timer) { clearInterval(timer); timer = null; }
    maxTick.value = 0;
    sliderValue.value = 0;
    
    engine.data.SetValues([
        { path: tick.path, key: 'running', value: false },
        { path: tick.path, key: 'tickversion', value: 0 },
        { path: damageCourt.path, key: 'actions', value: {} },
        { path: heroPanel.path, key: 'life', value: engine.data.GetValue(heroPanel.path, 'staticMaxLife') },
        { path: heroPanel.path, key: 'energy', value: 0 },
        { path: heroPanel.path, key: 'activeBuffs', value: [] },
        { path: heroPanel.path, key: 'skillIntent', value: null },
        { path: heroPanel.path, key: 'consumedSkillId', value: null },
        { path: bossPanel.path, key: 'life', value: engine.data.GetValue(bossPanel.path, 'staticMaxLife') },
        { path: bossPanel.path, key: 'energy', value: 0 },
        { path: bossPanel.path, key: 'activeBuffs', value: [] },
        { path: weaponA.path, key: 'triggerPanel', value: 0 },
        { path: weaponPanel.path, key: 'historicalWeapon', value: null } 
    ]);
}

const keepBattle = () => {
    if (engine.data.GetValue(heroPanel.path, 'life') <= 0 || engine.data.GetValue(bossPanel.path, 'life') <= 0) return;
    startBattle();
};

const pauseBattle = () => engine.data.StageValue(tick.path, 'running', false);

function simulateBattle(actions: any, targetPath: string, currentTick: number, heroBaseHp: number, bossBaseHp: number) {
    const fighters: Record<string, any> = {
        [heroPanel.path]: { life: heroBaseHp, energy: 0, maxEnergy: 100, speedInThisTick: 0, isDead: false, buffs: [], activeBuffs: [], attackFrames: 0, currentWeapon: null },
        [bossPanel.path]: { life: bossBaseHp, energy: 0, maxEnergy: 100, speedInThisTick: 0, isDead: false, buffs: [], activeBuffs: [], attackFrames: 0 }
    };

    const sortedTicks = Object.keys(actions).map(Number).sort((a, b) => a - b);
  
    for (let i = 0; i < sortedTicks.length; i++) {
        const t = sortedTicks[i];
        if (t > currentTick) break; 
        
        const events = actions[t];
        const tickAttacks: Array<any> = [];

        for (let j = 0; j < events.length; j++) {
            const ev = events[j];
            
            // 🌟 卸载逻辑核心修正：当发生武器变动时，剥离旧武器的所有专属 Buff
            if (ev.isWeaponChange && ev.from === heroPanel.path) {
                const oldWeapon = fighters[heroPanel.path].currentWeapon;
                fighters[heroPanel.path].currentWeapon = ev.weapon || null; 
                
                if (oldWeapon && oldWeapon.weaponSkills) {
                    const oldSkillEffects = oldWeapon.weaponSkills.map((s: any) => s.effect);
                    fighters[heroPanel.path].buffs = fighters[heroPanel.path].buffs.filter(
                        (b: any) => !oldSkillEffects.includes(b.type)
                    );
                }
            } else if (ev.isIntent) {
                fighters[ev.from].speedInThisTick = ev.speed;
                fighters[ev.from].maxEnergy = ev.maxEnergy;
                tickAttacks.push({ from: ev.from, to: ev.to || [], attack: ev.attack });
            } else if (ev.isSkill) {
                fighters[ev.from].buffs.push({ type: ev.skill.effect, info: ev.skill, duration: 96 });
            }
        }

        for (const path in fighters) {
            const f = fighters[path];
            if (f.isDead) continue;
            f.activeBuffs = []; 
            if (f.buffs.length > 0) {
                for (let k = 0; k < f.buffs.length; k++) {
                    f.activeBuffs.push(f.buffs[k].info);
                }
                f.buffs = f.buffs.filter((b: any) => --b.duration > 0);
            }
            f.energy += f.speedInThisTick;
            if (f.attackFrames > 0) f.attackFrames--;
        }

        let readyFighters = Object.keys(fighters).filter(p => fighters[p].energy >= fighters[p].maxEnergy && !fighters[p].isDead);
        while (readyFighters.length > 0) {
            readyFighters.sort((a, b) => fighters[b].energy - fighters[a].energy);
            const attackerPath = readyFighters[0];
            const attacker = fighters[attackerPath];
            attacker.energy -= attacker.maxEnergy;
            const ticksPerAttack = attacker.maxEnergy / (attacker.speedInThisTick || 1);
            attacker.attackFrames = Math.floor(Math.min(15, ticksPerAttack * 0.75));

            const atks = tickAttacks.filter(a => a.from === attackerPath);
            for (let a = 0; a < atks.length; a++) {
                const atk = atks[a];
                for (let k = 0; k < atk.to.length; k++) {
                    const targetFighter = fighters[atk.to[k]];
                    if (targetFighter && !targetFighter.isDead) {
                        targetFighter.life -= atk.attack; 
                        if (targetFighter.life <= 0) {
                            targetFighter.isDead = true;
                            targetFighter.life = 0;
                        }
                    }
                }
            }
            readyFighters = Object.keys(fighters).filter(p => fighters[p].energy >= fighters[p].maxEnergy && !fighters[p].isDead);
        }

        if (fighters[heroPanel.path] && fighters[bossPanel.path]) {
            const aliveCount = Object.values(fighters).filter(f => !f.isDead).length;
            if (aliveCount <= 1) {
                for (const path in fighters) fighters[path].energy = 0;
                break; 
            }
        }
    }

    const final = fighters[targetPath];
    if (currentTick === 0) final.energy = 0;
    if (!final) return null;
    return { ...final, showAttack: final.attackFrames > 0 };
}

const onScrubStart = () => {
    engine.data.StageValue(tick.path, 'running', false);
    if (timer) { clearInterval(timer); timer = null; }
};

const onScrub = (e: any) => {
    const targetTick = Number(e.target.value);
    sliderValue.value = targetTick;
    engine.data.StageValue(tick.path, 'tickversion', targetTick);
};
</script>

<style scoped>
.battle-arena {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #1e1e2e;
    color: #cdd6f4;
    padding: 30px;
    border-radius: 12px;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
.scoreboard {
    text-align: center;
    margin-bottom: 30px;
}
.highlight {
    color: #f9e2af;
    font-size: 1.5em;
}
.highlight-text {
    color: #f9e2af;
    font-weight: bold;
}
.status {
    color: #f38ba8;
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 10px;
}
.fighters-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 20px;
}
.fighter-card {
    background: #313244;
    padding: 20px;
    border-radius: 12px;
    flex: 1;
    text-align: center;
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
}
.fighter-card.hero { border-color: #89b4fa; }
.fighter-card.boss { border-color: #f38ba8; }
.fighter-card.dead {
    opacity: 0.5;
    filter: grayscale(100%);
}
.avatar {
    font-size: 60px;
    margin-bottom: 10px;
    transition: transform var(--atk-speed, 0.3s) cubic-bezier(0.25, 0.8, 0.25, 1);
    display: inline-block;
}
.attack-dash-right { transform: translateX(30px) }
.attack-dash-left { transform: translateX(-30px) }
.hp-bar-bg {
    background: #45475a;
    height: 15px;
    border-radius: 8px;
    overflow: hidden;
    margin: 10px 0;
}
.hp-bar {
    background: #a6e3a1;
    height: 100%;
    transition: width 0.1s linear;
}
.hp-bar.boss-hp { background: #f38ba8; }
.hp-text {
    font-weight: bold;
    margin-bottom: 5px;
}
.energy-square-box {
    position: relative;
    width: 60px;
    height: 60px;
    margin: 15px auto;
    border-radius: 8px;
    border: 3px solid #181825;
    background-color: #11111b;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}
.energy-square-fill {
    position: absolute;
    inset: 0;
    transition: background 0.05s linear;
}
.energy-text-center {
    position: relative;
    z-index: 2;
    font-size: 14px;
    font-weight: 900;
    color: white;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
}
.vs-badge {
    font-size: 24px;
    font-weight: 900;
    color: #f9e2af;
    background: #45475a;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(249, 226, 175, 0.3);
    align-self: center;
}
.signal-tag {
    font-size: 12px;
    color: #a6adc8;
    background: #181825;
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
    margin-top: auto;
}
.action-btn {
    background: #313244;
    color: white;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 20px;
    transition: all 0.2s ease;
}
.action-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}
.action-btn:active { transform: translateY(1px); }
.skills-panel {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 10px;
}
.skill-btn {
    background: #181825;
    color: #cdd6f4;
    border: 1px solid #585b70;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
}
.skill-btn:hover:not(:disabled) {
    border-color: #89b4fa;
    background: #313244;
}
.skill-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.buff-bar {
    height: 24px;
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 5px;
    margin-top: 20px;
}
.buff-badge {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: bold;
}
.buff-badge.haste {
    background: #89dceb;
    color: #11111b;
    box-shadow: 0 0 8px rgba(137, 220, 235, 0.5);
}
.buff-badge.rage {
    background: #f38ba8;
    color: #11111b;
    box-shadow: 0 0 8px rgba(243, 139, 168, 0.5);
}

/* ==========================================
   🌟 分割线与底部间距优化
   ========================================== */
.dock-divider {
    position: relative;
    margin: 45px 0 25px 0;
    text-align: center;
}

.dock-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #45475a, transparent);
    z-index: 1;
}

.dock-divider span {
    background: #1e1e2e;
    padding: 0 20px;
    color: #585b70;
    font-size: 11px;
    font-family: monospace;
    letter-spacing: 3px;
    position: relative;
    z-index: 2;
}

.weapon-dock-container {
    display: flex;
    justify-content: center;
    perspective: 1000px; 
    margin-bottom: 10px;
}

.weapon-slot {
    background: #11111b;
    border: 2px solid #45475a;
    border-radius: 12px;
    padding: 12px 20px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
}

.slot-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
}

.slot-header .dot {
    width: 6px;
    height: 6px;
    background-color: #a6adc8;
    border-radius: 50%;
    transition: background-color 0.4s;
}

.slot-header .title {
    font-size: 10px;
    font-family: monospace;
    color: #a6adc8;
    letter-spacing: 1.5px;
}

.weapon-core {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
}

.weapon-meta {
    text-align: left;
}

.status-tag {
    font-size: 9px;
    background: #313244;
    color: #cdd6f4;
    padding: 1px 5px;
    border-radius: 4px;
    font-weight: bold;
    font-family: monospace;
}

.weapon-title {
    margin: 4px 0 0 0;
    font-size: 18px;
    font-weight: 800;
    color: #cdd6f4;
    transition: color 0.4s;
}

.cyber-swap-btn {
    position: relative;
    background: #313244;
    color: #cdd6f4;
    border: 1px solid #585b70;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
    font-family: monospace;
    letter-spacing: 1px;
    overflow: hidden;
    transition: all 0.2s ease;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
}

.cyber-swap-btn:hover {
    background: #45475a;
    border-color: #89b4fa;
    color: #89b4fa;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(137, 180, 250, 0.2);
}

.cyber-swap-btn:active {
    transform: translateY(1px);
}

.weapon-slot.sandevistan-active {
    border-color: #f38ba8; 
    box-shadow: 0 0 25px rgba(243, 139, 168, 0.15), inset 0 0 12px rgba(243, 139, 168, 0.05);
    background: radial-gradient(circle at 80% 20%, rgba(243, 139, 168, 0.05) 0%, #11111b 80%);
    animation: slot-pulse 2s infinite alternate ease-in-out;
}

.weapon-slot.sandevistan-active .slot-header .dot {
    background-color: #f38ba8;
    animation: dot-blink 1s infinite alternate steps(2);
}

.weapon-slot.sandevistan-active .weapon-title {
    color: #f38ba8;
    text-shadow: 0 0 8px rgba(243, 139, 168, 0.5);
}

.weapon-slot.sandevistan-active .status-tag {
    background: rgba(243, 139, 168, 0.2);
    color: #f38ba8;
}

.weapon-slot.sandevistan-active .cyber-swap-btn {
    border-color: rgba(243, 139, 168, 0.4);
}

.weapon-slot.sandevistan-active .cyber-swap-btn:hover {
    background: rgba(243, 139, 168, 0.1);
    border-color: #f38ba8;
    color: #f38ba8;
    box-shadow: 0 5px 15px rgba(243, 139, 168, 0.3);
}

@keyframes slot-pulse {
    0% { box-shadow: 0 0 20px rgba(243, 139, 168, 0.15); }
    100% { box-shadow: 0 0 30px rgba(243, 139, 168, 0.3); border-color: #fab387; } 
}

@keyframes dot-blink {
    0% { opacity: 0.3; }
    100% { opacity: 1; }
}

@media (max-width: 600px) {
    .battle-arena { padding: 15px; }
    .scoreboard h2 { font-size: 1.2rem; }
    .fighters-container { flex-direction: column; gap: 10px; }
    .vs-badge { margin: 5px 0; width: 40px; height: 40px; font-size: 18px; order: 2; }
    .hero { order: 1; }
    .boss { order: 3; }
    .fighter-card { padding: 15px; }
    .avatar { font-size: 45px; }
    .skills-panel { flex-wrap: wrap; gap: 5px; }
    .skill-btn { flex: 1 1 40%; padding: 10px 5px; font-size: 11px; }
    .hp-text { font-size: 12px; }
}
.fighter-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

.graph-viewer {
    min-height: 150px;  
    background-color: #11111b;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: flex-start; /* 🌟 顶端对齐，允许纵向自然延展，拒绝居中挤压 */
    justify-content: center;
    overflow: auto;
    border: 1px solid #313244;
}

/* 🌟 强力穿透：强制让 Mermaid 生成的 SVG 保持自身原始纵横比 */
:deep(.mermaid svg) {
    max-width: 100% !important; /* 屏幕变小时允许缩小 */
    width: auto !important;     /* 🌟 核心修复：禁止瘦子强行吃胖铺满宽度！ */
    height: auto !important;    /* 高度自然跟随比例 */
    display: inline-block !important; /* 配合 text-align 实现完美居中 */
    margin: 0 auto !important;
}
.graph-viewer .mermaid{
    width: 100%;
    text-align: center;
}
</style>