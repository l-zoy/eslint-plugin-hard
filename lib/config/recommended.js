/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update it's content execute "npm run update"
 */
module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ['hard'],
  rules: {
    'hard/attribute-erection-sequence': 'error',
    'hard/not-template-annotation': 'error',
    'hard/not-template-logical-expressions': 'error',
    'hard/not-template-style': 'error',
    'hard/script-import-sort': 'error'
  }
}
