# 非excel数据格式

大多数数据格式填法符合直觉，而且数据定义是完全一样的。


## 演示所用的类型

以下面的DemoType2为例，展示如何在其他文件格式中填写该类型对应的数据。

```xml
<bean name="DemoType2" >
  <var name="x4" type="int" convert="DemoEnum"/>
  <var name="x1" type="bool"/>
  <var name="x5" type="long" convert="DemoEnum"/>
  <var name="x6" type="float"/>
  <var name="x7" type="double"/>
  <var name="x10" type="string"/>
  <var name="x12" type="DemoType1"/>
  <var name="x13" type="DemoEnum"/>
  <var name="x14" type="DemoDynamic" sep=","/>多态数据结构
  <var name="t1" type="datetime"/>
  <var name="k1" type="array,int"/> 使用;来分隔
  <var name="k2" type="list,int"/>
  <var name="k8" type="map,int,int"/>
  <var name="k9" type="list,DemoE2" sep="," index="y1"/>
  <var name="k15" type="array,DemoDynamic" sep=","/> 
</bean>

<table name="TbDataFromSingle" value="DemoType2" input="test/datas"/> 
```

## 数据目录

如果table.inputFiles指向目录，则会自动遍历整个目录树，忽略以`.~_`字符开头的文件，将剩下的文件当作数据文件输入。
这些数据文件格式则对应下面的单记录格式。注意，如果遇到excel文件，仍然默认试图从一个文件中读取多个记录。

## 单记录格式

### json格式

json格式的一些特殊点：

- set类型。填法为 `[v1,v2,...]`
- map类型。由于json只支持string类型的key，因此map格式填法为 `[[k1,v1],[k2,v2]...]`
- 多态bean类型。需要`$type`属性来指定具体类型名


```json
{
  "x1":true,
  "x2":3,
  "x3":128,
  "x4":1,
  "x5":11223344,
  "x6":1.2,
  "x7":1.23432,
  "x10":"hq",
  "x12": { "x1":10},
  "x13":"B",
  "x14":{"$type": "DemoD2", "x1":1, "x2":2},
  "t1":"1970-01-01 00:00:00",
  "k1":[1,2],
  "k2":[2,3],
  "k7":[2,3],
  "k8":[[2,2],[4,10]],
  "k9":[{"y1":1, "y2":true},{"y1":2, "y2":false}],
  "k15":[{"$type": "DemoD2", "x1":1, "x2":2}]
}
```

### lua格式

Lua数据源特点：

- 数据前有一个return，这是因为 lua 数据是当作 lua 文件加载的，每个加载后的结果当作一个记录读入
- set 的格式为 `{v1, v2, ...}`
- 与json不同，lua 的table的key支持任意格式，所以lua的map可以直接  `{[key1] = value1, [key2] = value2, ,,,}`
- 多态bean类型。需要 `_type_`属性来指定具体类型名

```lua
return 
{
  x1 = false,
  x2 = 2,
  x3 = 128,
  x4 = 1122,
  x5 = 112233445566,
  x6 = 1.3,
  x7 = 1122,
  x10 = "yf",
  x12 = {x1=1},
  x13 = "D",
  x14 = { _type_="DemoD2", x1 = 1, x2=3},
  t1 = "1970-01-01 00:00:00",
  k1 = {1,2},
  k2 = {2,3},
  k8 = {[2]=10,[3]=12},
  k9 = { {y1=1,y2=true}, {y1=10,y2=false} },
  k15 = { { _type_="DemoD2", x1 = 1, x2=3} },
}
```


### xml格式


```xml
<data>
  <x1>true</x1>
  <x2>4</x2>
  <x3>128</x3>
  <x4>1</x4>
  <x5>112233445566</x5>
  <x6>1.3</x6>
  <x7>1112232.43123</x7>
  <x10>yf</x10>
  <x12> <x1>1</x1> </x12>
  <x13>C</x13>
  <x14 __type__="DemoD2">  <x1>1</x1>  <x2>2</x2> </x14>
  <k1> <item>1</item> <item>2</item> </k1>
  <k2> <item>1</item> <item>2</item> </k2>
  <k8>
      <item> <key>2</key><value>10</value></item>
      <item> <key>3</key><value>30</value></item>
  </k8>
  <k9>
      <item> <y1>1</y1> <y2>true</y2> </item>
      <item> <y1>2</y1> <y2>false</y2> </item>
  </k9>
  <k15>
      <item __type__="DemoD2"> <x1>1</x1> <x2>2</x2> </item>
  </k15>
</data>
```

### yaml格式

yaml格式的特性性与json相似：

- set类型。填法对应json列表 `[v1,v2,...]`
- map类型。由于json只支持string类型的key，因此map格式填法对于json中kv列表 `[[k1,v1],[k2,v2]...]`
- 多态bean类型。需要 `$type`属性来指定具体类型名

```yaml
x1: true
x2: 3
x3: 128
x4: 40
x5: 11223344
x6: 1.2
x7: 1.23432
x10: hq
x12:
  x1: 10
x13: B
x14:
  $type: DemoD2
  x1: 1
  x2: 2
t1: '1970-01-01 00:00:00'
k1:
- 1
- 2
k2:
- 2
- 3
k8:
- - 2
  - 2
- - 4
  - 10
k9:
- y1: 1
  y2: true
- y1: 2
  y2: false
k15:
- $type: DemoD2
  x1: 1
  x2: 2
```


## 复合文件格式

如果在一个文件中包含多个记录，则需要在文件名前加上`*@`，表示该文件包含一个记录列表，而不是一个记录。
这里以json格式为例。table的inputFiles，有以下几种格式：

- `xxx.json`，把xxx.json当作一个记录读入。
- `*@xxx.json`，把xxx.json当作记录列表读入。
- `field@xxx.json`，把 xxx.json中的field字段当作一个记录读入。field可以是深层次字段，比如 a.b.c。
- `*field@xxx.json`，把xxx.json中的field字段当作记录列表读入。field可以是深层次字段。

比较有趣的是，与xlsx数据源相似，支持将多个表放到同一个json中，不过实践中极少这么做。

如下列示例：

- TbCompositeJsonTable1 从 composite_tables.json的table1字段中读入记录列表，从composite_tables2.json中读入记录列表，从one_record.json中读入一个记录
- TbCompositeJsonTable2 从 composite_tables.json的table2字段中读入记录列表
- TbCompositeJsonTable3 从 composite_tables.json的table3字段中读入一个记录

```xml
<bean name="CompositeJsonTable1">
    <var name="id" type="int"/>
    <var name="x" type="string"/>
</bean>
<bean name="CompositeJsonTable2">
    <var name="id" type="int"/>
    <var name="y" type="int"/>
</bean>
<bean name="CompositeJsonTable3">
    <var name="a" type="int"/>
    <var name="b" type="int"/>
</bean>

<table name="TbCompositeJsonTable1" value="CompositeJsonTable1" input="*table1@composite_tables.json,*@composite_tables2.json,one_record.json"/>
<table name="TbCompositeJsonTable2" value="CompositeJsonTable2" input="*table2@composite_tables.json"/>
<table name="TbCompositeJsonTable3" value="CompositeJsonTable3" mode="one" input="table3@composite_tables.json"/>
```
