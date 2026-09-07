---
sidebar_position: 3
---

# Runtime loading and best practices

## Recommended pattern

```csharp
// JSON
var tables = new cfg.Tables(LoadJson);
Item item = tables.TbItem.Get(1001);

// Iterate list
foreach (var x in tables.TbItem.DataList) { ... }
```

- **One `Tables` instance** holds all tables.
- Inject the loader via the constructor for easier testing and hot reload (just recreate the instance).
- Avoid generating or hand-writing a global static entry per table.

## Loader contract

The generated `Tables` constructor takes `Func<string, T>`: the argument is the logical file name, and the return value is a JSON node or `ByteBuf`.

Unity package: `com.code-philosophy.luban`. For other languages, copy Runtime from [luban_examples](https://github.com/focus-creative-games/luban_examples).

## Reference resolution

If you use `ref` validation and generated `Xxx_Ref` fields, `Tables` will call `ResolveRef` after loading to replace ids with object references (depending on the generation target).

## Async and platforms

- Default templates lean toward synchronous loading.
- Platforms such as Android StreamingAssets need data read into memory first.
- For async loading: customize the Scriban templates or wrap loading at a higher layer.

## Related links

- [Quick start: loading](../guide/load-runtime)
- [Code style](./code-style)
