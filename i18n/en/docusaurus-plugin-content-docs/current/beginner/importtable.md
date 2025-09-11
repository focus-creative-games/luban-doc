# Auto-Imported Tables

Each new table requires adding an entry to __tables__.xlsx, which is quite tedious. In most cases, each Excel file corresponds to a single table, so it's possible to have the tool automatically add the table definition.

Starting with version 3.0.0, automatic table import is supported. Luban will scan the Excel file according to the specified rules and automatically import the corresponding table. Note that the table information is not added to the `__tables__.xlsx` file.

Automatic import supports custom import rules. For details, please refer to the document [Automatically Importing Tables](../manual/importtable.md).

## Creating a Table for Automatic Import

Copy the reward.xlsx file created in the [Quick Start](quickstart) to `#Reward2-RewardTable.xlsx`. **No** modifications to `_\_tables\_\_.xlsx` are required. After regenerating, you will see a new table, TbReward2, with a record type of Reward2.
The `-xxxx` comment after the table name is optional; if present, it is automatically treated as a table comment.

This method of adding tables is very convenient for common scenarios.

## Default Import Rules

By default, all Excel files (xls, xlsx, xlm, csv) with file names beginning with # (e.g., `#Item.xlsx` and `reward/#Reward.xlsx`) in the configured directory (dataDir field in luban.conf) (including subdirectories) will be scanned.

The string after the leading '#' character and the file suffix in the file name will be used as the table's value_type. "Tb" will be added to the value_type name as the table's full_name. If the Excel file is in a subdirectory, the subdirectory will be used as the namespace. For example:

- `#Item.xlsx` generates a table with full_name TbItem, value_type Item, and mode=map
- `reward/#Reward.xlsx` generates a table with full_name reward.TbReward, value_type reward.Reward, and mode=map
- `item/equip/#Equip.csv` generates a table with full_name item.equip.TbEquip, value_type item.equip.Equip, and mode=map
- `#item.Item.xlsx` generates a table with full_name item.TbItem, value_type item.Item, and mode=map
