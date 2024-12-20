# 字段变体（Variants）

有时候同一个字段可能有多个配置。一个非常常见的场景是制作本地化数据时，不同地区的某个初始道具有不同的值。

一个粗糙的做法类似这样：

|##var|id|item_id|item_id_zh|item_id_en|
|-|-|-|-|-|
|##type|int|int|int|int|
||1|1001|2001|3001|
||2|1002|2002|3002|

虽然这样确实可以工作，但有几个问题：

- 对于某个地区（如zh）来说，它并不需要其他地区的item\_id，这个会增大了配置数据，也增加了无谓的内存开销
- 程序员需要根据当前地区，选择从 item\_id\_zh 还是 item\_id\_en读取数据，这带来不便

字段变体较好地解决了此问题。无论是哪个地区的item\_id\_{xxx}，最终都会导出为一个公共的item\_id字段，并且不包含其他用不到item\_id\_{yyy}。

## 定义

当前只有字段支持变体，所有可以定义字段的地方都可以定义变体信息。

### xml定义

```xml
    <bean name="TestVariant">
        <var name="id" type="int"/>
        <var name="value" type="int" variants="zh,en,fr,jp"/>
    </bean>
```

### 在 \_\_beans\_\_.xlsx中定义

![variant_beans](/img/variant_beans.jpg)

### 在数据表的标题行定义

对于需要定义变体的字段，为每个变体定义一个`{fieldName}@{variant}`的变量。有几个规则：

- 变体标题头所在的列必须在变量名列之后，即 `value@en`必须在`value`列之后
- 不需要为变体变量定义`type`及`group`之类信息，变体变量直接使用原始变量相应的值，即`value@en`的`type`会取`value`的`type`。

![variant_table_header](/img/variant_table_header.jpg)


## 配置变体数据

### excel格式族


![variant_table_header](/img/variant_table_header.jpg)

### json格式

```json
{
    "id":1,
    "value@en": 1001
}

```

### xml格式

```xml
<data>
    <id>1</id>
    <value variant="en">1001</value>
</data>
```

### yaml格式

```yml
id: 1
value@en: 1001
```

### lua格式

```lua
return {
    id=1,
    ["value@en"] = 1001,
}
```

## 导出数据

一般来说，既然定义了变量变体，导出数据时应该为该变量指定当前应该使用的变体。命令参数`--variant {variantKey}={variantName}`用于为字段指定当前使用的变体。
`{variantKey}`为`{beanFullName}.{fieldName}`, `{variantName}`为变体名。 例如`--variant TestVariant.value=en`表示导出数据时value字段取`value@en`列对应的值。

在为某个变量指定了当前使用的变体后，如果对应的字段不存在，则取默认字段的值。同样地，以变体en为例，如果`value@en`列不存在，则取`value`列的值，如果`value`列也不存在，则抛出字段找不到的错误。

可以使用`--variant default={variantName}`设置全局默认变体，当未没有为某个bean单独设置变体时，则取全局默认变体。

如果某个字段定义了变体，但没有在命令行中使用`--variant`指定该字段使用的变体名，则读取不含变量的原始变量的值。此时Luban会打印一行警告日志。


