# Excel Format (Primary)

## Basic rules

### Supported excel file families

Support xls, xlsx, xlm, xlmx, csv. Basically, anything that can be opened by excel can be read.


### excel file read rules

- If no sheet is specified, all sheets will be read by default
- You can use sheet@xxx.xlsx to specify to read only this sheet data
- If the A1 cell data does not start with ##, it will be treated as a non-data sheet and ignored

### Read csv files with encodings other than GKB and UTF8

Luban will intelligently guess its encoding and handle it correctly.

### Flexible file organization

- You can put several tables into one xlsx, and each table occupies a sheet. You only need to specify this unit as the input of each table, such as `xxx@item/test/abs.xlsx`
- A table can be split into several xlsx. Such as `item/a.xlsx,bag/b.xlsx,c.xlsx`
- Can read all xlsx in a directory one by one. Such as `xlsx_files`.

## Header row format

A typical configuration table example:

![excel](/img/cases/simple1.jpg)

- The cell in the first column is `##var`, indicating that this line is a field definition line
- The cell in the first column is `##type`, indicating that this row is a type definition row
- The cell in the first column is `##group`, which means that this row is an export group row. **This line is optional**. In addition, leaving the cell blank means exporting for all groups.
- The cell in column 1 starts with ##** to indicate that this is a comment line. If there are multiple ## lines, the first line is used as the comment of the field in the code by default. You can explicitly specify it through ##comment A certain behavior code comment line.
- When filling in the multi-level field name line, use ##var to indicate that this is a secondary field line
- You can adjust the order of the lines starting with `##<name>` at will. For example, the `##var` line and the `##group` line are swapped in order without affecting the final result at all.


## comment line or column

When the title line field name is empty or starts with '#', this column will be ignored as a comment column. When the first column of a data line begins with ##, this line will be treated as a comment line and ignored.

![excel](/img/cases/ignorefield.jpg)


In the above example, columns D and E are commented and ignored, and line 7 is also commented and will not be exported because it starts with ##.

## Basic data format

As shown in the figure below, the data filling method is basically consistent with common sense.

![primitive_type](/img/cases/primitive_type.jpg)

Special Instructions:

- bool: `true, false, 0, 1, yes, no` are all valid values. In addition, case is not sensitive, such as True is also a legal bool value. If you fill in other values such as abc and 4, a parsing error will occur
- string: If the cell is left blank, it is a string of length 0. However, when reading the stream format, blank cells will also be ignored as useless cells. In this case, `""` can be used to represent a string with a length of 0. string does not handle escaping by default,
   If you want to replace `\n` in the string with a newline, you need to add the `escape=1` tag, such as `string#escape=1`.
- datetime supports the following formats
   - built-in date format in excel
   - yyyy-mm-dd hh:mm:ss string format
   - yyyy-mm-dd hh:mm string format. At this time, the second automatically takes 0
   - yyyy-mm-dd hh string format. The minute and second take 0
   - yyyy-mm-dd string format. At this time, the hour, minute and second are all 0

**Basic data formats other than datetime can be left blank**, and the default value is automatically taken, as shown in line 10.

## enum data format

You can fill in the variable name, alias or corresponding integer of the enumeration item. If it is an enumeration of flags type, you can also fill in an or form enumeration like 'A|B'. The flags type enum also supports the column limitation mode, so that each enumeration value occupies a column, and then the included flag bit column is marked as 1, indicating that the final enumeration value contains this item.

![enum](/img/cases/enum.jpg)

If there is an enumeration item with a value of 0 in the enum, it can be left blank, and the enumeration item is automatically taken, otherwise a parsing error will occur.

## bean data format

Assume that Item is a bean containing three fields `int id; int count; string desc`, and the item field type is Item. Merge C1-E1 into one cell as the item field range. Within the column range of the item field, fill in each field of the Item structure in order. As shown below.

![bean](/img/cases/bean.jpg)


If the bean field is a polymorphic type, you must first fill in the polymorphic type name, and then fill in the fields of the polymorphic type in sequence. The polymorphic type name can be filled with bean alias. As shown below.

![bean](/img/cases/bean2.jpg)

## container type

With the bean type, you can fill in the data in the range by merging cells as the column range of the field. **Blank** cells are ignored.


![collection](/img/cases/collection.jpg)

The map takes key and value as key-value pairs, and fills them in order.

## Nullable types

All types except containers can be nullable. All nullable types can use null to express the empty value.

- For an atomic data type (such as int) that contains only one data, leaving a cell blank also expresses null
- For string? type, the cell is left blank to express null instead of a string of length 0. If you want to express a blank string please use `""`
- For the nullable type of non-polymorphic bean type, if it is non-null, it needs to start with `{}` to indicate non-null, and then fill in the value of the bean in sequence
- For polymorphic beans, the filling method remains the same

![nullable](/img/cases/nullable.jpg)

## no primary key table

Sometimes just want to get a list of records, no primary key. mode="list" and index is empty, indicating no primary key table.

definition table

```xml
<table name="TbNotKeyList" value="NotKeyList" mode="list" input="not_key_list.xlsx"/>
```

![table_list_not_key](/img/cases/table_list_not_key.jpg)

## Multi-primary key table (joint index)

Multiple keys form a joint unique primary key. Use "+" to split the key, indicating a joint relationship.

definition table

```xml
<table name="TbUnionMultiKey" value="UnionMultiKey" index="key1+key2+key3" input="union_multi_key.xlsx"/>
```

![table_list_union_key](/img/cases/table_list_union_key.jpg)

## Multi-primary key table (independent index)

Multiple keys, each independent and unique index. The difference from the joint index writing method is that "," is used to divide the key, indicating an independent relationship.

definition table

```xml
<table name="TbMultiKey" value="MultiKey" index="key1,key2,key3" input="multi_key.xlsx"/>
```

![table_list_indep_key](/img/cases/table_list_indep_key.jpg)

## Singleton table

Some configurations have only one copy globally, such as the opening level of the guild module, the initial size of the backpack, and the upper limit of the backpack. At this time, it is more appropriate to use a singleton table to configure these data.

![singleton](/img/cases/singleton2.jpg)

## vertical table

Most tables are horizontal tables, that is, one record per row. Some tables, such as singleton tables, are more comfortable to fill in vertically, with one field per line. A1 is `##column` or `##vertical` means using vertical table mode. The singleton table above is filled in as follows in vertical table mode.

![singleton](/img/cases/singleton.jpg)
