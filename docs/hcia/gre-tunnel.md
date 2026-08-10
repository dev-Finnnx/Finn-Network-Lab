# GRE Tunnel 实验：利用 GRE 隧道实现跨网段通信

> 实验环境：Huawei VRP / eNSP　　记录日期：2026-08-10

## 实验原始拓扑

下图是老师课堂中使用的原始拓扑及 GRE 配置提示：

![老师提供的 GRE Tunnel 实验拓扑](/Finn-Network-Lab/images/gre-tunnel/original-topology.png)

为了更直观地区分底层物理路径与 GRE 逻辑路径，整理后的拓扑如下：

![整理后的 GRE Tunnel 实验拓扑](/Finn-Network-Lab/images/gre-tunnel/topology.png)

## 一、实验目的

本次实验在 AR1 和 AR3 之间建立 GRE（Generic Routing Encapsulation，通用路由封装）隧道，使两个不同业务网段——10.1.1.0/24 和 10.1.2.0/24——能够通过逻辑上的点到点通道互通。实验重点是理解 Tunnel 接口、GRE 的 source/destination、缺省路由、指向 Tunnel 的静态路由，以及“外层承载路径”和“内层业务路径”的区别。

## 二、拓扑与地址规划

物理网络为 **AR1 → AR2 → AR3**，GRE 逻辑路径为 **AR1 ⇄ AR3**。AR2 只负责承载 GRE 外层报文。

| 设备 | 接口 | IP 地址 | 用途 |
|---|---|---|---|
| AR1 | GE0/0/0 | 12.1.1.1/24 | 连接 AR2 |
| AR1 | GE0/0/1 | 10.1.1.1/24 | 连接 PC1 |
| AR1 | Tunnel0/0/0 | 10.2.1.1/24 | GRE 隧道 |
| AR2 | GE0/0/0 | 12.1.1.2/24 | 连接 AR1 |
| AR2 | GE0/0/1 | 23.1.1.2/24 | 连接 AR3 |
| AR3 | GE0/0/0 | 23.1.1.3/24 | 连接 AR2 |
| AR3 | GE0/0/1 | 10.1.2.1/24 | 连接 PC2 |
| AR3 | Tunnel0/0/0 | 10.2.1.2/24 | GRE 隧道 |
| PC1 | Ethernet | 10.1.1.2/24，网关 10.1.1.1 | 用户终端 |
| PC2 | Ethernet | 10.1.2.2/24，网关 10.1.2.1 | 用户终端 |

## 三、GRE 原理：内层负责业务，外层负责承载

PC1 访问 PC2 时，原始业务报文的内层地址是：

```text
10.1.1.2 → 10.1.2.2
```

GRE 在原始报文外再增加一个 IP 头部，外层地址为：

```text
12.1.1.1 → 23.1.1.3
```

因此，AR1 首先要通过底层路由找到 AR3 的外层地址；报文到达 AR3 后解封装，再根据业务路由交付给 PC2。可以记住：**内层负责业务，外层负责承载；Tunnel 提供通道，路由决定哪些业务进入通道。**

## 四、设备配置

### AR1

```text
system-view

interface GigabitEthernet 0/0/0
 ip address 12.1.1.1 255.255.255.0
 quit

interface GigabitEthernet 0/0/1
 ip address 10.1.1.1 255.255.255.0
 quit

interface Tunnel 0/0/0
 ip address 10.2.1.1 255.255.255.0
 tunnel-protocol gre
 source 12.1.1.1
 destination 23.1.1.3
 quit

ip route-static 0.0.0.0 0.0.0.0 12.1.1.2
ip route-static 10.1.2.0 255.255.255.0 Tunnel0/0/0
return
```

缺省路由用于让 AR1 找到 GRE 对端 23.1.1.3；业务静态路由则明确告诉 AR1：前往 10.1.2.0/24 的报文进入 Tunnel。

### AR2

```text
system-view

interface GigabitEthernet 0/0/0
 ip address 12.1.1.2 255.255.255.0
 quit

interface GigabitEthernet 0/0/1
 ip address 23.1.1.2 255.255.255.0
 quit
return
```

AR2 两侧都是直连网段，因此本实验不需要额外静态路由。

### AR3

```text
system-view

interface GigabitEthernet 0/0/0
 ip address 23.1.1.3 255.255.255.0
 quit

interface GigabitEthernet 0/0/1
 ip address 10.1.2.1 255.255.255.0
 quit

interface Tunnel 0/0/0
 ip address 10.2.1.2 255.255.255.0
 tunnel-protocol gre
 source 23.1.1.3
 destination 12.1.1.1
 quit

ip route-static 0.0.0.0 0.0.0.0 23.1.1.2
ip route-static 10.1.1.0 255.255.255.0 Tunnel0/0/0
return
```

AR3 的 source/destination 与 AR1 对调，业务回程路由指向 Tunnel。

## 五、验证流程

不要一上来就从 PC1 ping PC2，建议按层次排查：

```text
display ip interface brief
ping 12.1.1.2                 // AR1 检查 AR2
ping 23.1.1.3                 // AR2 或 AR3 检查直连
display interface Tunnel 0/0/0
ping 10.2.1.2                 // AR1 检查 Tunnel 对端
display ip routing-table
display ip routing-table 23.1.1.3   // 查看 GRE 外层路径
display ip routing-table 10.1.2.2   // 查看业务路径
```

最终在 PC1、PC2 上分别测试：

```text
PC1> ping 10.1.2.2
PC2> ping 10.1.1.2
```

在 AR1 上查询 23.1.1.3 时，通常匹配 `0.0.0.0/0`，下一跳为 12.1.1.2，说明 GRE 外层报文经 AR2 承载；查询 10.1.2.2 时，应匹配更具体的 10.1.2.0/24，并从 Tunnel0/0/0 转发。这里体现了**最长前缀匹配原则：具体路由优先于缺省路由**。

`tracert 10.1.2.2` 不一定会显示 AR1→AR3 的完整逻辑路径，因为 GRE 会隐藏部分底层承载网络；业务上看到的是 Tunnel，底层实际仍然经过 AR2。

## 六、常见故障排查

1. **source 和 destination 写反**：AR1 为 `12.1.1.1 → 23.1.1.3`，AR3 必须反向配置。
2. **Tunnel 地址不一致**：AR1 为 10.2.1.1/24，AR3 为 10.2.1.2/24。
3. **缺省路由下一跳错误**：AR1 指向 12.1.1.2，AR3 指向 23.1.1.2，下一跳必须是 AR2 的接口地址。
4. **业务路由方向错误**：AR1 将 10.1.2.0/24 指向 Tunnel，AR3 将 10.1.1.0/24 指向 Tunnel。
5. **只建 Tunnel 没配业务路由**：Tunnel 只是逻辑通道，不会自动决定业务网段的转发方向。

## 七、实验总结

本次实验通过在 AR1 和 AR3 之间建立 Tunnel0/0/0，实现了 10.1.1.0/24 与 10.1.2.0/24 两个业务网段的逻辑互通。我理解了 GRE 的封装过程，以及外层地址 12.1.1.1/23.1.1.3 与内层业务地址 10.1.1.2/10.1.2.2 的区别。

实验中最重要的收获不是记住几条命令，而是理解了：**GRE 隧道本身只提供逻辑通道，底层路由负责找到隧道对端，上层业务路由负责决定哪些数据进入隧道。**

最终记忆口诀：

> **外层靠底层路由找对端，内层靠 Tunnel 路由进隧道；具体路由优先于缺省路由。**

