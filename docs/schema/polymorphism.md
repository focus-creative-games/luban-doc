---
sidebar_position: 4
---

# 多态与抽象 bean

把基类做成抽象类型（有子类），数据里用**类型名**（或 alias）区分实现；生成代码用继承表达，加载时得到具体子类实例。

适合技能、AI、任务、副本等「同一字段多种结构」的 GamePlay 数据。

## Schema：XML

**写法一：嵌套子 bean（parent 自动关联）**

```xml
<bean name="Shape">
  <bean name="Circle" alias="圆">
    <var name="radius" type="float"/>
  </bean>
  <bean name="Rect" alias="矩形">
    <var name="width" type="float"/>
    <var name="height" type="float"/>
  </bean>
</bean>

<bean name="Spawn">
  <var name="id" type="int"/>
  <var name="shape" type="Shape"/>
</bean>
```

**写法二：平铺 + parent**

```xml
<bean name="Shape"/>
<bean name="Circle" parent="Shape" alias="圆">
  <var name="radius" type="float"/>
</bean>
<bean name="Rect" parent="Shape" alias="矩形">
  <var name="width" type="float"/>
  <var name="height" type="float"/>
</bean>
```

要点：

- 有子类的父 bean 一般为**抽象类型**，不要在数据里把类型写成父类名 `Shape`。
- 子类字段 = 父字段层级 + 自身字段。
- `alias` 供策划在 Excel 里写「圆」「矩形」。

## Schema：Excel `__beans__`

逻辑等价于上表（列名以模板为准）：

| full_name | parent | alias | comment |
|---|---|---|---|
| Shape | | | 形状基类 |
| Circle | Shape | 圆 | |
| Rect | Shape | 矩形 | |

| bean | name | type |
|------|------|------|
| Circle | radius | float |
| Rect | width | float |
| Rect | height | float |
| Spawn | id | int |
| Spawn | shape | Shape |

## 可空 vs 非可空

| 字段类型 | 含义 |
|----------|------|
| `Shape` | 非可空多态：每行都必须是某个子类，不能填 `null` |
| `Shape?` | 可空多态：允许空 / `null` |

```xml
<var name="shape" type="Shape"/>     <!-- 必填具体子类 -->
<var name="shape2" type="Shape?"/>   <!-- 可为 null -->
```

紧凑格式里非可空应写 `{Circle,1.5}`，而不是 `null`。见 [紧凑格式](../excel/compact)。

## 数据怎么填

Excel 分列、紧凑、json 等见 [Excel：多态填法](../excel/polymorphism)。分列示意：

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
      <td>矩形</td>
      <td></td>
      <td>2</td>
      <td>3</td>
    </tr>
  </tbody>
</table>

## 运行时怎么用（C# 示意）

```csharp
switch (spawn.Shape)
{
    case Circle c:
        // 用 c.Radius
        break;
    case Rect r:
        // 用 r.Width / r.Height
        break;
}
```

类型很多时可用 `GetTypeId()` / `__ID__` 做分支（见示例工程生成代码）。复杂技能树等也可把多态数据放在 JSON 源里，见 [其他数据源](../excel/other-sources)。

## 常见坑

- 忘记定义子类，或 `parent` 拼写 / 模块前缀错误。
- 数据里写了抽象父类名当作 `$type`。
- 类型是 `Shape`（非 `Shape?`）却填 `null`。
- 策划用的中文名未配置 `alias`。

## 相关链接

- [类型速查](./types)
- [Excel 多态](../excel/polymorphism)
- [XML Schema](./xml-schema)
