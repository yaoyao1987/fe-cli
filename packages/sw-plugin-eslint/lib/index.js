// const path = require('path');
// const fs = require('fs');
// const spawn = require('cross-spawn');
// const { green } = require('chalk');

const { askForLanguage, askForFramework } = require('./ask');
const { needDeps } = require('./config');
const { overrideEditorConfig, overrideEslint, overridePrettier, updatePackageJson, installDependencies, addHusky } = require('./schedule');

const filePath = process.cwd()

// const { eslintrcConfig, needDeps } = require('./config');

module.exports = async () => {
  const language = await askForLanguage();
  const framework = await askForFramework();

  let type = language
  if (framework) {
    type += `/${framework}`
  }

  let deps = needDeps.Javascript;
  if (language === 'Typescript') {
    deps = [...deps, ...needDeps.Typescript]
  }

  if (framework) {
    deps = [...deps, ...needDeps[framework]]
  }

  overrideEditorConfig(filePath)
  overrideEslint(filePath, type)
  overridePrettier(filePath)
  installDependencies(filePath, deps)
}