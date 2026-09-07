---
sidebar_position: 1
---

# CLI 全参数

```bash
dotnet <path_of_Luban.dll> [args]
```

## 标准参数

| 参数 | 必选 | 默认 | 描述 |
|------|------|------|------|
| `-s, --schemaCollector` | 否 | default | schema 收集器名 |
| `--conf` | 是 | | luban.conf |
| `-t, --target` | 是 | | 导出目标 |
| `-c, --codeTarget` | 否 | | 可多个 |
| `-d, --dataTarget` | 否 | | 可多个 |
| `-p, --pipeline` | 否 | default | 管线名 |
| `-f, --forceLoadTableDatas` | 否 | false | 无 dataTarget 也加载数据 |
| `-i, --includeTag` | 否 | | 与 exclude 互斥 |
| `-e, --excludeTag` | 否 | | 排除记录 tag |
| `--variant` | 否 | | `{bean}.{field}={name}`，可多个 |
| `-o, --outputTable` | 否 | | 只导出指定表，可多个 |
| `--timeZone` | 否 | 本地 | 影响 datetime |
| `--customTemplateDir` | 否 | | 自定义模板目录 |
| `--strict` | 否 | false | 校验失败则失败（退出码 1） |
| `--locale` | 否 | 系统 UI 语言 | 错误/警告消息语言：`en` / `zh`（亦支持如 `zh-CN`、`en-US`） |
| `--errorFormat` | 否 | text | 报错格式：`text`（默认）或 `json`（供 AI/CI 解析，输出到 stderr） |
| `-x, --xargs` | 否 | | 扩展参数，见 [级联选项 xargs 全表](./cascading-options) |
| `-l, --logConfig` | 否 | nlog.xml | |
| `-w, --watchDir` | 否 | | 监视目录自动再生 |
| `-v, --verbose` | 否 | | |
| `--help` / `--version` | 否 | | |

日常用法见 [常用命令行](../runtime/cli-common)。xargs 完整参数表见 [级联选项 xargs 全表](./cascading-options)。
