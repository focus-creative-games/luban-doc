---
sidebar_position: 3
---

# 级联选项（-x / xargs）

Pipeline 中各模块的扩展参数统一通过 `-x key=value`（`--xargs`）传入，可带 **codeTarget / dataTarget 前缀**实现「全局默认 + 某 target 覆盖」。

标准命令行参数见 [CLI 全参数](./cli)；日常示例见 [常用命令行](../runtime/cli-common)。

## xargs 全表

内置模块常用参数如下（插件模块可能还有额外 xargs，以实际报错提示为准）：

| 参数 | 描述 | 可用值 / 说明 | 示例 |
|------|------|---------------|------|
| `{codeTarget}.outputCodeDir` | 代码目标输出目录 | 路径 | `-x cs-bin.outputCodeDir=Assets/Gen` |
| `outputCodeDir` | 同上（全局简写，无 target 前缀时） | 路径 | `-x outputCodeDir=Assets/Gen` |
| `{dataTarget}.outputDataDir` | 数据目标输出目录 | 路径 | `-x json.outputDataDir=Assets/Data` |
| `outputDataDir` | 同上（全局简写） | 路径 | `-x outputDataDir=Assets/Data` |
| `codeStyle` | 命名风格；内置 Code Target 通常已设好，一般不必显式指定 | `none`、`csharp-default`、`java-default`、`go-default`、`lua-default`、`typescript-default`、`cpp-default`、`python-default`、`dart-default` | `-x codeStyle=csharp-default` |
| `namingConvention.{codeTarget}.{location}` | 按 target 与位置覆盖命名；`{codeTarget}` 为 `-c` 中的名；`location` 见 [代码风格](../runtime/code-style) | `none`、`pascal`、`camel`、`upper`、`snake`；不写 `{codeTarget}` 则对所有 target 生效 | `-x namingConvention.cs-bin.field=pascal` |
| `dataExporter` | 数据导出器 | `null`、`default` | `-x dataExporter=default` |
| `codePostprocess` | 代码后处理器，可多个 | 逗号分隔；内置暂无 | `-x codePostprocess=a,b,c` |
| `dataPostprocess` | 数据后处理器，可多个 | 逗号分隔；内置暂无 | `-x dataPostprocess=a,b` |
| `outputSaver` | 最终文件保存器 | `local`（默认，写本地）、`null`（不写文件，仅校验） | `-x outputSaver=null` |
| `outputSaver.{codeTarget\|dataTarget}.cleanUpOutputDir` | 写出前是否清理 output 目录中多余旧文件 | 默认 `true`；设 `0`/`false` 关闭 | `-x outputSaver.cs-bin.cleanUpOutputDir=0` |
| `l10n.provider` | 本地化文本 Provider；未设置则不执行 text 校验与静态替换 | `default`；可为 `*@path` 等形式 | `-x l10n.provider=default` |
| `l10n.textFile.path` | 本地化文本数据文件；设置了 `l10n.provider` 时通常必填 | 文件路径 | `-x l10n.textFile.path=Datas/l10n/texts.json` |
| `l10n.textFile.keyFieldName` | 文本项 key 字段名 | 字段名 | `-x l10n.textFile.keyFieldName=key` |
| `l10n.textFile.languageFieldName` | 文本项语言列字段名 | 字段名 | `-x l10n.textFile.languageFieldName=en` |
| `l10n.languageFieldName` | 同上（简写别名） | 字段名 | `-x l10n.languageFieldName=en` |
| `l10n.convertTextKeyToValue` | 静态本地化：将 key 替换为对应语言文本 | `1`/`true` 开启 | `-x l10n.convertTextKeyToValue=1` |
| `l10n.textListFile` | 输出配置中所有 text key 列表的文件 | 路径；配合 dataTarget `text-list` | `-x l10n.textListFile=keys.txt` |
| `pathValidator.rootDir` | path 校验器搜索资源的根目录 | 路径 | `-x pathValidator.rootDir=Assets` |
| `{code\|data}.lineEnding` | 文本类输出的行尾符；对 bin、bson 等二进制无效 | `CR`、`LF`、`CRLF`；未指定则用 `Environment.NewLine` | `-x data.lineEnding=LF` |
| `json.compact` | 是否输出紧凑无缩进 JSON | `0`/`1`/`true`/`false`；默认 `0` | `-x json.compact=1` |
| `{dataTarget}.fileExt` | 输出数据文件后缀 | 扩展名 | `-x bin.fileExt=bytes` |
| `{codeTarget\|dataTarget}.fileEncoding` | 输出文件字符编码 | 如 `gb2312`、`utf-8` | `-x lua.fileEncoding=gb2312` |
| `forceLoadDatas` | 无 dataTarget 时也加载数据（与 `-f` 等价） | `1`/`true` | `-x forceLoadDatas=1` |
| `lubanGoModule` | Go 生成代码的 module 路径 | Go module 名 | `-x lubanGoModule=demo/luban` |

:::note
- v2.12.0 起 `{dataTarget}.outputDataExtension` 已移除，改用 `{dataTarget}.fileExt`。
- 一次生成多个 code/data target 时，**必须**为每个 target 分别指定 `*.outputCodeDir` / `*.outputDataDir`，否则会互相覆盖。
:::

## OutputSaver

| 值 | 行为 |
|----|------|
| `local` | 默认；写入本地 output 目录 |
| `null` | 不写出任何文件；配合无 dataTarget + `-f` 或 `forceLoadDatas=1` 做纯校验 |

示例（只校验、不生成）：

```bat
dotnet Luban.dll -t all -f --conf luban.conf -x outputSaver=null
```

## 级联前缀示例

```bash
# 全局默认 + 某 target 覆盖
-x outputCodeDir=Gen ^
-x cs-bin.outputCodeDir=Assets/Gen ^
-x java-bin.outputCodeDir=java/gen ^
-x outputDataDir=Data ^
-x bin.outputDataDir=Data/bytes
```

## SchemaCollector / Pipeline

| 名称 | 说明 |
|------|------|
| `default`（schemaCollector） | `DefaultSchemaCollector`，与旧版相似的定义格式 |
| `default`（pipeline） | `DefaultPipeline`；可自定义 Pipeline 插件 |

通过 `-s` / `-p` 指定；见 [CLI 全参数](./cli)。

## 相关链接

- [内置 codeTarget / dataTarget](./builtins)
- [生成目标选择](../runtime/targets)
- [L10N](../quality/l10n)
