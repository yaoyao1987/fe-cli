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
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    // 禁止使用 any
    '@typescript-eslint/no-explicit-any': 'warn',
    // 禁止出现空的 interface
    '@typescript-eslint/no-empty-interface': 'warn',
    // prop 值为 true 时，可以省略它的值
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],
    // 不要使用未声明的组件
    'react/jsx-no-undef': 'error',
    // 使用大驼峰风格命名组件
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    // 声明的 state 必须被使用
    'react/no-unused-state': 'error',
    // 使用 this.state 获取状态，用 setState 改变状态
    'react/no-direct-mutation-state': 'off',
    // 不要在 setState 中使用 this.state
    'react/no-access-state-in-setstate': 'error',
    // 声明的 prop 必须被使用
    'react/no-unused-prop-types': [
      'error',
      {
        customValidators: [],
        skipShapeProps: true,
      },
    ],
    // render 方法必须要有返回值
    'react/require-render-return': 'error',
    // 不要用数组索引作为 map 元素的 key
    'react/no-array-index-key': 'warn',
    // 检查 react hooks 规范
    // @link https://reactjs.org/docs/hooks-rules.html
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
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
        extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
      },
    },
    'import/extensions': ['.js', '.ts', '.mjs'],
  },
  react: {
    pragma: 'React',
    version: 'detect',
  },
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true
  },
};