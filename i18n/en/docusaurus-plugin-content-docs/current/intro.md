---
sidebar_position: 1
slug: /intro
---

# What is Luban

Luban is a **configuration solution** for game projects: it describes config structure with a unified type system, reads data from Excel / JSON / XML and more, validates it, then generates multi-language code and multiple data formats.

It is not merely “convert Excel to JSON.” It puts designer spreadsheets, program loading, client/server split exports, and complex gameplay data (skills, behavior trees, dungeons, and so on) into **one pipeline**.

## Who it is for

| Role | What you use |
|------|----------------|
| Programmer | Define schema, write generation commands, load with `Tables` at runtime |
| Designer | Fill data in Excel (or editor-exported JSON) following the conventions |

## Core capabilities (overview)

- **Type system**: primitive types, enums, beans, inheritance/polymorphism, containers, nullable
- **Multiple data sources**: Excel family, JSON, XML, YAML, Lua, and more
- **Multi-target export**: groups / targets control what client, server, and editor each receive
- **Validation**: references, ranges, asset paths, and more—catch errors at generation time when possible
- **Multiple languages and formats**: C# / Java / Go / Lua / TS…; bin / json / protobuf…
- **Extensible**: Loader, Validator, CodeTarget, DataTarget, and Pipeline can all be plugged in

Full feature list: [Luban feature list](./reference/features).

## Good fit and poor fit

**Good fit**

- Client and server need to share one set of config definitions
- Table structure will grow from “flat row lists” into nesting and polymorphism
- You want strongly typed loading code generated, not hand-written parsers

**Poor fit**

- Only a few trivial key-value sheets, and you never need types / validation / multi-target export
- You refuse to have programmers maintain schema (Luban treats **schema as a contract**: data that does not conform should error, not rewrite the definition)

## Official resources

- Example projects: [luban_examples](https://github.com/focus-creative-games/luban_examples) (includes MiniTemplate and multi-engine samples)
- Source: [luban](https://github.com/focus-creative-games/luban)
- Unity Runtime: [luban_unity](https://github.com/focus-creative-games/luban_unity)
- QQ group: 692890842 · Discord: see the repository README

## Next steps

- Programmers: start with [5-minute mental model](./mental-model) → [Quick start](./guide/install)
- Designers: go straight to [Designer filling guide](./designer/concepts)
- Want to know how the docs are organized: [How to read the docs](./how-to-read)
