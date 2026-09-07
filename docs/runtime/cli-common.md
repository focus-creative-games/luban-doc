---
sidebar_position: 1
---

# 常用命令行

完整参数表见 [CLI 参考](../reference/cli)。本页只保留日常生成用得到的部分。

## 基本形式

```bash
dotnet Luban.dll --conf luban.conf -t client -c cs-simple-json -d json ^
  -x outputCodeDir=../Projects/Xxx/Assets/Gen ^
  -x outputDataDir=../Projects/Xxx/Assets/Data
```

| 参数 | 必选 | 说明 |
|------|------|------|
| `--conf` | 是 | luban.conf 路径 |
| `-t/--target` | 是 | 导出目标名 |
| `-c/--codeTarget` | 否 | 可多个：`-c cs-bin -c java-json` |
| `-d/--dataTarget` | 否 | 可多个 |
| `-x key=value` | 否 | 输出目录等扩展参数 |

同一命令里多个 `-c`/`-d` 时 **`-t` 必须相同**。

## 输出目录

```bash
-x outputCodeDir=...
-x outputDataDir=...
```

多目标时用层级参数避免互相覆盖：

```bash
-x cs-bin.outputCodeDir=...
-x json.outputDataDir=...
```

:::danger
默认会清理输出目录中的旧生成物。不要把目录设到含手写代码的文件夹。
:::

## 其它常用开关

| 参数 | 用途 |
|------|------|
| `-e/--excludeTag` | 排除带某 tag 的记录 |
| `-i/--includeTag` | 只输出指定 tag（与 exclude 互斥） |
| `-o/--outputTable` | 只导出指定表 |
| `--strict` | 校验失败则生成失败（发布建议打开） |
| `--locale` | 错误/警告消息语言（`en` / `zh`，默认跟随系统 UI 语言） |
| `-f/--forceLoadTableDatas` | 无 dataTarget 也加载数据以便只做校验 |
| `-x outputSaver=null` | 只校验不写出文件（常配合 `-f`） |

## 完整生成示例

Unity + cs-bin + bin（含 path 校验、l10n）：

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

Unity + cs-simple-json + json：

```bat
dotnet Luban.dll -t client -c cs-simple-json -d json ^
    --conf luban.conf ^
    -x outputCodeDir=../Assets/Gen ^
    -x outputDataDir=../Assets/Data
```

**仅策划校验**（不生成代码/数据）：

```bat
dotnet Luban.dll -t all -f --conf luban.conf --strict
```

**同时生成 C# 与 Java**（分层 output 避免覆盖）：

```bat
dotnet Luban.dll -t server ^
    -c cs-bin -c java-bin -d bin ^
    --conf luban.conf ^
    -x cs-bin.outputCodeDir=../csharp/Gen ^
    -x java-bin.outputCodeDir=../java/Gen ^
    -x bin.outputDataDir=../Data
```

## 相关链接

- [生成目标一览](./targets)
- [级联选项](../reference/cascading-options)
