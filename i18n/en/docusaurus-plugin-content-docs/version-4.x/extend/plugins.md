---
sidebar_position: 3
---

# Plugin project structure

## Recommended steps

1. Create a classlib project; the name should preferably include `Luban`.
2. Reference `Luban.Core` (and Builtin packages as needed).
3. Add a ProjectReference from the main Luban project to your plugin so the output directory can find the dll.
4. Copy/follow existing modules’ `AssemblyInfo` registration pattern (`RegisterBehaviour`).
5. Implement the interfaces and apply the matching Attribute (e.g. `[CodeTarget("my-lang")]`).

## Embedded use

```text
Reference Core → SimpleLauncher.Start → Create Pipeline → Run
```

Useful for embedding Luban in an editor or a custom CI tool.

## Related links

- [Extension overview](./overview)
- Source examples: `Luban.CSharp`, `Luban.DataValidator.Builtin`, and similar in the repo
