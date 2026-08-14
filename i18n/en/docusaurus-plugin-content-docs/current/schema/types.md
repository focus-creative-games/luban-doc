---
sidebar_position: 3
---

# Type System Cheat Sheet

Types appear in bean field `type`, Excel `##type` rows, or validator tags. This page gives copy-ready forms; for how to fill cells see [Excel basics](../excel/basics).

## Basic types

| Type | Description | Sample data |
|------|------|------------|
| bool | Case-insensitive | `true` / `false` / `0` / `1` / `是` / `否` |
| byte / short / int / long | Integers | `1001` |
| float / double | Floating point | `1.5` |
| string | String | `hello`; empty string fill `""` |
| text | Sugar for `string#text=1` | Localization key; validity is checked |
| datetime | Exported as UTC seconds (long) | `2024-01-01 12:00:00` |

## Custom types

| Type | Description |
|------|------|
| enum | Enum; fill item name or alias |
| bean | Composite type; may inherit / be polymorphic |

When referencing in schema, write the full type name or the short name in the current module, e.g. `Quality`, `item.Cost`, `Shape`.

## Containers

| Form | Description |
|------|------|
| `array,T` | Array |
| `list,T` | List |
| `set,T` | Set |
| `map,K,V` | Map; K is generally a base type or enum |

Constraint: **element / key / value cannot be nullable** (cannot write `list,int?`, `map,int?,string`).

Schema example:

```xml
<bean name="Bag">
  <var name="id" type="int"/>
  <var name="item_ids" type="list,int"/>
  <var name="tags" type="set,string"/>
  <var name="attrs" type="map,int,int"/>
  <var name="costs" type="list,Cost"/>
</bean>
```

With separator, length, and other tags, put container tags on the container, usually with parentheses:

| Form | Meaning |
|------|------|
| `(list#sep=\|),int` | Separate with `\|` inside the cell |
| `(list#size=4),int` | Length must be 4 |
| `(list#sep=;),Cost#sep=,` | List uses `;`, element Cost uses `,` |
| `(map#sep=,),int,string` | Compact map |

Excel column / multi-row filling: see [Nested structures and collections](../excel/nested-and-collections).

## Nullable

| Form | Meaning |
|------|------|
| `int?` / `string?` / `Cost?` | Atomic or non-polymorphic bean nullable |
| `Shape` | Polymorphic and non-nullable: must give a concrete subclass; cannot be `null` |
| `Shape?` | Nullable polymorphism: empty / `null` allowed |

Containers themselves do not support element-nullable forms like `list,T?`.

## Common tags on fields

Written in the type string (Excel `##type` or XML `type="..."`):

| Form | Effect |
|------|------|
| `int!` | Cannot be the default (e.g. 0) |
| `int#ref=item.TbItem` | Reference check |
| `int#ref=item.TbItem?` | 0 / empty may skip the reference |
| `int#ref=a.TbA,b.TbB` | Multi-table reference |
| `string#path=unity` | Asset path check |
| `int#range=[1,100]` | Range |
| `int#set=1;2;3` | Allowed value set |
| `(list#index=id),Foo` | Build an auxiliary index on list elements by id (e.g. C#) |

Full details: [Validators](../quality/validators).

## Special types

| Type | Description |
|------|------|
| table | Manager class for each config table (e.g. `TbItem`) |
| Tables | Entry class; name comes from `targets[].manager` |

## External type mapping (TypeMapper)

You can map bean/enum to existing project types (e.g. `UnityEngine.Vector3`, `UnityEngine.AudioType`). Full syntax, matching rules, and examples: [External type mapping (TypeMapper)](./type-mapper).

## Related links

- [TypeMapper](./type-mapper)
- [Polymorphism](./polymorphism)
- [Excel: nested structures and collections](../excel/nested-and-collections)
- [Validators](../quality/validators)
