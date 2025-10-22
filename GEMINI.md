# Project: TIC-80 Website

## Project Overview

This project is the official website for TIC-80, a free and open-source fantasy computer. It serves as a central hub for the TIC-80 community, providing access to games, development tools, learning resources, and community features. The website showcases user-created games, offers an embedded web player, and facilitates game sharing and discovery.

The core of the website is a **React** application written in **TypeScript**, utilizing **Vite** for its build process. The TIC-80 emulator's core functionality is integrated via WebAssembly (`tic80.wasm`) and JavaScript (`tic80.js`) files located in the `public` directory.

The application fetches game, user, and category data from JSON files (`games.json`, `users.json`, `cats.json`, `texts.json`) which are likely generated and updated by Go scripts.

## Technology Stack

*   **Frontend Framework:** React 19 with TypeScript
*   **Build Tool:** Vite
*   **Styling:** Bootstrap 5 with custom CSS
*   **Routing:** React Router DOM v6
*   **State Management:** React Context API (`DataContext`)
*   **Code Quality:** ESLint with TypeScript, React Hooks, and React Refresh plugins
*   **Backend/Scripts:** Go (for data processing, hashing, and synchronization)
*   **Deployment:** GitHub Pages with automated CI/CD via GitHub Actions

## Building and Running

The project uses `npm` for package management and `vite` for development and building.

*   **Install Dependencies:**
    ```bash
    npm install
    ```
*   **Start Development Server:**
    ```bash
    npm run dev
    ```
    This will typically start the application at `http://localhost:5173`.
*   **Build for Production:**
    ```bash
    npm run build
    ```
    This command compiles the TypeScript code and builds the project for production, outputting to the `dist` directory.
*   **Linting:**
    ```bash
    npm run lint
    ```
    This command runs ESLint to check for code quality and style issues.

### Go Scripts

The `scripts/` directory contains several Go programs that are crucial for data processing and synchronization:

*   `sync.go`: Fetches game and user data from the TIC-80 API, processes avatars, and updates local JSON data files (`games.json`, `users.json`, `texts.json`). It also downloads game carts into `public/dev/` directories.
*   `calc-hashes.go`: (Inferred from `deploy.yml`) Likely calculates hashes for various build artifacts.
*   `gen-tree.go`: (Inferred from `deploy.yml`) Likely generates a tree structure of the game files.
*   `generate-version.go`: (Inferred from `deploy.yml`) Generates `version.json` with current version information.
*   `xplode.go`: (Inferred from `deploy.yml`) Likely processes or "explodes" game cartridges.

These Go scripts are primarily executed as part of the GitHub Actions workflow.

## Development Conventions

*   **Code Style:** Enforced by ESLint, configured in `eslint.config.js`. It uses recommended configurations for JavaScript, TypeScript, React Hooks, and Vite.
*   **Project Structure:** Follows a standard React application structure with clear separation of concerns (components, contexts, data, hooks, pages, styles, types, utils).
*   **Data Management:** Global application data (games, users, categories) is managed using React's Context API via `src/contexts/DataContext.tsx`.
*   **Routing:** Handled by React Router DOM, with lazy loading for pages to improve performance.
*   **Legacy URL Handling:** The `App.tsx` component includes logic to handle redirects from older URL formats (`?cart=<game_id>`, `?id=<user_id>`) to the new routing structure.
*   **Static Assets:** Static files, including the TIC-80 WebAssembly and JavaScript, are served from the `public/` directory. The `public/dev/` directory is used to store downloaded game cartridges, organized by user.

## Deployment

The project is deployed to GitHub Pages using GitHub Actions. The `.github/workflows/deploy.yml` workflow automates the entire process, including:

1.  Building the TIC-80 core (using `tic-80` repository as a submodule).
2.  Building the web application.
3.  Running Go scripts for data synchronization, hash calculation, and version generation.
4.  Deploying the built application to GitHub Pages.
5.  The workflow is triggered on pushes to the `main` branch, on a schedule (daily), and manually via `workflow_dispatch`.
