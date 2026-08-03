---
sidebar_position: 4
---

# FAQ 与排错

按症状查找。命令行参数以 [CLI](./cli) 为准（旧文若写 `export_exclude_tags`，现应为 `--excludeTag`）。

## 表与主键

**Q: 主键怎么定？**  
A: table 的 `index`。map 表常默认第一字段。

**Q: 多主键？**  
A: `list` 模式下 `a+b` 联合索引，`a,b` 独立索引。

**Q: 单例全局表？**  
A: `mode=one` / singleton，可配合纵表。

## 分组与过滤

**Q: 前后端字段不同？**  
A: groups + `##group` 或字段 group；见 [groups](../concepts/groups-targets)。

**Q: 某几行不要进包？**  
A: 记录 tag + `--excludeTag` / `--includeTag`。

## 生成失败

**Q: 一堆类型错误？**  
A: 先看报错中的表名/字段；核对 `##type` 与 Schema 是否一致。

**Q: ref 失败？**  
A: id 不存在，或写了 0 但未使用 `ref=?` 可空引用形式。

**Q: path 校验没生效？**  
A: 需 `-x pathValidator.rootDir=...`。

## 加载问题

**Q: 运行时读不到？**  
A: codeTarget 与 dataTarget 是否匹配；loader 路径是否指向生成目录。

**Q: 异步加载？**  
A: 默认不同步封装；改模板或自行异步读文件再喂给 Tables。

**Q: 想用项目里已有枚举/结构？**  
A: TypeMapper（主要 C#），见 [代码风格](../runtime/code-style)。

## 工程问题

**Q: 输出目录文件丢了？**  
A: 默认会清理 output 目录，勿指向手写代码路径。

**Q: 多语言同时生成互相覆盖？**  
A: 为每个 `-c`/`-d` 设置独立 `*.outputCodeDir` / `*.outputDataDir`。

## 相关链接

- [策划检查清单](../designer/checklist)
- [常用命令行](../runtime/cli-common)
