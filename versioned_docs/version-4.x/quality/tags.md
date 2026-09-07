---
sidebar_position: 2
---

# tag 过滤

tag 作用在**记录（行）**上，用于导出子集：测试数据、仅某分支可见的行、临时草稿等。与字段/表的 **group**（结构裁剪）是不同维度。

## 怎么标记

| 数据源 | 写法 |
|--------|------|
| Excel | 数据行**第一列**填 tag（表头区第一列常为空或说明） |
| json | `"__tag__": "dev"` |
| lua | `__tag__ = "dev"` |
| xml | `<__tag__>dev</__tag__>` |
| yaml | `__tag__: dev` |

### Excel 示例

| ##var | id | name |
|---|---|---|
| ##type | int | string |
| ## | 道具ID | 名称 |
| | 1 | 金币 |
| ## | 2 | 草稿行 |
| test | 3 | 仅测试 |
| DEV | 4 | 开发包 |
| | 5 | 正式道具 |

| 行 | 第一列 | 效果 |
|----|--------|------|
| id=1、5 | 空 | 一般始终导出（exclude 模式下） |
| id=2 | `##` | **永久不导出**（特殊 tag） |
| id=3 | `test` | `--excludeTag test` 时去掉 |
| id=4 | `DEV` | tag 名大小写按你填的匹配 |

### json 示例

```json
{
  "__tag__": "dev",
  "id": 3,
  "name": "仅测试"
}
```

## 特殊 tag

| tag | 含义 |
|-----|------|
| `##` | 永久注释，任何导出都不包含 |
| `unchecked` | 校验器跳过此记录（慎用） |

一行可以有业务 tag；`##` 与「首列以 `##` 开头的注释行」在表头规则里相关，见 [Excel 基础](../excel/basics)。

## 命令行过滤

```bash
# 排除：带 test 的行不导出（无 tag 的行通常仍导出）
-e test
# 或
--excludeTag test

# 只包含：仅 tag 为空或为 ship 的行（与 exclude 互斥）
-i ship
# 或
--includeTag ship
```

| 模式 | 典型用途 |
|------|----------|
| `--excludeTag test` | 正式包去掉测试行 |
| `--includeTag ship` | 白名单式只出指定标记行 |

`--includeTag` 与 `--excludeTag` **不能同时使用**。

## 与 group 的区别

| | group | tag |
|--|-------|-----|
| 作用点 | 表 / 字段（列是否进某端） | 记录（行是否导出） |
| 配置位置 | schema / `##group` | 数据行首列 / `__tag__` |
| 命令行 | `-t client` 等选 target | `-e` / `-i` |

可组合：先按 target 裁字段，再按 tag 裁行。

## 实践建议

- 测试专用行统一 tag：`test` / `dev`，CI 正式生成加 `-e test`。
- 永久废弃行用首列 `##`，不要只靠「删掉数字假装没有」。
- `unchecked` 只用于过渡期脏数据，不要当成长期规范。

## 相关链接

- [groups 与 targets](../concepts/groups-targets)
- [校验器](./validators)
- [常用命令行](../runtime/cli-common)
