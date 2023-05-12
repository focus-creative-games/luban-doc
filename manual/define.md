# 介绍

定义由两类文件构成

- 根定义文件
  文件名一般为root.xml或者 \_\_root\_\_.xml。包括topmodule,branch,group,import,service等等设置项。
- 子定义文件
  包含配置表相关的定义。包括table, bean, enum定义。配置表定义既可以在xml中配置，也可以在excel文件中定义，每个项目可根据偏好自由选择，甚至可以同时存在。

## 根定义文件

root.xml是定义的根文件，luban从root.xml直接和间接获得所有的定义相关数据。root.xml中定义了一些生成的设置参数，以及通过import和importexcel
指明了具体的配置表定义相关的定义文件。

root.xml包含以下设置项：

## topmodule

指定了顶层命名空间。为会所有生成的代码类添加此顶层命名空间，避免生成的代码与其他其他代码产生定义冲突。

topmodule参数可选，默认为空。不过一般推荐值为cfg。

```xml
<topmodule name="cfg"/>
```

## option

指定一些额外的自定义选项或参数。 option可以有0到多个。

```xml
  <option name="platform" value="win"/>
  <option name="editor.topmodule" value="editor.cfg"/>
```

name和value都是必选参数。

option参数能在代码与数据scriban模板中访问。

- has_option 'xxx' 检查是否存在对应选项。
- get_option 'xxx' 获得某个选项对应的value值。
- get_option_or 'option_name' 'default_value" 获取某个选项的值，如果不存在，则取默认值

目前已经定义了一些内部option

- editor.topmodule cs_unity_editor_json生成的代码的顶层命名空间，默认为 editor.{top_module}
- cpp_bin.output_all_types_file cpp_bin 输出的包含所有类型的文件的名称，默认gen_types.h
- cpp_bin.type_per_stub_file cpp_bin 每个stub文件包含的类型个数。默认100
- cpp_bin.stub_file_name_format cpp_bin stub文件的格式。默认 gen_stub_{0}.cpp
- cpp_ue_editor_json.type_per_stub_file cpp_ue_editor_json 每个stub文件包含的文件个数，默认200
- cpp_ue_editor_json.stub_file_name_format cpp_ue_editor_json的stub文件名格式，默认gen_stub_{0}.cpp


## patch

用于本地化，制作有细微区别的多地区配置数据。可以有0个或者多个。

```xml
<patch name="cn"/>
<patch name="en"/>
```

## group

实际项目中往往需要为某此table或bean中的字段指定只对服务器或客户端导出，分组机制用于解决这个问题。目前支持两种粒度的分组:表级别分组和字段级别分组。

group用于定义一个分组，配置表定义中指定的分组必须为这些在root.xml提前定义好的分组。可以有0到多个分组，实际的游戏项目中，一般至少会定义c,s这两个分组。

name的值可以有多个，以','分割，填写分组名时，其中任意一个值都可以代表这个分组。例如`name="c,cleint"`，这是为了方便填写分组名，毕竟写c比client更不容易写错 。

default参与用于表示 如果table未指定group，是否默认属于此分组。 default=1表示未设置group属性的table，默认属于此分组。

```xml
<group name="c,client" default="1"/>
<group name="s,server" default="1"/>
<group name="e" default="1"/>
```

## import

导入xml格式的子定义文件。即可以是具体的某个xml文件，也可以是目录（自动遍历该目录树，加载所有xml定义）。可以有0到多个。

```xml
<import name="item.xml"/>
<import name="."/>
```

## importexcel

导入excel格式的子定义文件。与xml定义文件不同，xml定义文件中可以同时包含enum、bean、table定义，而excel格式的定义文件，相应分enum,bean,table
三种类型，每种类型的文件只能定义一种结构。 每个类型的定义文件都可以有0到多个。

- name属性指定了导入的excel定义文件名，注意，理论上为了统一，excel定义文件应该放到定义目录下，但为了照顾大多数使用者的习惯，定义文件的
查找路径为--input_data_dir 选项指定的目录。

- type属性指明了定义类别。可取 enum,bean,table。

```xml
<importexcel name="bean.xlsx" type="bean"/>
<importexcel name="enum.xlsx" type="enum"/>
<importexcel name="table.xlsx" type="table"/>
```

## externalselector

外部类的选择器，可以有多个。选择器用于指示对于某个定义了externaltype的类，选择哪个mapper。

例如你定义了Color类，你可以定义在selector为unity的情况下，将Color类映射为UnityEngine.Color类，方便使用。而服务器没有
指定selector参数，则仍然使用生成的Color类。

```xml
<externalselector name="unity"/>
<externalselector name="cocos"/>
```

## service

service为导出目标。命令行参数中的 -s(--service)参数即指它。项目一般至少会包含client和server及all这三个导出目标。

- name 表示service名。可以任意定义。
- manager表示生成的包含所有表的Tables类的名称。一般取Tables。
- group 表示导出目标中包含哪些分组。
- server.ref 用于强行引用某些类。并非所有定义的类型都会生成代码，默认只有被导出的table直接或者间接引用的类型才会生成。如果想导出一个没被table引用，但又想为它生成代码
的类型，可以在 ref里指定强行引用。例如下面示例中 xxx.ServerOnlyType1和xx.ServerOnlyEnum1一定会导出。

```xml
<service name="server" manager="Tables" group="s">
    <ref name="xxx.ServerOnlyType1"/>
    <ref name="xxx.ServerOnlyEnum1"/>
</service>
<service name="client" manager="Tables" group="c"/>
<service name="all" manager="Tables" group="c,s,e"/>
```

## xml 子定义文件

可以包含module,bean,enum,table这些定义。

典型的表定义如下：

```xml
<module name="item">
   <enum name="xxx">

   </enum>

   <bean name="yyyy">
   
   </bean>

   <table name="Tbzzz" value="xxx" input="abc.xlsx"/>
</module>
```

## module 定义

name属性为模块名。可以为空，也可以为多级模块名，如xx.yy。模块中可以嵌套定义子模块，子模块会继承父模块的命名空间。在模块中定义的类型，命名空间为模块全名。
如下面的Abc类，全名为 xx.yy.Abc，而Def类的命名为xx.zz.Def。

```xml
<module name="xx">
   <module name="yy">
     <bean name="Abc"/>
   </module>
   <module name="zz">
     <bean name="Def"/>
   </module>
</module>
```

## refgroup 定义

定义一个ref组。有时候很多字段都会引用到共同的一组表，使用refgroup比较方便，修改时不需要改多处。

```xml
<refgroup name="xxx" ref="xx.Tbxx,yy.Tbyy,..."/>

```

- refgroup.name 。必选。引用组名。需要全局唯一，不包含模块名。
- refgroup.ref 。必选。引用的表名。格式与 ref检验器完全相同。

## enum 定义

定义一个枚举。格式如下

```xml
<enum name="Color">
    <var name="RED" alias="红" value="1"/>
    <var name="GREEN" alias="绿" value="2"/>
   <var name="BLUE" alias="蓝" value="3"/>
</enum>

<enum name="AccessMode" flags="1" tags="key1=value1#key2=value2" comment="访问方式" unique="1">
    <var name="READ" value="1" tags="key1=value1#k2=v2" comment="读"/>
    <var name="WRITE" value="2"/>
    <var name="READ_WRITE" value="READ|WRITE"/>
</enum>
```

语法介绍:

- enum.name 。必选。枚举名。 命名空间为当前module的完整命名空间（包含父module)。
- enum.flags。可选。是否为bit标志位类型。默认为false。 如果为1或true,则填写配置数据时，允许使用 READ|WRITE 这种写法
- enum.tags。 可选。标签。格式为"key1=value2#key2=value2#..."。 一般配合自定义模板生成时才可能会用到。详细参见 **定义标签** 这一节。
- enum.unique。可选。枚举值是否唯一。默认为true。
- enum.comment。 可选。注释。 如果非空，生成代码时会包含注释。
- enum.var.name 必选。枚举名。
- enum.var.alias 可选。别名。 策划填写数据时，可以填别名，方便一些英语不好的策划。
- enum.var.value 可选。枚举值。如果不填，则值为上一个枚举项的值+1。 如果是第一个枚举项，则值为0.
- enum.var.tags 可选。标签。 一般配合自定义模板生成时才可能用上。 详细参见 **定义标签** 这一节。
- enum.var.comment 可选。注释。 如果非空，生成枚举项时会包含注释。如果为空，又定义了alias，则会取alias为注释。

策划在配置表中，可以填枚举对应的 枚举项名，别名或者相应的整数值 来表达这个枚举，**强烈建议不要使用整数值**。

## bean 定义

定义一个结构类型。结构类型又分两种，普通结构和多态结构。

### 普通格式

必须包含至少一个字段（不允许字段数为0，避免list,bean之类的数据 无限读入的情况）。格式如下：

```xml

<bean name="Item" sep="," parent="">
   <var name="item_id" type="int" ref="item.TbItem"/>
   <var name="num" type="int" group="s"/>
   <var name="icon" type="string" path="unity"/>
   <var name="desc" type="string" tag="a=1#b=2"/>
</bean>
```

- bean.name 结构名。 不能包含命名空间，例如 abc.Item是不允许的。
- bean.parent 继承的父类名。 可选参数。默认为空。 可以继承其他模块的类型，此时parent必须写全名。
- bean.sep 可选参数。 指定在excel数据源中，该结构以复合模式填写，例如 MyIntVector3包含x,y,z三个int字段，通过sep=","，则所有读取MyIntVector3时，都会将读入的
字符串用','拆分为三个整数，再读入。
- var.name 字段名。 没有特别的要求，不过推荐使用xx_yy_zz这样的名称，因为生成代码时，默认会根据语言生成符合语言推荐代码风格的字段名。 有一些名字被保留不允许使用，如base,end,if之类，因为它们在一些语言里保留字或关键字，如果误用了这种名字，会有编译错误。
- var.type 类型名。参见后面的**类型定义**这一节。
- var.group 所属分组。可选。可以多个，以','分割，每个值必须是root.xml中定义的group中的一个，如不填，则该字段属于所有分组。 详细参见后面**分组导出**这一节。
- var.ref 表引用。可选。指向一个表全名或者一个**refgroup**。会检查此字段是否为某个表的有效id。可以避免策划填错。 详细参见 **processor**这一节。
- var.path 资源引用。可选。指向一个资源名。 会检查此字段是否指向有效的资源，避免策划填错而产生运行时错误。 详细参见 **processor**这一节。
- var.tag 字段tag。可选。格式为 tag="tag1=xxx#tag2=bb#tag3=ccc"。用于为字段添加一些tag。主要用于自定义代码生成时对一些字段特殊处理。 详细参见**定义标签**这一节。

### 多态结构

除了像普通结构那样定义自身的子字段外，也可以在定义的最后，包含1到多个子结构。类似OOP的概念，子结构会继承父结构的所有字段。子结构既可以是普通
结构，也可以是多态结构。允许任意继承层次的多态结构定义。

```xml
<bean name="Parent" >
   <var name="xxx" type="int"/>
   ... 更多父类的字段
   <bean name="Child11">
       <var name="x1" type="int"/>
       ... 更多 Child11 的字段

       <bean name="Child21">
         ... 更多 Parent21 的字段
       </bean>
       <bean name="Child22">
         ... 更多 Child22 的字段
       </bean>

       ... 更多 Parent11 的直接子类
   </bean>
   
  <bean name="Child12">
   ... Child12 的字段
  </bean>
</bean>

在外部定义继承
<bean name="Child31" parent="Parent">
  <var name="a" type="float"/>
  <var name="b" type="float"/>
</bean>

<module name="inner_module">
  可以从其他模块的父类继承，要求parent写全名。
  <bean name="Child41" parent="test.Parent">
    <var name="a" type="float"/>
  </bean>
</module>
```

## table 定义

定义一个表。 格式如下：

```xml
<table name="TbTableName" value="value_type" define_from_file="0" mode="map" input="file1,file2,..." group="group1,group2,..."/>
```

- name。表名。无限制。但推荐用TbXxxx的格式。
- value。 表记录的结构类型名。
- define_from_file 是否从文件中读取表记录value的定义。 可选。默认为false
- mode。 表模式。可选，默认为map。目前支持三种模式的表。
  - map。 普通key-value表;
  - list。 列表形式的表。但它支持0到多个索引，并且支持多主键联合索引及多主键独立索引。
  - singleton。 为单例表，适合用于定义一些全局信息。
- input。表数据源。可以有多个，以','分割。每个数据源可以是文件，目录，xlsx中的某个单元薄，json中的某个字段，等等。
- group。 表分组。 可选。值可以多个，以','分割，每个值必须为root.xml中定义的group中的一个。 如不填，则此表属于 root.xml中定义的group中default=1的分组。

### table的mode详细介绍

接上面table定义中关于mode的描述。 因为较关键，独立介绍。

- mode=map 。普通key-value表，如果未定义mode和index，则默认为普通表，并且取value_type的第一个字段为key。

定义表

```xml
<table name="TbNormalMap" value="NormalMap" index="key1" input="normal_map.xlsx"/>
```

示例数据表

|##var|key1|x|y| num|
|-|-|-|-|-|
|##type|int|long|string|int|
||1|1|aaa|123|
||2|1|bbb|124|
||3|2|aaa|134|
||4|1|aaa|124|
||5|6|xxx|898|

- mode=singleton。 单例表，即只有一个记录的表，没有，也不能定义index属性。 为了方便起见，也可以写成mode="one"之类。

定义表

```xml
<table name="TbSingleton" value="Singleton" mode="singleton" input="singleton.xlsx"/>
```

|##var| guild_open_level | bag_init_capacity | bag_max_capacity | newbie_tasks |
| - |- | - | - | - |
| ##type | int | int | int | list,int|
| ## |desc1 | desc 2 | desc 3 | desc 4 |
| | 10 | 100| 500| 10001,10002 |

- mode=list，key个数为0。 无主键列表模式。

定义表

```xml
<table name="TbNotKeyList" value="NotKeyList" mode="list" input="not_key_list.xlsx"/>
```

示例数据表

|##var|x|y|z| num|
|-|-|-|-|-|
|##type|int|long|string|int|
||1|1|aaa|123|
||1|1|bbb|124|
||1|2|aaa|134|
||2|1|aaa|124|
||5|6|xxx|898|

- mode=list, 联合多主键模式。 key个数 >= 2。
多个key构成联合唯一主键。使用"+"分割key，表示联合关系。

定义表

```xml
<table name="TbUnionMultiKey" value="UnionMultiKey" index="key1+key2+key3" input="union_multi_key.xlsx"/>
```

示例数据表

|##var|key1|key2|key3| num|
|-|-|-|-|-|
|##type|int|long|string|int|
||1|1|aaa|123|
||1|1|bbb|124|
||1|2|aaa|134|
||2|1|aaa|124|
||5|6|xxx|898|

- mode="list", 独立多主键模式。key个数>=1， 使用","分割key，表示独立主键模式，即每个key都是独立唯一索引。

定义表

```xml
<table name="TbMultiKey" value="MultiKey" index="key1,key2,key3" input="multi_key.xlsx"/>
```

示例数据表

|##var|key1|key2|key3| num|
|-|-|-|-|-|
|##type|int|long|string|int|
||1|2|aaa|123|
||2|4|bbb|124|
||3|6|ccc|134|
||4|8|ddd|124|
||5|1|eee|898|

### table.input 数据源详细介绍

table的input属性指定了数据源，允许多个，以","分割。支持非常灵活的数据源定义：

- 来自某个excel文件的所有单元薄。例如 xxx.xlsx
- 来自某个excel文件的指定单元薄。例如 sheet@xxx.xlsx
- 来自json、xml、lua、yaml、unity scriptable asset文件。例如 xx.json或xx.xml或xx.lua或xx.yml
- 来自json、xml、lua、yaml、unity scriptable asset子字段。 例如 *items@item_module.json或item.consts@item_module.json之类，其他格式同理
- 来自目录。目录树下所有文件（包含递归子目录）都会被当作数据源读入，每个文件(excel族例外)对应一个记录。例如 skill_json_dir
- 以上的随意组合。如  xx.xlsx,sheet2@yy.xls,abc@zz.json,ccc_dir

## processor

对于类型，可以附加processor元数据。processor有两个用途：

- 校验器。如 ref,path,range,set,size。
- 特殊的注解。如sep 等等。
- tag定义。 除了以上两种以外的名字，都会被当作tag处理。

### 校验器

格式为 processor1=value1#processor2=value2 ...

目前支持的检验器有ref,path,range,set,size，详细请参见文档 [数据校验器](/luban/advanced/validator/)。

### 特殊注解

用于指示luban的对数据作特殊处理。目前支持有注解器有

- sep 分割器,格式为 sep=字符列表 。只能用于加载excel数据。指示将读入的下一个单元格（或者下一个字符串），用sep中的任意一个字符分割成多个子数据，再将这些子数据作为一个当前类型的数据读入。 一般来说，只有容器类型和bean类型及text这种带有多个原子数据的类型才可能用得到sep。

## 定义标签

定义的所有processor=value数据对，都会被维护成 k-v tags字典。 tag目前主要用于自定义代码或者数据的模板生成，当想对某些字段作特殊处理时，tag可以发挥作用。

scriban模板文件中提供了两个函数可以操作tag。

::: v-pre

- {{has_tag ctype 'tag_name'}}  。 检查类型是否有某个tag
- {{get_tag ctype 'tag_name'}} 。 返回类型的tag对应的值，如不存在则返回空。
:::

## 数据标签

注意与定义标签不同。定义作用于结构，字段，表等等定义上，数据标签作用于记录。详细文档见 [**tag**](/luban/tag/)

目前数据标签有几个用途：

- 记录过滤

为记录添加tag,可用于过滤导出之类的场合。比如，对于标识了dev或者debug的数据，正式发布时，可以用 --output:exclude_tags dev,test 过滤掉这些数据。

- unchecked 标记

标识不对该记录执行校验器。研发中有时候策划批量做了一批临时数据，很多引用都不合法，程序暂时也用不到，导致生成时有大量警告，通过给数据添加unchecked的方式，
可以让检验器不检查这些记录的数据合法性。

## 分组导出 group

目前支持两种粒度的分组导出：table级别和bean字段级别。table定义和 bean的field定义都支持group属性。

- table 级别导出
table的group属性如果不指定，则默认对所有group.default=1的分组导出，如果指定，则只对指定分组导出。可以有多个分组。

xml格式定义如下

```xml
<table name="TbClothDisplay" value="ClothDisplay" group="c" input="test/cloth.xlsx"/> 此表只属于c分组
<table name="TbItem" value="Item" group="c,s" input="test/item.xlsx"/> 此表属于c,s分组
<table name="TbWidget" value="Window" group="e" input="test/widget.xlsx"/> 此表只属于e分组
```

xlsx格式定义如下

|##var| full_name| value_type| input| group | ... |
| - | - | - | -| - | - |
| | TbClothDisplay|ClothDisplay| cloth/cloth.xlsx |c||
||TbItem|Item|item/item.xlsx|c,s||
||TbWidget|Widget|ui/widget.xlsx|e||

Luban.Client使用 -s client 参数时，只导出TbDemoGroup_C和TbDemoGroup_CS表，而TbDemoGroup_E表不会导出。

- bean的field级别导出

导出配置时，bean中某个field根据分组导出。

xml定义格式如下：

```xml

<bean name="DemoGroup">
 <var name="id" type="int"/>
 <var name="x1" type="int"/> 默认属于所有分组c,s,e
 <var name="x2" type="int" group="c"/>属于 c 分组
 <var name="x3" type="int" group="s"/>属于s分组
 <var name="x4" type="int" group="c,s"/>属于c,s分组
</bean>
```

如果在 \_\_bean\_\_.xlsx 中定义bean，格式如下
|##var|full_name|sep|comment| field.name |fields.type|field.group|...|
|-|-|-|-|-|-|-|-|
||DemoGroup|||id|int|||
|||||x1|int|||
|||||x2|int|c||
|||||x3|int|s||
|||||x4|int|c,s||

如果直接在数据表里定义的bean结构，格式如下
|##var|id|x1|x2|x3|x4|
|-|-|-|-|-|-|
|##type|int|int|int&group=c|int&group=s|int&group=c,s|
|| 1|2|2|2|2|

当 -s client 时， id、x1、x2、x4字段导出。
当 -s server 时， id、x1、x3、x4字段导出。

## 外部类型

enum和bean类型都支持支持外部类型，可以将某个自定义类型，映射到现成的一个类。目前只支持c#语言的外部类型，其他语言需要时再扩展。

如你可以定义一个AudioType，映射到UnityEngine.AudioType。

如你可以定义一个Color类，映射到UnityEngine.Color类。

定义如下

```xml

外部枚举定义

    <enum name="AudioType">
        <var name="UNKNOWN" value="0"/>
        <var name="ACC" value="1"/>
        <var name="AIFF" value="2"/>
    </enum>
    
    <externaltype name="unity_audio_type" origin_type_name="test.AudioType">
        <mapper lan="cs" selector="unity_cs">
            <target_type_name>UnityEngine.AudioType</target_type_name>
        </mapper>
    </externaltype>

外部class定义

    <bean name="Color" sep=",">
        <var name="r" type="float"/>
        <var name="g" type="float"/>
        <var name="b" type="float"/>
        <var name="a" type="float"/>
    </bean>
    <externaltype name="unity_color" origin_type_name="test.Color">
        <mapper lan="cs" selector="unity_cs">
            <target_type_name>UnityEngine.Color</target_type_name>
            <create_external_object_function>ExternalTypeUtil.NewFromCfgColor</create_external_object_function>
        </mapper>
    </externaltype>
```

语法介绍：

- externaltype.name。必选。外部类型名。这个类型名并不是真实的名字，类似id的概念。需要所有定义文件内唯一。它不会自动加上模块名。
- externaltype.origin_type_name。 必选。被映射的类型**全名**。
- externaltype.mapper 映射器。 由于对于一个类，有些语言需要映射，有些语言可能不需要映射，另外，每个语言的映射参数都不一样。所以可能会有多个。
- mapper.lan 。必选。只对该语言生效。需要与selector配合形成唯一mapper。
- mapper.selector。 必选。 只对该selector生成。需要与lan配合形成唯一mapper。
- mapper.target_type_name 必选。映射的外部类型全名。
- mapper.create_external_object_function 映射外部enum时可选，外部class时必选。转换函数名。需要提供一个函数，用来将配置类对象转换到外部类对象。

使用示例，可参见示例项目 [Csharp_Unity_bin_ExternalTypes](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_bin_ExternalTypes)

## 类型

luban有非常完备的类型系统，可以轻松表达任意复杂的数据结构。

### 原生类型

- bool
- byte(int8)
- short(int16)
- fshort
- int(int32)
- fint
- long(int64)
- flong
- float(float32)
- double(float64)
- string

### bytes 类型

即字节数组类型。在c#中对应byte[]

### vector2,vector2,vector3

内置的向量类型。 在c#语言中对应System.Numerics.Vector{2,3,4}，或 UnityEngine.Vector{2,3,4}。

- vector2 。 float x, y;
- vector3 。 float x, y, z;
- vector4 。 float x, y, z, w;

### datetime (time) 类型

时间类型。导出数据后，会转换为int类型1970-1-1 0:0:0 以来的UTC时间秒数。

由于策划填的都是 墙上时间（时期跟时区相关），所以导出时需要指定 datetime所对应的时区，不指定则默认使用东8区时区。
参见 [Luban 命令行](/manual/commandtools.md) 中关于时区相关的参数介绍。

### text

本地化文本类型。它由key和text两个值构成。

### 容器类型

- array  。数组类型，定义方式为 "array,element_type"。 对应c#类型为 element_type[]之类。 例如 array,int;array,Task。
- list。 列表类型。定义方式为 "list,element_type"。对应c#类型为List<element_type>。例如 list,int;list,Item。
- set。 集合类型。 定义方式为 "set,element_type"。 对应c#类型为 HashSet<element_type>。例如 set,int;set,string。
- map。 字典类型。 定义方式为 "map,key_type,value_type"。对应c#类型为 Dictionary<key_type, value_type>。例如 map,int,int;map,string,Item;

array和list的element_type可以为除了容器类型以外的任意类型，不支持容器类型的嵌套，但你可以通过定义一个bean，包含容器字段。然后再定义list,bean的方式
间接实现容器嵌套。

set的element_type必须是原生类型，datetime, 枚举类型，不能是bean类型。

map的key类型的约束与set的element_type相关， value类型约束与 array的element_type相同。

### 可空类型

对应c#里的可空变量的语义，如int?, bool? ColorType? 。 除了容器以外的类型都可以定义相应的可空类型。

### enum 类型

枚举类型。

```xml
<enum name="Color">
    <var name="RED" alias="红" value="1"/>
    <var name="GREEN" alias="绿" value="2"/>
   <var name="BLUE" alias="蓝" value="3"/>
</enum>

```

### bean 类型

结构定义。bean包含两种，普通bean结构和多态bean结构。

- 普通bean结构

```xml
<bean name="Item" value_type="1" alias="道具">
    <var name="id" id="1" type="int" ref="item.TbItem" tags="k1=v1#k2=v2"/>
    <var name="icon" type="string" path="unity" comment="图标" group="c"/>
    <var name="num" type="int" group="c,s"/>
</bean>

```

- 多态 bean 结构

```xml

<bean name="Shape">
  <var name="command_var1" type="int"/>
   
  <bean name="Shape2D">
     <var name="command_2d_var" type="string"/>
      <bean name="Circle">
         <var name="radius" type="float"/>
      </bean>
      <bean name="Rectangle">
         <var name="width" type="float"/>
         <var name="height" type="float"/>
     </bean>
  </bean>

  <bean name="Line">
     <var name="start_pos" type="vector2"/>
     <var name="direction" type="vector2"/>
  </bean>
</bean>

或者在外面定义继承

<bean name="Triangle" parent="Shape">
  <var name="a" type="float"/>
  <var name="b" type="float"/>
  <var name="c" type="float"/>
</bean>

```

## excel 子定义文件

excel子定义文件与xml定义文件几乎完全等价，对于luban来说，只是从哪种格式的文件中解析读取定义的区别。

请参见 [luban_examples](https://github.com/focus-creative-games/luban_examples)/DesignerConfigs目录下的 \_\_enums\_\_.xlsx, \_\_beans\_\_.xlsx, \_\_tables\_\_.xlsx。

excel子定义文件与xml子定义文件几乎完全等价（除了不能定义外部类的映射信息即externaltype），对luban而言它们的区别仅仅是定义的格式不同，但提供的元数据是等价的。

::: tip
这儿仅介绍excel定义文件的格式，**具体语义请参照xml子定义文件中相关文档**
:::

xml子定义文件可以定义任意结构，但excel不适合在一个文件里定义各种不同结构，因此excel子定义文件分类型，每个类型只定义一种结构。每个类型可以有0到多个定义文件（多个importexcel语句，而不是name里包含多个文件）。

由于大多数使用excel文件来定义配置的使用者，为了方便起见，希望定义excel文件在配置数据目录下，而不是跟其他定义一样，在配置定义目录下，特地作了特殊处理，以%input_data_dir%为相对目录读入excel定义文件。

有三种类型的定义文件:

- enum
- bean
- table

```xml

<importexcel name="__enums__.xlsx" type="enum"/>
<importexcel name="__beans__.xlsx" type="bean"/>
<importexcel name="__tables__.xlsx" type="table"/>

```

### enum 定义文件

定义多个enum结构。

格式如下

<div class="Excel">
<table border="1">
<tr align="center"><td>##var</td><td>full_name</td><td>flags</td><td>unique</td><td>comment</td><td>tags</td><td colspan="5">*items</td></tr>
<tr align="center"><td>##+</td><td/><td/><td/><td/><td/><td>name</td><td>alias</td><td>value</td><td>comment</td><td>tags</td></tr>
<tr align="center"><td/><td>test.ETestQuality</td><td>false</td><td>true</td><td/><td/><td>A</td><td>白</td><td>1</td><td>最差品质</td><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>B</td><td>黑</td><td>1</td><td>最差品质</td><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>C</td><td>蓝</td><td>1</td><td>中等品质</td><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>D</td><td>红</td><td>1</td><td>最好品质</td><td/></tr>
<tr align="center"><td/><td>test.AccessFlag</td><td>true</td><td>true</td><td/><td/><td>WRITE</td><td></td><td>1</td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>READ</td><td></td><td>2</td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>TRUNCATE</td><td></td><td>4</td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>NEW</td><td></td><td>8</td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td></td><td/><td/><td>READ_WRITE</td><td></td><td>READ|WRITE</td><td></td><td/></tr>
</table>
</div>

### bean 定义文件

定义多个bean结构。 不支持**多态bean**定义。

格式如下

<div class="Excel">
<table border="1">
<tr align="center"><td>##var</td><td>full_name</td><td>sep</td><td>comment</td><td>tags</td><td colspan="5">*fields</td></tr>
<tr align="center"><td>##+</td><td/><td/><td/><td/><td>name</td><td>type</td><td>group</td><td>comment</td><td>tags</td></tr>
<tr align="center"><td/><td>test.DemoBean1</td><td></td><td/><td/><td>x1</td><td>int</td><td></td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td/><td/><td>x2</td><td>string</td><td></td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td/><td/><td>x3</td><td>float</td><td></td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td/><td/><td>x4</td><td>bool</td><td></td><td></td><td/></tr>
<tr align="center"><td/><td>test.DemoBean2</td><td></td><td/><td/><td>x1</td><td>int</td><td></td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td/><td/><td>x3</td><td>list,float</td><td></td><td></td><td/></tr>
<tr align="center"><td/><td></td><td></td><td/><td/><td>x4</td><td>test.DemoBean1</td><td></td><td></td><td/></tr>
</table>
</div>

### table 定义文件

定义配置表列表，只有出现在此表中的表才会导出。

value_type为表记录类型类,必须是bean结构。value_type的类型名中如果不包含模块名，则取与full_name相同的命名空间，如果包含模块名，则取此模块名。例如，Item的模块名为 item，demo.Bag的模块名为demo。

格式如下

<div class="Excel">

|##var|full_name|value_type|define_from_file|input|index|mode|group|comment|tags|patch_input|output|
|-|-|-|-|-|-|-|-|-|-|-|-|
||item.TbItem|Item|true|item.xlsx|||||||
||test.TbBag|demo.Bag|true|bag.xlsx|||||||

</div>