---
sidebar_position: 6
---

# 非 Excel 数据源

表的 `input` 不只可以是 xlsx，还可以是 json / xml / yaml / lua / 目录等。技能、AI、编辑器导出的结构化数据常用这类源。

## input 写法

| 形式 | 含义 | 示例 |
|------|------|------|
| `foo.xlsx` | Excel | `item.xlsx` |
| `sheet@foo.xlsx` | 指定 sheet | `Bag@ui.xlsx` |
| `a.xlsx,b.xlsx` | 多文件合并 | |
| `foo.json` | **单条**记录 | 单例或一条配置 |
| `*@foo.json` | 记录**列表** | 表数据主文件 |
| `field@foo.json` | 从某字段取单条 | `data@bundle.json`，支持 `a.b.c` |
| `*field@foo.json` | 从某字段取列表 | `*items@bundle.json` |
| 目录 | 遍历文件 | 忽略以 `.` `~` `_` 开头的名字 |

```xml
<table name="TbItem" value="Item" index="id" input="item.xlsx"/>
<table name="TbSkill" value="Skill" index="id" input="*@skill/skills.json"/>
<table name="TbGlobal" value="Global" mode="one" input="global.json"/>
```

## JSON 列表示例（`*@items.json`）

```json
[
  { "id": 1, "name": "剑", "cost": { "id": 1001, "count": 2 } },
  { "id": 2, "name": "盾", "cost": { "id": 1002, "count": 1 } }
]
```

多态字段：

```json
{
  "id": 1,
  "shape": { "$type": "Circle", "radius": 1.5 }
}
```

map：默认常为 `[[k,v],[k,v]]` 形式（与 dataTarget `json` 一致）；以当前版本解析为准。

## JSON 单记录（`global.json`）

```json
{
  "bag_init_size": 20,
  "bag_max_size": 100,
  "guild_open_level": 10
}
```

`__tables__` 里 `mode=one`，`input=global.json`。

## Lua（文件需 `return`）

```lua
return {
  { id = 1, name = "剑", shape = { _type_ = "Circle", radius = 1.5 } },
  { id = 2, name = "盾", shape = { _type_ = "Rect", width = 2, height = 3 } },
}
```

列表文件配合 `*@xxx.lua`；注意多态键是 `_type_`。

## XML

```xml
<record>
  <id>1</id>
  <name>剑</name>
  <shape type="Circle">
    <radius>1.5</radius>
  </shape>
</record>
```

集合常用重复 `<item>` 节点；map 用 key/value 子节点（详见示例工程）。

## YAML

与 JSON 类似，多态仍用 `$type`：

```yaml
- id: 1
  name: 剑
  shape:
    $type: Circle
    radius: 1.5
```

## 目录数据源

`input="skills"` 且 `skills/` 下有多个文件时：

| 文件类型 | 默认语义 |
|----------|----------|
| 非 Excel | **每个文件一条记录**（文件名常可当辅助；以解析规则为准） |
| Excel | 仍按多记录表处理 |

需要「一个 json 里很多行」时，用 `*@file.json`，不要只写目录却期望自动当数组。

## 复合 input 组合

```text
item.xlsx,*@item_extra.json
```

Excel 与 JSON 列表可拼到同一张逻辑表（注意主键别冲突）。

## 格式对照（单记录内）

| | json/yaml | lua | xml |
|--|-----------|-----|-----|
| 多态类型 | `$type` | `_type_` | 属性 `type` |
| map | `[[k,v],...]` | `{[k]=v,...}` | key/value item |
| set | 数组 | 表 | item 节点 |

另有 `.lit`（lite 文件），语义接近单元格 [lite](./compact)。

## 常见坑

- 写了 `skills.json`（单记录）却放了数组 → 应改成 `*@skills.json`。
- JSON 用了 `_type_`、Lua 用了 `$type` → 键名与格式不匹配。
- 目录里文件名以 `_` 开头被忽略。
- 与 Excel 混用时主键重复导致校验失败。

## 相关链接

- [表的 input / mode](../schema/excel-schema)
- [紧凑格式（单元格内 json/lua）](./compact)
- [多态](./polymorphism)
