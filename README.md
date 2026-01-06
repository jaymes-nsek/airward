# Airward

Airward is a language-learning web app designed to help learners **hear, recognise, and practise English phonetics**—starting with the **20 vowel sounds** (12 monophthongs + 8 diphthongs), and extending to **English consonants**.

The core of Airward is intentionally simple: **listen repeatedly**, **compare examples**, and **train your ear** through randomised listening practice.

---

## Product Principles

- **Mobile-first, responsive rendering**  
  Designed from small viewports upwards, scaling predictably to tablet and desktop without layout breakage.

- **Fast initial load (RAIL Load + good LCP)**  
  Prioritise a fast first view by shipping only what’s needed for the initial route, optimising critical assets, and deferring non-essential code. Aim for “good” Core Web Vitals, especially LCP (≤ 2.5s), as experienced by most users.

- **Responsive interactions (good INP)**  
  Keep tap, click, and key interactions feeling immediate by avoiding long main-thread tasks and keeping event handlers lightweight. Audio controls and primary actions should never feel sluggish.

- **Stable browser rendering (low CLS)**  
  Prevent unexpected layout shifts by reserving space for dynamic content (audio controls, example lists), constraining media, and avoiding late-loading UI that changes layout flow.

- **Accessibility-minded by default**  
  Keyboard navigation, semantic HTML, sensible focus order, and visible focus states.

- **Cross-browser consistency and compatibility**  
  Prioritise predictable behaviour across browsers; avoid brittle or experimental layout and styling techniques.

- **Content-driven layout**  
  UI adapts to content length (0+ examples per vowel) without breaking layout or causing scroll jank.

- **Incremental extensibility**  
  Architecture supports adding metadata, practice levels, and consonant content without structural rewrites.

---

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm (or equivalent package manager)

### Install
```bash
npm install
```

### Run dev server
```bash
npm run dev
```

---

# Tech Stack

- React
- TypeScript
- Vite

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
