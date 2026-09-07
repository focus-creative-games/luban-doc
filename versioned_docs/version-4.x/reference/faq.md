---
sidebar_position: 4
---

# FAQ 与排错

按症状查找。命令行参数以 [CLI](./cli) 为准（旧文若写 `export_exclude_tags`，现应为 `--excludeTag`）。

## 表与主键

**Q: 主键怎么定？**  
A: table 的 `index`。map 表未指定 mode/index 时，常默认 mode=map 且取记录 bean 第一个字段为主键。

**Q: 在 `__tables__` 里怎么写？**  
A: 在 index 列填主键字段名，例如 `my_index`：

| full_name | value_type | read_schema_from_file | input | index |
|---|---|---|---|---|
| TbTest | Test | true | equip.xlsx | my_index |

XML 等价：`<table name="TbTest" value="Test" index="my_index" .../>`

**Q: 多主键？**  
A: `list` 模式下 `a+b` 联合索引，`a,b` 独立索引。见 [Excel Schema](../schema/excel-schema)。

**Q: 单例全局表？**  
A: `mode=one` / singleton，可配合 [纵表](../excel/vertical-and-sep)。

## 源文件与组织

**Q: 支持哪些源文件？**  
A: excel 族（csv、xls、xlsx、xlsm 等）、json、xml、lua、yaml。

**Q: 数据可以来自多个文件吗？**  
A: 可以。`input` 写 `a.xlsx,b.xlsx` 或 `sheet@file.xlsx`，见 [Excel 基础](../excel/basics)、[import 模块](../schema/import-modules)。

**Q: 多个表能放在同一个 xlsx 吗？**  
A: 可以，每个表用不同 sheet；`input` 可写 `Sheet1@a.xlsx,Sheet2@a.xlsx`。

**Q: xlsx 读第一个 sheet 还是全部？**  
A: 读**所有** sheet；A1 不以 `##` 开头的 sheet 被忽略。

**Q: 如何放非数据 sheet？**  
A: 该 sheet 的 A1 不要以 `##` 开头。

**Q: 如何注释列/行？**  
A: 列名留空或以 `#` 开头；数据行首列以 `##` 开头则整行不导出。

## 分组与过滤

**Q: 前后端字段不同？**  
A: groups + `##group` 或字段 group；见 [groups](../concepts/groups-targets)。

**Q: 某几行不要进包？**  
A: Excel **第一列**为 tag；`##` 永久注释；`dev` 等 tag 配合 `--excludeTag dev` 排除。见 [tag](../quality/tags)。

![tag 过滤](/img/cases/tag.jpg)

## JSON / 目录数据源

**Q: 每个 json 一条记录，文件太多怎么办？**  
A: `input` 设为目录，自动遍历；非 Excel 文件默认**每文件一条**。见 [非 Excel 源](../excel/other-sources)。

**Q: 一个 json 里多条记录？**  
A: 必须 `*@xxx.json`。

**Q: 从 json 深层字段读？**  
A: 单条 `a.b.c@xx.json`；列表 `*a.b.c@xx.json`。

**Q: 多表共用一个 json？**  
A: 类似 Excel，`field@xx.json` 或 `*field@xx.json` 指定各表字段。

## 生成失败

**Q: 一堆类型错误？**  
A: 先看报错中的表名/字段；核对 `##type` 与 Schema 是否一致。

**Q: ref 失败？**  
A: id 不存在，或写了 0 但未使用 `ref=?` 可空引用形式。

**Q: path 校验没生效？**  
A: 需 `-x pathValidator.rootDir=...`。

## 加载问题

**Q: 运行时读不到？**  
A: codeTarget 与 dataTarget 是否匹配；loader 路径是否指向生成目录。

**Q: 异步加载？**  
A: 默认不同步封装；改模板或自行异步读文件再喂给 Tables。

**Q: 想用项目里已有枚举/结构？比如 UnityEngine.AudioType、UnityEngine.Vector3**  
A: 可以，用 TypeMapper（外部类型映射），目前主要支持 C#。见 [TypeMapper](../schema/type-mapper)。

## 工程问题

**Q: 输出目录文件丢了？**  
A: 默认会清理 output 目录，勿指向手写代码路径。

**Q: 多语言同时生成互相覆盖？**  
A: 为每个 `-c`/`-d` 设置独立 `*.outputCodeDir` / `*.outputDataDir`。

## 相关链接

- [策划检查清单](../designer/checklist)
- [常用命令行](../runtime/cli-common)
- [最佳实践](../guide/best-practices)
