# Editor支持

GamePlay相关功能经常有自定义编辑器的需求，而自定义编辑器的数据往往以记录为单位，数据结构较为复杂，每个记录保存为单独的json文件。luban支持这类编辑器工作流。

luban生成编辑器读写记录的json文件所用的代码，编辑器开发者只需使用Load和Save函数就能加载和保存记录为符合Luban解析器配置规则的json文件。

## 生成相关参数

生成的editor代码类的默认命名空间为  "editor." + topmodule 。可以通过root定义文件中的option 'editor.topmodule'来修改这个默认值，示例如

```xml
<root>
    <topmodule name="cfg"/>
    <option name="editor.topmodule" value="MyEditorConfig"/>
</root>
```

## 生成

luban为编辑器生成的代码跟为项目运行时使用的代码很不一样，有以下几个关键区别

- 不会生成Table代码。 因为编辑器一般以记录为单位操作数据，没必要生成Table加载和保存的代码。
- 不会生成Tables代码。 因为没这个需要。
- 为enum额外生成生成元数据xxx_Metadata类，定义了所有enum枚举项的元数据
- 生成的bean代码中包含了ToJson和FromJson函数
- datetime类型对应string类型,text对应EditorText类

## Unity

取 --gen_types code_cs_unity_editor_json , 生成即可。

可参考示例项目[Csharp_Unity_Editor_json](https://gitee.com/focus-creative-games/luban_examples/tree/main/Projects/Csharp_Unity_Editor_json)

使用示例如下

```csharp
// 加载
var skill = new editor.skill.Skill();
skill.LoadJsonFile("10001.json");
UnityEngine.Debug.Log("skill id:{0}, name:{1}", skill.Id, skill.Name);

// 保存
var skill = new editor.skill.Skill();
skill.Id = 10001;
skill.Name = "attack";
skill.SaveJsonFile("10001.json");
```

## UE4

取 --gen_types code_cpp_ue_editor_json。

目前还未严谨测试。等有实际需求时再测试。
