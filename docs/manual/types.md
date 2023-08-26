# 类型系统

Luban有完备的类型系统，尤其是**bean支持类型继承和多态**，使得Luban可以轻松表达任意复杂的数据结构。

## 基本类型

|类型|描述|
|-|-|
|bool| bool类型，`true、false、0、1`都能被识别，大小写不敏感，如`True、TRUE`也是有效值|
|byte| 对应c#的byte（uint8_t）|
|short| 对应c#的short（int16_t）|
|int| 对应c#的int （int32_t）|
|long | 对应c#的long （int64_t）|
|float | 对应c#的float|
|double| 对应c#的double|
|string| 对应c#的string|
|text|text是一个语法糖类型，而不是独立的类型。等价于`string#text=1`，即包含tag `text=1` 的string类型。luban会对该类型数据校验本地化key的合法性|
|datetime| 类型为c#里的long，值为自UTC 1970-01-01 00:00:00以来的秒数|

## 自定义类型

查看[schema逻辑结构](./schema)了解自定义结构的详细设计。

|类型|描述|
|-|-|
|enum |枚举类，对应c#的enum|
|bean|复合类型，对应c#的class或struct。bean支持**类型继承和多态**|

## 容器类型

|类型|描述|
|-|-|
|array| 对应c#的数组，定义方式为`array,<eleType>`，eleType不能为可空类型|
|list| 对应c#的List，定义方式为`list,<eleType>`，eleType不能为可空类型|
|set| 对应c#的HashSet，定义方式为`set,<eleType>`，eleType不能为可空类型|
|map| 对应c#的Dictionary，定义方式为`map,<keyType>,<valueType>`。keyType只能为基本类型或enum类型，keyType与valueType都不能为可空类型|

## 可空类型

基本类型和自定义类型都支持可空类型，容器类型不支持可空，容器的key或value类型也不支持可空。定义方式为`<类型>?`（如`int?`,`Color?`，与c#的语法相同。

## 类型映射

支持将自定义类型映射到外部现成的类型，例如将MyAccessMode枚举类映射到 System.IO.AccessMode类型；将MyVec3类型映射到UnityEngine.Vector3类型。
生成的代码中所有自定义类型都会映射到外部类型，使用更方便。

## 特殊类型 table

为大多数语言生成代码时会为每个table生成一个类，管理这个表的所有数据。

## 特殊类型 tables

为大多数语言生成代码时会包含一个所有表的管理类，类名在全局schema的target.TopModule字段定义。一般取名为Tables。

