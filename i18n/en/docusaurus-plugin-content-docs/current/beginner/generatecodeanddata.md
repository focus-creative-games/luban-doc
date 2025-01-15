# Generate Code and Data

Luban not only supports exporting configuration data, but also has built-in support for generating code in multiple languages ​​for runtime configuration loading. At the same time, Luban also supports popular message frameworks such as protobuf, flatbuffers, and msgpack.

Even if the language you use is not in the default supported language list, it can also be supported by these message frameworks.

## Supported languages

- c++ (11+)
- c# (.net framework 2+. dotnet core 2+)
- java (1.6+)
- go (1.10+)
- lua (5.1+)
- typescript (3.0+)
- python (2.7+ and 3.0+)
- gdscript (4.0+)
- php
- rust

## Supported data formats

- bin (**recommended for officially released projects**)

- json
- lua
- xml
- yaml

## Generate data

The command line parameter `-d {dataTarget}` is used to specify the generated data type, and the parameter `-x outputDataDir={dataOutputDir}` is used to specify the code output directory. Suppose we want to generate json data, the example is as follows:

```bat
set GEN_CLIENT={path to Luban.dll}
set CONF_ROOT={path to DataTables directory}

dotnet %GEN_CLIENT% ^
-t client ^
-d json ^
--conf %CONF_ROOT%\luban.conf ^
-x outputDataDir=..\GenerateDatas\json

pause
```

For more dataTarget, see [DataTarget List](../manual/commandtools.md#data-target).

## Generate code

The command line parameter `-c {codeTarget}` is used to specify the type of code to be generated, and the parameter `-x outputCodeDir={codeOutputDir}` is used to specify the code output directory. Suppose we want to generate C# code to load JSON data, the example is as follows:

```bat

set GEN_CLIENT={path to Luban.dll}
set CONF_ROOT={path to DataTables directory}

dotnet %GEN_CLIENT% ^
-t client ^
-c cs-simple-json ^
--conf %CONF_ROOT%\luban.conf ^
-x outputCodeDir=Assets/Gen

pause
```

In codeTarget `cs-simple-json`, `cs` means generating C# language code, `simple` means using SimpleJson to load JSON files, and `json` means loading JSON data. All codeTargets follow this naming rule.

For the same data format (such as JSON), the data files generated for all languages ​​are the same. That is, the exported data is not affected by the `-c` parameter.

For more codeTargets, see [CodeTarget List](../manual/commandtools.md#code-target).

:::warning

Please do not point `outputCodeDir` and `outputDataDir` to the same directory, they will overwrite each other!
:::

## Generate code and data at the same time

Running two commands to generate code and data separately is not only troublesome, but also increases the generation time. Luban supports generating code and data at once, as shown below:

```bat

set GEN_CLIENT={path to Luban.dll}
set CONF_ROOT={path to DataTables directory}

dotnet %GEN_CLIENT% ^
-t client ^
-c cs-simple-json ^
-d json ^
--conf %CONF_ROOT%\luban.conf ^
-x outputCodeDir=Assets/Gen ^
-x outputDataDir=..\GenerateDatas\json
```

It is also possible to generate multiple languages ​​and data formats at once, as long as you specify multiple `-c` and `-d` parameters, but they must be in the same group (that is, the -t parameter is the same). Obviously, they should not be output to the same directory. Luban supports [hierarchical parameter mechanism](../manual/cascadingoption). When there are multiple codeTargets or dataTargets
, their output directories can be specified separately through `{codeTarget}.outputCodeDir=xxx` and `{dataTarget}.outputDataDir=xxx`. The example is as follows:

```bat
set GEN_CLIENT={path to Luban.dll}
set CONF_ROOT={path to DataTables directory}

dotnet %GEN_CLIENT% ^
-t client ^
-c cs-simple-json ^
-c cs-bin ^
-d json ^
-d bin ^
--conf %CONF_ROOT%\luban.conf ^
-x cs-simple-json.outputCodeDir=Assets/Gen/Json ^
-x bin.outputCodeDir=Assets/Gen/Bin ^
-x cs-simple-json.outputDataDir=..\GenerateDatas\json ^
-x bin.outputDataDir=..\GenerateDatas\bin

```

:::warning

Please do not point multiple `outputCodeDir` to the same directory, and do not point multiple `outputDataDir` to the same directory, they will overwrite each other!
:::
