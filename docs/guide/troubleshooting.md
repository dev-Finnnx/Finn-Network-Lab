# 网络故障排查方法

## PC 无法访问服务器
1. 检查物理链路与网线连接
2. 查看接口状态、速率和双工模式
3. 确认 VLAN、Access/Trunk 配置
4. 查看 MAC 地址表是否学习到终端
5. 查看 ARP 表和网关可达性
6. 检查静态路由或动态路由邻居
7. 检查 ACL、NAT 和防火墙策略

## 常用验证命令
```text
display interface brief
display vlan
display mac-address
display arp
display ip routing-table
display current-configuration
```

## 记录原则
每一步都记录“现象 → 命令 → 输出 → 判断 → 下一步”，避免只记录最终结论。

