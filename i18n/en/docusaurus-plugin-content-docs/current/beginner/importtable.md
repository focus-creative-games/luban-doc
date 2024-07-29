# Automatic Table Import

Add an item to __tables__.xlsx for each new table, which is a tedious task. In most cases, each Excel file corresponds to a table, and it is possible to let the tool automatically add the table definition.

Automatic table import is supported since v3.0.0. Luban will scan the Excel file according to the specified rules and automatically add the corresponding table.

Automatic import supports custom import rules. For details, please refer to the document [Automatic table import](../manual/importtable.md).

## Create an automatically imported table

Copy the reward.xlsx created in [Quick Start](./quickstart) as `#Reward2.xlsx` file. **No** modification of \_\_tables\_\_.xlsx is required. Regenerate it and you will find that the TbReward2 table has been added, and the table record type is Reward2.

For common situations, this way of adding tables is very convenient.

## Default import rules

By default, all excel (xls, xlsx, xlm, csv) files with a file name starting with # in the configuration directory (dataDir field in luban.conf) (including subdirectories) will be scanned, such as `#Item.xlsx`, `reward/#Reward.xlsx`.
The string after removing the leading '#' character and the file suffix of the file name is used as the value_type of the table, and Tb is added to the value_type name as the full_name of the table. If the excel file is in a subdirectory, the subdirectory will be used as the namespace. For example:

- `#Item.xlsx` generates a table with full_name of TbItem, value_type of Item, and mode=map
- `reward/#Reward.xlsx` generates a table with full_name of reward.TbReward, value_type of reward.Reward, and mode=map
- `item/equip/#Equip.csv` generates a table with full_name of item.equip.TbEquip, value_type of item.equip.Equip, and mode=map
- `#item.Item.xlsx` generates a table with full_name of item.TbItem, value_type of item.Item, and mode=map
