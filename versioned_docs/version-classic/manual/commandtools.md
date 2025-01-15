# 命令行工具

## Luban.Client 、Luban.Server和 Luban.ClientServer的功能和区别

Luban 默认的工作模型为 云生成模型，也就是 Luban.Client 将生成请求提交到远程的 Luban.Server，Luban.Server将生成结果返回给Luban.Client。
对于使用Luban云生成工作模型的项目，需要在一个服务器上部属 Luban.Server （当然也可以直接在本地化运行），然后将 Luban.Client的 -h 参数改为 该服务器的IP。

Luban.ClientServer为Luban.Client+Luban.Server一体的程序，内嵌了Luban.Client和Luban.Server，其工作原理与云生成的模式一致。

有些项目规模较小，或者为个人开发者，不想部属Luban.Server，则可以采用Luban.ClientServer工具。

## 云生成的优点

云生成模式下，Luban.Server会缓存生成结果，对于定义和数据没有变化的配置表，直接返回生成结果。日常开发中，经常只改动了个别表，使用了云生成后，只会生成改变的表的数据，
极大缩短了生成时间，日常生成时间基本在300ms量级。 对于MMORPG这样的大项目，日常生成基本了1s以内，节省非常可观的时间。

## 部属

Luban工具有两种部属方式。

## 方法1： Luban.Client与Luban.Server独立部属，云生成模式

### 部属 luban-server

基于 .net 6 runtime （可跨平台，不需要重新编译）。

- 自行安装 .net 6 runtime 或 sdk.
- 从[示例项目](https://gitee.com/focus-creative-games/luban_examples/tree/main/Tools/Luban.ClientServer)拷贝整个Luban.ClientServer目录（**可跨平台，即使在linux、mac平台也不需要重新编译**）
- 在Luban.ClientServer目录下运行 dotnet Luban.Server.dll (提示：Win平台可以直接运行 Luban.Server.exe)

### 安装 luban-client

基于 .net 6 runtime （推荐win平台使用，可跨平台，不需要重新编译）。

- 自行安装 .net 6 runtime 或 sdk.
- 从[示例项目](https://gitee.com/focus-creative-games/luban_examples/tree/main/Tools/Luban.Client)拷贝 Luban.Client（**可跨平台，即使在linux、mac平台也不需要重新编译**）

## 方法2： Client与Server一体模式

  Client与Server在同个进程内运行，不需要单独部属Luban.Server。

  将运行脚本中%LUBAN_CLIENT%变量由 Luban.Client/Luban.Client 改为 Luban.ClientServer/Luban.ClientServer，同时**删除 -h (--host ) 选项及其参数**。

  Luban.ClientServer是Luban.Client的功能超集，可以完全替代Luban.Client。

-----

## luban-server 使用介绍

命令行使用

    dotnet Luban.Server.dll [-p <port>] [-l <log level>]

    参数介绍：
    -p, --port <port>                   可选参数。监听端口 <port>，默认为8899。
    -l, --loglevel <log level>          可选参数。日志级别。默认为INFO。 有效值有: TRACE,DEBUG,INFO,WARN,ERROR,FATAL,OFF  
    -t, --template_search_path          可选参数。模板的额外搜索路径。优先从此路径，再从Templates目录搜索模板文件。  
    --disable_cache                     可选参数。禁用生成中间过程的缓存，但保留了源文件缓存。在模板调试时比较有用。
    --i10n:default_timezone  <timezone> 可选参数。datetime时间所在的时区。如果未设置则会尝试用"Asia/Shanghai"和"China Standard Time"。

 关于时区，win下可使用命令"tzutil /l" 查看本机时区列表。 也可查阅MS文档[default-time-zones列表](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/default-time-zones?view=windows-11)

## luban-client 使用介绍

 命令行使用

    dotnet Luban.Client.dll [-h <host>] [-p <port>] [-l <log level>] [-c <cache meta file>] [-w <watch dirs>] [-h ] -j cfg -- <job options>
    
    参数介绍：
    -h,--host <host>                可选参数。 luban-server的地址。默认为 127.0.0.1
    -p,--port <port>                可选参数。 luban-server的端口。默认为 8899
    -j,--job <job>                  必选参数。 生成类型。目前支持的生成类型有: cfg,proto,db。 生成配置请取cfg。
    -l,--loglevel <log level>       可选参数。 日志级别。默认为INFO。有效值有: TRACE,DEBUG,INFO,WARN,ERROR,FATAL,OFF
    -c,--cachemetafile <meta file>  可选参数。 meta缓存文件名。 默认为 .cache.meta
    -w,--watch <dir1;dir2...>       可选参数。 监测目录或者目录列表，以逗号';'分隔。当开启此选项后，生成结束后不会退出程序，而是进入自动生成模式。
                                              监听到目标目录发生变化后，自动重新运行生成。省去改动后手动运行生成脚本的麻烦。
    --generateonly                  可选参数。 仅生成。不从服务器下载生成结果。可以用于检查服务器是否能成功生成。
    -h,--help                       可选参数。 显示帮助信息
    --  <job options>               必选参数。 从此参数起，便是 不同job的特有选项

-----

    cfg的<job options>介绍：

    -d,--define_file <root file>            必选参数。 根定义文件名。
    --input_data_dir  <input data dir>      必选参数。 配置数据文件根目录。
    --input:convert:dir <dir>               可选参数。 执行json、lua、xlsx之类数据格式转换时，提供的数据源，覆盖table中默认的input参数。
    -c,--output_code_dir <output code dir>  可选参数。 生成代码文件的目录。
    -s,--service                            必选参数。生成分组目标。一般来说，会定义client,server,editor等好几个目标，不同目标的生成内容不同。

    --gen_types <type1,type2,,,>  必选参数。生成任务类型。既可以是生成代码也可以是生成数据或者其他。
                                  目前支持的有 code_cs_bin,code_cs_unity_bin,code_cs_dotnet_json,code_cs_unity_json,
                                      code_cs_unity_editor_json,code_lua_bin,code_java_bin,code_go_bin,
                                      code_go_json,code_cpp_bin,code_cpp_ue_editor_json,code_python27_json,
                                      code_python3_json, code_gdscript_json, code_typescript_bin,code_typescript_json,code_rust_json,
                                      code_protobuf2,code_protobuf3,code_template,code_flatbuffers,
                                      data_bin,data_bidx,data_lua,data_json,data_json_monolithic,data_bson,data_yaml,
                                      data_template,data_protobuf_bin,data_protobuf_json,data_flatbuffers_json,
                                      convert_json,convert_lua,convert_xlsx,convert_template

    --validate_root_dir <path validate root dir>. 可选参数。 配置path检查的根目录。

    --output_data_dir <output data dir>     可选参数。 导出的数据文件的目录。只生成代码时可不指定。
    
    --output:data:compact_json                   可选参数。默认导出的json格式为对齐后的优雅格式，使用此参数后导出紧凑的不带空格和换行的格式。
    --output:data:file_extension  <output data file extension>     可选参数。 导出数据文件的后缀。默认按照生成类型自动选择。
    --output:exclude_tags <tag1,tag2>           可选参数。导出时排除包含这些tag的数据
    --output:tables <table1,table2...>          可选参数。手动指定导出哪些表。覆盖group中设置
    --output:include_tables <table1,table2...>  可选参数。除了group中设置外，额外新增表。
    --output:exclude_tables <table1,table2...>  可选参数。排除group中指定的表。
    
    --output:convert:file_extension <extension> 可选参数。 convert数据文件的后缀。默认按照模板名猜测。
    
    --template:code:dir <dir name>              可选参数。自定义额外代码模板的目录名
    --template:data:file  <template name>       可选参数。数据模板的名称（不包含后缀），当gen_types包含 data_template时必须指定。
    --template:convert:file <template name>     可选参数。convert模板的名称（不包含后缀），当gen_types包含convert_template时必须指定。
    

    --naming_convention:module <convention>     可选参数。生成代码中模板名的命名约定，可用值为 language_recommend,none,camelCase,PascalCase,under_scores。 默认为language_recommend，即选择与相应语言推荐的命名约定风格。 此选项目前未生效。
    --naming_convention:bean_member <convention> 可选参数。生成代码中bean类型字段名的命名约定，可用值为 language_recommend,none,camelCase,PascalCase,under_scores。 默认为language_recommend。
    --naming_convention:enum_member <convention> 可选参数。生成代码中enum类型名的命名约定，可用值为 language_recommend,none,camelCase,PascalCase,under_scores。 默认为language_recommend。此选项目前未生效。
    --access_bean_member <access mode>  可选参数。 bean属性的访问方式。可用值为language_recommend,variable,getter_setter,property。默认为 language_recommend。此字段目前未生效。

    --l10n:timezone <timezone>           可选参数。 指定所在时区。影响datetime类型转换为utc时间。 默认为中国北京时间。
    --l10n:input_text_files <file1,file2..> 可选参数。 本地化的文本映射表。可以有多个。
    --l10n:text_field_name <field name>     可选参数。 文本映射表中，目标映射列的列名，默认为text
    --l10n:output_not_translated_text_file <file> 可选参数。 未被本地化映射的text key和value的输出文件。不提供该参数则不生成
    --l10n:patch <patch name>                  可选参数。当前需要生成的分支名称。
    --l10n:patch_input_data_dir <patch data root dir> 可选参数。分支数据的根目录。

    --typescript:bright_require_path <path>    可选参数。生成typescript代码引用的bright模块的路径
    --typescript:bright_package_name <packet>  可选参数。生成typescript代码以包形式引用bright库的路径
    --typescript:use_puerts_bytebuf            可选参数。生成typescript代码中使用puerts中导入的c# Bytebuf类。
    --cs:use_unity_vector                      可选参数。生成c#代码中，使用UnityEngine.Vector{2,3,4}作为Vector数据类型。
    --go:bright_module_name <module path>      可选参数。生成go代码时，bright module的import目录。

    --external:selectors  <selector1,selector2 ...>       可选参数。 外部类选择器，可以多个。selector必须是root.xml中externalselector中定义的选择器之一。

## gen_types 参数介绍

目前支持的 gen_types 有

- 代码生成相关
  - code_cs_bin               生成dotnet平台的读取bin格式数据的代码。与code_cs_unity_bin区别在于它生成的vector{2,3,4}类型为System.Numerics.Vector{2,3,4}
  - code_cs_unity_bin         生成适合unity的读取bin格式数据的代码。与code_cs_bin区别在于它生成的vector{2,3,4}类型为UnityEngine.Vector{2,3,4}
  - code_cs_dotnet_json       生成dotnet平台的读取json格式数据的代码。与code_cs_unity_json区别在于它生成的vector{2,3,4}类型为System.Numerics.Vector{2,3,4}
  - code_cs_unity_json        生成适合unity的读取json格式数据的代码。与code_cs_dotnet_json区别在于它生成的vector{2,3,4}类型为UnityEngine.Vector{2,3,4}
  - code_cs_unity_editor_json 生成适用于unity编辑器开发的代码。可以单独将一个记录加载或者保存到json文件。
  - code_lua_bin              生成lua语言读取bin格式的代码
  - code_java_bin             生成java读取bin格式的代码
  - code_java_json            生成java读取json格式的代码
  - code_go_bin               生成go读取bin格式的代码
  - code_go_json              生成go读取json格式的代码
  - code_cpp_bin              生成cpp读取bin格式的代码
  - code_cpp_ue_editor_json   生成适用于UE4编辑器开发的代码。可以单独将一个记录加载或者保存到json文件
  - code_python27_json        生成python2系列读取json格式的代码
  - code_python3_json         生成python3系列读取json格式的代码
  - code_gdscript_json        生成gdscript系列读取json格式的代码
  - code_typescript_bin       生成ts读取bin格式的代码
  - code_typescript_json      生成ts读取json格式的代码
  - code_rust_json            生成rust读取json格式的代码
  - code_protobuf2            生成protobuf2 schema文件
  - code_protobuf3            生成protobuf3 schema文件
  - code_template             指示使用自定义代码模板
  - code_flatbuffers          生成flatbuffers schema文件
- 数据生成相关
  - data_bin 导出bin格式数据
  - data_bidx bin格式的索引数据。方便实现记录级别的延迟加载。
  - data_lua  导出lua格式数据
  - data_json 导出json格式数据
  - data_json_monolithic。 与data_json区别在于它把所有表的json数据文件生成到一个json文件中
  - data_bson 导出bson格式数据
  - data_yaml 导出yaml格式数据
  - data_xml 导出xml格式数据
  - data_template 自定义数据模板
  - data_protobuf_bin 导出protobuf的binary格式数据
  - data_protobuf_json 导出protobuf3的json数据格式
  - data_flatbuffers_json 导出flatbuffers的json数据格式
  - data_resources 导出所有带res标签的数据
- 源数据转换相关
  - convert_json 将源数据全部转换为json源数据格式。注意跟导出格式不一样。每个记录占一个文件
  - convert_lua 将源数据全部转换为lua源数据格式。每个记录占一个文件
  - convert_xlsx 将源数据全部转换为xlsx格式。每个表占一个文件的
  - convert_template 自定义转换模板。但每个记录占一个文件

## .cache.meta 文件的用途

第一次完成生成时，本地目录会产生一个 .cache.meta。

.cache.meta 里包含了与Luban.Server交互过程中涉及到的所有文件的 (路径， md5码， 长度，修改时间戳)信息。用于优化生成性能。

由于Luban.Client与Luban.Server的工作模型为云生成模型，Luban.Client向服务器发起生成请求后，服务器并不直接读取生成需要的配置文件，而是先获得
这些文件的元信息（路径,md5）,如果内存缓存中有相同md5的文件，则直接读取，不再向客户端读取文件数据，这样极大提升了增量生成的性能。

服务器生成完成后，也会向客户端发送生成文件元数据列表，包含（路径、md5）这些元数据信息。如果本地不存在这些文件，则下载下载，如果已经存在，则检查
是否有变化，此时Luban.Client并不会直接读取本地文件并且计算md5,而是先查询.cache.meta里是否有对应的文件md5信息，如果本地文件的长度和修改时间戳
与.cache.meta里的相同，则认为.cache.meta里包含了正确的md5值，然后拿这个值到服务器生成的结果的md5对比，只有不相同，才会重新下载。

## 示例

假设

  luban.server 运行在本机，端口为8899
  luban.client的位置在 d:\tools\Luban.Client
  配置定义在 d:\raw_config\defines
  配置定义的根定义文件为 d:\raw_config\defines\__root__.xml
  配置数据在 d:\raw_configs\datas

  client项目为unity项目，位置在 d:\client
  你期望client生成的代码在 d:\client\Assets\Gen 目录
  你期望client生成的数据在 d:\client\Assets\StreamingAssets\GameData 目录

  你们服务器项目为 dotnet c#项目，位置在d:\server
  你期望server生成的代码在 d:\server\src\Gen
  你期望server生成的数据在 d:\server\GameData

### 案例1

你要为客户端生成代码和数据。
你期望使用bin格式的导出数据类型
你为客户端选择的service分组为 client
当前在开发期，你期望导出数据中包含测试数据

则win下命令为：

```shell
dotnet d:\tools\Luban.Client\Luban.Client.dll ^
    -h 127.0.0.1 ^
    -p 8899 ^
    -j cfg ^
    -- ^
    --define_file d:\raw_config\defines\__root__.xml ^
    --input_data_dir d:\raw_configs\datas ^
    --output_code_dir d:\client\Assets\Gen ^
    --output_data_dir d:\client\Assets\StreamingAssets\GameData ^
    --gen_types code_cs_unity_bin,data_bin ^
    --service client
```

linux bash命令同理。

### 案例2

你要为客户端生成代码和数据。
你期望使用json格式导出数据类型。
你不期望导出数据中包含dev和test标签的数据

则win下命令为:

```shell
dotnet d:\tools\Luban.Client\Luban.Client.dll ^
    -h 127.0.0.1 ^
    -p 8899 ^
    -j cfg ^
    -- ^
    --define_file d:\raw_config\defines\__root__.xml ^
    --input_data_dir d:\raw_configs\datas ^
    --output_code_dir d:\client\Assets\Gen ^
    --output_data_dir d:\client\Assets\StreamingAssets\GameData ^
    --gen_types code_cs_unity_json,data_json ^
    --service client ^
    --export_exclude_tags dev,test
```

### 案例3

你要为服务器生成代码和数据。

你期望使用json导出数据格式。
你期望包含测试数据。
你为服务器选择的service为server

则 win下命令为：

```shell
dotnet d:\tools\Luban.Client\Luban.Client.dll ^
    -h 127.0.0.1 ^
    -p 8899 ^
    -j cfg ^
    -- ^
    --define_file d:\raw_config\defines\__root__.xml ^
    --input_data_dir d:\raw_configs\datas ^
    --output_code_dir d:\server\src\Gen ^
    --output_data_dir d:\server\GameData ^
    --gen_types code_cs_json,data_json ^
    --service server
```

### 案例4

luban-server 被你部属在 192.168.1.10这台机器上，端口为1111。其他的如案例3。

则 win下的生成命令为：

```shell
dotnet d:\tools\Luban.Client\Luban.Client.dll ^
    -h 192.168.1.10 ^
    -p 1111 ^
    -j cfg ^
    -- ^
    --define_file d:\raw_config\defines\__root__.xml ^
    --input_data_dir d:\raw_configs\datas ^
    --output_code_dir d:\server\src\Gen ^
    --output_data_dir d:\server\GameData ^
    --gen_types code_cs_dotnet_json,data_json ^
    --service server
```

### 案例5

你要为服务器生成代码和数据。同时让luban.client执行生成后不退出，进入监控状态，只要配置定义或者数据有变化，就自动生成代码和数据。

你期望使用json导出数据格式。
你期望包含测试数据。
你为服务器选择的service为server

则 win下命令为：

```shell
dotnet d:\tools\Luban.Client\Luban.Client.dll ^
    -h 127.0.0.1 ^
    -p 8899 ^
    -j cfg ^
    -w d:\raw_config\defines;d:\raw_configs\datas
    -- ^
    --define_file d:\raw_config\defines\__root__.xml ^
    --input_data_dir d:\raw_configs\datas ^
    --output_code_dir d:\server\src\Gen ^
    --output_data_dir d:\server\GameData ^
    --gen_types code_cs_dotnet_json,data_json ^
    --service server   
```
