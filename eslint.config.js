import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {defineConfig, globalIgnores} from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },

  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      // Global restriction: nobody may import either client directly
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              // blocks any import that ends with /http/FetchHttpClient (or /http/FetchHttpClient.ts[x])
              group: [
                "**/http/FetchHttpClient",
                "**/http/FetchHttpClient.*",
              ],
              message: "Do not import FetchHttpClient directly; consume it via BaseService (or an exported factory).",
            },
          ],
        },
      ],
    },
  },

  // Exception: BaseService may import FetchHttpClient
  {
    files: ["src/**/BaseService.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // NB: FetchHttpClient is NOT listed in "group:" here, so it’s isolatedly allowed in BaseService
            {
              group: [],
              message: "BaseService only currently has import exception for FetchHttpClient.",
            },
          ],
        },
      ],
    },
  },
])
