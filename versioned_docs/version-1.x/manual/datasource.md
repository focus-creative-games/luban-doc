# 数据定义

大多数数据格式填法符合直觉，而且数据定义是完全一样的，不同数据结构在xml中格式示例如下：

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
  <var name="v2" type="vector2"/>
  <var name="v3" type="vector3"/>
  <var name="v4" type="vector4"/>
  <var name="t1" type="datetime"/>
  <var name="k1" type="array,int"/> 使用;来分隔
  <var name="k2" type="list,int"/>
  <var name="k8" type="map,int,int"/>
  <var name="k9" type="list,DemoE2" sep="," index="y1"/>
  <var name="k15" type="array,DemoDynamic" sep=","/> 
</bean>

<table name="TbDataFromSingle" value="DemoType2" input="test/datas"/> 
```

## 数据源文件

### 以目录树形式组织

典型用法是，以目录为数据源（会遍历整棵目录树），目录树下每个文件为一个记录读入。如下示例，递归遍历整个目录树，**按文件名排序后**依次将每个文件当作一个记录读入。

:::tip
数据为json lua xml或其它的任意源文件混合在一起时，luban都能正确载入数据
:::

1. Json数据源特点：

- set类型。填法为 `[v1,v2,...]`
- map类型。由于json只支持string类型的key，因此map格式填法为 `[[k1,v1],[k2,v2]...]`
- 多态bean类型。需要 $type 属性来指定具体类型名
- text类型，填法为 {"key":key, "text":text}

2. Lua数据源特点：

- 数据前有一个return，这是因为 lua 数据是当作 lua 文件加载的，每个加载后的结果当作一个记录读入
- set 的格式为 `{v1, v2, ...}`
- 与json不同，lua 的table的key支持任意格式，所以lua的map可以直接  `{[key1] = value1, [key2] = value2, ,,,}`
- 多态bean类型。需要 \_type\_属性来指定具体类型名
- text类型，填法为 `{key = key, text = text}`

示例配置文件内容如下：

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
  "t1": {"key":"/key/xx1","text":"apple"},
  "x12": { "x1":10},
  "x13":"B",
  "x14":{"$type": "DemoD2", "x1":1, "x2":2},
  "v2":{"x":1, "y":2},
  "v3":{"x":1.1, "y":2.2, "z":3.4},
  "v4":{"x":10.1, "y":11.2, "z":12.3, "w":13.4},
  "t1":"1970-01-01 00:00:00",
  "k1":[1,2],
  "k2":[2,3],
  "k7":[2,3],
  "k8":[[2,2],[4,10]],
  "k9":[{"y1":1, "y2":true},{"y1":2, "y2":false}],
  "k15":[{"$type": "DemoD2", "x1":1, "x2":2}]
}
```

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
  t1 = {key="/key/ab1", text="apple"},
  x12 = {x1=1},
  x13 = "D",
  x14 = { _type_="DemoD2", x1 = 1, x2=3},
  v2 = {x= 1,y = 2},
  v3 = {x=0.1, y= 0.2,z=0.3},
  v4 = {x=1,y=2,z=3.5,w=4},
  t1 = "1970-01-01 00:00:00",
  k1 = {1,2},
  k2 = {2,3},
  k8 = {[2]=10,[3]=12},
  k9 = { {y1=1,y2=true}, {y1=10,y2=false} },
  k15 = { { _type_="DemoD2", x1 = 1, x2=3} },
}
```

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
  <x14 type="DemoD2">  <x1>1</x1>  <x2>2</x2> </x14>
  <v2>1,2</v2>
  <v3>1.2,2.3,3.4</v3>
  <v4>1.2,2.2,3.2,4.3</v4>
  <t1>1970-01-01 00:00:00</t1>
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
      <item type="DemoD2"> <x1>1</x1> <x2>2</x2> </item>
  </k15>
</data>
```

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
s1:
  key: "/key32"
  text: aabbcc22
v2:
  x: 1
  y: 2
v3:
  x: 1.1
  y: 2.2
  z: 3.4
v4:
  x: 10.1
  y: 11.2
  z: 12.3
  w: 13.4
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

### 以复合文件形式组织

这里只给出JSON数据源文件示例，其它格式类似

整个表以一个或者多个json文件的形式组织。在table的input属性中手动指定json数据源，有以下几种格式：

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

<table name="TbCompositeJsonTable1" value="CompositeJsonTable1" 
        input="*table1@composite_tables.json,*@composite_tables2.json,one_record.json"/>
<table name="TbCompositeJsonTable2" value="CompositeJsonTable2" 
        input="*table2@composite_tables.json"/>
<table name="TbCompositeJsonTable3" value="CompositeJsonTable3" mode="one" 
        input="table3@composite_tables.json"/>
```

## 数据tag

与excel格式类似，json格式支持记录tag，用 `__tag__` 属性来指明tag，示例如下：

```json
{
    "__tag__":"dev",
    "x":1,
    "y":2
}
```

```lua
return {
    __tag__ = "dev",
    x = 1,
    y = 2,
}
```