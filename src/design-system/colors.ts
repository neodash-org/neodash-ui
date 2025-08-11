// Single source of truth for all colors
export const colors = {
  // Core brand colors
  neon: {
    pink: '#ff3cac',
    cyan: '#00fff0',
    yellow: '#fff700',
    green: '#39ff14',
  },

  // Semantic colors (what they mean, not what they look like)
  primary: '#00fff0', // neon-cyan for main actions
  secondary: '#ff3cac', // neon-pink for secondary actions
  success: '#39ff14', // neon-green for success states
  warning: '#fff700', // neon-yellow for warnings

  // Background colors
  bg: {
    main: '#0a0a0f',
    sidebar: '#101018',
    card: '#14141e',
  },

  // Text colors
  text: {
    main: '#f4f4fa',
    secondary: '#d9ecff',
    muted: '#64748b',
  },

  // Border colors
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    strong: 'rgba(255, 255, 255, 0.3)',
  },
} as const;

// Type for theme-aware color usage
export type ColorKey = keyof typeof colors;
export type ColorValue = string | Record<string, string>;
