# 快速上手

## 安装

1. 安装[dotnet sdk 7.0](https://dotnet.microsoft.com/download/dotnet/7.0)
2. 下载[luban_examples项目](https://github.com/focus-creative-games/luban_examples)。该项目中包含测试配置以及大量的示例项目。为方便起见，后续提及到的文件，默认都指这个项目中的文件。

## 准备配置工程

直接使用luban_examples项目中的MiniTemplate，后续操作在此基础上修改。你也可以复制MiniTemplate到其他目录后再作修改，但需要修改 `MiniTemplate/gen.bat`文件中相关路径。

## 创建Reward表

在`MiniTemplate/Datas`目录下创建reward.xlsx文件，内容如下：

   |##var|id|name|desc|count|
   |-|-|-|-|-|
   |##type|int|string|string|int|
   |##group||c|c,s|s|
   |##|id|名字|描述|个数|
   ||1001|item1| desc1| 10|
   ||1002|item2| desc2| 10|

简略介绍一下文件格式：

- 第1行是字段名行。单元格 A1 必须以##开头。表示这是一个有效数据表。
- 第2行是字段类型行。第1个单元格必须为 ##type。
- 第3行是分组行。`c`表示字段属于客户端，`s`表示属于属于服务器,`c,s`表示同时属于所有，留空也表示属于所有。
- 第4行是注释行。 以##开头。 可以有0-N个注释行，而且可以出现在任何位置
- 第5行起是数据行。

luban并没有限制标题头行的位置和数量。像`##xxx`之类的行可以任意调整顺序和位置，而`##group`和`##`行也是可选的。

推荐使用`xx_yy_zz`风格的字段名，因为luban会根据生成的语言，自动转化为
该语言推荐的命名风格的名称。你也可以手动指定你期望的命令风格。

在Datas目录下的__tables__.xlsx添加reward表声明，如下图：

  |##var|full_name|value_type|read_schema_from_file|input|...|
  |-|-|-|-|-|-|-|
  ||demo.TbReward|demo.Reward|true|reward.xlsx||

至此完成reward表的创建工作！

## 项目准备

以最常见的 unity + c# + json 为例。示例参考项目为 [Csharp_Unity_Json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json)。

拷贝Csharp_Unity_Json项目中`Assets\LubanLib`目录到你的Unity项目中，位置没有限制。**然后在Unity的PlayerSettings里开启unsafe选项**（如果你们项目要求不开启unsafe，请到群里求助）。
此时尝试编译项目，如果没有编译错误，表示成功引入了Luban相关库代码。


## 准备生成脚本

创建`gen.bat`文件，放到项目下（位置无要求）。

```bat

set LUBAN_DLL=<Luban.dll路径>
set CONF_ROOT=<DesignerConfigs路径>

dotnet %LUBAN_DLL% ^
    -t client ^
    -c cs-simple-json ^
    -d json  ^
    --schemaPath %CONF_ROOT%\Defines\__root__.xml ^
    -x inputDataDir=%CONF_ROOT%\Datas ^
    -x outputCodeDir=<cs代码输出目录> ^
    -x outputDataDir=<json数据输出目录>

pause
```

简单介绍bat文件中各项参数：

- LUBAN_DLL Luban.dll文件的路径。 指向 `luban_examples/Tools/Luban/Luban.dll`
- CONF_ROOT 配置项目的路径。指向 `luban_examples/DesignerConfigs`
- '-t' 生成目标。可以为 client、server、all之类的值
- '-c' 生成的代码类型。 `cs-simple-json`为生成使用SimpleJSON加载json数据的c#代码
- '-d' 生成的数据类型
- 'inputDataDir' 配置表（如xlsx）的根目录
- 'outputCodeDir' c#代码的输出目录
- 'outputDataDir' json数据的输出目录

调整bat文件中各项配置路径为恰当的值。如果有疑惑，可以参考 `Csharp_Unity_Json`项目的`gen.bat`文件。运行该脚本如果一切正常，会产生一系列日志，最终一行是 `bye~`。

## 加载配置

只需一行代码即可加载所有配置表。整个游戏运行期间只加载一次（除非要运行中重新加载配置）。实践中在创建tables后将它保存起来，以便后续使用。

```csharp

var tables = new cfg.Tables(file => JSON.Parse(File.ReadAllText(gameConfDir + "/" + file + ".json")));

```

## 使用配置

cfg.Tables 里包含所有配置表的一个实例字段。加载完 cfg.Tables 后，用 `tables.<表名>` 获得那个表实例，接着对该表做后续操作。
例如我们要打印Reward表id = 1001 的那个奖励信息，代码如下：

```csharp
cfg.demo.Reward reward = tables.TbReward.Get(1001);
Console.WriteLine("reward:{0}", reward);
```

你可能会注意到，reward表字段名 id,name,desc的首字母被大写了。这是因为工具会根据输出的语言，自动作相应代码风格的字段名转换，也即 boo_bar 会被转换为 BooBar 这样的名字。
因此推荐配置字段定义时统一使用 xx_yy_zz 的风格。

至此完成 配置加载与使用!

