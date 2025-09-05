# DEVELOPER.md

This document provides detailed instructions for developers who want to set up, develop, test, and build the `@interactive-video-labs/angular` project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Scripts](#development-scripts)
  - [Install Dependencies](#install-dependencies)
  - [Build Project](#build-project)
  - [Run Development Server](#run-development-server)
  - [Run Tests](#run-tests)
  - [Clean Project](#clean-project)
- [Linting and Formatting](#linting-and-formatting)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher. You can download it from [nodejs.org](https://nodejs.org/).
- **pnpm**: Our preferred package manager. If you don't have it, install it globally:
  ```bash
  npm install -g pnpm
  ```
  Alternatively, you can use `npm` or `yarn`, but `pnpm` is recommended for consistent dependency management.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/interactive-video-labs/interactive-video-angular-wrapper.git
    cd interactive-video-angular-wrapper
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    This will install all project dependencies, including development and peer dependencies.

## Project Structure

- `src/`: Contains the source code for the Angular wrapper component.
  - `index.ts`: The main entry point for the library, exporting `InteractiveVideoComponent` and related types.
- `test/`: Contains unit tests for the components.
  - `interactive-video.test.ts`: Tests for the `InteractiveVideoComponent`.
- `dist/`: (Generated after build) Contains the compiled output of the library (ESM, CJS, and declaration files).
- `examples/`: Contains example usage of the Angular wrapper.
- `tsup.config.ts`: Configuration for `tsup`, used to bundle the TypeScript library.
- `vitest.config.ts`: Configuration for `Vitest`, our testing framework.

## Development Scripts

Here are the commonly used scripts for development:

### Install Dependencies

```bash
pnpm install
```

Installs all project dependencies. Run this after cloning the repository or pulling new changes.

### Build Project

```bash
pnpm build
```

Compiles the TypeScript source code into JavaScript (ESM and CJS formats) and generates declaration files (`.d.ts`) in the `dist/` directory. This command is run automatically before publishing.

### Run Development Server

```bash
pnpm dev
```

Starts the `tsup` build in watch mode. This is useful during development as it automatically recompiles the library whenever source files change.

### Run Tests

```bash
pnpm test
```

Executes all unit tests using `Vitest`. Ensure all tests pass before submitting a pull request.

### Clean Project

```bash
pnpm clean
```

Removes the `dist/` directory, effectively cleaning up all compiled output.

## Linting and Formatting

(Note: Currently, there are no explicit linting or formatting scripts configured in `package.json`. Please adhere to the existing code style and best practices observed in the codebase.)

## Troubleshooting

- **`pnpm install` fails**: Ensure you have Node.js and pnpm installed correctly. Check your internet connection.
- **Build errors**: Verify that all dependencies are installed (`pnpm install`) and that your TypeScript code has no compilation errors.
- **Tests failing**: Run `pnpm test` to see detailed error messages. Ensure your changes haven't introduced regressions.
- **Peer dependency issues**: If you encounter issues related to `@angular/core` or `@angular/common`, ensure that the versions installed in your consuming application match the peer dependency ranges specified in `package.json` (`^15.0.0 || ^16.0.0 || ^17.0.0`).
