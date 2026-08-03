---
sidebar_position: 2
---

# Built-in codeTarget / dataTarget

## Code targets

| code target | Description |
|-------------|------|
| cs-bin | C# reading bin |
| cs-simple-json | C# + SimpleJSON; recommended for Unity |
| cs-dotnet-json | C# + System.Text.Json; recommended for .NET services |
| cs-newtonsoft-json | C# + Newtonsoft |
| cs-editor-json | Editor read/write of single-record json |
| cs-protobuf2 / cs-protobuf3 | C# loading pb (including Tables) |
| lua-lua / lua-bin | Lua |
| java-bin / java-json | Java (gson) |
| cpp-sharedptr-bin / cpp-rawptr-bin | C++ (`cpp-bin` removed) |
| go-bin / go-json | Go |
| python-json | Python |
| gdscript-json | GDScript |
| javascript-bin / javascript-json | JS |
| typescript-bin / typescript-json / typescript-protobuf | TS |
| rust-bin / rust-json | Rust |
| php-json | PHP |
| dart-json | Dart |
| protobuf2 / protobuf3 | Generate .proto schema |
| flatbuffers | Generate fbs schema |

code must match the data format.

## Data targets

| data target | Description |
|-------------|------|
| bin | Luban binary; common for shipping |
| bin-offset | Record-level offsets; use with bin for lazy load |
| json | map → `[[k,v]]` |
| json2 | map → `{k:v}` |
| lua / xml / yaml / bson / msgpack | Corresponding formats |
| protobuf2-bin / protobuf3-bin / protobuf2-json / protobuf3-json | PB |
| flatbuffers-json | FlatBuffers JSON |
| text-list | Export text key list |

## Related links

- [Choosing generation targets](../runtime/targets)
- [Cascading options](./cascading-options)
