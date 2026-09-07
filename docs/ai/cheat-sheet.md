---
sidebar_position: 2
---

# AI 速查

给 Agent 的一页纸。详细说明点链接。

## 心智模型

```text
Schema（结构契约） → Data（Excel/JSON…） → Generate（-c/-d） → Runtime（Tables）
```

## 常用命令

```bash
# 日常生成
dotnet Luban.dll --conf luban.conf -t client -c cs-bin -d bin \
  -x outputCodeDir=../Gen -x outputDataDir=../Data

# 仅校验（主 CLI）
dotnet Luban.dll --conf luban.conf -t all -f --strict -x outputSaver=null

# Agent：查表 / schema / 校验（stdout 为 JSON）
dotnet Luban.Agent.dll list-tables --conf luban.conf -t all
dotnet Luban.Agent.dll schema --conf luban.conf -t all
dotnet Luban.Agent.dll validate --conf luban.conf -t all

# 机器可读 schema（不加载数据）
dotnet Luban.dll --conf luban.conf -t all -c schema-json -x outputCodeDir=./schema-out

# 机器可读报错
dotnet Luban.dll ... --errorFormat json
```

示例工程可用 `Tools/build-luban.bat`（或 `.sh`）一次产出 `Tools/Luban`、`Tools/Luban.Agent`、`Tools/Luban.Mcp`。
## 加表最小步骤

1. 新建数据表（A1 以 `##` 开头；含 `##var` / `##type`）。
2. 在 `__tables__`（或 XML）登记 `full_name` / `value_type` / `input` / `index`。
3. `read_schema_from_file=true` 时不要在 `__beans__` 再定义同名 bean。
4. 重新生成。

详见 [加一张表](../guide/add-table)。

## 类型速记

| 写法 | 含义 |
|------|------|
| `int` / `string` / `bool` / `datetime` | 基础 |
| `list,T` / `array,T` / `set,T` / `map,K,V` | 容器（元素不可空） |
| `T?` | 可空 |
| `int#ref=item.TbItem` | 引用校验 |
| `int#range=[1,100]` | 范围 |
| `string#path=unity` | 资源路径（需 rootDir） |

## 分组

| 标记 | 含义 |
|------|------|
| `c` | 客户端 |
| `s` | 服务器 |
| `e` | 编辑器 |
| 空 | 通常跟 default groups |

## 常见坑

- 忘登记 `__tables__` → 文件不被收集。
- Sheet A1 不是 `##` → sheet 被忽略。
- 输出目录勿指向手写代码目录（默认会清理旧生成物）。
- 多 `-c/-d` 时 `-t` 必须相同；分层 `-x cs-bin.outputCodeDir=...`。

## 相关

- [CLI 常用](../runtime/cli-common) · [类型](../schema/types) · [校验](../quality/validators) · [Skills](./skills) · [Agent CLI](./agent-cli) · [MCP](./mcp)
