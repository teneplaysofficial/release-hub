---
title: Hooks
description: Run custom commands before or after release lifecycle steps
parent: Reference
---

# {{ page.title }}

- Hooks let you attach custom shell commands to specific points in the release process.
- Use them to automate tasks like linting, testing, building, tagging, cleanup, or sending notifications.
- All hooks are defined inside your {{ site.title }} configuration file.

## Available Hooks

You can hook into almost every major lifecycle stage:

| Hook                 | Description                                    |
| -------------------- | ---------------------------------------------- |
| `before:init`        | Before initialization                          |
| `after:init`         | After initialization completes                 |
| `before:version`     | Before version bumping or changelog generation |
| `after:version`      | After version bumping                          |
| `before:commit`      | Before creating a commit                       |
| `after:commit`       | After a commit is created                      |
| `before:tag`         | Before creating a Git tag                      |
| `after:tag`          | After a Git tag is created                     |
| `before:push`        | Before pushing to the remote repository        |
| `after:push`         | After push completes                           |
| `before:publish`     | Before any publishing begins                   |
| `after:publish`      | After publishing completes                     |
| `before:publish:npm` | Before publishing to npm                       |
| `after:publish:npm`  | After npm publish completes                    |
| `before:publish:jsr` | Before publishing to JSR                       |
| `after:publish:jsr`  | After JSR publish completes                    |

## How {{ page.title }} Work

- {{ page.title }} run as **shell commands**.
- Any command works: bash, Node scripts, npm scripts, git commands, etc.
- During `--dry-run`, {{ page.title }} are **printed but not executed**.
- {{ page.title }} run in both local and CI environments.
- Arrays allow multiple commands, executed in order.

## Examples

```json
{
  "hooks": {
    "before:init": "echo '🔧 Starting initialization...'",
    "after:init": "echo '✅ Initialization complete!'"
  }
}
```

Multiple commands:

```json
{
  "hooks": {
    "before:commit": ["npm run lint", "npm test"],
    "after:commit": "echo '✅ Commit finished'"
  }
}
```
