import { colors } from './colors';

// Theme definitions
export const themes = {
  dark: {
    // Dark theme colors
    bg: {
      main: colors.bg.main,
      sidebar: colors.bg.sidebar,
      card: colors.bg.card,
    },
    text: {
      main: colors.text.main,
      secondary: colors.text.secondary,
      muted: colors.text.muted,
    },
    border: {
      light: colors.border.light,
      medium: colors.border.medium,
      strong: colors.border.strong,
    },
    // Keep neon colors as-is for dark theme
    neon: colors.neon,
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
  },

  light: {
    // Light theme colors (better contrast)
    bg: {
      main: '#ffffff',
      sidebar: '#f8fafc',
      card: '#f1f5f9',
    },
    text: {
      main: '#0f172a',
      secondary: '#475569',
      muted: '#64748b',
    },
    border: {
      light: 'rgba(203, 213, 225, 0.5)',
      medium: 'rgba(203, 213, 225, 0.7)',
      strong: 'rgba(203, 213, 225, 0.9)',
    },
    // Adjusted neon colors for light theme
    neon: {
      pink: '#dc2626',
      cyan: '#0284c7',
      yellow: '#d97706',
      green: '#059669',
    },
    primary: '#0284c7',
    secondary: '#dc2626',
    success: '#059669',
    warning: '#d97706',
  },
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = typeof themes.dark;
