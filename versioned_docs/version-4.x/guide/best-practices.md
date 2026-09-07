---
sidebar_position: 6
---

# 最佳实践

工程化使用 Luban 时的命名、模块、校验与数据组织建议。

## 命名约定

- table 名推荐 `TbXxxYyy`，便于与普通 bean 区分
- 字段名推荐 `xx_yy_zz`；生成时按目标语言转 Pascal/camel 等，见 [代码风格](../runtime/code-style)

## XML 与 Excel 定义

- 审美/hand 写定义：可完全用 XML（建议每模块一个 xml，带模块名）
- 策划友好：用 Excel 定义表与结构
- 两者可混用

## 模块化

强烈建议按模块分目录；定义时带模块前缀，如 `item.TbItem`、`item.ItemInfo`，而不是空 module。

## 导出格式

开发期推荐 json 等文本格式，减少因 bin 格式变动而频繁重发端。

## 复杂 Excel 数据

配合 **多行记录** + **多级列名** + **sep**（字段 sep 与 type sep），在列限定与流式之间灵活选择。详见 [嵌套与容器](../excel/nested-and-collections)、[sep 与流式](../excel/vertical-and-sep)。

## GamePlay 数据用 OOP 继承

用多态 bean 表达技能、BUFF、AI、副本等复杂玩法数据；简单场景用 Excel，需独立编辑器（如技能编辑器）的用 json。**不要**再用 `type + param1,param2,param3` 老式组合。

## Git hooks 提交前校验

参考 [githooks-demo](https://gitee.com/focus-creative-games/luban_examples/tree/main/githooks-demo)。

## 策划只校验、不生成

不提供 codeTarget/dataTarget 时默认不加载数据。仅校验请加 `-f`（或 `-x forceLoadDatas=1`）：

```bat
dotnet Luban.dll ^
    -t all ^
    -f ^
    --conf luban.conf
```

也可用 `-x outputSaver=null` 配合无 dataTarget，只校验不写文件。

## refgroup

多字段 ref 同一批表时，用 refgroup 简化引用，见 [校验器](../quality/validators)。

## 编辑器导出数据

复杂编辑器配置建议 json **一记录一文件** + 目录 `input`；用生成代码加载/保存，勿手写序列化。

## tag 标识测试数据

测试/开发期数据打 tag，正式发布用 `--excludeTag` 过滤，**不要**手改数据删行。见 [tag](../quality/tags)。

## tag `unchecked`

批量临时脏数据、ref 尚未就绪时，可加 `unchecked` 跳过 ref 警告。

## datetime 与时区

用 `datetime` 表示时间；跨时区注意命令行 `--timeZone`。

## 多态使用场合

- 类型多变的 GamePlay 数据：技能、AI、任务、副本等
- 简单结构 Excel 填；复杂结构（尤其技能编辑器产出）用 json

## 代码中处理多态

类型较少时可用 `is` / `switch (shape)`；类型较多时推荐 `switch (shape.GetTypeId())` 更高效：

```csharp
switch (shape.GetTypeId())
{
    case Circle::__ID__:
        var c = (Circle)shape;
        break;
    case Triangle::__ID__:
        var t = (Triangle)shape;
        break;
}
```

## 相关链接

- [FAQ](../reference/faq)
- [常用命令行](../runtime/cli-common)
- [groups 与多端](../concepts/groups-targets)
