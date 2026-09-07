---
sidebar_position: 2
---

# 5 分钟心智模型

Luban 整条链路可以记成四步：

```text
Schema（结构契约） → Data（填表数据） → Generate（生成） → Runtime（Tables 加载）
```

## 一张图

```text
┌─────────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Schema     │     │  Data       │     │  Generate    │     │  Runtime    │
│  表/bean/枚举│ ──► │  Excel/JSON │ ──► │  代码+数据文件│ ──► │  new Tables │
│  luban.conf │     │  校验、分组  │     │  -c / -d     │     │  tables.TbX │
└─────────────┘     └─────────────┘     └──────────────┘     └─────────────┘
```

## 四个词

| 词 | 含义 |
|----|------|
| **Schema** | 配置「长什么样」：有哪些表、字段类型、主键、继承关系。可写在 Excel（`__tables__` 等）或 XML |
| **Data** | 配置「填了什么」：Excel 行、JSON 文件等。必须符合 Schema |
| **Target / Group** | 导出给谁：例如 client 只要 `c` 分组字段，server 只要 `s` |
| **Tables** | 生成代码里的入口类：一个对象持有所有表，加载与查找都从它开始 |

## Schema 是契约

- 程序（或程序+主策）维护 Schema。
- 策划在 Data 里填值。
- **数据不符合 Schema → 生成失败并报错**，而不是静默改 Schema。

这一点贯穿全文：Luban 把「结构清晰、可 review、可校验」放在「少改几行定义」之上。

## 运行时推荐形态

生成代码后，推荐：

```csharp
var tables = new cfg.Tables(loader);
var item = tables.TbItem.Get(1001);
```

即：**一个 `Tables` 实例聚合所有表**。不要为每张表再造一套全局静态单例——加载、热更、测试都会更难。

## 和「Excel 导出器」的差别

| 简单导出器 | Luban |
|------------|--------|
| 表头 ≈ 全部类型系统 | 独立 Schema，Excel 只是数据视图之一 |
| 多半只出 JSON/Lua | 统一类型 → 多语言代码 + 多数据格式 |
| 复杂结构靠约定/字符串 | bean / 多态 / 容器是一等公民 |

## 下一步

- [文档怎么读](./how-to-read)
- [安装与获取工具](./guide/install)
