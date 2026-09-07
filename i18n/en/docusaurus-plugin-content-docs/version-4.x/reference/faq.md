---
sidebar_position: 4
---

# FAQ and troubleshooting

Look up by symptom. CLI arguments follow [CLI](./cli) (older docs may say `export_exclude_tags`; use `--excludeTag` now).

## Tables and primary keys

**Q: How is the primary key defined?**  
A: The table’s `index`. For map tables without mode/index, mode=map and the first field of the record bean is often the key.

**Q: How to write it in `__tables__`?**  
A: Put the key field name in the index column, e.g. `my_index`:

| full_name | value_type | read_schema_from_file | input | index |
|---|---|---|---|---|
| TbTest | Test | true | equip.xlsx | my_index |

XML equivalent: `<table name="TbTest" value="Test" index="my_index" .../>`

**Q: Multiple primary keys?**  
A: In `list` mode, `a+b` is a joint index; `a,b` are independent indexes. See [Excel Schema](../schema/excel-schema).

**Q: Singleton global table?**  
A: `mode=one` / singleton; can pair with [vertical tables](../excel/vertical-and-sep).

## Source files and organization

**Q: Which source file types are supported?**  
A: Excel family (csv, xls, xlsx, xlsm, etc.), json, xml, lua, yaml.

**Q: Can data come from multiple files?**  
A: Yes. Use `a.xlsx,b.xlsx` or `sheet@file.xlsx`; see [Excel basics](../excel/basics) and [import modules](../schema/import-modules).

**Q: Can multiple tables share one xlsx?**  
A: Yes, different sheets; `input` can be `Sheet1@a.xlsx,Sheet2@a.xlsx`.

**Q: Does xlsx read the first sheet or all sheets?**  
A: **All** sheets; sheets whose A1 does not start with `##` are ignored.

**Q: How to add a non-data sheet?**  
A: Do not start A1 with `##` on that sheet.

**Q: How to comment out columns/rows?**  
A: Empty column name or name starting with `#`; data rows starting with `##` in the first column are not exported.

## Groups and filtering

**Q: Different fields for client and server?**  
A: groups + `##group` or field group; see [groups](../concepts/groups-targets).

**Q: Exclude some rows from the package?**  
A: Excel **first column** is tag; `##` permanently comments; tags like `dev` with `--excludeTag dev`. See [tags](../quality/tags).

![tag filtering](/img/cases/tag.jpg)

## JSON / directory sources

**Q: One json per record — too many files to list in input?**  
A: Set `input` to a directory; non-Excel files default to **one record per file**. See [Non-Excel sources](../excel/other-sources).

**Q: Multiple records in one json?**  
A: Must use `*@xxx.json`.

**Q: Read from a nested json field?**  
A: Single record `a.b.c@xx.json`; list `*a.b.c@xx.json`.

**Q: Multiple tables in one json?**  
A: Like Excel: `field@xx.json` or `*field@xx.json` per table.

## Generation failures

**Q: Lots of type errors?**  
A: Check table/field names in the error; verify `##type` matches Schema.

**Q: ref failed?**  
A: Id does not exist, or you wrote 0 without nullable ref `ref=?`.

**Q: path validation not working?**  
A: Need `-x pathValidator.rootDir=...`.

## Loading issues

**Q: Runtime cannot read data?**  
A: Check codeTarget vs dataTarget; loader path must point at generated output.

**Q: Async loading?**  
A: No built-in async wrapper; customize templates or load files yourself.

**Q: Reuse existing enums/structs from the project? e.g. UnityEngine.AudioType, UnityEngine.Vector3**  
A: Yes, via TypeMapper (external type mapping); mainly C# today. See [TypeMapper](../schema/type-mapper).

## Project issues

**Q: Files disappeared from the output directory?**  
A: Output dirs are cleaned by default; do not point at hand-written code.

**Q: Multiple languages overwrite each other?**  
A: Set separate `*.outputCodeDir` / `*.outputDataDir` per `-c`/`-d`.

## Related links

- [Designer checklist](../designer/checklist)
- [Common CLI](../runtime/cli-common)
- [Best practices](../guide/best-practices)
