# Load configuration

## Install Luban.Runtime

Loading data depends on some Luban Runtime code. For Unity+C#, the `com.code-philosophy.luban` package is already provided. Install the com.code-philosophy.luban package in the Package Manager, address `https://gitee.com/focus-creative-games/luban_unity.git` or `https://github.com/focus-creative-games/luban_unity.git` (or download it from `https://github.com/focus-creative-games/luban_unity`). For other languages, please find the project that matches your project type in [Example Project](https://github.com/focus-creative-games/luban_examples/tree/main/Projects) and copy the Luban-related Runtime code from the project.

## unity + c# + json

First complete the `Install Luban.Runtime` operation, then use the following code to load the configuration.

```csharp

void Load()
{
    // One line of code can load all configurations. cfg.Tables contains an instance field for all tables.
    var tables = new cfg.Tables(Loader);
    // Access a singleton table
    Console.WriteLine(tables.TbGlobal.Name);
    // Access a normal key-value table
    Console.WriteLine(tables.TbItem.Get(12).Name);
    // Support operator [] usage
    Console.WriteLine(tables.TbMail[1001].Desc);
}

private static JSONNode LoadJson(string file)
{
    return JSON.Parse(File.ReadAllText($"{your_json_dir}/{file}.json", System.Text.Encoding.UTF8));
}

```

## Use c# code in unity project and automatically judge whether to load bin or json configuration

First complete the `Install Luban.Runtime` operation, and then use the following code to load the configuration.

During the development phase, we want to use the json export format, but in order to save the export file size and improve loading performance, we want to use the bin export format. By creating cfg.Tables through reflection, we can automatically adapt to these two methods without changing the code.

```csharp
void Start()
{
    var tablesCtor = typeof(cfg.Tables).GetConstructors()[0];
    var loaderReturnType = tablesCtor.GetParameters()[0].ParameterType.GetGenericArguments()[1];
    // Decide whether to use json or ByteBuf Loader based on the return value type of the Loader of the constructor of cfg.Tables
    System.Delegate loader = loaderReturnType == typeof(ByteBuf) ?
    new System.Func<string, ByteBuf>(LoadByteBuf)
    : (System.Delegate)new System.Func<string, JSONNode>(LoadJson);
    var tables = (cfg.Tables)tablesCtor.Invoke(new object[] {loader});

    // Access a singleton table
    Console.WriteLine(tables.TbGlobal.Name);
    // Access a normal key-value table
    Console.WriteLine(tables.TbItem.Get(12).Name);
    // Support operator [] usage
    Console.WriteLine(tables.TbMail[1001].Desc);
}

private static JSONNode LoadJson(string file)
{
    return JSON.Parse(File.ReadAllText($"{your_json_dir}/{file}.json", System.Text.Encoding.UTF8));
}

private static ByteBuf LoadByteBuf(string file)
{
    return new ByteBuf(File.ReadAllBytes($"{your_json_dir}/{file}.bytes"));
}
```

## Other project types

Please find the sample project that matches your project type in [Projects](https://github.com/focus-creative-games/luban_examples/tree/main/Projects) and refer to its loading
code.