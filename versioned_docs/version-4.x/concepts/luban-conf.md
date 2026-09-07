---
sidebar_position: 2
---

# luban.conf 与工程结构

`luban.conf` 是工程入口：告诉 Luban 数据在哪、schema 从哪收集、有哪些导出目标。

## 最小例子

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

## 字段说明

### dataDir

数据根目录，必填。表的 `input` 相对此目录解析。

### schemaFiles

| 字段 | 说明 |
|------|------|
| fileName | 文件或目录；目录则递归收集 |
| type | Excel 族需要：`table` / `bean` / `enum`；XML 定义可为空白 |

可同时使用 **XML（Defines）** 与 **Excel schema（`__*.xlsx`）**，最终汇入同一套定义。

### groups

| 字段 | 说明 |
|------|------|
| names | 分组名列表，实践常用单字符 `c`/`s`/`e` |
| default | 为 true 时：table 未写 group 则自动属于该组 |

注意：

- **field 的 group 为空 = 属于所有分组**（多数字段如此）。
- enum/bean 的导出常由「是否被导出表引用」决定；也可显式写 group。

### targets

| 字段 | 说明 |
|------|------|
| name | `-t` 参数使用的名字 |
| manager | 入口类名，一般 `Tables` |
| groups | 本目标导出哪些分组 |
| topModule | 生成代码额外顶层命名空间，如 `cfg` |

## 推荐目录

```text
Project/
  luban.conf
  Defines/           # XML schema（可选）
  Datas/
    __tables__.xlsx
    __beans__.xlsx
    __enums__.xlsx
    *.xlsx           # 数据
  gen.bat
```

## 常见坑

- `schemaFiles` 漏了 `__tables__` → 没有任何表。
- target.groups 写错 → 表或字段被静默裁掉，以为是「丢数据」。
- 多个工程共用一个 conf 却指向错误 dataDir。

## 相关链接

- [groups 与 targets](./groups-targets)
- [管线概览](./pipeline)
