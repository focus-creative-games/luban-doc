---
sidebar_position: 2
---

# 第一次生成

本页解决：不改表，先用 MiniTemplate **跑通一次生成**，确认环境正确。

## 操作

1. 打开 `luban_examples/MiniTemplate`。
2. 运行：
   - Windows：`gen.bat`
   - macOS / Linux：`gen.sh`
3. 终端最后出现类似 `bye~` 即成功。
4. 查看脚本指定的输出目录（常见为 `output/`）是否生成了数据文件。

## 脚本在干什么（概念）

一次成功的生成至少包含：

| 参数 | 含义 |
|------|------|
| `--conf luban.conf` | 工程配置 |
| `-t <target>` | 导出目标，如 `client` / `server` / `all` |
| `-d <dataTarget>` | 数据格式，如 `json` / `bin` |
| `-x outputDataDir=...` | 数据输出目录 |

若同时生成代码，还会有 `-c <codeTarget>` 与 `outputCodeDir`。

完整参数见 [常用命令行](../runtime/cli-common) 与 [CLI 参考](../reference/cli)。

## 常见坑

- 输出目录被清空：Luban 默认会清理 `outputCodeDir` / `outputDataDir`，**不要**指向已有业务源码目录（如整棵 `Assets/Scripts`）。
- 多个 `-c`/`-d` 指向同一目录会互相覆盖；应用层级参数分目录，见 [命令行](../runtime/cli-common)。

## 相关链接

- 上一步：[安装](./install)
- 下一步：[加一张表并导出](./add-table)
