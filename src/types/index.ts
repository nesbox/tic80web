// Navigation types
export interface NavigationItem {
  path: string;
  label: string;
}

// Route types
export type RouteKey = 'home' | 'learn' | 'create' | 'play' | 'dev' | 'terms';

// App configuration types
export interface AppConfig {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly author: string;
}

// External links types
export interface ExternalLinks {
  readonly github: string;
  readonly forum: string;
  readonly telegram: string;
  readonly discord: string;
  readonly twitter: string;
}

// Game and User data types
export interface Game {
  id: number;
  hash: string;
  title: string;
  name: string;
  author: string;
  desc: string | null;
  user: number;
  text: string;
  added: number;
  updated: number;
  category: number;
  rating: number;
}

export interface User {
  id: number;
  name: string;
  date: number;
  avatar?: string;
}

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
