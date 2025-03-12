# data validator

A variety of common data validators are implemented in the Luban.DataValidtor.Builtin module.

## notDefaultValue validator

The required data cannot be the default value. For example, an int type field cannot be 0, and an int? type field cannot be null.

### Format

Add the ! character after the type name, for example:

- `type="int!"` requires the field not to be 0
- `type=int?!` requires that the field cannot be null
- `type="list,int!` requires that the element value of the list cannot be 0
- `type="map,int!,string!` requires that the key of the map cannot be 0, and the value cannot be a string of length 0

## ref validator

Checking whether a field is a legal key of a table is very common in games. For example, it is required that the item_id field in the package table must be a legal key of the item.TbItem table.
ref can be used on any data type that can be used as a key, and can also be an element type of a container.

### Format

According to the mode of the referenced table, the reference format is slightly different

- Normal map table. ref="table{?}" . Since the map table has only one primary key, you only need to write the referenced **full name of the table**.
- list table. ref="key@table{?}". Since the list table has multiple primary keys, it is necessary to use key@table to indicate which primary key of the referenced table.
- Singleton table. ref="key@table{?}". Since the singleton table does not have a primary key, it is necessary to use key@table to indicate which field is referenced. The referenced field must be of map type, and the key type must match.

### Regular references

Assume that item.TbItem is a prop table, and the key field type is int; suppose ui.TbWidget is a component table, and the key field type is string.

```xml
<bean name="TestRef">
    <var name="x1" type="int#ref=item.TbItem"/> x1 must be the legal id of the item.TbItem table
    <var name="x2" type="list,int#ref=item.TbItem"/> Each element in the x2 list must be a legal id
    <var name="x2_2" type="list,(int#ref=item.TbItem)"/> For clarity, add brackets to limit
    <var name="x3" type="map,int#ref=item.TbItem,int"/> The key of x3 must be the legal id of item.TbItem
    <var name="x4" type="map,int,int#ref=item.TbItem"/> The value of x4 must be the legal id of item.TbItem
    <var name="x5" type="map,int#ref=item.TbItem,int#item.TbItem"/> The key and value of x5 must be legal ids
    <var name="x5" type="map,(int#ref=item.TbItem),(int#item.TbItem)"/> parentheses for clarity
   
    <var name="y1" type="string#ref=ui.TbWidget"/> y1 must be the legal id of the ui.TbWidget table
    <var name="y2" tppe="list,string#ref=ui.TbWidget"/> Each element in the y2 list must be a legal id
    <var name="y3" type="map,string#ref=ui.TbWidget,int"/> The key in y3 must be a legal id

    <var name="z1" type="map,(int#ref=item.TbItem),(string#ref=ui.TbWidget)"/> The key of z1 must be the legal id of item.TbItem, and the value must be ui. TbWidget legal id
</bean>
```

### Ignore blank value references

Sometimes, when the field value is required to be 0 or "", ignore the check and use "ref=xxx?". as follows:

```xml
<bean name="TestEmptyRef">
    <var name="x" type="int#ref=item.TbItem?"/> When the x value is not 0, it must be a legal id, and when it is 0, ignore the check
</bean>
```

### Reference checking for nullable variables

For nullable variables, when the value is null, the check is ignored, as follows:

```xml
<bean name="TestNull">
    <var name="x" type="int?#ref=item.TbItem"/> When x != null, it must be a legal id, and ignore it if it is null
    <var name="y" type="int?#ref=item.TbItem?"/> When x != null and x != 0, it must be a legal id, otherwise ignore
</bean>
```

### Multiple table references

Sometimes, it is hoped that the id must exist in a certain table among several tables, and ref supports multiple table references, written as follows:

```xml
<bean name="TestMultiRef">
    <var name="x" type="int#(ref=item.TbItem,item.TbEquip)"/>
    <var name="y" type="int" ref="item.TbItem,item.TbEquip"/>
</bean>
```

### reference group

If many fields refer to the same set of tables. It is more convenient to use reference groups.

```xml
<refgroup name="test_ref_group" ref="item.TbItem,item.TbEquip"/>

<bean name="TestMultiRef">
    <var name="x" type="int#ref=test_ref_group"/>
    <var name="x2" type="int#ref=test_ref_group?"/>
    <var name="x3" type="int#ref=test_ref_group,hero.TbHero"/>
</bean>
```

### Special handling of ref in code generation

In some languages such as c# and typescript generated code, if a field xx has a ref, it will generate a xx_Ref field whose type is the record type of the referenced table, and this reference value will be automatically set after loading, which is convenient for program use. Note that no code will be generated if **refs more than one table**.

The sample c# code is as follows

```csharp
public int X1 { get; private set; }
public test.TestBeRef X1_Ref { get; private set; }
public int X12 { get; private set; }
public int X2 { get; private set; }
public int X3 { get; private set; }
public int[] A1 { get; private set; }
public test.TestBeRef[] A1_Ref { get; private set; }
public int[] A2 { get; private set; }
public test.TestBeRef[] A2_Ref { get; private set; }
public System.Collections.Generic.List<int> B1 { get; private set; }
public System.Collections.Generic.List<test.TestBeRef> B1_Ref { get; private set; }
public System.Collections.Generic.List<int> B2 { get; private set; }
public System.Collections.Generic.List<test.TestBeRef> B2_Ref { get; private set; }
public System.Collections.Generic.HashSet<int> C1 { get; private set; }
public System.Collections.Generic.HashSet<test.TestBeRef> C1_Ref { get; private set; }
public System.Collections.Generic.HashSet<int> C2 { get; private set; }
public System.Collections.Generic.HashSet<test.TestBeRef> C2_Ref { get; private set; }
public System.Collections.Generic.Dictionary<int, int> D1 { get; private set; }
public System.Collections.Generic.Dictionary<int, test.TestBeRef> D1_Ref { get; private set; }
public System.Collections.Generic.Dictionary<int, int> D2 { get; private set; }
public System.Collections.Generic.Dictionary<int, test.TestBeRef> D2_Ref { get; private set; }
```

## path validator

Similar to the definition method of ref, but path can only act on string type data. There are several subtypes of path validators with slightly different parameters. The working principle of the path validator is to generate a path according to the field value, and then check whether the path exists. Therefore, using the path validator requires using `-x pathValidator.rootDir=xxx` on the command line to specify the root directory of the path to be checked.

### normal checker

The normal checker requires parameters in the format path=normal;<pattern\>. The * appearing in the pattern will be replaced by the field value to form the final value, and then check whether the corresponding file exists in the validate_root_dir directory.

```xml
<bean name="TestPath">
   <var name="x" type="string#path=normal;UI/*.text"/> Check whether the resource corresponding to the full path ${pathValidator.rootDir}/UI/${x}.text exists
   <var name="x2" type="list,string#path=normal;Prefabs/*.prefab"/> Check each element e of x2, the resource corresponding to ${pathValidator.rootDir}/Prefabs/${e}.prefab does it exist
</bean>
```

### Unity Validator

Directly check if `${pathValidator.rootDir}/{path}` file exists. A typical usage scenario is to work with the Addressable of the unity engine, pointing `pathValidator.rootDir` to the root directory of the project.


```xml
<bean name="TestPath">
   <var name="x" type="string#path=unity"/> Check whether the resource corresponding to the full path ${pathValidator.rootDir}/{x} exists
   <var name="x2" type="list,string#path=unity"/> Check each element e of x2, whether the resource corresponding to ${pathValidator.rootDir}/{e} exists
</bean>
```

### ue validator

Check whether there is a resource with the same field name, especially for UE4 resource system optimization, `pathValidator.rootDir` must point to the Content directory of the project.
Different from unity, the resource value in unity must contain the file suffix, and the ue does not contain the file suffix. The ue checker will automatically check whether the resource corresponding to ${x}.uasset or ${x}.umap exists.
If the resource value also has a prefix such as "blueprint'/character/Mouse", it will automatically remove the blueprint prefix and then search for the corresponding resource.

```xml
<bean name="TestPath">
   <var name="x" type="string#path=ue"/> Check if the resource corresponding to ${x} exists
   <var name="x2" type="list,string#path=ue"/> Check each element e of x2, whether the resource corresponding to ${e} exists
</bean>
```


## index validator

For `list, Bean`, `array, Bean` types, sometimes you want to be unique according to a certain field of the Bean. The `index` checker fulfills this need.

```xml
<bean name="Foo">
   <var name="id" type="int"/>
   <var name="name" type="string"/>
</bean>

<bean name="Bar">
   <var name="foos" type="(list#index=id),Foo"/> requires the id field in the list to be unique
</bean>
```

### Special handling of index in code generation

Only the codes of a few languages such as c# are used for special processing of the index, and an additional `xxx_{index}` of map type is generated, the key is the type of the index field, and the value is the element type of the list. Roughly as follows.

```csharp
   List<Foo> Foos;
   Dictionary<int, Foo> Foos_id;
```

## range validator

Support fixed size or interval segment writing. Among them, the interval segment supports open and closed intervals, as well as half-open and half-closed intervals, examples are as follows

```xml
<bean name="TestRange">
   <var name="x0" type="int#range=10"/> x0 must be 10, but in practice no one should use this
   <var name="x1" type="int#range=[1,10]"/> x1 must be between [1,10]
   <var name="x2" type="int#range=(1,10)"/> must be between (1,10], pay attention to the left open interval, excluding 1
   <var name="x3" type="int#range=[1,10)"/> must be between [1,10), pay attention to the right-open interval, excluding 10
   <var name="x4" type="int#range=(1,10]"/>
   <var name="x5" type="int#range=[1,]"/> must be [1,infinity]
   <var name="x6" type="int#range=[,100]"/> must be between [-infinity,100]
   <var name="x7" type="int#range=(1,)"/> must be (1, infinite], not including 1
   <var name="x8" type="int#range=(,100)"/> must be (-infinity,100), not including 100
</bean>
```

## size validator

It can only be applied to containers, and is used to check whether the number of container elements meets the requirements. Because the size effector acts on the container type itself, it must be defined (container type #size=xx), element type, but not container type, element type #size=xxx, which will cause size to act on the element data and make an error!

size supports the writing method of fixed size or interval segment.

```xml
<bean name="TestSize">
   <var name="x" type="(list#size=4),int"/> requires that the number of x elements must be 4
   <var name="y" type="(map#size=[5,10]),int,int"/> requires that the number of elements of y must be 5-10
</bean>
```

## set checker

Check whether the value is in the specified collection, currently supports int, long, string, enum types, and the corresponding container types are also available, such as list, int; map, int, string.

The syntax is set=xx1{sep}xx2 ... . Where sep can be , or ;. It is recommended to use a semicolon ';', which is less prone to errors.

```xml
<bean name="TestSet">
    <var name="id" type="int"/>
    <var name="a1" type="int#(set=1,2,3)"/> It can be separated by ',', but the set definition must be surrounded by (), otherwise 'int#set=1' will be recognized as a container, resulting in a parsing error
    <var name="a2" type="long#set=2;3"/>
    <var name="a3" type="string#(set=ab,cd)"/>
    <var name="a4" type="DemoEnum#set=B;C"/>

    <var name="x1" type="list,int#set=1,2,3,4,5"/>
    <var name="x2" type="list,long#set=2,3,4,5"/>
    <var name="x3" type="list,string#set=ab,cd"/>
    <var name="x4" type="list,DemoEnum#set=A,B"/>
    <var name="x5" type="map,(int#set=1,2,3),(string#set=ab,cd)"/>
</bean>
```
