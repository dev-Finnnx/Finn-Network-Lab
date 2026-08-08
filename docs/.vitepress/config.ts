import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Finn Network Lab',
  description: '从 HCIA 到 HCIE 的网络工程师成长记录',
  lang: 'zh-CN',
  base: '/Finn-Network-Lab/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '🌐',
    siteTitle: 'Finn Network Lab',
    nav: [
      { text: '首页', link: '/' },
      { text: '学习路线', link: '/guide/roadmap' },
      { text: '实验记录', link: '/hcia/eth-trunk' },
      { text: '项目实践', link: '/enterprise-network/campus-network' },
      { text: 'GitHub', link: 'https://github.com/' }
    ],
    sidebar: {
      '/guide/': [{ text: '学习指南', items: [
        { text: '学习路线', link: '/guide/roadmap' },
        { text: '每日学习日志', link: '/guide/daily-log' },
        { text: '故障排查方法', link: '/guide/troubleshooting' }
      ] }],
      '/hcia/': [{ text: 'HCIA 实验', items: [
        { text: 'Eth-Trunk 链路聚合', link: '/hcia/eth-trunk' }
      ] }],
      '/enterprise-network/': [{ text: '企业网络', items: [
        { text: '中小企业园区网', link: '/enterprise-network/campus-network' }
      ] }]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/' }],
    search: { provider: 'local' },
    editLink: { pattern: 'https://github.com/YOUR_USERNAME/Finn-Network-Lab/edit/main/docs/:path' },
    footer: { message: 'AI + Network + Communication', copyright: 'Copyright © 2026 Finn' }
  },
  markdown: { theme: { light: 'github-light', dark: 'github-dark' } },
  head: [
    ['meta', { name: 'theme-color', content: '#1677ff' }],
    ['meta', { property: 'og:title', content: 'Finn Network Lab' }],
    ['meta', { property: 'og:description', content: '从 HCIA 到 HCIE 的网络工程师成长记录' }]
  ]
})


