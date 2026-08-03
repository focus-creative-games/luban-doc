---
sidebar_position: 3
---

# Cascading options (`-x`)

`-x key=value` can take a target prefix for “global default + per-target override.”

## Output and cleanup

| Option | Description |
|------|------|
| `{codeTarget}.outputCodeDir` / `outputCodeDir` | Code directory |
| `{dataTarget}.outputDataDir` / `outputDataDir` | Data directory |
| `outputSaver` | `local` / `null` |
| `outputSaver.{target}.cleanUpOutputDir` | Cleans extra files by default; set `0` to disable |

## Style and export

| Option | Description |
|------|------|
| `codeStyle` | e.g. `csharp-default` |
| `namingConvention.{codeTarget}.{location}` | location: namespace/type/method/property/field/enumItem |
| `dataExporter` | `default` / `null` |
| `codePostprocess` / `dataPostprocess` | Comma-separated |

## Localization and paths

| Option | Description |
|------|------|
| `l10n.provider` | e.g. `default`; unset disables text-related features |
| `l10n.textFile.path` | Text data path |
| `l10n.textFile.keyFieldName` | Key field name |
| `l10n.textFile.languageFieldName` / `l10n.languageFieldName` | Language column |
| `l10n.convertTextKeyToValue` | Static replacement |
| `l10n.textListFile` | Used with text-list |
| `pathValidator.rootDir` | Root directory for path validation |

## Other

| Option | Description |
|------|------|
| `{code\|data}.lineEnding` | CR / LF / CRLF |
| `json.compact` | Compact JSON |
| `{dataTarget}.fileExt` | File extension |
| `{target}.fileEncoding` | e.g. gb2312 |

Languages such as Go may also have target-specific options like `lubanGoModule`; see sample project scripts.
