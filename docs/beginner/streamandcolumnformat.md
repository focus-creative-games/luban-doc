# 使用列限定与紧凑格式

像结构与容器都是包含多个元素的数据类型，Luban提供了多种方式（**不限于以下这几种**）读取这种复合数据类型：

- 限定列格式，多个单元格，显式指定每个字段所占的列，然后读取
- 流式格式（紧凑格式），多个单元格，按顺序读取
- 流式格式（紧凑格式），一个单元格，使用分割符分割后按顺序读取
- lite格式（紧凑格式），一个单元格
- json格式（紧凑格式），一个单元格
- 多行读取。此方式只对容器类型有效。 读取元素时可以使用以上三种方式读取

详细数据文档见[Excel格式（高级）](../manual/exceladvanced)。

## 预备工作

假设Item结构包含两个字段： `int item_id`和`int count`。

## 限定列格式，多个单元格，显式指定每个字段所占的列，然后读取

通过新增子标题头行来为结构指定子字段的列。子标题头行第一列必须是'##var'。

![item](/img/use_column.jpg)

:::tip

限定列格式可以有多层*：即如果结构的某个子字段也是结构，仍然可以新增一行子标题头行，为子字段的子字段指定列。

:::

## 流式格式，多个单元格，按顺序读取

流式格式有个特点：它按顺序读取复合数据的每个元素（字段）。由于它无法限定每个字段的范围，它会跳过读到的所有空白单元格。
当字段不多时，这个并不是问题，可当字段变多时，很容易因为漏填了一个字段导致后续字段读取错误。

如以下item字段的填法，无论是在开始、中间、最后插入一个空单元格，都不影响数据读取。

![item](/img/use_stream1.jpg)

## 流式格式，一个单元格，使用分割符分割后按顺序读取

使用sep分割后，将每个数据当作一个单元格，它的填法与第一种方法相同。

![item](/img/use_stream2.jpg)

## lite格式

在标题头字段添加`#format=lite`表示使用lite格式。lite格式是luban独有的数据格式，适合复杂的嵌套数据结构。
它的配置数据中不含字段名，因此比json和lua格式更简洁。详细文档见[lite格式](../manual/otherdatasource#lite格式)。

![Item](/img/use_lite.jpg)

## json格式

在标题头字段添加`#format=json`表示使用json格式。详细文档见[json格式](../manual/otherdatasource#json格式)。

![Item](/img/use_json.jpg)

## lua格式

在标题头字段添加`#format=lua`表示使用lua格式。详细文档见[lua格式](../manual/otherdatasource#lua格式)。

![Item](/img/use_lua.jpg)

## 多行读取

只有容器类型才能使用多行读取方式。在字段名前加'*'，表示此字段以多行方式读取。在读取每行数据时，既支持流式格式，也支持列限定格式。

![item](/img/use_rows.jpg)
