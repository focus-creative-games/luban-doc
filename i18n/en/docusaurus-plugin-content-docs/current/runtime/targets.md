---
sidebar_position: 2
---

# codeTarget / dataTarget overview

`-c` and `-d` must match (code reads a given format, so data should be generated in that format).

## Common combinations

| Scenario | codeTarget | dataTarget |
|------|------------|------------|
| Unity development JSON | `cs-simple-json` | `json` |
| Unity release binary | `cs-bin` | `bin` |
| .NET server JSON | `cs-dotnet-json` | `json` |
| Java | `java-bin` / `java-json` | `bin` / `json` |
| Go | `go-bin` / `go-json` | `bin` / `json` |
| TypeScript | `typescript-bin` / `typescript-json` | `bin` / `json` |
| Lua | `lua-bin` / `lua-lua` | `bin` / `lua` |

For the full list, see [Built-in names](../reference/builtins).

## Naming convention

`cs-simple-json` ≈ language + loader library + data format. Data file contents are language-agnostic: changing `-c` does not change the semantics of `-d json` files.

## Protobuf / FlatBuffers

There are also targets such as `cs-protobuf3`, `protobuf3`, and `flatbuffers` for schema/data integration with mainstream serialization formats. See the built-in names list and example projects.

## Related links

- [Runtime loading](./loading)
- [Common CLI](./cli-common)
