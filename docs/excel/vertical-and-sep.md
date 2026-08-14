---
sidebar_position: 4
---

# 纵表、sep 与流式填法

复合数据（bean、容器）在 Excel 里有四种常见读法：

| # | 方式 | 说明 |
|---|------|------|
| 1 | 流式，多单元格 | 占多列，按从左到右顺序读；空白常被跳过 |
| 2 | 流式，单单元格 + sep | 一格内用分隔符拆成数据流 |
| 3 | 列限定，多单元格 | 多级 `##var` 指定每个子字段占哪一列；原子类型支持留空默认值 |
| 4 | 多行读取（仅容器） | 字段名 `*name`；每行一个元素，元素本身可用 1–3 任一方式 |

![流式多单元格](/img/use_stream1.jpg) ![流式单格 sep](/img/use_stream2.jpg) ![列限定](/img/use_column.jpg) ![多行读取](/img/use_rows.jpg)

列限定可多层嵌套；多行仅用于容器类型。

## 纵表（单例配置常用）

横表：一行一条记录。纵表：A1 为 `##column` 或 `##vertical`，**一行一个字段**，适合全局配置。

### Schema

```xml
<table name="TbGlobal" value="GlobalConfig" mode="one" input="global.xlsx"/>
```

```xml
<bean name="GlobalConfig">
  <var name="bag_init_size" type="int"/>
  <var name="bag_max_size" type="int"/>
  <var name="guild_open_level" type="int"/>
</bean>
```

### 横表写法（对比）

| ##var | bag_init_size | bag_max_size | guild_open_level |
|---|---|---|---|
| ##type | int | int | int |
| | 20 | 100 | 10 |

### 纵表写法

A1 必须是 `##column`（或 `##vertical`）：

| ##column | ##type | ## |
|---|---|---|
| bag_init_size | int | 20 |
| bag_max_size | int | 100 |
| guild_open_level | int | 10 |

## sep：一个单元格写复合数据

复合结构若每字段一列会太宽，可用 `sep=<字符>` 在一格内拆分。

`sep` 可写在：

| 位置 | 示例 |
|------|------|
| Excel 字段名 | `pos#sep=,` |
| bean tags | `<bean name="Vec3" tags="sep=,">` |
| type 上 | `Type1#sep=,`、`(list#sep=\|),int` |

多个字符表示「其中任一字符都是分隔符」，不是把整串当一个分隔符。`#` / `&` 作分隔符时写 `\#` / `\&`。

**出现位置与行为：**

| 位置 | 行为 |
|------|------|
| Excel 字段名（如 `x#sep=,`） | 在该字段列范围内，每个单元格用 sep 拆成数据流，再流式读取 |
| bean tags（如 `<bean tags="sep=,">`） | 读取该 bean 时，整段字符串用 sep 拆分后流式读字段 |
| type tag（如 `Vec#sep=,`、`(list#sep=\|),int`） | 下一个读到的字符串当作整体，sep 拆分后流式读该 type |
| 容器 type | 见下 |

**容器上的 sep 有两种施加方式：**

- sep 加在**容器自身**（如 `list#sep=|`）：下一个字符串当作整个容器，sep 分割后读各元素。
- sep 加在**元素类型**（如 `list,(Vec#sep=,)`）：每个元素段单独 sep 拆分后读元素结构。

组合示例：`(list#sep=|),(Vec#sep=,)` — 列表用 `|` 分元素，Vec 用 `,` 分 x/y/z。

![sep 读 bean](/img/cases/sep_bean.jpg) ![sep 读普通容器](/img/cases/sep_container1.jpg) ![sep 读结构容器](/img/cases/sep_container2.jpg)

### 示例：Vec3

```xml
<bean name="Vec3" sep=",">
  <var name="x" type="float"/>
  <var name="y" type="float"/>
  <var name="z" type="float"/>
</bean>
```

| ##var | id | pos |
|---|---|---|
| ##type | int | Vec3 |
| | 1 | 1.0,2.0,3.0 |
| | 2 | 0,0,1 |

或只在字段名上声明：`pos#sep=,`，type 仍写 `Vec3`。

### 示例：嵌套 + sep

```xml
<bean name="Type1">
  <var name="a" type="int"/>
  <var name="b" type="string"/>
  <var name="c" type="bool"/>
</bean>
<bean name="Type3">
  <var name="a" type="int"/>
  <var name="b" type="bool"/>
  <var name="c" type="Type1#sep=,"/>
</bean>
```

| ##var | id | a | b | c |
|---|---|---|---|---|
| ##type | int | int | bool | Type1#sep=, |
| | 1 | 10 | true | 1,hello,false |

→ `c = { a:1, b:"hello", c:false }`。

### 示例：list + sep

字段名写 `nums`，类型写 `(list#sep=|),int`：

| ##var | id | nums |
|---|---|---|
| ##type | int | (list#sep=\|),int |
| | 1 | 1\|3\|5\|9 |

→ `nums = [1,3,5,9]`。

## 流式（stream）语义

**何时走流式：** 非原子数据（bean/容器）被限定到某些列范围，或属于 sep 拆分后的一段，且**未**对子字段做列限定时，子数据按流式顺序读取。

| 行为 | 说明 |
|------|------|
| 空白单元格 | 常被跳过（**无法**区分「空白」与「默认值」） |
| 可空 bean | `null` / `{}` / 类型名 等有专门约定 |
| 容器结束 | 读到 `}` 或流结束 |

因此：在 sep/流式单元格里「留空表示默认值」**不生效**，必须填有效默认值：

| 类型 | 流式下的「空/默认」写法 |
|------|------------------------|
| bool | 必须显式填 `false` / `true` |
| int / float | 必须填 `0` 等有效数字 |
| string | 空串写 `""` |
| 可空（如 `int?`） | 空值用 `null` |
| 容器 | 空容器用 `}` 终止读取 |

![流式填法示例](/img/cases/stream.jpg)

标红错误行试图用留空表达 bool/string 默认值，会被跳过导致「数据不足」解析错误。

**各类型流式读法：**

- 多态 bean：先读类型名字符串，再流式读子类字段
- 可空 bean：先读字符串；`null` 表示空；`{}` 或类型名表示非空并继续读字段。Vec3 有效示例：`1,2,3`、`null`、`{},1,2,3`、`vec3,1,2,3`
- `array` / `list` / `set`：遇 `}` 或流结束则停止，否则循环读元素
- `map`：循环读 key、value 对，遇 `}` 或流结束则停止

与 [列限定](./nested-and-collections#列限定补充) 对比：分列限定到原子类型时，留空可取默认值；未限定到子字段的 bean/容器内部仍走流式。

## 常见坑

- 纵表忘了把 A1 改成 `##column`。
- sep 拆出来的段数与字段个数不一致。
- 在流式格子里用留空表达 0/false，结果字段错位。

## 相关链接

- [Excel 基础](./basics)
- [紧凑格式](./compact)
- [嵌套与容器](./nested-and-collections)
