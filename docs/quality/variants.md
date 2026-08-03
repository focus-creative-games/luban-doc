---
sidebar_position: 3
---

# 字段变体（variants）

变体解决「同一逻辑字段、多套地区/版本取值」：导出时只留下**当前选用的那一套**，生成代码里仍是同一个字段名（如 `item_id`），而不是 `item_id_zh` / `item_id_en` 多列并存。

## 为什么不用多列硬拆？

粗糙写法：

| ##var | id | item_id | item_id_zh | item_id_en |
|---|---|---|---|---|
| ##type | int | int | int | int |
| | 1 | 1001 | 2001 | 3001 |

问题：每端都带着用不到的列；程序还要自己选读哪一列。变体导出后只剩一个 `item_id`。

## 在 Schema 里声明

**XML：**

```xml
<bean name="TestVariant">
  <var name="id" type="int"/>
  <var name="value" type="int" variants="zh,en,fr"/>
</bean>
```

**`__beans__.xlsx`：** 在字段行填写 variants 列（如 `zh,en,fr`），以你模板为准。

## Excel 表头怎么写

为每个变体加列：`{字段名}@{变体名}`。

规则：

1. 变体列必须写在**原字段列之后**（`value@en` 在 `value` 右边）。
2. 变体列**不用**再写 `##type` / `##group`，继承原字段。

| ##var | id | value | value@zh | value@en |
|---|---|---|---|---|
| ##type | int | int | | |
| ##group | | c,s | | |
| | 1 | 1001 | 2001 | 3001 |
| | 2 | 1002 | | 3002 |

读法：原列 `value` 是默认/回退值；`value@zh`、`value@en` 为各变体覆盖。

## 其它数据源

| 格式 | 示例 |
|------|------|
| json | `"value@en": 1001` |
| yaml | `value@en: 1001` |
| lua | `["value@en"] = 1001` |
| xml | `<value variant="en">1001</value>` |

## 导出时选哪个变体

```bash
# 指定某字段：variantKey = {Bean全名}.{字段名}
--variant test.TestVariant.value=en

# 全局默认变体（未单独指定的字段用它）
--variant default=zh
```

| 情况 | 行为 |
|------|------|
| 指定了 `en`，且有 `value@en` | 用变体列 |
| 指定了 `en`，但无 `value@en` | **回退**到原字段 `value` |
| 定义了 variants，但命令行未 `--variant` | 用原字段，并打**警告**日志 |
| 变体与原字段都缺失 | 报错 |

可对多个字段分别写多个 `--variant`。

## 与 L10N 文本表怎么选

| 方案 | 适合 |
|------|------|
| **variants** | 同一字段多地区数值/短文案，导出时定死一版 |
| **text + 文本表** | key→多语言长文案，运行时或生成期替换，见 [本地化](./l10n) |

同一项目尽量选定主方案，避免两套混用到难以维护。

## 相关链接

- [L10N](./l10n)
- [CLI](../runtime/cli-common)
