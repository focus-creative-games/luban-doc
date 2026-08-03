---
sidebar_position: 2
---

# Header meanings and common mistakes

## Header rows at a glance

| What you see | Meaning | Can you change it? |
|----------|------|----------|
| `##` / `##var` | Field name row | Column names are usually set by engineering; ask them to add columns |
| `##type` | Type row | **Do not** change to Chinese or “looks right” words |
| `##group` | Export group | Fill `c` / `s` per project rules; ask engineering if unsure |
| `##` / `##comment` | Comment row | Chinese/English notes OK; the whole row is not exported |
| Data rows | Content that ships | Your main work area |

A small complete example:

| ##var | id | name | on_sale | #internal |
|---|---|---|---|---|
| ##type | int | string | bool | |
| ##group | | c,s | c | |
| ## | Item ID | Name | On sale | Not shipped |
| | 1001 | Gold | 是 | Anything |
| ## | 1002 | Draft | 否 | This whole row is not exported |

## Comment columns vs comment rows

| Form | How to recognize | Result |
|------|----------|------|
| Comment column | Field name empty, or starts with `#` (e.g. `#note`) | Filled values still do not go into the game |
| Comment row | The row’s **first cell** starts with `##` | Whole row ignored |

## How to fill common types

| Written in ##type | What you can fill | Notes |
|---------------|----------|------|
| int / float | Numbers; most can leave empty as 0 | Do not write “one hundred” |
| bool | `是`/`否`, `true`/`false`, `0`/`1` | |
| string | Any text; empty cell is usually empty string | For a true empty string you may need `""` per engineering notes |
| Enum name (e.g. Quality) | English enum name, Chinese alias, or number | Aliases follow what engineering provides, e.g. `白` |
| datetime | Date and time | Usually **do not leave empty** |
| Type with `?` (e.g. `int?`) | Leave empty or fill `null` for “none” | Not the same as filling `0` |

Enum example:

| ##var | id | quality |
|---|---|---|
| ##type | int | Quality |
| | 1 | WHITE |
| | 2 | 白 |
| | 3 | 1 |

## Common mistakes

| Symptom | Likely cause | What to do |
|------|----------|--------|
| Whole table not exported | Sheet top-left is not `##`; or table not registered | Check A1; ask if it is in `__tables__` |
| Client missing a column | `##group` set to `s` only | Change to `c` or `c,s` / leave empty (per project rules) |
| Type error | Text in an int; wrong enum name | Match `##type` and the enum name list |
| Ref / id error | Item id (etc.) does not exist | Confirm the id exists in the target table first |
| Notes appear in game | Field name has no `#`, treated as a real column | Rename note column to `#xxx` or leave name empty |
| Row never takes effect | First cell is a `##` comment row | Remove the leading `##` |

## Related links

- [Groups](./groups)
- [Complex structures](./complex)
- [For engineers: Excel basics](../excel/basics) (full rules)
