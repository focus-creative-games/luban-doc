---
sidebar_position: 4
---

# Luban.Agent CLI

`Luban.Agent` 是面向 Agent / 脚本的独立 CLI，与主生成器 `Luban.dll` 分离。

- **主 Luban**：生成代码/数据；可用 `--errorFormat json` 得到机器可读报错。
- **Luban.Agent**：`validate` / `schema` / `list-tables` / `describe` / `capabilities`；**stdout 始终输出一份 `AgentResult` JSON**。

## 构建

```bash
dotnet build src/Luban.Agent/Luban.Agent.csproj -c Release
```

## 用法

```bash
dotnet Luban.Agent.dll capabilities

dotnet Luban.Agent.dll list-tables --conf luban.conf -t all
dotnet Luban.Agent.dll describe --conf luban.conf -t all --name TbItem
dotnet Luban.Agent.dll schema --conf luban.conf -t all
dotnet Luban.Agent.dll schema --conf luban.conf -t all --name item

dotnet Luban.Agent.dll validate --conf luban.conf -t all
# 可加 -x pathValidator.rootDir=... 等
```

也支持 `--mode list-tables` 写法。

## 退出码

| Code | 含义 |
|------|------|
| 0 | 成功 |
| 1 | 数据 / 校验 |
| 2 | Schema / 配置 |
| 3 | 用法错误 |
| 4 | 内部错误 |

## 与 MCP

[Luban.Mcp](./mcp) 优先调用 `Luban.Agent`（环境变量 `LUBAN_AGENT_DLL`）；生成仍走主 `Luban.dll`。
