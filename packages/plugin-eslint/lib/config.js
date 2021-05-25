const path = require('path');
const fs = require('fs');
const configTemplateDir = './template/';

/**
 * 导出 eslint 的路径
 * like: extends: 'eslint/typescript/vue'
 */
const configPkgPath = {
  'Javascript': '',
  'Javascript/Vue': 'vue',
  'Javascript/React': 'react',
  'Typescript': 'typescript',
  'Typescript/Vue': 'typescript-vue',
  'Typescript/React': 'typescript-react',
};

const needDeps = {
  'Javascript': ['eslint', 'babel-eslint'],
  'Typescript': [
    'typescript',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser'
  ],
  'React': ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
  'Vue': ['eslint-plugin-vue', 'vue-eslint-parser']
}

const eslintConfig = (type) => {
  return fs.readFileSync(require.resolve(`${configTemplateDir}eslintrc.${configPkgPath[type]}.js`), 'utf-8')
}

module.exports = {
  configPkgPath,
  eslintConfig,
  needDeps
}