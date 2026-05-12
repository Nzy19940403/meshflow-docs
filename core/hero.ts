import { useScheduler } from "@meshflow/core";

export function useHero(scheduler: ReturnType<typeof useScheduler>) {

    // ==========================================
    // 1. 本体状态节点 (State Node)
    // 职责：记录在战斗中不断变化的易失性数据（血条、能量、身上的Buff状态）
    // ==========================================
    const hero = scheduler.registerNode({
        path: 'heroA',
        state: {
            attacktargets: ['bossA'],
            life: 100,
            energy: 0,
            activeBuffs: [], // 例如：['haste', 'rage']
            showAttack: false
        },
        meta: { tickversion: 0 },
        type: 'hero',
        notifyKeys: new Set()
    }).createView();

    const boss = scheduler.registerNode({
        path: 'bossA',
        state: {
            attacktargets: ['heroA'],
            life: 200,
            energy: 0,
            activeBuffs: [],
            showAttack: false
        },
        meta: { tickversion: 0 },
        type: 'boss',
        notifyKeys: new Set()
    }).createView();

    const weapon = scheduler.registerNode({
        path: 'weaponA',
        state: { },
        meta: { 
            attack:10,
            speed:0.2    
        },
        type: 'weapon',
        notifyKeys: new Set()
    }).createView();

    // ==========================================
    // 2. 面板计算节点 (Panel Node) -> 🚀 新增！
    // 职责：根据基础属性和外挂的 Buff、装备，实时推导出当时的“最终属性”
    // ==========================================
    const heroPanel = scheduler.registerNode({
        path: 'heroA_panel',
        state: {
            baseAttack: 10,
            baseSpeed: 1,
            maxEnergy: 100,
            // 以下是会被 SetRule 覆盖的最终计算值
            currentAttack: 10,  
            currentSpeed: 1     
        },
        meta: {},
        type: 'panel',
        notifyKeys: new Set()
    }).createView();

    const bossPanel = scheduler.registerNode({
        path: 'bossA_panel',
        state: {
            baseAttack: 15,
            baseSpeed: 0.5,
            maxEnergy: 100,
            currentAttack: 15,
            currentSpeed: 0.5
        },
        meta: {},
        type: 'panel',
        notifyKeys: new Set()
    }).createView();

    // ==========================================
    // 3. 纯净的裁决节点 (Court Node)
    // 职责：只看传过来的“最终伤害值”，进行扣血结算。绝对不知道 Buff 的存在。
    // ==========================================
    const damageCourt = scheduler.registerNode({
        path: 'damageCourt',
        state: {
            actions: {}
        },
        meta: {},
        type: 'tool',
        notifyKeys: new Set()
    }).createView();

    const tick = scheduler.registerNode({
        path: 'tick',
        state: {
            tickversion: 0,
            running: false
        },
        meta: {},
        type: 'tool',
        notifyKeys: new Set()
    }).createView();

    return {
        hero, heroPanel,
        boss, bossPanel,
        damageCourt,
        tick
    }
}