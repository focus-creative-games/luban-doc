---
sidebar_position: 4
---

# FAQ and troubleshooting

Look up by symptom. CLI arguments follow [CLI](./cli) (older docs may say `export_exclude_tags`; use `--excludeTag` now).

## Tables and primary keys

**Q: How is the primary key defined?**  
A: The table’s `index`. Map tables often default to the first field.

**Q: Multiple primary keys?**  
A: In `list` mode, `a+b` is a joint index; `a,b` are independent indexes.

**Q: Singleton global table?**  
A: `mode=one` / singleton; can pair with a vertical table.

## Groups and filtering

**Q: Different fields for client and server?**  
A: groups + `##group` or field group; see [groups](../concepts/groups-targets).

**Q: Exclude some rows from the package?**  
A: Record tags + `--excludeTag` / `--includeTag`.

## Generation failures

**Q: Lots of type errors?**  
A: Check table/field names in the error first; verify `##type` matches the Schema.

**Q: ref failed?**  
A: The id does not exist, or you wrote 0 without a nullable ref form `ref=?`.

**Q: path validation not working?**  
A: Need `-x pathValidator.rootDir=...`.

## Loading issues

**Q: Runtime cannot read data?**  
A: Check that codeTarget matches dataTarget, and that the loader path points at the generated directory.

**Q: Async loading?**  
A: No built-in async wrapper by default; change templates or read files asynchronously yourself and feed Tables.

**Q: Reuse existing enums/structs from the project?**  
A: TypeMapper (mainly C#); see [Code style](../runtime/code-style).

## Project issues

**Q: Files disappeared from the output directory?**  
A: Output dirs are cleaned by default; do not point them at hand-written code paths.

**Q: Generating multiple languages overwrites each other?**  
A: Set separate `*.outputCodeDir` / `*.outputDataDir` for each `-c`/`-d`.

## Related links

- [Designer checklist](../designer/checklist)
- [Common CLI](../runtime/cli-common)
