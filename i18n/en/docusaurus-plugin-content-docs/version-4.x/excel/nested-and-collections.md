---
sidebar_position: 2
---

# Nested Structures and Collections

This page covers: filling beans, list/array/set/map in Excel, plus multi-level headers and multi-row lists.

When one field spans multiple columns in Excel, mark the range with **merged cells** (do not repeat the field name in every column). The HTML tables below use `colspan` to simulate merges.

### CSV and formats without merged cells

CSV cannot merge cells. To span multiple columns, put `[{fieldName}` in the **start column** and `{fieldName}]` in the **end column**; leave middle columns empty. This is equivalent to Excel merges.

Example: field `nums` (`list,int`) spans columns C–F: C1=`[{nums}`, F1=`{nums}]`; the `##type` row still says `list,int`; fill elements left to right.

![list multi-column](/img/use_list.jpg)

Element types can be enums or beans; `array` / `list` / `set` work similarly.

![list with struct elements](/img/use_list2.jpg)

For a **single cell**, use `sep=` to specify a separator (e.g. `sep=,`, `|`, `;`); see [sep and stream](./vertical-and-sep).

## Why multi-level headers (column constraints)

If composite data is filled purely in stream order across columns, **blank cells are skipped**, which misaligns fields easily; stream mode also does not support “empty = default”. Adding a child `##var` row names sub-fields and pins each to a column.

![multi-level headers](/img/cases/multileveltitle.jpg)

You can nest to any depth (x1 one level, y1 two levels, z1 three levels, etc.).

## Define the structures first

The examples below share these beans (XML sketch; you can also use `__beans__.xlsx`):

```xml
<bean name="Cost">
  <var name="id" type="int"/>
  <var name="count" type="int"/>
</bean>

<bean name="Reward">
  <var name="item_id" type="int"/>
  <var name="num" type="int"/>
  <var name="desc" type="string"/>
</bean>
```

## Bean: fill across merged columns

Field `cost` has type `Cost`. On the first row, **merge two columns** for `cost`; on the next `##var` row, write the child field names:

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="2">cost</th>
      <th>name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>id</td>
      <td>count</td>
      <td></td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <th colspan="2">Cost</th>
      <td>string</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1001</td>
      <td>5</td>
      <td>兑换A</td>
    </tr>
    <tr>
      <td></td>
      <td>2</td>
      <td>1002</td>
      <td>1</td>
      <td>兑换B</td>
    </tr>
  </tbody>
</table>

How to read it: `cost` spans two columns; the child row is `id` / `count`.

Equivalent understanding: `id=1, cost={id:1001,count:5}, name=兑换A`.

## Nested beans

When `reward` nests another `cost`: merge `reward` on the outer level, then merge `cost` inside:

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">reward</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>item_id</td>
      <td>num</td>
      <td colspan="2">cost</td>
    </tr>
    <tr>
      <td>##var</td>
      <td></td>
      <td></td>
      <td></td>
      <td>id</td>
      <td>count</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <th colspan="3">Reward</th>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>2001</td>
      <td>10</td>
      <td>1001</td>
      <td>2</td>
    </tr>
  </tbody>
</table>

You can also skip multi-level headers and pack the nested structure into one cell with [sep / compact format](./compact).

## list / array / set

Use merged cells to mark the full column span of the list; fill elements left to right; **blank cells are often ignored**.

### `list,int` (up to 4 elements)

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">nums</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1</td>
      <td>3</td>
      <td>5</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td>2</td>
      <td>10</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

Result: `id=1 → nums=[1,3,5]`; `id=2 → nums=[10]`.

### `list,Cost`

Each element takes the bean width (here 2 columns), then multiple elements are laid out horizontally; the first row still merges `costs` only once:

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">costs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>id</td>
      <td>count</td>
      <td>id</td>
      <td>count</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1001</td>
      <td>2</td>
      <td>1002</td>
      <td>1</td>
    </tr>
  </tbody>
</table>

→ `costs=[{1001,2},{1002,1}]`.

## map

`map,int,string`: within the merged range, fill **key/value pairs**.

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">dict</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>string</td>
      <td>int</td>
      <td>string</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1</td>
      <td>剑</td>
      <td>2</td>
      <td>盾</td>
    </tr>
  </tbody>
</table>

→ `{1:"剑", 2:"盾"}`.

### Single cell + dual sep

Maps can also be filled in one cell. To separate key/value and each pair, configure **two separators**, e.g. `map#sep=,;` or `(map#sep=,;),int,Item#sep=,`: the first splits pairs, the second splits key from value (or fields inside value). When value is a bean, each value segment is read in stream mode with sep.

![map single cell](/img/use_map.jpg)

When value is a struct:

![map value is bean](/img/use_map2.jpg)

Maps also support `*fieldName` multi-row filling:

![map multi-row](/img/use_map3.jpg)

### Column-constrained form (keys as child column names)

Merge `attrs` on the upper level; use fixed keys as column names below:

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="3">attrs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>atk</td>
      <td>def</td>
      <td>hp</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>10</td>
      <td>5</td>
      <td>100</td>
    </tr>
  </tbody>
</table>

Non-empty cells mean that key-value exists. Example: for id=1, y2 has child columns `aaa` and `ccc` with `1` and `2` → `{{"aaa",1},{"ccc",2}}`; id=2 with `bbb=10, ccc=20, ddd=30` → `{{"bbb",10},{"ccc",20},{"ddd",30}}`.

![map column constraint](/img/cases/title_map.jpg)

:::tip
The above is **column-constrained** map filling. In stream/sep cells, maps also support alternating key-value and compact sep forms; see [sep and stream](./vertical-and-sep).
:::

### Column constraint + multi-row (`$key`)

In multi-row mode, the `$key` child column is the map key; remaining columns are value sub-fields (good when value is a bean).

## Multi-row list `*<name>`

When the field name is written as `*rewards`, **multiple rows under the same primary key** represent multiple list elements; merge columns for `*rewards` on the first row:

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="3">*rewards</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>item_id</td>
      <td>num</td>
      <td>desc</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>string</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1001</td>
      <td>1</td>
      <td>第一项</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>1002</td>
      <td>2</td>
      <td>第二项</td>
    </tr>
    <tr>
      <td></td>
      <td>2</td>
      <td>2001</td>
      <td>1</td>
      <td></td>
    </tr>
  </tbody>
</table>

→ id=1 has two rewards; id=2 has one. Good for “one main row + many sub-config rows”.

**Arbitrary nesting** is supported: each element in a multi-row list can itself be multi-row. For `array,bean` / `list,bean`, pair with column constraints on element sub-fields.

![multi-row struct list](/img/cases/multiline.jpg)

## Extra column-constrained notes

Under column constraints, **only atomic types** (e.g. `int`, `string`) support default values when left empty (`int`→0, `int?`→null). If the lowest constrained type is still a container or bean (sub-fields not pinned), child data is still read in **stream** mode and blanks are skipped.

![column constraint with stream](/img/cases/titlelimit.jpg)

| Form | Purpose |
|------|------|
| `$type` | Type column for polymorphic / nullable beans; for flags enums (`flags=1`), enum items as child columns, OR of non-zero/non-empty cells |
| `$value` | Limits actual bean field range; fill all fields in **stream** mode inside `$value` |
| `$key` | Key column for map multi-row mode |

Flags enum column constraint example:

![flags column constraint](/img/cases/title_enum.jpg)

Polymorphic `$type` + `$value` example:

![polymorphic column constraint](/img/cases/title_dynamic_bean.jpg)

## Common pitfalls

- Merged column count does not match the columns actually used by the bean / container.
- Docs or headers repeat the field name in every column, which mismatches Excel merge semantics and confuses designers.
- Blanks in the middle of a `list` are ignored, shifting elements (use compact format or explicit separators when you need placeholders).
- map has only key, no value.
- Container element types marked nullable (current rules generally disallow this).

## Related links

- [Filling polymorphism](./polymorphism)
- [sep and vertical tables](./vertical-and-sep)
- [Compact format](./compact)
