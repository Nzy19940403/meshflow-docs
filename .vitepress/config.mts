import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "@meshflow/core",
  description: "确定性拓扑编排引擎 — 基于逻辑力场的响应式拓扑调度，终结异步竞态与计算冗余。",
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0a0a0f' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    // Google Fonts - JetBrains Mono for cyberpunk feel
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap' }],
  ],
  vite: {
    ssr: {
      noExternal: ['pixi.js']
    },
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '主页', link: '/' },
          { text: '入门指南', link: '/guide/getting-started' },
          { text: '路线图', link: '/roadmap' },
          { text: 'API', link: '/docs/api/README' }
        ],
        sidebar: [
          {
            text: '核心架构',
            items: [
              { text: '快速开始', link: '/guide/getting-started' },
              { text: '为什么选择 MeshFlow', link: '/guide/why-meshflow' },
              { text: '有向执行流 (SetRule)', link: '/guide/setrule-concepts' },
              { text: '对称纠缠场 (UseEntangle)', link: '/guide/useentangle-concepts' },
            ]
          },
          {
            text: '案例',
            items: [
              { text: '工厂级复杂表单', link: '/demos/factory' },
              { text: '云计算资源调度', link: '/demos/cloud' },
              { text: '逻辑门演示', link: '/demos/logicGate' },
              { text: '纠缠震荡排序', link: '/demos/sort' },
              { text: '循环依赖收敛演示', link: '/demos/matrix' },
              { text: '优先级溢流调度', link: '/demos/spillover' },
              { text: '数独震荡', link: '/demos/sudoku' },
              { text: '蜘蛛纸牌', link: '/demos/cardgame.md' },
              { text: '战斗数值模拟', link: '/demos/hero.md' }
            ]
          }
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: 'Roadmap', link: '/en/roadmap' }
        ],
        sidebar: [
          {
            text: 'Architecture',
            items: [
              { text: 'Getting Started', link: '/en/guide/getting-started' },
              { text: 'Directed Flow (SetRule)', link: '/en/guide/setrule-concepts' },
              { text: 'Symmetric Entangle (UseEntangle)', link: '/en/guide/useentangle-concepts' },
            ]
          },
          {
            text: 'Demos',
            items: [
              { text: 'Sudoku', link: '/en/demos/sudoku' }
            ]
          }
        ]
      }
    }
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Nzy19940403/meshflow' }
    ],
    footer: {
      message: '⧩ MeshFlow — 确定性拓扑编排引擎',
      copyright: 'MIT License'
    }
  },
})
