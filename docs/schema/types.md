---
sidebar_position: 3
---

# 类型系统速查

类型写在 bean 字段的 `type`、Excel `##type` 行，或校验标签里。本页给可直接套用的写法；单元格怎么填见 [Excel 基础](../excel/basics)。

## 基础类型

| 类型 | 说明 | 数据表示例 |
|------|------|------------|
| bool | 大小写不敏感 | `true` / `false` / `0` / `1` / `是` / `否` |
| byte / short / int / long | 整型 | `1001` |
| float / double | 浮点 | `1.5` |
| string | 字符串 | `hello`；空串填 `""` |
| text | 语法糖，等价 `string#text=1` | 本地化 key，会校验合法性 |
| datetime | 导出为 UTC 秒（long） | `2024-01-01 12:00:00` |

## 自定义类型

| 类型 | 说明 |
|------|------|
| enum | 枚举；可填项名或 alias |
| bean | 复合类型；可继承 / 多态 |

在 schema 中引用时写类型全名或本模块简名，例如 `Quality`、`item.Cost`、`Shape`。

## 容器

| 写法 | 说明 |
|------|------|
| `array,T` | 数组 |
| `list,T` | 列表 |
| `set,T` | 集合 |
| `map,K,V` | 映射；K 一般为基类型或 enum |

约束：**元素 / key / value 都不可空**（不能写 `list,int?`、`map,int?,string`）。

Schema 示例：

```xml
<bean name="Bag">
  <var name="id" type="int"/>
  <var name="item_ids" type="list,int"/>
  <var name="tags" type="set,string"/>
  <var name="attrs" type="map,int,int"/>
  <var name="costs" type="list,Cost"/>
</bean>
```

带分隔符、长度等标签时，容器标签加在容器上，常用括号：

| 写法 | 含义 |
|------|------|
| `(list#sep=\|),int` | 单元格内用 `\|` 分隔 |
| `(list#size=4),int` | 长度须为 4 |
| `(list#sep=;),Cost#sep=,` | 列表用 `;`，元素 Cost 用 `,` |
| `(map#sep=,),int,string` | 紧凑 map |

Excel 分列 / 多行填法见 [嵌套与容器](../excel/nested-and-collections)。

## 可空

| 写法 | 含义 |
|------|------|
| `int?` / `string?` / `Cost?` | 原子或非多态 bean 可空 |
| `Shape` | 多态且非可空：必须给出具体子类，不能 `null` |
| `Shape?` | 可空多态：才允许空 / `null` |

容器本身不支持 `list,T?` 这种元素可空写法。

## 字段上的常用标签

写在类型字符串中（Excel `##type` 或 XML `type="..."`）：

| 写法 | 作用 |
|------|------|
| `int!` | 不能为默认值（如 0） |
| `int#ref=item.TbItem` | 引用校验 |
| `int#ref=item.TbItem?` | 0 / 空可忽略引用 |
| `int#ref=a.TbA,b.TbB` | 多表引用 |
| `string#path=unity` | 资源路径校验 |
| `int#range=[1,100]` | 范围 |
| `int#set=1;2;3` | 允许值集合 |
| `(list#index=id),Foo` | 对 list 元素按 id 建辅助索引（如 C#） |

完整说明见 [校验器](../quality/validators)。

## 特殊类型

| 类型 | 说明 |
|------|------|
| table | 每张配置表对应的管理类（如 `TbItem`） |
| Tables | 入口类，名由 `targets[].manager` 决定 |

## 外部类型映射（TypeMapper）

可把 bean/enum 映射到工程已有类型（如 `UnityEngine.Vector3`）。在 XML 的 `<mapper>` 中配置，见 [XML Schema](./xml-schema)。代码风格相关说明见 [代码风格](../runtime/code-style)。

## 相关链接

- [多态](./polymorphism)
- [Excel：嵌套与容器](../excel/nested-and-collections)
- [校验器](../quality/validators)
