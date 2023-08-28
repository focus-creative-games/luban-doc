# load configuration

Loading data depends on some Luban Runtime code, please find the project that matches your project type in [Example Project](https://github.com/focus-creative-games/luban_examples/tree/main/Projects),
Copy the Luban-related runtime code from this project.

##unity + c# + json

The corresponding example project is [Csharp_Unity_json](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json),
Copy the `Assets/LubanLib` directory to your project and enable 'unsafe code' support in the 'Player Building'. Then load all the configuration with just one line of code.

```csharp
     void Load()
     {
         // One line of code can load all configurations. cfg.Tables contains an instance field for all tables.
         var tables = new cfg. Tables(Loader);
         // access a singleton table
         Console.WriteLine(tables.TbGlobal.Name);
         // access normal key-value table
         Console.WriteLine(tables.TbItem.Get(12).Name);
         // support operator [] usage
         Console.WriteLine(tables.TbMail[1001].Desc);
     }

     private static JSONNode LoadJson(string file)
     {
         return JSON.Parse(File.ReadAllText($"{your_json_dir}/{file}.json", System.Text.Encoding.UTF8));
     }

```


## Use c# code in unity project and automatically judge to load bin or json configuration

During the development period, I hope to use the json export format, but in order to save the export file size and improve loading performance, I hope to use the bin export format. By creating cfg.Tables through reflection, you can automatically adapt to these two methods without changing the code.

```csharp
     void Start()
     {
         var tablesCtor = typeof(cfg. Tables). GetConstructors()[0];
         var loaderReturnType = tablesCtor.GetParameters()[0].ParameterType.GetGenericArguments()[1];
         // Determine whether to use json or ByteBuf Loader according to the return value type of Loader in the constructor of cfg.Tables
         System.Delegate loader = loaderReturnType == typeof(ByteBuf) ?
             new System.Func<string, ByteBuf>(LoadByteBuf)
             : (System.Delegate)new System.Func<string, JSONNode>(LoadJson);
         var tables = (cfg.Tables)tablesCtor.Invoke(new object[] {loader});

         // access a singleton table
         Console.WriteLine(tables.TbGlobal.Name);
         // access normal key-value table
         Console.WriteLine(tables.TbItem.Get(12).Name);
         // support operator [] usage
         Console.WriteLine(tables.TbMail[1001].Desc);
     }

     private static JSONNode LoadJson(string file)
     {
         return JSON.Parse(File.ReadAllText($"{your_json_dir}/{file}.json", System.Text.Encoding.UTF8));
     }

     private static ByteBuf LoadByteBuf(string file)
     {
         return new ByteBuf(File. ReadAllBytes($"{your_json_dir}/{file}.bytes"));
     }
```

## Other item types

Please find an example project that matches your project type in [Projects](https://github.com/focus-creative-games/luban_examples/tree/main/Projects), and just refer to it to load the code.
