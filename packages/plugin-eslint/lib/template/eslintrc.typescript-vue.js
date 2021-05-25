/**
 * 本文件的规则由 @typescript-eslint/eslint-plugin 提供，使用 @typescript-eslint/parser 作为 parser
 * 需要将 @typescript-eslint/eslint-plugin 和 @typescript-eslint/parser 安装为项目依赖
 */

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint', vue],
  rules: {
    // 禁止使用 any
    '@typescript-eslint/no-explicit-any': 'warn',
    // 禁止出现空的 interface
    '@typescript-eslint/no-empty-interface': 'warn',
    // 组件的 data 必须是一个函数
    'vue/no-shared-component-data': 'error',
    // 校验组件的 Prop 默认值类型
    'vue/require-valid-default-prop': 'error',
    // v-for 必须含有键值
    'vue/require-v-for-key': 'error',
    // 禁止注册没有使用的组件
    'vue/no-unused-components': 'warn',
    // render 函数必须有返回值
    'vue/require-render-return': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', '.ts', '.json'],
      },
    },
    'import/extensions': ['.js', '.ts', '.mjs'],
  },
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
    extraFileExtensions: ['.vue'],
  },
};