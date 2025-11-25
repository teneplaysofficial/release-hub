---
title: Default Settings
description: A complete reference of Release Hub’s built-in settings and how they apply without a user-defined config file
parent: Configuration
nav_order: 1
---

# {{ page.title }}

{{ page.description }}.

```json
{
  "dryRun": false,
  "defaultReleaseType": "patch",
  "targets": {
    "node": true,
    "jsr": false,
    "deno": false,
    "webext": false
  },
  "targetsPath": {
    "node": "./package.json",
    "jsr": "./jsr.json",
    "deno": "./deno.json",
    "webext": "./manifest.json"
  },
  "sync": true
}
```
