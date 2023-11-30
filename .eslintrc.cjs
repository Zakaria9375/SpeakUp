/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier',
    'prettier/vue',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }, 
	plugins: ['vue'],
  "rules": {
    "no-unused-vars": process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}
