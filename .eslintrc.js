/* eslint-disable no-undef */

const eslintRules = {
  curly: 'error',
  'dot-notation': 'error',
  'id-match': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-eval': 'error',
  'no-new-wrappers': 'error',
  'no-undef-init': 'error',
  'no-var': 'error',
  'object-shorthand': 'error',
  'prefer-object-spread': 'error',
  radix: 'error',
  'no-console': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
  eqeqeq: ['error', 'smart'],
  'one-var': ['error', 'never'],
  'no-restricted-imports': [
    'error',
    { name: 'lodash', message: "Use chunk friendly imports for lodash like 'lodash/<fn>'" },
  ],
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
    },
  ],
};

const tsRules = {
  '@typescript-eslint/consistent-type-definitions': 'error',
  '@typescript-eslint/member-ordering': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/unified-signatures': 'error',
  '@typescript-eslint/promise-function-async': 'error',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', ignoreRestSiblings: true },
  ],
  '@typescript-eslint/quotes': [
    'error',
    'single',
    {
      avoidEscape: true,
    },
  ],
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: [
        'classProperty',
        'objectLiteralProperty',
        'typeProperty',
        'classMethod',
        'objectLiteralMethod',
        'typeMethod',
        'accessor',
        'enumMember',
      ],
      format: null,
      modifiers: ['requiresQuotes'],
    },
  ],
  '@typescript-eslint/consistent-type-assertions': [
    'warn',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'never',
    },
  ],
};

const custom = {
  'import/no-default-export': 'error',
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react-hooks/exhaustive-deps': 'off',
  'prettier/prettier': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
};

const rules = {
  ...eslintRules,
  ...tsRules,
  ...custom,
};

module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    createDefaultProgram: true,
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    project: ['tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import',
    'react',
    'react-hooks',
    'jest',
    'jest-dom',
    'testing-library',
    'jsx-a11y',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/ignore': ['react-native'],
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
    },
  ],
  rules,
};
