---
sidebar_position: 4
---

# groups 与多端导出

本页解决：客户端、服务器、编辑器如何拿到不同的表和字段。

## 决策树

```text
需要分端吗？
  ├─ 否 → 一个 target（如 all），groups 包含全部
  └─ 是 → 为每端建 target
           ├─ client → groups: ["c"]
           ├─ server → groups: ["s"]
           └─ editor → groups: ["e"]（可选）
```

生成时：

```bash
dotnet Luban.dll --conf luban.conf -t client -c cs-simple-json -d json -x outputCodeDir=... -x outputDataDir=...
dotnet Luban.dll --conf luban.conf -t server -c cs-dotnet-json -d json -x ...
```

## 表级 vs 字段级

| 位置 | 空 group 的含义 |
|------|------------------|
| table | 若某 group 的 `default: true`，则自动属于该组 |
| field | **空 = 所有分组都导出** |

字段只要客户端时：在 Excel `##group` 行填 `c`，或在 schema 里给 field 设 group。

## 默认导出集合与 `*` 语义

由当前 target 导出的 table 的 valueType **递归引用**计算出**默认导出集合**。集合内的 enum/bean 即使 groups 不属于当前 target，也会导出。

| 规则 | 说明 |
|------|------|
| groups 含 `*` | 属于所有分组 |
| enum/bean 含 `*` | 即使未被引用也生成代码 |
| table/enum/bean groups 为空 | 当 target 的 groups 中有 `default: true` 的组时导出，否则不导出 |
| **field groups 为空** | **导出给所有分组**（与 table 规则不同） |

index 未写且 mode 为空或 map 时，常自动取 valueType 第一个字段为主键；index 多个字段时 mode 常为 list。

## 常见组合

| 场景 | 做法 |
|------|------|
| 数值仅服务器 | 字段 group=`s` |
| 表仅客户端 | 表 group=`c` |
| 编辑器要全量原始结构 | target `editor` 含 `e` 或 `c,s,e`，并选用 editor 向 codeTarget |

## 常见坑

- 以为「没填 group 就不导出」——对 **field** 恰恰相反。
- client/server 共用一个 output 目录导致互相覆盖。
- 改了 group 却仍用旧 `-t`，以为配置丢了。

## 相关链接

- [luban.conf](./luban-conf)
- [tag 过滤](../quality/tags)（记录级，另一维度）
