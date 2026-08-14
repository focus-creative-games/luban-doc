---
sidebar_position: 4
---

# Code style

## Naming style

Controlled via `-x`:

```bash
-x codeStyle=csharp-default
-x namingConvention.cs-bin.field=camel
```

Common style names: `none`, and each language's `*-default`. Styles can apply separately to namespace / type / method / property / field / enumItem, and so on.

Fields named like `item_id` are often generated as `ItemId` by default in C#.

## External type mapping

Map config enums/beans to existing project types (e.g. `UnityEngine.Vector3`); see [External type mapping (TypeMapper)](../schema/type-mapper).

## Related links

- [TypeMapper](../schema/type-mapper)
- [XML Schema](../schema/xml-schema)
- [CLI Reference](../reference/cli)
