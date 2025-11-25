---
title: Formats
description: Release Hub supports multiple configuration formats so you can choose the style that best fits your workflow
parent: Configuration
nav_order: 3
---

# {{ page.title }}

{{ page.description }}

Below are fully working examples for each supported format

## JSON

```json
{
  "$schema": "https://cdn.jsdelivr.net/npm/release-hub@latest/schema/release-hub.schema.json",
  "dryRun": false,
  "defaultReleaseType": "patch",
  "includePrerelease": false,
  "targets": {
    "node": true,
    "deno": true,
    "jsr": false
  },
  "sync": [["node", "deno"]],
  "hooks": {
    "before:init": "echo Starting release...",
    "after:push": ["echo Pushed!", "git status"]
  }
}
```

## TypeScript / JavaScript

### ESM

```ts
import { defineConfig } from 'release-hub/config';

export default defineConfig({
  dryRun: false,
  defaultReleaseType: 'minor',
  includePrerelease: true,
  targets: {
    node: true,
    jsr: true,
  },
  sync: [['node', 'jsr']],
  hooks: {
    'before:init': 'echo Preparing...',
    'after:commit': ['echo Commit done'],
  },
});
```

or

```ts
export default {
  dryRun: false,
  defaultReleaseType: 'minor',
  includePrerelease: true,
  targets: {
    node: true,
    jsr: true,
  },
  sync: [['node', 'jsr']],
  hooks: {
    'before:init': 'echo Preparing...',
    'after:commit': ['echo Commit done'],
  },
};
```

#### JavaScript (ESM) with Type Checking

```js
// @ts-check
/** @type {import("release-hub/config").Config} */
const config = {
  dryRun: false,
  defaultReleaseType: 'minor',
  includePrerelease: true,
  targets: {
    node: true,
    jsr: true,
  },
  sync: [['node', 'jsr']],
  hooks: {
    'before:init': 'echo Preparing...',
    'after:commit': ['echo Commit done'],
  },
};

export default config;
```

### CommonJS

```ts
const { defineConfig } = require('release-hub/config');

module.exports = defineConfig({
  dryRun: false,
  defaultReleaseType: 'minor',
  includePrerelease: true,
  targets: {
    node: true,
    jsr: true,
  },
  sync: [['node', 'jsr']],
  hooks: {
    'before:init': 'echo Preparing...',
    'after:commit': ['echo Commit done'],
  },
});
```

or

```ts
module.exports = {
  dryRun: false,
  defaultReleaseType: 'minor',
  includePrerelease: true,
  targets: {
    node: true,
    jsr: true,
  },
  sync: [['node', 'jsr']],
  hooks: {
    'before:init': 'echo Preparing...',
    'after:commit': ['echo Commit done'],
  },
};
```

#### JavaScript (CJS) with Type Checking

```js
// @ts-check
/** @type {import("release-hub/config").Config} */
module.exports = {
  dryRun: false,
  defaultReleaseType: 'minor',
  includePrerelease: true,
  targets: {
    node: true,
    jsr: true,
  },
  sync: [['node', 'jsr']],
  hooks: {
    'before:init': 'echo Preparing...',
    'after:commit': ['echo Commit done'],
  },
};
```

> TypeScript configs are compiled automatically at runtime using [Jiti](https://github.com/unjs/jiti), so you don’t need to build manually.

## package.json

You can also define a lightweight config directly inside your `package.json`

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "release-hub": {
    "defaultReleaseType": "minor",
    "targets": { "node": true },
    "hooks": {
      "after:push": "echo 'Release pushed!'"
    }
  }
}
```
