---
sidebar_position: 2
---

# XML Schema

XML suits stable types maintained by engineers (base libraries, complex inheritance trees) and can coexist with Excel schema. One XML file can hold enum / bean / table together; you need not split into three files as with Excel.

In `luban.conf`, leave the directory or file `type` empty:

```json
{"fileName": "Defines", "type": ""}
```

## Complete small example

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

Full names generated in the example are roughly: `item.Quality`, `item.Item`, `item.TbItem`, `item.equip.TbEquip`.

## module

| Attribute | Description |
|------|------|
| name | Namespace; may be empty; may be multi-level like `a.b`; may nest child `<module>` |

Root modules often use `<module name="">` for global vectors etc. (see sample project `builtin.xml`).

## enum

```xml
<enum name="OpenFlag" flags="1" unique="1" comment="开关">
  <var name="None" value="0"/>
  <var name="A" value="1"/>
  <var name="B" value="2"/>
  <var name="AB" value="A|B"/>
</enum>
```

| Attribute / child | Description |
|-------------|------|
| flags / unique | Bit flags; unique item values |
| var.name / alias / value | Item name, fill-in alias, explicit value |
| mapper | Map to an external enum type (see below) |

## bean

```xml
<!-- Value type + default separator: data can write 1,2,3 -->
<bean name="vec3" valueType="1" sep=",">
  <var name="x" type="float"/>
  <var name="y" type="float"/>
  <var name="z" type="float"/>
</bean>

<!-- Ordinary composite type -->
<bean name="Reward">
  <var name="item_id" type="int"/>
  <var name="num" type="int"/>
  <var name="desc" type="string" group="c"/>
</bean>
```

| Attribute | Description |
|------|------|
| name | Type name (without namespace; namespace comes from the outer module) |
| parent | Parent class; short names resolve in this module first, then globally |
| valueType | Value-type semantics |
| sep | Default separator for compact/stream filling |
| alias | Alias for polymorphism and similar scenarios |

Fields: `<var name="..." type="..." group="..." comment="..." tags="..."/>`.  
Type forms: see [Type cheat sheet](./types).

### Nested child beans = polymorphism

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

Child `<bean>` nested inside a parent bean automatically get that parent as `parent`. You can also write them flat:

```xml
<bean name="Shape"/>
<bean name="Circle" parent="Shape">
  <var name="radius" type="float"/>
</bean>
```

See [Polymorphism](./polymorphism).

## table

```xml
<table name="TbItem" value="Item" index="id" input="item.xlsx"/>
<table name="TbNotKeyList" value="NotKeyList" mode="list" input="list.xlsx"/>
<table name="TbUnion" value="UnionRow" index="key1+key2" input="union.xlsx"/>
<table name="TbGlobal" value="GlobalConfig" mode="one" input="global.xlsx"/>
<table name="TbFromHeader" value="FromHeader" readSchemaFromFile="1" input="from_header.xlsx"/>
```

| Attribute | Description |
|------|------|
| name / value | Table name, row bean |
| input | Multiple sources comma-separated; `Sheet@file.xlsx`; directory |
| index | `a` / `a+b` / `a,b` |
| mode | `map` / `list` / `one` |
| readSchemaFromFile | Read bean from data table header (do not also define same-named bean in XML) |
| group / output / comment / tags | Same semantics as Excel schema |

## refgroup / constalias / mapper (summary)

```xml
<!-- Multi-table ref sugar: field writes #ref=item_tables -->
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

| Element | Purpose |
|------|------|
| refgroup | A set of full table names usable by `#ref=` |
| constalias | Constant aliases usable in data |
| mapper | Map enum/bean to external types (by target / codeTarget); see [TypeMapper](./type-mapper) |

## When to use XML

| Better for XML | Better for Excel schema |
|------------|---------------------|
| Base types, few changes | Business tables add fields often |
| Deep inheritance, engineer review | Designers also need to see structure tables |
| Git-diff friendly | Kept next to fill-in data files |

## Related links

- [Excel Schema](./excel-schema)
- [TypeMapper](./type-mapper)
- [Polymorphism](./polymorphism)
- [luban.conf](../concepts/luban-conf)
