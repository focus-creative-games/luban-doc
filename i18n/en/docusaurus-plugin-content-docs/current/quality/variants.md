---
sidebar_position: 3
---

# Variants

Variants **fix one edition at export time**; generated code and public names stay the same. Luban supports two layers:

| Layer | Problem | After export |
|------|----------|--------|
| **Field variants** | One field, multiple region/version values | Still one field name (e.g. `item_id`) |
| **Table variants** (since **v5.1.0**) | Same table name, multiple definitions (different input / even different value type) | Still one table (e.g. `TbItem`) |

Both share the `--variant` CLI option and `--variant default=...`.

---

# Field variants

One logical field, multiple value sets: on export, only **the currently selected set** remains, instead of keeping `item_id_zh` / `item_id_en` columns side by side.

## Why not split into multiple columns?

Naive approach:

| ##var | id | item_id | item_id_zh | item_id_en |
|---|---|---|---|---|
| ##type | int | int | int | int |
| | 1 | 1001 | 2001 | 3001 |

Problems: every end carries unused columns; code must pick which column to read. After variant export, only one `item_id` remains.

## Declaring in Schema

**XML:**

```xml
<bean name="TestVariant">
  <var name="id" type="int"/>
  <var name="value" type="int" variants="zh,en,fr"/>
</bean>
```

**`__beans__.xlsx`:** fill the variants column on the field row (e.g. `zh,en,fr`), following your template.

## How to write Excel headers

Add a column per variant: `{fieldName}@{variantName}`.

Rules:

1. Variant columns must come **after** the original field column (`value@en` to the right of `value`).
2. Variant columns do **not** need their own `##type` / `##group`; they inherit from the original field.

| ##var | id | value | value@zh | value@en |
|---|---|---|---|---|
| ##type | int | int | | |
| ##group | | c,s | | |
| | 1 | 1001 | 2001 | 3001 |
| | 2 | 1002 | | 3002 |

Reading: the original `value` column is the default/fallback; `value@zh` and `value@en` override per variant.

## Other data sources

| Format | Example |
|------|------|
| json | `"value@en": 1001` |
| yaml | `value@en: 1001` |
| lua | `["value@en"] = 1001` |
| xml | `<value variant="en">1001</value>` |

## Field variants: choosing on export

```bash
# Per field: variantKey = {Bean full name}.{field name}
--variant test.TestVariant.value=en

# Global default variant (used by fields not specified individually)
--variant default=zh
```

| Situation | Behavior |
|------|------|
| `en` is selected and `value@en` exists | Use the variant column |
| `en` is selected but `value@en` is missing | **Fall back** to the original field `value` |
| variants are defined but CLI has no `--variant` | Use the original field and emit a **warning** log |
| Both variant and original field are missing | Error |

You may pass multiple `--variant` options for different fields.

---

# Table variants

:::info Version requirement
Table variants are supported since **v5.1.0**. Earlier releases only have field variants.
:::

You may declare multiple definitions for the same table name; each belongs to one (or several) variants. One generation keeps only one definition. `FullName`, generated type names, `ref=TbItem`, and output file names never carry suffixes like `@zh`.

Table variants are **whole-definition replacement** (swap input; you may also swap value / mode, etc.). They are not field-style “extra columns with fallback”, and they do not merge records.

## Declaring in Schema

Use the singular attribute **`variant`** (which variants this table belongs to), distinct from field `variants` (allowed list).

**XML:**

```xml
<!-- No variant: fallback / default table -->
<table name="TbItem" value="Item" input="item.xlsx"/>

<!-- Per-variant input; value type may differ -->
<table name="TbItem" variant="zh" value="Item" input="item_zh.xlsx"/>
<table name="TbItem" variant="en" value="ItemEn" input="item_en.xlsx"/>

<!-- One definition shared by multiple variants -->
<table name="TbGlobal" variant="zh,en" value="Global" input="global.xlsx"/>
```

**`__tables__.xlsx`:** add a `variant` column; empty cell means fallback. Older sheets without that column still load (treated as no variants).

| full_name | variant | value_type | input |
|-----------|---------|------------|-------|
| TbItem | | Item | item.xlsx |
| TbItem | zh | Item | item_zh.xlsx |
| TbItem | en | ItemEn | item_en.xlsx |
| TbGlobal | zh,en | Global | global.xlsx |

## Table variants: choosing on export

Same `--variant` map as field variants; `default` is shared:

```bash
# By full name (preferred) or short name
--variant cfg.TbItem=zh
--variant TbItem=zh

# Global default: applies to both fields and tables
--variant default=zh

# Global en, one table overridden to zh
--variant default=en --variant TbItem=zh
```

Lookup order per logical table:

1. `--variant {FullName}=x`
2. `--variant {Name}=x`
3. `--variant default=x`
4. none → unset

**Ordinary tables** (no tagged `variant` definitions under that full name) skip variant logic and ignore `default`.

| Situation | Behavior |
|------|------|
| `zh` is selected and a definition with `variant=zh` (or `zh,en`) exists | Use that definition |
| Selected variant misses, but a fallback (no `variant`) exists | Use fallback and emit a **warning** |
| No `--variant`, but fallback exists | Use fallback and emit a **warning** |
| Selected variant misses and no fallback | **Error** |
| No `--variant` and no fallback (all tagged) | **Error** |
| Duplicate variant or two fallbacks under the same full name | **Error** |

## Structure constraints

- **Must match:** table name and namespace (grouping key)
- **May differ:** `input`, `value`, `mode`, `index`, `group`, `tags`, `comment`, `output`, `readSchemaFromFile`

When packaging per variant, generated code may follow the selected table definition (e.g. `en` uses another Bean).

---

# Field vs table variants

| Dimension | Field variants | Table variants |
|------|----------|--------|
| Declaration | One field: `variants="zh,en"` | Multiple same-name tables, each with `variant="zh"` |
| Data shape | Extra columns / keys; miss → original field | Each table has its own input (and value); whole replace |
| CLI key | `{Bean full name}.{field}` | `{Table full name}`, then short name |
| Unset | Original column + warning | Fallback table + warning; error if none |

---

# Choosing vs L10N text tables

| Approach | Best for |
|------|------|
| **Field variants** | Same field with multi-region numbers/short copy, fixed at export |
| **Table variants** | Whole table swaps data source or schema by region/channel |
| **text + text table** | key → multi-language long copy, replaced at runtime or generation; see [Localization](./l10n) |

Prefer one primary approach per project to avoid maintaining multiple hard-to-sync systems.

## Related links

- [L10N](./l10n)
- [CLI](../runtime/cli-common)
