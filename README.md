<div align="center">

# Release Hub

_One hub to manage every release_

</div>

[![CI](https://github.com/teneplaysofficial/release-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/teneplaysofficial/release-hub)

## Overview

`release-hub` is a smart, unified release management CLI that keeps your versions consistent across ecosystems.

It supports:

- **`package.json`** → npm, Node.js
- **`deno.json` / `deno.jsonc`** → Deno
- **`jsr.json`** → JSR ecosystem

With a single command, you can:

- Bump versions across all files
- Generate changelogs from conventional commits
- Sync metadata automatically
- Integrate into CI/CD (GitHub Actions, etc.)

## Features

- **Multi-format support:** Works with `package.json`, `deno.json`, `jsr.json`, and more
- **Semantic versioning:** `major`, `minor`, `patch`, or auto via commits
- **Auto-sync:** Keeps all manifest versions in sync
- **Custom release hooks:** Run scripts before/after bumps
- **Conventional Commit aware:** Generate changelogs automatically
- **CI-friendly:** Ideal for GitHub Actions, GitLab, or local workflows

## Documentation

For full documentation, visit [teneplaysofficial.github.io](https://teneplaysofficial.github.io/release-hub)

## Install

### Global Install

Install `release-hub` globally to use it anywhere:

```sh
npm install -g release-hub
```

Then run:

```sh
release-hub
```

### Local (Dev Dependency)

You can install `release-hub` locally as a dev dependency:

```sh
npm i -D release-hub
```

Add a convenient script to your `package.json`:

```json
{
  "scripts": {
    "release": "release-hub"
  }
}
```

Run the release command:

```sh
npm run release
```

### Using npx (No Install Needed)

Run directly without installing:

```sh
npx release-hub
```

## License

This project is licensed under the [Apache-2.0 License](./LICENSE)
