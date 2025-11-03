---
title: Configuration
---

# Release Hub Configuration

Release Hub is fully configurable through a single file, letting you control every part of your release workflow - from version bumps to pre/post-release scripts.

This file lets you control how releases work - what files get updated, whether it runs in dry-run mode, how versions sync, and what scripts should run before or after release steps.

## Where to put your configuration

You can define your configuration in **any of these files** in your project root:

| File name                      | Format           | Description                                                               |
| ------------------------------ | ---------------- | ------------------------------------------------------------------------- |
| `.release-hub.json`            | JSON             | Plain JSON configuration                                                  |
| `.release-hub.config.json`     | JSON             | JSON configuration using the common `.release-hub.config.json` convention |
| `release-hub.json`             | JSON             | Alternative JSON filename                                                 |
| `release-hub.config.json`      | JSON             | JSON configuration using `release-hub.config.json` pattern                |
| `.release-hub.js`              | JavaScript       | CommonJS or ESM module                                                    |
| `.release-hub.cjs`             | CommonJS         | For Node.js projects using CommonJS                                       |
| `.release-hub.mjs`             | ESM              | For projects using ECMAScript modules                                     |
| `.release-hub.ts`              | TypeScript       | Type-safe config file (auto-compiled)                                     |
| `.release-hub.cts`             | TypeScript (CJS) | CommonJS-compatible TypeScript file                                       |
| `.release-hub.mts`             | TypeScript (ESM) | ESM-compatible TypeScript file                                            |
| `release-hub.config.js`        | JavaScript       | Common convention for tool configs                                        |
| `release-hub.config.cjs`       | CommonJS         | CommonJS-compatible config file                                           |
| `release-hub.config.mjs`       | ESM              | ESM-compatible config file                                                |
| `release-hub.config.ts`        | TypeScript       | Type-safe TypeScript config                                               |
| `release-hub.config.cts`       | TypeScript (CJS) | CommonJS TypeScript file                                                  |
| `release-hub.config.mts`       | TypeScript (ESM) | ESM TypeScript file                                                       |
| `package.json` → `release-hub` | JSON             | Define config directly inside package.json                                |

> It’s recommended to use `.release-hub.json` for simplicity and editor schema support.

## Example configurations

### JSON

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

### TypeScript / JavaScript

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

> TypeScript configs are compiled automatically at runtime using [Jiti](https://github.com/unjs/jiti), so you don’t need to build manually.

### Inside `package.json`

You can also define a lightweight config directly inside your `package.json`:

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

## Available Options

Below are all available configuration options that you can define.

| Option               | Type                            | Default          | Description                                             |
| -------------------- | ------------------------------- | ---------------- | ------------------------------------------------------- |
| `$schema`            | `string`                        | -                | Path to JSON schema for IDE autocompletion.             |
| `dryRun`             | `boolean`                       | `false`          | Run all actions in simulation mode (no actual changes). |
| `defaultReleaseType` | `'major' \| 'minor' \| 'patch'` | `'patch'`        | Default version bump type.                              |
| `includePrerelease`  | `boolean`                       | `false`          | Include prerelease versions when resolving versions.    |
| `targets`            | `object`                        | `{ node: true }` | Choose which manifests to update.                       |
| `sync`               | `boolean \| string[]`           | `true`           | Control version synchronization between targets.        |
| `hooks`              | `object`                        | -                | Define shell commands to run before or after key steps. |

### Targets

The `targets` section controls which files release-hub updates when you bump versions.

| Target | Default | Description                                |
| ------ | ------- | ------------------------------------------ |
| `node` | `true`  | Update `package.json` (Node.js).           |
| `deno` | `false` | Update `deno.json` or `deno.jsonc` (Deno). |
| `jsr`  | `false` | Update `jsr.json` (JSR registry).          |

**Example:**

```json
{
  "targets": {
    "node": true,
    "deno": true,
    "jsr": false
  }
}
```

### Sync

The `sync` field controls whether version numbers stay consistent across multiple targets.

- `true` → Sync all enabled targets
- `false` → Do not sync anything
- `[["node", "jsr"]]` → Sync only selected targets

**Example:**

```json
{
  "sync": [["node", "jsr"]]
}
```

### Hooks

Hooks let you run custom shell commands before or after release steps.

| Lifecycle            | Runs when                                       |
| -------------------- | ----------------------------------------------- |
| `before:init`        | Right before the release process starts         |
| `after:init`         | Immediately after initialization completes      |
| `before:version`     | Just before the version is updated              |
| `after:version`      | After the version number has been updated       |
| `before:commit`      | Before committing version or changelog changes  |
| `after:commit`       | After the version commit is created             |
| `before:tag`         | Before creating the Git tag                     |
| `after:tag`          | After the Git tag has been created              |
| `before:push`        | Right before pushing commits and tags to remote |
| `after:push`         | After all commits and tags have been pushed     |
| `before:publish:npm` | Before publishing to **NPM** registry           |
| `after:publish:npm`  | After publishing to **NPM** registry            |
| `before:publish:jsr` | Before publishing to **JSR** registry           |
| `after:publish:jsr`  | After publishing to **JSR** registry            |

**Example:**

```json
{
  "hooks": {
    "before:init": "echo Preparing release...",
    "after:commit": ["echo Commit done", "git log -1"],
    "before:publish:npm": "npm run build"
  }
}
```

You can specify a single string or an array of commands.
Each command runs in your project’s root directory.

> TIP
>
> If you use VSCode or another IDE, include the `$schema` field for autocomplete:
>
> ```json
> {
>   "$schema": "https://cdn.jsdelivr.net/npm/release-hub@latest/schema/release-hub.schema.json"
> }
> ```
