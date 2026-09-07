---
sidebar_position: 5
---

# Luban feature list

Full built-in capability overview. For usage details, follow the linked chapters.

## Complete type system

- **Built-in primitives**: bool, byte, short, int, long, float, double, string, text, datetime
- **Containers**: array, list, set, map
- **Custom enums and beans**: unlimited inheritance and polymorphism for complex GamePlay data
- **Nullable types**: `T?` for all types except containers

See [Types](../schema/types) and [Polymorphism](../schema/polymorphism).

## Enhanced Excel formats

- bool: `true`/`false`/`1`/`0`/yes-no variants
- Enums: name, alias, or integer; flags enums support `A|B` and column-constraint mode
- Nullable: e.g. `int?` with `5` or `null`
- datetime with `--timeZone` and localized time
- **Struct fields**: multi-column (merge or CSV `[{name}`/`{name}]`), single-cell sep, or nested in larger configs
- **sep splitting**: e.g. Vec3 in one cell
- **Polymorphism**: e.g. `Circle,5` or `Rectangle,3,4`
- **Multi-row struct lists**: field name `*name`
- **Multi-level headers**: column constraints for deep structures

See [Excel basics](../excel/basics), [Nested structures](../excel/nested-and-collections), [sep and stream](../excel/vertical-and-sep).

## Rich source file types

- **Excel family**: csv, xls, xlsx, xlsm; `sheet@file.xlsx` for a single sheet
- **JSON**: one or many records per file (`*@file.json`); `a.b.c@file.json` for nested fields
- **Lua**: requires `return`; lists with `*@`
- **XML / YAML**
- **Directory**: recursive walk; non-Excel defaults to one record per file; mixed formats allowed
- **Multiple inputs per table**: many-to-one, one-to-many, many-to-many

See [Non-Excel sources](../excel/other-sources) and [Import modules](../schema/import-modules).

## Export data formats

**Export format is decoupled from source data**. Whether sources are excel, lua, xml, json, or mixed, export uses a unified format.

| Format | Notes |
|------|------|
| bin | Compact binary, fast load |
| json / json2 | json map as `[[k,v]]`; json2 as `{k:v}` |
| lua / xml / yaml / bson / msgpack | Corresponding formats |
| protobuf2/3 (json + bin) | PB serialization |
| flatbuffers-json | FlatBuffers JSON |
| text-list | Export all text keys |

Full list: [Built-in codeTarget / dataTarget](./builtins).

## Table- and field-level groups

Custom group types; export subsets of tables or fields for client/server/editor. See [groups and multi-target](../concepts/groups-targets).

## Record tags

Tag each record; e.g. `test` only in test builds; filter with `--excludeTag` on release. `##` permanently comments a row. See [tags](../quality/tags).

## Data validation

| Validator | Purpose |
|--------|------|
| Built-in constraints | Types, nullability, containers |
| ref | Table reference validity |
| path | Asset path validity (Unity, etc.) |
| range | Numeric range |
| size | Fixed or ranged container length |
| set | Value must be in a set |
| regex | String must match pattern |
| `!` (not default) | Must not be type default |
| index | Unique index on a field in struct lists |
| text | Valid localization key |

See [Validators](../quality/validators).

## Table modes

| mode | Notes |
|------|------|
| one | Singleton |
| map | Key-value table |
| list | List; joint key `a+b` or independent indexes `a,b` |

See [Excel Schema](../schema/excel-schema).

## Localization

- **Localized time**: datetime converted to UTC by timezone
- **text type**: validate l10n keys; configure via `l10n.provider` xargs

See [L10N](../quality/l10n).

## External type mapping (TypeMapper)

Map config enums / beans to existing project types (e.g. `UnityEngine.Vector3`, `UnityEngine.AudioType`). Matched by `-t` / `-c`; mainly C# today. See [TypeMapper](../schema/type-mapper).

## Supported game development languages

| Language | Approx. version |
|------|----------------|
| C++ | 11+ |
| C# | .NET Framework 2+ / .NET Core 2+ |
| Java | 1.6+ |
| Go | 1.10+ |
| Lua | 5.1+ |
| TypeScript | 3.0+ |
| Python | 2.7+ / 3.0+ |
| GDScript | 4.0+ |
| PHP, Dart, JavaScript, Rust | — |

## Engines, hot reload, and platforms

- Unity + C# / HybridCLR / ToLua / XLua / ILRuntime
- Unreal + C++ / UnLua / sluaunreal / Puerts
- Cocos2d-x + Lua / TypeScript
- Godot + GDScript
- WeChat mini programs and other JS mini-program platforms
- Other Lua/JS-capable engines and platforms

Samples: [luban_examples](https://github.com/focus-creative-games/luban_examples).

## Performance and cross-platform

- **Generation speed**: seconds even on large projects
- **Runtime**: .NET on Windows, Linux, macOS

## Extensible architecture

Loaders, validators, CodeTarget, DataTarget, Pipeline, SchemaCollector, etc. are plugin-friendly. See [Extend overview](../extend/overview).

## Related links

- [Introduction](../intro)
- [CLI reference](./cli)
- [Cascading options xargs table](./cascading-options)
- [Built-ins](./builtins)
