# excel格式（高级）

## 示例中用到的结构

以下是示例中要用于的bean类型定义。

```xml
<bean name="Type1">
  <var name="a" type="int"/>
  <var name="b" type="string"/>
  <var name="c" type="bool"/>
</bean>

<bean name="Type2">
  <var name="a" type="int"/>
  <var name="b" type="bool"/>
  <var name="c" type="Type1"/>
</bean>

<bean name="Vec3" sep=",">
  <var name="x" type="float"/>
  <var name="y" type="float"/>
  <var name="z" type="float"/>
</bean>

<bean name="Type3">
  <var name="a" type="int"/>
  <var name="b" type="bool"/>
  <var name="c" type="Type1#sep=,"/>
</bean>

<bean name="Type4">
  <var name="a" type="string"/>
  <var name="c" type="Vec3"/>
</bean>

<bean name="Title0">
  <var name="a" type="int"/>
  <var name="b" type="bool"/>
  <var name="c" type="Title1"/>
</bean>

<bean name="Title1">
  <var name="a" type="int"/>
  <var name="b" type="string"/>
  <var name="c" type="Title2"/>
</bean>

<bean name="Title2">
  <var name="a" type="int"/>
  <var name="b" type="int"/>
</bean>
```

## sep分割机制

我们包含多个原子数据元素的数据结构称之为复合结构。对于复合结构，如果每个原子数据都占据一个单元格，则可能列数太多而不便阅读。
使用sep分割机制可以达到在一个单元格内填写复杂数据的目的。

写法为 `sep=<char1><char2><char3>...`。sep可以是一个字符，或者多个字符。当sep为多个字符时，表示其中任意一个都是分割符，
而不是将多个字符整体当作分割符。

sep可以出现在以下位置：

- 在excel的字段名上。如 `x#sep=,`
- bean的tag上，如`<bean name="Item" tag="sep=,">`
- 在field的type字段的tag上，如 `type="Vec#sep=,"`，`type="(list#sep=|),int"`、`type="list,(Vec#sep=,)"`、`type="(list#sep=|),(Vec#sep=,)"`

当出现在excel字段名上时，会用该sep自动拆分该字段名的列范围内的每个单元格，形成数据流，再使用流式格式（下面小节会介绍）依次读取这些数据。

当出现在bean的tag上时，表示所有读取该bean的地方，都以字符串形式提供整个bean的数据，用分割符拆分后流式读取

当出现在type的tag上时，会将下一个读到的数据，当作该type对应的整体数据，接着使用sep拆分这个数据，再用流式格式读取type对应的数据。

当type为容器时，在自身(如list)或者元素类型上都可以施加sep属性。如果在自身上施加sep属性，则表示将下一个读入的字符串当作整个容器的数据，
同时用sep去分割这个字符串，再用流式格式依次读取容器的内容。如果在元素类型上施加sep属性，则将每个读入的内容当作一个元素的数据，再用sep
去分割这个数据，以流式格式读取元素类型对应的数据，重复这个操作，直到没有数据或者遇到容器结束符`}`为止。


示例，使用sep读入bean及嵌套bean。

![sep_bean](/img/cases/sep_bean.jpg)

示例，使用sep读取普通容器。

![sep_bean](/img/cases/sep_container1.jpg)

示例，使用sep读取结构容器。

![sep_bean](/img/cases/sep_container2.jpg)

## 多级标题头

有时候，某些字段是复合结构，如bean或者结构列表之类的类型，按顺序填写时，由于流式格式中空白单元格会被自动跳过，
导致实践中容易写错。另外，流式格式不支持空白单元格表示默认值，也无法直观地限定某个子字段在某一铺，带来一些不便。
多级标题可以用于限定bean或容器的子字段，提高了可读性，避免流式格式的意外错误。

通过在某个`##var`行下新增一行`##var`，为添加子字段名，则可以为子字段设置标题头。可以有任意级别的子标题头。
下图中，x1只有1级子标题头，y1有2级，y2只有1级，z1有3级。

![colloumlimit](/img/cases/multileveltitle.jpg)

## 限定列格式

通过标题行及多级标题行，可以精确限定某个数据在某些列范围内。

对于只有一个原子值的简单类型数据，限定列格式下，由于能够非常清晰知道它的值必然来自某一单元格，所以它支持**默认值**语义，即如果单元格为空，值取默认值，例如 int类型默认值为0，int?默认值为null。

限定列格式下，多态bean类型需要用 $type 列来指定具体类型名，可空bean类型也需要用$type列来指示是有效bean还是空bean。

如果最低层的限定列的类型为容器或者bean，由于限定列只限定了该数据整体范围，但**未限定**子数据的范围，因此读取子数据的格式为**流式格式**，即按顺序读入每个子数据。

![titlelimit](/img/cases/titlelimit.jpg)


### `flags=1` 的 enum 类型支持列限定模式。

用枚举项作为列名，最终值为所有非0或空的枚举项的**或值**。

![titlle_enum](/img/cases/titlle_enum.jpg)


### 多态bean支持 $type与$value 分别配置的列限定或流式格式的混合填写方式

即用$type列为限定类型，用$value列来限定bean的实际字段，并且$value中以流式填写bean的所有字段。

![title_dynamic_bean](/img/cases/title_dynamic_bean.jpg)

### map的列限定格式

可以将key作为子字段名，如果对应的单元不为空，则对应key-value的键值对存在。例如下图中id=1的记录，
它的y2字段最终值为`{{"aaa", 1}, {"ccc":2}}`；id=2的记录，它的y2字段最终值为`{{"bbb", 10}, {"ccc", 20}, {"ddd", 30}}`。

![title_map](/img/cases/title_map.jpg)

## 流式格式介绍

如果某个数据是非原子数据（如bean或容器），并且它被限定到某些单元格列范围或者是sep分割的数据的一部分，则它的解析格式为流式格式。

对于没有具体限定列范围的子数据，使用流式格式（也只有这种办法），按顺序读入子数据。由于流式格式无法区分`默认单元格`和`空白单元格`，
因此流格式下，不支持**默认值**语义，会忽略所有空白单元格。进而对于默认值必须填上有效值默认值来表示数据，而不能留空来表达。

流式格式下的默认值填写规则如下:

- bool 默认值为 false
- int,float 之类的默认值为 0
- string 的默认值为""
- 可空变量，如int? 的空值为 null
- 容器变量，需要有右大括号 `}` 来表示空值（因为`}`用来终止容器数据读取）

示例如下。

![stream](/img/cases/stream.jpg)

图中标红两行，试图用空白单元格表达bool和string的默认值，由于流式格式下这些单元格或者sep分割出的长度为0的字符串会被忽略，导致出现
数据不足的解析错误。

流式格式的读取数据规则如下：

- bool  false,true
- int,float 之类  有效整数值
- string  用""表示长度为0的字符串，用其他非值表示值本身
- enum  非空有效值
- bean 用流式格式按顺序读入每个字段
- 多态bean类型 先读入一个字符串，可以是具体的子类名或者子类别名，然后再根据子类名，流式读入该类型的每个字段。
- 可空bean类型 先读入一个字符串，如果是bean的类型名或者'{}'，则流格式读入该类型的所有字段；如果为null，则表示空，结束读取；其他情况则抛出解析失败的异常。
- array,list,set 如果流结束或者下一个读入的为'}'，则读取结束，否则用流格式读入element_type，如此循环。
- map 如果流结束或者下一个读入的为'}'，则读取结束，否则递归读入key_type和value_type，如此循环。


## 多行结构列表

有时候列表结构的每个结构字段较多，如果水平展开则占据太多列，不方便编辑，如果拆表，无论程序还是策划都不方便，此时可以使用多行模式。

将字段名标记为`*<name>`即可表达要将这个数据多行读入。支持任意层次的多行结构列表（也即多行结构中的每个元素也可以是多行）。
对于`array,bean`、`list,bean`这样的结构容器类型，还可以配合限定列格式，限定元素中每个子字段的列，如字段x2所示。

![map](/img/cases/multiline.jpg)



## 数据标签过滤

开发期经常会制作一些仅供开发使用的配置，比如测试道具，比如自动化测试使用的配置，开发者希望在正式发布时不导出这些数据。
可以通过给记录加上tag，再配合命令行参数 --excludeTag实现这个目的 。`##`是一个特殊的tag，表示这个数据被永久注释，任何情况下都不会被导出。
详细文档请阅读 [数据 tag](./tag)。

如下图，id=3和id=4的记录，在命令行添加 `--excludeTag dev` 参数后，导出时不会包含这两个dev记录。


![tag](/img/cases/tag.jpg)

