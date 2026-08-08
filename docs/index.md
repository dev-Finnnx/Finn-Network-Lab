<script setup>
const stats = [{ value: 'HCIA', label: '当前阶段' }, { value: '100', label: '实验目标' }, { value: 'AI × NET', label: '长期方向' }]
</script>

<div class="hero-intro">

# 🌐 Finn Network Lab

## 从 HCIA 到 HCIE 的网络工程师成长记录

我是 Finn，一名正在把人工智能、网络工程与通信技术连接起来的学生。这里记录我的 eNSP 实验、华为设备配置、企业网络设计和每一次故障排查。

<div class="actions"><a class="VPButton medium brand" href="/guide/roadmap">查看学习路线</a><a class="VPButton medium alt" href="/hcia/eth-trunk">阅读首篇实验</a></div>
</div>

<div class="stats-grid"><div v-for="stat in stats" :key="stat.label" class="stat-card"><strong>{{ stat.value }}</strong><span>{{ stat.label }}</span></div></div>

## 正在构建的能力

::: details 🔌 网络基础
VLAN、Trunk、Eth-Trunk、STP、OSPF、VRRP、DHCP、ACL 与 NAT。
:::
::: details 🏢 企业网络
从拓扑规划、地址设计，到可靠性、路由策略与安全边界。
:::
::: details 🤖 网络自动化
用 Python 和 AI 工具减少重复配置，让网络运维更可观测、更可靠。
:::

## 学习进度

### HCIA · 网络基础
交换与路由实验持续更新中
<div class="progress"><span style="width: 38%"></span></div>

### 企业园区网项目
完成总体拓扑与技术选型
<div class="progress"><span style="width: 24%"></span></div>

## 精选内容

| 类型 | 内容 | 状态 |
| --- | --- | --- |
| 实验 | [Eth-Trunk 链路聚合配置详解](/hcia/eth-trunk) | ✅ 已完成 |
| 项目 | [中小企业园区网络建设](/enterprise-network/campus-network) | 🚧 Developing |
| 方法 | [PC 无法访问服务器的排查流程](/guide/troubleshooting) | 📝 持续整理 |

> 每一次实验都要留下配置、验证结果和问题复盘。欢迎通过 GitHub Issue 交流。

<style>
.hero-intro { padding: 56px 0 24px; max-width: 820px; }
.hero-intro h1 { font-size: clamp(2.7rem, 7vw, 5rem); line-height: 1.05; margin-bottom: 12px; letter-spacing: -0.04em; }
.hero-intro h2 { color: var(--vp-c-brand-1); font-size: clamp(1.25rem, 3vw, 2rem); margin-top: 0; }
.hero-intro p { font-size: 1.08rem; line-height: 1.9; color: var(--vp-c-text-2); }
.actions { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
.stats-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin: 28px 0 58px; }
.stat-card { padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 14px; background: var(--vp-c-bg-soft); }
.stat-card strong, .stat-card span { display:block; }.stat-card strong { color: var(--vp-c-brand-1); font-size: 1.7rem; }.stat-card span { color: var(--vp-c-text-2); margin-top: 5px; }
@media (max-width: 640px) { .stats-grid { grid-template-columns: 1fr; } }
</style>

