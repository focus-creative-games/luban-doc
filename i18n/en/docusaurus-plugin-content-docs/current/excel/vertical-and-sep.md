---
sidebar_position: 4
---

# Vertical Tables, sep, and Stream Filling

## Vertical tables (common for singleton config)

Horizontal table: one record per row. Vertical table: A1 is `##column` or `##vertical`, **one field per row**, good for global config.

### Schema

```xml
<table name="TbGlobal" value="GlobalConfig" mode="one" input="global.xlsx"/>
```

```xml
<bean name="GlobalConfig">
  <var name="bag_init_size" type="int"/>
  <var name="bag_max_size" type="int"/>
  <var name="guild_open_level" type="int"/>
</bean>
```

### Horizontal form (for comparison)

| ##var | bag_init_size | bag_max_size | guild_open_level |
|---|---|---|---|
| ##type | int | int | int |
| | 20 | 100 | 10 |

### Vertical form

A1 must be `##column` (or `##vertical`):

| ##column | ##type | ## |
|---|---|---|
| bag_init_size | int | 20 |
| bag_max_size | int | 100 |
| guild_open_level | int | 10 |

## sep: write composite data in one cell

If giving each field its own column makes the table too wide, use `sep=<char>` to split within one cell.

`sep` can be written on:

| Location | Example |
|------|------|
| Excel field name | `pos#sep=,` |
| bean tags | `<bean name="Vec3" tags="sep=,">` |
| type | `Type1#sep=,`, `(list#sep=\|),int` |

Multiple characters mean “any of these characters is a separator”, not that the whole string is one separator. When `#` / `&` are separators, write `\#` / `\&`.

### Example: Vec3

```xml
<bean name="Vec3" sep=",">
  <var name="x" type="float"/>
  <var name="y" type="float"/>
  <var name="z" type="float"/>
</bean>
```

| ##var | id | pos |
|---|---|---|
| ##type | int | Vec3 |
| | 1 | 1.0,2.0,3.0 |
| | 2 | 0,0,1 |

Or declare only on the field name: `pos#sep=,`, with type still `Vec3`.

### Example: nesting + sep

```xml
<bean name="Type1">
  <var name="a" type="int"/>
  <var name="b" type="string"/>
  <var name="c" type="bool"/>
</bean>
<bean name="Type3">
  <var name="a" type="int"/>
  <var name="b" type="bool"/>
  <var name="c" type="Type1#sep=,"/>
</bean>
```

| ##var | id | a | b | c |
|---|---|---|---|---|
| ##type | int | int | bool | Type1#sep=, |
| | 1 | 10 | true | 1,hello,false |

→ `c = { a:1, b:"hello", c:false }`.

### Example: list + sep

Field name `nums`, type `(list#sep=|),int`:

| ##var | id | nums |
|---|---|---|
| ##type | int | (list#sep=\|),int |
| | 1 | 1\|3\|5\|9 |

→ `nums = [1,3,5,9]`.

## Stream semantics

When a field does not specify `format`, composite data is read in **stream** mode by default:

| Behavior | Notes |
|------|------|
| Blank cell | Often skipped (unlike column mode where “empty = default”) |
| Nullable bean | `null` / `{}` / type name, etc. have special conventions |
| End of container | Read until `}` or end of stream |

Therefore: “leave empty for default” often does not work in sep/stream cells; the blank is treated as a skip.

## Common pitfalls

- Forgot to change A1 to `##column` for a vertical table.
- Number of sep segments does not match the number of fields.
- Used blanks for 0/false in a stream cell, causing field misalignment.

## Related links

- [Excel basics](./basics)
- [Compact format](./compact)
- [Nested structures and collections](./nested-and-collections)
