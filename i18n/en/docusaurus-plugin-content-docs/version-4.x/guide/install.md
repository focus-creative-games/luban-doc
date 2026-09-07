---
sidebar_position: 1
---

# Install and get the tool

This page covers: preparing the Luban executable and finding the official example project.

## Environment

1. Install [.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0) or newer.
2. Clone or download the example project [luban_examples](https://github.com/focus-creative-games/luban_examples) (a Gitee mirror is fine too).

The rest of the quick start assumes **MiniTemplate** inside `luban_examples` as the starting point.

## Get Luban

Pick one:

| Method | Notes |
|------|------|
| Release | Download a published package from [GitHub Releases](https://github.com/focus-creative-games/luban/releases) |
| Bundled with examples | `luban_examples/Tools/Luban` (**may not be the latest**) |
| Build yourself | Clone [luban](https://github.com/focus-creative-games/luban) and build per the repository instructions |

Typical invocation:

```bash
dotnet <path_to_Luban.dll> --conf ... -t ... -c ... -d ...
```

On Windows, example scripts are usually `gen.bat` with `LUBAN_DLL` already set.

## What a minimal project looks like

Typical MiniTemplate layout:

```text
MiniTemplate/
  luban.conf          # global config: groups / targets / schemaFiles / dataDir
  Defines/            # optional XML schema (e.g. builtin.xml)
  Datas/              # data and Excel schema (__tables__ / __beans__ / __enums__)
  gen.bat / gen.sh    # generation scripts
  output/             # generation output (as set by the script)
```

## Common pitfalls

- **Tools/Luban is outdated**: if generation behavior does not match the docs, switch to the latest Release first.
- **SDK too old**: need 8.0+.
- **Path has spaces or LUBAN_DLL was not updated**: after copying a template, check the dll path in `gen.bat`.

## Related links

- Next: [First generation](./first-generate)
- [luban.conf explained](../concepts/luban-conf)
