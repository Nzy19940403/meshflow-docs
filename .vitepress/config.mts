import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "@meshflow/core",
  description: "确定性拓扑编排引擎",
  head: [
    // 这里的路径填刚才放在 public 里的文件名
    ['link', { rel: 'icon', href: '/logo.svg' }] 
 
  ],
  // 核心：多语言配置
  locales: {
    // 默认语言（简体中文）- 对应根目录 docs/*.md
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '主页', link: '/' },
          { text: '入门指南', link: '/guide/getting-started' },
          { text: '路线图', link: '/roadmap' },
          {text:'API',link:'/docs/api/README'}
        ],
        sidebar: [
          {
            text: '核心架构',
            items: [
              { text: '快速开始', link: '/guide/getting-started' },
              { text: '有向执行流 (SetRule)', link: '/guide/setrule-concepts' },
              { text: '对称纠缠场 (UseEntangle)', link: '/guide/useentangle-concepts' },
            ]
          },
          {
            text: '案例',
            items: [
              { text: '工厂级复杂表单', link: '/demos/factory' },
              { text: '云计算资源调度', link: '/demos/cloud' },
              { text: '纠缠震荡排序', link: '/demos/sort' },
              { text: '循环依赖收敛演示', link: '/demos/matrix' },
              { text:'优先级溢流调度',link:'/demos/spillover'},
              {text:'数独震荡',link:'/demos/sudoku'}
            ]
          }
        ]
      }
    },
    // 英文配置 - 对应 docs/en/*.md
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
              // { text: 'Industrial Form', link: '/en/demos/factory' },
              // { text: 'Cloud Computing', link: '/en/demos/cloud' },
              // { text: 'Mesh Sorting', link: '/en/demos/sort' },
              {text:'sudoku',link:'/en/demos/sudoku'}
            ]
          }
        ]
      }
    }
  },

  themeConfig: {
    // 这里放中英文通用的配置，如 Github 链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo/meshflow' }
    ]
  }
})