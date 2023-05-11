# FAQ

## 我运行 luban_examples 项目Projects目录下的示例项目中的生成脚本，为什么提示我 connect fail，失败了？

示例项目的生成脚本使用了luban.client，默认使用云生成，它需要连接到远程的luban.server才能完成生成。有两个办法可以解决

- 运行 luban_examples 项目目录下的 run_luban_server.bat 或者 run_luban_server.sh 。然后再运行生成脚本
- 将脚本里的 Luban.Client/Luban.Client 换成 Luban.ClientServer/Luban.ClientServer。 因为Luban.ClientServer同时包含了Client和Server
，可以独立完成生成。

```shell
@@将脚本里
set GEN_CLIENT=%WORKSPACE%\Tools\Luban.Client\Luban.Client.exe
@@换成
set GEN_CLIENT=%WORKSPACE%\Tools\Luban.ClientServer\Luban.ClientServer.exe
```

详细参见 [luban命令行工具](/manual/commandtools.md)

## 如何指定主键

table的index字段指定主键列表。 详细请参见 [配置相关定义](/manual/define.md) 中关于table的mode和index的相关文档。

map及list表支持主键概念，未指定mode和index的情况下，自动为mode=map模式，并记录bean的第一个字段作为主键。

假设 TbTest表的记录为Test类型，你想用Test的my_index字段作为key，则：

- 如果在xml里定义表，则在table的index属性中指定主键字段名，如下：

```xml
<table name="TbTest" value="Test" index="my_index"/>
```

- 如果在 table.xlsx里定义表，则在index列指定主键名，如下

|##var|full_name|value_type|define_from_excel|input|index|...|
|-|-|-|-|-|-|-|
||TbTest|Test|true|equip.xlsx|my_index|

## 支持多主键吗？

支持。 table mode=list时，支持联合多主键模式和独立多主键模式。详细文档参见 [配置相关定义](/manual/define.md#table的mode详细介绍) 中关于table的mode的相关文档。

## 支持按client和server导出不同表及不同字段吗？

支持。[配置相关定义](/manual/define.md#分组导出-group)
中关于 分级定义及分组导出相关文档。

## 支持哪些源数据文件类型

- excel族。 csv、xls、xlm、xlsx、xlsm 等等。 csv支持各种编码，luban会智能猜测它的编码，无论你用gbk还是utf-8或者其他编码，都能正确处理。
- json
- xml
- lua
- yaml

## 配置表的数据可以来源于多个文件吗？

可以。 参见 [配置相关定义](/manual/define.md#table-input-数据源详细介绍)
中关于 table.input的文档。 

## 可以将多个表放到同一个excel文件吗？

可以。 参见 [配置相关定义](/manual/define.md#table-input-数据源详细介绍)
中关于 table.input的文档。 

## 当数据文件为xlsx文件时，luban会读入第一个sheet还是所有sheet？

读入所有sheet，但是会忽略那些A1单元格内容不是##开头的sheet。

## 策划想在xlsx中有一个非数据的sheet，该怎么做呢

只要该sheet的A1单元格不以##开头即可。

## 想注释掉某一列，该如何做

将列名取空，或者 #xxxx, \_\_xxxx 这样的名称。

## 想注释掉某一行记录，该如何做

将该行第一个单元格填以##即可。

## 有些配置只想开发期内部测试用，正式发布时不导出，该如何做？

luban支持数据tag的概念。 excel第一列为tag。

- 当tag为##时忽略这个行
- 当tag为xxx时，如果Luban.Client 命令行中使用 --export_exclude_tags xxx，则不会导出该记录

## 我想每个json保存一个记录，文件太多，在input中指定很麻烦，怎么解决？

使用 目录数据源。 把所有json文件放到一个目录下（可以是目录树），将input设为该目录。luban会自动遍历整个目录树，将每个文件当作
一个记录读入。 详细参见[其它数据源-json](/manual/datasource.md#数据源文件)

## 一个json文件可以包含多个记录吗？

可以。但必须在数据源中以 *@xxx.json形式指定。详细参见[其它数据源-json](/manual/datasource.md#数据源文件)

## 记录可以来自json文件的某个深层次字段吗？

可以。分两种情况：

- 从字段中读入一个记录，则以 a.b.c@xx.json的形式指定
- 从字段中读入记录列表，则以 *a.b.c@xx.json的形式指定

详细参见[其它数据源-json](/manual/datasource.md#数据源文件)

## 可以像xlsx那样，将多个表的数据都放到一个json文件中吗？

可以。 与excel数据源类似，只要每个表用 field@xx.json或者 *field@xx.json的形式指定即可。
详细参见[其它数据源-json](/manual/datasource.md#数据源文件)

## 支持异步加载配置表吗？

不直接支持。但你可以通过自定义模板方式实现异步加载。

参见 [代码与数据模板](/manual/template.md)，以及相应异步加载示例项目 [csharp_async_load](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_CustomTemplate_AsyncLoad)

## 支持自定义代码或者数据生成吗

支持。 参见 [数据与代码模板](/manual/template.md)

## 如何导出protobuf的定义及数据

参见 [代码与数据生成](/manual/generatecodedata.md)

## 如何导出msgpack的数据

参见 [代码与数据生成](/manual/generatecodedata.md)

## 如何导出flatbuffers的定义及数据

参见 [代码与数据生成](/manual/generatecodedata.md)

## 生成后，本地目录会产生一个 .cache.meta，这个文件的用途是什么？

.cache.meta 里包含了与Luban.Server交互过程中涉及到的所有文件的 (路径， md5码， 长度，修改时间戳)信息。用于优化生成性能。

由于Luban.Client与Luban.Server的工作模型为云生成模型，Luban.Client向服务器发起生成请求后，服务器并不直接读取生成需要的配置文件，而是先获得
这些文件的元信息（路径,md5）,如果内存缓存中有相同md5的文件，则直接读取，不再向客户端读取文件数据，这样极大提升了增量生成的性能。

服务器生成完成后，也会向客户端发送生成文件元数据列表，包含（路径、md5）这些元数据信息。如果本地不存在这些文件，则下载下载，如果已经存在，则检查
是否有变化，此时Luban.Client并不会直接读取本地文件并且计算md5,而是先查询.cache.meta里是否有对应的文件md5信息，如果本地文件的长度和修改时间戳
与.cache.meta里的相同，则认为.cache.meta里包含了正确的md5值，然后拿这个值到服务器生成的结果的md5对比，只有不相同，才会重新下载。

## 可以引用现有的枚举和结构吗？比如生成的代码中想使用UnityEngine.AudioType和UnityEngine.Color

可以，支持external类型的枚举和结构，但目前只支持c#语言。 详细文档参见 [配置定义介绍](/manual/define.md) 中的external类型相关文档。
