const path = require('path');

const configPkgName = 'sw-eslint-config-sw';
/**
 * 导出 eslint 的路径
 * like: extends: 'sw-eslint-config-sw/typescript/vue'
 */
const configPkgPath = {
  'Javascript': '',
  'Javascript/Vue': 'vue',
  'Javascript/React': 'react',
  'Typescript': 'typescript',
  'Typescript/Vue': 'typescript/vue',
  'Typescript/React': 'typescript/react',
};

const needDeps = {
  'Javascript': ['eslint', 'babel-eslint', 'sw-eslint-config-sw'],
  'Typescript': [
    'typescript',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser'
  ],
  'React': ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
  'Vue': ['eslint-plugin-vue', 'vue-eslint-parser']
}

const eslintrcConfig = (type) => ({
  extends: path.join(configPkgName, configPkgPath[type]),
});

module.exports = {
  eslintrcConfig,
  needDeps
}