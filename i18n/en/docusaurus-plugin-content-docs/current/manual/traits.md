# Features

Luban has a wealth of built-in features.

## Complete type system

- Basic built-in types bool, byte, short, int, long, float, double, string, text, datetime
- container type array, list, set, map
- Custom enumerations and structures, in which structures support unlimited levels of type inheritance and polymorphism, easily expressing complex data structures
- Nullable type. Types other than containers support the definition of corresponding nullable types


## Support enhanced excel format

- Support true, false, 1, 0 to represent bool value
- Use enumeration names and aliases to represent enumeration constants. For example, use white, green and red to represent the quality instead of magic numbers like 1, 2, and 3
- Support for nullable variables. For example, for the int? type, use 5 to indicate a valid value, and use null to indicate empty
- Support datetime data type
- Support for struct type fields. That is, it can occupy multiple cells, or a cell, or even part of a more complex configuration
- Support splitting cells. Fill in vector3 in a cell.
- Support polymorphism. It is convenient to fill in polymorphic data, such as Circle,5 or Rectangle,3,4
- Support multi-line filling structure list
- Support for multi-level headings. It is convenient to correspond to some deeper data. Such as a.b.c.


## Support rich source file types

- Support excel family files. csv, xls, xlsx, xlsm and other formats
- Support reading from a cell book in the specified excel.
- Support json. Each file is read as one or more records
- Support lua. Each file is read as one or more records
- Support xml. Each file is read as one or more records
- Support yml. Each file is read as one or more records
- Support for directories. All files in the recursive directory, each file is read as a record. Different types of files are allowed to be mixed, for example, there can be json, lua, xml, excel and other formats in the directory at the same time.
- Each table allows multiple data sources to be specified, and a combination of all of the above can be used.
   - Many to one. For example, you can configure different tables with different tabs in an excel. For example, both the equipment upgrade table and the advanced table are in the equipment table.xlsx
   - One to many. For example, the task table can come from multiple tables such as task 1.xlsx, task 2.xlsx, etc.
   - Many to many. It can also be a combination of the above, but it is rare in practice)

## Multiple export data formats support

  **The export format is decoupled from the original data**. No matter the source data is excel, lua, xml, json or a mixture of them, it will be exported in a **unified format**, which greatly simplifies the complexity of generating code. The following export formats are currently supported:

- bin format. Similar to pb format. Smallest footprint and fastest loading
- json format
- lua format
- xml format
- yaml format
- protobuf (json + bin) format
- msgpack
- flatbuffers json format

It's also easy to extend with new formats if it doesn't meet your needs.

## Support table and field level grouping

Supports custom grouping types. It not only supports the selective export of some tables by group, but also supports the selective export of some fields in the table. For example, export the data they use for the front and back ends separately.

## support data tags

Record tags are supported. Each record can be tagged. For example, if the label is "test", it will only be exported in the case of test export, which is suitable for configuring some test data for development, but they will not be exported when publishing to the outside world.

## Powerful data verification capability

- Complete data built-in constraint checking
- ref validator. Checklist citation legality. For example, the dropId in the Monster table must be a legal key of the TbDrop table
- path validator. Check resource reference legality. For example, the icon of the Monster table must be a legal icon resource. It is extremely useful to prevent planning errors, and it is no longer necessary to find resource configuration errors at runtime
- range validator. Check value range
- size validator. It is required that the container size must be the specified size or range
- set validator. The required data must be one of the collections
- regex validator. Requires that the string must conform to a regular rule
- not default checker. The required value cannot be the default value.
- index validator. The structure list is required to be unique according to the index of a field of the structure
- text checker. The key is required to be a valid localization key.

It is also very easy to extend with new validators.

## Multiple data table modes

- one. the singleton table pattern
- map. Ordinary key-value table
- list. Ordinary list table, but supports multi-primary key joint index and multi-primary key independent index

## Localization support

- Support for **localized time**. The datetime in the configuration will be converted to the correct utc time according to the specified timezone and localtime, which is convenient for program processing
- Support text type. Can verify the validity of the localization key

## Support mainstream game development languages

Generates well-modularized code for most languages, thanks to the type system's support for namespaces. It is also very easy to extend support for new languages.

- c++ (11+)
- c# (. net framework 2+. dotnet core 2+)
- java (1.6+)
- go (1.10+)
- lua (5.1+)
- typescript (3.0+)
- python (2.7+ and 3.0+)
- gdscript (4.0+)
- php


## Support mainstream engines, hot update solutions and game platforms

- unity + c#
- unity + hybridclr
- unity + tolua,xlua
- unity + ILRuntime
- unreal + c++
- unreal + unlua
- unreal + sluaunreal
- unreal + puerts
- cocos2d-x + lua
- cocos2d-x + ts
- godot + gdscript
- WeChat Mini Program Platform
- Other small program platforms based on js
- All other engines and platforms that support lua
- All other engines and platforms that support js


## The generation process is very fast

Even large-scale projects can be generated in seconds.

## Cross-platform operation

Based on .net development, it can efficiently run on mainstream operating systems such as Windows, Linux, and macOS.
