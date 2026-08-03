---
sidebar_position: 4
---

# How to fill complex structures

Coordinates, costs, reward lists, skill effects (polymorphism), and similar fields have headers more complex than “one number per column.” Fill from the **sample sheet** engineering gives you; the patterns below explain how to read them.

## Merged cells = one small structure

When one field (e.g. “cost”) spans several columns, engineering **merges** those columns to show they belong to one field. Fill subfields left to right. **Do not unmerge** the region, and do not insert unrelated columns in the middle.

Example (`cost` spans two columns: item id + count):

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
      <td>int</td>
      <td>int</td>
      <td>string</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1001</td>
      <td>5</td>
      <td>Exchange A</td>
    </tr>
  </tbody>
</table>

How to read: on row 1, `cost` spans two columns; the next header row has subfields `id` / `count`.  
Meaning: cost is 5 items with id=1001.

## Lists: several cells in a row / several rows

**Several cells in the same row** = multiple list elements (fill in header order).

When the **field name has `*`** (or engineering says “multi-row list”): following rows belong to the same main record’s list items. The primary-key column is often left empty to mean “continue previous row.” Follow the sample sheet; do not merge or split rows on your own.

Simple single-cell form (if the header documents a separator):

| ##var | id | item_ids |
|---|---|---|
| ##type | int | list,int |
| | 1 | 1001,1002,1003 |

Whether the separator is comma, `|`, or something else depends on that column’s header or `#sep` notes.

## Polymorphism: type name first, then parameters

Skill conditions, effects, shapes, and similar fields usually mark **which kind** first, then fill that kind’s parameters.

| What you fill | Meaning |
|--------|------|
| Type name / Chinese alias | Must come from engineering’s list, e.g. `Circle`, `矩形`, `Heal` |
| Following numbers/fields | Parameters for that type; leave unrelated columns empty |

Column layout example:

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">shape</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>$type</td>
      <td>radius</td>
      <td>width</td>
      <td>height</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>Circle</td>
      <td>1.5</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td>2</td>
      <td>矩形</td>
      <td></td>
      <td>2</td>
      <td>3</td>
    </tr>
  </tbody>
</table>

Compact one-cell form (if engineering enabled it):

| Cell example | Meaning |
|------------|------|
| `Circle,1.5` | Circle, radius 1.5 |
| `{Rect,2,3}` | Rect, width 2 height 3 |

Note: if engineering says the field **cannot be empty**, do not fill `null` or leave the whole segment blank.

## Short formats inside one cell

Some columns use `1,2,3` or `{1,2,3}`. Follow that column’s `sep` / `format` or sample row. Do not mix another table’s style.

## Habits when filling complex columns

1. Look at a valid existing row in the same column on the sample sheet; copy then edit.
2. In merged regions, change values only—not header structure.
3. Copy polymorphic type names from engineering’s list to avoid typos.
4. Generation errors include table name / row / column—send the full error to engineering for the fastest fix.

## Related links

- [Checklist](./checklist)
- [Header meanings](./headers)
- [For engineers: nesting and collections](../excel/nested-and-collections)
- [For engineers: polymorphism](../excel/polymorphism)
