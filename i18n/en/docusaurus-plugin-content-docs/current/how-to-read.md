---
sidebar_position: 3
---

# How to read the docs

Pick one path by role—you do not need to read top to bottom.

## Programmer path (recommended)

1. [Mental model](./mental-model) — build the four-step picture
2. [Quick start](./guide/install) — get generation and loading working in about 30 minutes
3. [Glossary](./concepts/glossary) + [luban.conf](./concepts/luban-conf) — share the same vocabulary
4. Go deeper as needed:
   - How to fill tables → [Excel basics](./excel/basics)
   - How to define structure → [Excel Schema](./schema/excel-schema)
   - Commands and targets → [Common CLI](./runtime/cli-common)
   - Validation / multi-target / localization → [Quality and release](./quality/validators)
5. Extending Luban → [Extend Luban](./extend/overview)
6. Look up parameters → [Reference](./reference/cli)

## Designer path

1. [Minimum concepts you need](./designer/concepts)
2. [Header meanings](./designer/headers)
3. [Client/server groups](./designer/groups)
4. [How to fill complex structures](./designer/complex)
5. [Collaboration checklist](./designer/checklist)

When you hit programmer-facing terms, open the [Glossary](./concepts/glossary)—you do not need to read the pipeline chapters first.

## Page writing conventions

Each main article aims for the same structure:

1. One-sentence conclusion  
2. Minimal example  
3. Rules (itemized)  
4. Common pitfalls  
5. Related links  

**Reference** chapters are for lookup, not storytelling; concepts and getting-started chapters explain the “why.”

## Version notes

- The site’s default docs are **Luban 5.x (current)**.
- **4.x / 3.x / 1.x** in the top version dropdown are historical docs for older projects.
- Relative to 4.x: CLI renames `--validationFailAsError` to `--strict` and adds `--locale`.
