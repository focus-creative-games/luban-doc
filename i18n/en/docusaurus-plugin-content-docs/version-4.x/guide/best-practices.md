---
sidebar_position: 6
---

# Best practices

Naming, modules, validation, and data organization when using Luban in production.

## Naming

- Table names: prefer `TbXxxYyy` to distinguish from plain beans
- Field names: prefer `xx_yy_zz`; generation converts to Pascal/camel per language — see [Code style](../runtime/code-style)

## XML vs Excel definitions

- Hand-written definitions: XML (one xml per module with a module name)
- Designer-friendly: Excel for tables and structures
- Mix both as needed

## Modularization

Organize by module directory; use prefixes like `item.TbItem`, `item.ItemInfo`, not empty module.

## Export format

Prefer json (or other text formats) during development to avoid frequent client/server redeploys when bin layout changes.

## Complex Excel data

Combine **multi-row records**, **multi-level column names**, and **sep** (field sep and type sep); choose column constraint vs stream as needed. See [Nested structures](../excel/nested-and-collections) and [sep and stream](../excel/vertical-and-sep).

## GamePlay data with OOP inheritance

Use polymorphic beans for skills, buffs, AI, dungeons, etc. Simple cases in Excel; editor-driven cases (e.g. skills) in json. **Avoid** legacy `type + param1,param2,param3` combos.

## Git hooks before commit

See [githooks-demo](https://gitee.com/focus-creative-games/luban_examples/tree/main/githooks-demo).

## Designers validate only

Without codeTarget/dataTarget, data is not loaded by default. Add `-f` (or `-x forceLoadDatas=1`) to validate only:

```bat
dotnet Luban.dll ^
    -t all ^
    -f ^
    --conf luban.conf
```

Or `-x outputSaver=null` with no dataTarget to validate without writing files.

## refgroup

When many fields ref the same tables, use refgroup — see [Validators](../quality/validators).

## Editor-exported data

Save complex editor config as json **one record per file** + directory `input`; use generated load/save code, not hand-written serialization.

## Tags for test data

Tag test/dev rows; filter with `--excludeTag` on release — **do not** delete rows by hand. See [tags](../quality/tags).

## Tag `unchecked`

For temporary dirty batches where refs are not ready, add `unchecked` to skip ref warnings.

## datetime and time zone

Use `datetime` for times; use CLI `--timeZone` when crossing zones.

## When to use polymorphism

- Variable GamePlay types: skills, AI, quests, dungeons
- Simple structures in Excel; complex editor output in json

## Handling polymorphism in code

For few types, `is` / `switch (shape)` works; for many types, prefer `switch (shape.GetTypeId())`:

```csharp
switch (shape.GetTypeId())
{
    case Circle::__ID__:
        var c = (Circle)shape;
        break;
    case Triangle::__ID__:
        var t = (Triangle)shape;
        break;
}
```

## Related links

- [FAQ](../reference/faq)
- [Common CLI](../runtime/cli-common)
- [groups and multi-target](../concepts/groups-targets)
