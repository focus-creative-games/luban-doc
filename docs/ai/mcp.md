---
sidebar_position: 5
---

# Luban MCP

`Luban.Mcp` 是基于 stdio 的 MCP Server，封装查 schema、校验/生成、搜文档。

## 构建

```bash
dotnet build src/Luban.Mcp/Luban.Mcp.csproj -c Release
dotnet build src/Luban/Luban.csproj -c Release
```

## 环境变量

| 变量 | 含义 |
|------|------|
| `LUBAN_DLL` | `Luban.dll` 绝对路径（推荐） |
| `LUBAN_DOC` | 文档根目录，即 `luban-doc/docs`（供 search_docs） |

## Cursor 配置示例

```json
{
  "mcpServers": {
    "luban": {
      "command": "dotnet",
      "args": ["D:/path/to/Luban.Mcp.dll"],
      "env": {
        "LUBAN_DLL": "D:/path/to/Luban.dll",
        "LUBAN_DOC": "D:/path/to/luban-doc/docs"
      }
    }
  }
}
```

## 工具

| Tool | 作用 |
|------|------|
| `ListTables` | 列出表（内部跑 schema-json） |
| `GetSchema` | 取完整或按名过滤的 schema JSON |
| `Validate` | `-f --strict`，不写出文件 |
| `Generate` | 透传 CLI 参数生成 |
| `SearchDocs` | 在文档目录中关键词检索 |

所有生成/校验默认附带 `--errorFormat json`，便于解析。
