---
sidebar_position: 4
---

# Luban.Agent CLI

`Luban.Agent` 是面向 Agent / 脚本的独立 CLI，与主生成器 `Luban.dll` 分离。

- **主 Luban**：生成代码/数据；可用 `--errorFormat json` 得到机器可读报错。
- **Luban.Agent**：`validate` / `schema` / `list-tables` / `describe` / `capabilities`；**stdout 始终输出一份 `AgentResult` JSON**。

## 构建

推荐与主工具一起构建（`luban` 与 `luban_examples` 仓库并列时）：

```bash
# Windows
luban_examples/Tools/build-luban.bat

# macOS / Linux
luban_examples/Tools/build-luban.sh
```

产物在 `luban_examples/Tools/Luban.Agent/`（同脚本还会生成 `Tools/Luban` 与 `Tools/Luban.Mcp`）。

也可单独编译源码：

```bash
dotnet build src/Luban.Agent/Luban.Agent.csproj -c Release -o <out_dir>
```

## 用法

```bash
dotnet Tools/Luban.Agent/Luban.Agent.dll capabilities

dotnet Tools/Luban.Agent/Luban.Agent.dll list-tables --conf luban.conf -t all
dotnet Tools/Luban.Agent/Luban.Agent.dll describe --conf luban.conf -t all --name TbItem
dotnet Tools/Luban.Agent/Luban.Agent.dll schema --conf luban.conf -t all
dotnet Tools/Luban.Agent/Luban.Agent.dll schema --conf luban.conf -t all --name item

dotnet Tools/Luban.Agent/Luban.Agent.dll validate --conf luban.conf -t all
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

[Luban.Mcp](./mcp) 通过环境变量 `LUBAN_AGENT_DLL` 调用本工具；生成仍走主 `Luban.dll`（`LUBAN_DLL`）。
