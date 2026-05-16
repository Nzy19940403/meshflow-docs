import { useScheduler } from "@meshflow/core";

export function useHero(scheduler: ReturnType<typeof useScheduler>) {

    // ==========================================
    // 1. 静态蓝图节点 (Blueprint Nodes)
    // 职责：只存放原初配置数据（只读，换英雄/换怪物模板时才会变）
    // ==========================================
    const hero = scheduler.registerNode({
        path: 'heroA_blueprint',
        state: {
           
        },
        meta: {
            name: '白羊勇者',
            baseMaxLife: 100,
            baseAttack: 10,
            baseSpeed: 1.0,
            baseMaxEnergy: 100,
            innateSkills: [] // 英雄自带的天生技能线
        },
        type: 'blueprint',
        notifyKeys: new Set()
    }).createView();

    const boss = scheduler.registerNode({
        path: 'bossA_blueprint',
        state: {

        },
        meta: {
            name: '巨蟹魔王',
            baseMaxLife: 200,
            baseAttack: 15,
            baseSpeed: 0.5,
            baseMaxEnergy: 100,
            innateSkills: []
        },
        type: 'blueprint',
        notifyKeys: new Set()
    }).createView();

    // 静态武器/装备库节点
    const weaponANode = scheduler.registerNode({
        path: 'weaponA_blueprint',
        state: {
            weaponid: '1',
            triggerPanel:0,
            name: '斯安威斯坦',
            attackBonus: 10,
            speedBonus: 0.2,
            skills: [{ id: 's1', name: '时空加速', effect: 'haste', icon: '⚡' }] // 装备赋予的技能
        },
        meta: {},
        type: 'weapon_blueprint',
        notifyKeys: new Set()
    });
    console.log(weaponANode)
    const weaponA = weaponANode.createView()
    // ==========================================
    // 2. 运行时实体/面板节点 (Instance / Panel Nodes)
    // 职责：真正承载战场实例的动态状态，可独立复用、可被法庭回写
    // ==========================================
    const heroPanel = scheduler.registerNode({
        path: 'heroA_panel',
        state: {
            // --- 动态可变状态 (随时间、战斗实时改变，由法庭回写) ---
            life: 0,
            energy: 0,
            activeBuffs: [],
            showAttack: false,
            skillIntent: null,
            consumedSkillId: null,
            attacktargets: ['bossA_panel'],
            tickversion: 0,
            
            // 🌟 新增：由伤害法庭推演出来的“当年那帧的武器残影”
            historicalWeapon: null, 
    
            // --- 静态拼装组合出来的最终面板 ---
            staticMaxLife: 0,
            staticAttack: 0,
            staticSpeed: 0,
            maxEnergy: 0,
            availableSkills: [], // 汇聚了天生技能与 historicalWeapon 赋予的技能
    
            // --- 仅用于 UI 渲染的最终展示属性 ---
            displayAttack: 10,
            displaySpeed: 1.0,
            displayLife: 0,
            
            // 🌟 新增：用于 UI 按钮显示的当前历史武器名称
            displayWeaponName: '默认武器' 
        },
        meta: {},
        type: 'panel',
        notifyKeys: new Set()
    }).createView();
    const bossPanel = scheduler.registerNode({
        path: 'bossA_panel',
        state: {
            // --- 动态可变状态 ---
            life: 0,
            energy: 0,
            activeBuffs: [],
            showAttack: false,
            attacktargets: ['heroA_panel'],
            tickversion: 0,
            combatStats:{},
            // --- 静态拼装面板 ---
            staticMaxLife: 0,
            staticAttack: 0,
            staticSpeed: 0,
            maxEnergy: 0,

            // --- UI 渲染展示 ---
            displayAttack: 15,
            displaySpeed: 0.5,
            displayLife:0,
        },
        meta: {   },
        type: 'panel',
        notifyKeys: new Set()
    }).createView();

    // 武器插槽选择器（用来控制当前 Panel 装备了什么武器）
    const weaponPanelnode = scheduler.registerNode({
        path: 'weapon_panel',
        state: {
            triggerPanel: 0,
            choosedWeapon: null // 存放当前装配的武器快照
        },
        meta: {},
        type: 'panel',
        notifyKeys: new Set()
    });

    console.log(weaponPanelnode)
    const weaponPanel = weaponPanelnode.createView()

    // ==========================================
    // 3. 全局公共/工具节点 (Global Tool Nodes)
    // ==========================================
    const damageCourt = scheduler.registerNode({
        path: 'damageCourt',
        state: {
            actions: {},
            currentTick: 0
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
        weaponA, weaponPanel,
        damageCourt,
        tick
    }
}