---
sidebar_position: 1
---

# Common CLI

For the full parameter list, see [CLI Reference](../reference/cli). This page covers only what you need for everyday generation.

## Basic form

```bash
dotnet Luban.dll --conf luban.conf -t client -c cs-simple-json -d json ^
  -x outputCodeDir=../Projects/Xxx/Assets/Gen ^
  -x outputDataDir=../Projects/Xxx/Assets/Data
```

| Parameter | Required | Description |
|------|------|------|
| `--conf` | Yes | Path to luban.conf |
| `-t/--target` | Yes | Export target name |
| `-c/--codeTarget` | No | Multiple allowed: `-c cs-bin -c java-json` |
| `-d/--dataTarget` | No | Multiple allowed |
| `-x key=value` | No | Extension options such as output directories |

When a single command uses multiple `-c`/`-d`, **`-t` must be the same**.

## Output directories

```bash
-x outputCodeDir=...
-x outputDataDir=...
```

With multiple targets, use cascading options to avoid overwriting each other:

```bash
-x cs-bin.outputCodeDir=...
-x json.outputDataDir=...
```

:::danger
By default, old generated files in the output directories are cleaned. Do not point these directories at folders that contain hand-written code.
:::

## Other common switches

| Parameter | Purpose |
|------|------|
| `-e/--excludeTag` | Exclude records with a given tag |
| `-i/--includeTag` | Output only the specified tag (mutually exclusive with exclude) |
| `-o/--outputTable` | Export only the specified tables |
| `--validationFailAsError` | Treat validation failures as generation failures (recommended for release) |
| `-f/--forceLoadTableDatas` | Load data even without a dataTarget, so you can validate only |
| `-x outputSaver=null` | Validate only, write no files (often with `-f`) |

## Full generation examples

Unity + cs-bin + bin (with path validation, l10n):

```bat
dotnet Luban.dll ^
    -t client ^
    -c cs-bin ^
    -d bin ^
    --conf luban.conf ^
    -x outputCodeDir=../Assets/Gen ^
    -x outputDataDir=../Assets/Data ^
    -x pathValidator.rootDir=../Assets ^
    -x l10n.provider=default
```

Unity + cs-simple-json + json:

```bat
dotnet Luban.dll -t client -c cs-simple-json -d json ^
    --conf luban.conf ^
    -x outputCodeDir=../Assets/Gen ^
    -x outputDataDir=../Assets/Data
```

**Designers validate only** (no code/data output):

```bat
dotnet Luban.dll -t all -f --conf luban.conf --validationFailAsError
```

**Generate C# and Java together** (cascading output to avoid overwrite):

```bat
dotnet Luban.dll -t server ^
    -c cs-bin -c java-bin -d bin ^
    --conf luban.conf ^
    -x cs-bin.outputCodeDir=../csharp/Gen ^
    -x java-bin.outputCodeDir=../java/Gen ^
    -x bin.outputDataDir=../Data
```

## Related links

- [Generation targets overview](./targets)
- [Cascading options](../reference/cascading-options)
