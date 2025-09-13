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

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
