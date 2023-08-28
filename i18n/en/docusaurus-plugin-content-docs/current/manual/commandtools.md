# command line tools

## Cross-platform

Thanks to the cross-platform capabilities of .net, Luban can run on mainstream Win, Linux and macOS operating systems.

## command format

```bat
dotnet <path_of_luban.dll> [args]

args:

   -s, --schemaCollector schema collector name

   --schemaPath Required.schema path

   -t, --target Required. target name

   -c, --codeTarget code target name. allow multi instance.

   -d, --dataTarget data target name. allow multi instance.

   -p, --pipeline pipeline name

   -i, --includeTag include tag. allow multi instance.

   -e, --excludeTag exclude tag. allow multi instance.

   -o, --outputTable output table. allow multi instance.

   --timeZone timezone

   --customTemplateDir custom template search dir

   --validationFailAsError validation fail as error

   -x, --xargs args like -x a=1 -x b=2. allow multi instance.

   -v, --verbose verbose

   --help Display this help screen.

   --version Display version information.

```

| Parameter               | Required | Default | Description                                                  |
| ----------------------- | -------- | ------- | ------------------------------------------------------------ |
| -s, --schemaCollector   | no       | default | schema root collector                                        |
| --schemaPath            | yes      |         | the root input file for the schema root collector            |
| -t, --target            | is       |         | generate target, take one of the schema global parameter target |
| -c, --codeTarget        | No       |         | Generated code target. There can be 0-n of them. Such as `-c cs-bin -c java-json` |
| -d, --dataTarget        | No       |         | Generated data target. There can be 0-n of them. Such as `-d bin -d json` |
| -p, --pipeline          | No       | default | Generate a pipeline. Defaults to the built-in DefaultPipeline |
| -i, --inlcudeTag        | No       |         | Records containing this tag will be output to the data target |
| -e, --excludeTag        | No       |         | Records containing this tag will not be output to the data target |
| -o, --outputTable       | No       |         | Specify the table to be generated, there can be multiple, for example `-o item.tbItem -o bag.TbBag`. If this parameter is not specified, the exported table list will be calculated according to the group rules |
| --timeZone              | No       |         | Specify the current time zone, the default is the local time zone. This parameter affects the datetime type. This parameter is the time zone name under linux or win, such as `Asia/Shanghai` or `China Standard Time` |
| --customTemplateDir     | No       |         | Custom template search path, priority search this path, and then search the default Templates path |
| --validationFailAsError | No       | false   | Build fails if any validators fail. This parameter is generally used in official release |
| -x, --xargs             | No       |         | Specify some special arguments. Which parameters are required is determined by the modules involved in the generation pipeline run |

##SchemaCollector

The Luban.SchemaCollector.Builtin project implements DefaultSchemaCollector, which supports a definition format similar to older versions of Luban. The schemaCollector is named default.

## Code Target

Currently built-in support for the following code targets:

| code target     | description                                                  |
| --------------- | ------------------------------------------------------------ |
| cs-bin          | C#, read bin format files                                    |
| cs-simple-json  | C#, use SimpleJSON to read json files, recommended for Unity clients |
| cs-dotnet-json  | C#, use System.Text.Json library to read json files, recommended for dotnet core server |
| lua-lua         | lua, read files in lua format                                |
| lua-bin         | lua, read bin format files                                   |
| java-bin        | java, read bin format files                                  |
| java-json       | java, use the gson library to read json format files         |
| cpp-bin         | cpp, read bin format files                                   |
| go-bin          | go, read bin format files                                    |
| go-json         | go, read json format files                                   |
| python-json     | python, read json format files                               |
| gdscript-json   | gdscript, read json format files. Note that if you use C# language development, it is recommended to use the more efficient cs-bin format |
| typescript-json | typescript, read json format files                           |
| protobuf2       | generate schema file of proto2 syntax                        |
| protobuf3       | generate schema file of proto3 syntax                        |
| flatbuffers     | generate schema files for flatbuffers                        |

:::caution

The code target must match the data target, otherwise the loading will fail.

:::

When generating multiple code targets at a time, the output directory must be specified for each code target, otherwise they will overwrite each other. In practice, it is also impossible to output different codes to the same directory.

Most of Luban's built-in templates use the [Cascading Option](./cascadingoption) mechanism, you only need to specify the output directory parameters for each target with `<code target name>.outputCodeDir` parameter.

##Data Target

The following data targets are supported built-in:

| data target      | description                                                  |
| ---------------- | ------------------------------------------------------------ |
| bin              | Luban's unique binary format, compact and efficient, recommended for official release |
| bin-offset       | Record the index position of each record in the data file exported in bin format, which can be used for lazy loading with record granularity |
| json             | json format                                                  |
| lua              | lua format                                                   |
| xml              | xml format                                                   |
| yml              | yaml format                                                  |
| bson             | bson format                                                  |
| msgpack          | binary format of msgpack                                     |
| protobuf-bin     | binary format of protobuf                                    |
| protobuf-json    | JSON format supported by protobuf3                           |
| flatbuffers-json | json format supported by flatbuffers                         |


If you want to output multiple targets at a time, the solution is similar to code target. Just use the `<data target name>.outputDataDir` parameter to specify the output directory parameters for each target.

Each code target can only read one matching data format. For example, c# code generated by cs-bin can only read data in bin format, and java code generated by java-json can only read data in json format.

## Pipeline

A default pipeline DefaultPipeline is implemented in Luban.Core, named default. Users can implement their own Pipeline.

## xargs

There are also a large number of command line parameters. Since they are unique parameters of each customizable module in Pipeline, these parameters are not included in the standard command line parameters, and the `-x --xargs` parameter command is used uniformly.

The parameters used by the built-in modules are:

| Parameter             | Description                                                  | Available Values                                             | Example                            |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------- |
| inputDataDir          | root directory of source data files                          |                                                              | -x inputDataDir=/my/datatable/path |
| outputCodeDir         | output directory for code targets                            |                                                              | -x outputCodeDir=/my/output/dir    |
| outputDataDir         | output directory of data target                              |                                                              | -x outputDataDir=/my/output/dir    |
| codeStyle             | The naming style of the code target, the built-in Code Target will automatically set the codeStyle that matches the target language, no need to specify explicitly | none, csharp-default, java-default, go-default, lua-default, typescript -default, cpp-default, python-default | -x codeStyle=csharp-default        |
| dataExporter          | data exporter                                                | null, default                                                | -x dataExporter=default            |
| codePostprocess       | code postprocessor, can be multiple                          | does not implement any built-in postprocess                  | -x codePostProcess=a,b,c           |
| dataPostprocess       | data postprocessor, can be multiple                          | does not implement any built-in postprocess                  | -x dataPostProcess=a,b             |
| outputSaver           | data saver, the default is local, that is, output to the local directory, if you do not want to output any files, you can use null | null, local                                                  | -x outputSaver=local               |
| l10n.textProviderName | Localized text provider                                      |                                                              | -x l10n.textProviderName=default   |
| l10n.textProviderFile | localized text data file                                     |                                                              | -x l10n.textProviderFile=xxxx      |
| forceLoadDatas        | Load source data even if there is no data target             |                                                              | -x forceLoadDatas=1                |
| pathValidator.rootDir | Root directory for path validator to search for files        |                                                              | -x pathValidator.rootDir=/xx/yy    |

## OutputSaver

Holder for the final generated data. Currently two savers local and null are implemented.

local saves the file to the local directory. null does nothing. local is the saver used by default, and the general generation task uses local. For those who only want to verify the configuration table and do not want to generate any data, using the null saver can achieve this goal.

## Example

Some examples of common build commands are shown below. For more examples, please refer to [luban_examples/Projects](https://github.com/focus-creative-games/luban_examples/tree/main/Projects).

###unity + c# + bin

Example project [Csharp_Unity_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_bin).

```bat

set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c cs-bin ^
    -d bin  ^
    --schemaPath %CONF_ROOT%\Defines\__root__.xml ^
    -x inputDataDir=%CONF_ROOT%\Datas ^
    -x outputCodeDir=Assets/Gen ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json

```

### unity + c# + json

Example project [Csharp_Unity_json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json).


```bat

set WORKSPACE=..\..

set GEN_CLIENT=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %GEN_CLIENT% ^
    -t all ^
    -c cs-simple-json ^
    -d json  ^
    --schemaPath %CONF_ROOT%\Defines\__root__.xml ^
    -x inputDataDir=%CONF_ROOT%\Datas ^
    -x outputCodeDir=Assets/Gen ^
    -x outputDataDir=..\GenerateDatas\json ^
    -x pathValidator.rootDir=D:\workspace2\luban_examples\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@D:\workspace2\luban_examples\DesignerConfigs\Datas\l10n\texts.json


```

### dotnet + c# + bin

Example project [Csharp_DotNet_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_DotNet_bin).

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c cs-bin ^
    -d bin  ^
    --schemaPath %CONF_ROOT%\Defines\__root__.xml ^
    -x inputDataDir=%CONF_ROOT%\Datas ^
    -x outputCodeDir=Gen ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json

```


### go + bin

Example project [Go_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Go_bin).

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c go-bin ^
    -d bin  ^
    --schemaPath %CONF_ROOT%\Defines\__root__.xml ^
    -x inputDataDir=%CONF_ROOT%\Datas ^
    -x outputCodeDir=gen ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json ^
    -x lubanGoModule=demo/luban

```

### java + bin

Example project [Java_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Java_bin)

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c java-bin ^
    -d bin  ^
    --schemaPath %CONF_ROOT%\Defines\__root__.xml ^
    -x inputDataDir=%CONF_ROOT%\Datas ^
    -x outputCodeDir=src/main/gen ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json
```

### Used to curate and check configuration without generating any code and files

Example project [ConfigCheck](https://github.com/focus-creative-games/luban_examples/tree/main/DesignerConfigs).

```bat
set WORKSPACE=..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    --schemaPath %CONF_ROOT%\Defines\__root__.xml ^
    -x inputDataDir=%CONF_ROOT%\Datas ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json ^
    -x forceLoadDatas=1
```

### Simultaneously generate cs-bin and java-bin code

```bat

set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DesignerConfigs

dotnet %LUBAN_DLL% ^
    -t all ^
    -c cs-bin ^
    -c java-bin ^
    -d bin  ^
    --schemaPath %CONF_ROOT%\Defines\__root__.xml ^
    -x inputDataDir=%CONF_ROOT%\Datas ^
    -x cs-bin.outputCodeDir=cs_output_path ^
    -x java-bin.outputCodeDir=java_output_path ^
    -x outputDataDir=..\GenerateDatas\bytes ^
    -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
    -x l10n.textProviderFile=*@%WORKSPACE%\DesignerConfigs\Datas\l10n\texts.json

```

