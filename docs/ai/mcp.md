---
sidebar_position: 5
---

# Luban MCP

`Luban.Mcp` 是基于 stdio 的 MCP Server。

- 查询 / 校验 / describe → 调用 **Luban.Agent**
- 生成 → 调用主 **Luban.dll**
- 搜文档 → 本地检索 `LUBAN_DOC`

## 构建

推荐一次性构建三个工具（`luban` 与 `luban_examples` 并列）：

```bash
# Windows
luban_examples/Tools/build-luban.bat

# macOS / Linux
luban_examples/Tools/build-luban.sh
```

产物目录：

| 目录 | 内容 |
|------|------|
| `Tools/Luban` | 主生成器 `Luban.dll` |
| `Tools/Luban.Agent` | Agent CLI `Luban.Agent.dll` |
| `Tools/Luban.Mcp` | MCP Server `Luban.Mcp.dll` |

也可在 Luban 源码仓库内分别编译：

```bash
dotnet build src/Luban/Luban.csproj -c Release -o <out>/Luban
dotnet build src/Luban.Agent/Luban.Agent.csproj -c Release -o <out>/Luban.Agent
dotnet build src/Luban.Mcp/Luban.Mcp.csproj -c Release -o <out>/Luban.Mcp
```

## 环境变量

| 变量 | 含义 |
|------|------|
| `LUBAN_AGENT_DLL` | `Luban.Agent.dll`（ListTables / GetSchema / Describe / Validate） |
| `LUBAN_DLL` | `Luban.dll`（Generate） |
| `LUBAN_DOC` | `luban-doc/docs`（SearchDocs） |

## Cursor 配置示例

假设示例工程在 `D:/workspace/luban_examples`，且已跑过 `Tools/build-luban.bat`：

```json
{
  "mcpServers": {
    "luban": {
      "command": "dotnet",
      "args": ["D:/workspace/luban_examples/Tools/Luban.Mcp/Luban.Mcp.dll"],
      "env": {
        "LUBAN_AGENT_DLL": "D:/workspace/luban_examples/Tools/Luban.Agent/Luban.Agent.dll",
        "LUBAN_DLL": "D:/workspace/luban_examples/Tools/Luban/Luban.dll",
        "LUBAN_DOC": "D:/workspace/luban/luban-doc/docs"
      }
    }
  }
}
```

请把路径改成你本机的绝对路径。

## 工具

| Tool | 后端 |
|------|------|
| `ListTables` / `GetSchema` / `Describe` / `Validate` | Luban.Agent |
| `Generate` | Luban.dll（默认加 `--errorFormat json`） |
| `SearchDocs` | 本地 markdown |

详见 [Agent CLI](./agent-cli)。
