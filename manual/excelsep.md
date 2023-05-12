# sep 介绍

流式格式中，对于包含多个数据的复合类型数据，有时候希望紧凑地在一个单元格或者一个字符串内填写它的多个子数据，使用sep可以实现此目的。

sep会拆分单元格和字符串，再流式入，sep可以包含多个字符，如 sep=",;"，此时会用每个字符来拆分读入的字符串。

## 分割 text

|##var|id|desc|
|-|-|-|
|##type|int|text#sep=@|
||1|key1@xxxxx|
||2|key2@yyyyy|

## 分割 简单列表

sep注解器 对于非容器类型，它作用于类型本身，对于容器类型，它既可以作用于容器，也可以作用于容器元素。

|##var|id|item_id_list|name_list|float_list|
|-|-|-|-|-|
|##type|int|(list#sep=,),int|(list#sep=,),string|(list#sep=,),float|
||1|1,2,3|abc,efg,def|1.5,2.5,3|
||2|4,5|eee,fff|1.2,2.2|

## 分割 bean (单单元格)

```xml
<bean name="Item">
    <var name="item_id" type="int"/>
    <var name="num" type="int"/>
    <var name="desc" type="string"/>
</bean>

<bean name="Shape">
    <bean name="Circle">
        <var name="radius" type="float"/>
    </bean>
    <bean name="Rectangle" alias="长方形">
        <var name="width" type="float"/>
        <var name="height" type="float"/>
    </bean>
</bean>

<bean name="ComplexBean1">
    <var name="x" type="int"/>
    <var name="y" type="Item#sep=,"/>
    <var name="z" type="int"/>
</bean>

<bean name="ComplexBean2">
    <var name="x" type="int"/>
    <var name="y" type="(list#sep=|),(Item#sep=,)"/>
    <var name="z" type="int"/>
</bean>

```

|##var|id|item|
|-|-|-|
|##type|int|Item#sep=,|
||1|1001,10,item1|

|##var|id|shape|
|-|-|-|
|##type|int|Shape#sep=,|
||1|Circle,10|
||2|长方形,5,8|

|##var|id|item|
|-|-|-|
|##type|int|ComplexBean1#sep=;|
||1|123;1002,1,item2;65|

|##var|id|item|
|-|-|-|
|##type|int|ComplexBean2#sep=;|
||1|111;1001,2,item1\|1002,1,item2;234|

### 分割bean (多单元格)

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">item</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">Item</td></tr>
<tr align="center"><td/><td>1</td><td>1001</td><td>1</td><td>item1</td></tr>
</table>

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">shape</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">Shape</td></tr>
<tr align="center"><td/><td>1</td><td>Circle</td><td>10</td><td></td></tr>
<tr align="center"><td/><td>1</td><td>Rectangle</td><td>10</td><td>20</td></tr>
</table>

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">x</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">ComplexBean1</td></tr>
<tr align="center"><td/><td>1</td><td>234</td><td>1001,1,item1</td><td>789</td></tr>
</table>

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">x</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">ComplexBean2</td></tr>
<tr align="center"><td/><td>1</td><td>234</td><td>1001,1,item1|1002,1,item2</td><td>789</td></tr>
</table>

### bean列表 (单单元格)

|##var|id|item|
|-|-|-|
|##type|int|(list#sep=%),Item#sep=,|
||1|1001,10,item1%1002,1,item2|

|##var|id|item|
|-|-|-|
|##type|int|(list#sep=%),ComplexBean1#sep=;|
||1|123;1002,1,item2;65%124;1002,1,item2;65|

|##var|id|item|
|-|-|-|
|##type|int|(list#sep=%),ComplexBean2#sep=;|
||1|123;1002,1,item2|1003,2,item3;65%124;1002,1,item2|1004,4,item4;65|

### bean列表 (多单元格)

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">item</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">list,Item#sep=,</td></tr>
<tr align="center"><td/><td>1</td><td>1001,1,item1</td><td>1002,1,item2</td><td></td></tr>
</table>

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">shape</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">list,Shape#sep=,</td></tr>
<tr align="center"><td/><td>1</td><td>Circle,10</td><td>Rectangle,15,18</td><td>Circle,20</td></tr>
</table>

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">x</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">list,ComplexBean1#sep=;</td></tr>
<tr align="center"><td/><td>1</td><td>222;1001,1,item1;789</td><td>333;1001,1,item1;789</td><td>444;1001,1,item1;789</td></tr>
</table>

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">x</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">list,ComplexBean2#sep=;</td></tr>
<tr align="center"><td/><td>1</td><td>111;1001,1,item1;1002,2,item2;};111</td><td>222;1001,1,item1;1002,2,item2;};111</td><td></td></tr>
</table>

<table border="1">
<tr align="center"><td>##var</td><td>id</td><td colspan="3">x</td> </tr>
<tr align="center"><td>##type</td><td>int</td><td colspan="3">list,ComplexBean3#sep=;</td></tr>
<tr align="center"><td/><td>1</td><td>333;1001,1,item1%1002,1,item2;444</td><td>333;1001,1,item1%1002,1,item2;444</td><td></td></tr>
</table>

### 支持默认sep的bean

有些类型，你希望所有用到它的地方都以约定的sep去分割读取，而不是每处都定义sep。

bean支持sep属性实现这个机制。

假设你需要一个日期类， 你期望所有用到的地方都按 yyyy-mm-dd的格式填写。示例如下：

```xml
<bean name="Date" sep="-">
    <var name="year" type="int"/>
    <var name="month" type="int#range=[1,12]"/>
    <var name="day" type="int#range=[1,31]"/>
</bean>
```

|##var|id|date|dates|
|-|-|-|-|
|##type|int|Date|(list#sep=$),Data|
||1|1999-9-9|2000-1-1$2020-2-2|
||2|2018-8-8|1990-2-3$1991-3-4$1992-4-5|
