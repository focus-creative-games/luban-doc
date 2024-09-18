# Field Variants

Sometimes the same field may have multiple configurations. A very common scenario is that when making localized data, different regions have different values ​​for a certain initial path.

A rough approach is like this:

|##var|id|item_id|item_id_zh|item_id_en|
|-|-|-|-|-|
|##type|int|int|int|int|
||1|1001|2001|3001|
||2|1002|2002|3002|

Although this does work, there are several problems:

- For a certain region (such as zh), it does not need item_id in other regions, which will increase the configuration data and increase unnecessary memory overhead

- The programmer needs to choose to read data from item\_id_zh or item\_id_en according to the current region, which is inconvenient

Field variants solve this problem better. Regardless of the region, item\_id\_{xxx} will eventually be exported as a common item\_id field, and will not include other unused item\_id\_{yyy}.

## Definition

Currently, only fields support variants. Variant information can be defined in all places where fields can be defined.

### XML definition

```xml
<bean name="TestVariant">
<var name="id" type="int"/>
<var name="value" type="int" variants="zh,en,fr,jp"/>
</bean>
```

### Define in \_\_beans\_\_.xlsx

![variant_beans](/img/variant_beans.jpg)

### Define in the header row of the data table

For fields that need to define variants, define a variable of `{fieldName}@{variant}` for each variant. There are several rules:

- The column where the variant header is located must be after the variable name column, that is, `value@en` must be after the `value` column

- There is no need to define information such as `type` and `group` for variant variables. Variant variables directly use the corresponding values ​​of the original variables, that is, the `type` of `value@en` will take the `type` of `value`.

![variant_table_header](/img/variant_table_header.jpg)

## Configure variant data

### excel format family

![variant_table_header](/img/variant_table_header.jpg)

### json format

```json
{
"id":1,
"value@en": 1001
}

```

### xml format

```xml
<data>
<id>1</id>
<value variant="en">1001</value>
</data>
```

### yaml format

```yml
id: 1
value@en: 1001
```

### lua format

```lua
return {
id=1,
["value@en"] = 1001,
}
```

## Exporting data

Generally speaking, since a variable variant is defined, the variant that should be used should be specified for the variable when exporting data. The command parameter `--variant {variantKey}={variantName}` is used to specify the currently used variant for the field.`{variantKey}` is `{beanFullName}.{fieldName}`, `{variantName}` is the variant name. For example, `--variant TestVariant.value=en` means that when exporting data, the value field takes the value corresponding to the `value@en` column.

After specifying the currently used variant for a variable, if the corresponding field does not exist, the value of the default field is taken. Similarly, taking variant en as an example, if the `value@en` column does not exist, the value of the `value` column is taken. If the `value` column does not exist either, an error that the field cannot be found is thrown.

If a field has a variant defined, but the variant name used by the field is not specified using `--variant` in the command line, the value of the original variable without the variant is read. At this time, Luban will print a warning log.