---
title: Hooks
---

# Hooks

Hooks let you run your own **custom shell commands** **before** or **after** key stages of the tool’s lifecycle - such as initialization, versioning, committing, tagging, pushing, or publishing.

They’re perfect for automating tasks like linting, testing, cleanup, or sending notifications.

## Defining Hooks

Hooks are configured inside your project’s **configuration file**.  
See the [Configuration Guide](./config.md) for full details.

### Basic Example

```json
{
  "hooks": {
    "before:init": "echo '🔧 Starting initialization...'",
    "after:init": "echo '✅ Initialization complete!'"
  }
}
```

When you run the corresponding command, your hooks will automatically execute in the right phase.

## Supported Hooks

You can hook into almost every major lifecycle event:

| Hook                 | Description                                     |
| -------------------- | ----------------------------------------------- |
| `before:init`        | Before initialization.                          |
| `after:init`         | After initialization completes.                 |
| `before:version`     | Before version bumping or changelog generation. |
| `after:version`      | After version bumping is complete.              |
| `before:commit`      | Before creating a commit.                       |
| `after:commit`       | After a commit is created.                      |
| `before:tag`         | Before creating a Git tag.                      |
| `after:tag`          | After a Git tag is created.                     |
| `before:push`        | Before pushing to the remote repository.        |
| `after:push`         | After push completes.                           |
| `before:release`     | Before performing the release process.          |
| `after:release`      | After release finishes.                         |
| `before:publish`     | Before any publishing begins.                   |
| `after:publish`      | After publishing completes.                     |
| `before:publish:npm` | Before publishing to npm.                       |
| `after:publish:npm`  | After npm publish completes.                    |
| `before:publish:jsr` | Before publishing to JSR.                       |
| `after:publish:jsr`  | After JSR publish completes.                    |

## Multiple Commands per Hook

You can define **multiple commands** for a single hook using an array.
They’ll run sequentially, in the order they appear.

```json
{
  "hooks": {
    "before:commit": ["npm run lint", "npm test"],
    "after:commit": "echo '✅ Commit finished'"
  }
}
```

## How Hooks Work

- Hooks are executed as **shell commands**.
- You can use anything that runs in your terminal - `npm run`, bash commands, Node scripts, etc.
- During a `--dry-run`, hooks are **listed but not executed**.
- Works in both **local environments** and **CI/CD pipelines**.
- Supports **async shell execution**, so you can safely chain multiple async operations.

> 💡 Hooks are completely optional - only define the ones that fit your workflow.

## Examples

### Run checks before committing

```json
{
  "hooks": {
    "before:commit": ["npm run lint", "npm test"]
  }
}
```

### Auto-tag and notify after release

```json
{
  "hooks": {
    "after:release": [
      "git tag -a v$(node -p \"require('./package.json').version\") -m 'Release tag'",
      "curl -X POST https://hooks.slack.com/... -d '{\"text\":\"🎉 New release deployed!\"}'"
    ]
  }
}
```

### Handle multiple publish targets

```json
{
  "hooks": {
    "before:publish:npm": "echo '📦 Publishing to npm...'",
    "after:publish:npm": "echo '✅ npm publish complete'",
    "before:publish:jsr": "echo '🚀 Publishing to JSR...'",
    "after:publish:jsr": "echo '✅ JSR publish complete'"
  }
}
```

### Push changes and notify after release

```json
{
  "hooks": {
    "after:release": [
      "git push origin main --tags",
      "echo '📤 Release pushed!'",
      "curl -X POST https://hooks.slack.com/... -d '{\"text\": \"🎉 New release deployed!\"}'"
    ]
  }
}
```

### Cleanup temporary files after release

```json
{
  "hooks": {
    "after:release": ["rm -rf dist/temp", "echo '🧹 Cleaned up build artifacts'"]
  }
}
```
