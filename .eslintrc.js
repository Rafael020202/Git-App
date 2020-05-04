module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    "prettier/prettier": ["error", {
      "endOfLine": "auto"
    }],
    "linebreak-style": 0,
    "react/jsx-filename-extension": [
      'warn',
      {extensions: ['.jsx', '.js']},
    ],
    "react/state-in-constructor": [1, "never"],
    "react/static-property-placement": 0
  },
};
