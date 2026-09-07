---
sidebar_position: 3
---

# Client / server field groups

In the same table, client and server can receive different columns. This is controlled by `##group` (and table-level groups set by engineering).

## How to fill

On the `##group` row, for each column:

| Cell | Meaning |
|--------|------|
| `c` | Client only |
| `s` | Server only |
| `c,s` | Both sides |
| Empty | At field level usually means **both sides** (table-level rules differ slightly—follow engineering notes) |

Example:

| ##var | id | name | icon | price | drop_weight |
|---|---|---|---|---|---|
| ##type | int | string | string | int | int |
| ##group | | c,s | c | c,s | s |
| ## | ID | Name | Icon | Price | Drop weight |
| | 1001 | Gold | icons/gold | 0 | 100 |

Intuitive export result:

| Side | Roughly includes |
|----|------------|
| Client | id, name, icon, price |
| Server | id, name, price, drop_weight |

(`icon` is `c` only; `drop_weight` is `s` only.)

## Table-level groups

Engineering may also mark a **whole table** as client-only or server-only. Then that table does not appear in the other side’s export. Follow the table notes they supply.

## How to think while filling

| Content type | Common group |
|----------|------------|
| Display name, icon, description, quality color | `c` or `c,s` |
| Drop weights, crit formula params, anti-cheat thresholds | Usually `s` |
| Ids and foreign keys used by both sides | `c,s` or empty |

Principles:

- **If unsure, ask engineering.** Do not leave everything empty for convenience, then complain about client package size or numbers being unpacked.
- Do not mark “server-only weights” as `c`.
- After changing groups, regenerate; old client data does not update by itself.

## Not the same as “do not export this row”

| Mechanism | Controls |
|------|--------|
| `##group` | **Which side** gets a **column** |
| Row-leading tag / `##` comment row | Whether a **row** is exported (see engineering docs on tags; or treat the whole row as a comment) |

## Related links

- [Header meanings](./headers)
- [Checklist](./checklist)
- [For engineers: groups and targets](../concepts/groups-targets)
