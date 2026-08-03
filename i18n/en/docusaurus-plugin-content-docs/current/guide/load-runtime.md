---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Load at runtime

This page covers: reading config with generated code. The recommended shape is **one `Tables` object**.

## Unity + JSON (most common)

1. In Unity Package Manager, install the Runtime package `com.code-philosophy.luban` (Add package from git URL):
   - GitHub: `https://github.com/focus-creative-games/luban_unity.git`
   - Gitee: `https://gitee.com/focus-creative-games/luban_unity.git`
2. Generate matching code/data (for Unity development, `cs-simple-json` + `json` is common). Place a script next to your config project like the following (adjust paths for your repo):

<Tabs groupId="os">
  <TabItem value="windows" label="Windows (bat)" default>

```bat title="gen_client_json.bat"
set WORKSPACE=..\..
set LUBAN_DLL=%WORKSPACE%\Tools\Luban\Luban.dll
set CONF_ROOT=%WORKSPACE%\DataTables

dotnet %LUBAN_DLL% ^
    --conf %CONF_ROOT%\luban.conf ^
    -t client ^
    -c cs-simple-json ^
    -d json ^
    -x outputCodeDir=Assets/Gen ^
    -x outputDataDir=Assets/StreamingAssets/json
```

  </TabItem>
  <TabItem value="unix" label="macOS / Linux (sh)">

```bash title="gen_client_json.sh"
#!/bin/bash
WORKSPACE=../..
LUBAN_DLL=$WORKSPACE/Tools/Luban/Luban.dll
CONF_ROOT=$WORKSPACE/DataTables

dotnet $LUBAN_DLL \
    --conf $CONF_ROOT/luban.conf \
    -t client \
    -c cs-simple-json \
    -d json \
    -x outputCodeDir=Assets/Gen \
    -x outputDataDir=Assets/StreamingAssets/json
```

  </TabItem>
</Tabs>

A complete runnable example: [luban_examples/Projects/Csharp_Unity_json/gen.bat](https://github.com/focus-creative-games/luban_examples/blob/main/Projects/Csharp_Unity_json/gen.bat).

3. Load:

```csharp
var tables = new cfg.Tables(file =>
    JSON.Parse(File.ReadAllText($"{jsonDir}/{file}.json")));

var reward = tables.TbReward.Get(1001);
Debug.Log(reward.Name);
```

`cfg` / `Tables` / table names follow your `luban.conf` `topModule`, `manager`, and table definitions.

## Key points

| Point | Notes |
|----|------|
| Entry | `new Tables(loader)`—not a global static per table |
| loader | Given a file name, return that table’s JSON (or bin `ByteBuf`) |
| Access | `tables.TbXxx.Get(key)` or indexer (depends on generated code) |
| Naming | Excel field `item_id` often becomes `ItemId` in C# (adjustable via codeStyle) |

Other language samples: [luban_examples/Projects](https://github.com/focus-creative-games/luban_examples). For non-Unity, copy the matching Runtime from the examples.

## Dev JSON / release binary

The same loading code can distinguish JSON vs bin by what the loader returns (generation targets must match, e.g. `cs-bin` + `bin`). Details: [Runtime loading](../runtime/loading).

## Common pitfalls

- codeTarget and dataTarget mismatch (e.g. code reads bin but data is json).
- On Android and similar platforms, reading StreamingAssets paths directly may fail—read into memory first, then hand to the loader.
- Default generated code tends to be synchronous; async needs template changes or your own wrapper.

## Related links

- Next: [Where to go next](./next-steps)
- [Generation targets overview](../runtime/targets)
