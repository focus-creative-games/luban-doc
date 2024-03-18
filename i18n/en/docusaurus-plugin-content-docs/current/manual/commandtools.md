# Command line tools

## Cross-platform

Thanks to the cross-platform capabilities of .net, Luban can run on mainstream Win, Linux and macOS operating systems.

## Command format

```bat

dotnet <path_of_luban.dll> [args]

args:

   -s, --schemaCollector schema collector name

   --conf Required. luban conf file

   -t, --target Required. target name

   -c, --codeTarget code target name

   -d, --dataTarget data target name

   -p, --pipeline pipeline name

   -f, --forceLoadTableDatas force load table datas when not any dataTarget

   -i, --includeTag include tag

   -e, --excludeTag exclude tag

   -o, --outputTable output table

   --timeZone time zone

   --customTemplateDir custom template dirs

   --validationFailAsError validation fail as error

   -x, --xargs args like -x a=1 -x b=2

   -v, --verbose verbose

   --help Display this help screen.

   --version Display version information.

```

|Parameters|Required|Default value|Description|
|-|-|-|-|
|-s, --schemaCollector|no|default|schema root collector|
|--conf| is ||luban configuration item|
|-t, --target| is || to generate the target, taking one of the schema global parameters target |
|-c, --codeTarget|No||Generated code target. There can be 0-n. Such as `-c cs-bin -c java-json`|
|-d, --dataTarget|No||The generated data target. There can be 0-n. Such as `-d bin -d json`|
|-f, --forceLoadTableDatas|No|false|Forcibly load the configuration data even if no dataTarget is specified, suitable for checking the legality of the configuration before submitting the configuration table|
|-p, --pipeline|No|default|Generate pipeline. Defaults to the built-in DefaultPipeline |
|-i, --inlcudeTag|No||Records containing this tag will be output to the data target|
|-e, --excludeTag|No||Records containing this tag will not be output to the data target|
|-o, --outputTable|No||Specify the table to be generated, there can be multiple, for example `-o item.tbItem -o bag.TbBag`. If this parameter is not specified, the exported table list is calculated according to group rules |
|--timeZone|No||Specify the current time zone, which defaults to the local time zone. This parameter affects datetime types. This parameter is the time zone name under linux or win, such as `Asia/Shanghai` or `China Standard Time`|
|--customTemplateDir|No||Customize the template search path, search this path first, and then search the default Templates path|
|--validationFailAsError|No |false|The build fails if any validator fails. This parameter is generally used during official release |
|-x, --xargs|No||Specify some special parameters. The exact parameters required are determined by the modules involved in the run of the build pipeline |

## SchemaCollector

The Luban.SchemaCollector.Builtin project implements DefaultSchemaCollector, which supports a definition format similar to older versions of Luban. The schemaCollector is named default.

## Code Target

Currently, the following code targets are supported built-in:

|code target|description|
|-|-|
|cs-bin| C#, read bin format files|
|cs-simple-json| C#, use SimpleJSON to read json files, recommended for Unity client|
|cs-dotnet-json| C#, use System.Text.Json library to read json files, recommended for dotnet core server|
|cs-editor-json| C#, read and save records as a single json file, suitable for custom editors to save and load original configuration files|
|lua-lua| lua, read files in lua format|
|lua-bin| lua, read bin format files|
|java-bin| java, read bin format files|
|java-json| java, use the gson library to read json format files|
|cpp-bin| cpp, read bin format files|
|go-bin| go, read bin format files|
|go-json| go, read json format files|
|python-json|python, read json format files|
|gdscript-json|gdscript, reads json format files. Note that if you develop using C# language, it is recommended to use the more efficient cs-bin format |
|typescript-json| typescript, read json format files|
|protobuf2| Generate schema file of proto2 syntax|
|protobuf3| Generate schema file of proto3 syntax|
|flatbuffers| Generate schema file for flatbuffers|

:::caution

The code target must match the data target, otherwise the loading will fail.

:::

When generating multiple code targets at one time, the output directory must be specified separately for each code target, otherwise they will overwrite each other. In practice, it is impossible to output different codes to the same directory.

Most of Luban's built-in templates use the [Cascading Option](./cascadingoption) mechanism. You only need to use the `<code target name>.outputCodeDir` parameter
Just specify the output directory parameters for each target separately.


## Data Target

Built-in support for the following data targets:

|data target|description|
|-|-|
|bin| Luban’s unique binary format, compact and efficient, recommended for official release|
|bin-offset|Records the index position of each record in the data file exported in bin format, which can be used for lazy loading with record granularity|
|json|json format|
|lua|lua format|
|xml|xml format|
|yml|yaml format|
|bson|bson format|
|msgpack|binary format of msgpack|
|protobuf-bin|binary format of protobuf|
|protobuf-json|json format supported from protobuf3|
|flatbuffers-json|json format supported by flatbuffers|
|text-list|Output all text keys that appear in the configuration, sorted from small to large|


If you want to output multiple targets at one time, the solution is similar to code target. Just use the `<data target name>.outputDataDir` parameter
Just specify the output directory parameters for each target separately.

Each code target can only read one matching data format. For example, the c# code generated by cs-bin can only read bin format data, and the java code generated by java-json can only read json format.

## Pipeline

A default pipeline DefaultPipeline is implemented in Luban.Core, named default. Users can implement their own Pipeline.

## xargs

There are also a large number of command line parameters. Since they are unique to each customizable module in the Pipeline, these parameters are not included in the standard command line parameters and are uniformly used in the `-x --xargs` parameter instructions.

The parameters used by the built-in modules are:

|Parameters|Description|Available values|Example|
|-|-|-|-|
|outputCodeDir|The output directory of the code target|| -x outputCodeDir=/my/output/dir|
|outputDataDir|The output directory of the data target|| -x outputDataDir=/my/output/dir|
|codeStyle|The naming style of the code target. The built-in Code Target will automatically set the codeStyle that matches the target language. There is no need to explicitly specify |none, csharp-default, java-default, go-default, lua-default, typescript -default,cpp-default,python-default| -x codeStyle=csharp-default|
|namingConvention.{codeTarget}.{location}|codeTarget is the target name specified in the `--codeTarget` parameter. Location is the style location, and the optional values are namespace, type, method, property, field, and enumItem. For details, see [Code Style](./codestyle). This parameter is a hierarchical option. If {codeTarget} is not specified, it will take effect on all targets |none, pascal, camel, upper, snake|-x namingConvention.cs-bin.field=pascal|
|dataExporter|Data Exporter| null, default|-x dataExporter=default|
|codePostprocess|Code postprocessor, can be multiple|Does not implement any built-in postprocess| -x codePostProcess=a,b,c|
|dataPostprocess|Data postprocessor, can be multiple|Does not implement any built-in postprocess| -x dataPostProcess=a,b|
|outputSaver|Data saver, the default is local, that is, output to the local directory. If you do not want to output any files, you can use null|null, local| -x outputSaver=local|
|outputSaver.{codeTarget\|dataTarget}.cleanUpOutputDir|Whether to clear redundant files in the outputCodeDir or outputDataDir directory before outputting the file, the default is true||-x outputSaver.cs-bin.cleanUpOutputDir=0|
|l10n.provider|Localized text Provider. If this parameter is not set, no localization related operations will be performed, including text verification and static conversion |default| -x l10n.provider=default|
|l10n.textFile.path|Localized text data file, this value is required when l10.provider is set|| -x l10n.textFile.path=xxxx|
|l10n.textFile.keyFieldName|The field name of the data item key field in the localized text data file|| -x l10n.textFile.keyFieldName=key|
|l10n.textFile.languageFieldName|The field name of the text value field corresponding to the language of the data item in the localized text data file|| -x l10n.languageFieldName=en|
|l10n.convertTextKeyToValue|Perform static localization and replace the key with the text value of the corresponding language|| -x l10n.convertTextKeyToValue=1|
|l10n.textListFile|The file containing the list of all text keys in the output configuration, used with DataTarget text-list|
|pathValidator.rootDir|The root directory used by the path validator to search for files|| -x pathValidator.rootDir=/xx/yy|
|lineEnding|The line ending character of the generated code file|can be CR, LF, CRLF. If not specified, Environment.NewLine is used as the line ending character|-x lineEnding=LF|

## OutputSaver

The holder of the final generated data. Two savers, local and null, are currently implemented.

local saves files to a local directory. null performs no operation. Local is the saver used by default. Generally, local is used for generation tasks. If you only want to verify the configuration table and do not want to generate any data, use null
Saver can achieve this goal.

## Example

Some common generation command examples are shown below. For more examples, please refer to [luban_examples/Projects](https://github.com/focus-creative-games/luban_examples/tree/main/Projects).

### unity + c# + bin

Example project [Csharp_Unity_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_bin).

```bat

set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %LUBAN_DLL% ^
     -t all ^
     -c cs-bin ^
     -dbin^
     --conf %CONF_ROOT%\luban.conf ^
     -x outputCodeDir=Assets/Gen ^
     -x outputDataDir=..\GenerateDatas\bytes ^
     -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
     -x l10n.textProviderFile=*@%WORKSPACE%\DataTables\Datas\l10n\texts.json

```

### unity + c# + json

Example project [Csharp_Unity_json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json).


```bat

set WORKSPACE=..\..

set GEN_CLIENT=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %GEN_CLIENT% ^
     -t all ^
     -c cs-simple-json ^
     -djson^
     --conf %CONF_ROOT%\luban.conf ^
     -x outputCodeDir=Assets/Gen ^
     -x outputDataDir=..\GenerateDatas\json ^
     -x pathValidator.rootDir=D:\workspace2\luban_examples\Projects\Csharp_Unity_bin ^
     -x l10n.textProviderFile=*@D:\workspace2\luban_examples\DataTables\Datas\l10n\texts.json


```

### dotnet + c# + bin

Example project [Csharp_DotNet_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_DotNet_bin).

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %LUBAN_DLL% ^
     -t all ^
     -c cs-bin ^
     -dbin^
     --conf %CONF_ROOT%\luban.conf ^
     -x outputCodeDir=Gen ^
     -x outputDataDir=..\GenerateDatas\bytes ^
     -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
     -x l10n.textProviderFile=*@%WORKSPACE%\DataTables\Datas\l10n\texts.json

```


### go + bin

Example project [Go_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Go_bin).

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %LUBAN_DLL% ^
     -t all ^
     -c go-bin ^
     -dbin^
     --conf %CONF_ROOT%\luban.conf ^
     -x outputCodeDir=gen ^
     -x outputDataDir=..\GenerateDatas\bytes ^
     -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
     -x l10n.textProviderFile=*@%WORKSPACE%\DataTables\Datas\l10n\texts.json ^
     -x lubanGoModule=demo/luban

```

### java + bin

Example project [Java_bin](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Java_bin)

```bat
set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %LUBAN_DLL% ^
     -t all ^
     -c java-bin ^
     -dbin^
     --conf %CONF_ROOT%\luban.conf ^
     -x outputCodeDir=src/main/gen ^
     -x outputDataDir=..\GenerateDatas\bytes ^
     -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
     -x l10n.textProviderFile=*@%WORKSPACE%\DataTables\Datas\l10n\texts.json
```

### Used for planning and checking configuration, no code or files are generated.

Example project [ConfigCheck](https://github.com/focus-creative-games/luban_examples/tree/main/DataTables).

```bat
set WORKSPACE=..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %LUBAN_DLL% ^
     -t all ^
     --conf %CONF_ROOT%\luban.conf ^
     -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
     -x l10n.textProviderFile=*@%WORKSPACE%\DataTables\Datas\l10n\texts.json ^
     -x forceLoadDatas=1
```

### Generate cs-bin and java-bin code at the same time

```bat

set WORKSPACE=..\..

set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %LUBAN_DLL% ^
     -t all ^
     -c cs-bin ^
     -c java-bin ^
     -dbin^
     --conf %CONF_ROOT%\luban.conf ^
     -x cs-bin.outputCodeDir=cs_output_path ^
     -x java-bin.outputCodeDir=java_output_path ^
     -x outputDataDir=..\GenerateDatas\bytes ^
     -x pathValidator.rootDir=%WORKSPACE%\Projects\Csharp_Unity_bin ^
     -x l10n.textProviderFile=*@%WORKSPACE%\DataTables\Datas\l10n\texts.json

```