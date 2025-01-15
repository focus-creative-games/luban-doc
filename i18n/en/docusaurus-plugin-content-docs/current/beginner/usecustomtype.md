# Use Custom Types

In practice, we often encounter situations where enumerations and custom structures need to be defined. Luban perfectly supports this feature.

For detailed definition documents, see [schema logical structure](../manual/schema), and for detailed data documents, see [Excel format (beginner)](../manual/excel) and [Excel format (advanced)](../manual/exceladvanced).

## Define common enumerations

Let's take the definition of Color enumeration as an example.

Open `__enums__.xlsx` (usually in the Datas directory) and add the following data:

![color](/img/define_color.jpg)

For detailed explanation of the fields, see [enum logical structure](../manual/schema#enum).

It is recommended that flags=false and unique=true, that is, non-flag enumeration, enumeration items are unique.

When configuring enumeration type data, you can fill in the enumeration item name, enumeration item alias, and enumeration item value, that is, RED, red, and 1 all correspond to the RED enumeration.

## Define flag type enumeration

Some enumeration type enumeration items are flag bits, which can be combined in multiples when used. Let's take AccessFlag as an example.

![color](/img/define_accessflag.jpg)

flags=true means that this is a flag type enumeration.

When configuring flag type enumeration, even if you can use only one enumeration item like a normal enumeration type, such as `READ`; you can also use '|' to combine multiple enumeration items, such as `READ|EXECUTE`, `write|execute`.

## Fill in enumeration data

![enum data](/img/cases/enum.jpg)

## Define common structure type

Let's take the common prop structure as an example. Open `__beans__.xlsx` and add the following data:

![item](/img/define_item.jpg)

## Fill in the structure type data

By default, each field in the structure takes up one cell, and the field name needs to take up multiple cells to indicate that the data in these cells corresponds to each field of the structure. In this case, cells need to be merged.

If you are using a file format such as csv that does not support merged cells, you can use `[{field name}` and `{field name}]` to put them in the start and end columns to indicate that this field occupies multiple columns.

You can also use sep to fill in the entire structure in one field. `sep=,` means using ',' to split the cell data, and the split data is used as the field of the structure.

When there are many fields in the structure, it is easy to make mistakes to fill in the fields continuously. In this case, you can use the multi-level header format to specify the column where each member field is located. For details, see [Multi-level header](../manual/exceladvanced#Multi-level header).

![item](/img/use_item.jpg)

## Compact structure type

If a structure always fills data in a cell in a compact way, you can define the sep attribute directly when defining the structure. Let's take MyVec3 as an example:

![item](/img/define_vec3.jpg)

## Fill in compact type data

![item](/img/use_vec3.jpg)

:::tip

Common types such as vec2, vec3, and vec4 are already defined by default in `Defines/builtin.xml`, so there is no need to redefine them.

:::
