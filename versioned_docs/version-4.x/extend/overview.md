---
sidebar_position: 1
---

# 扩展点概览

Luban 用插件式扩展点工作。二次开发时优先**新增扩展程序集**，而不是改 Core 打补丁。

## 扩展点地图

| 扩展点 | 作用 |
|--------|------|
| Pipeline | 整条生成管线 |
| SchemaCollector / SchemaLoader | 如何收集、解析 schema |
| DataLoader | 新数据源格式 |
| DataValidator | 新校验规则 |
| CodeTarget | 新语言/代码风格输出 |
| DataTarget | 新数据格式 |
| CodeStyle | 命名风格 |
| PostProcess | 生成后处理 |
| OutputSaver | 输出到哪里 |
| TextProvider | 本地化文本源 |

启动时会扫描带注册标记的 `Luban*.dll`（见源码 SimpleLauncher）。

## 嵌入调用

也可在自己的工具里引用 Luban.Core，构造 Pipeline 运行，而不走命令行。

## 相关链接

- [自定义模板](./templates)
- [插件项目](./plugins)
- [管线概览](../concepts/pipeline)
