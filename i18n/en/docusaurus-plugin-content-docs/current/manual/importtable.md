# Automatic table import

Each new table is added to __tables__.xlsx, which is a tedious task. In most cases, each excel corresponds to a table, and it is possible to let the tool automatically add the table definition.

Since version v3.0.0, automatic table import is supported. luban will scan the excel table according to the specified rules and automatically add the corresponding table.

## Default TableImporter

The default TableImporter is DefaultTableImporter, and the corresponding name is default. If the `-x tableImporter.name` parameter is not specified, DefaultTableImporter is automatically used.

### Default scanning rules

DefaultTableImporter will scan all excel family (xls, xlsx, xlm, csv) files in the luban.conf directory (including subdirectories) whose file names start with #, such as `#Item.xlsx`, `reward/#Reward.xlsx`.
Use the string after removing the leading '#' character and the file suffix as the valueType of the table, and add Tb to the valueType name as the full name of the table. If the Excel file is in a subdirectory, the subdirectory will be used as the namespace. For example:

- `#Item.xlsx` generates a table with full_name of TbItem, value_type of Item, and mode=map
- `reward/#Reward.xlsx` generates a table with full_name of reward.TbReward, value_type of reward.Reward, and mode=map
- `item/equip/#Equip.csv` generates a table with full_name of item.equip.TbEquip, value_type of item.equip.Equip, and mode=map

### Custom import rules

Introduce several definitions:

|Variable|Definition|
|-|-|
|RawFullName| The relative path of all directories in the file is converted into a namespace ('\' or '/' in the path is replaced by '.') and then concatenated with the value of the first Group in the tableImporter.filePattern regular item. Taking `filePatter=#(.*)` and the file name `#Item.xlsx` as an example, RawFullName is Item; taking the file name `item/#Item.xlsx` as an example, RawFullName is item.Item|
|RawNamespace|The namespace in RawFullName, if RawFullName is item.Item, then RawNamespace is item|
|RawName|The class name in RawFull, if RawFullName is item.Item, then RawName is Item|

Configuration parameters related to custom rules:

|Parameter|Required|Description|Example|
|-|-|-|-|
|tableImporter.name|No|TableImporter name, the default implementation is DefaultTableImporter, the name is default. If none is selected, automatic import is disabled|-x tableImporter.name=default|
|tableImporter.filePattern|No|The file name rule for automatic import (without the file name suffix), the format is a C# regular expression string. The default is #(.*)|-x tableImporter.filePattern=!(.*)|
|tableImporter.tableNamespaceFormat|No|The format string of the table namespace, the default value is `{0}`, that is, directly take RawNamespace|-x tableImporter.tableNamespaceFormat=My{0}|
|tableImporter.tableNameFormat|No|The format string of the table class name, the default value is `Tb{0}`, that is, take Tb plus RawName|-x tableImporter.tableNameFormat=Cfg{0}|
|tableImporter.valueTypeNameFormat|No|The format string of the value_type class name, the default value is `{0}`, that is, take RawName. However, if the table namespace exists, the namespace will be automatically added. |-x tableImporter.valueTypeNameFormat=Va{0}|

## Implement a custom TableImporter

If the default TableImporter does not meet the requirements, you can also implement a custom TableImporter. Refer to the implementation of `src/Luban.Schema.Builtin/DefaultTableImporter.cs`.

## Limitations

Automatically importing tables can only meet common rules. For more complex input data sources, please manually add them in __tables__.xlsx.

There are the following limitations:

- Multiple data sources are not supported, that is, multiple excel files are not supported to be exported as one table, for example, `#Item_1.xlsx` and `#Item_2.xlsx` are not supported to be automatically exported as one table
- Sheet is not supported to be exported as one table, for example, the equip cell sheet in `Item.xlsx` is not supported to be automatically exported as one table
- Only map mode is supported, not one or index mode
