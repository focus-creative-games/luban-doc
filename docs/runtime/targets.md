---
sidebar_position: 2
---

# codeTarget / dataTarget 一览

`-c` 与 `-d` 必须匹配（代码按某种格式读，数据就应生成该格式）。

## 常用组合

| 场景 | codeTarget | dataTarget |
|------|------------|------------|
| Unity 开发期 JSON | `cs-simple-json` | `json` |
| Unity 发布二进制 | `cs-bin` | `bin` |
| .NET 服务器 JSON | `cs-dotnet-json` | `json` |
| Java | `java-bin` / `java-json` | `bin` / `json` |
| Go | `go-bin` / `go-json` | `bin` / `json` |
| TypeScript | `typescript-bin` / `typescript-json` | `bin` / `json` |
| Lua | `lua-bin` / `lua-lua` | `bin` / `lua` |

完整列表见 [内置名录](../reference/builtins)。

## 命名规则

`cs-simple-json` ≈ 语言 + 加载库 + 数据格式。数据文件内容与语言无关：换 `-c` 不会改变 `-d json` 的文件语义。

## Protobuf / FlatBuffers

另有 `cs-protobuf3`、`protobuf3`、`flatbuffers` 等目标，用于 schema/数据与主流序列化方案对接，详见内置名录与示例工程。

## 相关链接

- [运行时加载](./loading)
- [常用命令行](./cli-common)
