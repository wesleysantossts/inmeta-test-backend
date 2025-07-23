module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  
  env: {
    node: true,
    jest: true
  },
  
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    }
  },
  
  overrides: [
    {
      files: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    }
  ],
  
  rules: {
    'import/no-unresolved': 'off'
  }
};