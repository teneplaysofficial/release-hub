---
title: Sync
description: Configure how version numbers stay aligned across enabled targets
parent: Reference
---

# {{ page.title }}

{{ page.description }}.

## Sync Modes

| Value               | Meaning                                           |
| ------------------- | ------------------------------------------------- |
| `true`              | Sync all enabled targets (default)                |
| `false`             | No syncing — each target increments independently |
| `[["node", "jsr"]]` | Sync only specific groups of targets              |

## Examples

```json
{
  "sync": true
}
```

```json
{
  "sync": false
}
```

```json
{
  "sync": [
    ["node", "jsr"],
    ["deno", "webext"]
  ]
}
```
