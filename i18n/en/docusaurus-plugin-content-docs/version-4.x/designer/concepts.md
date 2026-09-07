---
sidebar_position: 1
---

# The minimum concepts you need

For designers: you do not need to understand code generation. Remember the points below so you can talk with engineering and avoid common mistakes.

## Three things

1. **Tables must be registered first**: Engineering registers the table in `__tables__` (or XML). Only then will your Excel be exported. Creating an xlsx on your machine alone does **not** put it into the build.
2. **Headers have rules**: Cells near the top-left that start with `##` are the header area, not normal data. If A1 does not start with `##`, the tool treats that sheet as missing.
3. **Client and server may see different columns**: In `##group`, `c` / `s` say who gets the column. Wrong values cause “client missing field” or “sensitive numbers leak to the client”.

## One table example

| ##var | id | name | price | drop_weight | #note |
|---|---|---|---|---|---|
| ##type | int | string | int | int | |
| ##group | | c,s | c | s | |
| ## | Item ID | Name | Price | Drop weight | Designer note |
| | 1001 | Gold | 0 | 100 | Base currency |

| What you see | What it means |
|----------|----------|
| `##var` row | English field names (for code) |
| `##type` row | Types (set by engineering—do not change casually) |
| `##group` row | `c` = client, `s` = server |
| `#note` column | Comment column—**not shipped into the game** |
| Data rows | Content that is actually exported |

## How you and engineering split work

| You | Engineering |
|----|------|
| Fill values under the header; tune numbers | Decide field types, primary keys, which columns go to the client |
| Fill nested / polymorphic fields from sample sheets | Define structures, subtype names and aliases |
| Request “add a column xxx” | Update the Schema, then tell you where and how to fill the new column |
| Paste the full error when generation fails | Fix types or refs from the row/column location |

## What not to do yourself

- Do not change type names in `##type` (for example, changing `int` to “integer”).
- Do not unmerge header cells that engineering merged, and do not drag columns around randomly.
- Do not assume “a file under Datas will export”—it must be registered first.

## Related links

- [Header meanings](./headers)
- [Groups](./groups)
- [Checklist](./checklist)
