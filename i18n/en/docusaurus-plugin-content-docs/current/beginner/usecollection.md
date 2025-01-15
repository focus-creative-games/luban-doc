# Use Container Types

Containers are also the most commonly used types. Luban supports a variety of container data formats, and you can choose the most suitable type and fill it out according to your needs.

For detailed definition documents, see [schema logical structure](../manual/schema) and [type system](../manual/types), and for detailed data documents, see [Excel format (primary)](../manual/excel) and [Excel format (advanced)](../manual/exceladvanced).

## Container definition

Currently supports 4 basic container types, see [Container Type](../manual/types#Container Type) for details:

|Container Type|Description|Example|
|-|-|-|
|array|Array type, similar to list, but the generated code corresponds to the native array type, such as `xxx[]` in C# language| `array,int`, `array,string`, `array,Color`, `array,Item`|
|list|List type, similar to array, but the generated code corresponds to the List container type, such as `List<xx>` in C# language| `list,int`, `list,string`, `list,Color`, `list,Item`|
|set|Set type, requires unique element values, the generated code corresponds to the Set container type, such as `HashSet<xx>` in C# language| `list,int`、`list,string`、`list,Color`，`list,Item`|
|map|Dictionary type, key is required to be unique, the generated code corresponds to Map type, such as `Dictionary<xx,yy>`|`map,int,int`、`map,string,string`, `map,Color,int`，`map,int,Item`| in C# language

## Fill in array, list, set data

There are two common ways to fill in:

- Occupy multiple cells, one element in each cell

- Occupy one cell, each element is separated by a separator

When occupying multiple cells, the field name needs to occupy multiple columns. At this time, you need to merge cells to make the field occupy multiple columns. If you are using a file format such as csv that does not support merged cells, you can use `[{field name}` and `{field name}]` in the start and end columns to indicate that this field occupies multiple columns.

When occupying a cell, you need to use `sep=x` to specify the separator. The separator can be common characters such as ',', '|', ';', '&', '_', '-', such as `sep=,`.

![item](/img/use_list.jpg)

The element type can also be an enumeration or structure type. The figure below only shows array. The filling method of list and set types is similar.

![item](/img/use_list2.jpg)

As for the possibility of filling in multiple lines, as long as '*' is added before the field name, it means filling in data in multiple lines, one element per line. For details, see [Excel Format (Advanced)](../manual/exceladvanced).

![item](/img/use_list3.jpg)

## Fill in map data

The dictionary type contains key and value, so array and the like are more complicated.

Similarly, map can also be filled in a cell. In order to better distinguish key and value, and to divide each key-value pair, generally map's sep will be filled in 2. The example is as follows:

![item](/img/use_map.jpg)

The value type of map can also be a container type, similar to this:

![item](/img/use_map2.jpg)

map can also be filled in multiple lines, as follows:

![item](/img/use_map3.jpg)
