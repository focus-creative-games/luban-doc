---
sidebar_position: 2
---

# Tag filtering

Tags apply to **records (rows)** and are used to export subsets: test data, rows visible only on a given branch, temporary drafts, and so on. This is a different dimension from field/table **group** (structural trimming).

## How to mark tags

| Data source | Syntax |
|--------|------|
| Excel | Fill the tag in the **first column** of the data row (the first column of the header area is often empty or a comment) |
| json | `"__tag__": "dev"` |
| lua | `__tag__ = "dev"` |
| xml | `<__tag__>dev</__tag__>` |
| yaml | `__tag__: dev` |

### Excel example

| ##var | id | name |
|---|---|---|
| ##type | int | string |
| ## | Item ID | Name |
| | 1 | Gold |
| ## | 2 | Draft row |
| test | 3 | Test only |
| DEV | 4 | Dev build |
| | 5 | Shipping item |

| Row | First column | Effect |
|----|--------|------|
| id=1, 5 | empty | Usually always exported (in exclude mode) |
| id=2 | `##` | **Never exported** (special tag) |
| id=3 | `test` | Removed when `--excludeTag test` |
| id=4 | `DEV` | Tag names match case as written |

### json example

```json
{
  "__tag__": "dev",
  "id": 3,
  "name": "Test only"
}
```

## Special tags

| tag | Meaning |
|-----|------|
| `##` | Permanent comment; excluded from every export |
| `unchecked` | Validators skip this record (use sparingly) |

A row may have a business tag; `##` is related to “comment rows whose first column starts with `##`” in the header rules—see [Excel basics](../excel/basics).

## CLI filtering

```bash
# Exclude: rows tagged test are not exported (untagged rows are usually still exported)
-e test
# or
--excludeTag test

# Include only: only rows whose tag is empty or ship (mutually exclusive with exclude)
-i ship
# or
--includeTag ship
```

| Mode | Typical use |
|------|----------|
| `--excludeTag test` | Strip test rows from release builds |
| `--includeTag ship` | Whitelist: export only rows with the given mark |

`--includeTag` and `--excludeTag` **cannot be used together**.

## Difference from group

| | group | tag |
|--|-------|-----|
| Applies to | Tables / fields (whether a column goes to a given end) | Records (whether a row is exported) |
| Config location | schema / `##group` | First column of data rows / `__tag__` |
| CLI | `-t client` and similar to select target | `-e` / `-i` |

They can be combined: trim fields by target first, then trim rows by tag.

## Practical tips

- Use a consistent tag for test-only rows: `test` / `dev`, and add `-e test` in CI release generation.
- Mark permanently retired rows with first-column `##`; do not rely on “deleting numbers and pretending they are gone.”
- Use `unchecked` only for transitional dirty data—not as a long-term convention.

## Related links

- [groups and targets](../concepts/groups-targets)
- [Validators](./validators)
- [Common CLI](../runtime/cli-common)
