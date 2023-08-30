# 命令行工具

## 跨平台

得益于.net的跨平台能力，Luban可以在主流的Win、Linux及macOS操作系统上运行。

## 命令格式

```bat

dotnet <path_of_luban.dll> [args] 

args：

  -s, --schemaCollector      schema collector name

  --conf                     Required. luban global config file

  -t, --target               Required. target name

  -c, --codeTarget           code target name. allow multi instance.

  -d, --dataTarget           data target name. allow multi instance.

  -p, --pipeline             pipeline name

  -i, --includeTag           include tag. allow multi instance.

  -e, --excludeTag           exclude tag. allow multi instance.

  -o, --outputTable          output table. allow multi instance.

  --timeZone                 timezone

  --customTemplateDir        custom template search dir

  --validationFailAsError    validation fail as error

  -x, --xargs                args like -x a=1 -x b=2. allow multi instance.

  -v, --verbose              verbose

  --help                     Display this help screen.

  --version                  Display version information.

```

|参数|必选|默认值|描述|
|-|-|-|-|
|-s, --schemaCollector|否|default|schema根收集器|
|--conf|是||schema根收集器的根输入文件|
|-t， --target|是||生成目标，取schema全局参数target中的一个|
|-c, --codeTarget|否||生成的代码目标。可以有0-n个。如 `-c cs-bin -c java-json`|
|-d, --dataTarget|否||生成的数据目标。可以有0-n个。如 `-d bin -d json`|
|-p, --pipeline|否|default|生成管线。默认为内置的DefaultPipeline|
|-i, --inlcudeTag|否||包含该tag的记录会被输出到数据目标|
|-e, --excludeTag|否||包含该tag的记录不会被输出到数据目标|
|-o, --outputTable|否||指定要生成的table，可以有多个，例如`-o item.tbItem -o bag.TbBag`。如果未指定此参数，则按照group规则计算导出的table列表|
|--timeZone|否||指定当前时区，默认取本地时区。此参数会影响datetime类型。该参数为linux或win下的时区名，例如 `Asia/Shanghai` 或 `China Standard Time`|
|--customTemplateDir|否||自定义template搜索路径，优先级搜索此路径，再搜索默认的Templates路径|
|--validationFailAsError|否|false|如果有任何校验器未通过，则生成失败。此参数一般在正式发布时使用|
|-x, --xargs|否||指定一些特殊参数。具体需要哪些参数由生成管线运行过程中涉及的模块决定|

## SchemaCollector

Luban.SchemaCollector.Builtin项目实现了DefaultSchemaCollector，它支持与旧版本Luban相似的定义格式。该schemaCollector名为default。

## Code Target

目前内置支持以下code target：

|code target|描述|
|-|-|
|cs-bin| C#，读取bin格式文件|
|cs-simple-json| C#，使用SimpleJSON读取json文件，推荐用于Unity客户端|
|cs-dotnet-json| C#，使用System.Text.Json库读取json文件，推荐用于dotnet core服务器|
|cs-editor-json| C#，读取与保存记录为单个json文件，适用于自定义编辑器保存与加载原始配置文件|
|lua-lua| lua，读取lua格式的文件|
|lua-bin| lua，读取bin格式文件|
|java-bin| java，读取bin格式文件|
|java-json| java，使用gson库读取json格式文件|
|cpp-bin| cpp，读取bin格式文件|
|go-bin| go，读取bin格式文件|
|go-json| go，读取json格式文件|
|python-json|python，读取json格式文件|
|gdscript-json|gdscript，读取json格式文件。注意，如果你使用C#语言开发，推荐使用更高效的cs-bin格式|
|typescript-json| typescript，读取json格式文件|
|protobuf2| 生成proto2语法的schema文件|
|protobuf3| 生成proto3语法的schema文件|
|flatbuffers| 生成flatbuffers的schema文件|

:::caution

code target必须与data target匹配，否则会加载失败。

:::

一次生成多个code target时，必须为每个code target单独指定输出目录，否则会相互覆盖。实践中也不可能让不同的代码输出到同一个目录下。

Luban的大多数内置模板都使用了[层级参数(Cascading Option)](./cascadingoption)机制，你只需要用`<code target name>.outputCodeDir`参数
分别为每个target指定输出目录参数即可。


## Data Target

内置支持以下 data target：

|data target|描述|
|-|-|
|bin| Luban独有的binary格式，紧凑、高效，推荐用于正式发布|
|bin-offset|记录以bin格式导出的数据文件中每个记录的索引位置，可以用于以记录为粒度的lazy加载|
|json|json格式|
|lua|lua格式|
|xml|xml格式|
|yml|yaml格式|
|bson|bson格式|
|msgpack|msgpack的二进制格式|
|protobuf-bin|protobuf的二进制格式|
|protobuf-json|protobuf3起支持的json格式|
|flatbuffers-json|flatbuffers支持的json格式|


如果要一次输出多个target，解决办法与code target类似。只需要用`<data target name>.outputDataDir`参数
分别为每个target指定输出目录参数即可。

每个code target只能读取一种相匹配的数据格式。例如cs-bin生成的c#代码只能读取bin格式数据， java-json生成的java代码只能读取json格式。

## Pipeline

Luban.Core中实现一个默认管线DefaultPipeline，名为default。使用者可以实现自己的Pipeline。

## xargs 

还有大量的命令行参数，由于它们是Pipeline中各个可定制模块独有的参数，因而这些参数没放到标准命令行参数中，统一用`-x --xargs`参数指令。

内置模块用到的参数有：

|参数|描述|可用值|示例|
|-|-|-|-|
|outputCodeDir|代码目标的输出目录|| -x outputCodeDir=/my/output/dir|
|outputDataDir|数据目标的输出目录|| -x outputDataDir=/my/output/dir|
|codeStyle|代码目标的命名风格，内置实现的Code Target都会自动设置与目标语言相匹配的codeStyle，不需要显式指定|none、csharp-default、java-default、go-default、lua-default、typescript-default、cpp-default、python-default| -x codeStyle=csharp-default|
|dataExporter|数据导出器| null、default|-x dataExporter=default|
|codePostprocess|代码后处理器，可以为多个|未实现任何内置postprocess| -x codePostProcess=a,b,c|
|dataPostprocess|数据后处理器，可以为多个|未实现任何内置postprocess| -x dataPostProcess=a,b|
|outputSaver|数据保存器，默认为local，即输出到本地目录，如果不想输出任何文件，可以用null|null、local| -x outputSaver=local|
|l10n.textProviderName|本地化文本Provider|| -x l10n.textProviderName=default|
|l10n.textProviderFile|本地化文本数据文件|| -x l10n.textProviderFile=xxxx|
|forceLoadDatas|即使没有data target，也要加载源数据|| -x forceLoadDatas=1|
|pathValidator.rootDir|path校验器搜索文件所用的根目录|| -x pathValidator.rootDir=/xx/yy|

## OutputSaver

最终生成的数据的保存器。当前实现了两个保存器local和null。

local将文件保存到本地目录。null则不执行任何操作。local是默认使用的保存器，一般生成任务使用local。对于只想校验配置表，不想生成任何数据，使用null
保存器可以达到这个目标。

## 示例

下面展示了一些常见的生成命令示例，更多示例请参考 [luban_examples/Projects](https://github.com/focus-creative-games/luban_examples/tree/main/Projects)。

### unity + c# + bin

示例项目[Csharp_Unity_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_bin)。

```bat

set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c cs-bin ^
    -d bin  ^
    --conf %CONF_ROOT%\luban.conf ^
    -x outputCodeDir=Assets/Gen ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json

```

### unity + c# + json

示例项目[Csharp_Unity_json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json)。


```bat

set WORKSPACE=..\..

set GEN_CLIENT=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %GEN_CLIENT% ^
    -t all ^
    -c cs-simple-json ^
    -d json  ^
    --conf %CONF_ROOT%\luban.conf ^
    -x outputCodeDir=Assets/Gen ^
    -x outputDataDir=..\GenerateDatas\json ^
    -x pathValidator.rootDir=D:\workspace2\luban_examples\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@D:\workspace2\luban_examples\DesignerConfigs\Datas\l10n\texts.json


```

### dotnet + c# + bin

示例项目[Csharp_DotNet_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_DotNet_bin)。

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c cs-bin ^
    -d bin  ^
    --conf %CONF_ROOT%\luban.conf ^
    -x outputCodeDir=Gen ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json

```


### go + bin

示例项目 [Go_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Go_bin)。

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c go-bin ^
    -d bin  ^
    --conf %CONF_ROOT%\luban.conf ^
    -x outputCodeDir=gen ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json ^
    -x lubanGoModule=demo/luban

```

### java + bin

示例项目 [Java_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Java_bin)

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c java-bin ^
    -d bin  ^
    --conf %CONF_ROOT%\luban.conf ^
    -x outputCodeDir=src/main/gen ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json
```

### 用于策划检查配置，不生成任何代码和文件

示例项目 [ConfigCheck](https://github.com/focus-creative-games/luban_examples/tree/main/DesignerConfigs)。

```bat
set WORKSPACE=..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    --conf %CONF_ROOT%\luban.conf ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json ^
    -x forceLoadDatas=1
```

### 同时生成 cs-bin和java-bin代码

```bat

set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c cs-bin ^
    -c java-bin ^
    -d bin  ^
    --conf %CONF_ROOT%\luban.conf ^
    -x cs-bin.outputCodeDir=cs_output_path ^
    -x java-bin.outputCodeDir=java_output_path ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json

```