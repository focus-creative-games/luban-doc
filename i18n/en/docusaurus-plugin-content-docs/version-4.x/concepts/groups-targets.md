---
sidebar_position: 4
---

# groups and multi-target export

This page covers: how client, server, and editor receive different tables and fields.

## Decision tree

```text
Need per-side split?
  ├─ No → one target (e.g. all), groups include everything
  └─ Yes → one target per side
           ├─ client → groups: ["c"]
           ├─ server → groups: ["s"]
           └─ editor → groups: ["e"] (optional)
```

When generating:

```bash
dotnet Luban.dll --conf luban.conf -t client -c cs-simple-json -d json -x outputCodeDir=... -x outputDataDir=...
dotnet Luban.dll --conf luban.conf -t server -c cs-dotnet-json -d json -x ...
```

## Table-level vs field-level

| Location | Meaning of empty group |
|------|------------------|
| table | If a group has `default: true`, the table automatically belongs to that group |
| field | **Empty = exported for all groups** |

When a field is client-only: put `c` on the Excel `##group` row, or set the field’s group in schema.

## Default export set and `*` semantics

The **default export set** is computed by recursively following references from tables exported for the current target. Enums/beans in that set are exported even if their groups do not match the target.

| Rule | Notes |
|------|------|
| groups contains `*` | Belongs to all groups |
| enum/bean contains `*` | Generated even if not referenced |
| table/enum/bean groups empty | Exported when target has a `default: true` group; otherwise not |
| **field groups empty** | **Exported to all groups** (unlike table rules) |

When index is omitted and mode is empty or map, the first field of valueType is often the primary key; multiple index fields usually imply list mode.

## Common combinations

| Scenario | Approach |
|------|------|
| Numeric values server-only | Field group=`s` |
| Table client-only | Table group=`c` |
| Editor wants full raw structure | target `editor` includes `e` or `c,s,e`, and pick an editor-oriented codeTarget |

## Common pitfalls

- Thinking “no group means not exported”—for **field** the opposite is true.
- client/server sharing one output directory and overwriting each other.
- Changed groups but still using the old `-t`, and thinking config was lost.

## Related links

- [luban.conf](./luban-conf)
- [tag filtering](../quality/tags) (record-level; another dimension)
