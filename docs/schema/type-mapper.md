---
sidebar_position: 6
---

# 外部类型映射（TypeMapper）

有时你希望生成代码直接使用项目里已有的类型，而不是 Luban 生成的类型。例如配置里定义了 `vector3`，希望 C# 里用 `UnityEngine.Vector3`，而不是生成的 `vector3` 类。

Luban 通过 **TypeMapper（外部类型映射）** 把配置中的 enum / bean 映射到外部 enum 或 class。旧版文档中的 **external type** 即此机制；3.x 起改名为 typeMapper，并直接写在 enum / bean 的子元素里。

:::caution
类型映射会影响代码生成。目前**主要只有 C#**（`cs-bin`、`cs-simple-json`、`cs-dotnet-json` 等）完整支持。其他语言若需要，可仿照 C# CodeTarget 自行扩展。
:::

完整示例见示例工程中的 [builtin.xml](https://github.com/focus-creative-games/luban_examples/blob/main/DataTables/Defines/builtin.xml)。

## 匹配规则：何时生效

`<mapper>` 上的 `target` 与 `codeTarget` 必须与命令行同时匹配才会应用：

| 参数 | 含义 |
|------|------|
| `target` | 对应 `-t` / `luban.conf` 中的导出目标（如 `client`、`server`、`all`） |
| `codeTarget` | 对应 `-c`（如 `cs-bin`、`cs-simple-json`） |

前后端可映射到不同外部类型。例如前端 `vector3` → `UnityEngine.Vector3`，后端不映射或映射到 `System.Numerics.Vector3`。

:::tip
`target` 与 `codeTarget` 都可以写多个值，逗号分隔，如 `target="client,server,all"`、`codeTarget="cs-bin,cs-dotnet-json"`。命令行 `-t` / `-c` 命中其中任一即可。
:::

逻辑结构上的字段：

| 字段 | 类型 | 可空 | 说明 |
|------|------|------|------|
| targets / `target` | list,string | 否 | 匹配的导出目标 |
| codeTargets / `codeTarget` | list,string | 否 | 匹配的代码目标 |
| options | map | — | 由具体 CodeTarget 解释；C# 常用 `type`、`constructor` |

## enum 映射

以 `AudioType` 为例，映射到 `UnityEngine.AudioType`：

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

- `option name="type"`：映射目标类型全名。
- **枚举项数值必须与外部枚举完全一致**。实现方式是：先读出配置侧 `AudioType`，再强转为外部枚举。

## bean 映射

以 `vector2` / `vector3` / `vector4` 为例：

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

| option | 说明 |
|--------|------|
| `type` | 外部目标类型（与 enum 相同） |
| `constructor` | bean **不能**直接强转，需提供转换（或构造）函数，把配置 bean 转成外部类型 |

`constructor` 指向你工程中的静态方法（示例工程里的 `ExternalTypeUtil.NewVector3` 等）。生成代码会调用它完成转换。

## XML 中 mapper 的写法

写在 `<enum>` 或 `<bean>` 内，子元素为 0–n 个 `<option>`：

| 字段 | 可空 | 说明 |
|------|------|------|
| `target` | 否 | 1–n 个导出目标，逗号分隔 |
| `codeTarget` | 否 | 1–n 个 codeTarget，逗号分隔 |

| option 字段 | 可空 | 说明 |
|-------------|------|------|
| `name` | 否 | 如 `type`、`constructor` |
| `value` | 否 | 对应值 |

也可用 Excel Schema 定义 enum/bean 时配置 mapper（列名以工程模板为准）；语义与 XML 相同。

## 分端映射示例

```xml
<!-- 客户端：Unity -->
<mapper target="client" codeTarget="cs-bin,cs-simple-json">
  <option name="type" value="UnityEngine.Vector3"/>
  <option name="constructor" value="ExternalTypeUtil.NewVector3"/>
</mapper>

<!-- 服务器：.NET Numerics（示例） -->
<mapper target="server" codeTarget="cs-dotnet-json">
  <option name="type" value="System.Numerics.Vector3"/>
  <option name="constructor" value="ExternalTypeUtil.NewNumericsVector3"/>
</mapper>
```

生成命令分别使用 `-t client -c cs-bin` 与 `-t server -c cs-dotnet-json` 时，会各自命中对应 mapper。

## 常见坑

- 枚举映射后数值不一致 → 强转结果错误或运行异常。
- bean 只写了 `type` 没写 `constructor` → C# 生成失败或无法转换。
- `-t` / `-c` 与 mapper 声明不匹配 → 映射未生效，仍生成 Luban 类型。
- 以为所有语言都支持 → 当前以 C# 为主，其他语言需自行扩展 CodeTarget。

## 相关链接

- [XML Schema](./xml-schema)（`<mapper>` 摘要）
- [类型速查](./types)
- [代码风格](../runtime/code-style)
- [FAQ：引用项目已有类型](../reference/faq)
