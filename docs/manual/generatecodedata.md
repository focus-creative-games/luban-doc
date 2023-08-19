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
  - c++ (11+)。 classic 版本Luban支持，暂未迁移到当前版本。
  - erlang (18+)。 classic 版本Luban支持，暂未迁移到当前版本。
  - rust (1.5+)。classic 版本Luban支持，暂未迁移到当前版本。
  - godot。 classic 版本Luban支持，暂未迁移到当前版本。

想自定义或者扩展支持新的语言非常容易。


## 支持的数据格式

:::tip
同一种格式，为不同语言生成的数据是完全相同的
:::


- binary 格式。 格式紧凑，加载高效，但基本不具体可读性。推荐只用于正式发布。
- 标准 json 格式
- **protobuf** bin和json
- flatbuffers json
- **msgpack**
- lua 
- xml 
- erlang
- yaml



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
|python| :heavy_check_mark: | :heavy_check_mark: ||
|typescript| :heavy_check_mark: | :heavy_check_mark: ||
|rust|  | :heavy_check_mark: | |
|godot|  | :heavy_check_mark: | |
|protobuf|:heavy_check_mark:|:heavy_check_mark:|

## 生成

具体请见[命令行工具](./commandtools)。



