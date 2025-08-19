/**
 * Get page title from pathname
 * @param path - The current pathname
 * @returns The formatted page title
 */
export const getPageTitle = (path: string): string => {
  // Remove trailing slash for consistent comparison
  const cleanPath = path.replace(/\/$/, '');

  switch (cleanPath) {
    case '/dashboard':
      return 'Dashboard';
    case '/portfolio':
      return 'Portfolio';
    case '/analytics':
      return 'Analytics';
    case '/settings':
      return 'Settings';
    case '/bridge':
      return 'Bridge';
    default:
      return 'Dashboard';
  }
};
