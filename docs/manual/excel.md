# excel格式介绍

## 创建一个普通的xlsx 配置表

- 假设你要创建的配置为装备表.
- 在MyConfigs/Datas 目录下创建 equip.xlsx（实践中推荐按模块创建子目录，在模块目录创建配置，便于维护管理）, 其内容如下

|##var| id | name | attr | value|
| - | - | - | - | - |
| ##type |int|string|int| float |
|##group|c|s|c,s||
| | 1 | equip1 | 10|1.2|
| | 2 | equip2 | 15|3.4|

- 在 MyConfigs/Datas/\_\_tables\_\_.xlsx 里新增一行。 有些不相关列被忽略了

|##var|full_name|value_type|define_from_excel|input|...|
|-|-|-|-|-|-|
||demo.TbItem|Item|true|equip.xlsx||

- 至此，完成添加新表工具。 运行 check.bat 检查是否成功生成！

## excel 标题头行的介绍

- 第1列单元格为 `##var` 表示这行是字段定义行
- 第1列单元格为 `##type` 表示这行是 类型定义行
- 第1列单元格为 `##group` 表示这行是 导出分组行。**此行可选**。另外，单元格留空表示对所有分组导出。
- 第1列单元格以##**开头** 表示这是注释行，如果有多个##行，默认以第一个行作为代码中字段的注释，你可以通过##comment 显式指定某行为代码注释行。
- 填写多级字段名行时，以##var表示这是次级字段行
- 你可以随意调整##xxx和##yyy之类的行的顺序，**但注意** 如果第一行是注释行，必须使用##comment，而不是##。否则会把第一行当字段名行而出错（这是出于兼容性，早期强制第一行是字段名行，允许只以##开头）

<table  border="1">
<tr align="center">
  <td>##var</td>
  <td>id</td>
  <td>name</td>
  <td colspan="6">*stages</td>
</tr>
<tr align="center">
  <td>##var</td>
  <td/>
  <td/>
  <td>id</td>
  <td>name</td>
  <td>desc</td>
  <td>location</td>
  <td>item_id</td>
  <td>num</td>
</tr>
<tr align="center">
  <td>##type</td>
  <td>int</td>
  <td>string</td>
  <td colspan="6">list,Stage</td>
</tr>
<tr align="center">
  <td>##</td>
  <td>id</td>
  <td>desc1</td>
  <td>desc1</td>
  <td>desc2</td>
  <td>desc3</td>
  <td>desc4</td>
  <td>desc5</td>
  <td>desc6</td>
</tr>
<tr align="center">
  <td>##comment</td>
  <td>id</td>
  <td>名字</td>
  <td>注释1</td>
  <td>desc2</td>
  <td>desc3</td>
  <td>desc4</td>
  <td>desc5</td>
  <td>desc6</td>
</tr>
<tr align="center">
<td/>
<td>1</td>
<td>task1</td>
<td>1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>2</td><td>stage2</td><td>stage desc2</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>3</td><td>stage3</td><td>stage desc3</td><td>1,2,3</td><td>1002</td><td>1</td>
</tr>
<tr align="center">
<td/><td>2</td>
<td>task2</td>
<td>1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>2</td><td>stage2</td><td>stage desc2</td><td>1,2,3</td><td>1002</td><td>1</td>
</tr>
</table>

## 注释行或列

当标题行字段名为空或者以'#'、'_'开头时，这个列会被当作注释列而忽略。

当数据行的第一列以##开头时，这一行会被当作注释行而被忽略。

## excel文件 读取规则

- 如果未指定sheet，则默认会读取所有sheet
- 可以用 sheet@xxx.xlsx 指定只读入这个sheet数据
- 如果A1单元格数据不以##开头，则会被当作非数据sheet，被忽略

## 支持的excel文件族

支持 xls、 xlsx、 xlm、 xlmx、csv 。基本上excel能打开的都可以读取。

## 支持非GKB和UTF-8编码的csv文件

luban会智能猜测出它的编码，正确处理。

## 灵活的配置文件组织形式

- 可以几个表都放到一个xlsx中，每个表占一个sheet。 只需要为每个表的input指定为该单元薄即可，如 input="xxx@item/test/abs.xlsx"。
- 可以一个表拆分为几个xlsx。 如 input="item/a.xlsx,bag/b.xlsx,c.xlsx"。
- 可以一个读入一个目录下的所有xlsx。 如 input="bag" 。

## 单元格留空取默认值

除了bean以外的数据，都可以留空。自动取默认值。注意非空字段的默认值是初始值，可空变量的默认值为null。例如int默认值是0，但int?的默认值是null。字符串string的默认值是长度为0的空白字符串，而string?的默认为null。

## 数据格式

## 限定列格式与流式格式

如果某个字段通过标题头或者多级标题头限定了列范围，它的解析格式为限定列格式。

如果某个字段只是某个限定列格式的字段的某一个子数据，它的解析格式为流式格式。

示例如下。 标注@的列为 限定列格式， 标注~的列为流式格式。

```xml
<bean name="Item">
   <var name="item_id" type="int"/>
   <var name="num" type="int"/>
   <var name="desc" type="string">
</bean>
```

<table border="1">
<tr align="center">
  <td>##var</td><td>id</td><td>name</td><td colspan="3">item</td> <td colspan="8">items</td>
</tr>
<tr align="center">
  <td>##type</td><td>int</td><td>string</td><td colspan="3">Item</td><td colspan="8">list,Item</td>
</tr>
<tr align="center">
  <td>##var</td><td/><td/><td>item_id</td><td>num</td><td>desc</td><td/><td/><td/><td/><td/><td/><td/><td/>
</tr>
<tr align="center">
  <td></td><td>@</td><td>@</td><td>@</td><td>@</td><td>@</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td><td>~</td>
</tr>
<tr>
  <td/><td>1</td><td>xxxx</td><td>1001</td><td>1</td><td>item 1</td><td>2001</td><td>1</td><td>item2</td><td/><td/><td/><td/>
</tr>
<tr>
  <td></td>
  <td>2</td>
  <td>xxxx</td>
  <td>1002</td>
  <td>3</td>
  <td>item 1</td>
  <td>2001</td>
  <td>1</td>
  <td>item2</td>
  <td>2002</td>
  <td>2</td>
  <td>item 2</td>
  <td></td>
  <td></td>
</tr>  
</table>

## 限定列格式介绍

通过标题行及多级标题行，可以精确限定某个数据在某些列范围内。

对于只有一个原子值的简单类型数据，限定列格式下，由于能够非常清晰知道它的值必然来自某一单元格，所以它支持**默认值**语义，即如果单元格为空，值取默认值，例如 int类型默认值为0，int?默认值为null。

限定列格式下，多态bean类型需要用 $type 列来指定具体类型名，可空bean类型也需要用$type列来指示是有效bean还是空bean。

如果最低层的限定列的类型为容器或者bean，由于限定列只限定了该数据整体范围，但**未限定**子数据的范围，因此读取子数据的格式为**流式格式**，即按顺序读入每个子数据。

综合示例如下：

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="4">shape</td><td colspan="4">item</td></tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="4">Shape</td><td colspan="4">Item</td></tr>
<tr align="center"><td>##var</td><td></td><td>$type</td><td>radius</td><td>width</td><td>height</td><td>$type</td><td>item_id</td><td>num</td><td>desc</td></tr>
<tr align="center"><td/><td>1</td><td>Circle</td><td>10</td><td/><td/><td>Item</td><td>1001</td><td>1</td><td>item 1</td></tr>
<tr align="center"><td/><td>2</td><td>Rectangle</td><td></td><td>10</td><td>20</td><td>{}</td><td>1001</td><td>2</td><td>item 1</td></tr>
<tr align="center"><td/><td>3</td><td>圆</td><td>10</td><td/><td/><td>null</td><td></td><td></td><td></td></tr>
<tr align="center"><td/><td>4</td><td>Circle</td><td>10</td><td/><td/><td></td><td></td><td></td><td></td></tr>
</table>

一些数据结构有特殊的列限定支持。

### `flags=1` 的 enum 类型支持列限定模式。

用枚举项作为列名，最终值为所有非0或空的枚举项的或值。

<table border="1">
<tr align="center"><td>##var</td><td colspan="4">type</td> </tr>
<tr align="center"><td>##var</td><td>A</td><td>B</td><td>C</td><td>D</td></tr>
<tr align="center"><td/><td/><td>1</td><td>1</td><td></td></tr>
<tr align="center"><td/><td>1</td><td></td><td></td><td>1</td></tr>
</table>

### 多态bean支持 $type与$value 分别配置的列限定或流式格式的混合填写方式

即用$type列为限定类型，用$value列来限定bean的实际字段，并且$value中以流式填写bean的所有字段。

<table border="1">
<tr align="center"><td>##var</td><td colspan="4">shape</td> </tr>
<tr align="center"><td>##var</td><td>$type</td><td colspan="3">$value</td></tr>
<tr align="center"><td/><td>Circle</td><td colspan="3">10</td></tr>
<tr align="center"><td/><td>Rectangle</td><td colspan="3">10,20</td></tr>
</table>

## 流式格式介绍

对于没有具体限定列范围的子数据，使用流式格式（也只有这种办法），按顺序读入子数据。

由于流式格式无法区分 默认单元格和空白忽略单元格，因此流格式下，不支持**默认值**语义，会忽略所有空白单元格。
进而对于默认值必须填上有效值默认值来表示数据，而不能留空来表达。

流式格式下的默认值填写规则如下

- bool 默认值为 false
- int,float 之类的默认值为 0
- string 的默认值为""
- 可空变量，如int? 的空值为 null
- 容器变量，需要有右大括号 '}' 来表示空值（用'}'表示容器终止）

如下图，item字段为Item类型，包括多个子数据，但没为它的子字段添加子列限定，因此使用流式格式解析它。

- id=1的列，所有字段能够正常识别
- id=2的列，第2个单元格为空，被忽略，因此试图将"item 1"当作num字段解析，抛出格式错误的异常。
- id=3的列，第3个单元格为空，被忽略，尽管desc字段是string值，能接受空白值，也会抛出 数据缺失的异常。

记录2和3的正确填法如4和5。

<table border="1">
<tr align="center"> <td>##var</td><td>id</td><td>name</td><td colspan="3">item</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td>string</td><td colspan="3">Item</td></tr>
<tr align="center"><td></td><td>@</td><td>@</td><td>~</td><td>~</td><td>~</td></tr>
<tr><td/><td>1</td><td>xxxx</td><td>1001</td><td>1</td><td>item 1</td> </tr>
<tr><td/><td>2</td><td>xxxx</td><td>1001</td><td></td><td>item 1</td> </tr>
<tr><td/><td>3</td><td>xxxx</td><td>1001</td><td>1</td><td></td> </tr>
<tr><td/><td>2</td><td>xxxx</td><td>1001</td><td>0</td><td>item 1</td> </tr>
<tr><td/><td>3</td><td>xxxx</td><td>1001</td><td>1</td><td>""</td></tr>
</table>

流式格式下，各个类型必须填写非空白值，规则如下

- bool  false,true
- int,float 之类  有效整数值
- string  用""表示长度为0的字符串，用其他非值表示值本身
- enum  非空有效值
- bean 用流式格式按顺序读入每个字段
- 多态bean类型 先读入一个字符串，可以是具体的子类名或者子类别名，然后再根据子类名，流式读入该类型的每个字段。
- 可空bean类型 先读入一个字符串，如果是bean的类型名或者'{}'，则流格式读入该类型的所有字段；如果为null，则表示空，结束读取；其他情况则抛出解析失败的异常。
- array,list,set 如果流结束或者下一个读入的为'}'，则读取结束，否则用流格式读入element_type，如此循环。
- map 如果流结束或者下一个读入的为'}'，则读取结束，否则递归读入key_type和value_type，如此循环。

以下是一个非常复杂的bean的流式读取示例

```xml
<bean name="Foo">
  <var name="x" type="int"/>
  <var name="y" type="int"/>
</bean>

<bean name="SubList">
  <var name="a" type="int"/>
  <var name="b" type="list,string"/>
  <var name="c" type="bool"/>
</bean>

<bean name="StreamDemo">
  <var name="x1" type="int"/>
  <var name="x2" type="Foo"/>
  <var name="x2_1" type="string"/>
  <var name="x2_2" type="list,int"/>
  <var name="x3_1" type="string"/>
  <var name="x4" type="list,Foo"/>
  <var name="x4_1" type="string"/>
  <var name="x5" type="SubList"/>
  <var name="x5_1" type="string"/>
  <var name="x7" type="list,SubList"/>
  <var name="x7_1" type="string"/>
  <var name="x8_0" type="map,int,int"/>
  <var name="x8" type="int">
</bean>
```
<div class="Excel">
<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="50">stream_demo</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="50">StreamDemo</td></tr>
<tr align="center"><td>##</td><td/>
<td>x1</td>
<td colspan="2">x2</td>
<td>x2_1</td>
<td colspan="3">x2_2</td>
<td>x2_2 end flag</td>
<td>x3_1</td>
<td colspan="2">x4[0]</td>
<td colspan="2">x4[1]</td>
<td colspan="2">x4[2]</td>
<td>x4 end flag</td>
<td>x4_1</td>
<td>x5.a</td>
<td colspan="3">x5.b</td>
<td>x5.c</td>
<td>x5_1</td>
<td colspan="5">x7[0]</td>
<td colspan="5">x7[1]</td>
<td>x7 end flag</td>
<td>x7_1</td>
<td colspan="4">x8_0</td>
<td>x8_0 end flag</td>
<td>x8</td>
</tr>
<tr align="center"><td/>
<td>1</td>
<td>10</td>
<td>20</td><td>21</td>
<td>x2_1</td>
<td>2</td><td>3</td><td>4</td><td>}</td>
<td>x3_1</td>
<td>11</td><td>12</td><td>21</td><td>22</td><td>32</td><td>32</td><td>}</td>
<td>x4_1</td>
<td>100</td><td>aaa</td><td>bbbb</td><td>}</td><td>true</td>
<td>x5_1</td>
<td>100</td><td>aaa1</td><td>bbbb1</td><td>}</td><td>true</td>
<td>200</td><td>aaa2</td><td>bbbb2</td><td>}</td><td>false</td>
<td>}</td>
<td>x7_1</td>
<td>1</td><td>100</td><td>2</td><td>200</td><td>}</td>
<td>1234</td>
</tr>
</table>
</div>

## sep 介绍

流式格式中，对于包含多个数据的复合类型数据，有时候希望紧凑地在一个单元格内填写它的多个子数据，使用sep可以实现此目的。

由于sep非常常见，而且用法复杂多样，因此在单独的文档 [excel sep格式介绍](/manual/excelsep.md)中介绍

## 原生数据类型

支持 bool,int,float,string,vector2,vector3,vector4 等等类型，它们的填写跟常规认知一致。

|##var| x1 | x3 | x4 | x5 | x6  | x7   | s1    | v2    | v3   | v4     |
| -| -  |  -  | -  | -  | -   | -    | -     | -     | -    | -      |
|##type|bool|short|int|long|float|double|string       |vector2|vector3|vector4|
|##|desc1|id|desc4|desc5|desc6|desc7|desc1  |desc2|desc3|desc4|
|| false|  10| 100| 1000| 1.23| 1.2345|hello|1,2|1,2,3|1,2,3,4|
|| true |  20| 200| 1000| 1.23| 1.2345|world|1,2|1,2,3|1,2,3,4|

## text 类型

该类型数据包含两个字段, key和text， 其中 key 可以重复出现，但要求text完全相同，否则报错。这么设计是为了防止意外写重了key。**注意：不允许key为空而text不为空**

如果想填空的本地化字符串， key和text完全留空即可，工具会特殊对待，不会加入 key集合。

text的key和text字段都是string类型，因此在连续单元格或者sep产生的连续数据流模式中，同样要遵循用""来表达空白字符串的规则。

|##var|id|x|
|-|-|-|
|##type|int|text#sep=,|
|| 1| /demo/key1,aaaa|
||2|  /demo/key2,bbbb|
||3| | |

## datetime 类型

时间是常用的数据类型。Luban 特地提供了支持。  

- 以纯字符串方式填写，填写格式为 以下 4 种。
  - yyyy-mm-dd hh:mm:ss 如 1999-08-08 01:30:29
  - yyyy-mm-dd hh:mm 如 2000-08-07 07:40
  - yyyy-mm-dd hh 如 2001-09-05 07
  - yyyy-mm-dd 如 2003-04-05
- 以 excel内置的时间格式填写

|##var| id | x|
|-|-|-|
|##type|int| datetime|
|| 1|1999-09-09 01:02:03|
||2| 1999-09-09 01:02|
||3| 1999-09-09 01 |
||4| 1999-09-09|

## 可空变量

有时候会有一种变量，我们希望它 功能生效时填一个有效值，功能不生效里，用一个值来表示。 例如 int 类型，常常拿 0 或者-1 作无效值常量。 但有时候，0 或-1 也是有效值时，这种做法就不生效了。或者说 项目组内 有时候拿 0，有时候拿-1 作无效值标记，很不统一。我们借鉴 sql 及 c#,引入 可空值概念，用 null 表达空值。

|##var| id | x| color |
|-|-|-| - |
|##type|int| int?|QualityColor?|
|| 1| 1| A |
||2|  null|B|
||3| 2|null|

## 向量类型 vector2,vector3,vector4

vector3 有三个字段 float x, float y, float z, 适合用于表示坐标之类的数据。

|##var| id | x2|x3|x4|
|-|-|-| -| -|
|##type|int| vector2|vector3|vector4|
|| 1| 1,2|11,22,33|12,33,44,55|
||2|  2,3|22,44,55|6.5,4.7,8.9|

## 原生数据列表


<table border="1">
<tr align="center">
  <td>##var</td>
  <td>id</td>
  <td>arr1</td>
  <td colspan="4">arr2</td>
  <td>arr3</td>
  <td colspan="3">arr4</td>
</tr>
<tr align="center">
  <td>##type</td>
  <td>int</td>
  <td>(array#sep=;),int</td>
  <td colspan="4">list,int</td>
  <td>(list#sep=|),string</td>
  <td colspan="3">list,string</td>
</tr>
<tr align="center">
  <td>##</td>
  <td>id</td>
  <td>desc1</td>
  <td colspan="4">desc2</td>
  <td>desc3</td>
  <td colspan="3">desc4</td>
</tr>
<tr align="center">
<td/>
<td>1</td>
<td>1;2;3</td>
<td>1</td><td>2</td><td></td><td></td>
<td>xx|yy</td>
<td>xxx</td><td>zzz</td><td></td>
</tr>
<tr align="center">
<td/>
<td>2</td>
<td>2;4</td>
<td>3</td><td>4</td><td>5</td><td></td>
<td>aaaa|bbbb|cccc</td>
<td>aaa</td><td>bbb</td><td>ccc</td>
</tr>
<tr align="center">
<td/>
<td>3</td>
<td>2;4;6</td>
<td>3</td><td>4</td><td>5</td><td>6</td>
<td>aaaa|bbbb|cccc</td>
<td>aaa</td><td>bbb</td><td>ccc</td>
</tr>
</table>

## 枚举

以枚举名或者别名或者值的方式填写枚举值。

在xml中定义

```xml
<enum name="ItemQuality">
 <var name="WHITE" alias="白" value="0"/>
 <var name="GREEN" alias="绿" value="1"/>
 <var name="RED" alias="红" value="2"/>
</enum>
```

或者在 \_\_enums\_\_.xlsx 中 定义

<table border="1">
<tr align="center"><td>##var</td><td>full_name</td><td>flags</td><td>unique</td><td>comment</td><td>tags</td><td colspan="5">*items</td></tr>
<tr align="center"><td>##var</td><td></td><td></td><td></td><td></td><td></td><td>name</td><td>alias</td><td>value</td><td>comment</td><td>tags</td></tr>
<tr align="center"><td/><td>ItemQuality</td><td>false</td><td>true</td><td/><td/><td>WHITE</td><td>白</td><td>0</td><td/><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>GREEN</td><td>绿</td><td>1</td><td/><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>RED</td><td>红</td><td>2</td><td/><td/></tr>
</table>

数据表如下

|##var|id| quality| quality2 |
| -| - | - | - |
|##type|int|ItemQuality|ItemQuality|
| | 1| 白 | RED |
| | 2| GREEN | 红 |
| | 3| RED | WHITE |
| | 4| 1 | 0 |

## 嵌套子结构

经常会碰到，某个字段是结构，尤其这个结构在很多配置里都会复用。

假设任务中包含一个 奖励信息 字段

在xml中定义

```xml
<bean name="Reward">
 <var name="item_id" type="int"/>
 <var name="count" type="int"/>
 <var name="desc" type="string">
</bean>
```

或者在 \_\_beans\_\_.xlsx 里定义

<table border="1">
<tr align="center"><td>##var</td><td>full_name</td><td >sep</td><td>comment</td><td colspan="5">fields</td>  </tr>
<tr align="center"><td>##var</td><td></td><td/><td/><td>name</td><td>type</td><td>group</td><td>comment</td><td>tags</td></tr>
<tr><td></td><td>Reward</td><td/><td/><td>item_id</td><td>int</td><td></td><td>道具id</td><td/></tr>
<tr><td></td><td></td><td/><td/><td>count</td><td>int</td><td></td><td>个数</td><td/></tr>
<tr><td></td><td></td><td/><td/><td>desc</td><td>string</td><td></td><td>描述</td><td/></tr>
</table>

数据表如下

<table border="1">
<tr align="center">
<td>##var</td>
<td>id</td>
<td colspan="3">reward</td>
</tr>
<tr align="center">
<td>##type</td>
<td>int</td>
<td colspan="3">Reward</td>
</tr>
<tr align="center">
<td>##</td>
<td>id</td>
<td>道具id</td><td>个数</td><td>描述</td>
</tr>
<tr align="center">
<td/>
<td>1</td>
<td>1001</td><td>1</td><td>desc1</td>
</tr>
<tr align="center">
<td/>
<td>2</td>
<td>1002</td><td>100</td><td>desc2</td>
</tr>
</table>

## 简单结构列表

某个字段为结构列表的情形也很常见，比如说奖励信息列表包含多个奖励信息，每个奖励都有多个字段。

假设礼包中包含一个道具信息列表字段。支持3种填写模式，具体选择由策划灵活决定。

- 所有字段完全展开，每个单元格填一个元素。缺点是占用的列较多。如items1字段。
- 每个结构占据一个单元格，使用sep分割结构子字段。如items2字段。
- 整个列表占据一个单元格，使用sep分割列表及结构子字段。如items3字段。

xml中定义如下

```xml
<bean name="Reward">
 <var name="item_id" type="int"/>
 <var name="count" type="int"/>
 <var name="desc" type="string">
</bean>
```

或者也可以在\_\_beans\_\_.xlsx中定义，此处不再赘述，==**后面的涉及到结构定义的例子都只给xml的示例**==。

数据表如下：

<div class="Excel">
<table border="1">
<tr align="center">
<td>##var</td>
<td>id</td>
<td colspan="6">rewards1</td>
<td colspan="3">rewards2</td>
<td>rewards3</td>
</tr>
<tr align="center">
<td>##type</td>
<td>int</td>
<td colspan="6">list,Reward</td>
<td colspan="3">list,Reward#sep=,</td>
<td>(list#sep=|),Reward#sep=,</td>
</tr>
<tr align="center">
<td>##</td>
<td>id</td>
<td colspan="6">reward list desc1</td>
<td colspan="3">reward list desc2</td>
<td>reward list desc3</td>
</tr>
<tr align="center">
<td/>
<td>1</td>
<td>1001</td><td>1</td><td>desc1</td><td>1002</td><td>2</td><td>desc2</td>
<td>1001,1,desc1</td><td>1002,2,desc2</td><td>1003,3,desc3</td>
<td>1001,1,desc1|1002,2,desc2</td>
</tr>
<tr align="center">
<td/>
<td>2</td>
<td>1001</td><td>1</td><td>desc1</td><td></td><td></td><td></td>
<td>1001,1,desc1</td><td>1002,2,desc2</td><td></td>
<td>1001,1,desc1|1002,2,desc2|1003,1,desc3</td>
</tr>
</table>
</div>

或者可以用多级标题头对每个元素单独限定

<table border="1">
<tr align="center">
  <td>##var</td>
  <td>id</td>
  <td>name</td>
  <td colspan="9">rewards</td>
</tr>
<tr align="center">
  <td>##type</td>
  <td>int</td>
  <td>string</td>
  <td colspan="9">list,Reward</td>
</tr>
<tr align="center">
  <td>##var</td>
  <td></td>
  <td></td>
  <td colspan="3">0</td>
  <td colspan="3">1</td>
  <td colspan="3">2</td>
</tr>
<tr align="center">
  <td>##var</td>
  <td/>
  <td/>
  <td>item_id</td><td>num</td><td>desc</td>
  <td>item_id</td><td>num</td><td>desc</td>
  <td>item_id</td><td>num</td><td>desc</td>
</tr>
<tr align="center"><td/><td>1</td><td>task1</td><td>1</td><td>10</td><td>desc1</td><td>2</td><td>12</td><td>desc2</td><td>3</td><td>13</td><td>desc3</td></tr>
<tr align="center"><td/><td>2</td><td>task1</td><td>3</td><td>30</td><td>desc3</td><td>4</td><td>40</td><td>desc4</td><td/><td/><td/></tr>
<tr align="center"><td/><td>3</td><td>task1</td><td>5</td><td>50</td><td>desc5</td><td/><td/><td/><td/><td/><td/></tr>
</table>

## 多行结构列表

有时候列表结构的每个结构字段较多，如果水平展开则占据太多列，不方便编辑，如果拆表，无论程序还是策划都不方便，此时可以使用多行模式。支持任意层次的多行结构列表（也即多行结构中的每个元素也可以是多行）， name#multi_rows=1或者*name 都可以表达一个多行解析的字段。

假设每个任务包含多个阶段，有一个阶段列表字段。

```xml
<bean name="Stage">
 <var name="id" type="int"/>
 <var name="name" type="string"/>
 <var name="desc" type="string"/>
 <var name="location" type="vector3"/>
 <var name="reward_item_id" type="int"/>
 <var name="reward_item_count" type="int"/>
</bean>
```

<table border="1">
<tr align="center">
<td>##var</td>
<td>id</td>
<td>name</td>
<td colspan="6">*stage2</td>
</tr>
<tr align="center">
<td>##type</td>
<td>int</td>
<td>string</td>
<td colspan="6">list,Stage</td>
</tr>
<tr align="center">
<td>##</td>
<td>id</td>
<td>desc</td>
<td colspan="6">stage info</td>
</tr>
<tr align="center">
<td/>
<td>1</td>
<td>task1</td>
<td>1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/>
<td/><td/><td>2</td><td>stage2</td><td>stage desc2</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>3</td><td>stage3</td><td>stage desc3</td><td>1,2,3</td><td>1002</td><td>1</td>
</tr>
<tr align="center">
<td/>
<td>2</td>
<td>task2</td>
<td>1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>2</td><td>stage2</td><td>stage desc2</td><td>1,2,3</td><td>1002</td><td>1</td>
</tr>
</table>

## 列表表 （无主键）

有时候只想得到一个记录列表，无主键。mode="list"并且index为空，表示无主键表。

定义表

```xml
<table name="TbNotKeyList" value="NotKeyList" mode="list" input="not_key_list.xlsx"/>
```

示例数据表

|##var|x|y|z| num|
|-|-|-|-|-|
|##type|int|long|string|int|
||1|1|aaa|123|
||1|1|bbb|124|
||1|2|aaa|134|
||2|1|aaa|124|
||5|6|xxx|898|

## 多主键表（联合索引）

多个key构成联合唯一主键。使用"+"分割key，表示联合关系。

定义表

```xml
<table name="TbUnionMultiKey" value="UnionMultiKey" index="key1+key2+key3" input="union_multi_key.xlsx"/>
```

示例数据表

|##var|key1|key2|key3| num|
|-|-|-|-|-|
|##type|int|long|string|int|
||1|1|aaa|123|
||1|1|bbb|124|
||1|2|aaa|134|
||2|1|aaa|124|
||5|6|xxx|898|

## 多主键表（独立索引）

多个key，各自独立唯一索引。与联合索引写法区别在于使用 ","来划分key，表示独立关系。

定义表

```xml
<table name="TbMultiKey" value="MultiKey" index="key1,key2,key3" input="multi_key.xlsx"/>
```

示例数据表

|##var|key1|key2|key3| num|
|-|-|-|-|-|
|##type|int|long|string|int|
||1|2|aaa|123|
||2|4|bbb|124|
||3|6|ccc|134|
||4|8|ddd|124|
||5|1|eee|898|

## 单例表

有一些配置全局只有一份，比如 公会模块的开启等级，背包初始大小，背包上限。此时使用单例表来配置这些数据比较合适。

|##var| guld_open_level | bag_init_capacity | bag_max_capacity | newbie_tasks |
| - |- | - | - | - |
| ##type | int | int | int | list,int|
| ## |desc1 | desc 2 | desc 3 | desc 4 |
| | 10 | 100| 500| 10001,10002 |

## 纵表

大多数表都是横表，即一行一个记录。有些表，比如单例表，如果纵着填，一行一个字段，会比较舒服。A1为##column表示使用纵表模式。 上面的单例表，以纵表模式填如下。

<table border="1">
<tr align="center">
<td>##var#column</td>
<td>##type</td>
<td>##</td>
<td></td>
</tr>
<tr align="center">
<td>guild_open_level</td><td>int</td><td>desc1</td><td>10</td>
</tr>
<tr align="center">
<td>bag_init_capacity</td><td>int</td><td>desc2</td><td>100</td>
</tr>
<tr align="center">
<td>bag_max_capacity</td><td>int</td><td>desc3</td><td>500</td>
</tr>
<tr align="center">
<td>newbie_tasks</td><td>(list#sep=,),int</td><td>desc4</td><td>10001,10002</td>
</tr>
</table>

## 引用检查

游戏配置中经常要填写诸如道具id之类的外键数据，这些数据必须是合法的id值，luban支持生成时检查id的合法性，如果有误，则打出警告。不只是表顶层字段，列表及嵌套结构的子字段也支持完整的引用检查。

```xml
<bean name="Reward">
 <var name="item_id" type="int" ref="item.TbItem"/>
 <var name="count" type="int"/>
 <var name="desc" type="string">
</bean>
```

<table border="1" >
<tr align="center">
  <td>##var</td>
  <td>id</td>
  <td >item_id</td>
  <td>items</td>
  <td colspan="3">reward</td>
  <td colspan="3">rewards</td>
</tr>
<tr align="center">
  <td>##type</td>
  <td>int</td>
  <td>int#ref=item.TbItem</td>
  <td>list,int#ref=item.TbItem</td>
  <td colspan="3">Reward</td>
  <td colspan="3">list,Reward#sep=,</td>
</tr>
<tr align="center">
  <td>##</td>
  <td>id</td>
  <td>desc1</td>
  <td>desc2</td>
  <td colspan="3">desc3</td>
  <td colspan="3">desc4</td>
</tr>
<tr align="center">
  <td/>
  <td>1</td>
  <td>1001</td>
  <td>1001,1002</td>
  <td>1001</td><td>10</td><td>item1</td>
  <td>1001,10,item1</td><td>1002,2,item2</td><td/>
</tr>
<tr align="center">
  <td/>
  <td>2</td>
  <td>1002</td>
  <td>1003,1004,1005</td>
  <td>1002</td><td>10</td><td>item2</td>
  <td>1004,10,item4</td><td>1005,2,item5</td><td>1010,1,item10</td>
</tr>
</table>

## 资源检查

配置中经常要填写资源路径，比如道具icon的资源，这些数据都是string类型，非常容易填写出错，导致运行时无法正常显示。luban支持unity与ue4资源的合法性检查以及通用型文件路径检查。不只是表顶层字段，列表及嵌套结构的子字段也支持完整的引用检查。

对于这些字段添加属性 path=unity或者path=ue或path=normal;xxxx。

|##var| id | icon |
| - | - | - |
| ##type| int | string#path=unity|
| ##|id | icon desc |
| | 1| Assets/UI/item1.jpg|
| | 2| Assets/UI/item2.jpg|

## 分组导出

灵活的分组定义，不仅仅是client和server分组。支持以下分组粒度：

- 表级别分组
- 字段级别分组(任意bean字段粒度，而不仅限于顶层字段)

## 数据标签过滤

开发期经常会制作一些仅供开发使用的配置，比如测试道具，比如自动化测试使用的配置，希望在正式发布时不导出这些数据。

|##var| id | name |  |
| - | - | - | - |
| ##type | int | string |  |
| ## | id | desc1| 注释 |
| | 1 | item1 | 永远导出 |
|##| 2 | item2 | 永远不导出 |
|test| 4 | item4 | --export_exclude_tags test 时不导出 |
|TEST| 5 | item5 | --export_exclude_tags test 时不导出 |
|dev |6 | item6 | --export_exclude_tags dev 时不导出 |
| | 7|item7| 永远导出 |

## 多行记录填写

目前只对容器类型字段支持多行。字段名前加*,如*stages,或者添加multi_rows=1参数也行，如stages#multi_rows=1。
一旦标记字段为多行，每行会作为字段的一个元素读入，例如 list,bean类型，则每行读入一个bean结构。

多行可以嵌套，即多行字段中，某个字段本身也可以是多行记录。 示例可参见[multi_rows_record](https://github.com/focus-creative-games/luban_examples/blob/main/DesignerConfigs/Datas/test/multi_rows_record.xlsx)

```xml
<bean name="Stage">
 <var name="id" type="int"/>
 <var name="name" type="string"/>
 <var name="desc" type="string"/>
 <var name="location" type="vector3"/>
 <var name="reward_item_id" type="int"/>
 <var name="reward_item_count" type="int"/>
</bean>
```

<table border="1">
<tr align="center">
<td>##var</td>
<td>id</td>
<td>name</td>
<td colspan="6">*stages</td>
</tr>
<tr align="center">
<td>##type</td>
<td>int</td>
<td>string</td>
<td colspan="6">list,Stage</td>
</tr>
<tr align="center">
<td>##</td>
<td>id</td>
<td>desc</td>
<td colspan="6">stage info</td>
</tr>
<tr align="center">
<td/>
<td>1</td>
<td>task1</td>
<td>1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/>
<td/><td/><td>2</td><td>stage2</td><td>stage desc2</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>3</td><td>stage3</td><td>stage desc3</td><td>1,2,3</td><td>1002</td><td>1</td>
</tr>
<tr align="center">
<td/>
<td>2</td>
<td>task2</td>
<td>1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>2</td><td>stage2</td><td>stage desc2</td><td>1,2,3</td><td>1002</td><td>1</td>
</tr>
</table>

## 层级标题头 (hierarchy title)

在多行数据或者深层次嵌套的数据中，如果数据字段较多，填写时不易区分子元素。luban提供层级标题实现深层次的子字段对应。以上面的多行数据列表为例,第一列为##var表示这是个子字段行。

- 普通bean结构的子标题

<table border="1">
<tr align="center">
  <td>##var</td>
  <td>id</td>
  <td>name</td>
  <td colspan="5">stage</td>
</tr>
<tr align="center">
  <td>##type</td>
  <td>int</td>
  <td>string</td>
  <td colspan="5">Stage</td>
</tr>
<tr align="center">
  <td>##var</td>
  <td/>
  <td/>
  <td>name</td>
  <td>desc</td>
  <td>location</td>
  <td>item_id</td>
  <td>num</td>
</tr>
<tr align="center">
  <td>##</td>
  <td>id</td>
  <td>name</td>
  <td>desc2</td>
  <td>desc3</td>
  <td>desc4</td>
  <td>desc5</td>
  <td>desc6</td>
</tr>
<tr align="center">
<td/>
<td>1</td><td>task1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/>
<td>2</td><td>task2</td><td>stage2</td><td>stage desc2</td><td>3,4,5</td><td>2001</td><td>3</td>
</tr>
</table>

- list,bean 的多行展开多级子标题

<table border="1">
<tr align="center">
  <td>##var</td>
  <td>id</td>
  <td>name</td>
  <td colspan="6">*stages</td>
</tr>
<tr align="center">
  <td>##type</td>
  <td>int</td>
  <td>string</td>
  <td colspan="6">list,Stage</td>
</tr>
<tr align="center">
  <td>##var</td>
  <td/>
  <td/>
  <td>id</td>
  <td>name</td>
  <td>desc</td>
  <td>location</td>
  <td>item_id</td>
  <td>num</td>
</tr>
<tr align="center">
  <td>##</td>
  <td>id</td>
  <td>desc1</td>
  <td>desc1</td>
  <td>desc2</td>
  <td>desc3</td>
  <td>desc4</td>
  <td>desc5</td>
  <td>desc6</td>
</tr>
<tr align="center">
<td/>
<td>1</td>
<td>task1</td>
<td>1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>2</td><td>stage2</td><td>stage desc2</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>3</td><td>stage3</td><td>stage desc3</td><td>1,2,3</td><td>1002</td><td>1</td>
</tr>
<tr align="center">
<td/><td>2</td>
<td>task2</td>
<td>1</td><td>stage1</td><td>stage desc1</td><td>1,2,3</td><td>1001</td><td>1</td>
</tr>
<tr align="center">
<td/><td/><td/><td>2</td><td>stage2</td><td>stage desc2</td><td>1,2,3</td><td>1002</td><td>1</td>
</tr>
</table>

- list,bean 的水平展开多级子标题

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td>name</td><td colspan="9">items</td></tr>
<tr align="center"><td>##type</td><td>int</td><td>string</td><td colspan="9">list,Item</td></tr>
<tr align="center">
  <td>##var</td>
  <td></td>
  <td></td>
  <td colspan="3">0</td>
  <td colspan="3">1</td>
  <td colspan="3">2</td>
</tr>
<tr align="center">
  <td>##var</td>
  <td/>
  <td/>
  <td>item_id</td><td>num</td><td>desc</td>
  <td>item_id</td><td>num</td><td>desc</td>
  <td>item_id</td><td>num</td><td>desc</td>
</tr>
<tr align="center"><td/><td>1</td><td>task1</td><td>1</td><td>10</td><td>desc1</td><td>2</td><td>12</td><td>desc2</td><td>3</td><td>13</td><td>desc3</td></tr>
<tr align="center"><td/><td>2</td><td>task1</td><td>3</td><td>30</td><td>desc3</td><td>4</td><td>40</td><td>desc4</td><td/><td/><td/></tr>
<tr align="center"><td/><td>3</td><td>task1</td><td>5</td><td>50</td><td>desc5</td><td/><td/><td/><td/><td/><td/></tr>
</table>

- map 类型的多级子标题

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="4">lans</td></tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="4">map,string,string</td></tr>
<tr align="center"><td>##var</td><td/><td>ch-zn</td><td>en</td><td>jp</td><td>fr</td></tr>
<tr align="center"><td/><td>1</td><td>苹果</td><td>apple</td><td>aaa</td><td>aaa</td></tr>
<tr align="center"><td/><td>2</td><td>香蕉</td><td>banana</td><td>bbb</td><td>bbb</td></tr>
</table>

## 多态结构

示例定义如下

```xml
<bean name="Shape">
 <bean name="Circle">
  <var name="radius" type="float"/>
 </bean>
 <bean name="Rectangle" alias="长方形">
  <var name="width" type="float"/>
  <var name="height" type="float"/>
 </bean>
 <bean name="Curve">
  <bean name="Line" alias="直线">
   <var name="param_a" type="float"/>
   <var name="param_b" type="float"/>
  </bean>
  <bean name="Parabola" alias="抛物线">
   <var name="param_a" type="float"/>
   <var name="param_b" type="float"/>
  </bean>
 </bean>
</bean>

```

<table border="1">
<tr align="center">
  <td>##var</td>
  <td>id</td>
  <td colspan="4">shapes</td>
</tr>
<tr align="center">
  <td>##type</td>
  <td>int</td>
  <td colspan="4">list,Shape#sep=,</td>
</tr>
<tr align="center">
  <td>##</td>
  <td>id</td>
  <td colspan="4"> shape desc</td>
</tr>
<tr align="center">
  <td/>
  <td>1</td>
  <td>Circle,10</td>
  <td>Rectangle,100,200</td>
  <td/>
  <td/>
</tr>
<tr align="center">
  <td/>
  <td>2</td>
  <td>Circle,20</td>
  <td>Rectangle,100,200</td>
  <td>Line,5,8</td>
  <td>Parabola,15,30</td>
</tr>
</table>

## 字段默认值

我们希望excel中单元格留空时，该字段取指定值，而不是默认的false,0之类。通过定义字段的default=xxx属性来指定默认值。

如示例，id=2的记录，x1与x2皆为空，x1=0,x2=-1。

|##var|id | x1 | x2#default=-1|
| - | - | - | - |
|##type| int | int | int |
|##|id|desc1|desc2|
||1 | 10 |20|
||2| | |
||3| | 30|

## 常量别名

游戏里经常会出现一些常用的类似枚举的值，比如说 升级丹的 id,在很多地方都要填，如果直接它的道具 id,既不直观，也容易出错。 Luban 支持常量替换。如示例，导出时SHENG_JI_DAN会被替换为11220304。

``` xml
<enum name="EFunctionItemId">
 <var name="SHENG_JI_DAN" alias="升级丹" value="11220304"/>
 <var name="JIN_JIE_DAN" alias="进阶丹" value="11220506"/>
</enum>
```

|##var|id| item_id |
|-| - | - |
|##type|int| int#convert=EFunctionItemId|
|##|id| desc|
||1 | SHENG_JI_DAN|
||2| 进阶丹|
||3| 1001|

## 单元格取非0默认值

只对excel格式有效。在字段名上加上 xxx#default=value，则所有留空的单元格都会自动取value。如下图，id=2的记录，count=10,desc=haha。 default是excel格式特有属性，它作用于列，必须填在**字段名**上。

|##var|id|count#default=10 |desc#default=haha|
|-|-|-| - |
|##type|int|int|string|
|| 1|1|abc|
||2|||
