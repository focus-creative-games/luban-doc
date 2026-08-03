---
sidebar_position: 3
---

# 多态数据怎么填

本页解决：字段类型是**抽象 bean**（有多个子类）时，如何标明「这一格到底是哪个子类型」。

## 一句话

先写**实现类型名**（或 alias），再按该子类字段顺序填数据。

## Schema 示例

```xml
<bean name="Shape"/>
<bean name="Circle" parent="Shape">
  <var name="radius" type="float"/>
</bean>
<bean name="Rect" parent="Shape" alias="矩形">
  <var name="width" type="float"/>
  <var name="height" type="float"/>
</bean>

<bean name="Spawn">
  <var name="id" type="int"/>
  <var name="shape" type="Shape"/>
</bean>
```

`Shape` 为抽象基类；`Circle` / `Rect` 为可实例化子类。

## Excel：分列填写

`shape` 占多列：第一行把 `shape` **合并**；子行写 `$type` 与各子类字段。

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">shape</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>$type</td>
      <td>radius</td>
      <td>width</td>
      <td>height</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>string</td>
      <td>float</td>
      <td>float</td>
      <td>float</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>Circle</td>
      <td>1.5</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td>2</td>
      <td>Rect</td>
      <td></td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td></td>
      <td>3</td>
      <td>矩形</td>
      <td></td>
      <td>4</td>
      <td>5</td>
    </tr>
  </tbody>
</table>

说明：

- `$type` 列（或合并范围内第一个值）写 `Circle` / `Rect` / 别名 `矩形`。
- 无关字段列留空即可。
- 不使用 `$type` 列名时，约定仍是「范围内第一个单元格 = 类型名」。

## Excel：一个单元格（sep / lite）

字段名或类型上带 sep / format 时，可写在一格：

| ##var | id | shape#sep=, |
|---|---|---|
| ##type | int | Shape |
| | 1 | Circle,1.5 |
| | 2 | Rect,2,3 |

或 `shape#format=lite`：

| ##var | id | shape#format=lite |
|---|---|---|
| ##type | int | Shape |
| | 1 | {Circle,1.5} |
| | 2 | {Rect,2,3} |

更多见 [sep](./vertical-and-sep)、[紧凑格式](./compact)。

## 可空多态 `Shape?`

| 单元格 | 含义 |
|--------|------|
| `null` 或按规则留空 | 空 |
| `Circle,1.5` / `{Circle,1.5}` | 非空 Circle |

## 其它数据源

| 格式 | 类型字段示例 |
|------|----------------|
| json / yaml | `"shape": { "$type": "Circle", "radius": 1.5 }` |
| lua | `shape = { _type_ = "Circle", radius = 1.5 }` |
| xml | `<shape type="Circle"><radius>1.5</radius></shape>` |

## 运行时（C# 示意）

```csharp
Shape s = row.Shape;
if (s is Circle c) { /* c.Radius */ }
else if (s is Rect r) { /* r.Width, r.Height */ }
```

## 常见坑

- 写成抽象类名 `Shape` 而不是子类名。
- 类型名/alias 拼错。
- 子类字段顺序与 Schema 不一致（分列模式按声明顺序）。
- Schema 里忘了 `parent`，生成侧没有多态。

## 相关链接

- [Schema：多态](../schema/polymorphism)
- [嵌套与容器](./nested-and-collections)
- [策划：复杂结构](../designer/complex)
