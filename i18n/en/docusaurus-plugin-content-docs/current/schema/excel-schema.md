---
sidebar_position: 1
---

# Defining Schema in Excel

Maintain structure definitions in tables with `__tables__.xlsx` / `__beans__.xlsx` / `__enums__.xlsx` (exact file names depend on the project). Good when business tables add fields often and you want designers to see the structure tables too.

## Hook them up in luban.conf

```json
"schemaFiles": [
  {"fileName": "Defines", "type": ""},
  {"fileName": "Datas/__tables__.xlsx", "type": "table"},
  {"fileName": "Datas/__beans__.xlsx", "type": "bean"},
  {"fileName": "Datas/__enums__.xlsx", "type": "enum"}
]
```

| type | Content |
|------|------|
| `table` | Which tables exist, input, index, mode, value type, etc. |
| `bean` | Structs and fields |
| `enum` | Enum items |

The three definition kinds must be kept in separate files (or sheets); column names follow your project template—examples below use logical column names.

## `__tables__` example

| full_name | value_type | read_schema_from_file | input | index | mode | group | comment |
|---|---|---|---|---|---|---|---|
| TbItem | Item | false | item.xlsx | id | | | 道具表 |
| item.TbEquip | item.Equip | true | item/equip.xlsx | id | map | c,s | 从数据表头读字段 |
| TbDropList | DropEntry | false | drop.xlsx | | list | | 无主键列表 |
| TbUnionKey | UnionRow | false | union.xlsx | key1+key2 | list | | 联合主键 |
| TbMultiKey | MultiKeyRow | false | multi.xlsx | key1,key2 | list | | 两个独立索引 |
| TbGlobal | GlobalConfig | false | global.xlsx | | one | | 全局单例 |

Field meanings:

| Column | Description |
|----|------|
| full_name | Full table name; may include a module prefix, e.g. `item.TbEquip` |
| value_type | Row-record bean name; may use the same module prefix |
| read_schema_from_file | `true`: infer bean fields from the **data table** header; do not also define the same-named bean in `__beans__` |
| input | Data source relative to `dataDir`; comma for multiple files, or `SheetName@file.xlsx` |
| index | Primary key; composite with `a+b`, multiple independent indexes with `a,b`; often empty for list/one |
| mode | `map` (default) / `list` / `one` (or `singleton`) |
| group | Table-level export groups; empty uses groups with `default: true` in `luban.conf` |
| comment / tags / output | Comment, tags, custom output file name (optional) |

### mode / index mapping

| Need | mode | index | Typical generated usage |
|------|------|-------|----------------|
| Ordinary id table | empty or `map` | `id` | `Get(id)` / dictionary |
| List without primary key | `list` | empty | Iterate the list |
| Composite primary key | `list` | `a+b` | Multi-field uniqueness |
| Independent multi-index | `list` | `a,b` | Multiple lookup dictionaries |
| Global singleton | `one` | empty | One config per table (or vertical table) |

:::caution
Most languages lack built-in composite-key hash maps. Only a few (e.g. C#, Python) get generated joint-index APIs; **data export still validates joint keys regardless of generated code.**
:::

When index is omitted and mode is map, the first field of the value bean is often taken by default.

### Two ways to build beans

**A. Explicit definition in `__beans__` (recommended for stable structures)**

`__tables__`: `read_schema_from_file=false`, `value_type=Item`; define `Item` fields in `__beans__`.

**B. Read definition from the data table header (good for quick add-table)**

`__tables__`: `read_schema_from_file=true`, data table has `##var` / `##type`:

| ##var | id | name | price |
|---|---|---|---|
| ##type | int | string | int |
| | 1001 | 金币 | 0 |

In this case **do not** also define same-named `Item`/`Reward` in `__beans__`, or you get a duplicate-definition error. The table itself must still be registered in `__tables__`.

## `__beans__` example

| full_name | parent | valueType | sep | alias | group | comment | fields |
|---|---|---|---|---|---|---|---|
| Vec3 | | true | , | | | 三维向量 | （见下） |
| Cost | | | | | | 消耗 | （见下） |
| Shape | | | | | | 形状基类 | （可无字段） |
| Circle | Shape | | | | | 圆 | （见下） |

Field lists in Excel are usually nested columns/sub-tables; logically equivalent to:

| bean | name | type | group | comment |
|------|------|------|-------|---------|
| Vec3 | x | float | | |
| Vec3 | y | float | | |
| Vec3 | z | float | | |
| Cost | id | int | | 道具 id |
| Cost | count | int | | 数量 |
| Circle | radius | float | | |

| Column | Description |
|----|------|
| full_name | Full bean name, e.g. `common.Vec3` |
| parent | Full parent name; when there are subclasses the parent is generally abstract |
| valueType | When `true`, export with value-type semantics (e.g. vectors) |
| sep | Default separator for stream/compact filling, e.g. `,` |
| alias | Chinese alias etc. usable when filling polymorphic data |
| fields | name / type / group / comment / tags |

Type string forms: see [Type cheat sheet](./types); polymorphism: see [Polymorphism](./polymorphism).

## `__enums__` example

| full_name | flags | unique | comment | items |
|---|---|---|---|---|
| Quality | false | true | 品质 | （见下） |
| OpenFlag | true | | 开关位 | （见下） |

Enum items, logical sketch:

| enum | name | alias | value | comment |
|------|------|-------|-------|---------|
| Quality | WHITE | 白 | 1 | |
| Quality | GREEN | 绿 | 2 | |
| Quality | BLUE | 蓝 | 3 | |
| OpenFlag | None | | 0 | |
| OpenFlag | A | | 1 | |
| OpenFlag | B | | 2 | |
| OpenFlag | C | | A\|B | flags combination |

| Column | Description |
|----|------|
| flags | Whether it is a bit-flags enum |
| unique | Whether item values must be unique |
| items.name / alias / value | Item name, fill-in alias, explicit value (decimal/hex, or `A\|B`) |

In data tables you may fill `白` or `WHITE` (when alias exists).

## Coexisting with XML

The same project can have both `Defines/*.xml` and `__*.xlsx`:

- Vectors, shared structures, deep inheritance → XML (`Defines`)
- Business table registration, business bean/enum → Excel schema

They merge into one Schema; type names must not conflict.

## Common pitfalls

- Only changed the data table header, but `read_schema_from_file=false` and `__beans__` was not updated.
- `read_schema_from_file=true` and also redefined the same bean in `__beans__`.
- mode/index does not match lookup style (e.g. want `Get(id)` but wrote `list`).
- `input` paths are relative to `dataDir`; wrong paths cause “data not found”.

## Related links

- [XML Schema](./xml-schema)
- [Imports and modules](./import-modules)
- [Add a table](../guide/add-table)
