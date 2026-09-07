---
sidebar_position: 1
---

# Excel 定义 Schema

用 `__tables__.xlsx` / `__beans__.xlsx` / `__enums__.xlsx`（文件名以工程为准）在表格里维护结构定义。适合业务表频繁加字段、希望策划也能看到结构表的场景。

## 在 luban.conf 里挂上

```json
"schemaFiles": [
  {"fileName": "Defines", "type": ""},
  {"fileName": "Datas/__tables__.xlsx", "type": "table"},
  {"fileName": "Datas/__beans__.xlsx", "type": "bean"},
  {"fileName": "Datas/__enums__.xlsx", "type": "enum"}
]
```

| type | 内容 |
|------|------|
| `table` | 有哪些表、input、index、mode、value 类型等 |
| `bean` | 结构体与字段 |
| `enum` | 枚举项 |

三类定义必须分文件（或分表）维护；列名以你工程模板为准，下文用逻辑列名举例。

## `__tables__` 示例

| full_name | value_type | read_schema_from_file | input | index | mode | group | comment |
|---|---|---|---|---|---|---|---|
| TbItem | Item | false | item.xlsx | id | | | 道具表 |
| item.TbEquip | item.Equip | true | item/equip.xlsx | id | map | c,s | 从数据表头读字段 |
| TbDropList | DropEntry | false | drop.xlsx | | list | | 无主键列表 |
| TbUnionKey | UnionRow | false | union.xlsx | key1+key2 | list | | 联合主键 |
| TbMultiKey | MultiKeyRow | false | multi.xlsx | key1,key2 | list | | 两个独立索引 |
| TbGlobal | GlobalConfig | false | global.xlsx | | one | | 全局单例 |

字段含义：

| 列 | 说明 |
|----|------|
| full_name | 表全名；可带模块前缀，如 `item.TbEquip` |
| value_type | 行记录 bean 名；可同模块前缀 |
| read_schema_from_file | `true`：从 **数据表** 表头推断 bean 字段；此时不要在 `__beans__` 再定义同名 bean |
| input | 相对 `dataDir` 的数据源；多文件用逗号，或 `Sheet名@文件.xlsx` |
| index | 主键；联合用 `a+b`，多个独立索引用 `a,b`；list/one 常可空 |
| mode | `map`（默认）/ `list` / `one`（或 `singleton`） |
| group | 表级导出分组；空则按 `luban.conf` 里 `default: true` 的 group |
| comment / tags / output | 注释、标签、自定义输出文件名（可选） |

### mode / index 对照

| 需求 | mode | index | 生成侧常见用法 |
|------|------|-------|----------------|
| 普通 id 表 | 空或 `map` | `id` | `Get(id)` / 字典 |
| 无主键列表 | `list` | 空 | 遍历列表 |
| 联合主键 | `list` | `a+b` | 多字段唯一 |
| 独立多索引 | `list` | `a,b` | 多个查找字典 |
| 全局单例 | `one` | 空 | 一张表一条（或纵表）配置 |

:::caution
多数语言没有内建联合索引 HashMap，目前仅为 C#、Python 等少量语言生成联合索引相关代码；**但无论是否生成代码，导出数据时都会按联合索引校验主键合法性。**
:::

未写 index 且 mode 为 map 时，常默认取 value bean 的第一个字段。

### 两种建 bean 的路径

**A. 在 `__beans__` 显式定义（推荐稳定结构）**

`__tables__`：`read_schema_from_file=false`，`value_type=Item`；在 `__beans__` 定义 `Item` 字段。

**B. 从数据表头读定义（适合快速加表）**

`__tables__`：`read_schema_from_file=true`，数据表带 `##var` / `##type`：

| ##var | id | name | price |
|---|---|---|---|
| ##type | int | string | int |
| | 1001 | 金币 | 0 |

此时 **不要** 再在 `__beans__` 定义同名 `Item`/`Reward`，否则重复定义报错。表本身仍须在 `__tables__` 注册。

## `__beans__` 示例

| full_name | parent | valueType | sep | alias | group | comment | fields |
|---|---|---|---|---|---|---|---|
| Vec3 | | true | , | | | 三维向量 | （见下） |
| Cost | | | | | | 消耗 | （见下） |
| Shape | | | | | | 形状基类 | （可无字段） |
| Circle | Shape | | | | | 圆 | （见下） |

字段列表在 Excel 里通常是嵌套列/子表，逻辑上等价于：

| bean | name | type | group | comment |
|------|------|------|-------|---------|
| Vec3 | x | float | | |
| Vec3 | y | float | | |
| Vec3 | z | float | | |
| Cost | id | int | | 道具 id |
| Cost | count | int | | 数量 |
| Circle | radius | float | | |

| 列 | 说明 |
|----|------|
| full_name | bean 全名，可 `common.Vec3` |
| parent | 父类全名；有子类时父类一般为抽象类型 |
| valueType | `true` 时按值类型语义导出（如向量） |
| sep | 流式/紧凑填写时的默认分隔符，如 `,` |
| alias | 多态填表可用的中文别名等 |
| fields | name / type / group / comment / tags |

类型字符串写法见 [类型速查](./types)；多态见 [多态](./polymorphism)。

## `__enums__` 示例

| full_name | flags | unique | comment | items |
|---|---|---|---|---|
| Quality | false | true | 品质 | （见下） |
| OpenFlag | true | | 开关位 | （见下） |

枚举项逻辑示意：

| enum | name | alias | value | comment |
|------|------|-------|-------|---------|
| Quality | WHITE | 白 | 1 | |
| Quality | GREEN | 绿 | 2 | |
| Quality | BLUE | 蓝 | 3 | |
| OpenFlag | None | | 0 | |
| OpenFlag | A | | 1 | |
| OpenFlag | B | | 2 | |
| OpenFlag | C | | A\|B | flags 组合 |

| 列 | 说明 |
|----|------|
| flags | 是否按位标志枚举 |
| unique | 项值是否必须唯一 |
| items.name / alias / value | 项名、填表别名、显式值（可十/十六进制，或 `A\|B`） |

数据表里填 `白` 或 `WHITE` 均可（有 alias 时）。

## 与 XML 共存

同一工程可同时有 `Defines/*.xml` 与 `__*.xlsx`：

- 向量、公共结构、深继承 → XML（`Defines`）
- 业务表登记、业务 bean/enum → Excel schema

最终汇入同一套 Schema，类型名不要冲突。

## 常见坑

- 只改数据表头，却 `read_schema_from_file=false` 且未同步 `__beans__`。
- `read_schema_from_file=true` 又在 `__beans__` 重复定义同名 bean。
- mode/index 与查找方式不匹配（例如要 `Get(id)` 却写成 `list`）。
- `input` 路径相对 `dataDir`，写错会导致「找不到数据」。

## 相关链接

- [XML Schema](./xml-schema)
- [导入与模块](./import-modules)
- [加一张表](../guide/add-table)
