- # change log

  ##2022

  ### 2022.7.26

  - Added cpp's joint multi-primary key code generation support

  ### 2022.07.19

  - Added bidx, which is the index file output in binary format. Convenient and optimized on-demand loading

  ### 2022.07.18

  - Added bson export format
  - Added support for nested containers (currently only supports c# language)

  ### 2022.06.09

  - Added export support for gdscript language

  ### 2022.03.12

  - Added data_yaml yaml export format support

  ### 2022.02.16

  - Support externaltype mapping of vector2, 3, 4 and datetime types

  ### 2022.02.12

  - Excel, json, xml and other data formats use field names like $type to read polymorphic type names

  ### 2022.02.11

  - The ref of the container element type also generates the corresponding ref variable and resolve code, currently only supports c#

  ### 2022.02.10

  - Remove automatic sep for simple native data list types like "list,int"
  - Unify the usage of # and &, and no longer allow confusing usage due to compatibility
  - Adjust externaltype design

  ### 2022.01.29

  - Allow cross-module inheritance of beans! Bigger Changed Features!

  ### 2022.01.28

  - Support for defining polymorphic types in excel format

  ### 2022.01.26

  - root.xml new configuration item option
  - gen_types added code_cs_unity_editor_json
  - enum supports empty cells to take the default value, but it is required to contain items with a value of 0

  ### 2022.01.06

  - Path verification supports sub-resource file formats, such as Assets/Icons/GoodsIcon.spriteatlas[10000]

  ## 2021

  ### 2021.12.22

  - Added python27 support

  ### 2021.12.18

  - Added Unity asset format support, which can parse the target data from the asset
  - Allows specifying parameters for catalog data sources that will be applied to all child data files
  - Added --output:tables, --output:include_tables, --output:exclude_tables to specify to include or exclude certain tables
  - Added convert template support

  ### 2021.12.09

  - Add \[xxx, xxx\] this matching format to identify a multi-column field, which is convenient for csv, a format that does not support cell merging, to identify multi-column fields

  ### 2021.12.08

  - Added protobuf3 schema generation and corresponding json format export

  ### 2021.12.06

  - Added msgpack export format support
  - Added flatbuffers definition generation and corresponding json export format support (binary format is not supported temporarily, but a conversion command file is specially generated, you can use flat to convert json format to binary)

  ### 2021.12.05

  - Added refgroup support, which is convenient for the situation where many fields refer to the same group of tables
  - Adjust sep design, move from column name to type, more flexible and unified

  ### 2021.12.04

  - Add gen_types type code_template, you can add custom template types
  - Added parameters matching code_template --template:data:dir
  - no longer generate empty template generation result files

  ### 2021.12.02

  - Added external enum and bean support. Great Features!

  ### 2021.12.01

  - Add table.mode='list' type, this type of table supports no primary key, combined multiple primary keys, independent multiple primary keys three modes.
  - ref is adjusted accordingly, suitable for the newly added list type table mode

  ### 2021.11.30

  - Added protobuf definition and data format export. excellent! ! !
  - Added --disable_cache mode in Luban.Server, which disables the generated cache, which is convenient for debugging templates
  - The excel format supports that when the list is expanded horizontally, each element specifies a multi-level header separately, which is convenient for filling in

  ### 2021.11.22

  - Added validator: set . Checks if a value is in a set.

  ### 2021.11.20

  - Added "unchecked"Tag to instruct the validator not to check the record
  - remove "no"Tag

  ### 2021.11.18

  - Add size validator

  ### 2021.11.16

  - Considering that ##field is easy to write wrong, add ##var and ##var as labels for subfield lines
  - Both lua and yaml support reading data from subfields like json

  ### 2021.11.15

  - Added datetime alias time
  - Fix the bug that the datetime calculation is wrong due to the adjustment of TimeZone related to .net 6
  - Luban.Server and Luban.ClientServer add --timezone parameter to specify the default time zone
  - The json data source supports reading beans or lists and beans from json subfields (that is, the data of multiple tables can be allocated to a json file, although this is rarely done in practice), and supports using *@xxx.json to convert json as read as a list of records
     data in the form of list, bean
  - The type polymorphic id field name is renamed from ID to __ID__, to avoid compilation errors caused by conflicts with common field names

  ### 2021.11.09

  Framework upgrade to .net 6

  ### 2021.11.05

  - Use ClosedXml to replace the SpreedSheet library to solve the problem of convert_xlsx failure under mac
  - Added --input_convert_data_dir, use the conversion data convert_xxxx to generate the file instead of the file specified in table.input as the data source
  - In the file generated by convert_xlsx, records are sorted by key

  ### 2021.11.2

  - Added --generateonly option, generate but not download the result, for simple configuration validity check

  ### 2021.1.29

  - Relax the format requirements for enum, you can fill in the integer corresponding to the enumeration value

  ### 2021.10.28

  - Split Excel2TextDiff into a separate project [Excel2TextDiff](https://github.com/focus-creative-games/Excel2TextDiff)

  ### 2021.10.27

  - Refactor the excel data source format. More clear and elegant

  ### 2021.10.25

  - Added --naming_convention_xxxx related options, you can specify the naming style for the generated code (camelCase, PascalCase, under_scores, etc.)
  - Optimize the error message when parsing the excel format error, and give the exact error location

  ### 2021.10.22

  - Add --output_compact_json, generate compact json data
  - Greatly optimized the loading and saving speed of LubanAssistant. (Slow as an ox to fast as lightning)

  ### 2021.10.20

  - LubanAssistant supports multiline lists

  ### 2021.10.18

  - The output attribute is added to the table, and the generated file name can be specified

  ### 2021.10.13

  - Add LubanAssistant plugin

  ### 2021.10.11

  - Removed --export_test_data and added --export_exclude_tags option, allowing more flexible filtering of export data

  ### 2021.9.1

  - Added --data_file_extension option, allowing to specify the suffix of the generated data file

  ### 2021.8.28

  - Added erlang export data format

  ### 2021.8.27

  - Support data template generation, add gen_types type data_template and corresponding matching option --template_name
  - Add the default option of the excel field, allowing to specify the default address for the blank cell

  ### 2021.8.26

  - Add attrs attributes to most objects such as enum, bean, table, etc., to facilitate custom processing in code templates
  - Luban.Server's command line argument -t semantics adjusted for additional template search paths. If specified, this path will be searched first, and then the default Templates path will be searched.
  - Support dynamic localization

  ### 2021.8.25

  - Added the Luban.ClientServer integrated program, which can be generated with one program without deploying Luban.Server.

  ### 2021.8.24

  - Support code template

  ### 2021.8.13

  - Added data_json2 format. The difference from data_json is that the map of data_json is exported as [[k1,v1], ...] while the map of data_json2 is exported in the format of { k1:v1, ... }

  ### 2021.8.12

  - Added yaml data source support

  ### 2021.8.9

  - Automatically disable the quick edit mode of the console under win

  ### 2021.8.4

  - Support bean definition in excel
  - Support defining enum type in excel
  - Optimize cfg log, no longer print scary stack information

  ### 2021.8.3

  - Added --cs:use_unity_vector command line parameter to allow using UnityEngine.Vector{2,3,4} instead of System.Numerics.Vector{2,3,4}

  ### 2021.8.2

  - Solve the problem of generating different json and lua data files (line breaks) under different platforms, unified to \\n
  - Support reading Table list definition from excel. In this way, in most cases, adding a new table can be done only by modifying the excel file.

  ### 2021.7.30

  - Support reading the definition directly from the header of the excel file, and the definition and data are integrated. Simplifies the hassle of writing record definitions

  ### 2021.7.29

  - Solve the problem that Luban.Server and Luban.Client run error logs garbled in non-mainland areas

  ### 2021.7.8

  - Added go language json data loading support (code_go_json)
  - Fix go's support for nullable variables

  ### 2021.6.19

  - Added the Excel2TextDiff tool item, which is used to convert excel to text or directly convert two excel files to text and then diff
  - excel, lua, xml, json support tag filtering

  ### 2021.6.17

  - Support multi-branch data merging of main version + branch version, which is extremely useful for releasing multi-regional versions
  - Support static localization

  ### 2021.5.8

  - Luban.Client supports the watch mechanism, which automatically regenerates after monitoring related definitions or data changes. Save iteration time.

  ### 2021.4.12

  - Optimize the exported json data file. Unicode characters are exported as raw characters instead of \uxxxx.

  ### 2021.4.8

  - Added gen_type type data_json_monolithic: generate all json files into one file
