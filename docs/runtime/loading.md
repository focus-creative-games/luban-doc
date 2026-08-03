---
sidebar_position: 3
---

# 运行时加载与最佳实践

## 推荐写法

```csharp
// JSON
var tables = new cfg.Tables(LoadJson);
Item item = tables.TbItem.Get(1001);

// 访问列表
foreach (var x in tables.TbItem.DataList) { ... }
```

- **一个 `Tables` 实例**持有全部表。
- 通过构造函数注入 loader，便于测试与热更（重建实例即可）。
- 避免为每张表生成/手写全局静态入口。

## loader 约定

生成的 `Tables` 构造函数接受 `Func<string, T>`：参数为逻辑文件名，返回 JSON 节点或 `ByteBuf`。

Unity 包：`com.code-philosophy.luban`。其它语言从 [luban_examples](https://github.com/focus-creative-games/luban_examples) 拷贝 Runtime。

## 引用解析

若使用了 `ref` 校验并生成了 `Xxx_Ref` 字段，加载后 `Tables` 会做 `ResolveRef`，把 id 换成对象引用（视生成目标而定）。

## 异步与平台

- 默认模板偏同步。
- Android StreamingAssets 等需先读入内存。
- 异步加载：改 Scriban 模板或在外层封装。

## 相关链接

- [快速上手：加载](../guide/load-runtime)
- [代码风格](./code-style)
