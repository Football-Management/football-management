/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@rocketseat/eslint-config/react'],
  plugins: ['single-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error'
  }
}