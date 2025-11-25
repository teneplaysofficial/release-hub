---
title: Targets
description: Select which manifest files Release Hub updates
parent: Reference
---

# {{ page.title }}

{{ page.description }}.

Targets control which manifest files Release Hub updates during a release.

Available targets include:

- `node` - updates `package.json`
- `deno` - updates `deno.json`
- `jsr` - updates `jsr.json`
- `webext` - updates `manifest.json` (browser extensions)

You can view their default values in the [Default Settings](../default.md).

## Customizing Manifest Paths

If your files aren’t in the standard locations, use `targetsPath` to override the defaults.

This lets you point each target to any file path you want.

Example:

```json
{
  "targetsPath": {
    "node": "./apps/api/package.json",
    "deno": "./configs/deno/deno.json"
  }
}
```
