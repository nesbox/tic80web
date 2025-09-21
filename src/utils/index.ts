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
