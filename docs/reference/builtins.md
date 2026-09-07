---
sidebar_position: 2
---

# 内置 codeTarget / dataTarget

## Code targets

| code target | 描述 |
|-------------|------|
| cs-bin | C# 读 bin |
| cs-simple-json | C# + SimpleJSON，推荐 Unity |
| cs-dotnet-json | C# + System.Text.Json，推荐 .NET 服务 |
| cs-newtonsoft-json | C# + Newtonsoft |
| cs-editor-json | 编辑器读写单条 json |
| cs-protobuf2 / cs-protobuf3 | C# 加载 pb（含 Tables） |
| lua-lua / lua-bin | Lua |
| java-bin / java-json | Java（gson） |
| cpp-sharedptr-bin / cpp-rawptr-bin | C++（`cpp-bin` 已移除） |
| go-bin / go-json | Go |
| python-json | Python |
| gdscript-json | GDScript |
| javascript-bin / javascript-json | JS |
| typescript-bin / typescript-json / typescript-protobuf | TS |
| rust-bin / rust-json | Rust |
| php-json | PHP |
| dart-json | Dart |
| protobuf2 / protobuf3 | 生成 .proto schema |
| flatbuffers | 生成 fbs schema |
| schema-json | 导出机器可读 schema.json（供 AI/工具；不加载数据） |

code 必须与 data 格式匹配。`schema-json` 仅导出结构，可单独使用。

## Data targets

| data target | 描述 |
|-------------|------|
| bin | Luban 二进制，正式发布常用 |
| bin-offset | 记录级 offset，配合 bin 懒加载 |
| json | map → `[[k,v]]` |
| json2 | map → `{k:v}` |
| lua / xml / yaml / bson / msgpack | 对应格式 |
| protobuf2-bin / protobuf3-bin / protobuf2-json / protobuf3-json | PB |
| flatbuffers-json | FlatBuffers JSON |
| text-list | 导出 text key 列表 |

## 相关链接

- [生成目标选择](../runtime/targets)
- [级联选项](./cascading-options)
