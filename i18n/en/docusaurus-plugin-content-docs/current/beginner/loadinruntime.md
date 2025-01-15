# Runtime loading configuration

We have provided a large number of sample projects under [Projects](https://github.com/focus-creative-games/luban_examples/tree/main/Projects).

We take the most common Unity + c# + json as an example, the sample project is [Csharp_Unity_Json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json),
For other types, please refer to the corresponding projects in the Projects directory.

## Install com.code-philosophy.luban

Install the com.code-philosophy.luban package in the Package Manager, the address is `https://gitee.com/focus-creative-games/luban_unity.git` or `https://github.com/focus-creative-games/luban_unity.git`.

## Generate code and configuration

Please connect Luban according to the [Connect Luban to Project](./addtoproject) document, and prepare the corresponding generation script gen.bat. If you have any questions, you can refer to the `gen.bat` file of the `Csharp_Unity_Json` project.

Run the script. If everything goes well, a series of logs will be generated, and the last line is `bye~`.

:::warning

Luban will delete all other files in the outputCodeDir directory when it is generated. Please provide a separate directory for it. Do not point to the `Assets/Scripts` directory, which will delete other code files! The same applies to outputDataDir.

:::

## Load configuration

All configuration tables can be loaded with just one line of code. Load only once during the entire game (unless you want to reload the configuration during operation). In practice, save the tables after creating them for subsequent use.

```csharp

string gameConfDir = "<outputDataDir>"; // Replace with the directory pointed to by outputDataDir in gen.bat
var tables = new cfg.Tables(file => JSON.Parse(File.ReadAllText($"{gameConfDir}/{file}.json")));

```

:::tips

The default generated code does not support asynchronous loading, and platforms such as Android cannot directly read the StreamingAssets directory, so you need to do some special processing yourself, such as loading all configuration data files into memory before using `new Tables` to load.

You can support asynchronous loading by modifying the [code template](../manual/template).

:::

## Use configuration

cfg.Tables contains an instance field of all configuration tables. After loading cfg.Tables, use `tables.<table name>` to get the table instance, and then perform subsequent operations on the table.
For example, we want to print the reward information of the Reward table id = 1001, the code is as follows:

```csharp
cfg.demo.Reward reward = tables.TbReward.Get(1001);
Console.WriteLine("reward:{0}", reward);
```

You may notice that the first letter of the reward table field names id, name, and desc are capitalized. This is because the tool will automatically convert the field names to the corresponding code style according to the output language, that is, boo_bar will be converted to a name like BooBar.
Therefore, it is recommended to use the xx_yy_zz style when configuring the field names.
