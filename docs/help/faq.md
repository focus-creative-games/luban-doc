# FAQ

## 如何指定主键

table的index字段指定主键列表。 详细请参见 [配置相关定义](../manual/schema) 中关于table的mode和index的相关文档。

map及list表支持主键概念，未指定mode和index的情况下，自动为mode=map模式，并记录bean的第一个字段作为主键。

假设 TbTest表的记录为Test类型，你想用Test的my_index字段作为key，则：

- 如果在xml里定义表，则在table的index属性中指定主键字段名，如下：

```xml
<table name="TbTest" value="Test" index="my_index"/>
```

- 如果在 table.xlsx里定义表，则在index列指定主键名，如下

|##var|full_name|value_type|define_from_excel|input|index|...|
|-|-|-|-|-|-|-|
||TbTest|Test|true|equip.xlsx|my_index|

## 支持多主键吗？

支持。 table mode=list时，支持联合多主键模式和独立多主键模式。详细文档参见 [配置相关定义](../manual/schema) 中关于table的mode的相关文档。

## 支持按client和server导出不同表及不同字段吗？

支持。[配置相关定义](../manual/schema)
中关于 分级定义及分组导出相关文档。

## 支持哪些源数据文件类型

- excel族。 csv、xls、xlm、xlsx、xlsm 等等
- json
- xml
- lua
- yaml

## 配置表的数据可以来源于多个文件吗？

可以。 参见 [配置相关定义](../manual/schema)
中关于 table.input的文档。 

## 可以将多个表放到同一个excel文件吗？

可以。 参见 [配置相关定义](../manual/schema)
中关于 table.input的文档。 

## 当数据文件为xlsx文件时，luban会读入第一个sheet还是所有sheet？

读入所有sheet，但是会忽略那些A1单元格内容不是##开头的sheet。

## 策划想在xlsx中有一个非数据的sheet，该怎么做呢

只要该sheet的A1单元格不以##开头即可。

## 想注释掉某一列，该如何做

将列名取空，或者 #xxxx这样的名称。

## 想注释掉某一行记录，该如何做

将该行第一个单元格填以##即可。

## 有些配置只想开发期内部测试用，正式发布时不导出，该如何做？

luban支持数据tag的概念。 excel第一列为tag。

- 当tag为##时忽略这个行
- 当tag为xxx时，如果Luban.Client 命令行中使用 --export_exclude_tags xxx，则不会导出该记录

## 我想每个json保存一个记录，文件太多，在input中指定很麻烦，怎么解决？

使用 目录数据源。 把所有json文件放到一个目录下（可以是目录树），将input设为该目录。luban会自动遍历整个目录树，将每个文件当作
一个记录读入。 详细参见[其它数据源-json](../manual/otherdatasource)

## 一个json文件可以包含多个记录吗？

可以。但必须在数据源中以 *@xxx.json形式指定。详细参见[其它数据源-json](../manual/otherdatasource)

## 记录可以来自json文件的某个深层次字段吗？

可以。分两种情况：

- 从字段中读入一个记录，则以 a.b.c@xx.json的形式指定
- 从字段中读入记录列表，则以 *a.b.c@xx.json的形式指定

详细参见[其它数据源-json](../manual/otherdatasource)

## 可以像xlsx那样，将多个表的数据都放到一个json文件中吗？

可以。 与excel数据源类似，只要每个表用 field@xx.json或者 *field@xx.json的形式指定即可。
详细参见[其它数据源-json](../manual/otherdatasource)

## 支持异步加载配置表吗？

不直接支持。但你可以通过自定义模板方式实现异步加载。

## 可以引用现有的枚举和结构吗？比如生成的代码中想使用UnityEngine.AudioType和UnityEngine.Color

可以，支持external类型的枚举和结构，但目前只支持c#语言。 详细文档参见 [配置定义介绍](../manual/schema) 中的type mapper相关文档。
