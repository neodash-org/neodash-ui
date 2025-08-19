/**
 * Get page title from pathname
 * @param path - The current pathname
 * @returns The formatted page title
 */
export const getPageTitle = (path: string): string => {
  switch (path) {
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
