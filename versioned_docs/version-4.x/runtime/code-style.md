---
sidebar_position: 4
---

# 代码风格

## 命名风格

通过 `-x` 控制：

```bash
-x codeStyle=csharp-default
-x namingConvention.cs-bin.field=camel
```

常见 style 名：`none`、各语言 `*-default`。可分别作用在 namespace / type / method / property / field / enumItem 等位置。

字段若使用 `item_id` 这种名字，C# 默认常生成 `ItemId`。

## 外部类型映射

把配置 enum/bean 映射到项目已有类型（如 `UnityEngine.Vector3`），见独立文档 [外部类型映射（TypeMapper）](../schema/type-mapper)。

## 相关链接

- [TypeMapper](../schema/type-mapper)
- [XML Schema](../schema/xml-schema)
- [CLI 参考](../reference/cli)
