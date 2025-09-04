export interface NavItem {
  href: string;
  labelKey: string;
  icon: string;
}

export const navItems: NavItem[] = [
  { href: '/dashboard', labelKey: 'navigation.dashboard', icon: '📊' },
  { href: '/portfolio', labelKey: 'navigation.portfolio', icon: '💼' },
  { href: '/analytics', labelKey: 'navigation.analytics', icon: '📈' },
  { href: '/settings', labelKey: 'navigation.settings', icon: '⚙️' },
  { href: '/bridge', labelKey: 'navigation.bridge', icon: '🌉' },
];
