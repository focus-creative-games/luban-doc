---
sidebar_position: 1
---

# Excel 基础表头约定

本页解决：什么样的 sheet 会被 Luban 当成有效数据表，以及基础类型、枚举、可空怎么填。

## 一句话

A1（或标题区）用 `##` / `##var` / `##type` 等标记表头；其后是数据行。A1 不以 `##` 开头的 sheet 会被忽略。

## 支持的文件

`xls` / `xlsx` / `xlsm` / `csv` 等。也可用 `sheet名@文件.xlsx` 只读某一个 sheet。

读取 GBK、UTF-8 以外的 CSV 时，Luban 会**智能猜测编码**并正确处理，一般无需手工指定。

xlsx 会读入**所有** sheet，但 A1 不以 `##` 开头的 sheet 会被忽略（可放策划说明等非数据 sheet）。

## 最小完整示例

假设表记录类型为 `Item`，字段 `id` / `name` / `price` / `on_sale`：

| ##var | id | name | price | on_sale | #备注 |
|---|---|---|---|---|---|
| ##type | int | string | int | bool | |
| ##group | | c,s | c | c | |
| ## | 道具ID | 名称 | 价格 | 是否上架 | 策划备注列 |
| | 1001 | 金币 | 0 | 是 | 基础货币 |
| | 1002 | 药水 | 50 | true | |
| ## | 1003 | 草稿 | 1 | 否 | 本行是注释行，不导出 |

对应要点：

| 行/列 | 作用 |
|-------|------|
| `##var`（或首格 `##`） | 字段名行 |
| `##type` | 类型行 |
| `##group` | 导出分组：`c` 客户端、`s` 服务器、空=各端都要 |
| `##` / `##comment` | 注释行；也可作字段中文说明 |
| 字段名以 `#` 开头或为空 | **注释列**，不导出 |
| 数据行首列以 `##` 开头 | **注释行**，整行不导出 |

`##xxx` 行顺序可调；`##group`、注释行可选。字段名推荐 `xx_yy_zz`，生成时按语言转成 Pascal/camel 等。

## 基础类型填写

| ##var | id | flag | ratio | title | open_time |
|---|---|---|---|---|---|
| ##type | int | bool | float | string | datetime |
| | 1 | 是 | 1.5 | hello | 2024-01-01 12:00:00 |
| | 2 | 0 | | | 2024-06-01 |
| | 3 | True | 0 | "" | |

| 类型 | 合法写法 | 说明 |
|------|----------|------|
| bool | `true`/`false`/`0`/`1`/`是`/`否`（大小写不敏感） | 其它值报错 |
| 整数/浮点 | 数字；**分列/列限定**下可留空取默认 | 流式/sep 下须显式填 0 |
| string | 空单元格 = 空串 | 流式格式里若需空串，须用 `""` |
| string#escape=1 | 支持把 `\n` 转成换行 | |
| datetime | Excel 日期，或 `yyyy-mm-dd hh:mm:ss` / `yyyy-mm-dd hh:mm` / `yyyy-mm-dd hh` / `yyyy-mm-dd` | 一般**不要留空**；缺省时分秒按 0 处理 |

![基础类型](/img/cases/primitive_type.jpg)

## 枚举

可填：枚举名、别名、或整数值。flags 枚举可用 `A|B`（分隔符可通过 enum 的 `sep` 属性修改，如 `sep=","` 时写 `A,B`）。

**flags 列限定模式**（enum 需为 flags 类型）：以各枚举项名作子列名，单元格填 `1`/非空表示包含该标志，最终值为所有非 0/非空项的**按位或**。见 [嵌套与容器](./nested-and-collections#列限定补充)。

![枚举](/img/cases/enum.jpg)

| ##var | id | quality |
|---|---|---|
| ##type | int | Quality |
| | 1 | WHITE |
| | 2 | 白 |
| | 3 | 1 |
| | 4 | | 

若枚举有值为 `0` 的项，可留空取该项；否则留空会报错。

## 可空类型

除容器外可用 `T?`。都可用 `null` 表示空。

| ##var | id | count | desc | pos |
|---|---|---|---|---|
| ##type | int | int? | string? | vector2? |
| | 1 | 10 | hello | {}1,2 |
| | 2 | | | null |
| | 3 | null | "" | |

| 类型 | 空怎么表示 |
|------|------------|
| `int?` 等原子 | 留空或 `null` |
| `string?` | 留空 = null；空串请填 `""` |
| 非多态 `bean?` | 非空时**必须以 `{}` 开头**再填字段；空用 `null`/留空 |
| 多态 bean | 按多态规则填，见 [多态](./polymorphism) |

![可空类型](/img/cases/nullable.jpg)

## 表模式示例（配合 Schema）

| 需求 | `__tables__` / XML 要点 | 数据表形态 |
|------|-------------------------|------------|
| 普通 id 表 | `index=id`，mode 空或 `map` | 每行一条，有主键列 |
| 无主键列表 | `mode=list`，index 空 | 只有列表，无 Get(id) |
| 联合主键 | `index=key1+key2` | 多列一起唯一 |
| 独立多索引 | `index=key1,key2` | 多个独立唯一键 |
| 全局单例 | `mode=one` | 通常一行；可改 [纵表](./vertical-and-sep) |

```xml
<table name="TbItem" value="Item" index="id" input="item.xlsx"/>
<table name="TbNotKeyList" value="NotKeyList" mode="list" input="not_key_list.xlsx"/>
<table name="TbUnion" value="UnionRow" index="key1+key2" input="union.xlsx"/>
```

## 文件组织

| input 写法 | 含义 |
|------------|------|
| `item.xlsx` | 读该文件全部有效 sheet |
| `Bag@item.xlsx` | 只读名为 Bag 的 sheet |
| `a.xlsx,b.xlsx` | 多文件合并成一张逻辑表 |
| `xlsx_dir` | 读目录下文件 |

表必须在 Schema 中声明，见 [加一张表](../guide/add-table)。

## 常见坑

- Sheet A1 不是 `##` 开头 → 整表被跳过。
- 只建了 xlsx 忘了在 `__tables__` 注册。
- 注释列当成数据列填了值却看不到导出。
- datetime 留空导致解析失败。

## 相关链接

- [嵌套与容器](./nested-and-collections)
- [策划：表头含义](../designer/headers)
