---
sidebar_position: 3
---

# Pipeline overview

Luban’s default pipeline (DefaultPipeline) can be understood as:

```text
LoadSchema → Compile(DefAssembly) → (optional) LoadDatas + Validate
        → CodeTargets / DataTargets → PostProcess → Save
```

## What each stage does

| Stage | Role |
|------|------|
| Schema collection | Read XML/Excel etc. per `luban.conf` into raw definitions |
| Compile | Resolve type strings, inheritance, table modes into an exportable type graph |
| Load data | Read Excel/JSON/… from each table’s input |
| Validate | ref / range / path, etc. |
| Generate code | Each `-c` CodeTarget (e.g. cs-bin) |
| Generate data | Each `-d` DataTarget (e.g. json) |
| Save | Write local directories by default; may clean output directories |

When extending, most of the above map to replaceable plugin points—see [Extend overview](../extend/overview).

## Mapping to the mental model

| Mental model | Pipeline |
|----------|------|
| Schema | LoadSchema + Compile |
| Data | LoadDatas + Validate |
| Generate | Code/Data Targets |
| Runtime | Your game code loading generated artifacts (outside the pipeline) |

## Design points (for programmers)

- **The type system is the core**: complete types first, then multiple data sources and export formats.
- **Schema and Data are separate**: Excel is data (and an optional schema view), not the sole source of truth.
- **Extending**: prefer plugins over special-casing the core.

A fuller design narrative appears as “design philosophy” in historical docs; you do not need to finish that before getting started.

## Related links

- [Mental model](../mental-model)
- [Extend Luban](../extend/overview)
