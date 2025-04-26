# 扩展Luban实现

在权衡灵活性和简便性后，luban没有使用插件机制，而是在源码工程中新增一些扩展项目来实现扩展。

## 创建扩展模块

源码中除了`Luban.Core`和`Luban`以外的项目都是扩展项目，开发者可以参考它们给Luban添加扩展模块。
SimpleLauncher会自动搜索模块名中包含Luban的模块，因此**扩展模块名中最好都包含Luban**，否则需要
自己使用`SimpleLauncher.ScanResigerAssembly`注册自定义的扩展类。


以创建Luban.Demo模块为例，创建扩展模块的步骤如下：

- 创建项目 Luban.Demo
- 在Luban项目中引用Luban.Demo项目
- Luban.Demo项目中新增对Luban.Core的引用
- 从Luban.CSharp项目中复制AssemblyInfo.cs到本目录


## 可扩展的部分

- Pipeline
- Schema Collector
- Data Loader
- CodeTarget
- DataTarget
- DataValidator
- CodeStyle
- PostProcessor
- OutputSaver
- TextProvider

## 将Luban嵌入到其他C#工程中

有时候需要在其他工具中嵌入Luban，而不是直接使用Luban命令行工具。嵌入操作如下：

- 引用Luban.Core项目，强烈建议也引入那几个Luban.XXX.Builtin项目，因为它们包含了Luban所需要的核心默认实现
- 使用SimpleLauncher类初始化环境
- 使用DefaultPipeline或者自定义Pipeline运行生成管线