---
sidebar_position: 5
---

# Luban 能力清单

Luban 内置的完整特性一览。各专题的用法细节见对应章节链接。

## 完备的类型系统

- **基础内置类型**：bool、byte、short、int、long、float、double、string、text、datetime
- **容器类型**：array、list、set、map
- **自定义枚举与结构**：结构支持无限层次继承与多态，可表达复杂 GamePlay 数据
- **可空类型**：除容器外均可定义 `T?`

详见 [类型速查](../schema/types)、[多态](../schema/polymorphism)。

## 增强的 Excel 格式

- bool：`true`/`false`/`1`/`0`/`是`/`否` 等
- 枚举：枚举名、别名或整数值；flags 枚举支持 `A|B` 与列限定模式
- 可空：如 `int?` 用 `5` 表示有效值，`null` 表示空
- datetime 类型，配合 `--timeZone` 与本地化时间
- **结构字段**：可占多列（合并单元格或 CSV 的 `[{name}`/`{name}]`）、单格 sep、或嵌套在更大配置中
- **sep 拆分**：单格填写 Vec3 等复合结构
- **多态**：如 `Circle,5` 或 `Rectangle,3,4`
- **多行结构列表**：字段名 `*name`
- **多级标题头**：列限定深层结构如 a.b.c

详见 [Excel 基础](../excel/basics)、[嵌套与容器](../excel/nested-and-collections)、[sep 与流式](../excel/vertical-and-sep)。

## 丰富的源文件类型

- **Excel 族**：csv、xls、xlsx、xlsm 等；可 `sheet@file.xlsx` 指定 sheet
- **JSON**：单文件一条或多条（`*@file.json`）；支持 `a.b.c@file.json` 读深层字段
- **Lua**：需 `return`；列表配合 `*@`
- **XML / YAML**
- **目录**：递归遍历；非 Excel 默认每文件一条；可混合 json/lua/xml/excel
- **多数据源组合**：一表对应多 input（多对一、一对多、多对多）

详见 [非 Excel 数据源](../excel/other-sources)、[import 模块](../schema/import-modules)。

## 多种导出数据格式

**导出格式与原始数据解耦**。无论源是 excel、lua、xml、json 或混合，最终都以统一格式导出，简化生成代码。

| 格式 | 说明 |
|------|------|
| bin | 类似 protobuf 的二进制，体积小、加载快 |
| json / json2 | json 的 map 为 `[[k,v]]`；json2 为 `{k:v}` |
| lua / xml / yaml / bson / msgpack | 对应格式 |
| protobuf2/3 (json + bin) | PB 序列化 |
| flatbuffers-json | FlatBuffers JSON |
| text-list | 导出所有 text key 列表 |

扩展新格式较容易。完整名录见 [内置 codeTarget / dataTarget](./builtins)。

## 表与字段级分组

自定义 group 类型；按 group 选择性导出表或字段，实现客户端/服务器/编辑器分端。详见 [groups 与多端](../concepts/groups-targets)。

## 数据标签（tag）

为每条记录加 tag；如 `test` 仅在测试导出时包含，正式发布用 `--excludeTag` 过滤。`##` 为永久注释 tag。详见 [tag](../quality/tags)。

## 数据校验

| 校验器 | 说明 |
|--------|------|
| 内建约束 | 类型、可空、容器规则等 |
| ref | 表引用合法性 |
| path | 资源路径合法性（Unity 等） |
| range | 数值范围 |
| size | 容器长度固定或范围 |
| set | 值必须在集合内 |
| regex | 字符串符合正则 |
| `!`（not default） | 不能为类型默认值 |
| index | 结构列表按某字段唯一 |
| text | 本地化 key 合法性 |

扩展新校验器较容易。详见 [校验器](../quality/validators)。

## 数据表模式

| mode | 说明 |
|------|------|
| one | 单例表 |
| map | 普通 key-value 表 |
| list | 列表；支持联合主键 `a+b` 与独立多索引 `a,b` |

详见 [Excel Schema](../schema/excel-schema)。

## 本地化

- **本地化时间**：datetime 按 timezone 转为 UTC，便于程序处理
- **text 类型**：校验本地化 key；配合 `l10n.provider` 等 xargs

详见 [L10N](../quality/l10n)。

## 外部类型映射（TypeMapper / external type）

将配置中的 enum / bean 映射到工程已有类型（如 `UnityEngine.Vector3`、`UnityEngine.AudioType`）。按 `-t` / `-c` 匹配；目前主要支持 C#。详见 [TypeMapper](../schema/type-mapper)。

## 支持的游戏开发语言

类型系统支持命名空间，多数语言生成模块化代码；扩展新语言较容易。

| 语言 | 版本要求（约） |
|------|----------------|
| C++ | 11+ |
| C# | .NET Framework 2+ / .NET Core 2+ |
| Java | 1.6+ |
| Go | 1.10+ |
| Lua | 5.1+ |
| TypeScript | 3.0+ |
| Python | 2.7+ / 3.0+ |
| GDScript | 4.0+ |
| PHP | — |
| Dart | — |
| JavaScript | — |
| Rust | — |

## 支持的引擎、热更与平台

- Unity + C# / HybridCLR / ToLua / XLua / ILRuntime
- Unreal + C++ / UnLua / sluaunreal / Puerts
- Cocos2d-x + Lua / TypeScript
- Godot + GDScript
- 微信小程序及各类 JS 小程序
- 其他支持 Lua / JS 的引擎与平台

示例工程见 [luban_examples](https://github.com/focus-creative-games/luban_examples)。

## 性能与跨平台

- **生成速度**：大型项目也可秒级完成
- **运行环境**：基于 .NET，可在 Windows、Linux、macOS 运行

## 可扩展架构

Loader、Validator、CodeTarget、DataTarget、Pipeline、SchemaCollector 等均可插件化。详见 [扩展概览](../extend/overview)。

## 相关链接

- [intro 概览](../intro)
- [CLI 全参数](./cli)
- [级联选项 xargs 全表](./cascading-options)
- [内置名录](./builtins)
