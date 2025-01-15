# Use Streaming and Column-qualified Formats

Structures and containers are data types that contain multiple elements. Luban provides four ways to read this composite data type:

- Streaming format, multiple cells, read in order

- Streaming format, one cell, read in order after splitting with a delimiter

- Column-qualified format, multiple cells, explicitly specify the column occupied by each field, and then read

- Read multiple rows. This method is only valid for container types. You can use the above three methods to read when reading elements

For detailed data documents, see [Excel Format (Advanced)](../manual/exceladvanced).

## Preparatory work

Assume that the Item structure contains two fields, item_id and count. We will demonstrate the usage of streaming and column-qualified modes related to the Item structure later.

## Streaming format, multiple cells, read in order

The streaming format has a feature: it reads each element (field) of the composite data in order. Since it cannot limit the range of each field, it will skip all blank cells it reads.
This is not a problem when there are not many fields, but when there are more fields, it is easy to cause subsequent field reading errors due to missing a field.

For example, the following item field filling method, whether inserting an empty cell at the beginning, middle, or end, does not affect data reading.

![item](/img/use_stream1.jpg)

## Streaming format, one cell, read in sequence after splitting with delimiter

After splitting with sep, treat each data as a cell, and its filling method is the same as the first method.

![item](/img/use_stream2.jpg)

## Limited column format, multiple cells, explicitly specify the columns occupied by each field, and then read

Specify the columns of subfields for the structure by adding a subheader line. The first column of the subheader line must be '##var'.

![item](/img/use_column.jpg)

:::tip

The column-limited format can have multiple layers of *: that is, if a subfield of a structure is also a structure, you can still add a sub-header row to specify the column for the subfield of the subfield.

:::

## Multi-row reading

Only container types can use multi-row reading. Adding '*' before the field name indicates that this field is read in multi-row mode. When reading each row of data, both streaming format and column-limited format are supported.

![item](/img/use_rows.jpg)
