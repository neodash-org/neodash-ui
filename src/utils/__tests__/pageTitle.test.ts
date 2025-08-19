import { describe, it, expect } from 'vitest';
import { getPageTitle } from '../pageTitle';

describe('getPageTitle', () => {
  it('should return correct title for dashboard path', () => {
    expect(getPageTitle('/dashboard')).toBe('Dashboard');
  });

  it('should return correct title for portfolio path', () => {
    expect(getPageTitle('/portfolio')).toBe('Portfolio');
  });

  it('should return correct title for analytics path', () => {
    expect(getPageTitle('/analytics')).toBe('Analytics');
  });

  it('should return correct title for settings path', () => {
    expect(getPageTitle('/settings')).toBe('Settings');
  });

  it('should return correct title for bridge path', () => {
    expect(getPageTitle('/bridge')).toBe('Bridge');
  });

  it('should return dashboard as default for unknown paths', () => {
    expect(getPageTitle('/unknown')).toBe('Dashboard');
    expect(getPageTitle('/')).toBe('Dashboard');
    expect(getPageTitle('')).toBe('Dashboard');
  });

  it('should handle paths with trailing slashes', () => {
    expect(getPageTitle('/dashboard/')).toBe('Dashboard');
    expect(getPageTitle('/portfolio/')).toBe('Portfolio');
  });
});
