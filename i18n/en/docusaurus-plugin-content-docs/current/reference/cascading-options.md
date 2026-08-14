---
sidebar_position: 3
---

# Cascading options (`-x` / xargs)

Pipeline modules accept extension parameters via `-x key=value` (`--xargs`). Use **codeTarget / dataTarget prefixes** for “global default + per-target override.”

Standard CLI flags: [CLI reference](./cli). Everyday examples: [Common CLI](../runtime/cli-common).

## Full xargs table

Built-in modules commonly use the following (plugins may add more; follow runtime hints):

| Option | Description | Values / notes | Example |
|------|------|---------------|------|
| `{codeTarget}.outputCodeDir` | Code output directory | Path | `-x cs-bin.outputCodeDir=Assets/Gen` |
| `outputCodeDir` | Same (global shorthand) | Path | `-x outputCodeDir=Assets/Gen` |
| `{dataTarget}.outputDataDir` | Data output directory | Path | `-x json.outputDataDir=Assets/Data` |
| `outputDataDir` | Same (global shorthand) | Path | `-x outputDataDir=Assets/Data` |
| `codeStyle` | Naming style; built-in targets usually set this | `none`, `csharp-default`, `java-default`, `go-default`, `lua-default`, `typescript-default`, `cpp-default`, `python-default`, `dart-default` | `-x codeStyle=csharp-default` |
| `namingConvention.{codeTarget}.{location}` | Override naming per target/location; `{codeTarget}` from `-c`; `location` in [Code style](../runtime/code-style) | `none`, `pascal`, `camel`, `upper`, `snake`; omit `{codeTarget}` for all targets | `-x namingConvention.cs-bin.field=pascal` |
| `dataExporter` | Data exporter | `null`, `default` | `-x dataExporter=default` |
| `codePostprocess` | Code post-processors (multiple) | Comma-separated; none built-in | `-x codePostprocess=a,b,c` |
| `dataPostprocess` | Data post-processors (multiple) | Comma-separated; none built-in | `-x dataPostprocess=a,b` |
| `outputSaver` | Final file saver | `local` (default), `null` (no files, validate only) | `-x outputSaver=null` |
| `outputSaver.{codeTarget\|dataTarget}.cleanUpOutputDir` | Clean stale files in output dir before write | Default `true`; `0`/`false` to disable | `-x outputSaver.cs-bin.cleanUpOutputDir=0` |
| `l10n.provider` | L10n text provider; unset disables text validation/replacement | `default`; may use `*@path` forms | `-x l10n.provider=default` |
| `l10n.textFile.path` | L10n text data file; usually required when provider is set | File path | `-x l10n.textFile.path=Datas/l10n/texts.json` |
| `l10n.textFile.keyFieldName` | Key field in text items | Field name | `-x l10n.textFile.keyFieldName=key` |
| `l10n.textFile.languageFieldName` | Language column field | Field name | `-x l10n.textFile.languageFieldName=en` |
| `l10n.languageFieldName` | Same (alias) | Field name | `-x l10n.languageFieldName=en` |
| `l10n.convertTextKeyToValue` | Static l10n: replace keys with translated text | `1`/`true` | `-x l10n.convertTextKeyToValue=1` |
| `l10n.textListFile` | File listing all text keys in config | Path; with dataTarget `text-list` | `-x l10n.textListFile=keys.txt` |
| `pathValidator.rootDir` | Root for path validator asset search | Path | `-x pathValidator.rootDir=Assets` |
| `{code\|data}.lineEnding` | Line ending for text outputs; ignored for bin/bson | `CR`, `LF`, `CRLF`; default `Environment.NewLine` | `-x data.lineEnding=LF` |
| `json.compact` | Compact JSON without indentation | `0`/`1`/`true`/`false`; default `0` | `-x json.compact=1` |
| `{dataTarget}.fileExt` | Output data file extension | Extension | `-x bin.fileExt=bytes` |
| `{codeTarget\|dataTarget}.fileEncoding` | Output file encoding | e.g. `gb2312`, `utf-8` | `-x lua.fileEncoding=gb2312` |
| `forceLoadDatas` | Load data even without dataTarget (same as `-f`) | `1`/`true` | `-x forceLoadDatas=1` |
| `lubanGoModule` | Go module path for generated code | Go module name | `-x lubanGoModule=demo/luban` |

:::note
- Since v2.12.0, `{dataTarget}.outputDataExtension` was removed; use `{dataTarget}.fileExt`.
- When generating multiple code/data targets, set **separate** `*.outputCodeDir` / `*.outputDataDir` per target to avoid overwrite.
:::

## OutputSaver

| Value | Behavior |
|----|------|
| `local` | Default; write to local output directories |
| `null` | Write no files; pair with no dataTarget + `-f` or `forceLoadDatas=1` for validate-only |

Example (validate only):

```bat
dotnet Luban.dll -t all -f --conf luban.conf -x outputSaver=null
```

## Cascading prefix example

```bash
# Global default + per-target override
-x outputCodeDir=Gen ^
-x cs-bin.outputCodeDir=Assets/Gen ^
-x java-bin.outputCodeDir=java/gen ^
-x outputDataDir=Data ^
-x bin.outputDataDir=Data/bytes
```

## SchemaCollector / Pipeline

| Name | Notes |
|------|------|
| `default` (schemaCollector) | `DefaultSchemaCollector`, legacy-compatible definition format |
| `default` (pipeline) | `DefaultPipeline`; custom pipeline plugins supported |

Set via `-s` / `-p`; see [CLI reference](./cli).

## Related links

- [Built-in codeTarget / dataTarget](./builtins)
- [Generation targets](../runtime/targets)
- [L10N](../quality/l10n)
