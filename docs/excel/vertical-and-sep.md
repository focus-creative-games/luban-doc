---
sidebar_position: 4
---

# 纵表、sep 与流式填法

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

字段未指定 `format` 时，复合数据默认按**流式**读：

| 行为 | 说明 |
|------|------|
| 空白单元格 | 常被跳过（不像分列模式「留空=默认值」） |
| 可空 bean | `null` / `{}` / 类型名 等有专门约定 |
| 容器结束 | 读到 `}` 或流结束 |

因此：在 sep/流式单元格里「留空表示默认值」往往不生效，会被当成跳过。

## 常见坑

- 纵表忘了把 A1 改成 `##column`。
- sep 拆出来的段数与字段个数不一致。
- 在流式格子里用留空表达 0/false，结果字段错位。

## 相关链接

- [Excel 基础](./basics)
- [紧凑格式](./compact)
- [嵌套与容器](./nested-and-collections)
