# schema 逻辑结构

在[设计哲学](./architecture)文档已经介绍了，Luban的核心为完备的类型系统，而DPP管线则是强大的扩展能力的基础。
不同于旧版本Luban基本固定了配置表的定义格式，新版本的定义是独立的，不再与具体的定义格式绑定。尽管提供的默认
schema收集和加载器仍然处理与旧版本Luban类似的定义格式，但开发者可以完全自定义格式以满足实际项目的习惯。

本文档中只介绍schema的逻辑结构，具体的定义格式则由schema收集和加载器决定，在[配置定义](./schema)中介绍。

:::caution

由于schema的逻辑结构与实现分享。逻辑结构定义与实现中的定义不一定一致，由具体实现将它接受的定义格式转成最终的逻辑结构对应的定义。
如xml中有module的概念，而schema逻辑结构中每个类型有namespace，但没有单独的module结构。另外逻辑结构中的字段名与实现中的字段名不一定相同。

:::

## 全局配置

定义了类型系统或者生成依赖的全局信息。

### group

group定义了配置内可用的分组。实践中前后端需要的数据表和表内字段经常是不一样的，这种根据输出目标对输出内容的分类，对应luban内的概念为group。

|字段|类型|可空|描述|
|-|-|-|-|
|name|string|否|分组名|
|default|bool|否|是否为table的默认导出目标，即如果table的group为空，自动属于此分组|

group的name字段可以为任意值，但不要重复出现。取client这样的name也是可以的，但实践为了方便填写，一般是c、s这样的简单的单字符。

group的default字段对于enum、bean及field（bean的成员字段）不生效。

Luban的生成代码时，会从导出table出发，递归收集所有相关的enum及bean定义。
当enum和bean的group为空时，只有被导出表直接或者间接引用，才会标记它们为导出类型，为他们生成代码。如果手动设置了它们的group，不属于当前
导出目标，但它们被导出表间接引用时，会忽略group而强行导出。

如果field的group为空，则默认属于所有分组，不可配置。这是因为大多数field会属于所有分组，我们希望让field的
group都为空就能表示导出给所有目标，而不是啰嗦地设置它的分组为所有分组。

group有多个，一般项目至少包含c（即client）和s（即server）分组。如果项目有自定义配置编辑器，一般还会有一个额外的目标e（即editor）。
group的个数和命名没有限制，只不过约定俗成会这么设计。

### target

定义了导出目标。一般来说，对于客户端或服务器的导出，需要一些独有的配置信息，对应luban的概念为target。

|字段|类型|可空|描述|
|-|-|-|-|
|name|string|否|导出目标名|
|manager|string|否|生成的管理所有导出Table的管理类的名称，一般取Tables|
|groups|string[]|否|该输出目标包含哪些分组，可以为1到多个|
|topModule|string|是|类型额外的顶层命名空间，可以为空。当你想让生成的所有配置代码都在cfg命名空间下，不需要给每个enum、bean、table之类的命名空间都加上cfg前缀，让topModule为cfg即可|

## 自定义类型

### enum 

|字段|类型|可空|描述|
|-|-|-|-|
|namespace|string|是|命名空间|
|name|string|否|类型名|
|isFlags|bool|是|是否为标志位类型，对应c#的FlagsAttribute语义|
|isUniqueItemId|bool|否|枚举值是否唯一|
|comment|string|是|注释|
|tags|map,string,string|是|自定义tag对|
|groups|list,string|是|导出分组，可以为0到多个|
|items|list,EnumItem|是|枚举项列表|
|typeMappers|list,TypeMapper|是|外部类型映射相关配置|

groups、tags、typeMappers请阅读公共属性小节中的详细介绍。


EnumItem的定义如下：

|字段|类型|可空|描述|
|-|-|-|-|
|name|string|否|枚举项名|
|alias|string|是|别名|
|value|string|是|枚举值|
|comment|string|是|注释|
|tags|map,string,string|是|自定义tag对|

value如果为空，则自动从上一个枚举项值开始递增，如果是第一个枚举值，则值取0。value可以为10进制整数或者0x10之类的16进制整数。
value也可以是其他枚举值的或组合，如`A|B`。

### bean 

用于定义复合结构，对应于C#里的class或struct。

|字段|类型|可空|描述|
|-|-|-|-|
|namespace|string|string|是|命名空间|
|name|string|否|类型名|
|parent|string|是|父类名|
|isValueType|bool|是|是否为值类型，例如为c#这种支持值类型的语言生成代码时，生成struct而不是class类型，对于java这种语言没有效果|
|comment|string|是|注释|
|tags|map,string,string|是|自定义tag对，可以0到多个|
|alias|string|是|别名，主要用于英文不好的策划填写多态名，如Circle类也能填'圆'来表达|
|sep|string|是|默认字段分割符，用于excel中紧凑地填写复合结构，如在一个单元格内`1,2,3`表达一个vector3结构，而不是强行占据多个单元格。sep可以是多个字符，表示用sep中任意一个字符分割，而不是整个sep作为分割符|
|groups|list,string|是|导出分组，可以为0到多个|
|fields|list,Field|是|字段列表|
|typeMappers|list,TypeMapper|是|外部类型映射相关配置|

groups、tags、typeMappers请阅读公共属性小节中的详细介绍。

**bean支持继承和多态**。如果parent字段为非空，则表示继承该父类的字段。如果parent不包含命名空间，会从bean当前命名空间内查找该类型，否则全局查找。
所有补继承的bean都是抽象类，不可实例化。类型系统中允许使用抽象bean为类型，但埴写数据时，必须使用某个子类去实例化它。
这种多态特性使得luban具备表达任意复杂数据结构的能力。

Field的即bean的成员字段，定义如下：

|字段|类型|可空|描述|
|-|-|-|-|
|name|string|否|字段名|
|type|string|否|字段类型，详见[类型系统](./types)|
|comment|string|是|注释|
|tags|map,string,string|自定义tag对|
|NotNameValidation|bool|否|不检查字段名合法性|
|groups|list,string|是|分组|

groups详细说明请阅读公共属性小节的文档。

## table

table是数据表的逻辑表示。table并非类型，不能用于field的type定义。

|字段|类型|可空|描述|
|-|-|-|-|
|namespace|string|string|是|命名空间|
|name|string|否|类型名|
|index|string|是|索引字段列表，可为0到多个|
|mode|TableMode|是|表模式|
|valueType|string|否|记录类型|
|readSchemaFromFile|bool|否|是否从inputFiles中解析valueType定义|
|comment|string|是|注释|
|tags|map,string,string|是|自定义tag对，可以0到多个|
|groups|list,string|是|导出分组，可以为0到多个|
|inputFiles|list,string|否|输入的数据文件列表，不可为空|
|outputFileName|string|是|输出的文件名，如果为空，则取 `FullName.LowerCase().Replace('.', '_')`|

如果index为空，并且mode=map或空，则自动取valueType第一个字段为index。当table有多个主键时，如果是联合主键，则以'key1+key2+,,,+keyn'方式填写，如果是独立主键，
则以'key1,key2,,,keyn'方式配置。

TableMode为表模式枚举，可取one(或singleton)、map、list。留空则根据index决定具体mode值：如果index为空或1个主键则为map，index为valueType的第1个字段；
如果index为多个主键，则mode为list。

inputFiles指定了多个输入数据源，定义方式极其灵活。每个数据源可以是以下值：

- 来自某个excel文件的所有单元薄。例如 xxx.xlsx
- 来自某个excel文件的指定单元薄。例如 sheet@xxx.xlsx
- 来自json、xml、lua、yaml、unity scriptable asset文件。例如 xx.json或xx.xml或xx.lua或xx.yml
- 来自json、xml、lua、yaml、unity scriptable asset子字段。 例如 *items@item_module.json或item.consts@item_module.json之类，其他格式同理
- 来自目录。目录树下所有文件（包含递归子目录）都会被当作数据源读入，每个文件(excel族例外)对应一个记录。例如 skill_json_dir
- 以上的随意组合。如  xx.xlsx,sheet2@yy.xls,abc@zz.json,ccc_dir

## 公共属性

### groups

由导出table的valueType计算出所有直接或者间接引用的类型（enum和bean），称之为默认导出集合。如果某个类型在默认导出集合内，即使它的groups不属于当前导出目标，也会被导出。

field（bean的字段列表）没有默认导出集合的概念，如果groups为空，则导出给所有分组。

### tags

tags主要有两个用途：[校验器](./validator)和特殊代码生成。

有时候想对某个类型生成一些特殊代码时，可以给该类型添加一些特殊tag属性，然后在代码模板中根据tag属性值作特殊处理。这种机制不常用，但有时候很有用。
has_tag函数用于检查是否有某个tag, get_tag用于获得某个tag对应的值，具体请看模板相关文档。

### typeMapper

有时候你希望生成的代码中能直接使用现成的结构类型，而不是使用生成的类型代码。例如vector3是非常常见的类型，你在配置中定义了vector3后，可能希望生成的C#代码中涉及到
vector3类型的地方能直接使用UnityEngine.Vector3，而不是生成的vector3类。Luban支持这种外部类型映射机制，可以将配置类映射到外部现成的enum或者class类型。

|字段|类型|可空|描述|
|-|-|-|-|
|targets|list,string|否|匹配的输出目标，此target即为全局定义中的target|
|codeTargets|list,string|否|匹配的代码目标|
|options|map,string,string|生成需要的参数|

实际项目中，服务器和客户端的语言可能不一样，有可能客户端需要对某个类型映射，而服务器不需要。targets和codeTargets即用来处理这种情形，只有target和codeTarget
都匹配时，才会对生成的代码作类型映射。

options应该有哪些参数，完全由具体的CodeTarget决定，不同的codeTarget需要的参数不同。

