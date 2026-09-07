---
sidebar_position: 1
---

# 安装与获取工具

本页解决：把 Luban 可执行程序准备好，并能找到官方示例工程。

## 环境

1. 安装 [.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0) 或更高版本。
2. 克隆或下载示例工程 [luban_examples](https://github.com/focus-creative-games/luban_examples)（Gitee 镜像亦可）。

后续快速上手默认以 `luban_examples` 里的 **MiniTemplate** 为起点。

## 获取 Luban

任选其一：

| 方式 | 说明 |
|------|------|
| Release | 从 [GitHub Releases](https://github.com/focus-creative-games/luban/releases) 下载已发布包 |
| 示例自带 | `luban_examples/Tools/Luban`（**可能不是最新版**） |
| 自编译 | 克隆 [luban](https://github.com/focus-creative-games/luban) 源码后，用示例脚本编译（见下） |

### 自编译（推荐：主工具 + Agent + MCP）

将 `luban` 与 `luban_examples` 放在同级目录，然后：

```bash
# Windows
luban_examples/Tools/build-luban.bat

# macOS / Linux
luban_examples/Tools/build-luban.sh
```

脚本会分别输出到：

| 目录 | 用途 |
|------|------|
| `Tools/Luban` | 主生成器（日常 `-c` / `-d`） |
| `Tools/Luban.Agent` | AI / 脚本：校验与 schema 查询，见 [Agent CLI](../ai/agent-cli) |
| `Tools/Luban.Mcp` | IDE MCP Server，见 [Luban MCP](../ai/mcp) |

运行形态一般为：

```bash
dotnet <path_to_Luban.dll> --conf ... -t ... -c ... -d ...
```

Windows 上示例脚本多为 `gen.bat`，已写好 `LUBAN_DLL` 路径。

## 最小工程长什么样

MiniTemplate 典型结构：

```text
MiniTemplate/
  luban.conf          # 全局配置：groups / targets / schemaFiles / dataDir
  Defines/            # 可选 XML schema（如 builtin.xml）
  Datas/              # 数据与 Excel schema（__tables__ / __beans__ / __enums__）
  gen.bat / gen.sh    # 生成脚本
  output/             # 生成结果（脚本指定）
```

## 常见坑

- **Tools/Luban 过旧**：生成行为与文档不一致时，先换成最新 Release，或重新运行 `Tools/build-luban.bat` / `build-luban.sh`。
- **只用到 Agent / MCP**：同样跑上述脚本；MCP 需配置 `LUBAN_DLL` 与 `LUBAN_AGENT_DLL` 指向对应目录中的 dll。
- **SDK 版本不够**：需 8.0+。
- **路径含空格或未改 LUBAN_DLL**：复制模板后检查 `gen.bat` 中的 dll 路径。

## 相关链接

- 下一步：[第一次生成](./first-generate)
- [luban.conf 说明](../concepts/luban-conf)
- [AI 支持概览](../ai/overview)
