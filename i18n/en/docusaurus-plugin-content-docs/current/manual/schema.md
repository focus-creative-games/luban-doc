# schema logical structure

As introduced in the [Design Philosophy](./architecture) document, the core of Luban is a complete type system, and the DPP pipeline is the basis for powerful expansion capabilities.
Unlike the old version of Luban, which basically fixed the definition format of the configuration table, the definition of the new version is independent and no longer bound to a specific definition format. Although the provided default schema collector and loader still handles a definition format similar to older versions of Luban, developers can fully customize the format to suit the habits of actual projects.

This document only introduces the logical structure of the schema, and the specific definition format is determined by the schema collector and loader, which is introduced in [Configuration Definition](./schema).

:::caution

Because the logical structure of the schema is shared with the implementation. The logical structure definition is not necessarily consistent with the definition in the implementation, and the specific implementation converts the definition format it accepts into the definition corresponding to the final logical structure.
For example, there is the concept of module in xml, and each type in the logical structure of schema has a namespace, but there is no separate module structure. In addition, the field names in the logical structure and the field names in the implementation are not necessarily the same.

:::

## Global configuration

Defines the type system or generates global information for dependencies.

###group

group defines the groupings available within the configuration. In practice, the data table and the fields in the table required by the front and back ends are often different. This classification of output content according to the output target corresponds to the concept in luban as group.

| field   | type   | nullable | description                                                  |
| ------- | ------ | -------- | ------------------------------------------------------------ |
| name    | string | No       | group name                                                   |
| default | bool   | No       | Whether it is the default export target of the table, that is, if the group of the table is empty, it will automatically belong to this group |

The name field of the group can be any value, but do not appear repeatedly. It is also possible to use a name such as client, but in practice, for the convenience of filling in, it is usually a simple single character such as c and s.

The default field of group does not take effect for enum, bean and field (member field of bean).

When Luban generates code, it starts from the export table and recursively collects all related enum and bean definitions.
When the group of enum and bean is empty, only when they are directly or indirectly referenced by the export table, they will be marked as export types and codes will be generated for them. If their group is manually set, they do not belong to the current export target, but when they are indirectly referenced by the export table, they will be forcibly exported regardless of the group.

If the group of the field is empty, it belongs to all groups by default and is not configurable. This is because most fields belong to all groups, and we want to make the group of the field empty to indicate that it is exported to all targets, instead of setting its group to all groups verbosely.

There are multiple groups, and the general project contains at least c (ie client) and s (ie server) groups. If the project has a custom configuration editor, there is usually an additional target e (ie editor).
There is no limit to the number and naming of groups, but it is customary to design this way.

### target

The export target is defined. Generally speaking, for the export of the client or server, some unique configuration information is required, and the concept corresponding to luban is target.

| field     | type     | nullable | description                                                  |
| --------- | -------- | -------- | ------------------------------------------------------------ |
| name      | string   | No       | export target name                                           |
| manager   | string   | No       | The name of the generated management class that manages all exported Tables, usually Tables |
| groups    | string[] | No       | Which groups the output target contains, can be 1 or more    |
| topModule | string   | Yes      | Type extra top-level namespace, can be empty. When you want all the generated configuration code to be in the cfg namespace, you don’t need to add the cfg prefix to each enum, bean, table and other namespaces, just let topModule be cfg |

## Custom Type

### enum

| field          | type              | nullable | description                                                  |
| -------------- | ----------------- | -------- | ------------------------------------------------------------ |
| namespace      | string            | Yes      | namespace                                                    |
| name           | string            | No       | type name                                                    |
| isFlags        | bool              | Yes      | Whether it is a flag bit type, corresponding to the FlagsAttribute semantics of c# |
| isUniqueItemId | bool              | No       | Whether the enumeration value is unique                      |
| comment        | string            | Yes      | comment                                                      |
| tags           | map,string,string | Yes      | custom tag pair                                              |
| groups         | list,string       | Yes      | export group, can be 0 or more                               |
| items          | list,EnumItem     | Yes      | list of enumeration items                                    |
| typeMappers    | list,TypeMapper   | Yes      | configuration related to external type mapping               |

For groups, tags, and typeMappers, please read the detailed introduction in the public attributes section.


EnumItem is defined as follows:

| field   | type              | nullable | description           |
| ------- | ----------------- | -------- | --------------------- |
| name    | string            | No       | enumeration item name |
| alias   | string            | Yes      | alias                 |
| value   | string            | Yes      | enumeration value     |
| comment | string            | Yes      | comment               |
| tags    | map,string,string | Yes      | custom tag pair       |

If value is empty, it will automatically increment from the previous enumeration value, and if it is the first enumeration value, the value will be 0. value can be a decimal integer or a hexadecimal integer such as 0x10.
value can also be a combination or combination of other enumeration values, such as `A|B`.

### beans

Used to define composite structures, corresponding to class or struct in C#.

| field       | type              | nullable | description                                                  |
| ----------- | ----------------- | -------- | ------------------------------------------------------------ |
| namespace   | string            | string   | Yes                                                          |
| name        | string            | No       | type name                                                    |
| parent      | string            | Yes      | parent class name                                            |
| isValueType | bool              | Yes      | Whether it is a value type, for example, when generating code for a language that supports value types such as c#, generate a struct instead of a class type, which has no effect on a language such as java |
| comment     | string            | Yes      | comment                                                      |
| tags        | map,string,string | Yes      | custom tag pair, can be 0 or more                            |
| alias       | string            | Yes      | Alias, mainly used to fill in polymorphic names for planning with poor English, such as Circle class can also fill in 'circle' to express |
| sep         | string            | Yes      | The default field separator, which is used to compactly fill in the compound structure in excel, such as `1,2,3` in one cell to express a vector3 structure, instead of occupying multiple cells forcibly. sep can be multiple characters, which means to use any character in sep to split, instead of the whole sep as the separator |
| groups      | list,string       | Yes      | export group, can be 0 or more                               |
| fields      | list,Field        | Yes      | field list                                                   |
| typeMappers | list,TypeMapper   | Yes      | configuration related to external type mapping               |

For groups, tags, and typeMappers, please read the detailed introduction in the public attributes section.

**bean supports inheritance and polymorphism**. If the parent field is non-empty, it means inheriting the fields of the parent class. If the parent does not contain a namespace, the type will be searched from the current namespace of the bean, otherwise it will be searched globally.
All complementary beans are abstract classes and cannot be instantiated. The type system allows the use of abstract beans as types, but when writing data, a subclass must be used to instantiate it.
This polymorphic feature gives luban the ability to express arbitrarily complex data structures.

Field is the member field of the bean, which is defined as follows:

| field             | type              | nullable        | description                            |
| ----------------- | ----------------- | --------------- | -------------------------------------- |
| name              | string            | No              | field name                             |
| type              | string            | No              | Field type, see [type system](./types) |
| comment           | string            | Yes             | comment                                |
| tags              | map,string,string | custom tag pair |                                        |
| NotNameValidation | bool              | No              | Do not check field name validity       |
| groups            | list,string       | Yes             | grouping                               |

For details about groups, please read the documentation in the public attributes section.

## table

table is a logical representation of a data table. table is not a type and cannot be used for field type definition.

| field              | type              | nullable | description                                                  |
| ------------------ | ----------------- | -------- | ------------------------------------------------------------ |
| namespace          | string            | Yes      | string                                                       |
| name               | string            | No       | type name                                                    |
| index              | string            | Yes      | index field list, can be 0 or more                           |
| mode               | TableMode         | Yes      | table mode                                                   |
| valueType          | string            | No       | record type                                                  |
| readSchemaFromFile | bool              | No       | Whether to parse the valueType definition from inputFiles    |
| comment            | string            | Yes      | comment                                                      |
| tags               | map,string,string | Yes      | custom tag pair, can be 0 or more                            |
| groups             | list,string       | Yes      | export group, can be 0 or more                               |
| inputFiles         | list,string       | No       | list of input data files, cannot be empty                    |
| outputFileName     | string            | Yes      | the output file name, if it is empty, take `FullName.LowerCase().Replace('.', '_')` |

If index is empty, and mode=map or empty, the first field of valueType is automatically taken as index. When the table has multiple primary keys, if it is a joint primary key, fill it in the form of 'key1+key2+,,,+keyn', and if it is an independent primary key, configure it in the form of 'key1,key2,,,keyn'.

TableMode is an enumeration of table modes, which can be one (or singleton), map, or list. If it is left blank, the specific mode value will be determined according to the index: if the index is empty or has a primary key, it will be a map, and the index is the first field of valueType;
If index is multiple primary keys, mode is list.

inputFiles specifies multiple input data sources, and the definition method is extremely flexible. Each data source can be the following values:

- All cell sheets from an excel file. For example xxx.xlsx
- A specified cell sheet from an excel file. For example sheet@xxx.xlsx
- From json, xml, lua, yaml, unity scriptable asset files. For example xx.json or xx.xml or xx.lua or xx.yml
- from json, xml, lua, yaml, unity scriptable asset subfields. For example *items@item_module.json or item.consts@item_module.json etc., other formats are the same
- from the catalog. All files (including recursive subdirectories) under the directory tree will be read as data sources, and each file (except the excel family) corresponds to a record. For example skill_json_dir
- Any combination of the above. Such as xx.xlsx,sheet2@yy.xls,abc@zz.json,ccc_dir

## public property

### groups

All directly or indirectly referenced types (enum and bean) are calculated from the valueType of the exported table, which is called the default export set. If a type is in the default export set, it will be exported even if its groups do not belong to the current export target.

If groups contains "\*", it means that it belongs to all groups. If the groups of enum and bean contain "\*", it means that code will be generated for it even if the type is not referenced in the default export set.

If the groups of table, bean, and enum are empty, these types will be exported when any group in the export target's groups has default set to true, otherwise these types will not be exported.

Take the following luban.conf as an example:

```json
{
"groups":
[
{"names":["c"], "default":true},
{"names":["s"], "default":true},
{"names":["e"], "default":true},
{"names":["t"], "default":false}
],
"schemaFiles":
[
{"fileName":"Defines", "type":""},
{"fileName":"Datas/__tables__.xlsx", "type":"table"},
{"fileName":"Datas/__beans__.xlsx", "type":"bean"},
{"fileName":"Datas/__enums__.xlsx", "type":"enum"}
],
"dataDir": "Datas",
"targets":
[
{"name":"test", "manager":"Tables", "groups":["t"], "topModule":"cfg"},
{"name":"server", "manager":"Tables", "groups":["s"], "topModule":"cfg"},
{"name":"client", "manager":"Tables", "groups":["c"], "topModule":"cfg"},
{"name":"editor", "manager":"Tables", "groups":["c"], "topModule":"editor.cfg"},
{"name":"all", "manager":"Tables", "groups":["c","s","e"], "topModule":"cfg"}
]
}

```

If the groups of bean MyVec is empty, even if there is no exported table directly or indirectly referencing it, the MyVec type will be exported when the export target is server, and the MyVec type will not be exported when the export target is test.

There is no concept of a default export collection for field (the bean's field list). If groups is empty, it is exported to all groups.

### tags

tags have two main purposes: [validator](./validator) and special code generation.

Sometimes when you want to generate some special code for a certain type, you can add some special tag attributes to the type, and then perform special processing according to the value of the tag attribute in the code template. This mechanism is not commonly used, but it is sometimes useful.
The has_tag function is used to check whether there is a certain tag, and get_tag is used to obtain the value corresponding to a certain tag. For details, please refer to the relevant documentation of the template.

### typeMapper

Sometimes you want to use ready-made struct types directly in the generated code instead of using the generated type code. For example, vector3 is a very common type. After you define vector3 in the configuration, you may want to use UnityEngine.Vector3 instead of the generated vector3 class where the vector3 type is involved in the generated C# code. Luban supports this external type mapping mechanism, which can map configuration classes to external ready-made enum or class types.

| field       | type              | nullable                         | description                                                  |
| ----------- | ----------------- | -------------------------------- | ------------------------------------------------------------ |
| targets     | list, string      | No                               | Matched output target, this target is the target in the global definition |
| codeTargets | list,string       | No                               | matching code targets                                        |
| options     | map,string,string | generate the required parameters |                                                              |

In actual projects, the language of the server and the client may be different, and it is possible that the client needs to map a certain type, but the server does not. targets and codeTargets are used to handle this situation. Only when both target and codeTarget match, will the generated code be type-mapped.

The parameters that options should have are completely determined by the specific CodeTarget, and different codeTargets require different parameters.

