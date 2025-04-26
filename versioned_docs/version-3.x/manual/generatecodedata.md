# 代码与数据生成

## 支持主流游戏引擎及平台

  - unity
  - unreal
  - cocos2d-x
  - godot
  - egret
  - 微信小游戏平台
  - 其他家支持js的小游戏平台

## 支持主流的热方案

- HybridCLR
- {x,t,s...}lua
- ILRuntime
- puerts
- 其他


## 支持流行的游戏框架

- skynet
- ET
- GameFramework
- QFramework
- 其他

##  支持主流的游戏开发语言

  - c# (.net framework 4+. dotnet core 3+)
  - java (1.6+)
  - go (1.10+)
  - lua (5.1+)
  - typescript (3.0+)
  - python (3.0+)
  - c++ (11+)。
  - erlang (18+)。 classic 版本Luban支持，暂未迁移到当前版本。
  - rust (1.5+)。classic 版本Luban支持，暂未迁移到当前版本。
  - godot。 classic 版本Luban支持，暂未迁移到当前版本。

想自定义或者扩展支持新的语言非常容易。


## 支持的数据格式

:::tip
同一种格式，为不同语言生成的数据是完全相同的
:::


- binary 格式。 格式紧凑，加载高效，但基本不具体可读性。推荐只用于正式发布。
- bin-offset 格式。记录以bin格式导出的数据文件中每个记录的索引位置，可以用于以记录为粒度的lazy加载|
- 标准 json 格式
- **protobuf** bin和json
- flatbuffers json
- **msgpack**
- lua 
- xml 
- erlang
- yaml

### bin-offset 格式

有时候不想直接加载整个表，而是希望以记录为粒度，访问到哪个记录时再加载某个记录。bin-offset格式记录了bin格式下每个记录在
bin文件中的偏移，这样可以实现访问到某个记录时，如果未加载则直接从bin文件中读取相应偏移的数据。

bin-offset按记录顺序序列化每个record的key和offset信息。

| record_index 1 | record_index 2| ... | record_index n|

其中 record_index k的实现为序列化记录的所有key，再序列化记录的offset。

```text
buf.Write(key1);
buf.Write(key2);
...
buf.Write(Key N);
buf.WriteSize(offset);
```

直接从bin-offset的源码能理解更清楚一些。

```csharp
    // x 为 输出的bin-offset文件
    private void WriteList(DefTable table, List<Record> datas, ByteBuf x)
    {
        // buf 对应输出的bin文件
        ByteBuf buf = new ByteBuf();
        buf.WriteSize(datas.Count);
        foreach (var d in datas)
        {
            foreach (var indexInfo in table.IndexList)
            {
                DType keyData = d.Data.Fields[indexInfo.IndexFieldIdIndex];
                // 序列化记录的每个key
                keyData.Apply(BinaryDataVisitor.Ins, x);
            }
            // 序列化记录的offset
            x.WriteSize(buf.Size);
            d.Data.Apply(BinaryDataVisitor.Ins, buf);
        }
    }
```

## 不同语言支持的格式如下：

同一个语言，需要为加载不同数据格式生成不同的代码。也就是code target与data target必须匹配。

| language | binary | json | lua |
| :- | :-: | :-: | :-:|
| c# | :heavy_check_mark: | :heavy_check_mark: ||
|java| :heavy_check_mark: | :heavy_check_mark: ||
|go | :heavy_check_mark: | :heavy_check_mark: ||
|lua| :heavy_check_mark: |  | :heavy_check_mark: |
|c++| :heavy_check_mark: | ||
|go|:heavy_check_mark: | :heavy_check_mark: ||
|python| | :heavy_check_mark: ||
|typescript| :heavy_check_mark: | :heavy_check_mark: ||
|php| | :heavy_check_mark: ||
|rust|  | :heavy_check_mark: | |
|godot|  | :heavy_check_mark: | |
|protobuf|:heavy_check_mark:|:heavy_check_mark:|

## 生成

具体请见[命令行工具](./commandtools)。



