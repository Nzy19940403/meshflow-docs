<template>
    <div class="battle-arena">
  
        <div class="scoreboard" :data-tick="tick.dirtySignal.value">
            <h2>战斗引擎 (16ms/帧): <span class="highlight">{{ tick.tickversion }}</span></h2>
            <div class="time-machine" style="margin: 20px 0; background: #181825; padding: 15px; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #a6adc8;">
                    ⏳ 物理时空漫游 (当前帧: {{ sliderValue }} / 最远到达: {{ maxTick }})
                </p>
                <input 
                    type="range" 
                    class="time-slider"
                    :min="0" 
                    :max="maxTick" 
                    :value="sliderValue"
                    @mousedown="onScrubStart"
                    @input="onScrub"
                    style="width: 100%; cursor: pointer;"
                />
            </div>
            <div class="controls" style="margin-top: 15px; display: flex; justify-content: center; gap: 10px;">
                <button @click="keepBattle" v-if="!tick.running" class="action-btn">继续</button>
                <button @click="pauseBattle" v-if="tick.running" class="action-btn">暂停</button>
                <button @click="resetBattle" class="action-btn">重置</button>
            </div>
            <div class="status" v-if="hero.life <= 0 || boss.life <= 0">
                💀 战斗结束！{{ hero.life > 0 ? '勇者胜利！' : 'Boss胜利！' }}
            </div>
        </div>

        <div class="fighters-container">
            <div class="fighter-card hero" :class="{ 'dead': hero.life <= 0 }">
                <div class="avatar" 
                :class="{ 'attack-dash-right': hero.showAttack && tick.running  }"
                :style="{ '--atk-speed': (1 / heroPanel.currentSpeed).toFixed(2) + 's' }">🧙‍♂️</div>
                
                <div class="buff-bar">
                    <span v-for="b in hero.activeBuffs" :key="b" :class="['buff-badge', b]">
                        {{ b === 'haste' ? '⚡疾风' : '🔥狂暴' }}
                    </span>
                </div>

                <h3>白羊勇者 (Hero) </h3>
            
                <div class="stats">
                    <div class="hp-bar-bg">
                        <div class="hp-bar" :style="{ width: Math.max(0, hero.life) + '%' }"></div>
                    </div>
                    <p class="hp-text">HP: {{ Math.max(0, hero.life) }} / 100</p>
                    
                    <div class="energy-square-box">
                        <div class="energy-square-fill hero-fill" 
                             :style="{ background: `conic-gradient(#89dceb ${Math.min(360, (hero.energy / (heroPanel.maxEnergy||100)) * 360)}deg, #181825 0deg)` }">
                        </div>
                        <span class="energy-text-center">{{ Math.floor((hero.energy / (heroPanel.maxEnergy||100)) * 100) }}%</span>
                    </div>
                    
                    <p>面板攻击 (ATK): <span class="highlight-text">{{ heroPanel.currentAttack }}</span></p>
                    <p>面板攻速 (SPD): <span class="highlight-text">{{ heroPanel.currentSpeed.toFixed(1) }}</span></p>
                </div>
                
                <div class="skills-panel">
                    <button @click="castSkill('haste')" 
                            :disabled="!tick.running || hero.life <= 0 || hero.activeBuffs.includes('haste')" 
                            class="skill-btn">
                        {{ hero.activeBuffs.includes('haste') ? '疾风中...' : '⚡ 疾风 (攻速x5)' }}
                    </button>
                    
                    <button @click="castSkill('rage')" 
                            :disabled="!tick.running || hero.life <= 0 || hero.activeBuffs.includes('rage')" 
                            class="skill-btn">
                        {{ hero.activeBuffs.includes('rage') ? '狂暴中...' : '🔥 狂暴 (攻击x2)' }}
                    </button>
                </div>

                <div class="signal-tag" :data-tick="heroPanel.dirtySignal.value">
                    Hero Tick: {{ heroPanel.tickversion }}
                </div>
            </div>

            <div class="vs-badge">VS</div>

            <div class="fighter-card boss" :class="{ 'dead': boss.life <= 0 }">
                <div class="avatar" :class="{ 'attack-dash-left': boss.showAttack && tick.running  }">🦀</div>
                
                <div class="buff-bar"><span style="opacity: 0;">-</span></div> 
                <h3>巨蟹魔王 (Boss)</h3>
                
                <div class="stats">
                    <div class="hp-bar-bg">
                        <div class="hp-bar boss-hp" :style="{ width: Math.max(0, (boss.life / 2) ) + '%' }"></div>
                    </div>
                    <p class="hp-text">HP: {{ Math.max(0, boss.life) }} / 200</p>

                    <div class="energy-square-box">
                        <div class="energy-square-fill boss-fill" 
                             :style="{ background: `conic-gradient(#fab387 ${Math.min(360, (boss.energy / (bossPanel.maxEnergy||100)) * 360)}deg, #181825 0deg)` }">
                        </div>
                        <span class="energy-text-center">{{ Math.floor((boss.energy / (bossPanel.maxEnergy||100)) * 100) }}%</span>
                    </div>

                    <p>面板攻击 (ATK): <span class="highlight-text">{{ bossPanel.currentAttack }}</span></p>
                    <p>面板攻速 (SPD): <span class="highlight-text">{{ bossPanel.currentSpeed.toFixed(1) }}</span></p>
                </div>

                <div class="signal-tag" :data-tick="bossPanel.dirtySignal.value">
                    Boss Tick: {{ bossPanel.tickversion }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMeshFlow } from '@meshflow/core';
import { useHero } from '../core/hero';
import { ref, onMounted } from 'vue';
import { watch } from 'vue'; // 确保上面引入了 watch

const engine = useMeshFlow('hero', [] as any, {
    config: { useGreedy: true },
    UITrigger: {
        signalCreator: () => ref(0),
        signalTrigger: (signal) => signal.value++
    },
    modules: { useHero  }
});



// 🌟 时间机器专属状态
const maxTick = ref(0);
const sliderValue = ref(0);



const { hero, heroPanel, boss, bossPanel, damageCourt, tick } = engine.modules.hero;

const castSkill = (skillName: string) => {
    if (!engine.data.GetValue(tick.path, 'running')) return;
    // 双重保险：如果当前已有该 buff，直接阻断提案
    const currentBuffs = engine.data.GetValue(hero.path, 'activeBuffs') || [];
    if (currentBuffs.includes(skillName)) return; 
    
    engine.data.StageValue(hero.path, 'skillIntent', { name: skillName, id: Date.now() });
};

// ==========================================
// 🚀 核心架构 1：单向流动的 SetRule 管道
// ==========================================
engine.config.SetRule(hero.path, heroPanel.path, 'activeBuffs', {
    logic: ({ slot }) => slot.triggerTargets[0].activeBuffs || [],
    triggerKeys: ['activeBuffs'],
    effect(args) {
        const {baseSpeed = 1, baseAttack = 10, activeBuffs = []} = args;
        const currentAttack = activeBuffs.includes('rage') ? baseAttack * 2 : baseAttack;
        const currentSpeed = activeBuffs.includes('haste') ? baseSpeed * 5 : baseSpeed;
        return { currentSpeed, currentAttack }
    },
    effectArgs:['baseSpeed','baseAttack','activeBuffs']
});

engine.config.SetRule(hero.path, heroPanel.path, 'skillIntent', { logic: ({ slot }) => slot.triggerTargets[0].skillIntent, triggerKeys: ['skillIntent'] });
engine.config.SetRule(hero.path, heroPanel.path, 'consumedSkillId', { logic: ({ slot }) => slot.triggerTargets[0].consumedSkillId, triggerKeys: ['consumedSkillId'] });
engine.config.SetRule(hero.path, heroPanel.path, 'attacktargets', { logic: ({ slot }) => slot.triggerTargets[0].attacktargets, triggerKeys: ['attacktargets'] });
engine.config.SetRule(tick.path, heroPanel.path, 'tickversion', { logic: ({ slot }) => slot.triggerTargets[0].tickversion, triggerKeys: ['tickversion'] });

engine.config.SetRule(boss.path, bossPanel.path, 'activeBuffs', {
    logic: ({ slot }) => slot.triggerTargets[0].activeBuffs || [],
    triggerKeys: ['activeBuffs'],
    effect(args) {
        const {baseSpeed = 0.5, baseAttack = 15, activeBuffs = []} = args;
        const currentAttack = activeBuffs.includes('rage') ? baseAttack * 2 : baseAttack;
        const currentSpeed = activeBuffs.includes('haste') ? baseSpeed * 5 : baseSpeed;
        return { currentSpeed, currentAttack }
    },
    effectArgs:['baseSpeed','baseAttack','activeBuffs']
});
engine.config.SetRule(boss.path, bossPanel.path, 'attacktargets', { logic: ({ slot }) => slot.triggerTargets[0].attacktargets, triggerKeys: ['attacktargets'] });
engine.config.SetRule(tick.path, bossPanel.path, 'tickversion', { logic: ({ slot }) => slot.triggerTargets[0].tickversion, triggerKeys: ['tickversion'] });

engine.config.SetRule(tick.path, damageCourt.path, 'currentTick', { 
    logic: ({ slot }) => slot.triggerTargets[0].tickversion, 
    triggerKeys: ['tickversion'] 
});

// ==========================================
// 🚀 核心架构 2：发射攻击预言（彻底修复内存引用与丢失 Bug！）
// ==========================================
engine.config.useEntangle({
    cause: heroPanel.path, 
    impact: damageCourt.path,
    via: ['tickversion', 'skillIntent'], 
    emit(cause, impact, propose) {
        const tickversion = cause.state.tickversion;
        if (!tickversion) return;

        // 【关键防御】：直接修改原对象，确保英雄和Boss在同一帧的操作都推入相同的数组中
        const actions = impact.state.actions || {}; 
        if (!actions[tickversion]) actions[tickversion] = [];
        let shouldUpdate = false;

        if (!actions[tickversion].some((atk: any) => atk.from === hero.path && atk.isIntent)) {
            actions[tickversion].push({
                isIntent: true,
                from: hero.path, 
                to: cause.state.attacktargets || [boss.path], 
                attack: cause.state.currentAttack || 10,
                speed: cause.state.currentSpeed || 1,
                maxEnergy: cause.state.maxEnergy || 100,
                initialLife: 100
            });
            shouldUpdate = true;
        }

        const skillIntent = cause.state.skillIntent;
        const consumedId = cause.state.consumedSkillId;
        if (skillIntent && skillIntent.id !== consumedId) {
            if (!actions[tickversion].some((a: any) => a.isSkill && a.id === skillIntent.id)) {
                actions[tickversion].push({
                    isSkill: true, from: hero.path, skill: skillIntent.name, id: skillIntent.id
                });
                shouldUpdate = true;
            }
        }

        // 💥 【终极杀招】：必须用 {...actions} 浅拷贝改变 root 对象地址！
        // 这样 MeshFlow 才能监听到 actions 发生了变化，从而触发法庭去裁决扣血！
        if (shouldUpdate) propose.set('actions', { ...actions }); 
    }
});

engine.config.useEntangle({
    cause: bossPanel.path,
    impact: damageCourt.path,
    via: ['tickversion'],
    emit(cause, impact, propose) {
        const tickversion = cause.state.tickversion;
        if (!tickversion) return;

        const actions = impact.state.actions || {};
        if (!actions[tickversion]) actions[tickversion] = [];
        let shouldUpdate = false;
        
        if (!actions[tickversion].some((atk: any) => atk.from === boss.path && atk.isIntent)) {
            actions[tickversion].push({
                isIntent: true,
                from: boss.path,
                to: cause.state.attacktargets || [hero.path],
                attack: cause.state.currentAttack || 15,
                speed: cause.state.currentSpeed || 0.5,
                maxEnergy: cause.state.maxEnergy || 100,
                initialLife: 200  
            });
            shouldUpdate = true;
        }

        // 💥 【终极杀招】：解构强制更新引用！
        if (shouldUpdate) propose.set('actions', { ...actions });
    }
});

// ==========================================
// 🚀 核心架构 3：推演中心（引入帧保持技术 Frame Hold）
// ==========================================
function simulateBattle(actions: any, targetPath: string,currentTick: number) {
    const fighters: Record<string, any> = {};
    // const sortedTicks = Object.keys(actions).map(Number).sort((a, b) => a - b);
    const sortedTicks = Object.keys(actions)
        .map(Number)
        .filter(t => t <= currentTick) // 💥 核心：切断发生在此刻之后的事件！
        .sort((a, b) => a - b);

    for (let t of sortedTicks) {
        const events = actions[t];
        const tickAttacks: Array<any> = [];

        for (let ev of events) {
            if (!fighters[ev.from]) {
                fighters[ev.from] = { 
                    life: ev.initialLife || 100, energy: 0, maxEnergy: ev.maxEnergy || 100, 
                    speedInThisTick: 0, isDead: false, buffs: [], activeBuffs: [],
                    attackFrames: 0 // 🌟 新增：攻击动画剩余帧数
                };
            }
            if (ev.isIntent) {
                fighters[ev.from].speedInThisTick = ev.speed;
                fighters[ev.from].maxEnergy = ev.maxEnergy;
                tickAttacks.push({ from: ev.from, to: ev.to || [], attack: ev.attack });
            }
            if (ev.isSkill) {
                fighters[ev.from].buffs.push({ type: ev.skill, duration: 300 });
            }
        }

        for (let path in fighters) {
            let f = fighters[path];
            if (f.isDead) continue;

            f.activeBuffs = []; 
            if (f.buffs.length > 0) {
                f.buffs.forEach((b: any) => f.activeBuffs.push(b.type));
                f.buffs = f.buffs.filter((b: any) => --b.duration > 0);
            }
            f.energy += f.speedInThisTick;
            
            // 🌟 每一帧流逝，攻击姿态倒计时减 1
            if (f.attackFrames > 0) {
                f.attackFrames--;
            }
        }

        let readyFighters = Object.keys(fighters).filter(p => fighters[p].energy >= fighters[p].maxEnergy && !fighters[p].isDead);
      
        while (readyFighters.length > 0) {
            readyFighters.sort((a, b) => fighters[b].energy - fighters[a].energy);
            const attackerPath = readyFighters[0];
            const attacker = fighters[attackerPath];

            attacker.energy -= attacker.maxEnergy;
            
            // 🌟 爆发攻击！赋予 15 帧的动作保持时间 (15 * 16ms = 240ms)
            // 这样无论推演得多快，UI 上一定能看到完整的 CSS 冲刺动画
            // attacker.attackFrames = 15; 

            const ticksPerAttack = attacker.maxEnergy / (attacker.speedInThisTick || 1);
            // 动画最多只持续间隔的 75%，且上限不超过 15 帧（防止低攻速时动作太慢）
            attacker.attackFrames = Math.floor(Math.min(15, ticksPerAttack * 0.75));

            const atks = tickAttacks.filter(a => a.from === attackerPath);
            for (let atk of atks) {
                for (let target of atk.to) {
                    const targetFighter = fighters[target];
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

        // 修复：使用动态 path 判断结束
        if (fighters[hero.path] && fighters[boss.path]) {
            const aliveCount = Object.values(fighters).filter(f => !f.isDead).length;
            if (aliveCount <= 1) {
                for (let path in fighters) fighters[path].energy = 0;
                break; 
            }
        }
    }

    const defaultLife = targetPath === hero.path ? 100 : 200;
    const final = fighters[targetPath] || { life: defaultLife, energy: 0, activeBuffs: [], attackFrames: 0 };
    
    // 🌟 返回给 Vue 的时候，只要 attackFrames > 0，就一直加上 showAttack 这个 class！
    return { ...final, showAttack: final.attackFrames > 0 };
}
// ==========================================
// 法庭裁决回写
// ==========================================
engine.config.useEntangle({
    cause: damageCourt.path,
    impact: hero.path,
    via: ['actions','currentTick'],
    emit(cause, impact, propose) {
        const actions = cause.state.actions || {};
        const currentTick = cause.state.currentTick || 0;
        if (typeof actions !== 'object') return;
        
        const result = simulateBattle(actions, hero.path,currentTick);
        propose.set('life', result.life);
        propose.set('energy', result.energy);
        propose.set('showAttack', result.showAttack || false);
        propose.set('activeBuffs', result.activeBuffs || []); 

        const mySkills:any = Object.values(actions).flat().filter((a: any) => a.isSkill && a.from === hero.path);
        if (mySkills.length > 0) {
            propose.set('consumedSkillId', mySkills[mySkills.length - 1].id);
        }
    }
});

engine.config.useEntangle({
    cause: damageCourt.path,
    impact: boss.path,
    via: ['actions','currentTick'],
    emit(cause, impact, propose) {
        const actions = cause.state.actions || {};
        const currentTick = cause.state.currentTick || 0;
        if (typeof actions !== 'object') return;

        const result = simulateBattle(actions, boss.path,currentTick);
        propose.set('life', result.life);
        propose.set('energy', result.energy);
        propose.set('showAttack', result.showAttack || false);
        propose.set('activeBuffs', result.activeBuffs || []);
    }
});

engine.config.notifyAll();

onMounted(() => {
    startBattle();
});

let timer: ReturnType<typeof setInterval> | null = null;

function startBattle() {
    if (timer) clearInterval(timer);

    // 🌟 时空剪裁 (Pruning)
    const currentTick = engine.data.GetValue(tick.path, 'tickversion') || 0;
    if (currentTick < maxTick.value) {
        const actions = engine.data.GetValue(damageCourt.path, 'actions') || {};
        let hasPruned = false;
        // 删除时间线之后的历史
        for (let t in actions) {
            if (Number(t) > currentTick) {
                delete actions[t];
                hasPruned = true;
            }
        }
        if (hasPruned) engine.data.StageValue(damageCourt.path, 'actions', { ...actions });
        maxTick.value = currentTick; // 重置最高时间线
    }

    engine.data.SetValue(tick.path, 'running', true);

    timer = setInterval(() => {
        const isRunning = engine.data.GetValue(tick.path, 'running');
        if (!isRunning) return;

        const heroHp = engine.data.GetValue(hero.path, 'life');
        const bossHp = engine.data.GetValue(boss.path, 'life');
        
        if (heroHp <= 0 || bossHp <= 0) {
            engine.data.StageValue(tick.path, 'running', false);
            if (timer) { clearInterval(timer); timer = null; }
            return;
        }

        const tickversion = engine.data.GetValue(tick.path, 'tickversion') || 0;
        engine.data.StageValue(tick.path, 'tickversion', tickversion + 1);
    }, 20); 
}

function resetBattle() {
    if (timer) { clearInterval(timer); timer = null; }
    
    maxTick.value = 0;
    sliderValue.value = 0;

    engine.data.SetValues([
        { path: tick.path, key: 'running', value: false },
        { path: tick.path, key: 'tickversion', value: 0 },
        { path: hero.path, key: 'skillIntent', value: null },
        { path: hero.path, key: 'consumedSkillId', value: null },
        { path:damageCourt.path,key:'actions',value:{} },

    ]);
}

const keepBattle = () => {
    const heroHp = engine.data.GetValue(hero.path, 'life');
    const bossHp = engine.data.GetValue(boss.path, 'life');
    if (heroHp <= 0 || bossHp <= 0) return;
    startBattle();
};
const pauseBattle = () => engine.data.StageValue(tick.path, 'running', false);

// 监听真实时钟前进，更新最大进度
watch(() => tick.dirtySignal.value, () => {
    // 当脏信号触发时，主动去引擎里读取最新的 tickversion
    const currentTick = engine.data.GetValue(tick.path, 'tickversion') || 0;
    
    // 如果引擎在运行中，更新滑动轴状态
    if (engine.data.GetValue(tick.path, 'running')) {
        maxTick.value = Math.max(maxTick.value, currentTick);
        sliderValue.value = currentTick;
    }
});

// 拖拽滑动轴：立刻暂停游戏
const onScrubStart = () => {
    engine.data.StageValue(tick.path, 'running', false);
    if (timer) { clearInterval(timer); timer = null; }
};

// 拖拽过程中：直接篡改物理时间！
const onScrub = (e: any) => {
    const targetTick = Number(e.target.value);
    sliderValue.value = targetTick;
    // 💥 魔法：直接修改当前时钟，触发力场重算
    engine.data.StageValue(tick.path, 'tickversion', targetTick);
};

</script>

<style scoped>
/* 样式依然原样保留即可 */
.battle-arena { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1e1e2e; color: #cdd6f4; padding: 30px; border-radius: 12px; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.scoreboard { text-align: center; margin-bottom: 30px; }
.highlight { color: #f9e2af; font-size: 1.5em; }
.highlight-text { color: #f9e2af; font-weight: bold; }
.status { color: #f38ba8; font-weight: bold; font-size: 1.5em; margin-top: 10px; }
.fighters-container { display: flex; justify-content: space-between; align-items: stretch; gap: 20px; }
.fighter-card { background: #313244; padding: 20px; border-radius: 12px; flex: 1; text-align: center; border: 2px solid transparent; display: flex; flex-direction: column; }
.fighter-card.hero { border-color: #89b4fa; }
.fighter-card.boss { border-color: #f38ba8; }
.fighter-card.dead { opacity: 0.5; filter: grayscale(100%); }

.avatar { 
    font-size: 60px; 
    margin-bottom: 10px; 
    transition: transform var(--atk-speed, 0.3s) cubic-bezier(0.25, 0.8, 0.25, 1);
    display: inline-block;
}
.attack-dash-right { transform: translateX(30px)   }
.attack-dash-left { transform: translateX(-30px)   }

.hp-bar-bg { background: #45475a; height: 15px; border-radius: 8px; overflow: hidden; margin: 10px 0; }
.hp-bar { background: #a6e3a1; height: 100%; transition: width 0.1s linear; }
.hp-bar.boss-hp { background: #f38ba8; }
.hp-text { font-weight: bold; margin-bottom: 5px; }

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
    box-shadow: 0 4px 10px rgba(0,0,0,0.4);
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
    text-shadow: 0px 2px 4px rgba(0,0,0,0.8);
}

.vs-badge { font-size: 24px; font-weight: 900; color: #f9e2af; background: #45475a; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 0 15px rgba(249, 226, 175, 0.3); align-self: center;}
.signal-tag { font-size: 12px; color: #a6adc8; background: #181825; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: auto; }

.action-btn {
    background: #313244; color: white; border: none; font-size: 14px; font-weight: bold;
    cursor: pointer; padding: 8px 12px; border-radius: 20px; transition: all 0.2s ease;
}
.action-btn:hover { background: rgba(255, 255, 255, 0.2); transform: translateY(-1px); }
.action-btn:active { transform: translateY(1px); }

.skills-panel { display: flex; gap: 8px; justify-content: center; margin-bottom: 10px; }
.skill-btn { 
    background: #181825; color: #cdd6f4; border: 1px solid #585b70; 
    border-radius: 6px; padding: 6px 10px; cursor: pointer; font-size: 12px; font-weight: bold;
}
.skill-btn:hover:not(:disabled) { border-color: #89b4fa; background: #313244; }
.skill-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.buff-bar { height: 24px; display: flex; justify-content: center; gap: 5px; margin-bottom: 5px; }
.buff-badge { font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: bold; }
.buff-badge.haste { background: #89dceb; color: #11111b; box-shadow: 0 0 8px rgba(137, 220, 235, 0.5);}
.buff-badge.rage { background: #f38ba8; color: #11111b; box-shadow: 0 0 8px rgba(243, 139, 168, 0.5);}
</style>