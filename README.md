<div align="center">

# Release Hub

_One hub to manage every release_

</div>

[![CI](https://github.com/teneplaysofficial/release-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/teneplaysofficial/release-hub)
[![Docs](https://img.shields.io/badge/Docs-available-brightgreen?logo=readthedocs)](https://teneplaysofficial.github.io/release-hub)
[![release-hub version](https://img.shields.io/github/v/release/teneplaysofficial/release-hub?include_prereleases&sort=semver&color=brightgreen&logo=semver&label=Version)](https://github.com/teneplaysofficial/release-hub/releases)
[![jsDelivr hits](https://img.shields.io/jsdelivr/npm/hm/release-hub?color=brightgreen&logo=jsdelivr&label=jsDelivr)](https://www.jsdelivr.com/package/npm/release-hub)
[![Docker Pulls](https://img.shields.io/docker/pulls/tenedev/release-hub?logo=docker&color=brightgreen)](https://hub.docker.com/r/tenedev/release-hub)
[![License](https://img.shields.io/github/license/teneplaysofficial/release-hub?color=brightgreen&logo=spdx&label=LICENSE)](https://github.com/teneplaysofficial/release-hub/blob/main/LICENSE)

## Overview

**Release Hub** is a unified command-line toolkit for automating and managing project releases.
It provides a consistent, cross-ecosystem workflow for versioning, changelog generation, metadata synchronization, and release automation, all through a single streamlined interface. Designed to be both developer-friendly and CI-ready, Release Hub brings clarity and reliability to release workflows without locking you into any specific platform or ecosystem.

### Why Release Hub?

Most release tools are fragmented or tied to a single platform. Release Hub offers a unified, extensible approach that balances automation with manual control while remaining simple and predictable in both local development and CI environments.

## Features

- Automated semantic versioning with minimal setup
- Interactive mode for manual release workflows
- Multi-format manifest support
- Automatic version synchronization across all project files
- Custom release hooks for before/after bumps scripts
- Conventional Commit based changelog generation
- Fully CI-friendly for GitHub Actions, GitLab CI, and others

## Documentation

Full documentation is available at [teneplaysofficial.github.io](https://teneplaysofficial.github.io/release-hub)

## Installation & Usage

### Global Installation

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

### Docker

- Run `release-hub` using Docker - no Node.js, npm, or global installs required.
- This is the recommended way to use Release Hub in CI pipelines or clean environments.

#### Pull the Image

```sh
docker pull tenedev/release-hub:latest
```

#### Basic Usage

Run `release-hub` in the current project directory:

```sh
docker run --rm -it \
 -v "$(pwd):/workspace" \
 -w /workspace \
 tenedev/release-hub:latest
```

**What these flags mean:**

- `--rm` - Automatically removes the container after it exits.
- `-it` - Enables interactive mode (useful for prompts and CLI output).
- `-v "$(pwd):/workspace"` - Mounts your current project into the container.
- `-w /workspace` - Sets the working directory inside the container.

#### Running Commands & Flags

You can pass any `release-hub` command or flag directly:

```sh
docker run --rm -it \
 -v "$(pwd):/workspace" \
 -w /workspace \
 tenedev/release-hub:latest <command> [flags]
```

**Example:**

```sh
docker run --rm -it \
 -v "$(pwd):/workspace" \
 -w /workspace \
 tenedev/release-hub:latest -h
```

#### CI-Friendly Usage (Non-Interactive)

For CI environments (GitHub Actions, GitLab CI, etc.), omit `-it`:

```sh
docker run --rm \
 -v "$PWD:/workspace" \
 -w /workspace \
 tenedev/release-hub:latest ci
```

> [!TIP]
> When mounting your project directory into the container, `release-hub` will update files on your host system.
> 
> Use `:ro` for dry runs.
> 
> ```sh
> docker run --rm \
>  -v "$PWD:/workspace:ro" \
>  -w /workspace \
>  tenedev/release-hub:latest ci
> ```

#### Using Versioned Tags (Recommended for CI)

For reproducible builds, pin a specific version:

```sh
docker run --rm -it \
 -v "$(pwd):/workspace" \
 -w /workspace \
 tenedev/release-hub:1.0.0
```

> [!NOTE]
> `latest` always tracks the newest stable release.
> Pin versions in CI for safety.

## License

This project is licensed under the [Apache-2.0 License](./LICENSE)
