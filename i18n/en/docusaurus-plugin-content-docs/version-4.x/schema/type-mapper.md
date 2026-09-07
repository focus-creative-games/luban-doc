---
sidebar_position: 6
---

# External type mapping (TypeMapper)

Sometimes you want generated code to use existing project types instead of Luban-generated ones. For example, after defining `vector3` in config, you may want C# to use `UnityEngine.Vector3` rather than a generated `vector3` class.

Luban **TypeMapper (external type mapping)** maps config enums / beans to external enums or classes. Older docs called this **external type**; since 3.x it is named typeMapper and is defined as a child of enum / bean.

:::caution
Type mapping affects code generation. Today it is **mainly supported for C#** (`cs-bin`, `cs-simple-json`, `cs-dotnet-json`, etc.). For other languages, extend the CodeTarget similarly if needed.
:::

A good sample is [builtin.xml](https://github.com/focus-creative-games/luban_examples/blob/main/DataTables/Defines/builtin.xml) in the examples repo.

## Matching rules: when it applies

`<mapper>`’s `target` and `codeTarget` must both match the CLI:

| Attribute | Meaning |
|------|------|
| `target` | Matches `-t` / targets in `luban.conf` (e.g. `client`, `server`, `all`) |
| `codeTarget` | Matches `-c` (e.g. `cs-bin`, `cs-simple-json`) |

Client and server can map to different external types—for example client `vector3` → `UnityEngine.Vector3`, server unmapped or → `System.Numerics.Vector3`.

:::tip
Both `target` and `codeTarget` may list multiple values, comma-separated, e.g. `target="client,server,all"`, `codeTarget="cs-bin,cs-dotnet-json"`. CLI `-t` / `-c` only needs to hit one of them.
:::

Logical fields:

| Field | Type | Nullable | Notes |
|------|------|------|------|
| targets / `target` | list,string | No | Matching export targets |
| codeTargets / `codeTarget` | list,string | No | Matching code targets |
| options | map | — | Interpreted by the CodeTarget; C# commonly uses `type`, `constructor` |

## Enum mapping

Map `AudioType` to `UnityEngine.AudioType`:

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

- `option name="type"`: fully qualified external type.
- **Enum item values must match the external enum exactly.** Implementation reads the config `AudioType`, then casts to the external enum.

## Bean mapping

Example for `vector2` / `vector3` / `vector4`:

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

| option | Notes |
|--------|------|
| `type` | External target type (same as enum) |
| `constructor` | Beans **cannot** be cast; provide a conversion (or constructor) function from config bean to external type |

`constructor` points to a static method in your project (e.g. `ExternalTypeUtil.NewVector3` in the sample). Generated code calls it to convert.

## Writing mapper in XML

Place inside `<enum>` or `<bean>`, with 0–n `<option>` children:

| Attribute | Nullable | Notes |
|------|------|------|
| `target` | No | 1–n export targets, comma-separated |
| `codeTarget` | No | 1–n codeTargets, comma-separated |

| option field | Nullable | Notes |
|-------------|------|------|
| `name` | No | e.g. `type`, `constructor` |
| `value` | No | Option value |

You can also configure mapper when defining enum/bean via Excel Schema (column names follow your template); semantics match XML.

## Per-side mapping example

```xml
<!-- Client: Unity -->
<mapper target="client" codeTarget="cs-bin,cs-simple-json">
  <option name="type" value="UnityEngine.Vector3"/>
  <option name="constructor" value="ExternalTypeUtil.NewVector3"/>
</mapper>

<!-- Server: .NET Numerics (example) -->
<mapper target="server" codeTarget="cs-dotnet-json">
  <option name="type" value="System.Numerics.Vector3"/>
  <option name="constructor" value="ExternalTypeUtil.NewNumericsVector3"/>
</mapper>
```

Commands `-t client -c cs-bin` and `-t server -c cs-dotnet-json` each hit the matching mapper.

## Common pitfalls

- Enum values do not match external enum → wrong cast or runtime errors.
- Bean has `type` but no `constructor` → C# generation fails or cannot convert.
- `-t` / `-c` do not match mapper → mapping inactive; Luban types are generated.
- Assuming all languages support it → mainly C# today; other languages need CodeTarget work.

## Related links

- [XML Schema](./xml-schema) (`<mapper>` summary)
- [Types](./types)
- [Code style](../runtime/code-style)
- [FAQ: reuse project types](../reference/faq)
