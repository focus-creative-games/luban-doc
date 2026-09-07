---
sidebar_position: 1
slug: /intro
---

# 什么是 Luban

Luban 是面向游戏项目的**配置解决方案**：用统一的类型系统描述配置结构，从 Excel / JSON / XML 等读入数据，校验后生成多语言代码与多种数据格式。

它解决的不是「把 Excel 转成 JSON」这一件事，而是把策划填表、程序加载、客户端/服务器分端导出、复杂 GamePlay 数据（技能、行为树、副本等）放进**同一套管线**。

## 适合谁

| 角色 | 你会用到什么 |
|------|----------------|
| 程序 | 定义 schema、写生成命令、在运行时用 `Tables` 加载 |
| 策划 | 按约定在 Excel（或编辑器导出的 JSON）里填数据 |

## 核心能力（一览）

- **类型系统**：基础类型、枚举、bean、继承/多态、容器、可空
- **多数据源**：Excel 族、JSON、XML、YAML、Lua 等
- **多端导出**：groups / targets 控制客户端、服务器、编辑器各自拿到什么
- **校验**：引用、范围、资源路径等，尽量在生成期发现错误
- **多语言与多格式**：C# / Java / Go / Lua / TS…；bin / json / protobuf…
- **可扩展**：Loader、Validator、CodeTarget、DataTarget、Pipeline 均可插件化

完整能力清单见 [Luban 能力清单](./reference/features)。

## 适用与不适用

**适合**

- 需要前后端共用同一套配置定义
- 表结构会从「扁平行列表」长到嵌套、多态
- 希望生成强类型加载代码，而不是手写解析

**不太适合**

- 只有几张极简 KV，且永远不需要类型/校验/多端
- 完全拒绝程序维护 schema（Luban 把 **schema 当作契约**：数据不符合应报错，而不是改定义）

## 官方资源

- 示例工程：[luban_examples](https://github.com/focus-creative-games/luban_examples)（含 MiniTemplate 与多引擎示例）
- 源码：[luban](https://github.com/focus-creative-games/luban)
- Unity Runtime：[luban_unity](https://github.com/focus-creative-games/luban_unity)
- QQ 群：692890842 · Discord：见仓库 README

## 下一步

- 程序：先读 [5 分钟心智模型](./mental-model) → [快速上手](./guide/install)
- 从 4.x 升级：先看 [更新说明](./other/whats-new)
- 策划：直接看 [策划填表指南](./designer/concepts)
- AI / Agent：[AI 支持概览](./ai/overview)
- 想知道文档怎么组织：[文档怎么读](./how-to-read)
