---
sidebar_position: 5
---

# Collaboration checklist with engineering

Quick self-check before submit or QA. The more you tick, the less rework.

## Tables and headers

- [ ] Table is registered in the config project (not only a local xlsx)
- [ ] Sheet header area starts with `##` (A1 is often `##` / `##var`)
- [ ] You did not change `##type` to Chinese or invented names
- [ ] Comment column field names are `#xxx` or empty—not mistaken for data columns
- [ ] Draft rows use a leading `##` comment, or you confirmed they will not enter formal export

## Values and references

- [ ] Primary keys are unique (map tables)
- [ ] Referenced item / level / drop ids exist in the target tables
- [ ] Enums use names or aliases from engineering (e.g. `白` / `WHITE`)
- [ ] Non-nullable columns are not empty; for nullable columns, “none” is empty or `null` as agreed
- [ ] datetime columns are not left empty casually

## Client / server

- [ ] Server-only weights, formula params, etc. are marked `s` (or per project rules)
- [ ] Display fields are not marked `s`-only, which would omit them on the client
- [ ] Uncertain groups were asked of engineering, not left empty by default

## Complex structures

- [ ] Merged-cell regions were not unmerged or shifted
- [ ] List separators match the sample sheet
- [ ] Polymorphic type names come from engineering’s list—not abstract base type names
- [ ] Multi-row list continuation (empty primary key) matches the sample sheet

## How to report generation failures

When sending to engineering, try to include:

1. **Full error text** (not only the last line)
2. **Table name / file name / Sheet name**
3. **Failing row id or approximate row/column**
4. Screenshot or description of fields you changed

Luban errors usually point to cell-level problems; more context means faster diagnosis.

## Related links

- [Minimum concepts](./concepts)
- [Header meanings](./headers)
- [Complex structures](./complex)
- [FAQ](../reference/faq)
