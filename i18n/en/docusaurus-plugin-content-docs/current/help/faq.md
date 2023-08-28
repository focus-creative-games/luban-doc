# FAQ

## How to specify the primary key

The index field of the table specifies the list of primary keys. For details, please refer to the relevant documents about the mode and index of the table in [Configuration Related Definitions](../manual/schema).

The map and list tables support the concept of primary key. If the mode and index are not specified, the mode=map mode is automatically set, and the first field of the bean is recorded as the primary key.

Assuming that the records in the TbTest table are of type Test, and you want to use the my_index field of Test as the key, then:

- If the table is defined in xml, specify the primary key field name in the index attribute of the table, as follows:

```xml
<table name="TbTest" value="Test" index="my_index"/>
```

- If the table is defined in table.xlsx, specify the primary key name in the index column, as follows

|##var|full_name|value_type|define_from_excel|input|index|...|
|-|-|-|-|-|-|-|
||TbTest|Test|true|equip.xlsx|my_index|

## Does it support multiple primary keys?

support. When table mode=list, joint multi-primary key mode and independent multi-primary key mode are supported. For detailed documents, please refer to the related documents about table mode in [configuration related definitions](../manual/schema).

## Does it support exporting different tables and fields by client and server?

support. [Configuration related definitions](../manual/schema)
Related documents about classification definition and group export.

## Which source data file types are supported

- excel family. csv, xls, xlm, xlsx, xlsm, etc.
- json
- xml
- lua
- yaml

## Can the data of the configuration table come from multiple files?

Can. See [configuration-related definitions](../manual/schema)
Documentation on table.input in . 

## Can multiple tables be put into the same excel file?

Can. See [configuration-related definitions](../manual/schema)
Documentation on table.input in .

## When the data file is an xlsx file, will luban read the first sheet or all sheets?

Read all sheets, but ignore those sheets whose A1 cell content does not start with ##.

## Planning wants to have a non-data sheet in xlsx, how to do it

As long as the A1 cell of the sheet does not start with ##.

## How to comment out a column

Leave the column name empty, or a name like #xxxx.

## How to comment out a line of records

Just fill the first cell of the line with ##.

## Some configurations are only used for internal testing during the development period, and are not exported when they are officially released. What should I do?

Luban supports the concept of data tags. The first column of excel is tag.

- Ignore this line when tag is ##
- When the tag is xxx, if --export_exclude_tags xxx is used in the Luban.Client command line, the record will not be exported

## I want to save a record for each json, but there are too many files, it is very troublesome to specify in the input, how to solve it?

Use a catalog data source. Put all json files in a directory (it can be a directory tree), and set input to this directory. luban will automatically traverse the entire directory tree, treating each file as
A record is read in. For details, see [Other Data Sources-json](../manual/otherdatasource)

## Can a json file contain multiple records?

Can. But it must be specified in the form of *@xxx.json in the data source. For details, see [Other Data Sources-json](../manual/otherdatasource)

## Can a record come from some deep field of a json file?

Can. There are two situations:

- To read a record from a field, specify it in the form of a.b.c@xx.json
- Read the list of records from the field, specify in the form of *a.b.c@xx.json

For details, see [Other Data Sources-json](../manual/otherdatasource)

## Can the data of multiple tables be put into one json file like xlsx?

Can. Similar to the excel data source, as long as each table is specified in the form of field@xx.json or *field@xx.json.
For details, see [Other Data Sources-json](../manual/otherdatasource)

## Does it support asynchronous loading of configuration tables?

Not directly supported. But you can achieve asynchronous loading by custom template.

## Can existing enums and structs be referenced? For example, you want to use UnityEngine.AudioType and UnityEngine.Color in the generated code

Yes, enumerations and structures of external types are supported, but currently only the C# language is supported. For detailed documentation, see the type mapper related documentation in [Configuration Definition Introduction](../manual/schema).
