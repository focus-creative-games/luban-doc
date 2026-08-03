---
sidebar_position: 2
---

# Custom templates

Code generation uses **Scriban** templates (`.sbn`) by default.

## Search order

1. Directory specified by `--customTemplateDir`  
2. `Templates/` inside the release package (or under each language project)

To override a language, copy the corresponding `bean.sbn` / `table.sbn` / `tables.sbn` and edit them.

## Common template variables (summary)

| Variable | Meaning |
|------|------|
| `__ctx` | Generation context |
| `__name` / `__namespace` | Name and namespace |
| `__top_module` | target.topModule |
| `__code_style` | Naming style |
| `__bean` / `__table` / `__enum` | Current type |
| `__tables` | Table collection (when generating Tables) |

## Related links

- [Plugin projects](./plugins)
- [Code style](../runtime/code-style)
