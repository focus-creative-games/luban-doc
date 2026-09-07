---
sidebar_position: 1
---

# 术语表

全文统一使用下表说法。

| 术语 | 含义 |
|------|------|
| **Schema** | 配置结构定义（表、bean、枚举、字段类型等） |
| **Data** | 符合 Schema 的实例数据 |
| **table** | 一张配置表的元信息：输入文件、主键、mode、value 类型等 |
| **bean** | 结构体类型；可继承，抽象 bean 表示多态基类 |
| **enum** | 枚举；可 flags |
| **field** | bean 或表记录上的字段 |
| **group** | 导出分组，常见 `c`（客户端）、`s`（服务器）、`e`（编辑器） |
| **target** | 一次生成任务的命名配置（如 `client`），绑定若干 groups 与 topModule |
| **codeTarget** | 代码生成器名，如 `cs-bin`、`cs-simple-json` |
| **dataTarget** | 数据生成器名，如 `bin`、`json` |
| **Tables** | 生成的配置入口类（名字由 target.manager 决定，默认常为 `Tables`） |
| **TbXxx** | 单张表的生成类型，持有字典/列表与查找方法 |
| **tag** | 记录级标签，用于 include/exclude 过滤 |
| **variant** | 字段变体（如多语言列 `name@en`） |
| **luban.conf** | 工程根配置：dataDir、schemaFiles、groups、targets |

## 易混点

- **group vs target**：group 是「内容标签」；target 是「这次导出要哪些 group + 生成选项」。
- **table vs TbXxx**：table 是 schema 里的定义；`TbXxx` 是生成出来的 C#/Java 类。
- **bean vs 行**：map/list 表的一行通常对应一个 bean 实例（valueType）。

## 相关链接

- [luban.conf](./luban-conf)
- [groups 与 targets](./groups-targets)
