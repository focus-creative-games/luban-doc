---
sidebar_position: 4
---

# Code style and TypeMapper

## Naming style

Controlled via `-x`:

```bash
-x codeStyle=csharp-default
-x namingConvention.cs-bin.field=camel
```

Common style names: `none`, and each language's `*-default`. Styles can apply separately to namespace / type / method / property / field / enumItem, and so on.

Fields named like `item_id` are often generated as `ItemId` by default in C#.

## TypeMapper (mainly C# for now)

Map config types onto external types that already exist in your project:

- enum: `option type=external enum` (numeric values must match)
- bean: external type + `constructor` conversion

Matching condition: the current `-t` and `-c` fall within the target / codeTarget sets declared by the mapper.

Configure this in XML schema via `<mapper>` or in the corresponding Excel column.

## Related links

- [XML Schema](../schema/xml-schema)
- [CLI Reference](../reference/cli)
