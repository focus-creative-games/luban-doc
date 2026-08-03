---
sidebar_position: 5
---

# Importing Tables and Organizing Modules

This page covers: how to split namespaces, multiple files for one logical table, reusing shared types, and (optionally) auto-importing tables by file name.

## Modules / namespaces

**XML**: nest `<module>`.

```xml
<module name="item">
  <bean name="Item">...</bean>
  <table name="TbItem" value="Item" input="item/item.xlsx"/>

  <module name="equip">
    <table name="TbEquip" value="Equip" input="item/equip.xlsx"/>
  </module>
</module>
```

Full names: `item.Item`, `item.TbItem`, `item.equip.TbEquip`.

**Excel schema**: write dotted names directly in `full_name` / `value_type`.

| full_name | value_type | input |
|---|---|---|
| item.TbItem | item.Item | item/item.xlsx |
| item.equip.TbEquip | item.equip.Equip | item/equip.xlsx |

Sensible modules help: clearer code layout, fewer table-name clashes, and xlsx split by system.

## Multi-file input (one logical table)

Comma-separate `input` to merge multiple files into one table (good for split-file collaboration):

| full_name | value_type | input | index |
|---|---|---|---|
| TbItem | Item | item_part1.xlsx,item_part2.xlsx | id |

```xml
<table name="TbItem" value="Item" index="id"
       input="item/item_part1.xlsx,item/item_part2.xlsx"/>
```

Directories also work: `input="ai/blackboards"` (reads data files under the directory). Single sheet: `Bag@bag.xlsx`.

## Reusing shared types

Put vectors, costs, time ranges, etc. in a shared module; business tables only reference the type name:

```xml
<!-- Defines/common.xml -->
<module name="common">
  <bean name="Cost">
    <var name="id" type="int"/>
    <var name="count" type="int"/>
  </bean>
</module>

<!-- Defines/item.xml -->
<module name="item">
  <bean name="Item">
    <var name="id" type="int"/>
    <var name="craft_cost" type="list,common.Cost"/>
  </bean>
</module>
```

In Excel `__beans__`, `type` can likewise be `common.Cost`.

## refgroup (multi-table references)

When several tables can be `#ref=` targets, use refgroup to avoid repeating names:

```xml
<refgroup name="item_tables" ref="item.TbItem,item.TbItemExtra"/>

<bean name="Reward">
  <var name="item_id" type="int#ref=item_tables"/>
</bean>
```

Equivalent to `int#ref=item.TbItem,item.TbItemExtra`. Multi-table refs generally do not generate a “single-table Ref field”; see [Validators](../quality/validators).

## Auto-import tables (optional)

If you do not want to hand-write every table in `__tables__`, use the default TableImporter: scan Excel/CSV whose file names start with `#`, and generate table declarations by rule (**does not** write back to `__tables__.xlsx`).

| File (relative to project) | Inferred result |
|------------------|----------|
| `#Item.xlsx` | `TbItem` / value=`Item` / mode=map |
| `reward/#Reward.xlsx` | `reward.TbReward` / `reward.Reward` |
| `item/equip/#Equip.csv` | `item.equip.TbEquip` / `item.equip.Equip` |

Common CLI overrides:

```text
-x tableImporter.name=default
-x tableImporter.filePattern=#(.*)
-x tableImporter.tableNameFormat=Tb{0}
```

`tableImporter.name=none` disables auto-import.

Limits (for complex sources, hand-write `__tables__` / XML):

- Does not support merging multiple files into one table
- Does not support rules like “export only a certain sheet”
- Only covers common map shapes; not `one` / special index

## Suggested directory layout

```text
Project/
  luban.conf
  Defines/
    builtin.xml      # vec2/vec3 etc.
    common.xml
    item.xml
  Datas/
    __tables__.xlsx
    __beans__.xlsx
    __enums__.xlsx
    item/
      item.xlsx
      equip.xlsx
    reward/
      reward.xlsx
```

| Practice | Notes |
|------|------|
| Split directories by system | `Datas/item/`, `Datas/skill/` |
| Split large tables | Multiple xlsx on the same table `input` |
| Stable types in XML | Rarely changed, heavily referenced → `Defines` |
| Business registration in Excel | `__tables__` / `__beans__` next to data |

## Related links

- [luban.conf](../concepts/luban-conf)
- [Excel Schema](./excel-schema)
- [XML Schema](./xml-schema)
- [Add a table](../guide/add-table)
