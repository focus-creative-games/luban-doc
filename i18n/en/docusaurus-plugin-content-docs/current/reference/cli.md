---
sidebar_position: 1
---

# CLI full reference

```bash
dotnet <path_of_Luban.dll> [args]
```

## Standard arguments

| Argument | Required | Default | Description |
|------|------|------|------|
| `-s, --schemaCollector` | No | default | Schema collector name |
| `--conf` | Yes | | luban.conf |
| `-t, --target` | Yes | | Export target |
| `-c, --codeTarget` | No | | Can be repeated |
| `-d, --dataTarget` | No | | Can be repeated |
| `-p, --pipeline` | No | default | Pipeline name |
| `-f, --forceLoadTableDatas` | No | false | Load data even without dataTarget |
| `-i, --includeTag` | No | | Mutually exclusive with exclude |
| `-e, --excludeTag` | No | | Exclude record tags |
| `--variant` | No | | `{bean}.{field}={name}`, can be repeated |
| `-o, --outputTable` | No | | Export only specified tables, can be repeated |
| `--timeZone` | No | local | Affects datetime |
| `--customTemplateDir` | No | | Custom template directory |
| `--strict` | No | false | Fail when validation fails (exit code 1) |
| `--locale` | No | system UI language | Locale for error/warning messages: `en` / `zh` (also accepts `zh-CN`, `en-US`, etc.) |
| `-x, --xargs` | No | | Extra options; see [Cascading options xargs table](./cascading-options) |
| `-l, --logConfig` | No | nlog.xml | |
| `-w, --watchDir` | No | | Watch directories and regenerate |
| `-v, --verbose` | No | | |
| `--help` / `--version` | No | | |

Daily usage: [Common CLI](../runtime/cli-common). Full xargs table: [Cascading options xargs table](./cascading-options).
