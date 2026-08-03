# change log

## 2022

### 2022.7.26

- Added C++ joint multi-primary-key code generation support

### 2022.07.19

- Added bidx: binary index file output for optimizing on-demand loading

### 2022.07.18

- Added bson export format
- Added nested container support (C# only for now)

### 2022.06.09

- Added GDScript export support

### 2022.03.12

- Added data_yaml yaml export format support

### 2022.02.16

- Supported externaltype mapping for vector2, vector3, vector4, and datetime

### 2022.02.12

- Excel, json, xml, and other data formats use field names like `$type` to read polymorphic type names

### 2022.02.11

- Also generate ref variables and resolve code for container element type refs; C# only for now

### 2022.02.10

- Removed automatic sep for simple native list types like `list,int`
- Unified `#` and `&` usage; confusing compatibility quirks are no longer allowed
- Adjusted externaltype design

### 2022.01.29

- Allowed cross-module inheritance for beans! Significant feature change!

### 2022.01.28

- Supported defining polymorphic types in Excel format

### 2022.01.26

- Added `option` configuration item to root.xml
- gen_types added `code_cs_unity_editor_json`
- Enums support empty cells taking the default value, but must include an item with value 0

### 2022.01.06

- Path validation supports sub-resource formats, e.g. `Assets/Icons/GoodsIcon.spriteatlas[10000]`

## 2021

### 2021.12.22

- Added python27 support

### 2021.12.18

- Added Unity asset format support; target data can be parsed from assets
- Allowed specifying parameters on directory data sources; they apply to all child data files
- Added `--output:tables`, `--output:include_tables`, `--output:exclude_tables` to include or exclude tables
- Added convert template support

### 2021.12.09

- Added `[xxx, xxx]` matching format to mark a multi-column field, useful for CSV which cannot merge cells

### 2021.12.08

- Added protobuf3 schema generation and corresponding json export

### 2021.12.06

- Added msgpack export format support
- Added flatbuffers definition generation and matching json export (binary not supported yet; a convert command file is generated so you can convert json to binary with flat)

### 2021.12.05

- Added refgroup support for many fields referencing the same set of tables
- Moved sep design from column name to type for more flexibility and consistency

### 2021.12.04

- Added gen_types type `code_template` for custom template types
- Added matching parameter `--template:data:dir` for code_template
- No longer generate empty template output files

### 2021.12.02

- Added external enum and bean support. Major feature!

### 2021.12.01

- Added `table.mode='list'`: supports no primary key, joint multi-primary-key, and independent multi-primary-key modes
- Adjusted ref accordingly for the new list table modes

### 2021.11.30

- Added protobuf definition and data format export. Excellent!!!
- Luban.Server added `--disable_cache` mode to disable generation cache for template debugging
- Excel format supports per-element multi-level headers when lists expand horizontally, easier to fill

### 2021.11.22

- Added validator: set. Checks whether a value is in a set.

### 2021.11.20

- Added `"unchecked"` tag so validators skip the record
- Removed `"no"` tag

### 2021.11.18

- Added size validator

### 2021.11.16

- Because `##field` is easy to mistype, added `##var` as the subfield row tag
- Lua and yaml can read data from subfields like json

### 2021.11.15

- Added datetime alias `time`
- Fixed datetime calculation bug caused by .NET 6 TimeZone changes
- Luban.Server and Luban.ClientServer added `--timezone` to set the default time zone
- JSON data source can read bean or `list,bean` from JSON subfields (multiple tables in one JSON file is supported though uncommon); supports `*@xxx.json` to read JSON as a record list of `list,bean` form
- Polymorphic type id field renamed from `ID` to `__ID__` to avoid compile conflicts with common field names

### 2021.11.09

Framework upgraded to .NET 6

### 2021.11.05

- Replaced Spreadsheet library with ClosedXml to fix convert_xlsx failures on Mac
- Added `--input_convert_data_dir`: use convert_xxxx output as data source instead of files in table.input
- Records in convert_xlsx output are sorted by key

### 2021.11.2

- Added `--generateonly`: generate without downloading results, for config validity checks only

### 2021.1.29

- Relaxed enum format rules; integer values corresponding to enum items are allowed

### 2021.10.28

- Split Excel2TextDiff into a separate project [Excel2TextDiff](https://github.com/focus-creative-games/Excel2TextDiff)

### 2021.10.27

- Refactored Excel data source format for clarity and consistency

### 2021.10.25

- Added `--naming_convention_xxxx` options to set generated code naming style (camelCase, PascalCase, under_scores, etc.)
- Improved Excel parse error messages with accurate locations

### 2021.10.22

- Added `--output_compact_json` for compact JSON data
- Greatly optimized LubanAssistant load/save speed

### 2021.10.20

- LubanAssistant supports multi-row lists

### 2021.10.18

- Tables gained an `output` attribute to specify generated file names

### 2021.10.13

- Added LubanAssistant plugin

### 2021.10.11

- Removed `--export_test_data`; added `--export_exclude_tags` for more flexible export filtering

### 2021.9.1

- Added `--data_file_extension` to specify generated data file suffixes

### 2021.8.28

- Added erlang export data format

### 2021.8.27

- Supported data template generation; added gen_types type `data_template` and matching `--template_name`
- Added Excel field `default` option for blank cells

### 2021.8.26

- Added `attrs` to most objects (enum, bean, table, etc.) for custom template handling
- Luban.Server `-t` now means an extra template search path; if set, it is searched before the default Templates path
- Supported dynamic localization

### 2021.8.25

- Added Luban.ClientServer all-in-one program so generation works without deploying Luban.Server

### 2021.8.24

- Supported code templates

### 2021.8.13

- Added data_json2 format. Unlike data_json (`map` as `[[k1,v1], ...]`), data_json2 exports maps as `{ k1:v1, ... }`

### 2021.8.12

- Added yaml data source support

### 2021.8.9

- Automatically disable console Quick Edit mode on Windows

### 2021.8.4

- Supported defining beans in Excel
- Supported defining enum types in Excel
- Improved cfg logging; no longer prints scary stack traces

### 2021.8.3

- Added `--cs:use_unity_vector` to use `UnityEngine.Vector{2,3,4}` instead of `System.Numerics.Vector{2,3,4}`

### 2021.8.2

- Unified JSON and Lua data file line endings across platforms to `\n`
- Supported reading Table list definitions from Excel so new tables can often be added by editing Excel alone

### 2021.7.30

- Supported reading definitions directly from Excel headers; definition and data are integrated, reducing separate record definition work

### 2021.7.29

- Fixed garbled error logs when Luban.Server and Luban.Client run outside mainland China

### 2021.7.8

- Added Go JSON data loading support (`code_go_json`)
- Fixed Go nullable variable support

### 2021.6.19

- Added Excel2TextDiff tool project to convert Excel to text or convert two Excel files to text then diff
- Excel, lua, xml, json support tag filtering

### 2021.6.17

- Supported main-branch + feature-branch multi-branch data merge; very useful for multi-region releases
- Supported static localization

### 2021.5.8

- Luban.Client supports watch: auto-regenerate when related definitions or data change

### 2021.4.12

- Improved exported JSON: Unicode characters exported as raw characters instead of `\uxxxx`

### 2021.4.8

- Added gen_type `data_json_monolithic`: generate all JSON into one file
