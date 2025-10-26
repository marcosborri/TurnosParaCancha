import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  ignores: ['dist', 'node_modules'],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    globals: globals.node,
  },
  plugins: { prettier: pluginPrettier },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'prettier/prettier': 'error',
  },
  extends: [configPrettier],
});
