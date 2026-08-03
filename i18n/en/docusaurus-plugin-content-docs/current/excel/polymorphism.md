---
sidebar_position: 3
---

# How to Fill Polymorphic Data

This page covers: when a field type is an **abstract bean** (with multiple subclasses), how to indicate which concrete subtype a cell is.

## In one sentence

Write the **concrete type name** (or alias) first, then fill data in that subclass’s field order.

## Schema example

```xml
<bean name="Shape"/>
<bean name="Circle" parent="Shape">
  <var name="radius" type="float"/>
</bean>
<bean name="Rect" parent="Shape" alias="矩形">
  <var name="width" type="float"/>
  <var name="height" type="float"/>
</bean>

<bean name="Spawn">
  <var name="id" type="int"/>
  <var name="shape" type="Shape"/>
</bean>
```

`Shape` is the abstract base class; `Circle` / `Rect` are instantiable subclasses.

## Excel: fill across columns

`shape` spans multiple columns: **merge** `shape` on the first row; the child row writes `$type` and each subclass field.

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
      <td>##type</td>
      <td>int</td>
      <td>string</td>
      <td>float</td>
      <td>float</td>
      <td>float</td>
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
      <td>Rect</td>
      <td></td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td></td>
      <td>3</td>
      <td>矩形</td>
      <td></td>
      <td>4</td>
      <td>5</td>
    </tr>
  </tbody>
</table>

Notes:

- The `$type` column (or the first value in the merged range) holds `Circle` / `Rect` / alias `矩形`.
- Leave unrelated field columns empty.
- Without a `$type` column name, the convention is still “first cell in the range = type name”.

## Excel: one cell (sep / lite)

When the field name or type carries sep / format, you can write it in one cell:

| ##var | id | shape#sep=, |
|---|---|---|
| ##type | int | Shape |
| | 1 | Circle,1.5 |
| | 2 | Rect,2,3 |

Or `shape#format=lite`:

| ##var | id | shape#format=lite |
|---|---|---|
| ##type | int | Shape |
| | 1 | {Circle,1.5} |
| | 2 | {Rect,2,3} |

See more in [sep](./vertical-and-sep) and [Compact format](./compact).

## Nullable polymorphism `Shape?`

| Cell | Meaning |
|--------|------|
| `null` or leave empty per rules | Empty |
| `Circle,1.5` / `{Circle,1.5}` | Non-null Circle |

## Other data sources

| Format | Type-field example |
|------|----------------|
| json / yaml | `"shape": { "$type": "Circle", "radius": 1.5 }` |
| lua | `shape = { _type_ = "Circle", radius = 1.5 }` |
| xml | `<shape type="Circle"><radius>1.5</radius></shape>` |

## Runtime (C# sketch)

```csharp
Shape s = row.Shape;
if (s is Circle c) { /* c.Radius */ }
else if (s is Rect r) { /* r.Width, r.Height */ }
```

## Common pitfalls

- Writing the abstract class name `Shape` instead of a subclass name.
- Typo in type name / alias.
- Subclass field order does not match Schema (column mode follows declaration order).
- Forgot `parent` in Schema, so the generated side has no polymorphism.

## Related links

- [Schema: Polymorphism](../schema/polymorphism)
- [Nested structures and collections](./nested-and-collections)
- [For designers: complex structures](../designer/complex)
