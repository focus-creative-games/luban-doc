# configuration definition

Luban has a set of [Schema logical structure](./schema) implementation independent of the specific implementation. There is no requirement on how to define the configuration, as long as the final definition can be loaded and parsed into a schema logical structure, it can be processed uniformly. The Luban.Schema.Builtin module provides a default SchemaCollector implementation. If the requirements cannot be met, developers can implement a custom SchemaCollector to suit their own project needs.

This document describes the configuration definition format for the DefaultSchemaCollector implementation. Since DefaultSchemaCollector is the implementation of [Schema logical structure](./schema), **most configuration items are one-to-one correspondence**. Therefore, except for special cases, the specific meanings of these fields will not be introduced, please refer to this document directly.

## excel definition file

Since excel tables are suitable for expressing similar definitions, enum, bean, and table need to be defined in different cell books or files.

### enum type definition file

Generally speaking, definition files are placed under the Defines file, but for the convenience of planning and writing, the excel type definition files can also be placed in the Datas directory.

A typical enum file format is as follows:

![excel_enum](/img/excel_enum.jpg)

Table field description:

| Field     | Nullable | Default | Description                                                  |
| --------- | -------- | ------- | ------------------------------------------------------------ |
| full_name | No       |         | The full name of the type, that is, it can not contain a namespace, such as Hello, or it can contain a namespace such as item.Item |
| flags     | Yes      | false   | isFlags field in the equivalent schema logic structure       |
| unique    | Yes      | false   | All enumeration values in the current enum must be unique, equivalent to the isUniqueItemId field in the logical structure of the schema |
| comment   | Yes      |         |                                                              |
| tags      | Yes      |         | The filling method is key1=value1#key2=value2...             |
| items     | No       |         | list of enumerated items                                     |

Enumeration item field description:

| Field   | Nullable | Default | Description           |
| ------- | -------- | ------- | --------------------- |
| name    | no       |         | enumeration item name |
| alias   | Yes      |         | alias                 |
| value   | Yes      |         | enumeration value     |
| comment | Yes      |         |                       |
| tags    | Yes      |         | Same as other tags    |


### bean type definition file

A typical bean file format is as follows：

![excel_bean](/img/excel_bean.jpg)

Table field description:

| Field     | Nullable | Default | Description                                                  |
| --------- | -------- | ------- | ------------------------------------------------------------ |
| full_name | No       |         | The full name of the type, that is, it can not contain a namespace, such as Hello, or it can contain a namespace such as item.Item |
| parent    | Yes      |         | the name of the parent class, if the name does not contain a namespace, it will be searched from the current namespace first, and then from the global namespace |
| valueType | Yes      | false   | corresponds to the isValueType field in the logical structure of the schema |
| sep       | Yes      |         |                                                              |
| alias     | Yes      | false   |                                                              |
| comment   | Yes      |         |                                                              |
| group     | Yes      |         |                                                              |
| tags      | Yes      |         |                                                              |
| fields    | No       |         | field list                                                   |

Field descriptions for field definitions:

| Field   | Nullable | Default | Description |
| ------- | -------- | ------- | ----------- |
| name    | No       |         |             |
| type    | No       |         |             |
| group   | Yes      |         |             |
| comment | Yes      |         |             |
| tags    | Yes      |         |             |


### table type definition file

A typical table file format is as follows:

![excel_table](/img/excel_table.jpg)

Table field description:

| Field                 | Nullable | Default | Description                                                  |
| --------------------- | -------- | ------- | ------------------------------------------------------------ |
| full_name             | No       |         | The full name of the type, that is, it can not contain a namespace, such as Hello, or it can contain a namespace such as item.Item |
| value_type            | No       |         | Table record type                                            |
| read_schema_from_file | Yes      | false   | Whether to read the value_type definition from the header line of the input excel file. At this time, the bean corresponding to value_type can no longer be defined, otherwise there will be an error of repeated definition |
| input                 | No       |         | corresponds to the inputFiles field in the logical structure of the schema |
| index                 | Yes      |         |                                                              |
| mode                  | Yes      |         |                                                              |
| comment               | Yes      |         |                                                              |
| group                 | Yes      |         |                                                              |
| tags                  | Yes      |         |                                                              |
| output                | No       |         | corresponds to the outputFileName field in the schema logic structure |

## xml definition file

Currently, only one XML definition file format is supported, and the type attribute of import is required to be undefined or empty.


A typical xml definition file is as follows:

```xml

<module name="item">

<enum name="Quality">
  <var name="WHITE" alias="白"/>
  <var name="RED" alias="红"/>
  <var name="GREEN" alias="绿"/>
</enum>

<bean name="Item">
  <var name="id" type="int"/>
  <var name="count" type="int"/>
</bean>

<bean name="Item2">
  <var name="id" type="int"/>
  <var name="count" type="int"/>
  <var name="desc" type="string"/>
</bean>

<table name="TbItem" value="Item" input="item.xlsx"/>
<table name="TbItem2" value="Item2" input="item2.xlsx"/>

<refgroup name="item.TbItem,item.TbItem2"/>

<enum name="AudioType">
    <var name="UNKNOWN" value="0"/>
    <var name="ACC" value="1"/>
    <var name="AIFF" value="2"/>
    <mapper target="client" codeTarget="cs-bin">
        <option name="type" value="UnityEngine.AudioType"/>
    </mapper>
</enum>
<bean name="vector2" valueType="1" sep=",">
    <var name="x" type="float"/>
    <var name="y" type="float"/>
    <mapper target="client" codeTarget="cs-bin">
        <option name="type" value="UnityEngine.Vector2"/>
        <option name="constructor" value="ExternalTypeUtil.NewVector2"/>
    </mapper>
</bean>

<module name="subModule">
  <bean name="SubModuleType">
    <var name="id" type="int"/>
    <var name="count" type="int"/>
  </bean>
  <table name="TbSubItem" value="SubModuleType" input="submodule.xlsx"/>
</module>


</module>

```

### module definition

| field name | optional | default value | description                                                  |
| ---------- | -------- | ------------- | ------------------------------------------------------------ |
| name       | Yes      |               | the namespace name, can be empty. Can be a multi-level namespace, such as a.b |

Sub-modules can be defined in mdoule, and unlimited nesting levels are supported.

### enum definition

| field name | optional | default value | description                                                  |
| ---------- | -------- | ------------- | ------------------------------------------------------------ |
| name       | No       |               | Type name, cannot contain namespace                          |
| flags      | Yes      | false         | isFlags field in the equivalent schema logic structure       |
| unique     | Yes      | false         | All enumeration values in the current enum must be unique, equivalent to the isUniqueItemId field in the logical structure of the schema |
| comment    | Yes      |               |                                                              |
| tags       | Yes      |               | The filling method is key1=value1#key2=value2...             |

enum supports two sub-elements: var and mapper.

var defines the information of the enumeration item, the format is as follows:

| Field   | Nullable | Default | Description           |
| ------- | -------- | ------- | --------------------- |
| name    | No       |         | enumeration item name |
| alias   | Yes      |         | alias                 |
| value   | Yes      |         | enumeration value     |
| comment | Yes      |         |                       |
| tags    | Yes      |         | Same as other tags    |

The mapper defines information related to external type mapping. For specific meanings, please refer to the document in the logical structure of the schema. The fields are as follows:

| Field      | Nullable | Default                     | Description                 |
| ---------- | -------- | --------------------------- | --------------------------- |
| target     | No       |                             | 1-n, separated by comma ',' |
| codeTarget | No       | 1-n, separated by comma ',' |                             |

The mapper can contain 0-n option sub-elements, and the option format is as follows:

| Field | Nullable | Default | Description |
| ----- | -------- | ------- | ----------- |
| name  | No       |         |             |
| value | No       |         |             |

### bean definition

| Field     | Nullable | Default | Description                                                  |
| --------- | -------- | ------- | ------------------------------------------------------------ |
| name      | No       |         | Type name, cannot contain namespace                          |
| parent    | Yes      |         | the name of the parent class, if the name does not contain a namespace, it will be searched from the current namespace first, and then from the global namespace |
| valueType | Yes      | false   | corresponds to the isValueType field in the logical structure of the schema |
| sep       | Yes      |         |                                                              |
| alias     | Yes      | false   |                                                              |
| comment   | Yes      |         |                                                              |
| group     | Yes      |         |                                                              |
| tags      | Yes      |         |                                                              |

The bean supports three sub-elements: var, bean, and mapper.

var defines the member fields, which are defined as follows:

| Field   | Nullable | Default | Description |
| ------- | -------- | ------- | ----------- |
| name    | No       |         |             |
| type    | No       |         |             |
| group   | Yes      |         |             |
| comment | Yes      |         |             |
| tags    | Yes      |         |             |

A bean defines a substructure, and the parent of the substructure is the superior bean, which automatically includes all the fields of the parent class. At this time, the parent field of the substructure will be automatically ignored, and the definition method of the subbean is exactly the same as that of the bean.
This structure including type inheritance is a **polymorphic structure**, especially suitable for expressing complex GamePlay data structures in skills, copies, and AI.

mapper defines the information related to external type mapping, which is exactly the same as the definition of mapper in enum, so I won't repeat it here.

### table definition

| Field              | Nullable | Default | Description                                                  |
| ------------------ | -------- | ------- | ------------------------------------------------------------ |
| name               | No       |         | Type name, cannot contain namespace                          |
| value              | No       |         | table record type                                            |
| readSchemaFromFile | Yes      | false   | Whether to read the value definition from the header row of the input excel file. At this time, the bean corresponding to the value can no longer be defined, otherwise there will be an error of repeated definition |
| input              | No       |         | Can be multiple, separated by commas ',', corresponding to the inputFiles field in the schema logic structure |
| index              | Yes      |         | can be multiple, if it is a joint primary key, it will be separated by '+', if it is an independent primary key, it will be separated by ',' |
| mode               | Yes      |         | one of one (or singleton), map, list                         |
| comment            | Yes      |         |                                                              |
| group              | Yes      |         |                                                              |
| tags               | Yes      |         |                                                              |
| output             | No       |         | corresponds to the outputFileName field in the schema logic structure |

### constalias

When planning to fill in data, sometimes you want to use a string to represent an integer for easy reading and less error-prone.

:::tip
Constalias is supported from version v4.3.0.
:::

|Field|Type|Nullable|Description|
|-|-|-|-|
|name|string|No|Alias|
|value|string|No|Value|

### refgroup

refgroup is the syntactic sugar of DefaultSchemaCollector, which is used to represent a set of tables referenced by ref, and there is no corresponding object in the schema logical structure. The format is as follows:

| Field | Nullable | Default | Description                                                  |
| ----- | -------- | ------- | ------------------------------------------------------------ |
| name  | No       |         | Can be 1-n values, separated by commas ',', each value must be the full name of the table (such as item.TbItem, item.TbItem2) |
