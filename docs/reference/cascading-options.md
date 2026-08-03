---
sidebar_position: 3
---

# 级联选项（-x）

`-x key=value` 可带目标前缀，实现「全局默认 + 某 target 覆盖」。

## 输出与清理

| 参数 | 说明 |
|------|------|
| `{codeTarget}.outputCodeDir` / `outputCodeDir` | 代码目录 |
| `{dataTarget}.outputDataDir` / `outputDataDir` | 数据目录 |
| `outputSaver` | `local` / `null` |
| `outputSaver.{target}.cleanUpOutputDir` | 默认清理多余文件，可设 `0` |

## 风格与导出

| 参数 | 说明 |
|------|------|
| `codeStyle` | 如 `csharp-default` |
| `namingConvention.{codeTarget}.{location}` | location: namespace/type/method/property/field/enumItem |
| `dataExporter` | `default` / `null` |
| `codePostprocess` / `dataPostprocess` | 逗号分隔 |

## 本地化与路径

| 参数 | 说明 |
|------|------|
| `l10n.provider` | 如 `default`；不设则关闭 text 相关 |
| `l10n.textFile.path` | 文本数据路径 |
| `l10n.textFile.keyFieldName` | key 字段名 |
| `l10n.textFile.languageFieldName` / `l10n.languageFieldName` | 语言列 |
| `l10n.convertTextKeyToValue` | 静态替换 |
| `l10n.textListFile` | 配合 text-list |
| `pathValidator.rootDir` | path 校验根目录 |

## 其它

| 参数 | 说明 |
|------|------|
| `{code\|data}.lineEnding` | CR / LF / CRLF |
| `json.compact` | 紧凑 JSON |
| `{dataTarget}.fileExt` | 后缀 |
| `{target}.fileEncoding` | 如 gb2312 |

Go 等语言可能还有 `lubanGoModule` 等目标专用参数，见示例工程脚本。
