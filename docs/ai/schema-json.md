---
sidebar_position: 4
---

# schema-json 与可解析报错

## 导出 schema JSON

`schema-json` 是 codeTarget：只编译 schema，不加载表数据。

```bash
dotnet Luban.dll --conf luban.conf -t all -c schema-json \
  -x outputCodeDir=./schema-out
```

默认输出 `schema-out/schema.json`。可用 `-x schema-json.outputFile=my-schema.json` 改文件名。

### 文档结构（摘要）

```json
{
  "version": 1,
  "target": "all",
  "topModule": "cfg",
  "tables": [{ "fullName": "TbItem", "valueType": "Item", "mode": "map", "index": "id" }],
  "beans": [{ "fullName": "Item", "fields": [{ "name": "id", "type": "int" }] }],
  "enums": [{ "fullName": "Quality", "items": [{ "name": "A", "value": 1 }] }]
}
```

适合：Agent 理解当前工程结构、做影响分析、生成填表说明。

## `--errorFormat json`

失败时向 **stderr** 打印一份 DiagnosticReport；成功且指定了该参数时也会打印 `{ "ok": true, "exitCode": 0 }`。

```bash
dotnet Luban.dll --conf luban.conf -t all -f --strict --errorFormat json -x outputSaver=null
```

### 报错字段

| 字段 | 含义 |
|------|------|
| `ok` | 是否成功 |
| `exitCode` | 进程退出码语义 |
| `errors[].category` | `schema` / `data` / `validation` / `codegen` / `cli` / … |
| `errors[].code` | 稳定 message key（若有） |
| `errors[].message` | 可读消息 |
| `errors[].file` / `location` / `fieldPath` | 数据解析定位 |

Agent 应优先根据 `code` + `file`/`location`/`fieldPath` 修数据或 schema，而不是猜测。
