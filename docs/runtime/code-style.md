---
sidebar_position: 4
---

# 代码风格与 TypeMapper

## 命名风格

通过 `-x` 控制：

```bash
-x codeStyle=csharp-default
-x namingConvention.cs-bin.field=camel
```

常见 style 名：`none`、各语言 `*-default`。可分别作用在 namespace / type / method / property / field / enumItem 等位置。

字段若使用 `item_id` 这种名字，C# 默认常生成 `ItemId`。

## TypeMapper（目前主要 C#）

把配置类型映射到项目已有外部类型：

- enum：`option type=外部枚举`（数值必须一致）
- bean：外部类型 + `constructor` 转换

匹配条件：当前 `-t` 与 `-c` 落在 mapper 声明的 target / codeTarget 集合内。

可在 XML schema 的 `<mapper>` 或 Excel 对应列中配置。

## 相关链接

- [XML Schema](../schema/xml-schema)
- [CLI 参考](../reference/cli)
