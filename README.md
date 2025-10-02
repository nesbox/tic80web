# TIC-80 Website

[![TIC-80](https://img.shields.io/badge/TIC--80-blue.svg)](https://web.tic80.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

The official website for TIC-80, a free and open source fantasy computer for making, playing and sharing tiny games. This repository contains the source code for the TIC-80 community website, built with React and TypeScript.

## About

This website serves as the central hub for the TIC-80 community, providing access to games, development tools, learning resources, and community features. It showcases user-created games, offers an embedded web player, and facilitates game sharing and discovery.

## Website Structure

The website is organized into several main sections:

- **Home** (`/`): Landing page with featured games, recent updates, and an overview of TIC-80
- **Learn** (`/learn`): Educational content, tutorials, and documentation
- **Create** (`/create`): Game creation interface and tools
- **Play** (`/play`): Game browser with filtering and sorting options (popular, recent, top-rated)
- **Dev** (`/dev`): Developer profiles and portfolios showcasing individual creators and their games
- **Terms** (`/terms`): Terms of service and usage policies

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 with custom CSS
- **Routing**: React Router DOM
- **Markdown Rendering**: React Markdown with rehype and remark plugins
- **Deployment**: GitHub Pages with automated CI/CD

## Project Structure

```
tic80web/
├── public/           # Static assets and TIC-80 web player files
├── src/
│   ├── components/   # Reusable React components
│   ├── contexts/     # React contexts for state management
│   ├── data/         # Static data files (games, users, etc.)
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── styles/       # CSS stylesheets
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── scripts/          # Go scripts for data processing
└── .github/          # GitHub Actions workflows
```

## Getting Started

### Online
Visit [tic80.com](https://web.tic80.com) to start using TIC-80 immediately in your browser.

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/nesbox/tic80web.git
   cd tic80web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Vadim Grigoruk (@nesbox)
