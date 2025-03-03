# Code and Data Generation

## Support mainstream game engines and platforms

  - unity
  - unreal
  - cocos2d-x
  - godot
  - egret
  - WeChat Mini Game Platform
  - Other small game platforms that support js

## Support mainstream thermal solutions

- HybridCLR
- {x,t,s...}lua
- ILRuntime
- puerts
- other

## Support for popular game frameworks

- skynet
- ET
- GameFramework
- QFramework
- other

## Support mainstream game development languages

- c# (.net framework 4+. dotnet core 3+)
- java (1.6+)
- go (1.10+)
- lua (5.1+)
- typescript (3.0+)
- python (3.0+)
- c++ (11+)。
- erlang (18+). The classic version is supported by Luban and has not been migrated to the current version yet.
- rust (1.5+). The classic version is supported by Luban and has not been migrated to the current version yet.
- godot. The classic version is supported by Luban and has not been migrated to the current version yet.
- php
- dart

It is very easy to customize or extend support for new languages.

## Supported Data Formats

:::tip
In the same format, the data generated for different languages is exactly the same
:::


- binary format. The format is compact and efficient to load, but basically unreadable. Recommended for official releases only.
- bin-offset format. Record the index position of each record in the data file exported in bin format, which can be used for lazy loading with record granularity|
- standard json format
- **protobuf** bin and json
- flatbuffers json
- **msgpack**
- -lua
- -xml
- -erlang
- -yaml

### bin-offset format

Sometimes you don't want to load the entire table directly, but you want to use the record as the granularity, and then load a certain record when you access the record. The bin-offset format records the offset of each record in the bin file in the bin format, so that when a record is accessed, if it is not loaded, the data at the corresponding offset is directly read from the bin file.

bin-offset serializes the key and offset information of each record in record order.

| record_index 1 | record_index 2| ... | record_index n|

The implementation of record_index k is to serialize all the keys of the record, and then serialize the offset of the record.

```text
buf. Write(key1);
buf. Write(key2);
...
buf. Write(Key N);
buf. WriteSize(offset);
```

It can be understood more clearly directly from the source code of bin-offset.

```csharp
     // x is the output bin-offset file
     private void WriteList(DefTable table, List<Record> datas, ByteBuf x)
     {
         // buf corresponds to the output bin file
         ByteBuf buf = new ByteBuf();
         buf. WriteSize(datas. Count);
         foreach (var d in datas)
         {
             foreach (var indexInfo in table. IndexList)
             {
                 DType keyData = d.Data.Fields[indexInfo.IndexFieldIdIndex];
                 // Serialize each key of the record
                 keyData.Apply(BinaryDataVisitor.Ins, x);
             }
             // The offset of the serialized record
             x. WriteSize(buf. Size);
             d.Data.Apply(BinaryDataVisitor.Ins, buf);
         }
     }
```

## The formats supported by different languages are as follows:

In the same language, different codes need to be generated for loading different data formats. That is, the code target and data target must match.

| language   |       binary       |        json        |        lua         |
| :--------- | :----------------: | :----------------: | :----------------: |
| c#         | :heavy_check_mark: | :heavy_check_mark: |                    |
| java       | :heavy_check_mark: | :heavy_check_mark: |                    |
| go         | :heavy_check_mark: | :heavy_check_mark: |                    |
| lua        | :heavy_check_mark: |                    | :heavy_check_mark: |
| c++        | :heavy_check_mark: |                    |                    |
| go         | :heavy_check_mark: | :heavy_check_mark: |                    |
| python     |                    | :heavy_check_mark: |                    |
| typescript | :heavy_check_mark: | :heavy_check_mark: |                    |
|php| | :heavy_check_mark: ||
| rust       |                    | :heavy_check_mark: |                    |
| godot      |                    | :heavy_check_mark: |                    |
| dart     |                    | :heavy_check_mark: |                    |
| protobuf   | :heavy_check_mark: | :heavy_check_mark: |                    |

## generate

For details, see [Command-line Tools](./commandtools).

