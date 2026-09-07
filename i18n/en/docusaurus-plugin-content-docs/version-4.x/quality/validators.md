---
sidebar_position: 1
---

# Data validators

Validation runs at **generation time**, blocking bad data before it ships. Release pipelines should add `--validationFailAsError` (validation failure fails generation).

Validators are written on the field type string (XML `type="..."` or Excel `##type`), using the same syntax as [Type cheat sheet](../schema/types).

## Overview

| Capability | Example | Description |
|------|----------|------|
| Non-default | `int!`, `int?!` | Must not be the type default / null |
| Reference | `int#ref=item.TbItem` | Must be a valid primary key in the target table |
| Ignore 0 / empty string | `int#ref=item.TbItem?` | Skip reference check when value is 0 or `""` |
| Multi-table reference | `int#ref=a.TbA,b.TbB` or refgroup | Multi-table refs usually do not generate `xxx_Ref` |
| Path | `string#path=unity` | Requires `-x pathValidator.rootDir=...` |
| Range | `int#range=[1,100]` | Open/closed intervals |
| Container size | `(list#size=4),int` | `size` goes on the **container** |
| Allowed value set | `int#set=1;2;3` | Prefer `;` as separator |
| Regex | `string#regex=^[a-z]+$` | string must match the pattern |
| list index | `(list#index=id),Foo` | A field on each element must be unique; some languages generate a helper dictionary |

When a nullable field is `null`, most reference-style validators are skipped.

## Non-default `!`

```xml
<var name="id" type="int!"/>           <!-- must not be 0 -->
<var name="opt" type="int?!"/>         <!-- must not be null -->
<var name="ids" type="list,int!"/>     <!-- elements must not be 0 -->
<var name="kv" type="map,int!,string!"/>
```

## Reference `ref`

### map tables (most common)

Only write the **full name** of the referenced table:

```xml
<bean name="Gift">
  <var name="item_id" type="int#ref=item.TbItem"/>
  <var name="item_ids" type="list,(int#ref=item.TbItem)"/>
  <var name="weights" type="map,(int#ref=item.TbItem),int"/>
</bean>
```

Equivalent Excel headers:

| ##var | id | item_id | item_ids |
|---|---|---|---|
| ##type | int | int#ref=item.TbItem | (list#sep=\|),(int#ref=item.TbItem) |
| | 1 | 1001 | 1001\|1002 |
| | 2 | 9999 | | 

If `9999` is not in `item.TbItem`, generation fails with an error.

### Ignoring blanks / nullables

| Syntax | Behavior |
|------|------|
| `int#ref=item.TbItem?` | Skip check when value is `0` |
| `int?#ref=item.TbItem` | Skip when value is `null` |
| `int?#ref=item.TbItem?` | Skip for both `null` and `0` |

### list tables / singleton tables

| Referenced table mode | Syntax |
|---------------|------|
| list (multi-key) | `ref=keyName@table.TbXxx` |
| one (singleton) | `ref=mapField@table.TbXxx` (referenced field must be a map, and key types must match) |

### Multi-table and refgroup

```xml
<refgroup name="item_tables" ref="item.TbItem,item.TbEquip"/>

<bean name="Reward">
  <var name="id" type="int#ref=item.TbItem,item.TbEquip"/>
  <var name="id2" type="int#ref=item_tables"/>
  <var name="id3" type="int#ref=item_tables?"/>
</bean>
```

### Generated `xxx_Ref` fields (C# and similar)

Single-table `ref` often generates an extra reference field, filled automatically after load:

```csharp
public int ItemId { get; private set; }
public item.Item ItemId_Ref { get; private set; }
```

**Multi-table refs do not generate** `xxx_Ref`.

## Path `path`

Applies only to `string` (and strings inside containers). You must set the asset root directory; otherwise path validation is disabled with a warning:

```bash
-x pathValidator.rootDir=D:/Game/Client
```

| Subtype | Syntax | Path checked |
|--------|------|----------|
| normal | `string#path=normal;UI/*.text` | `{rootDir}/UI/{field value}.text` (`*` is replaced by the field value) |
| unity | `string#path=unity` | `{rootDir}/{field value}` (usually includes the extension) |
| ue | `string#path=ue` | Looks under Content for `.uasset` / `.umap`; may strip a `blueprint'` prefix |
| godot | `string#path=godot` | Handles `res://` and similar |

```xml
<var name="icon" type="string#path=unity"/>
<var name="prefabs" type="list,string#path=normal;Prefabs/*.prefab"/>
```

## Range `range`

```xml
<var name="lv" type="int#range=[1,100]"/>
<var name="rate" type="float#range=(0,1]"/>
<var name="min_only" type="int#range=[1,]"/>
```

| Syntax | Meaning |
|------|------|
| `10` | Must equal 10 |
| `[1,10]` | Closed interval |
| `(1,10)` / `[1,10)` / `(1,10]` | Open/closed combinations |
| `[1,]` / `[,100]` | One-sided infinity |

## Container size `size`

`size` must be placed on the **container**, with parentheses:

```xml
<!-- Correct -->
<var name="x" type="(list#size=4),int"/>
<var name="y" type="(map#size=[5,10]),int,int"/>

<!-- Wrong: size would apply to the element -->
<!-- <var name="x" type="list,int#size=4"/> -->
```

## Allowed values `set`

Supports int / long / string / enum and their containers. Separators may be `,` or `;`; **prefer `;`**. When values contain `,`, wrap `set` in parentheses:

```xml
<var name="a" type="int#set=1;2;3"/>
<var name="b" type="int#(set=1,2,3)"/>
<var name="c" type="Quality#set=WHITE;GREEN"/>
<var name="d" type="list,int#set=1;2;3;4"/>
```

## list element index `index`

Requires a field on elements of `list,Bean` / `array,Bean` to be unique:

```xml
<bean name="Foo">
  <var name="id" type="int"/>
  <var name="name" type="string"/>
</bean>
<bean name="Bar">
  <var name="foos" type="(list#index=id),Foo"/>
</bean>
```

C# and similar may also generate a `Foos_id` dictionary for lookup by id.

## Interaction with record tags

A row tagged `unchecked` skips validators (use sparingly). See [tags](./tags).

## Custom validation

When built-in validators are not enough, build a separate validation project (load generated data and assert). See CfgValidator-style projects in the examples repo.

## Related links

- [tags](./tags)
- [Type cheat sheet](../schema/types)
- [Common CLI](../runtime/cli-common)
