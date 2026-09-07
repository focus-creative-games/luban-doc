---
sidebar_position: 3
---

# 管线概览

Luban 默认管线（DefaultPipeline）可以理解为：

```text
LoadSchema → Compile(DefAssembly) → (可选) LoadDatas + Validate
        → CodeTargets / DataTargets → PostProcess → Save
```

## 各阶段做什么

| 阶段 | 作用 |
|------|------|
| Schema 收集 | 按 `luban.conf` 读 XML/Excel 等，得到原始定义 |
| 编译 | 解析类型字符串、继承、表模式，得到可导出的类型图 |
| 加载数据 | 按表的 input 读 Excel/JSON/… |
| 校验 | ref / range / path 等 |
| 生成代码 | 各 `-c` CodeTarget（如 cs-bin） |
| 生成数据 | 各 `-d` DataTarget（如 json） |
| 保存 | 默认写本地目录；可清理输出目录 |

扩展时，上述环节大多对应可替换的插件点，见 [扩展概览](../extend/overview)。

## 和心智模型的对应

| 心智模型 | 管线 |
|----------|------|
| Schema | LoadSchema + Compile |
| Data | LoadDatas + Validate |
| Generate | Code/Data Targets |
| Runtime | 你的游戏代码加载生成物（不在管线内） |

## 设计要点（程序向）

- **类型系统是核心**：先有完备类型，再谈多数据源与多导出格式。
- **Schema 与 Data 分离**：Excel 是数据（及可选的 schema 视图），不是唯一真相源。
- **二次开发**：优先加插件，而不是改核心特例。

更完整的设计叙述见历史文档中的「设计哲学」思路；上手阶段不必先读完。

## 相关链接

- [心智模型](../mental-model)
- [扩展 Luban](../extend/overview)
