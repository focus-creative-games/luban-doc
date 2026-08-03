---
sidebar_position: 5
---

# 导入表与模块组织

本页解决：命名空间怎么划、一张逻辑表多个文件、公共类型复用，以及（可选）按文件名自动导入 table。

## 模块 / 命名空间

**XML**：嵌套 `<module>`。

```xml
<module name="item">
  <bean name="Item">...</bean>
  <table name="TbItem" value="Item" input="item/item.xlsx"/>

  <module name="equip">
    <table name="TbEquip" value="Equip" input="item/equip.xlsx"/>
  </module>
</module>
```

全名：`item.Item`、`item.TbItem`、`item.equip.TbEquip`。

**Excel schema**：`full_name` / `value_type` 直接写带点名。

| full_name | value_type | input |
|---|---|---|
| item.TbItem | item.Item | item/item.xlsx |
| item.equip.TbEquip | item.equip.Equip | item/equip.xlsx |

合理分模块便于：代码目录清晰、减少表名冲突、按系统拆 xlsx。

## 多文件输入（一张逻辑表）

`input` 逗号分隔，多文件合并为同一张表（适合分表协作）：

| full_name | value_type | input | index |
|---|---|---|---|
| TbItem | Item | item_part1.xlsx,item_part2.xlsx | id |

```xml
<table name="TbItem" value="Item" index="id"
       input="item/item_part1.xlsx,item/item_part2.xlsx"/>
```

也可用目录：`input="ai/blackboards"`（读目录下数据文件）。单 sheet：`Bag@bag.xlsx`。

## 公共类型复用

把向量、消耗、时间段等放进公共模块，业务表只引用类型名：

```xml
<!-- Defines/common.xml -->
<module name="common">
  <bean name="Cost">
    <var name="id" type="int"/>
    <var name="count" type="int"/>
  </bean>
</module>

<!-- Defines/item.xml -->
<module name="item">
  <bean name="Item">
    <var name="id" type="int"/>
    <var name="craft_cost" type="list,common.Cost"/>
  </bean>
</module>
```

Excel `__beans__` 里 `type` 同样可写 `common.Cost`。

## refgroup（多表引用）

多张表都可作为 `#ref=` 目标时，用 refgroup 少写重复名：

```xml
<refgroup name="item_tables" ref="item.TbItem,item.TbItemExtra"/>

<bean name="Reward">
  <var name="item_id" type="int#ref=item_tables"/>
</bean>
```

等价于 `int#ref=item.TbItem,item.TbItemExtra`。多表引用一般不生成「单表 Ref 字段」，见 [校验器](../quality/validators)。

## 自动导入 table（可选）

不想每张表都手写 `__tables__` 时，可用默认 TableImporter：扫描文件名以 `#` 开头的 Excel/CSV，按规则生成表声明（**不会**写回 `__tables__.xlsx`）。

| 文件（相对工程） | 推断结果 |
|------------------|----------|
| `#Item.xlsx` | `TbItem` / value=`Item` / mode=map |
| `reward/#Reward.xlsx` | `reward.TbReward` / `reward.Reward` |
| `item/equip/#Equip.csv` | `item.equip.TbEquip` / `item.equip.Equip` |

常用命令行覆盖：

```text
-x tableImporter.name=default
-x tableImporter.filePattern=#(.*)
-x tableImporter.tableNameFormat=Tb{0}
```

`tableImporter.name=none` 可关闭自动导入。

限制（复杂源请手写 `__tables__` / XML）：

- 不支持多文件合并成一张表
- 不支持「只导出某个 sheet」这类规则
- 只支持常见 map 形态，不覆盖 `one` / 特殊 index

## 目录组织建议

```text
Project/
  luban.conf
  Defines/
    builtin.xml      # vec2/vec3 等
    common.xml
    item.xml
  Datas/
    __tables__.xlsx
    __beans__.xlsx
    __enums__.xlsx
    item/
      item.xlsx
      equip.xlsx
    reward/
      reward.xlsx
```

| 做法 | 说明 |
|------|------|
| 按系统分目录 | `Datas/item/`、`Datas/skill/` |
| 大表拆分 | 多 xlsx 同一 table `input` |
| 稳定类型进 XML | 少改、多引用的放 `Defines` |
| 业务登记进 Excel | `__tables__` / `__beans__` 与数据同目录 |

## 相关链接

- [luban.conf](../concepts/luban-conf)
- [Excel Schema](./excel-schema)
- [XML Schema](./xml-schema)
- [加一张表](../guide/add-table)
