# UIF React Wrapper Tool

A CLI toolkit for working with [ui-framework-react-wrapper](https://github.com/janmoser87/ui-framework-react-wrapper) — a template that lets ServiceNow developers build UI Builder components using React. This tool handles fetching, scaffolding, developing, and deploying that template so you don't have to do it manually.

---

## Prerequisites

| Requirement | Notes |
|---|---|
| **Node.js** | v16 or higher recommended |
| **ServiceNow CLI** (`snc`) | Required for `init` and `deploy` |
| **snc `ui-component` extension** | Must be installed via `snc extension add --name ui-component` |

---

## Installation

No installation required — use `npx` to run commands on the fly:

```bash
npx ui-framework-react-wrapper-tool <command>
```

Or install globally if you prefer shorter commands:

```bash
npm install -g ui-framework-react-wrapper-tool
```

---

## Quick Start

```bash
# 1. Fetch the latest template into the current directory
npx ui-framework-react-wrapper-tool fetch

# 2. Start the local development server
npx ui-framework-react-wrapper-tool dev

# 3. Scaffold and configure the project
npx ui-framework-react-wrapper-tool configure

# 4. Clean the template repo from examples
npx ui-framework-react-wrapper-tool clean

# 5. Deploy to ServiceNow when ready
npx ui-framework-react-wrapper-tool deploy
```

> `dev`, `clean`, and `deploy` must be run from the directory where you fetched the template.
---

## Commands

### `fetch`

Downloads the latest UIF React wrapper template from GitHub into the current directory and installs npm dependencies.

```bash
npx ui-framework-react-wrapper-tool fetch
```

> If the target directory is not empty, you will be prompted to confirm before it is cleared.
---

### `dev`

Starts the local development server so you can iterate on your React component in the browser.

```bash
npx ui-framework-react-wrapper-tool dev
```

This is a thin wrapper around `npm start` inside the project directory.

---

### `configure`

Scaffolds the project by customising the template with your component's vendor prefix, label, and application scope.

```bash
npx ui-framework-react-wrapper-tool init [options]
```

**Options**

| Flag | Description |
|---|---|
| `--vendor-prefix <prefix>` | Vendor prefix for the component (e.g. `acme`) |
| `--label <label>` | Human-readable label shown in UI Builder |
| `--scope <scope>` | ServiceNow application scope (auto-generated if omitted) |

Any option that is not provided via flags will be collected interactively.

**What it does**

- Validates that `snc` and the `ui-component` extension are installed
- Generates a unique component tag in the format `x-{vendorPrefix}-{randomSuffix}`
- Updates `now-ui.json` with the new scope name, component tag, and label
- Renames source files and directories to match the new component tag
- Updates `package.json` with the component name and description
- Saves your configuration to `uif.wrapper.config.json`

---

### `clean`

Strips out all sample/demo content and leaves you with a blank slate ready for you to create something awesome 😎. Your component tag, scope, and vendor prefix are preserved — only the boilerplate content is removed.

```bash
npx ui-framework-react-wrapper-tool clean
```

**What it clears**

- `src/components/MyReactApp.js` — replaced with an empty starter component
- `src/components/` subdirectories — all child components removed
- `now-ui.json` → `actions` and `properties` — emptied
- `now-ui.json` → `description` — reset to placeholder
- `README.md` — cleared
- `AGENT.md`, `CLAUDE.md`, `GEMINI.md` — added, so you can start agentic development right away

---

### `deploy`

Deploys the component to ServiceNow using the `snc` CLI.

```bash
npx ui-framework-react-wrapper-tool deploy [--profile <profile>]
```

**Options**

| Flag | Description |
|---|---|
| `--profile <profile>` | `snc` profile to use for authentication (optional) |

This is a wrapper around `snc ui-component deploy --force`.

---

## License

ISC