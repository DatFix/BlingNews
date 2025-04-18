// eslint.config.mjs

import { FlatCompat } from '@eslint/eslintrc'

// Node.js >= 20.11.0 hỗ trợ import.meta.dirname
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@typescript-eslint/no-explicit-any': 'off', 
      '@next/next/no-img-element': 'off', 
    },
  }),
]

export default eslintConfig
