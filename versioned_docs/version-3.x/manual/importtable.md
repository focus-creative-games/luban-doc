# 自动导入table

每新增一个表都在__tables__.xlsx中添加一项，这个工作令人烦琐。大多数情况下，每个excel对应一个表，让工具自动添加表定义是可能的。

自v3.0.0版本起，支持自动table导入。luban会按照指定的规则扫描excel文件，自动导入对应的table。注意，并不会将该表的信息添加到`__tables__.xlsx`文件中。

## 默认的TableImporter

默认TableImporter为DefaultTableImporter，对应名称为default。如果不指定`-x tableImporter.name`参数，则自动取DefaultTableImporter。

### 默认扫描规则

DefaultTableImporter将扫描luban.conf目录下（包含子目录）所有文件名以#开头的excel族（xls、xlsx、xlm、csv）文件，如 `#Item.xlsx`、`reward/#Reward.xlsx`。
以除去开头的'#'字符及文件后缀后的字符串作为表的valueType，在valueType名上新增Tb作为表的全名，如果excel文件在子目录下，则会将子目录作为命名空间。举例如下：

- `#Item.xlsx` 生成 full_name为TbItem，value_type为Item，mode=map的表
- `reward/#Reward.xlsx`生成full_name为reward.TbReward，value_type为reward.Reward，mode=map的表
- `item/equip/#Equip.csv`生成full_name为item.equip.TbEquip，value_type为item.equip.Equip，mode=map的表

### 自定义导入规则

引入几个定义：

|变量|定义|
|-|-|
|RawFullName|文件所有目录的相对路径转成命名空间（路径中'\'或'/'替换为'.'）再拼上tableImporter.filePattern正则项中第一个Group的值。以`filePatter=#(.*)`、文件名为`#Item.xlsx`为例，RawFullName为Item；以文件名为`item/#Item.xlsx`为例，RawFullName为item.Item|
|RawNamespace|RawFullName中的命名空间，如RawFullName为item.Item，则RawNamespace为item|
|RawName|RawFull中的类名，如RawFullName为item.Item，则RawName为Item|

自定义规则相关的配置参数：

|参数|必选|描述|示例|
|-|-|-|-|
|tableImporter.name|否|TableImporter名称，默认实现DefaultTableImporter，名称为default。如果取none则禁用自动导入|-x tableImporter.name=default|
|tableImporter.filePattern|否|自动导入的文件名规则（不含文件名后缀），格式为C#的正则表达式字符串。默认为#(.*)|-x tableImporter.filePattern=!(.*)|
|tableImporter.tableNamespaceFormat|否|table命名空间的格式化字符串，默认值为`{0}`，即直接取RawNamespace|-x tableImporter.tableNamespaceFormat=My{0}|
|tableImporter.tableNameFormat|否|table类名的格式化字符串，默认值为`Tb{0}`，即取Tb拼上RawName|-x tableImporter.tableNameFormat=Cfg{0}|
|tableImporter.valueTypeNameFormat|否|value_type类名的格式化字符串，默认为`{0}`，即取RawName。但如果table的命名空间存在，会再自动拼上命名空间。|-x tableImporter.valueTypeNameFormat=Va{0}|

## 实现自定义的TableImporter

如果默认的TableImporter不能满足需求，也可以实现定义的TableImporter。参照`src/Luban.Schema.Builtin/DefaultTableImporter.cs`的实现即可。

## 限制

自动导入table只能满足常见的规则，对于比较复杂的输入数据源，请手动在__tables__.xlsx中添加。

有以下限制：

- 不支持多个数据源，即不支持多个excel文件导出为一个表，例如不支持 `#Item_1.xlsx`、`#Item_2.xlsx`自动导出为一个表
- 不支持sheet导出为一个表，例如不支持`Item.xlsx`中的equip单元薄自动导出为一个表
- 只支持map模式，不支持one、index模式
