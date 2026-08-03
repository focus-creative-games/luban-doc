---
sidebar_position: 2
---

# luban.conf and project layout

`luban.conf` is the project entry: it tells Luban where data lives, where schema is collected, and which export targets exist.

## Minimal example

```json
{
  "groups": [
    {"names": ["c"], "default": true},
    {"names": ["s"], "default": true},
    {"names": ["e"], "default": true}
  ],
  "schemaFiles": [
    {"fileName": "Defines", "type": ""},
    {"fileName": "Datas/__tables__.xlsx", "type": "table"},
    {"fileName": "Datas/__beans__.xlsx", "type": "bean"},
    {"fileName": "Datas/__enums__.xlsx", "type": "enum"}
  ],
  "dataDir": "Datas",
  "targets": [
    {"name": "server", "manager": "Tables", "groups": ["s"], "topModule": "cfg"},
    {"name": "client", "manager": "Tables", "groups": ["c"], "topModule": "cfg"},
    {"name": "all", "manager": "Tables", "groups": ["c", "s", "e"], "topModule": "cfg"}
  ]
}
```

## Field reference

### dataDir

Data root directory, required. A table’s `input` is resolved relative to this directory.

### schemaFiles

| Field | Notes |
|------|------|
| fileName | File or directory; directories are collected recursively |
| type | Required for Excel family: `table` / `bean` / `enum`; may be blank for XML definitions |

You can use **XML (Defines)** and **Excel schema (`__*.xlsx`)** together; they merge into one definition set.

### groups

| Field | Notes |
|------|------|
| names | Group name list; in practice often single characters `c`/`s`/`e` |
| default | When true: tables with no group written automatically belong to this group |

Notes:

- **An empty field group = belongs to all groups** (most fields are like this).
- Export of enum/bean is often decided by “whether an exported table references it”; you can also set group explicitly.

### targets

| Field | Notes |
|------|------|
| name | Name used with the `-t` flag |
| manager | Entry class name, usually `Tables` |
| groups | Which groups this target exports |
| topModule | Extra top-level namespace for generated code, e.g. `cfg` |

## Recommended layout

```text
Project/
  luban.conf
  Defines/           # XML schema (optional)
  Datas/
    __tables__.xlsx
    __beans__.xlsx
    __enums__.xlsx
    *.xlsx           # data
  gen.bat
```

## Common pitfalls

- `schemaFiles` omits `__tables__` → no tables at all.
- Wrong target.groups → tables or fields are silently trimmed; it looks like “lost data.”
- Several projects share one conf but point at the wrong dataDir.

## Related links

- [groups and targets](./groups-targets)
- [Pipeline overview](./pipeline)
