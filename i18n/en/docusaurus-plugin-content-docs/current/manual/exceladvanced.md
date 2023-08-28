# excel format (advanced)

## The structure used in the example

Following is the bean type definition to be used in the example.

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

## sep segmentation mechanism

We call a data structure that contains multiple atomic data elements a composite structure. For composite structures, if each atomic data occupies a cell, there may be too many columns to read.
Using the sep segmentation mechanism can achieve the purpose of filling complex data in a cell.

The writing method is `sep=<char1><char2><char3>...`. sep can be one character, or multiple characters. When sep is multiple characters, it means that any one of them is a separator, instead of treating multiple characters as a whole as a separator.

sep can appear in the following locations:

- on the field name in excel. Such as `x#sep=,`
- On the tag of the bean, such as `<bean name="Item" tag="sep=,">`
- On the tag of the type field of the field, such as `type="Vec#sep=,"`, `type="(list#sep=|),int"`, `type="list,(Vec#sep= ,)"`, `type="(list#sep=|),(Vec#sep=,)"`

When it appears on the excel field name, the sep will be used to automatically split each cell in the column range of the field name to form a data flow, and then use the streaming format (described in the next section) to read the data sequentially.

When it appears on the tag of the bean, it means that all the places where the bean is read provide the data of the entire bean in the form of a string, which is split by a separator and read in a stream

When it appears on the type tag, the next read data will be regarded as the overall data corresponding to the type, and then the data will be split using sep, and then the data corresponding to the type will be read in streaming format.

When the type is a container, the sep attribute can be applied to itself (such as list) or to the element type. If the sep attribute is applied to itself, it means that the next read-in string is regarded as the data of the entire container, and at the same time, sep is used to split the string, and then the contents of the container are sequentially read in a streaming format. If the sep attribute is applied to the element type, each read-in content is regarded as the data of an element, and then sep is used to split the data, and the data corresponding to the element type is read in a streaming format, and this operation is repeated until there is no more data or until the container terminator `}` is encountered.


For example, use sep to read beans and nested beans.

![sep_bean](/img/cases/sep_bean.jpg)

Example, using sep to read a normal container.

![sep_bean](/img/cases/sep_container1.jpg)

Example, reading a struct container using sep.

![sep_bean](/img/cases/sep_container2.jpg)

## Multi-level title header

Sometimes, some fields are composite structures, such as beans or structure lists. When filling in sequentially, blank cells will be automatically skipped in the streaming format, which makes it easy to make mistakes in practice. In addition, the streaming format does not support blank cells to represent default values, and cannot intuitively limit a subfield to a certain store, which brings some inconvenience.
Multi-level headers can be used to qualify bean or container subfields, improving readability and avoiding unexpected errors in streaming formats.

By adding a new line `##var` under a `##var` line to add a subfield name, you can set the header for the subfield. There can be any level of subtitle headers.
In the figure below, x1 has only 1 level of subheadings, y1 has 2 levels, y2 has only 1 level, and z1 has 3 levels.

![colloumlimit](/img/cases/multileveltitle.jpg)

## Limit column format

Through the header row and multi-level header row, you can precisely limit a certain data to certain column ranges.

For simple type data with only one atomic value, in the limited column format, since it is very clear that its value must come from a certain cell, it supports **default value** semantics, that is, if the cell is empty, the value takes The default value, for example, the default value of int type is 0, and the default value of int? is null.

In the restricted column format, the polymorphic bean type needs to use the $type column to specify the specific type name, and the nullable bean type also needs to use the $type column to indicate whether it is a valid bean or an empty bean.

If the type of the restricted column at the lowest level is container or bean, since the restricted column only limits the overall range of the data, but **does not limit** the scope of sub-data, the format for reading sub-data is **streaming format* *, that is, each sub-data is read in order.

![titlelimit](/img/cases/titlelimit.jpg)


### `flags=1` enum type supports column-qualified mode.

Use the enumeration item as the column name, and the final value is the **or value** of all non-zero or empty enumeration items.

![title_enum](/img/cases/title_enum.jpg)


### Polymorphic beans support $type and $value respectively configured column-limited or mixed filling methods in streaming format

That is, use the $type column as the limited type, use the $value column to limit the actual fields of the bean, and fill in all the fields of the bean in $value in a streaming manner.

![title_dynamic_bean](/img/cases/title_dynamic_bean.jpg)

### The column qualification format of the map

The key can be used as the subfield name. If the corresponding unit is not empty, the key-value pair corresponding to key-value exists. For example, for the record with id=1 in the figure below, the final value of its y2 field is `{{"aaa", 1}, {"ccc":2}}`; for the record with id=2, its final value for the y2 field is `{{"bbb", 10}, {"ccc", 20}, {"ddd", 30}}`.

![title_map](/img/cases/title_map.jpg)

## Stream format introduction

If some data is non-atomic data (such as a bean or container), and it is limited to certain cell column ranges or part of sep-separated data, its parsing format is streaming format.

For subdata that does not specifically limit the column range, use the streaming format (and this is the only way) to read the subdata sequentially. Since the streaming format cannot distinguish between `default cells` and `blank cells`, the **default value** semantics are not supported in the streaming format, and all blank cells will be ignored. Furthermore, for the default value, a valid value must be filled in to represent the data, and it cannot be left blank to represent the data.

The default value filling rules in streaming format are as follows:

- bool default value is false
- default value is 0 for int, float etc.
- The default value of string is ""
- Nullable variables, such as int? The empty value is null
- Container variables, need to have a closing curly brace `}` to indicate a null value (because `}` is used to terminate container data reading)

Examples are as follows.

![stream](/img/cases/stream.jpg)

The two lines marked in red in the figure try to use blank cells to express the default values of bool and string. Since these cells or strings of length 0 separated by sep in the streaming format will be ignored, resulting in
Insufficient data parsing error.

The rules for reading data in streaming format are as follows:

- bool false, true
- Valid integer values such as int, float
- string uses "" to represent a string of length 0, and uses other non-values to represent the value itself
- enum non-empty valid value
- The bean reads each field sequentially in a streaming format
- Polymorphic bean type First read in a string, which can be a specific subclass name or subclass name, and then read in each field of the type according to the subclass name.
- The nullable bean type reads a string first, if it is the type name of the bean or '{}', the stream format reads all the fields of the type; if it is null, it means empty, and the reading ends; in other cases, Throws an exception that fails parsing.
- array, list, set If the stream ends or the next read is '}', then the reading ends, otherwise, element_type is read in stream format, and so on.
- map If the stream ends or the next read is '}', the read ends, otherwise key_type and value_type are recursively read, and so on.


## List of multi-line structures

Sometimes there are many fields in each structure of the list structure. If it is expanded horizontally, it will occupy too many columns, which is inconvenient to edit. If the table is dismantled, it will be inconvenient for both program and planning. At this time, you can use multi-line mode.

Mark the field name as `*<name>` to express that you want to read this data in multiple lines. Support multi-line structure lists of any level (that is, each element in a multi-line structure can also be multiple lines).
For structural container types such as `array, bean`, `list, bean`, you can also cooperate with the limited column format to limit the columns of each subfield in the element, as shown in field x2.

![map](/img/cases/multiline.jpg)



## Data label filtering

During the development period, some configurations are often made for development use only, such as test props, such as configurations used for automated testing. Developers hope not to export these data when they are officially released.
This can be achieved by adding a tag to the record and using the command line parameter --excludeTag. `##` is a special tag, indicating that this data is permanently annotated and will not be exported under any circumstances.
Please read [data tag](./tag) for detailed documentation.

As shown in the figure below, for records with id=3 and id=4, after adding the `--excludeTag dev` parameter to the command line, these two dev records will not be included in the export.


![tag](/img/cases/tag.jpg)
