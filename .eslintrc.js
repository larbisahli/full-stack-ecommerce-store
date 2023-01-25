module.exports = {
  plugins: ['simple-import-sort'],
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    amd: true,
    node: true
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:jsx-a11y/recommended'
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ]
  },
  overrides: [
    Object.assign(
      {
        files: ['**/__tests__/*-spec.tsx', '**/__mocks__/*.ts'],
        env: { jest: true },
        plugins: ['jest']
      },
      require('eslint-plugin-jest').configs.recommended
    )
  ]
};
