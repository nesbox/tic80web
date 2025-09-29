import type { Game } from '../types';

/**
 * Utility function to combine CSS class names
 */
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Utility function to check if a navigation path should be active
 */
export const getIsActive = (currentPath: string, navPath: string): boolean => {
  if (navPath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(navPath);
};



/**
 * Utility function to safely get item from sessionStorage
 */
export const getSessionStorageItem = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.warn('Failed to access sessionStorage:', error);
    return null;
  }
};

/**
 * Utility function to safely set item in sessionStorage
 */
export const setSessionStorageItem = (key: string, value: string): void => {
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.warn('Failed to set sessionStorage item:', error);
  }
};

/**
 * Utility function to safely remove item from sessionStorage
 */
export const removeSessionStorageItem = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove sessionStorage item:', error);
  }
};

/**
 * Utility function to sort games based on sort ID
 */
export const sortGames = (games: Game[], sortId: number, recentDays: number = 90): Game[] => {
  switch (sortId) {
    case 1: // most recent
      return [...games].sort((a, b) => b.updated - a.updated);
    case 2: // top rated
      return [...games].sort((a, b) => b.rating - a.rating);
    case 0: // popular: recent games sorted by rating, expand time window until we have games
    default: {
      let days = recentDays;
      let recentGames = [];
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loop

      do {
        const recentTimestamp = Date.now() - (days * 24 * 60 * 60 * 1000);
        recentGames = games.filter(game => game.updated > recentTimestamp);
        days += recentDays;
        attempts++;
      } while (recentGames.length === 0 && attempts < maxAttempts);

      return [...recentGames].sort((a, b) => b.rating !== a.rating ? b.rating - a.rating : b.updated - a.updated);
    }
  }
};
