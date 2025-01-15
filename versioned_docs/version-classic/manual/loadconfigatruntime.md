# 运行时加载配置

## 在unity项目中使用c#代码加载json配置

将 [LubanLib](https://gitee.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json/Assets/LubanLib) 目录复制到项目,
接着只需一行代码即可加载所有配置。

```csharp
// 一行代码可以加载所有配置。 cfg.Tables 包含所有表的一个实例字段。
var tables = new cfg.Tables(Loader);
// 访问一个单例表
Console.WriteLine(tables.TbGlobal.Name);
// 访问普通的 key-value 表
Console.WriteLine(tables.TbItem.Get(12).Name);
// 支持 operator []用法
Console.WriteLine(tables.TbMail[1001].Desc);
```

请自行实现合适的Loader函数，根据配置文件名file返回一个加载好的ByteBuf。 可借鉴[Csharp_Unity_Json](https://gitee.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_json)中的代码。

## 在unity项目中使用c#代码自动判断加载bin或json配置

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
        return JSON.Parse(File.ReadAllText($"{Application.dataPath}/../../GenerateDatas/json/{file}.json", System.Text.Encoding.UTF8));
    }

    private static ByteBuf LoadByteBuf(string file)
    {
        return new ByteBuf(File.ReadAllBytes($"{Application.dataPath}/../../GenerateDatas/bytes/{file}.bytes"));
    }
```

可借鉴[Csharp_Unity_bin_or_json](https://gitee.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_bin_or_json)中的代码。

## 在unity+puers项目中使用typescript加载json配置

```typescript
// 一行代码可以加载所有配置。 cfg.Tables 包含所有表的一个实例字段。
let tables = new cfg.Tables(loader)
// 访问一个单例表
console.log(tables.TbGlobal.name)
// 访问普通的 key-value 表
console.log(tables.TbItem.get(12).Name)
```

请自行实现一个Loader的函数，根据表file 返回一个解析好的JSON对象。可借鉴 [Typescript_Unity_Puerts_Json](https://gitee.com/focus-creative-games/luban_examples/tree/main/Projects/TypeScript_Unity_Puerts_Json)中代码

## 在go项目中加载json配置

```go
// 一行代码可以加载所有配置。 cfg.Tables 包含所有表的一个实例字段。
if tables , err := cfg.NewTables(loader) ; err != nil {
 println(err.Error())
 return
}
// 访问一个单例表
println(tables.TbGlobal.Name)
// 访问普通的 key-value 表
println(tables.TbItem.Get(12).Name)

```

请自行实现一个合适的loader函数，根据配置文件 file，返回一个Json对象

## python 2 + json

与其他相似，取 --gen_types code_python27_json,data_json。但需要额外安装enum34包，可通过命令 'py -2 -m pip install enum34' 安装。

## 在java,python,c++,rust,lua 语言中加载配置

请参见  [示例项目](https://gitee.com/focus-creative-games/luban_examples/tree/main/Projects)。找到与你项目类型相符的示例项目，参考其加载
代码即可。
