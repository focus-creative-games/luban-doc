---
sidebar_position: 3
---

# 插件项目结构

## 推荐步骤

1. 新建 classlib 项目，名称建议包含 `Luban`。
2. 引用 `Luban.Core`（以及需要的 Builtin）。
3. 在主 Luban 工程中 ProjectReference 你的插件，保证输出目录能扫到 dll。
4. 复制/参考现有模块的 `AssemblyInfo` 注册方式（`RegisterBehaviour`）。
5. 实现接口并打上对应 Attribute（如 `[CodeTarget("my-lang")]`）。

## 嵌入式使用

```text
引用 Core → SimpleLauncher.Start → 创建 Pipeline → Run
```

适用于把 Luban 嵌进编辑器或自建 CI 工具。

## 相关链接

- [扩展概览](./overview)
- 源码示例：仓库内 `Luban.CSharp`、`Luban.DataValidator.Builtin` 等
