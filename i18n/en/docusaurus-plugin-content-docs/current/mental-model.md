---
sidebar_position: 2
---

# 5-minute mental model

The whole Luban chain can be remembered as four steps:

```text
Schema (structure contract) → Data (filled values) → Generate → Runtime (Tables loading)
```

## One diagram

```text
┌─────────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Schema     │     │  Data       │     │  Generate    │     │  Runtime    │
│  table/bean │ ──► │  Excel/JSON │ ──► │  code+data   │ ──► │  new Tables │
│  luban.conf │     │  validate   │     │  -c / -d     │     │  tables.TbX │
└─────────────┘     └─────────────┘     └──────────────┘     └─────────────┘
```

## Four terms

| Term | Meaning |
|----|------|
| **Schema** | What the config “looks like”: which tables, field types, primary keys, inheritance. Can be written in Excel (`__tables__`, etc.) or XML |
| **Data** | What was “filled in”: Excel rows, JSON files, etc. Must conform to Schema |
| **Target / Group** | Who the export is for: e.g. client only wants `c` group fields, server only `s` |
| **Tables** | The entry class in generated code: one object holds all tables; loading and lookup start from it |

## Schema is a contract

- Programmers (or programmers + lead designers) maintain Schema.
- Designers fill values in Data.
- **Data that does not match Schema → generation fails with errors**, instead of silently changing Schema.

This idea runs through the whole docs: Luban puts “clear structure, reviewable, validatable” above “change a few definition lines less.”

## Recommended runtime shape

After generating code, prefer:

```csharp
var tables = new cfg.Tables(loader);
var item = tables.TbItem.Get(1001);
```

That is: **one `Tables` instance aggregates all tables**. Do not invent a global static singleton per table—loading, hot reload, and testing all get harder.

## Difference from a simple “Excel exporter”

| Simple exporter | Luban |
|------------|--------|
| Header ≈ the entire type system | Independent Schema; Excel is only one data view |
| Usually only JSON/Lua | Unified types → multi-language code + multiple data formats |
| Complex structure via conventions/strings | bean / polymorphism / containers are first-class |

## Next steps

- [How to read the docs](./how-to-read)
- [Install and get the tool](./guide/install)
