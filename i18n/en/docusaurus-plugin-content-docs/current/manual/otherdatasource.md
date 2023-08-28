# Non-excel data format

Most of the data format filling methods are intuitive, and the data definitions are exactly the same.


## The type used for the demo

Take the following DemoType2 as an example to show how to fill in the corresponding data of this type in other file formats.

```xml
<bean name="DemoType2">
   <var name="x4" type="int" convert="DemoEnum"/>
   <var name="x1" type="bool"/>
   <var name="x5" type="long" convert="DemoEnum"/>
   <var name="x6" type="float"/>
   <var name="x7" type="double"/>
   <var name="x10" type="string"/>
   <var name="x12" type="DemoType1"/>
   <var name="x13" type="DemoEnum"/>
   <var name="x14" type="DemoDynamic" sep=","/> polymorphic data structure
   <var name="t1" type="datetime"/>
   <var name="k1" type="array,int"/> use; to separate
   <var name="k2" type="list,int"/>
   <var name="k8" type="map,int,int"/>
   <var name="k9" type="list,DemoE2" sep="," index="y1"/>
   <var name="k15" type="array,DemoDynamic" sep=","/>
</bean>

<table name="TbDataFromSingle" value="DemoType2" input="test/datas"/>
```

## data directory

If table.inputFiles points to a directory, it will automatically traverse the entire directory tree, ignore files beginning with `.~_` characters, and input the remaining files as data files.
These data file formats correspond to the following single-record formats. Note that if an excel file is encountered, it still tries to read multiple records from a file by default.

## Single record format

### json format

Some special points of json format:

- set type. Filling method is `[v1,v2,...]`
- map type. Since json only supports keys of string type, the map format filling method is `[[k1,v1],[k2,v2]...]`
- Polymorphic bean types. The `$type` attribute is required to specify the concrete type name


```json
{
   "x1": true,
   "x2": 3,
   "x3": 128,
   "x4": 1,
   "x5":11223344,
   "x6":1.2,
   "x7":1.23432,
   "x10": "hq",
   "x12": { "x1":10},
   "x13": "B",
   "x14":{"$type": "DemoD2", "x1":1, "x2":2},
   "t1": "1970-01-01 00:00:00",
   "k1":[1,2],
   "k2":[2,3],
   "k7":[2,3],
   "k8":[[2,2],[4,10]],
   "k9":[{"y1":1, "y2":true},{"y1":2, "y2":false}],
   "k15":[{"$type": "DemoD2", "x1":1, "x2":2}]
}
```

### lua format

Lua data source features:

- There is a return before the data, because the lua data is loaded as a lua file, and each loaded result is read as a record
- The format of the set is `{v1, v2, ...}`
- Unlike json, the key of lua's table supports any format, so lua's map can directly `{[key1] = value1, [key2] = value2, ,,,}`
- Polymorphic bean types. The `_type_` attribute is required to specify the concrete type name

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


### xml format


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
   <x14 __type__="DemoD2"> <x1>1</x1> <x2>2</x2> </x14>
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

### yaml format

The characteristics of yaml format are similar to json:

- set type. The filling method corresponds to the json list `[v1,v2,...]`
- map type. Since json only supports keys of string type, the map format filling method is for the kv list in json `[[k1,v1],[k2,v2]...]`
- Polymorphic bean types. The `$type` attribute is required to specify the concrete type name

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


## Composite file format

If a file contains multiple records, you need to add `*@` before the file name, indicating that the file contains a list of records, not a record.
Here we take the json format as an example. The inputFiles of the table have the following formats:

- `xxx.json`, read xxx.json as a record.
- `*@xxx.json`, read xxx.json as a list of records.
- `field@xxx.json`, read the field field in xxx.json as a record. field can be a deep-level field, such as a.b.c.
- `*field@xxx.json`, read the field field in xxx.json as a list of records. field can be a deep field.

What's more interesting is that, similar to the xlsx data source, it supports putting multiple tables into the same json, but this is rarely done in practice.

As the following example:

- TbCompositeJsonTable1 reads a list of records from the table1 field of composite_tables.json, reads a list of records from composite_tables2.json, and reads a record from one_record.json
- TbCompositeJsonTable2 reads a list of records from the table2 field of composite_tables.json
- TbCompositeJsonTable3 reads a record from the table3 field of composite_tables.json

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
