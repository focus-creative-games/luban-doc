---
sidebar_position: 2
---

# 嵌套结构与容器

本页解决：在 Excel 里填 bean、list/array/set/map，以及多级表头、多行列表。

Excel 里一个字段占多列时，用**合并单元格**标出范围（不是把字段名在每一列各写一遍）。下文 HTML 表格用 `colspan` 模拟合并效果。

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

具体是否启用列限定模式，取决于工程模板与类型标记，以能通过生成为准。

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

## 列限定补充

| 写法 | 用途 |
|------|------|
| `$type` | 多态/可空 bean 的类型列，见 [多态](./polymorphism) |
| `$value` | 值走流式/紧凑格式 |
| `$key` | map 多行模式的键列 |

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
