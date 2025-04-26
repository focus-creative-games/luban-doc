# 加载配置


## 安装Luban.Runtime

加载数据依赖一些Luban Runtime代码。对于Unity+C#，已经提供了`com.code-philosophy.luban`包。在Package Manager中安装com.code-philosophy.luban包，地址 `https://gitee.com/focus-creative-games/luban_unity.git`或`https://github.com/focus-creative-games/luban_unity.git`(或者从`https://github.com/focus-creative-games/luban_unity`下载)。对于其他语言请在 [示例项目](https://gitee.com/focus-creative-games/luban_examples/tree/main/Projects)中找到与你项目类型相符的项目，从该项目中复制Luban相关的Runtime代码。

## unity + c# + json 

先完成`安装Luban.Runtime`操作，然后使用如下代码加载配置。

```csharp

    void Load()
    {
        // 一行代码可以加载所有配置。 cfg.Tables 包含所有表的一个实例字段。
        var tables = new cfg.Tables(Loader);
        // 访问一个单例表
        Console.WriteLine(tables.TbGlobal.Name);
        // 访问普通的 key-value 表
        Console.WriteLine(tables.TbItem.Get(12).Name);
        // 支持 operator []用法
        Console.WriteLine(tables.TbMail[1001].Desc);
    }

    private static JSONNode LoadJson(string file)
    {
        return JSON.Parse(File.ReadAllText($"{your_json_dir}/{file}.json", System.Text.Encoding.UTF8));
    }

```


## unity项目中使用c#代码并自动判断加载bin或json配置

先完成`安装Luban.Runtime`操作，然后使用如下代码加载配置。

开发期希望使用json导出格式，但为了节约导出文件大小以及提高加载性能，希望使用bin导出格式。通过反射创建cfg.Tables的方式，可以做到不改代码，自动适应这两种方式。

```csharp
    void Start()
    {
        var tablesCtor = typeof(cfg.Tables).GetConstructors()[0];
        var loaderReturnType = tablesCtor.GetParameters()[0].ParameterType.GetGenericArguments()[1];
        // 根据cfg.Tables的构造函数的Loader的返回值类型决定使用json还是ByteBuf Loader
        System.Delegate loader = loaderReturnType == typeof(ByteBuf) ?
            new System.Func<string, ByteBuf>(LoadByteBuf)
            : (System.Delegate)new System.Func<string, JSONNode>(LoadJson);
        var tables = (cfg.Tables)tablesCtor.Invoke(new object[] {loader});

        // 访问一个单例表
        Console.WriteLine(tables.TbGlobal.Name);
        // 访问普通的 key-value 表
        Console.WriteLine(tables.TbItem.Get(12).Name);
        // 支持 operator []用法
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

## 其他项目类型

请在[Projects](https://gitee.com/focus-creative-games/luban_examples/tree/main/Projects)中找到与你项目类型相符的示例项目，参考其加载
代码即可。
