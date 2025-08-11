# Design System - Neodash Dashboard

## ⚡️ Cyberpunk Theme

- **Default Mode:** Dark mode ON by default
- **Style:** Neon accents, deep black backgrounds, glowing effects, glassmorphism, gradients, and sharp edges
- **Inspiration:** Cyberpunk 2077, synthwave, futuristic UIs

## 🎨 Color Palette

### Primary Neon Colors

```
💖 Neon Pink: #ff3cac
💜 Neon Purple: #7847e0
💙 Neon Cyan: #00eaff
💚 Acid Green: #39ff14
💛 Electric Yellow: #ffe500
🟦 Electric Blue: #00f0ff
```

### Background Colors

```
⚫ Black: #0a0a0f
⚫ Deep Purple: #1a0033
⚫ Glass Card: rgba(20, 20, 40, 0.7) (glassmorphism)
```

### Text Colors

```
⚪ Neon White: #f4faff
⚪ Neon Blue: #00eaff
⚪ Neon Pink: #ff3cac
```

### Status Colors

```
🟢 Success: #39ff14
🔴 Error: #ff1744
🟡 Warning: #ffe500
🔵 Info: #00eaff
```

## 📝 Typography

### Font Families

```css
--font-primary: 'Orbitron', 'Rajdhani', 'Audiowide', 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
--font-display: 'Orbitron', 'Rajdhani', 'Audiowide', sans-serif;
```

### Font Styles

- Headings: Uppercase, bold, letter-spacing: 0.05em
- Body: Regular, high contrast

## 🧱 Component Library (Cyberpunk Examples)

### Buttons

#### Neon Button

```css
.btn-neon {
  background: linear-gradient(90deg, #ff3cac 0%, #7847e0 100%);
  color: #f4faff;
  border: 2px solid #00eaff;
  border-radius: 10px;
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  box-shadow:
    0 0 12px #00eaff,
    0 0 24px #ff3cac;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-neon:hover {
  background: linear-gradient(90deg, #00eaff 0%, #ff3cac 100%);
  box-shadow:
    0 0 24px #00eaff,
    0 0 48px #ff3cac;
  border-color: #ff3cac;
}
```

### Cards

#### Glassmorphic Neon Card

```css
.card-cyberpunk {
  background: rgba(20, 20, 40, 0.7);
  border: 2px solid #00eaff;
  border-radius: 16px;
  box-shadow:
    0 0 32px #00eaff44,
    0 0 8px #ff3cac44;
  backdrop-filter: blur(12px);
  color: #f4faff;
  padding: 32px;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-cyberpunk:hover {
  box-shadow:
    0 0 48px #ff3cac99,
    0 0 24px #00eaff99;
  border-color: #ff3cac;
}
```

### Navigation

#### Top Navigation

```css
.nav-cyberpunk {
  background: rgba(10, 10, 24, 0.95);
  border-bottom: 2px solid #00eaff;
  box-shadow: 0 2px 24px #00eaff44;
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## 🎭 Effects & Animations

### Glow Effects

```css
.glow-pink {
  box-shadow:
    0 0 16px #ff3cac,
    0 0 32px #ff3cac44;
}
.glow-cyan {
  box-shadow:
    0 0 16px #00eaff,
    0 0 32px #00eaff44;
}
```

### Glassmorphism

```css
.glass {
  background: rgba(20, 20, 40, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 16px;
}
```

## 📱 Responsive & Accessibility

- Maintain high contrast for neon on dark backgrounds
- All interactive elements must have visible focus (neon border or glow)
- Responsive breakpoints as before

---

# (The rest of the file remains as reference for spacing, breakpoints, and accessibility)

## 📏 Spacing System

### Base Spacing (8px grid)

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
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
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
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
