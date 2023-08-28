# type mapping

Sometimes you want to use ready-made struct types directly in the generated code instead of using the generated type code. For example, vector3 is a very common type. After you define vector3 in the configuration, you may want to use UnityEngine.Vector3 instead of the generated vector3 class where the vector3 type is involved in the generated C# code. Luban supports this external type mapping mechanism, which can map configuration classes to external ready-made enum or class types.

For the definition of type mapping, please read the document [schema logical structure] (schema) and [configuration definition] (defaultschemacollector).
Since type mapping affects code generation, currently **only C# code (cs-bin, cs-xxx-json, etc.)** supports type mapping. If other languages also need types, please modify them as follows.

[builtin.xml](https://github.com/focus-creative-games/luban_examples/blob/main/DesignerConfigs/Defines/builtin.xml) provides an excellent example of type mapping.

## enum type mapping

Taking AudioType as an example, the following configuration maps it to UnityEngine.AudiotType.

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

The value field of the option configuration whose name is 'type' specifies the target C# type of the type mapping. Note that the value of the enumeration item must be saved exactly the same as the value of the enumeration item of the mapped enumeration type, because the implementation of enum type mapping is to read the configuration AudioType first, and then force the type to UnityEngine.AudioType.

## bean mapping

Taking vector2, vector3, and vector4 as examples, the following configuration maps them to UnityEngine.Vector{2,3,4}.

```xml
   <bean name="vector2" valueType="1" sep=",">
         <var name="x" type="float"/>
         <var name="y" type="float"/>
         <mapper target="client" codeTarget="cs-bin">
             <option name="type" value="UnityEngine. Vector2"/>
             <option name="constructor" value="ExternalTypeUtil.NewVector2"/>
         </mapper>
     </bean>
     <bean name="vector3" valueType="1" sep=",">
         <var name="x" type="float"/>
         <var name="y" type="float"/>
         <var name="z" type="float"/>
         <mapper target="client" codeTarget="cs-bin">
             <option name="type" value="UnityEngine. Vector3"/>
             <option name="constructor" value="ExternalTypeUtil.NewVector3"/>
         </mapper>
     </bean>
     <bean name="vector4" valueType="1" sep=",">
         <var name="x" type="float"/>
         <var name="y" type="float"/>
         <var name="z" type="float"/>
         <var name="w" type="float"/>
         <mapper target="client" codeTarget="cs-bin">
             <option name="type" value="UnityEngine. Vector4"/>
             <option name="constructor" value="ExternalTypeUtil.NewVector4"/>
         </mapper>
     </bean>
```

The option item whose name is 'type' is exactly the same as enum, and the target type is configured. Since beans cannot be type-forcibly transferred, it is necessary to provide a custom cast (or constructor) function to convert the configuration type to the mapped type compared to enum. This parameter is provided by the 'constructor' configuration item.


## Generate code after type mapping

For different targets, even if it is the same language, the front and back ends do not necessarily use the same type mapping. For example, for vector3, the front end may want to map to UnityEngine.Vector3, while the back end expects to use the default generated type directly or map to System.Numerics.Vector3. So there needs to be a mechanism that can distinguish this case.

Currently, the combination of target and codeTarget parameters of mapper is used to express mapping requirements. When the `-t $target` parameter and `-c $codeTarget` parameter of the command line match the target and codeTarget values of the mapper respectively, it means that the mapping specified by the current mapper needs to be executed.

:::tip
The target and codeTarget parameters of mapper can be multiple values, such as target="client, server, all", codeTarget="cs-bin, cs-dotnet-json". `-t` and `-c` arguments
It only needs to be one of them to satisfy the match.
:::
