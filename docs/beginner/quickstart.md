# 快速上手

> 感谢[**宝鱼偷偷摸鱼**](https://space.bilibili.com/1916310) 贡献的视频教程：[**【01】新手上路**](https://www.bilibili.com/video/BV1xS4y1M7Aj) [**【02】定义配置结构**](https://www.bilibili.com/video/BV1m44y1j747) </br>
> 感谢[**L**](https://github.com/LiuOcean) 开源的[Luban Unity工具](https://github.com/LiuOcean/Luban_Unity_GUI)

## 安装

1. 安装[dotnet sdk 6.0](https://dotnet.microsoft.com/download/dotnet/6.0)
2. 下载[luban_examples项目](https://github.com/focus-creative-games/luban_examples)项目中包含测试配置以及大量的示例项目。为方便起见，后续提及到的文件，默认都指这个项目中的文件。

## 配置和代码生成

配置生成使用示例 MiniTemplate，可以直接在文件夹中操作，或拷贝到一个新目录。若路径改变，请注意该示例中的脚本文件使用luban工具的路径为`..\Tools\Luban.ClientServer\Luban.ClientServer.dll`，这里可能需要修改为你使用的路径。

目录及文件说明如下，执行 gen 脚本即可正常生成。

```
luban_examples\MiniTemplate
│  .cache.meta                     # luban缓存文件
│  gen.bat                         # bat 生成脚本
│  gen.sh                          # sh 生成脚本
│
├─Datas                            # 数据源目录
│      item.xlsx                   # excel 数据源文件
│      __beans__.xlsx              # bean 定义文件，可以使用xml定义代替
│      __enums__.xlsx              # enum 定义文件，可以使用xml定义代替
│      __tables__.xlsx             # table 定义文件，可以使用xml定义代替
│
├─Gen                              # 生成的代码目录
├─output_json                      # 生成的json文件目录
└─Defines
        __root__.xml               # luban 根文件
```

此处示例生成了 json 配置文件和 对应的cs配置代码文件。使用时只要构造一个loader方法并传入Tables的构造函数即可。

### 配表示例
下面以一个新表简单讲解文件配置格式。文件内容如下：

   |##var|id|name|desc|count|
   |-|-|-|-|-|
   |##type|int|string|string|int|
   |##|id|名字|描述|个数|
   ||1001|item1| desc1| 10|
   ||1002|item2| desc2| 10|

  - 第 1 行是 主字段行，包含表字段定义。单元格 A1 必须以##开头。表示这是一个有效数据表。
  - 第 2 行是类型行，第1个单元格必须为 ##type。
  - 第 3 行是注释行。 以##开头。 可以有0-N个注释行，而且可以出现在任何位置
  - 第 4 行起是数据行。

在 Datas 目录下的__tables__.xlsx添加表声明，至此reward表的创建工作大功告成！如下图：

  |##var|full_name|value_type|define_from_file|input|...|
  |-|-|-|-|-|-|-|
  ||demo.TbReward|Reward|true|reward.xlsx||

  **像##var或者##type 这种带名字的行，可以随便调整行的位置。**  **但注意** 如果第一行是注释行，必须使用##comment，而不是##。否则会把第一行当字段名行而出错（这是出于兼容性，早期强制第一行是字段名行，允许只以##开头）。


## 生成代码和数据以及在程序中使用

有几个常见需求， 根据你的要求选择下面合适的文档

- unity + c# + json
- excel导出json，自己手写代码加载或者有其他使用目的
- 其他需求

### unity + c# + json

 示例参考项目为 [Csharp_Unity_Json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json)。

- 项目准备。  

    拷贝示例项目中 Assets\LubanLib 目录到你的Unity项目中（可以自由组织位置），**===同时在Unity的PlayerSettings里开启unsafe选项===**（如果你们项目要求不开启unsafe，请群里求助）,此时尝试编译项目，理论上应该能成功编译。

- 运行生成命令（可以参考示例项目的gen_code_json.bat）

    ```shell
    dotnet %Luban.ClientServer.dll%
    -j cfg ^
    -- ^
    --define_file <__root__.xml 定义文件的路径> ^
    --input_data_dir <配置数据根目录(Datas)的路径> ^
    --output_code_dir <生成的代码文件的路径> ^
    --output_data_dir <导出的数据文件的路径> ^
    --service all ^
    --gen_types "code_cs_unity_json,data_json"
    ```

    其中

  - %Luban.ClientServer.dll% 指向  luban_examples/Tools/Luban.ClientServer/Luban.ClientServer.dll
  - --define_file  参数为 MyConfigs/Defines/\_\_root\_\_.xml 的路径
  - --input_data_dir 参数为 MyConfigs/Datas 的路径
  - --output_code_dir 参数为生成的代码文件存放的路径。 建议建议指向 unity的 Assets 目录下的某级子目录
  - --output_data_dir 参数为生成的数据文件的存放路径。 建议指向Assets同级目录。

    详细的命令文档请看 [command_tools](/manual/commandtools.md)。

    如果一切正常，会产生一系列日志，最终一行是 == succ == 。

    类似这样
::: center
![生成结果](/img/luban/install/install_07.png)
:::
    如果一切顺利。生成的代码文件会在 –output_code_dir 参数指定的 目录中，生成的配置数据会在 –output_data_dir 参数指定的目录中。确保 –output_code_dir 指向的目录在Assets目录下，**PlayerSetting里开启unsafe**，此时应该能编译成功。

- 加载配置

    只需一行代码既可完成所有配置表的加载工具

    ```csharp
    var tables = new cfg.Tables(file => 
            JSON.Parse(File.ReadAllText(gameConfDir + "/" + file + ".json")
        ));
    ```

- 使用加载后的配置表

    cfg.Tables 里包含所有配置表的一个实例字段。加载完 cfg.Tables 后，只需要用 tables.<表名> 就能获得那个表实例，接着可以做各种操作。例如我们要获取id = 10000 的那个道具。代码如下

    ```csharp
    cfg.item.Item itemInfo = tables.TbItem.Get(10000);
    Console.WriteLine("id:{0} name:{1} desc:{2}", 
        itemInfo.Id, itemInfo.Name, itemInfo.Desc);
    ```

    可能你会注意到，item.xml 里定义 Item 时，字段名 id,name,desc的首字母被大写了。这是因为工具会根据输出的语言，自动作相应代码风格的字段名转换，也即 boo_bar 会被转换为 BooBar 这样的名字。这也是为什么推荐 配置字段定义时统一使用 xx_yy_zz 的风格。

- 至此完成 配置加载与使用!


### excel导出json数据，自己手写代码加载使用

示例为 [GenerateDatas项目](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json) 下的 gen_data_json2.bat
（注意不是gen_data_json.bat,因为gen_data_json.bat中'--gen_types data_json',生成的json数据为记录列表，而不是以key-value形式组织，可能并不符合你的要求）。

脚本如下：

```shell
dotnet %Luban.ClientServer.dll%
 -j cfg ^
 -- ^
 --define_file <__root__.xml 定义文件的路径> ^
 --input_data_dir <配置数据根目录(Datas)的路径> ^
 --output_data_dir <导出的数据文件的路径> ^
 --service all ^
 --gen_types data_json2

```

其中

- %Luban.ClientServer.dll% 指向  luban_examples/Tools/Luban.ClientServer/Luban.ClientServer.dll
- --define_file  参数为 MyConfigs/Defines/\_\_root\_\_.xml 的路径
- --input_data_dir 参数为 MyConfigs/Datas 的路径
- --output_data_dir 参数为生成的数据文件的存放路径。 建议指向Assets同级目录。

此时运行脚本。应该能执行成功。生成的数据在 --output_data_dir 参数指定的目录下

## 其他项目类型
  
不同项目之间，仅仅是准备工作及`--gen_types`不一样， 请从[示例项目](https://github.com/focus-creative-games/luban_examples/tree/main/Projects)中找到与你项目匹配的项目，
参考相应目录下的 gen_xxx.bat 即可。生成的代码一般会依赖于一些工具类，请从相应项目里拷贝这些代码到自己项目即可。更多可以参考 [代码与数据生成](/basic/generatecodedata.md) 这个文档。
