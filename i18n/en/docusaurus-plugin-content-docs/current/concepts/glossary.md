---
sidebar_position: 1
---

# Glossary

The whole docs use the terms below consistently.

| Term | Meaning |
|------|------|
| **Schema** | Config structure definition (tables, beans, enums, field types, etc.) |
| **Data** | Instance data that conforms to Schema |
| **table** | Metadata for one config table: input file, primary key, mode, value type, etc. |
| **bean** | Struct type; can inherit; abstract beans are polymorphic bases |
| **enum** | Enumeration; may be flags |
| **field** | A field on a bean or table row |
| **group** | Export grouping; common values `c` (client), `s` (server), `e` (editor) |
| **target** | Named config for one generation job (e.g. `client`), binding groups and topModule |
| **codeTarget** | Code generator name, e.g. `cs-bin`, `cs-simple-json` |
| **dataTarget** | Data generator name, e.g. `bin`, `json` |
| **Tables** | Generated config entry class (name from target.manager; often `Tables` by default) |
| **TbXxx** | Generated type for one table; holds dictionary/list and lookup methods |
| **tag** | Record-level tag for include/exclude filtering |
| **variant** | Field variant (e.g. localization column `name@en`) |
| **luban.conf** | Project root config: dataDir, schemaFiles, groups, targets |

## Easy to confuse

- **group vs target**: group is a “content tag”; target is “which groups this export includes + generation options.”
- **table vs TbXxx**: table is the definition in schema; `TbXxx` is the generated C#/Java class.
- **bean vs row**: a row in a map/list table usually corresponds to one bean instance (valueType).

## Related links

- [luban.conf](./luban-conf)
- [groups and targets](./groups-targets)
