---
sidebar_position: 1
---

# 更新说明

本文说明 **Luban 5.x** 相对 **4.x 最后一版**的主要变化。

本站默认文档即为 5.x；历史文档见顶部版本下拉里的 **4.x**。

## 一览

| 类别 | 内容 |
|------|------|
| 破坏性 | `--validationFailAsError` → `--strict` |
| 诊断 | 统一 `LubanException` + 中英消息目录；`--locale`；`--errorFormat json` |
| AI | 官方 Skills、`schema-json`、`Luban.Agent`、`Luban.Mcp` |
| 架构 | `PipelineScope`（按次运行的 ambient 上下文，支持并发 code target） |
| 版本号 | 主版本升至 **5.0.0** |

## 破坏性变更 / 迁移

### 命令行：`--strict` 取代 `--validationFailAsError`

```bash
# 4.x
dotnet Luban.dll ... --validationFailAsError

# 5.x
dotnet Luban.dll ... --strict
```

语义不变：校验失败时以失败退出（退出码 1）。请更新 CI / `gen.bat` / `gen.sh`。

### 面向用户的报错文案可能变化

5.x 将原先散落的 `Exception` / 裸字符串报错收敛为 **`LubanException` + `MessageCatalog`**（内置 `en` / `zh`）。

- 脚本若依赖**精确匹配英文错误字符串**，可能需要改为匹配错误码 / `--errorFormat json` 输出。
- 二次开发插件若直接 `throw new Exception(...)` 仍可运行，但推荐改为 `LubanException`，以便走统一本地化与 JSON 诊断。

### 嵌入式宿主（非 CLI）

若你的工具直接调用 `SimpleLauncher` / 各 `*Manager.Ins`：

- 5.x 要求存在活动的 **`PipelineScope`**（`Create` + `Enter`），否则访问 `Manager.Ins` / `EnvManager.Current` / `GenerationContext.Current` 会抛错。
- CLI（`Luban` / `Luban.Agent`）已处理好；自定义宿主需参考主 `Program` 或 `PipelineScope` 用法。

## 新增能力

### 本地化与严格模式相关 CLI

| 参数 | 说明 |
|------|------|
| `--strict` | 校验失败即失败（原 `--validationFailAsError`） |
| `--locale` | 错误/警告语言：`en` / `zh`（亦支持如 `zh-CN`） |
| `--errorFormat json` | 机器可读诊断输出到 stderr（供 AI / CI） |

详见 [CLI 参考](../reference/cli)。

### AI 工具链

| 组件 | 用途 | 文档 |
|------|------|------|
| `ai/skills/*` | 官方 Agent Skills（加表、schema、排错等） | [Skills](../ai/skills) |
| `-c schema-json` | 导出机器可读 schema（通常不加载数据） | [schema-json](../ai/schema-json) |
| `Luban.Agent` | 独立 CLI：`validate` / `schema` / `list-tables` / `describe` / `capabilities`，stdout 为 JSON | [Agent CLI](../ai/agent-cli) |
| `Luban.Mcp` | stdio MCP Server（查询走 Agent，生成走主 `Luban.dll`） | [MCP](../ai/mcp) |

总览见 [AI 支持](../ai/overview)。

### 示例工程构建

`luban_examples/Tools/build-luban.bat`（及 `.sh`）一次编译三个目录：

- `Tools/Luban`
- `Tools/Luban.Agent`
- `Tools/Luban.Mcp`

见 [安装与获取工具](../guide/install)。

## 架构改进（对多数用户透明）

- 引入 **`PipelineScope`**：用 `AsyncLocal` 承载一次 Pipeline 运行的 Manager / Env / `GenerationContext`，替代进程级可变单例。
- **多个 code target 可并行**（`DefaultPipeline` 每个 code target 一个 `Task.Run`）；`CurrentCodeTarget` 亦为按异步流隔离。
- 新增单元测试项目 `Luban.Tests`（含 Scope 隔离用例）。

二次开发若依赖「全局单例 Manager」或「code target 一定串行」，请按上节宿主说明调整。

## 小改动

- 部分 Scriban 模板（Dart / Golang）将制表符规范为 4 空格，不影响生成语义。

## 相关提交（自 `ce50b05` 之后）

| Commit | 摘要 |
|--------|------|
| `4576423` | `LubanException` + 消息本地化；`--strict` / `--locale` |
| `405c5a2` | `PipelineScope`；并发 code target |
| `a8f527f` | 版本号 5.0.0 |
| `7ff057f` | 模板缩进规范化 |
| `d7cf6ee` | Skills、`schema-json`、`--errorFormat json`、`Luban.Mcp` |
| `5498ae5` | 抽出 `Luban.Agent`；MCP 查询改走 Agent |

## 相关链接

- [文档怎么读 · 版本说明](../how-to-read)
- [AI 支持概览](../ai/overview)
- [历史 changelog](./changelog)（偏早期按日记录，不含完整 5.x 说明）
