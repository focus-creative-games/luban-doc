# 介绍

![icon](/img/logo.png)

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/focus-creative-games/luban.svg?style=flat-square&branch=main)](https://travis-ci.com/focus-creative-games/luban)  ![Docker Auto](https://img.shields.io/docker/cloud/automated/hugebug4ever/luban.svg?style=flat-square) ![Docker Build](https://img.shields.io/docker/cloud/build/hugebug4ever/luban.svg?style=flat-square) ![star](https://img.shields.io/github/stars/focus-creative-games/luban?style=flat-square)


luban是你的**最佳游戏配置解决方案**。luban高效地处理游戏开发中常见的excel、json、xml之类的数据，检查数据错误，生成c#等各种语言的代码，导出成bytes或json等多种格式。
luban统一了游戏配置开发工作流，极大提升了策划和程序的工作效率。

## 核心特性

- 强大的数据解析和转换能力 {excel(csv,xls,xlsx)、json、bson、xml、yaml、lua、unity ScriptableObject} => {binary、json、bson、xml、lua、yaml、erlang、 custom format}
- 增强的excel格式，可以简洁地配置出像简单列表、子结构、结构列表，以及任意复杂的深层次的嵌套结构。
- 完备的类型系统，**支持OOP类型继承**，搭配excel、json、lua、xml等格式数据**灵活优雅**表达行为树、技能、剧情、副本之类复杂GamePlay数据
- 支持生成c#、java、go、c++、lua、python、javascript、typescript、erlang、rust、gdscript、dart 代码
- 支持生成 protobuf(schema + binary + json)、flatbuffers(schema + json)、msgpack(binary)
- 强大的数据校验能力。ref引用检查、path资源路径、range范围检查等等
- 完善的本地化支持。静态文本值本地化、动态文本值本地化、时间本地化、main-patch多地区版本
- 强大灵活的自定义能力，支持自定义代码模板和数据模板
- **通用型生成和缓存工具**。也可以用于生成协议、数据库之类的代码，甚至可以用作对象缓存服务
- **良好支持主流引擎、全平台、主流热更新方案、主流前后端框架**。支持Unity、Unreal、Cocos2x、Godot、微信小游戏等主流引擎。工具自身跨平台，能在Win,Linux,Mac平台良好工作。

完整特性请参见 [feature](../manual/traits)


## license

Luban is licensed under the [MIT](https://github.com/focus-creative-games/luban/blob/main/LICENSE) license
