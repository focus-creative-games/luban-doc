---
sidebar_position: 1
---

# 数据校验器

校验在**生成期**执行，把坏数据挡在进包前。发布流水线建议加 `--validationFailAsError`（校验失败则生成失败）。

校验写在字段类型字符串上（XML `type="..."` 或 Excel `##type`），与 [类型速查](../schema/types) 同一套写法。

## 一览

| 能力 | 写法示例 | 说明 |
|------|----------|------|
| 非默认 | `int!`、`int?!` | 不能为类型默认值 / null |
| 引用 | `int#ref=item.TbItem` | 必须是目标表合法主键 |
| 忽略 0/空串 | `int#ref=item.TbItem?` | 0 或 `""` 时跳过引用检查 |
| 多表引用 | `int#ref=a.TbA,b.TbB` 或 refgroup | 多表时一般不生成 `xxx_Ref` |
| 路径 | `string#path=unity` | 需 `-x pathValidator.rootDir=...` |
| 范围 | `int#range=[1,100]` | 开闭区间 |
| 容器大小 | `(list#size=4),int` | size 加在**容器**上 |
| 允许值集合 | `int#set=1;2;3` | 推荐用 `;` 分隔 |
| 正则 | `string#regex=^[a-z]+$` | string 须匹配指定正则 |
| list 建索引 | `(list#index=id),Foo` | 元素某字段唯一；部分语言生成辅助字典 |

可空字段为 `null` 时，多数引用类校验会跳过。

## 非默认值 `!`

```xml
<var name="id" type="int!"/>           <!-- 不能为 0 -->
<var name="opt" type="int?!"/>         <!-- 不能为 null -->
<var name="ids" type="list,int!"/>     <!-- 元素不能为 0 -->
<var name="kv" type="map,int!,string!"/>
```

## 引用 `ref`

### map 表（最常见）

只需写被引用表的**全名**：

```xml
<bean name="Gift">
  <var name="item_id" type="int#ref=item.TbItem"/>
  <var name="item_ids" type="list,(int#ref=item.TbItem)"/>
  <var name="weights" type="map,(int#ref=item.TbItem),int"/>
</bean>
```

Excel 表头等价：

| ##var | id | item_id | item_ids |
|---|---|---|---|
| ##type | int | int#ref=item.TbItem | (list#sep=\|),(int#ref=item.TbItem) |
| | 1 | 1001 | 1001\|1002 |
| | 2 | 9999 | | 

若 `9999` 不在 `item.TbItem` 中，生成期报错。

### 忽略空白 / 可空

| 写法 | 行为 |
|------|------|
| `int#ref=item.TbItem?` | 值为 `0` 时跳过检查 |
| `int?#ref=item.TbItem` | 为 `null` 时跳过 |
| `int?#ref=item.TbItem?` | `null` 或 `0` 都跳过 |

### list 表 / 单例表

| 被引用表 mode | 写法 |
|---------------|------|
| list（多主键） | `ref=keyName@table.TbXxx` |
| one（单例） | `ref=mapField@table.TbXxx`（被引字段须为 map，且 key 类型匹配） |

### 多表与 refgroup

```xml
<refgroup name="item_tables" ref="item.TbItem,item.TbEquip"/>

<bean name="Reward">
  <var name="id" type="int#ref=item.TbItem,item.TbEquip"/>
  <var name="id2" type="int#ref=item_tables"/>
  <var name="id3" type="int#ref=item_tables?"/>
</bean>
```

### 生成代码中的 `xxx_Ref`（C# 等）

单表 `ref` 时常额外生成引用字段，加载后自动填好：

```csharp
public int ItemId { get; private set; }
public item.Item ItemId_Ref { get; private set; }
```

**多表 ref 不会生成** `xxx_Ref`。

## 路径 `path`

只作用于 `string`（及容器中的 string）。必须指定资源根目录，否则 path 校验禁用并警告：

```bash
-x pathValidator.rootDir=D:/Game/Client
```

| 子类型 | 写法 | 检查路径 |
|--------|------|----------|
| normal | `string#path=normal;UI/*.text` | `{rootDir}/UI/{字段值}.text`（`*` 换字段值） |
| unity | `string#path=unity` | `{rootDir}/{字段值}`（通常含后缀） |
| ue | `string#path=ue` | Content 下找 `.uasset` / `.umap`；可剥 `blueprint'` 前缀 |
| godot | `string#path=godot` | 处理 `res://` 等 |

```xml
<var name="icon" type="string#path=unity"/>
<var name="prefabs" type="list,string#path=normal;Prefabs/*.prefab"/>
```

## 范围 `range`

```xml
<var name="lv" type="int#range=[1,100]"/>
<var name="rate" type="float#range=(0,1]"/>
<var name="min_only" type="int#range=[1,]"/>
```

| 写法 | 含义 |
|------|------|
| `10` | 必须等于 10 |
| `[1,10]` | 闭区间 |
| `(1,10)` / `[1,10)` / `(1,10]` | 开闭组合 |
| `[1,]` / `[,100]` | 半边无穷 |

## 容器大小 `size`

`size` 必须加在**容器**上，用括号：

```xml
<!-- 正确 -->
<var name="x" type="(list#size=4),int"/>
<var name="y" type="(map#size=[5,10]),int,int"/>

<!-- 错误：size 会落到元素上 -->
<!-- <var name="x" type="list,int#size=4"/> -->
```

## 允许值 `set`

支持 int / long / string / enum 及其容器。分隔符用 `,` 或 `;`，**推荐 `;`**。含 `,` 时常用括号包住 `set`：

```xml
<var name="a" type="int#set=1;2;3"/>
<var name="b" type="int#(set=1,2,3)"/>
<var name="c" type="Quality#set=WHITE;GREEN"/>
<var name="d" type="list,int#set=1;2;3;4"/>
```

## list 元素索引 `index`

要求 `list,Bean` / `array,Bean` 内某字段唯一：

```xml
<bean name="Foo">
  <var name="id" type="int"/>
  <var name="name" type="string"/>
</bean>
<bean name="Bar">
  <var name="foos" type="(list#index=id),Foo"/>
</bean>
```

C# 等可能额外生成 `Foos_id` 字典，便于按 id 查找。

## 与记录 tag

某行加 tag `unchecked` 可跳过校验器（慎用），见 [tag](./tags)。

## 自定义校验

内置校验不够时，可另做校验工程（加载生成数据再 assert）。可参考示例仓库中的 CfgValidator 一类项目。

## 相关链接

- [tags](./tags)
- [类型速查](../schema/types)
- [常用命令行](../runtime/cli-common)
