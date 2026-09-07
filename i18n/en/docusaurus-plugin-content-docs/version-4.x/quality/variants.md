---
sidebar_position: 3
---

# Field variants

Variants solve “one logical field, multiple region/version values”: on export, only **the currently selected set** remains. Generated code still uses a single field name (e.g. `item_id`), instead of keeping `item_id_zh` / `item_id_en` columns side by side.

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

## Choosing a variant on export

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

## Choosing vs L10N text tables

| Approach | Best for |
|------|------|
| **variants** | Same field with multi-region numbers/short copy, fixed at export time |
| **text + text table** | key → multi-language long copy, replaced at runtime or generation time; see [Localization](./l10n) |

Prefer one primary approach per project to avoid maintaining both in a hard-to-sync way.

## Related links

- [L10N](./l10n)
- [CLI](../runtime/cli-common)
