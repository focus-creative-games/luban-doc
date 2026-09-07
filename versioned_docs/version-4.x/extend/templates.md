---
sidebar_position: 2
---

# 自定义模板

代码生成默认使用 **Scriban** 模板（`.sbn`）。

## 搜索顺序

1. `--customTemplateDir` 指定目录  
2. 发布包内 `Templates/`（或各语言项目下 Templates）

覆盖某语言时，复制对应 `bean.sbn` / `table.sbn` / `tables.sbn` 等再改。

## 常用模板变量（摘要）

| 变量 | 含义 |
|------|------|
| `__ctx` | 生成上下文 |
| `__name` / `__namespace` | 名与命名空间 |
| `__top_module` | target.topModule |
| `__code_style` | 命名风格 |
| `__bean` / `__table` / `__enum` | 当前类型 |
| `__tables` | 表集合（生成 Tables 时） |

## 相关链接

- [插件项目](./plugins)
- [代码风格](../runtime/code-style)
