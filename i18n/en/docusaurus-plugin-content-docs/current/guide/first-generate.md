---
sidebar_position: 2
---

# First generation

This page covers: without changing tables, **run generation once** with MiniTemplate to confirm the environment is correct.

## Steps

1. Open `luban_examples/MiniTemplate`.
2. Run:
   - Windows: `gen.bat`
   - macOS / Linux: `gen.sh`
3. Success when the terminal ends with something like `bye~`.
4. Check whether the script’s output directory (often `output/`) contains generated data files.

## What the script does (conceptually)

A successful generation at least includes:

| Flag | Meaning |
|------|------|
| `--conf luban.conf` | Project config |
| `-t <target>` | Export target, e.g. `client` / `server` / `all` |
| `-d <dataTarget>` | Data format, e.g. `json` / `bin` |
| `-x outputDataDir=...` | Data output directory |

If code is generated as well, you also need `-c <codeTarget>` and `outputCodeDir`.

Full flags: [Common CLI](../runtime/cli-common) and [CLI reference](../reference/cli).

## Common pitfalls

- Output directory is wiped: Luban cleans `outputCodeDir` / `outputDataDir` by default—**do not** point them at existing business source trees (e.g. the whole `Assets/Scripts`).
- Multiple `-c`/`-d` pointing at the same directory will overwrite each other; use cascading options to separate directories—see [CLI](../runtime/cli-common).

## Related links

- Previous: [Install](./install)
- Next: [Add a table and export](./add-table)
