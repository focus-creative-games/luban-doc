# 自定义模板

luban使用[scriban](https://github.com/scriban/scriban) 模板引擎来生成代码，也使用这个模板来生成自定义的文本型数据文件。

模板文件在 Luban.Servers/Templates目录下。

来自 [LiuOcean](https://github.com/LiuOcean) 的 [模板使用介绍](https://app.heptabase.com/w/514c9827e9627b063281903b68ed662773c45c845d90f8da1da04dd1e6fc08c4)

## 自定义模板搜索路径

尽管可以直接修改Luban.Server/Templates目录下的模板文件，但每次更新Luban.Server会覆盖自己的实现，不是很方便。
Luban.Server支持模板搜索路径， Luban.Server命令行参数" -t， --template_search_path path" 用于指定优先搜索路径。

## 模块缓存机制

为了优化性能，Luban.Server在运行时加载模板文件后，会保留模板缓存。在调试模板时，缓存机制导致不会重新加载模板文件，需要频繁重启，不太方便。可以通过参数
"--disable_cache" 禁用缓存。

## 代码模板

自定义代码模板示例可参见 [Csharp_CustomTemplate_AsyncLoad](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_CustomTemplate_AsyncLoad)。

生成脚本示例参见 [脚本目录](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/GenerateDatas) 下的 gen_template_xxxx.bat 文件。

使用scriban模板文件定制导出数据格式。例如生成cs语言bin数据格式的cfg.Tables类的模板如下。

```text
using Bright.Serialization;

{{
    name = x.name
    namespace = x.namespace
    tables = x.tables
}}
namespace {{namespace}}
{
public sealed class {{name}}
{
    {{~for table in tables ~}}
        {{~if table.comment != '' ~}}
            /// <summary>
            /// {{table.comment}}
            /// </summary>
        {{~end~}}
        public {{table.full_name}} {{table.name}} {get; }
    {{~end~}}

    public {{name}}(System.Func<string, ByteBuf> loader)
    {
        var tables = new System.Collections.Generic.Dictionary<string, object>();
        {{~for table in tables ~}}
            {{table.name}} = new {{table.full_name}}(loader("{{table.output_data_file}}")); 
            tables.Add("{{table.full_name}}", {{table.name}});
        {{~end~}}

        {{~for table in tables ~}}
            {{table.name}}.Resolve(tables); 
        {{~end~}}
    }

    public void TranslateText(System.Func<string, string, string> translator)
    {
        {{~for table in tables ~}}
            {{table.name}}.TranslateText(translator); 
        {{~end~}}
    }
}
}
```


## 数据模板

当生成参数 --gen_types中包含 data_template时，为自定义数据模板模式，需要配合 --template_name \<template_name\> 来指定模板名(注意，模板名不要包含.tpl后缀)，在\<template search path\>/config/data 目录下，寻找 \<template_name\>.tpl 文件。

例如 "--gen_types data_template --template_name lua" 则会从搜索路径查找 config/data/lua.tpl 文件。

 示例模板文件在 [CustomTemplates](https://github.com/focus-creative-games/luban_examples/tree/main/Projects/DataTemplates/CustomTemplates/config/data) 下。

 
使用scriban模板文件定制导出数据格式。例如自定义的lua数据模板如下：

```text
// {{table.name}}
{{for d in datas}}
    // {{d.impl_type.full_name}}
    {{~i = 0~}}
        {{~for f in d.fields~}}
            {{~if f ~}}
            // {{d.impl_type.hierarchy_export_fields[i].name}} = {{f.value}}
            {{~end~}}
        {{~i = i + 1~}}
    {{~end~}}
{{end}}
```

输出数据

```text
// TbItem
 // item.Item
  // id = 1
  // name = 钻石
  // major_type = 1
  // minor_type = 101
  // max_pile_num = 9999999
  // quality = 0
  // icon = /Game/UI/UIText/UI_TestIcon_3.UI_TestIcon_3
  
 // item.Item
  // id = 2
  // name = 金币
  // major_type = 1
  // minor_type = 102
  // max_pile_num = 9999999
  // quality = 0
  // icon = /Game/UI/UIText/UI_TestIcon_1.UI_TestIcon_1
```

## 自定义数据模板文件输出的数据文件的后缀

luban会智能从 template_name 参数中猜测文件类型，默认给一个输出文件名。如果猜测失败，又没有指定 --data_file_extension 选项，则会报错。
像 lua2, lua,lua_test,my_lua_template 都会猜测为lua类型。

## 模板环境变量

每个模板的默认提供的环境变量是不同的，代码和数据模板的环境变量不同，数据模板也分为convert模板（源数据格式到源数据格式的转换）和 data模板（源数据格式到导出格式的转换）。

### 代码模板环境变量

- x  类型定义。 对于enum是DefEnum，对于bean是DefBean，对于table是DefTable
- assembly 当前定义集合。注意不是c#的dll assembly，而是当前你在配置中定义的所有类型信息的集合

### convert 数据模板环境变量

- table 所在的DefTable的类型定义。
- data 当前记录的对应的DType数据
- assembly 当前定义集合。

### data 数据模板环境变量

- table 所在的DefTable的类型定义。
- datas 当前表的所有导出数据DType列表，即 List,DType 类型。
- assembly 当前定义集合。
