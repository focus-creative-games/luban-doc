# Get started quickly

## Install

1. Install [dotnet sdk 8.0](https://dotnet.microsoft.com/download/dotnet/8.0) or higher version sdk
2. Download [luban_examples project](https://github.com/focus-creative-games/luban_examples). The project contains test configurations and a large number of example projects. For convenience, the files mentioned later refer to the files in this project by default.

:::tip

The Luban in the `luban_examples/Tools/Luban` directory may not be the latest version. Developers can either download the latest version of Luban directly from [release](https://github.com/focus-creative-games/luban/releases), or compile it themselves from Luban source code.

:::

## Prepare to configure the project

Use MiniTemplate in the luban_examples project directly, and subsequent operations will be modified on this basis. You can also copy MiniTemplate to another directory and then modify it, but you need to modify the relevant path in the `MiniTemplate/gen.bat` file.

## Create Reward table

Create the `reward.xlsx` file in the `MiniTemplate/Datas` directory with the following content:

![reward](/img/cases/quickstart_reward.jpg)

A brief introduction to the file format:

- Line 1 is the field name line. Cell A1 must start with ##. Indicates that this is a valid data table.
- Line 2 is the field type line. Cell 1 must be ##type.
- Line 3 is the grouping line. `c` means the field belongs to the client, `s` means it belongs to the server, `c,s` means it belongs to everyone at the same time, leaving it blank also means it belongs to everyone.
- Line 4 is the comment line. To ... beginning. There can be 0-N comment lines and can appear anywhere
- Line 5 onwards is the data line.

Luban does not limit the position and number of header lines. Lines like `##xxx` can be ordered and positioned arbitrarily, while `##group` and `##` lines are also optional.

It is recommended to use field names in the `xx_yy_zz` style, because luban will automatically convert it to
The name of the naming style recommended for the language. You can also manually specify your desired command style.

Add the reward table declaration in `__tables__.xlsx` in the Datas directory, as shown below:

![reward](/img/cases/quickstart_table.jpg)

This completes the creation of the reward table!

## Project preparation

Take the most common unity + c# + json as an example. The example reference project is [Csharp_Unity_Json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json),
For other types, please refer to the corresponding projects in the Projects directory.

Install the com.code-philosophy.luban package in Package Manager at the address `https://gitee.com/focus-creative-games/luban_unity.git` or `https://github.com/focus-creative-games/luban_unity.git` (or from `https://github.com/focus-creative- games/luban_unity`download).



## Prepare to generate script

:::warning
If your excel file directory is not the Datas directory at the same level as the luban.conf file like MiniTemplates, you need to modify the dataDir field in luban.conf.
:::

Create a `gen.bat` file and place it under the project (the location is not required).

```bat

set LUBAN_DLL=<Luban.dll path>
set CONF_ROOT=<DataTables path>

dotnet %LUBAN_DLL% ^
     -tclient^
     -c cs-simple-json ^
     -djson^
     --conf %CONF_ROOT%\luban.conf ^
     -x outputCodeDir=<cs code output directory> ^
     -x outputDataDir=<json data output directory>

pause
```

Briefly introduce the parameters in the bat file:

- LUBAN_DLL Path to the Luban.dll file. Point to `luban_examples/Tools/Luban/Luban.dll`
- CONF_ROOT path to the configuration project. Point to `luban_examples/DataTables`
- '-t' generate target. Can be values such as client, server, all
- '-c' Type of code generated. `cs-simple-json` generates c# code that uses SimpleJSON to load json data
- '-d' generated data type
- 'outputCodeDir' C# code output directory
- 'outputDataDir' json data output directory

Adjust the configuration paths in the bat file to appropriate values. If you have any doubts, you can refer to the `gen.bat` file of the `Csharp_Unity_Json` project. Running the script, if everything goes well, will produce a series of logs, the last line of which is `bye~`.

## Load configuration

All configuration tables can be loaded with just one line of code. It is only loaded once during the entire game run (unless the configuration is reloaded during runtime). In practice, tables are saved after they are created for subsequent use.

```csharp

string gameConfDir = "<outputDataDir>"; // Replace with the directory pointed to by outputDataDir in gen.bat
var tables = new cfg.Tables(file => JSON.Parse(File.ReadAllText($"{gameConfDir}/{file}.json")));

```

## Use configuration

cfg.Tables contains an instance field for all configuration tables. After loading cfg.Tables, use `tables.<table name>` to obtain the table instance, and then perform subsequent operations on the table.
For example, if we want to print the reward information with Reward table id = 1001, the code is as follows:

```csharp
cfg.demo.Reward reward = tables.TbReward.Get(1001);
Console.WriteLine("reward:{0}", reward);
```

You may notice that the first letters of the reward table field names id, name, and desc are capitalized. This is because the tool will automatically convert the field names according to the corresponding coding style according to the output language, that is, boo_bar will be converted into a name like BooBar.
Therefore, it is recommended to use the xx_yy_zz style for field names in the configuration.

This completes the configuration usage example!
