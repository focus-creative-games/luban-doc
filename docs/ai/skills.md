---
sidebar_position: 3
---

# 官方 Skills

Skills 是给 Cursor / Claude Code 等 Agent 的专项操作手册。官方源码在 Luban 仓库的 `ai/skills/`。

## 安装

复制到项目（任选所需）：

```text
ai/skills/luban-add-table      →  .cursor/skills/luban-add-table/
ai/skills/luban-schema-design  →  .cursor/skills/luban-schema-design/
ai/skills/luban-excel-fill     →  .cursor/skills/luban-excel-fill/
ai/skills/luban-generate-debug →  .cursor/skills/luban-generate-debug/
ai/skills/luban-validator      →  .cursor/skills/luban-validator/
ai/skills/luban-runtime-load   →  .cursor/skills/luban-runtime-load/
```

也可整目录复制后按需启用。示例工程 `MiniTemplate` / `DataTables` 已带 `AGENTS.md` 与 Cursor rules，可与 Skills 一起用。

## Skill 一览

| Skill | 何时使用 |
|-------|----------|
| `luban-add-table` | 新增数据表并导出 |
| `luban-schema-design` | 设计 bean / 枚举 / 多态 / 容器 |
| `luban-excel-fill` | 按约定填 Excel / 解释表头 |
| `luban-generate-debug` | 生成失败排查 |
| `luban-validator` | 写引用/范围等校验 |
| `luban-runtime-load` | 运行时 Tables 加载 |

## 与 MCP 配合

Skill 负责「怎么做」；[MCP](./mcp) 负责「查当前 schema / 跑生成 / 搜文档」。复杂改表时建议两者一起开。
