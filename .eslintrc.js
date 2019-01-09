module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': false }],
    'camelcase': ['error', { 'ignoreDestructuring': false }],
    'comma-dangle': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'error',
    'no-debugger': 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': ['error', 'always'],
    'prefer-arrow-callback': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'semi-spacing': ['error'],
    'space-before-blocks': ['error', 'always']
  }
}
