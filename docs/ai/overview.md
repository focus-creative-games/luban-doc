---
sidebar_position: 1
---

# AI 支持概览

Luban 为 AI Agent / IDE 提供多层能力，可按需组合：

| 层 | 用途 | 入口 |
|----|------|------|
| Skills | 教 Agent 正确加表、改 schema、排错 | [官方 Skills](./skills) |
| 速查 / llms.txt | 短上下文与站点索引 | [速查](./cheat-sheet)、站点根 `/llms.txt` |
| Luban.Agent | 校验 / 查 schema / list / describe（JSON stdout） | [Agent CLI](./agent-cli) |
| schema-json + errorFormat | 主生成器侧机器可读输出 | [schema-json](./schema-json) |
| MCP | IDE 里调工具 + 搜文档 | [Luban MCP](./mcp) |

三个可执行入口职责不同：

| 程序 | 目录（示例工程构建后） | 用途 |
|------|------------------------|------|
| `Luban` | `luban_examples/Tools/Luban` | 主生成器（代码 / 数据） |
| `Luban.Agent` | `luban_examples/Tools/Luban.Agent` | Agent / 脚本只读查询与校验 |
| `Luban.Mcp` | `luban_examples/Tools/Luban.Mcp` | MCP Server（进程外调 Agent + 主 CLI） |

## 原则

- **Schema 是契约**：数据不符合应报错，不要让 AI 为了「生成成功」擅自改定义。
- **先读工程约定**：项目内 `AGENTS.md` / `.cursor/rules` 优先于通用习惯。
- **发布用 `--strict`**；生成排错用主 CLI `--errorFormat json`；查询/校验优先用 `Luban.Agent`。

## 快速开始

1. 读本页与 [速查](./cheat-sheet)。
2. 把仓库 `ai/skills/` 下需要的 skill 复制到项目 `.cursor/skills/`。
3. 用示例工程脚本一次性编译三个工具（需与 `luban` 源码仓库并列）：

```bash
# Windows
luban_examples/Tools/build-luban.bat

# macOS / Linux
luban_examples/Tools/build-luban.sh
```

产出目录：`Tools/Luban`、`Tools/Luban.Agent`、`Tools/Luban.Mcp`。

4. 查询与校验用 [Luban.Agent](./agent-cli)；IDE 集成配置 [MCP](./mcp)。
