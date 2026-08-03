---
sidebar_position: 4
---

# Polymorphism and Abstract Beans

Make the base class an abstract type (with subclasses); data distinguishes implementations by **type name** (or alias); generated code uses inheritance, and loading yields concrete subclass instances.

Good for skills, AI, quests, dungeons, and other GamePlay data where “one field, many structures”.

## Schema: XML

**Form 1: nested child beans (parent linked automatically)**

```xml
<bean name="Shape">
  <bean name="Circle" alias="圆">
    <var name="radius" type="float"/>
  </bean>
  <bean name="Rect" alias="矩形">
    <var name="width" type="float"/>
    <var name="height" type="float"/>
  </bean>
</bean>

<bean name="Spawn">
  <var name="id" type="int"/>
  <var name="shape" type="Shape"/>
</bean>
```

**Form 2: flat + parent**

```xml
<bean name="Shape"/>
<bean name="Circle" parent="Shape" alias="圆">
  <var name="radius" type="float"/>
</bean>
<bean name="Rect" parent="Shape" alias="矩形">
  <var name="width" type="float"/>
  <var name="height" type="float"/>
</bean>
```

Key points:

- A parent bean with subclasses is generally an **abstract type**; do not write the parent name `Shape` as the type in data.
- Subclass fields = parent field hierarchy + own fields.
- `alias` lets designers write 「圆」「矩形」 in Excel.

## Schema: Excel `__beans__`

Logically equivalent to the above (column names follow the template):

| full_name | parent | alias | comment |
|---|---|---|---|
| Shape | | | 形状基类 |
| Circle | Shape | 圆 | |
| Rect | Shape | 矩形 | |

| bean | name | type |
|------|------|------|
| Circle | radius | float |
| Rect | width | float |
| Rect | height | float |
| Spawn | id | int |
| Spawn | shape | Shape |

## Nullable vs non-nullable

| Field type | Meaning |
|----------|------|
| `Shape` | Non-nullable polymorphism: every row must be some subclass; cannot fill `null` |
| `Shape?` | Nullable polymorphism: empty / `null` allowed |

```xml
<var name="shape" type="Shape"/>     <!-- must fill a concrete subclass -->
<var name="shape2" type="Shape?"/>   <!-- may be null -->
```

In compact format, non-nullable should be `{Circle,1.5}`, not `null`. See [Compact format](../excel/compact).

## How to fill data

Excel columns, compact, json, etc.: see [Excel: filling polymorphism](../excel/polymorphism). Column sketch:

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
      <td>矩形</td>
      <td></td>
      <td>2</td>
      <td>3</td>
    </tr>
  </tbody>
</table>

## How to use at runtime (C# sketch)

```csharp
switch (spawn.Shape)
{
    case Circle c:
        // use c.Radius
        break;
    case Rect r:
        // use r.Width / r.Height
        break;
}
```

With many types you can branch on `GetTypeId()` / `__ID__` (see generated code in sample projects). Complex skill trees etc. can also put polymorphic data in JSON sources; see [Other data sources](../excel/other-sources).

## Common pitfalls

- Forgot to define subclasses, or wrong `parent` spelling / module prefix.
- Wrote the abstract parent name as `$type` in data.
- Type is `Shape` (not `Shape?`) but filled `null`.
- Chinese names used by designers lack configured `alias`.

## Related links

- [Type cheat sheet](./types)
- [Excel polymorphism](../excel/polymorphism)
- [XML Schema](./xml-schema)
