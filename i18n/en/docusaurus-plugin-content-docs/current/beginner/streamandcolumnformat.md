# Column Qualification and Compact Format

Like structures and containers, they are data types that contain multiple elements. Luban provides multiple ways (**not limited to the following**) to read this composite data type:

- Qualify column format, multiple cells, explicitly specify the columns occupied by each field, and then read

- Stream format (compact format), multiple cells, read in sequence

- Stream format (compact format), one cell, read in sequence after splitting with a delimiter

- lite format (compact format), one cell

- json format (compact format), one cell
- Read multiple rows. This method is only valid for container types. You can use the above three methods to read elements

For detailed data documents, see [Excel Format (Advanced)](../manual/exceladvanced).

## Preparatory work

Assume that the Item structure contains two fields: `int item_id` and `int count`.

## Qualify column format, multiple cells, explicitly specify the columns occupied by each field, and then read

Specify the columns of subfields for the structure by adding a subheader row. The first column of the sub-header row must be '##var'.

![item](/img/use_column.jpg)

:::tip

The limited column format can have multiple layers of *: that is, if a sub-field of a structure is also a structure, you can still add a sub-header row to specify the column for the sub-field of the sub-field.

:::

## Streaming format, multiple cells, read in sequence

The streaming format has a feature: it reads each element (field) of the composite data in sequence. Since it cannot limit the range of each field, it will skip all blank cells read.
This is not a problem when there are not many fields, but when there are more fields, it is easy to cause subsequent field reading errors due to missing a field.

As shown in the following item field filling method, whether inserting an empty cell at the beginning, middle, or end does not affect data reading.

![item](/img/use_stream1.jpg)

## Stream format, one cell, read in order after splitting with separator

After splitting with sep, treat each data as a cell, and its filling method is the same as the first method.

![item](/img/use_stream2.jpg)

## lite format

Adding `#format=lite` to the header field indicates the use of lite format. Lite format is a data format unique to luban, suitable for complex nested data structures.
Its configuration data does not contain field names, so it is more concise than json and lua formats. For detailed documents, see [lite format](../manual/otherdatasource#lite format).

![Item](/img/use_lite.jpg)

## json format

Adding `#format=json` to the header field indicates the use of json format. For detailed documents, see [json format](../manual/otherdatasource#json format).

![Item](/img/use_json.jpg)

## lua format

Adding `#format=lua` to the header field indicates that the lua format is used. For detailed documentation, see [lua format](../manual/otherdatasource#lua format).

![Item](/img/use_lua.jpg)

## Multi-line reading

Only container types can use multi-line reading. Adding '*' before the field name indicates that this field is read in multi-line mode. When reading each row of data, both streaming format and column-limited format are supported.

![item](/img/use_rows.jpg)
