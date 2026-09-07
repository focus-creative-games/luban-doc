---
sidebar_position: 3
---

# Add a table and export

This page covers: adding the simplest data table on MiniTemplate, then generating again.

## 1. Write the data table

Under `Datas`, create e.g. `reward.xlsx` (csv also works). Minimal conventions:

| Row meaning | Rules |
|--------|------|
| Field name row | Cell A1 starts with `##` (or `##var`); following cells are field names |
| Type row | A row whose first cell is `##type`; corresponding columns hold types such as `int` / `string` |
| Group row (optional) | `##group`: `c` for client, `s` for server, empty means all sides |
| Comment row (optional) | Starts with `##` or `##comment` |
| Data rows | Rows after that |

Example (logical sketch; follow Excel in practice):

| ## | id | name | count |
|---|---|---|---|
| ##type | int | string | int |
| ##group | | c,s | c |
| ## | Reward ID | Name | Count |
| | 1001 | Gold | 100 |

More rules: [Excel basics](../excel/basics).

## 2. Declare the table in Schema

Open `Datas/__tables__.xlsx` and add one table declaration row. Common columns and sample values (exact header row depends on your project template; semantics should match):

| full_name | value_type | read_schema_from_file | input | index | mode | group | comment |
|---|---|---|---|---|---|---|---|
| TbReward | Reward | true | reward.xlsx | id | | | Reward table |

Column meanings:

| Column | Value in this example | Notes |
|----|----------|------|
| full_name | `TbReward` | Full table name; can also be `reward.TbReward` |
| value_type | `Reward` | Bean name for each row record |
| read_schema_from_file | `true` | Infer bean fields from the `reward.xlsx` header; when true, do not redefine the same bean in `__beans__` |
| input | `reward.xlsx` | Data file (relative to `dataDir`) |
| index | `id` | Primary key field; simple map tables usually use the primary key name |
| mode | (empty) | Empty or `map` means lookup by primary key; `list` / `one` etc. see [Excel Schema](../schema/excel-schema) |
| group | (empty) | Table-level export group; empty uses groups with `default: true` in `luban.conf` |
| comment | `Reward table` | Comment, optional |

You can also define tables in XML—see [XML Schema](../schema/xml-schema).

:::tip Schema is a contract
Have (or maintain in parallel) the table declaration first, then fill data. Do not expect the tool to “guess the full structure from Excel and overwrite the definition.”
:::

## 3. Generate again

Run `gen.bat` / `gen.sh` again. On success, the output directory should contain files for the new table; if code generation is enabled, types such as `TbReward` appear.

## Common pitfalls

- Forgot to register in `__tables__` → the data file is never collected.
- Sheet A1 does not start with `##` → that sheet is ignored.
- Prefer field names like `xx_yy_zz`; generation converts them to Pascal/camel style per language.

## Related links

- Next: [Load at runtime](./load-runtime)
- [Excel Schema](../schema/excel-schema)
