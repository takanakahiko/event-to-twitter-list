import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    typescript: true,
    stylistic: {
      semi: false,
      commaDangle: 'always-multiline',
      braceStyle: '1tbs',
    },
  },
}).append({
  rules: {
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    // 以前の .eslintrc.js（eslint-config-standard の comma-dangle: always-multiline）に合わせる
    '@stylistic/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    '@stylistic/type-annotation-spacing': 'off',
    '@stylistic/member-delimiter-style': 'off',
  },
})
