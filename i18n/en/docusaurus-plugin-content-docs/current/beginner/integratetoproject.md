# Integrate Luban To Your Project

## Install dotnet SDK

Follow the [Quick Start](./quickstart) requirements and install [dotnet sdk 8.0](https://dotnet.microsoft.com/download/dotnet/8.0).

## Download [luban_examples project](https://github.com/focus-creative-games/luban_examples)

Download the luban_examples project using git clone or zip download.

## Compile Luban (optional)

Generally, the `luban_examples/Tools/Luban` directory already contains the latest Luban binary code. If you want to compile it yourself, follow these steps:

- Clone [Luban](https://gitee.com/focus-creative-games/luban) to the same directory as luban_examples (i.e. luban and luban_examples are in the same directory), the directory name must be luban

- Run `luban_examples/Tools/build-luban.bat`

If everything goes well, the `luban_examples/Tools/Luban` directory will be replaced with the latest version of Luban binary code.

## Copy Luban tools to your project

Most projects generally have a dedicated directory for these third-party tools, such as `{proj}/Tools`, copy `luban_examples/Tools/Luban` to any suitable directory.

## Create a planning configuration directory

Copy `luban_examples/MiniTemplate` to the appropriate location of the project, such as `{proj}`. It is recommended to rename MiniTemplate to DataTables or another name, and it is recommended to keep the original name of the subdirectory under MiniTemplates.

## Modify luban.conf

The location of the Luban tool is different for each project, so you need to modify the path of Luban.dll in the `gen.bat` (or gen.sh) command. Assume that you copied the MiniTemplate directory to the `{DataTables}` directory of your project.

Open `{DataTables}/gen.bat` and replace `%WORKSPACE%\Tools\Luban\Luban.dll` in `set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll` with the actual directory of Luban.dll.

Luban.dll is in the Luban tool directory.

At this time, run `{DataTables}/gen.bat` to ensure that it can run correctly.

## Add gen.bat scripts for client and server

Create gen_client.bat script in the appropriate location of the client, the content is as follows:

```bat
set GEN_CLIENT={path to Luban.dll}
set CONF_ROOT={path to DataTables directory}

dotnet %GEN_CLIENT% ^
-t client ^
-c cs-simple-json ^
-d json ^
--conf %CONF_ROOT%\luban.conf ^
-x outputCodeDir={path to generated code} ^
-x outputDataDir={path to generated data}

```

Please replace `-c cs-simple-json` and `-d json` according to the actual language used and the exported data format.

:::warning

Luban will delete all other files in the outputCodeDir directory when it is generated. Please provide a separate directory for it. Do not point to the `Assets/Scripts` directory, as it will delete other code files! The same applies to outputDataDir.

:::

Create the gen_server.bat script in the appropriate location of the server, with the following content:

```bat
set GEN_CLIENT={path to Luban.dll}
set CONF_ROOT={path to DataTables directory}

dotnet %GEN_CLIENT% ^
-t server ^
-c cs-dotnet-json ^
-d json ^
--conf %CONF_ROOT%\luban.conf ^
-x outputCodeDir={path to generated code} ^
-x outputDataDir={path to generated data}

```

Please replace `-c cs-dotnet-json` and `-d json` according to the actual language used and the exported data format.

## Load configuration at runtime

Please see the next section [Load configuration at runtime](./loadinruntime).
