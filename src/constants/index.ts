// Application constants
export const APP_CONFIG = {
  name: 'TIC-80',
  version: 'v1.1.2837',
  description: 'fantasy computer for making, playing and sharing tiny games',
  author: 'Vadim Grigoruk @nesbox',
} as const;

// External links
export const EXTERNAL_LINKS = {
  github: 'https://github.com/nesbox/TIC-80',
  forum: 'https://github.com/nesbox/TIC-80/discussions',
  telegram: 'https://t.me/tic80',
  discord: 'https://discord.gg/HwZDw7n4dN',
  twitter: 'https://twitter.com/tic_computer',
} as const;

// Image paths
export const IMAGES = {
  logo: 'img/logo64.png',
  demo: 'img/demo.gif',
  loader: 'img/load.gif',
} as const;

// Route paths
export const ROUTES = {
  home: '/',
  learn: '/learn',
  create: '/create',
  play: '/play',
  dev: '/dev',
  terms: '/terms',
} as const;
