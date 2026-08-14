---
sidebar_position: 2
---

# 嵌套结构与容器

本页解决：在 Excel 里填 bean、list/array/set/map，以及多级表头、多行列表。

Excel 里一个字段占多列时，用**合并单元格**标出范围（不是把字段名在每一列各写一遍）。下文 HTML 表格用 `colspan` 模拟合并效果。

### CSV 等不支持合并单元格的格式

CSV 无法合并单元格。若要让字段占多列，在**起始列**写 `[{字段名}`，在**结束列**写 `{字段名}]`，中间列留空，语义等价于 Excel 合并。

示例：字段 `nums`（类型 `list,int`）占 C–F 四列时，C1=`[{nums}`，F1=`{nums}]`；`##type` 行仍写 `list,int`，数据从左到右填元素。

![list 多列填法](/img/use_list.jpg)

元素类型也可以是枚举或 bean；`array` / `list` / `set` 填法类似。

![list 元素为结构](/img/use_list2.jpg)

占**一个单元格**时，用 `sep=` 指定分隔符（如 `sep=,`、`|`、`;`），见 [sep 与流式](./vertical-and-sep)。

## 多级表头（列限定）为什么需要

复合结构若纯流式按列顺序填，**空白单元格会被自动跳过**，字段多时容易错位；流式也不支持「留空 = 默认值」。因此在 `##var` 下再写一行 `##var` 为子字段命名，可精确限定每列归属，提高可读性。

![多级标题头](/img/cases/multileveltitle.jpg)

可任意层级嵌套（x1 一级、y1 二级、z1 三级等）。

## 先约定结构

下面示例共用这组 bean（XML 示意，也可用 `__beans__.xlsx`）：

```xml
<bean name="Cost">
  <var name="id" type="int"/>
  <var name="count" type="int"/>
</bean>

<bean name="Reward">
  <var name="item_id" type="int"/>
  <var name="num" type="int"/>
  <var name="desc" type="string"/>
</bean>
```

## Bean：合并单元格分列填

字段 `cost` 类型为 `Cost`。第一行把 `cost` **合并两列**；下一行 `##var` 再写子字段名：

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="2">cost</th>
      <th>name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>id</td>
      <td>count</td>
      <td></td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <th colspan="2">Cost</th>
      <td>string</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1001</td>
      <td>5</td>
      <td>兑换A</td>
    </tr>
    <tr>
      <td></td>
      <td>2</td>
      <td>1002</td>
      <td>1</td>
      <td>兑换B</td>
    </tr>
  </tbody>
</table>

读法：`cost` 横跨两列；子行分别是 `id` / `count`。

等价理解：`id=1, cost={id:1001,count:5}, name=兑换A`。

## 嵌套 bean

`reward` 内再嵌 `cost` 时：外层合并 `reward`，内层再合并 `cost`：

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">reward</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>item_id</td>
      <td>num</td>
      <td colspan="2">cost</td>
    </tr>
    <tr>
      <td>##var</td>
      <td></td>
      <td></td>
      <td></td>
      <td>id</td>
      <td>count</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <th colspan="3">Reward</th>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>2001</td>
      <td>10</td>
      <td>1001</td>
      <td>2</td>
    </tr>
  </tbody>
</table>

也可以不用多级表头，改用 [sep / 紧凑格式](./compact) 把子结构塞进一个单元格。

## list / array / set

用合并单元格标出列表所占整段列，元素按从左到右顺序填；**空白格常被忽略**。

### `list,int`（最多 4 个元素）

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">nums</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1</td>
      <td>3</td>
      <td>5</td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td>2</td>
      <td>10</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

结果：`id=1 → nums=[1,3,5]`；`id=2 → nums=[10]`。

### `list,Cost`

每个元素占 bean 宽度（此处 2 列），再横向排多个元素；第一行仍只合并一次 `costs`：

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">costs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>id</td>
      <td>count</td>
      <td>id</td>
      <td>count</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1001</td>
      <td>2</td>
      <td>1002</td>
      <td>1</td>
    </tr>
  </tbody>
</table>

→ `costs=[{1001,2},{1002,1}]`。

## map

`map,int,string`：在合并范围内 **key、value 成对** 填写。

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="4">dict</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>string</td>
      <td>int</td>
      <td>string</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1</td>
      <td>剑</td>
      <td>2</td>
      <td>盾</td>
    </tr>
  </tbody>
</table>

→ `{1:"剑", 2:"盾"}`。

### 单单元格 + 双 sep

map 也可在一个单元格内填写。为区分 key/value 以及各 key-value 对，通常配置 **2 个分隔符**，例如 `map#sep=,;` 或在 type 上写 `(map#sep=,;),int,Item#sep=,`：第一个分隔各对，第二个分隔 key 与 value（或 value 内字段）。value 为 bean 时，每段 value 内再用 sep 流式读子字段。

![map 单格填法](/img/use_map.jpg)

value 为结构类型时类似：

![map value 为 bean](/img/use_map2.jpg)

map 也支持 `*字段名` 多行填写，每行一对或多对 key-value：

![map 多行填法](/img/use_map3.jpg)

### 列限定写法（键作子列名）

上层合并 `attrs`，下层用固定 key 作列名：

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="3">attrs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>atk</td>
      <td>def</td>
      <td>hp</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>10</td>
      <td>5</td>
      <td>100</td>
    </tr>
  </tbody>
</table>

单元格非空则该 key-value 存在。示例：id=1 的 y2 列有子列 `aaa`、`ccc`，填 `1` 和 `2` → `{{"aaa",1},{"ccc",2}}`；id=2 填 `bbb=10, ccc=20, ddd=30` → `{{"bbb",10},{"ccc",20},{"ddd",30}}`。

![map 列限定](/img/cases/title_map.jpg)

:::tip
以上仅是 map 的**列限定**填法。map 在流式/sep 单元格里还有 key-value 交替、紧凑 sep 等填法，见 [sep 与流式](./vertical-and-sep)。
:::

### 列限定 + 多行模式（`$key`）

多行填法时，`$key` 子列对应 map 的 key，其余列对应 value 的子字段（适合 value 为 bean）。

## 多行列表 `*<name>`

字段名写成 `*rewards` 时，**同一主键下多行**表示列表的多个元素；第一行对 `*rewards` 做列合并：

<table>
  <thead>
    <tr>
      <th>##var</th>
      <th>id</th>
      <th colspan="3">*rewards</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>##var</td>
      <td></td>
      <td>item_id</td>
      <td>num</td>
      <td>desc</td>
    </tr>
    <tr>
      <td>##type</td>
      <td>int</td>
      <td>int</td>
      <td>int</td>
      <td>string</td>
    </tr>
    <tr>
      <td></td>
      <td>1</td>
      <td>1001</td>
      <td>1</td>
      <td>第一项</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td>1002</td>
      <td>2</td>
      <td>第二项</td>
    </tr>
    <tr>
      <td></td>
      <td>2</td>
      <td>2001</td>
      <td>1</td>
      <td></td>
    </tr>
  </tbody>
</table>

→ id=1 有两个 reward；id=2 有一个。适合「一行主数据 + 多条子配置」。

支持**任意层次**嵌套：多行列表的每个元素内部仍可再是多行结构。对 `array,bean` / `list,bean` 还可配合列限定，限定元素内每个子字段的列。

![多行结构列表](/img/cases/multiline.jpg)

## 列限定补充

列限定下，**仅原子类型**（如 `int`、`string`）支持默认值语义：单元格留空取类型默认值（`int`→0，`int?`→null）。若最低层限定列的类型仍是容器或 bean（未限定到每个子字段），子数据仍按**流式**读取，空白会被跳过。

![列限定与流式混合](/img/cases/titlelimit.jpg)

| 写法 | 用途 |
|------|------|
| `$type` | 多态/可空 bean 的类型列；flags 枚举（`flags=1`）时各枚举项作子列名，非 0/非空项按位或 |
| `$value` | 限定 bean 实际字段范围，且在 `$value` 列内以**流式**填写该类型的所有字段 |
| `$key` | map 多行模式的键列 |

flags 枚举列限定示例：

![flags 列限定](/img/cases/title_enum.jpg)

多态 bean 的 `$type` + `$value` 混合示例：

![多态列限定](/img/cases/title_dynamic_bean.jpg)

## 常见坑

- 合并单元格列数与 bean / 容器实际占用列数不一致。
- 文档或表头里把字段名在每一列重复填写，和 Excel 合并语义不一致，也容易让策划误解。
- `list` 中间留空被忽略，导致元素错位（需要占位时改用紧凑格式或明确分隔）。
- map 只写了 key 没写 value。
- 容器元素类型写成可空（当前规则一般不允许）。

## 相关链接

- [多态填法](./polymorphism)
- [sep 与纵表](./vertical-and-sep)
- [紧凑格式](./compact)
