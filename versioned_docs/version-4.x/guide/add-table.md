---
sidebar_position: 3
---

# 加一张表并导出

本页解决：在 MiniTemplate 上新增一张最简单的数据表，并再次生成。

## 1. 写数据表

在 `Datas` 下新建例如 `reward.xlsx`（也可用 csv）。最小约定：

| 行含义 | 规则 |
|--------|------|
| 字段名行 | A1 单元格以 `##` 开头（也可用 `##var`），后面是字段名 |
| 类型行 | 某行首格为 `##type`，对应列写类型，如 `int` / `string` |
| 分组行（可选） | `##group`：`c` 客户端、`s` 服务器、空表示各端都要 |
| 注释行（可选） | 以 `##` 或 `##comment` 开头 |
| 数据行 | 其后各行 |

示例（逻辑示意，实际以 Excel 为准）：

| ## | id | name | count |
|---|---|---|---|
| ##type | int | string | int |
| ##group | | c,s | c |
| ## | 奖励ID | 名称 | 数量 |
| | 1001 | 金币 | 100 |

更多规则：[Excel 基础](../excel/basics)。

## 2. 在 Schema 里声明表

打开 `Datas/__tables__.xlsx`，增加一行表声明。常见列与填写示例如下（表头行以你工程模板为准，语义一致即可）：

| full_name | value_type | read_schema_from_file | input | index | mode | group | comment |
|---|---|---|---|---|---|---|---|
| TbReward | Reward | true | reward.xlsx | id | | | 奖励表 |

字段含义：

| 列 | 本例取值 | 说明 |
|----|----------|------|
| full_name | `TbReward` | 表全名，也可写成 `reward.TbReward` |
| value_type | `Reward` | 行记录对应的 bean 名 |
| read_schema_from_file | `true` | 从 `reward.xlsx` 表头推断 bean 字段；为 true 时不要再在 `__beans__` 里重复定义同名 bean |
| input | `reward.xlsx` | 数据文件（相对 `dataDir`） |
| index | `id` | 主键字段；简单 map 表通常填主键名 |
| mode | （空） | 空或 `map` 表示按主键查找；`list` / `one` 等见 [Excel Schema](../schema/excel-schema) |
| group | （空） | 表级导出分组；空则按 `luban.conf` 里 `default: true` 的 group 处理 |
| comment | `奖励表` | 注释，可选 |

也可用 XML 定义 table，见 [XML Schema](../schema/xml-schema)。

:::tip Schema 是契约
先有（或同时维护）表声明，再填数据。不要指望工具根据 Excel「猜完结构并覆盖定义」。
:::

## 3. 再生成

再跑 `gen.bat` / `gen.sh`。成功后输出目录应出现新表对应文件；若开了代码生成，会出现 `TbReward` 等类型。

## 常见坑

- 忘了在 `__tables__` 注册 → 数据文件不会被收集。
- Sheet 的 A1 不是以 `##` 开头 → 该 sheet 被忽略。
- 字段名建议用 `xx_yy_zz`，生成时会按语言转成 Pascal/camel 等风格。

## 相关链接

- 下一步：[在运行时加载](./load-runtime)
- [Excel Schema](../schema/excel-schema)
