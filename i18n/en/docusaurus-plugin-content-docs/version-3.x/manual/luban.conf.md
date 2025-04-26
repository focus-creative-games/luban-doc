# luban.conf

Defines the global configuration required by luban.

## Format

A typical luban.conf configuration content is as follows.

```json
{
	"groups":
	[
		{"names":["c"], "default":true},
		{"names":["s"], "default":true},
		{"names":["e"], "default":true}
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
		{"name":"server", "manager":"Tables", "groups":["s"], "topModule":"cfg"},
		{"name":"client", "manager":"Tables", "groups":["c"], "topModule":"cfg"},
		{"name":"all", "manager":"Tables", "groups":["c,s,e"], "topModule":"cfg"}
	]
}

```

## dataDir

Specify the data root directory, this project configuration cannot be empty.

## schemaFiles

Defines the schema sub-definition files that need to be collected, which can be multiple or a directory. In this case, all sub-files under the directory tree (including sub-directories) will be collected recursively.

|Field|Type|Nullable|Description|
|-|-|-|-|
|fileName|string|No|The schema sub-definition file that needs to be collected can be a file or a directory. When it is a directory, all sub-files under the directory tree (including sub-directories) will be collected recursively. The type value of the sub-file is the same as the directory|
|type|string|no|Subdefine file type. If it is an xml format definition file, type is not required. If it is an excel family, since each file is only suitable for containing one type of definition, you need to use type to specify which type of definition is included. Valid values are blank string, enum, bean, table |

##groups

groups defines the groups available within the configuration. In practice, the data tables and fields in the tables required by the front-end and back-end are often different. This classification of output content according to the output target corresponds to the concept of group in Luban.

|Field|Type|Nullable|Description|
|-|-|-|-|
|names|list,string|No|Group name, contains 1-n values|
|default|bool|No|Whether it is the default export target of the table, that is, if the group of the table is empty, it automatically belongs to this group|

The name field of the group can be any value, but it should not appear repeatedly. It is also possible to use a name like client, but in practice, for convenience, it is usually a simple single character such as c or s.

The default field of group does not take effect for enum, bean and field (member field of bean).

When Luban generates code, it will start from the export table and recursively collect all related enum and bean definitions.
When the enum and bean groups are empty, they will be marked as exported types and codes will be generated for them only if they are directly or indirectly referenced by the export table. If their groups are manually set, they do not belong to the current
Export targets, but when they are indirectly referenced by the export table, the group will be ignored and exported forcibly.

If the group of the field is empty, it belongs to all groups by default and cannot be configured. This is because most fields will belong to all groups, and we want to make the fields
If the group is empty, it means exporting to all targets, instead of setting its group to all groups.

There are multiple groups. Generally, projects include at least c (client) and s (server) groups. If the project has a custom configuration editor, there will generally be an additional target e (editor).
There are no restrictions on the number and naming of groups, it is just a convention that they are designed this way.

## targets

The export target is defined. Generally speaking, for the export of the client or server, some unique configuration information is required, which corresponds to the concept of luban as target.

|Field|Type|Nullable|Description|
|-|-|-|-|
|name|string|no|export target name|
|manager|string|No|The name of the generated management class that manages all exported Tables, usually Tables|
|groups|list,string|No|Which groups the output target contains, can be 1-n|
|topModule|string| is an additional top-level namespace of type |, can be empty. When you want all the generated configuration code to be in the cfg namespace, you don’t need to add the cfg prefix to each enum, bean, table and other namespaces, just let topModule be cfg|