---
sidebar_position: 3
---

# 变体（variants）

变体在**导出时定死一版**，生成代码与对外名字不变。Luban 支持两层：

| 层级 | 解决什么 | 导出后 |
|------|----------|--------|
| **字段变体** | 同一字段、多套地区/版本取值 | 仍是一个字段名（如 `item_id`） |
| **表变体**（自 **v5.1.0**） | 同名表、多套定义（不同 input / 甚至不同 value） | 仍是一张表（如 `TbItem`） |

两者共用命令行 `--variant`，并共享 `--variant default=...`。

---

# 字段变体

同一逻辑字段、多套取值：导出时只留下**当前选用的那一套**，而不是 `item_id_zh` / `item_id_en` 多列并存。

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

## 字段变体：导出时选哪个

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

---

# 表变体

:::info 版本要求
表变体自 **v5.1.0** 起支持。更早版本仅有字段变体。
:::

同名 table 可以声明多份定义，每份属于一个（或一组）variant。一次生成只留下一张；`FullName`、生成类名、`ref=TbItem`、输出文件名都不带 `@zh` 之类后缀。

表变体是**整表定义替换**（换 input，也可以换 value / mode 等），不是字段那种「同行多列、缺列回退」，也不做记录级 merge。

## 在 Schema 里声明

属性名用单数 **`variant`**（这张表属于哪些变体），与字段的 `variants`（允许列表）区分。

**XML：**

```xml
<!-- 无 variant：fallback / 默认表 -->
<table name="TbItem" value="Item" input="item.xlsx"/>

<!-- 各变体自己的 input；也可以换 value type -->
<table name="TbItem" variant="zh" value="Item" input="item_zh.xlsx"/>
<table name="TbItem" variant="en" value="ItemEn" input="item_en.xlsx"/>

<!-- 一张定义同时服务多个变体 -->
<table name="TbGlobal" variant="zh,en" value="Global" input="global.xlsx"/>
```

**`__tables__.xlsx`：** 增加 `variant` 列；空单元格表示 fallback。没有该列的旧表仍可加载（视为无变体）。

| full_name | variant | value_type | input |
|-----------|---------|------------|-------|
| TbItem | | Item | item.xlsx |
| TbItem | zh | Item | item_zh.xlsx |
| TbItem | en | ItemEn | item_en.xlsx |
| TbGlobal | zh,en | Global | global.xlsx |

## 表变体：导出时选哪个

与字段变体共用 `--variant`，共享 `default`：

```bash
# 按表全名（优先）或短名
--variant cfg.TbItem=zh
--variant TbItem=zh

# 全局默认：字段和表一起生效
--variant default=zh

# 全局 en，某一张表单独 zh
--variant default=en --variant TbItem=zh
```

每张逻辑表的查找顺序：

1. `--variant {FullName}=x`
2. `--variant {Name}=x`
3. `--variant default=x`
4. 都没有 → 未指定

**普通表**（该全名下没有任何带 `variant` 的定义）不走变体逻辑，不受 `default` 影响。

| 情况 | 行为 |
|------|------|
| 指定了 `zh`，且存在 `variant=zh`（或 `zh,en`）的定义 | 选用该定义 |
| 指定了变体但未命中，**有**无 `variant` 的 fallback | 用 fallback，打**警告** |
| 未传 `--variant`，**有** fallback | 用 fallback，打**警告** |
| 指定了变体但未命中，且无 fallback | **报错** |
| 未传 `--variant`，且无 fallback（全是 tagged） | **报错** |
| 同一全名下同一 variant 重复，或两张 fallback | **报错** |

## 结构约束

- **必须相同：** 表名、命名空间（分组键）
- **允许不同：** `input`、`value`、`mode`、`index`、`group`、`tags`、`comment`、`output`、`readSchemaFromFile`

按变体出包时，生成代码可以随当前选中的表定义变化（例如 `en` 用了另一个 Bean）。

---

# 字段变体 vs 表变体

| 维度 | 字段变体 | 表变体 |
|------|----------|--------|
| 声明 | 一个 field 上 `variants="zh,en"` | 多张同名 table，各写 `variant="zh"` |
| 数据形态 | 同行多列 / 多 key，缺则回退原字段 | 各表自带 input（与 value），整表替换 |
| CLI key | `{Bean全名}.{字段名}` | `{Table全名}`，其次短名 |
| 未指定 | 用原列 + 警告 | 用 fallback 表 + 警告；没有则报错 |

---

# 与 L10N 文本表怎么选

| 方案 | 适合 |
|------|------|
| **字段 variants** | 同一字段多地区数值/短文案，导出时定死一版 |
| **表 variants** | 整张表按地区/渠道换数据源或换表结构 |
| **text + 文本表** | key→多语言长文案，运行时或生成期替换，见 [本地化](./l10n) |

同一项目尽量选定主方案，避免多套混用到难以维护。

## 相关链接

- [L10N](./l10n)
- [CLI](../runtime/cli-common)
