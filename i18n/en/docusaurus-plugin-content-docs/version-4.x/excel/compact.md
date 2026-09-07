---
sidebar_position: 5
---

# Compact Format (stream / lite / json / lua)

Since v4.0, non-atomic fields can declare cell format on the **field name** (not on `##type`):

```text
pos#format=lite
cost#format=json
```

## Four formats

| format | Meaning | Typical cell |
|--------|------|------------|
| `stream` (default) | Stream; blanks often skipped | With sep: `1,2,3` |
| `lite` | Braces; usually no field names | `{1.0,2.0,3.0}` |
| `json` | JSON inside the cell | `{"x":1,"y":2}` |
| `lua` | Lua table inside the cell | `{x=1,y=2}` |

## Full lite example

```xml
<bean name="Vec3">
  <var name="x" type="float"/>
  <var name="y" type="float"/>
  <var name="z" type="float"/>
</bean>
<bean name="Shape"/>
<bean name="Circle" parent="Shape">
  <var name="radius" type="float"/>
</bean>
```

| ##var | id | pos#format=lite | shape#format=lite | tags#format=lite |
|---|---|---|---|---|
| ##type | int | Vec3 | Shape | list,int |
| | 1 | {1,2,3} | {Circle,1.5} | {10,20,30} |
| | 2 | {0,0,1} | {Circle,2.0} | {} |

Key points:

| Rule | Notes |
|------|------|
| bean / container | Use `{...}`; nesting allowed `{1,xxxx,{1,2,3}}` |
| Polymorphism | `{TypeName,field1,field2,...}`; when the type is `Shape` (not `Shape?`) you must give a concrete subclass; cannot write `null` |
| Nullable bean (`T?`) | Only then may you write `null`; do not write `{null}` |
| Defaults | **Does not support** column mode’s “omit field → use default” |
| Whitespace | Whitespace similar to HTML is stripped |

## json cell example

| ##var | id | pos#format=json | shape#format=json |
|---|---|---|---|
| ##type | int | Vec3 | Shape |
| | 1 | {"x":1,"y":2,"z":3} | {"$type":"Circle","radius":1.5} |

Good when matching JSON fragments exported by external tools.

## lua cell example

| ##var | id | pos#format=lua |
|---|---|---|
| ##type | int | Vec3 |
| | 1 | {x=1,y=2,z=3} |

For polymorphic fields the type key is generally `_type_` (same as file-based lua data sources).

## Choosing among sep / column mode

| Scenario | Suggestion |
|------|------|
| Designers want to read each column at a glance | Columns + merged cells |
| Short vectors, small structs | `sep` or `lite` |
| Existing JSON fragments | `json` |
| Very long lists that would explode columns | lite/json, or [multi-row lists](./nested-and-collections) |

## Common pitfalls

- Putting `#format=lite` on `##type` → no effect; put it on the field name.
- Writing `{null}` in lite for nullable → write `null` instead.
- Assuming lite can omit middle fields for defaults → it cannot; write them all or use column mode.

## Related links

- [Vertical tables and sep](./vertical-and-sep)
- [Other data sources (whole-file json/lua)](./other-sources)
- [Polymorphism](./polymorphism)
