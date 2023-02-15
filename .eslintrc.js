module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['off'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    semi: 2,
    'no-shadow': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx'],
      },
    ],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    'max-len': [
      'warn',
      {
        code: 120,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
