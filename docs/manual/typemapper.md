# 类型映射

有时候你希望生成的代码中能直接使用现成的结构类型，而不是使用生成的类型代码。例如vector3是非常常见的类型，你在配置中定义了vector3后，可能希望生成的C#代码中涉及到
vector3类型的地方能直接使用UnityEngine.Vector3，而不是生成的vector3类。Luban支持这种外部类型映射机制，可以将配置类映射到外部现成的enum或者class类型。

类型映射的定义方式请阅读文档[schema逻辑结构](schema)及[配置定义](defaultschemacollector)。
由于类型映射影响了代码生成，目前**只有C#代码(cs-bin、cs-xxx-json之类)**支持类型映射。如果其他语言也需要类型，请仿照修改即可。

[builtin.xml](https://github.com/focus-creative-games/luban_examples/blob/main/DataTables/Defines/builtin.xml)中提供极好的类型映射的示例。

## enum类型映射

以AudioType为例，以下配置将它映射到UnityEngine.AudiotType。

```xml
    <enum name="AudioType">
        <var name="UNKNOWN" value="0"/>
        <var name="ACC" value="1"/>
        <var name="AIFF" value="2"/>
        <mapper target="client" codeTarget="cs-bin">
            <option name="type" value="UnityEngine.AudioType"/>
        </mapper>
    </enum>
```

name为'type'的option配置的value字段指定了类型映射的目标C#类型。注意，必须保存枚举项的值与映射的枚举类型的枚举项的值完全一致，因为enum的类型映射的
实现方式为先读取出配置AudioType，再类型强转为UnityEngine.AudioType。

## bean映射

以 vector2、vector3、vector4为例，以下配置将它们映射到UnityEngine.Vector{2,3,4}。

```xml
  <bean name="vector2" valueType="1" sep=",">
        <var name="x" type="float"/>
        <var name="y" type="float"/>
        <mapper target="client" codeTarget="cs-bin">
            <option name="type" value="UnityEngine.Vector2"/>
            <option name="constructor" value="ExternalTypeUtil.NewVector2"/>
        </mapper>
    </bean>
    <bean name="vector3" valueType="1" sep=",">
        <var name="x" type="float"/>
        <var name="y" type="float"/>
        <var name="z" type="float"/>
        <mapper target="client" codeTarget="cs-bin">
            <option name="type" value="UnityEngine.Vector3"/>
            <option name="constructor" value="ExternalTypeUtil.NewVector3"/>
        </mapper>
    </bean>
    <bean name="vector4" valueType="1" sep=",">
        <var name="x" type="float"/>
        <var name="y" type="float"/>
        <var name="z" type="float"/>
        <var name="w" type="float"/>
        <mapper target="client" codeTarget="cs-bin">
            <option name="type" value="UnityEngine.Vector4"/>
            <option name="constructor" value="ExternalTypeUtil.NewVector4"/>
        </mapper>
    </bean>
```

name为'type'的option项与enum完全相同，配置了目标类型。由于bean并不能类型强转，因此相比enum需要提供一个自定义的强转（或者构造）函数，将
配置类型转换为映射类型。由'constructor'配置项提供这个参数。


## 生成类型映射后的代码

对于不同的target，即使是同一种语言，前后端不一定使用相同的类型映射。例如对于vector3，前端可能想映射到UnityEngine.Vector3，而
后面期望直接使用默认生成的类型或者映射到System.Numerics.Vector3。因此需要有机制可以区分这种情况。

目前使用 mapper的target和codeTarget参数组合来表达映射需求。当 命令行的`-t $target`参数与`-c $codeTarget`参数分别与mapper的target
及codeTarget的值匹配时，表示需要执行当前mapper指定的映射。

:::tip
mapper的target和codeTarget参数都可以是多个值，如target="client,server,all"，codeTarget="cs-bin,cs-dotnet-json"。`-t`和`-c`参数
只需要是其中一个即可满足匹配。
:::



