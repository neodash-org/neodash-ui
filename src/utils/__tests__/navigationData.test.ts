import { describe, it, expect } from 'vitest';
import { navItems } from '../navigationData';

describe('navigationData', () => {
  it('should have the correct number of navigation items', () => {
    expect(navItems).toHaveLength(5);
  });

  it('should have all required properties for each navigation item', () => {
    navItems.forEach((item) => {
      expect(item).toHaveProperty('href');
      expect(item).toHaveProperty('labelKey');
      expect(item).toHaveProperty('icon');
    });
  });

  it('should have valid href values', () => {
    const expectedHrefs = ['/dashboard', '/portfolio', '/analytics', '/settings', '/bridge'];
    const actualHrefs = navItems.map((item) => item.href);
    expect(actualHrefs).toEqual(expectedHrefs);
  });

  it('should have valid label keys for each navigation item', () => {
    const expectedLabelKeys = [
      'navigation.dashboard',
      'navigation.portfolio',
      'navigation.analytics',
      'navigation.settings',
      'navigation.bridge',
    ];
    const actualLabelKeys = navItems.map((item) => item.labelKey);
    expect(actualLabelKeys).toEqual(expectedLabelKeys);
  });

  it('should have valid icon values', () => {
    const expectedIcons = ['📊', '💼', '📈', '⚙️', '🌉'];
    const actualIcons = navItems.map((item) => item.icon);
    expect(actualIcons).toEqual(expectedIcons);
  });

  it('should have unique href values', () => {
    const hrefs = navItems.map((item) => item.href);
    const uniqueHrefs = new Set(hrefs);
    expect(uniqueHrefs.size).toBe(hrefs.length);
  });

  it('should have unique label keys', () => {
    const labelKeys = navItems.map((item) => item.labelKey);
    const uniqueLabelKeys = new Set(labelKeys);
    expect(uniqueLabelKeys.size).toBe(labelKeys.length);
  });

  it('should have unique icons', () => {
    const icons = navItems.map((item) => item.icon);
    const uniqueIcons = new Set(icons);
    expect(uniqueIcons.size).toBe(icons.length);
  });

  it('should have valid NavItem type structure', () => {
    navItems.forEach((item) => {
      expect(typeof item.href).toBe('string');
      expect(typeof item.labelKey).toBe('string');
      expect(typeof item.icon).toBe('string');
    });
  });

  it('should have href values starting with forward slash', () => {
    navItems.forEach((item) => {
      expect(item.href).toMatch(/^\//);
    });
  });

  it('should have label keys following the correct format', () => {
    navItems.forEach((item) => {
      expect(item.labelKey).toMatch(/^navigation\./);
    });
  });
});
