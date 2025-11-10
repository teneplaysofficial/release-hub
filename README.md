<div align="center">

# 🚀 Release Hub

### _One hub to manage every release_

[![CI](https://github.com/teneplaysofficial/release-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/teneplaysofficial/release-hub)
[![Docs](https://img.shields.io/badge/Docs-available-brightgreen?logo=readthedocs)](https://teneplaysofficial.github.io/release-hub)
[![Version](https://img.shields.io/github/v/release/teneplaysofficial/release-hub?include_prereleases&sort=semver&color=brightgreen&logo=semver)](https://github.com/teneplaysofficial/release-hub/releases)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/release-hub?color=brightgreen&logo=jsdelivr&label=jsDelivr)](https://www.jsdelivr.com/package/npm/release-hub)

</div>

## 📦 Overview
**Release Hub** is your unified toolkit for automating and managing project releases — from versioning to changelogs, CI publishing, and beyond.  
Built to simplify the release process, it integrates seamlessly with modern workflows.

## 💡 Why Release Hub?

Unlike traditional release tools, **Release Hub** is built to be both **developer-friendly** and **CI-smart**, offering a perfect balance between automation and control.

### 🧭 Key Advantages

- **Unified workflow** – Manage versioning, changelogs, and publishing from one CLI  
- **Zero-config start** – Works out of the box, yet fully configurable when needed  
- **Modern design** – Built with TypeScript, Zod, and JSON Schema for strong validation  
- **Better DX** – Interactive prompts, colored logs, and intuitive command structure  
- **Schema-powered configs** – Instant IntelliSense in VS Code, WebStorm, and more  
- **Seamless CI/CD** – Deep integration with GitHub Actions and npm publishing  
- **Extensible** – Designed with hooks and plugin-friendly architecture  

### ⚖️ Compared to Other Tools

| Feature | Release Hub | release-it | semantic-release |
|----------|--------------|-------------|------------------|
| Interactive CLI | ✅ Yes | ⚙️ Partial | ❌ No |
| JSON Schema config | ✅ Full | ❌ No | ❌ No |
| Intelligent changelog | ✅ Structured | ⚙️ Basic | ✅ Auto |
| GitHub Action integration | ✅ Native | ⚙️ Manual | ✅ Native |
| Manual + CI release support | ✅ Both | ✅ Both | ❌ CI-only |
| Extensible hooks | ✅ Yes | ✅ Yes | ⚙️ Limited |
| Simplicity | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

**In short:** Release Hub gives you **automation when you want it** and **control when you need it** — no overkill, no boilerplate.


## ✨ Features
- 🔧 **Automated versioning** – consistent semantic releases with minimal setup  
- 🧩 **Schema-based config** – full JSON Schema support for IDE IntelliSense  
- 📜 **Smart changelogs** – generate structured changelogs from commits  
- 🚀 **GitHub Actions ready** – integrates easily into CI/CD pipelines  
- 💬 **Interactive mode** – guide-driven release flow for manual runs  

## 📖 Documentation
Comprehensive docs are available at:  
👉 [**teneplaysofficial.github.io/release-hub**](https://teneplaysofficial.github.io/release-hub)

## 🧠 Example Usage

```bash
# Run an interactive release
npx release-hub
```

🧩 Configuration

Release Hub uses a release-hub.config.json (or .js, .ts, .jsonc) file.

```json
{
  "$schema": "https://teneplaysofficial.github.io/release-hub/schema/release-hub.schema.json",
  "version": true,
  "changelog": true,
  "publish": {
    "npm": true,
    "github": true
  }
}
```

🧰 Integration with CI

In your GitHub Actions workflow:

- uses: actions/checkout@v4
  with:
    fetch-depth: 0 # fetch full history for changelogs
- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: yarn
- run: npx release-hub publish

💚 Contributing

Contributions, ideas, and feedback are always welcome!
Please check out the contributing guide before submitting a PR.

📜 License

Licensed under the MIT License.

<div align="center">🛠️ Built with passion by @teneplaysofficial
Made for developers who love clean releases.

</div>
