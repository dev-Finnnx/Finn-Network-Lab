# 每日学习日志

## 记录模板
```text
Date:
Study:
Lab:
Problem:
Solution:
Summary:
```

## 2026-08-08
**Study**：Eth-Trunk 链路聚合  
**Lab**：完成 SW1-SW2 两条链路的聚合规划  
**Problem**：成员接口状态不一致，Eth-Trunk 未正常 Up  
**Solution**：统一成员接口的链路类型、速率与聚合模式，重新检查 `display eth-trunk`。  
**Summary**：理解链路聚合如何同时提升带宽利用率和链路可靠性。

## 下一步
- 补充真实 eNSP 截图
- 完成 Trunk 与 STP 实验
- 将每次验证命令复制进对应文章

## 2026-08-10
**Study**：GRE Tunnel 隧道技术  
**Lab**：在 AR1 与 AR3 之间建立 Tunnel0/0/0，实现 10.1.1.0/24 与 10.1.2.0/24 互通  
**Problem**：理解 Tunnel 建立后，为什么还需要缺省路由和指向 Tunnel 的业务静态路由  
**Solution**：区分 GRE 外层承载地址（12.1.1.1 → 23.1.1.3）与内层业务地址（10.1.1.2 → 10.1.2.2），分别检查外层和业务目的地址匹配的路由。  
**Summary**：外层靠底层路由找到对端，内层靠业务路由进入 Tunnel；具体路由优先于缺省路由。

