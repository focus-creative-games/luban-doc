---
sidebar_position: 2
---

# XML Schema

XML 适合程序维护的稳定类型（基础库、复杂继承树），与 Excel schema 可并存。一个 XML 文件里可同时写 enum / bean / table，不必像 Excel 那样拆三种文件。

在 `luban.conf` 中目录或文件的 `type` 留空即可：

```json
{"fileName": "Defines", "type": ""}
```

## 完整小例子

```xml
<module name="item">

  <enum name="Quality">
    <var name="WHITE" alias="白" value="1"/>
    <var name="GREEN" alias="绿" value="2"/>
    <var name="BLUE" alias="蓝" value="3"/>
  </enum>

  <bean name="Cost">
    <var name="id" type="int#ref=item.TbItem"/>
    <var name="count" type="int"/>
  </bean>

  <bean name="Item">
    <var name="id" type="int"/>
    <var name="name" type="string"/>
    <var name="quality" type="Quality"/>
    <var name="price" type="int" group="c,s"/>
  </bean>

  <table name="TbItem" value="Item" index="id" input="item/item.xlsx"/>
  <table name="TbItemExtra" value="Item" index="id" input="item/item_extra.xlsx"/>

  <refgroup name="item_tables" ref="item.TbItem,item.TbItemExtra"/>

  <module name="equip">
    <bean name="Equip">
      <var name="id" type="int"/>
      <var name="slot" type="int"/>
    </bean>
    <table name="TbEquip" value="Equip" input="item/equip.xlsx"/>
  </module>

</module>
```

上例生成的全名大致为：`item.Quality`、`item.Item`、`item.TbItem`、`item.equip.TbEquip`。

## module

| 属性 | 说明 |
|------|------|
| name | 命名空间；可空；可多级如 `a.b`；可嵌套子 `<module>` |

根模块常写 `<module name="">` 放全局向量等（见示例工程 `builtin.xml`）。

## enum

```xml
<enum name="OpenFlag" flags="1" unique="1" comment="开关">
  <var name="None" value="0"/>
  <var name="A" value="1"/>
  <var name="B" value="2"/>
  <var name="AB" value="A|B"/>
</enum>
```

| 属性/子元素 | 说明 |
|-------------|------|
| flags / unique | 位标志、项值唯一 |
| var.name / alias / value | 项名、填表别名、显式值 |
| mapper | 映射到外部枚举类型（见下） |

## bean

```xml
<!-- 值类型 + 默认分隔符：数据里可写 1,2,3 -->
<bean name="vec3" valueType="1" sep=",">
  <var name="x" type="float"/>
  <var name="y" type="float"/>
  <var name="z" type="float"/>
</bean>

<!-- 普通复合类型 -->
<bean name="Reward">
  <var name="item_id" type="int"/>
  <var name="num" type="int"/>
  <var name="desc" type="string" group="c"/>
</bean>
```

| 属性 | 说明 |
|------|------|
| name | 类型名（不含命名空间；命名空间由外层 module 决定） |
| parent | 父类；简名先在本模块再全局解析 |
| valueType | 值类型语义 |
| sep | 紧凑/流式填写默认分隔符 |
| alias | 多态等场景的别名 |

字段：`<var name="..." type="..." group="..." comment="..." tags="..."/>`。  
类型写法见 [类型速查](./types)。

### 嵌套子 bean = 多态

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
```

嵌套在父 bean 内的子 `<bean>` 会自动以父为 `parent`。也可平铺书写：

```xml
<bean name="Shape"/>
<bean name="Circle" parent="Shape">
  <var name="radius" type="float"/>
</bean>
```

详见 [多态](./polymorphism)。

## table

```xml
<table name="TbItem" value="Item" index="id" input="item.xlsx"/>
<table name="TbNotKeyList" value="NotKeyList" mode="list" input="list.xlsx"/>
<table name="TbUnion" value="UnionRow" index="key1+key2" input="union.xlsx"/>
<table name="TbGlobal" value="GlobalConfig" mode="one" input="global.xlsx"/>
<table name="TbFromHeader" value="FromHeader" readSchemaFromFile="1" input="from_header.xlsx"/>
```

| 属性 | 说明 |
|------|------|
| name / value | 表名、行 bean |
| input | 多源逗号分隔；`Sheet@file.xlsx`；目录 |
| index | `a` / `a+b` / `a,b` |
| mode | `map` / `list` / `one` |
| readSchemaFromFile | 从数据表头读 bean（勿再 XML 定义同名 bean） |
| group / output / comment / tags | 与 Excel schema 同语义 |

## refgroup / constalias / mapper（摘要）

```xml
<!-- 多表引用语法糖：字段写 #ref=item_tables -->
<refgroup name="item_tables" ref="item.TbItem,item.TbItemExtra"/>

<constalias name="ITEM_GOLD" value="1001"/>

<bean name="vec2" valueType="1" sep=",">
  <var name="x" type="float"/>
  <var name="y" type="float"/>
  <mapper target="client" codeTarget="cs-bin">
    <option name="type" value="UnityEngine.Vector2"/>
    <option name="constructor" value="ExternalTypeUtil.NewVector2"/>
  </mapper>
</bean>
```

| 元素 | 用途 |
|------|------|
| refgroup | 一组可被 `#ref=` 的表全名 |
| constalias | 数据里可用的常量别名 |
| mapper | 把 enum/bean 映射到外部类型（按 target / codeTarget）；详见 [TypeMapper](./type-mapper) |

## 何时用 XML

| 更适合 XML | 更适合 Excel schema |
|------------|---------------------|
| 基础类型、少变更 | 业务表频繁加字段 |
| 深继承、程序 review | 策划也要看结构表 |
| 与 Git diff 友好 | 与填表文件放一起 |

## 相关链接

- [Excel Schema](./excel-schema)
- [TypeMapper](./type-mapper)
- [多态](./polymorphism)
- [luban.conf](../concepts/luban-conf)
