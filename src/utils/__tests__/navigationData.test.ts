import { describe, it, expect } from 'vitest';
import { navItems } from '../navigationData';

describe('navigationData', () => {
  it('should have the correct number of navigation items', () => {
    expect(navItems).toHaveLength(5);
  });

  it('should have all required navigation routes', () => {
    const expectedRoutes = ['/dashboard', '/portfolio', '/analytics', '/settings', '/bridge'];
    const actualRoutes = navItems.map((item) => item.href);

    expect(actualRoutes).toEqual(expectedRoutes);
  });

  it('should have all required navigation labels', () => {
    const expectedLabels = ['Dashboard', 'Portfolio', 'Analytics', 'Settings', 'Bridge'];
    const actualLabels = navItems.map((item) => item.label);

    expect(actualLabels).toEqual(expectedLabels);
  });

  it('should have icons for all navigation items', () => {
    navItems.forEach((item) => {
      expect(item.icon).toBeDefined();
      expect(typeof item.icon).toBe('string');
      expect(item.icon.length).toBeGreaterThan(0);
    });
  });

  it('should have correct NavItem interface structure', () => {
    navItems.forEach((item) => {
      expect(item).toHaveProperty('href');
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('icon');

      expect(typeof item.href).toBe('string');
      expect(typeof item.label).toBe('string');
      expect(typeof item.icon).toBe('string');
    });
  });

  it('should have unique href values', () => {
    const hrefs = navItems.map((item) => item.href);
    const uniqueHrefs = new Set(hrefs);

    expect(uniqueHrefs.size).toBe(navItems.length);
  });

  it('should have unique labels', () => {
    const labels = navItems.map((item) => item.label);
    const uniqueLabels = new Set(labels);

    expect(uniqueLabels.size).toBe(navItems.length);
  });
});
