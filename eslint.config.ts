import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: ['dist/**', 'dist/**/*.d.ts'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    extends: compat.extends('eslint:recommended'),
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ),
  },
]);
