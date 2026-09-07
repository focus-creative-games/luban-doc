---
sidebar_position: 1
---

# Extension points overview

Luban works via plugin-style extension points. For customization, prefer **adding an extension assembly** over patching Core.

## Extension map

| Extension point | Role |
|--------|------|
| Pipeline | The full generation pipeline |
| SchemaCollector / SchemaLoader | How schema is collected and parsed |
| DataLoader | New data source formats |
| DataValidator | New validation rules |
| CodeTarget | New language / code-style output |
| DataTarget | New data formats |
| CodeStyle | Naming styles |
| PostProcess | Post-generation processing |
| OutputSaver | Where output is written |
| TextProvider | Localization text sources |

At startup, `Luban*.dll` assemblies with registration markers are scanned (see SimpleLauncher in the source).

## Embedded invocation

You can also reference Luban.Core from your own tools, construct a Pipeline, and run it without going through the CLI.

## Related links

- [Custom templates](./templates)
- [Plugin projects](./plugins)
- [Pipeline overview](../concepts/pipeline)
