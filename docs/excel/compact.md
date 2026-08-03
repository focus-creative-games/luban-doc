---
sidebar_position: 5
---

# 紧凑格式（stream / lite / json / lua）

自 v4.0 起，非原子字段可在**字段名**上声明单元格格式（不是写在 `##type` 上）：

```text
pos#format=lite
cost#format=json
```

## 四种 format

| format | 含义 | 典型单元格 |
|--------|------|------------|
| `stream`（默认） | 流式，空白常跳过 | 配合 sep：`1,2,3` |
| `lite` | 花括号、一般无字段名 | `{1.0,2.0,3.0}` |
| `json` | 单元格内 JSON | `{"x":1,"y":2}` |
| `lua` | 单元格内 Lua 表 | `{x=1,y=2}` |

## lite 完整示例

```xml
<bean name="Vec3">
  <var name="x" type="float"/>
  <var name="y" type="float"/>
  <var name="z" type="float"/>
</bean>
<bean name="Shape"/>
<bean name="Circle" parent="Shape">
  <var name="radius" type="float"/>
</bean>
```

| ##var | id | pos#format=lite | shape#format=lite | tags#format=lite |
|---|---|---|---|---|
| ##type | int | Vec3 | Shape | list,int |
| | 1 | {1,2,3} | {Circle,1.5} | {10,20,30} |
| | 2 | {0,0,1} | {Circle,2.0} | {} |

要点：

| 规则 | 说明 |
|------|------|
| bean/容器 | 用 `{...}`，可嵌套 `{1,xxxx,{1,2,3}}` |
| 多态 | `{TypeName,字段1,字段2,...}`；类型为 `Shape`（非 `Shape?`）时必须给出具体子类，不能写 `null` |
| 可空 bean（`T?`） | 才可写 `null`，不要写 `{null}` |
| 默认值 | **不支持**分列模式下的「缺省字段用默认值」 |
| 空白 | 类似 HTML 空白会被剔除 |

## json 单元格示例

| ##var | id | pos#format=json | shape#format=json |
|---|---|---|---|
| ##type | int | Vec3 | Shape |
| | 1 | {"x":1,"y":2,"z":3} | {"$type":"Circle","radius":1.5} |

适合：与外部工具导出的 JSON 片段一致。

## lua 单元格示例

| ##var | id | pos#format=lua |
|---|---|---|
| ##type | int | Vec3 |
| | 1 | {x=1,y=2,z=3} |

多态字段里类型键一般为 `_type_`（与文件型 lua 数据源一致）。

## 和 sep / 分列怎么选

| 场景 | 建议 |
|------|------|
| 策划要一眼对照每一列 | 分列 + 合并单元格 |
| 短向量、小结构 | `sep` 或 `lite` |
| 已有 JSON 片段 | `json` |
| 列表很长、列会爆炸 | lite/json，或 [多行列表](./nested-and-collections) |

## 常见坑

- 把 `#format=lite` 写在 `##type` 上 → 不生效，应写在字段名。
- lite 里写 `{null}` 表示可空 → 应写 `null`。
- 以为 lite 能省略中间字段用默认值 → 不行，要写全或改分列。

## 相关链接

- [纵表与 sep](./vertical-and-sep)
- [其它数据源（整文件 json/lua）](./other-sources)
- [多态](./polymorphism)
