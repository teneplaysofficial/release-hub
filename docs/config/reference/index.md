---
title: Reference
description: All configuration options available in Release Hub
parent: Configuration
---

# {{ page.title }}

{{ page.description }}.

{{ site.title }} supports configuration through `JSON`, `JavaScript`, `TypeScript`, and `package.json`. To see the defaults applied when no config is provided, check the [Default Settings](../default.md).

## Available Options

| Option               | Description                                  |
| -------------------- | -------------------------------------------- |
| `$schema`            | Enables JSON Schema autocomplete in IDEs     |
| `dryRun`             | Runs all steps without making changes        |
| `defaultReleaseType` | Sets the default version bump type           |
| `targets`            | Selects which manifest files to update       |
| `targetsPath`        | Custom paths for manifest files              |
| `sync`               | Controls version synchronization behavior    |
| `hooks`              | Commands that run before/after release steps |
