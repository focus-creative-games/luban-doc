---
sidebar_position: 6
---

# Non-Excel Data Sources

A table’s `input` is not limited to xlsx; it can also be json / xml / yaml / lua / directories, etc. Skills, AI, and editor-exported structured data often use these sources.

## input forms

| Form | Meaning | Example |
|------|------|------|
| `foo.xlsx` | Excel | `item.xlsx` |
| `sheet@foo.xlsx` | Specific sheet | `Bag@ui.xlsx` |
| `a.xlsx,b.xlsx` | Merge multiple files | |
| `foo.json` | **Single** record | Singleton or one config |
| `*@foo.json` | Record **list** | Main table data file |
| `field@foo.json` | Single record from a field | `data@bundle.json`; supports `a.b.c` |
| `*field@foo.json` | List from a field | `*items@bundle.json` |
| Directory | Walk files | Names starting with `.` `~` `_` are ignored |

```xml
<table name="TbItem" value="Item" index="id" input="item.xlsx"/>
<table name="TbSkill" value="Skill" index="id" input="*@skill/skills.json"/>
<table name="TbGlobal" value="Global" mode="one" input="global.json"/>
```

## JSON list example (`*@items.json`)

```json
[
  { "id": 1, "name": "剑", "cost": { "id": 1001, "count": 2 } },
  { "id": 2, "name": "盾", "cost": { "id": 1002, "count": 1 } }
]
```

Polymorphic fields:

```json
{
  "id": 1,
  "shape": { "$type": "Circle", "radius": 1.5 }
}
```

map: often defaults to `[[k,v],[k,v]]` form (consistent with dataTarget `json`); follow the current version’s parser.

## JSON single record (`global.json`)

```json
{
  "bag_init_size": 20,
  "bag_max_size": 100,
  "guild_open_level": 10
}
```

In `__tables__`: `mode=one`, `input=global.json`.

## Lua (file must `return`)

```lua
return {
  { id = 1, name = "剑", shape = { _type_ = "Circle", radius = 1.5 } },
  { id = 2, name = "盾", shape = { _type_ = "Rect", width = 2, height = 3 } },
}
```

List files use `*@xxx.lua`; note the polymorphic key is `_type_`.

## XML

```xml
<record>
  <id>1</id>
  <name>剑</name>
  <shape type="Circle">
    <radius>1.5</radius>
  </shape>
</record>
```

Collections commonly use repeated `<item>` nodes; maps use key/value child nodes (see sample projects).

## YAML

Similar to JSON; polymorphism still uses `$type`:

```yaml
- id: 1
  name: 剑
  shape:
    $type: Circle
    radius: 1.5
```

## Directory data sources

When `input="skills"` and `skills/` contains multiple files:

| File type | Default semantics |
|----------|----------|
| Non-Excel | **One record per file** (file name may help; follow parsing rules) |
| Excel | Still treated as multi-record tables |

When you need “many rows in one json”, use `*@file.json`; do not only point at a directory and expect it to be treated as an array automatically.

## Combining composite inputs

```text
item.xlsx,*@item_extra.json
```

Excel and JSON lists can be joined into the same logical table (watch for primary-key conflicts).

## Format comparison (within a single record)

| | json/yaml | lua | xml |
|--|-----------|-----|-----|
| Polymorphic type | `$type` | `_type_` | attribute `type` |
| map | `[[k,v],...]` | `{[k]=v,...}` | key/value item |
| set | array | table | item nodes |

There is also `.lit` (lite file), whose semantics are close to cell [lite](./compact).

## Common pitfalls

- Wrote `skills.json` (single record) but put an array inside → change to `*@skills.json`.
- Used `_type_` in JSON or `$type` in Lua → key name does not match the format.
- Files under a directory whose names start with `_` are ignored.
- Mixing with Excel causes primary-key duplicates and validation failure.

## Related links

- [Table input / mode](../schema/excel-schema)
- [Compact format (json/lua inside cells)](./compact)
- [Polymorphism](./polymorphism)
