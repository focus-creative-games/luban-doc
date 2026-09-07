---
sidebar_position: 1
---

# AI 支持概览

Luban 为 AI Agent / IDE 提供四层能力，可按需组合：

| 层 | 用途 | 入口 |
|----|------|------|
| Skills | 教 Agent 正确加表、改 schema、排错 | [官方 Skills](./skills) |
| 速查 / llms.txt | 短上下文与站点索引 | [速查](./cheat-sheet)、站点根 `/llms.txt` |
| schema-json + errorFormat | 机器可读 schema / 报错 | [schema-json](./schema-json) |
| MCP | 查 schema、校验/生成、搜文档 | [Luban MCP](./mcp) |

## 原则

- **Schema 是契约**：数据不符合应报错，不要让 AI 为了「生成成功」擅自改定义。
- **先读工程约定**：项目内 `AGENTS.md` / `.cursor/rules` 优先于通用习惯。
- **发布用 `--strict`**；给 Agent 排错时加 `--errorFormat json`。

## 快速开始（Agent）

1. 读本页与 [速查](./cheat-sheet)。
2. 把仓库 `ai/skills/` 下需要的 skill 复制到项目 `.cursor/skills/`（或按 Cursor 文档安装）。
3. 需要交互式查表/跑生成时，配置 [MCP](./mcp)。
