# Design System - Neodash Dashboard

## 🎨 Color Palette

### Primary Colors
```
🟣 Primary Purple: #6366f1
🟣 Primary Purple Dark: #4f46e5
🟣 Primary Purple Light: #8b5cf6
🔵 Secondary Blue: #3b82f6
🔵 Secondary Blue Dark: #1d4ed8
🔵 Secondary Blue Light: #60a5fa
```

### Background Colors
```
⚫ Background Primary: #0f0f23
⚫ Background Secondary: #1a1a2e
⚫ Background Tertiary: #2d2d44
⚫ Background Card: #1e1e3f
⚫ Background Overlay: rgba(15, 15, 35, 0.8)
```

### Text Colors
```
⚪ Text Primary: #ffffff
⚪ Text Secondary: #a0a0a0
⚪ Text Tertiary: #6b7280
⚪ Text Disabled: #4b5563
```

### Status Colors
```
🟢 Success: #10b981
🟢 Success Light: #34d399
🔴 Error: #ef4444
🔴 Error Light: #f87171
🟡 Warning: #f59e0b
🟡 Warning Light: #fbbf24
🔵 Info: #3b82f6
🔵 Info Light: #60a5fa
```

### Chain-Specific Colors
```
🟣 Ethereum: #627eea
🟣 Solana: #9945ff
🟣 Polygon: #8247e5
🟣 Arbitrum: #28a0f0
🟣 Optimism: #ff0420
🟣 Base: #0052ff
🟡 Bitcoin: #f7931a
🔵 USDC: #2775ca
```

## 📝 Typography

### Font Families
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
--font-display: 'Inter', sans-serif;
```

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

## 📏 Spacing System

### Base Spacing (8px grid)
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## 🧱 Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: #6366f1;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: 2px solid #6366f1;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: rgba(99, 102, 241, 0.1);
  transform: translateY(-1px);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: #a0a0a0;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: rgba(160, 160, 160, 0.1);
  color: white;
}
```

### Cards

#### Default Card
```css
.card {
  background: #1e1e3f;
  border: 1px solid #2d2d44;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
}

.card:hover {
  border-color: #6366f1;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.1);
}
```

#### Interactive Card
```css
.card-interactive {
  background: #1e1e3f;
  border: 1px solid #2d2d44;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-interactive:hover {
  transform: translateY(-2px);
  border-color: #6366f1;
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15);
}
```

### Input Fields

#### Text Input
```css
.input {
  background: #1a1a2e;
  border: 1px solid #2d2d44;
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input::placeholder {
  color: #6b7280;
}
```

#### Select Dropdown
```css
.select {
  background: #1a1a2e;
  border: 1px solid #2d2d44;
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

### Navigation

#### Top Navigation
```css
.nav-top {
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #2d2d44;
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
}
```

#### Bottom Navigation (Mobile)
```css
.nav-bottom {
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid #2d2d44;
  padding: 12px 24px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
```

## 🎭 Interactive States

### Loading States
```css
.skeleton {
  background: linear-gradient(90deg, #1a1a2e 25%, #2d2d44 50%, #1a1a2e 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Hover Effects
```css
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-glow {
  transition: box-shadow 0.2s ease;
}

.hover-glow:hover {
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2);
}
```

### Focus States
```css
.focus-ring {
  transition: box-shadow 0.2s ease;
}

.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;

/* Usage */
@media (min-width: 768px) {
  /* Tablet and up */
}

@media (min-width: 1024px) {
  /* Desktop and up */
}
```

## 🎨 Shadows & Elevation

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Glow effects */
--glow-purple: 0 0 20px rgba(99, 102, 241, 0.3);
--glow-blue: 0 0 20px rgba(59, 130, 246, 0.3);
--glow-green: 0 0 20px rgba(16, 185, 129, 0.3);
```

## 🔄 Animations & Transitions

```css
/* Standard transitions */
--transition-fast: 0.15s ease;
--transition-normal: 0.2s ease;
--transition-slow: 0.3s ease;

/* Easing functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

## 🎯 Accessibility

### Focus Indicators
```css
.focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}
```

### Color Contrast
- **Primary text**: 4.5:1 minimum contrast ratio
- **Secondary text**: 3:1 minimum contrast ratio
- **Interactive elements**: 3:1 minimum contrast ratio

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
``` 