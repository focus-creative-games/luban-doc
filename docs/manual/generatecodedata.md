# 代码与数据生成

## 支持的平台、引擎和语言

- 跨平台
  - Win
  - Mac
  - Linux (包括WSL)
- 支持主流的游戏开发语言
  - c++ (11+)
  - c# (.net framework 4+. dotnet core 3+)
  - java (1.6+)
  - go (1.10+)
  - lua (5.1+)
  - js 和 typescript (3.0+)
  - python (3.0+)
  - erlang (18+)
  - rust (1.5+)
  - 其他**protobuf**支持语言
- 支持主流的引擎
  - unity
  - unreal
  - cocos2d-x
  - 微信小游戏平台
  - 其他家支持js的小游戏平台
- 支持主流的热更新方案
  - xlua
  - tolua
  - slua
  - ILRuntime
  - sluaunreal
  - puerts
  - XIL
- 支持主流的开源框架
  - skynet
  - ET
  - GameFramework
  - xlua-framework

## 支持的数据格式

- binary 格式。 格式紧凑，加载高效，但基本不具体可读性。推荐只用于正式发布。
- json 格式。 可读性佳。支持优雅对齐格式，也支持紧凑格式。 推荐用于服务器端，以及用于客户端开发期。
- **protobuf** 格式。适用于熟悉pb的开发者。
- **msgpack** 格式。
- lua 格式。 可读性佳。 推荐仅用于客户端脚本语言为lua的情形。
- xml 格式。
- erlang格式。 仅用于 erlang语言。
- yaml格式。
- 其他格式。很容易扩展支持。

?> 同一种格式，为不同语言生成的数据是完全相同的

不同语言支持的格式如下：

| language | binary | json | lua |
| :- | :-: | :-: | :-:|
| c# | :heavy_check_mark: | :heavy_check_mark: |
|java| :heavy_check_mark: | :heavy_check_mark: |
|go | :heavy_check_mark: | :heavy_check_mark: |
|c++| :heavy_check_mark: | :x: |
|go|:heavy_check_mark: | :heavy_check_mark: |
|python| :heavy_check_mark: | :x: |
|typescript| :heavy_check_mark: | :heavy_check_mark: |
|rust| :x: | :heavy_check_mark: | 
|lua| :heavy_check_mark: | :x: | :heavy_check_mark: |
|erlang| erlang |
|protobuf|所有|

## 生成代码和数据

代码生成相关的工具有三个,都在luban_examples/Tools目录下。

- Luban.Client。 Luban工具客户端
- Luban.Server。 Luban工具服务器端
- Luban.ClientServer。 Luban工具前后端一体。

对于新手简单起见，我们介绍Luban.ClientServer的用法，命令如下：

```shell
dotnet %LUBAN_CLIENT_SERVER_DLL% -j cfg -- ^
 -d %ROOT_FILE% ^
 --input_data_dir %INPUT_DATA_DIR% ^
 --output_code_dir %OUTPUT_CODE_DIR%
 --output_data_dir %OUTPUT_DIR% ^
 --gen_types %GEN_TYPE% ^
 -s %GROUP%
```

其中：

- LUBAN_CLIENT_SERVER_DLL为 Luban.ClientServer.dll的路径， 可以指向 luban_examples/Tools/Luban.ClientServer/Luban.ClientServer.dll
- ROOT_FILE 为根定义文件，指向 MyConfigs/Define/\_\_root\_\_.xml
- INPUT_DATA_DIR 为配置数据的根目录，指向 MyConfigs/Datas
- OUTPUT_CODE_DIR 为生成代码的目录
- GEN_TYPE 为生成类型。 如果你使用unity,想生成c#代码，导出json数据，则使用 "code_cs_unity_json,data_json"
- GROUP 为导出分组。客户端则取client，服务器取server，所有则取all

更多项目类型，参见 [示例项目](https://github.com/focus-creative-games/luban_examples/tree/main/Projects)

## 为unity项目生成c#代码并导出json数据

对于命令行的介绍参见 上面。 你的生成命令大略如下

```shell
dotnet %LUBAN_CLIENT_SERVER_DLL% -j cfg -- ^
 -d %ROOT_FILE% ^
 --input_data_dir %INPUT_DATA_DIR% ^
 --output_code_dir %OUTPUT_CODE_DIR%
 --output_data_dir %OUTPUT_DIR% ^
 --gen_types "code_cs_unity_json,data_json" ^
 -s client
```

也即 --gen_types参数取 "code_cs_unity_json,data_json", -s 参数取 client

具体项目，可参见 [Csharp_Unity_Json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json)

更多项目类型，参见 [示例项目](https://github.com/focus-creative-games/luban_examples/tree/main/Projects)

## 为 unity + puerts 项目生成 ts代码，并生成json数据

--gen_types 参数取 "code_typescript_json,data_json"，-s 参数取 client

具体项目，可参见 [Typescript_Unity_Puerts_Json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/TypeScript_Unity_Puerts_Json)

## 为 UE4项目，生成c++代码（非蓝图）和binary数据

基准的参考项目为 [Cpp_Unreal_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Cpp_Unreal_bin)。


由于生成的代码依赖于一些头文件，你需要先从该项目 拷备Source\Cpp_Unreal\Private\bright 到你们项目合适的位置。必须保证bright目录在include目录路径内，如生成的代码中 #include "bright/serialization/ByteBuf.h" 可以找到这个文件。

接着命令行参数取 --gen_types "code_cpp_bin,data_bin"

## 其他类型项目类型，如何生成代码和数据
  
不同项目之间，仅仅是 --gen_types 不一样， 请从[示例项目](https://github.com/focus-creative-games/luban_examples/tree/main/Projects)中找到与你项目匹配的项目，参考相应目录下的 gen_code.bat 即可。

## 生成protobuf的定义文件及protobuf数据格式

目前支持proto2和proto3语法

### protobuf2

只支持bin格式导出。

取 --gen_types code_protobuf2,data_protobuf_bin 即可，参见 [Protobuf2_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Protobuf2_bin)。 每个导出的数据文件对应Table类序列化后的内容，加载即可，以item.TbItem表为例。

```csharp
var tbItem = ItemTbItem.Parser.ParseFrom(File.OpenRead("pb_datas/item_tbitem.bytes"));

```

### protobuf3

既支持bin格式，也支持json格式导出。

- binary格式导出。 --gen_types code_protobuf3,data_protobuf_bin
- json格式导出。 --gen_types code_protobuf3,data_protobuf_json

## 生成msgpack的数据

取 --gen_types data_msgpack 即可。 参见 [MsgPack_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/MsgPack_bin)

## 生成flatbuffers的定义文件及flatbuffers数据格式

取 --gen_types code_flatbuffers,data_flatbuffers_json 即可，参见 [Flatbuffers_json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Flatbuffers_json)。

由于binary格式过于复杂，现在只支持导出json格式，但是使用者可以使用flatc工具将数据转成binary！特地生成了 convert_json_2_binary.bat
和convert_json_2_binary.sh这两个批处理文件，方便自动一键转换。

目前由于flat_buffers不支持容器的元素类型为union，因此略微有一些兼容性问题，但在项目中可以通过使用一个bean来包含这个union字段来迂回解决。

data_flatbuffers_json 和 data_json的输出格式有一些区别

- data_flatbuffers_json 顶层为 包含data_list字段的 table,而 data_json顶层直接对应 data_list的内容
- flatbuffers不支持本地化。 所以它的text类型导出格式为string，而data_json为 {"key":"xxx", "text":"text}
- data_flatbuffers_json序列化bean类型字段时，如果遇到多态类型，会多序列化一个string类型的xxx_type字段，用于指示union的类型。也正是如此 data_flatbuffers_json不支持容器中出现union
- data_flatbuffers_json 输出的数据中，如果包含容器类型数据，并且元素类型为union，则无法被正确解析。

## 只生成代码或者数据

以 [Csharp_Unity_Json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json) 为例。

- --gen_types code_cs_unity_json 则只生成代码
- --gen_types data_json 则只生成数据

## 配置中有些string字段是资源地址，统一导出这些资源地址

首先定义类型时，添加上'#res=xxx' 这种标签，xxx可以取任意值。如下所示。

```xml
  <bean name="TestRes">
    <var name="icon" type="string#res=item"/>
  </bean>
```

取 '--gen_types data_resources'，并且新增参数'--output:data:resource_list_file resources.txt'。 运行即可将所有带res标签的数据导出到resources.text文件中。

假设配置表中包含icon="/ui/icon1.jpg" 和 icon="/ui/icon1/jpg" 这两个数据，则导出的资源列表内容为

```txt
item,/ui/icon1.jpg
item,/ui/icon2.jpg
```

参见示例 [GenerateDatas](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/GenerateDatas)/gen_resource_list.bat 文件。

## 生成的c#代码中,vector的类型由System.Numerics.Vector{2,3,4}，改成 UnityEngine.Vector{2,3,4}

命令行参数中添加  --cs:use_unity_vector 选项即可。 参见示例 [Csharp_Unity_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_bin)

## 自定义代码命名风格

可以。 添加选项 --naming_convention_bean_member none 即可。使生成的代码中的字段名与定义名相同。

支持以下代码命名风格：

- none。 无命名风格，生成的字段名和定义的名称一样
- language_recommend。即根据生成的语言不同，自动设置该语言推荐的风格。比如c#为PascalCase,java为 camelCase,python为under_scores。
- camelCalse。 即驼峰形式，生成 xxxYyyy这种风格的字段名。
- PascalCase。 即Pascal形式。生成XxxYyy这种风格的字段名。
- under_scores。 下划线形式。即生成xxx_yyy这种风格的字段名。

默认使用 language_recommend。

## gen_types中 code_cs_json和code_cs_unity_json的区别

code_cs_json生成代码中使用了 System.Text.Json库，这个只有.net core 3以后的版本才有，unity目前的.net版本不支持，所以这是给基于.net coer的服务器项目使用的。
code_cs_unity_json使用了第三方的SimpleJson库，兼容unity的.net版本，给unity生成加载json数据的c#代码时，可以（当前也只有这个选择）选择这个。

## 调生成的数据文件的后缀

数据格式的默认文件后缀如下

|data|extension|
|-|-|
|data_bin|bin|
|data_json|json|
|data_json2|json|
|data_lua|lua|
|data_xml|xml|
|data_yaml|yml|
|data_protobuf|bp|

 可以通过命令行选项"--data_file_extension xxx"手动指定输出文件的后缀。


## 不同导出格式的性能测试结果

硬件：

 Intel(R) Core i7-10700 @ 2.9G 16核

 32G 内存

数据集
  
  500个excel表
  每个表有1000行比较大的记录
  每个表文件大小 132k

测试结果：

| 格式 | 首次耗时 | 累积耗时 | 单个输出文件大小 | 输出文件总大小 |
| ---- | --------| ------  | ----            | ------ |
| bin  | 15.652 s| 797 ms  | 164 K            | 59.5 M |
| json | 17.746 s| 796 ms  | 1.11 M           | 555 M   |
| lua  | 17.323 s| 739 ms  | 433 K           | 212 M   |

## binary与json格式加载性能对比

以luban_examples的DesignerConfigs配置为测试数据，以Projects下的csharp_Unity_bin和csharp_Unity_json项目为测试对比，
加载100遍cfg.Table。

binary格式耗时28ms，json格式耗时112ms。

加载性能大约为 4:1。
