const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const { green } = require('chalk');

const cwd = process.cwd();

const { askForLanguage, askForFramework } = require('./ask');
const { eslintConfig, configPkgPath, needDeps } = require('./config');

module.exports = async () => {
  const language = await askForLanguage();
  const framework = await askForFramework();

  let type = language
  if (framework) {
    type += `/${framework}`
  }

  fs.writeFileSync(
    path.join(process.cwd(), '.eslintrc.js'),
    eslintConfig(type)
  );

  let deps = needDeps.Javascript;
  if (language === 'Typescript') {
    deps = [...deps, ...needDeps.Typescript]
  }

  if (framework) {
    deps = [...deps, ...needDeps[framework]]
  }

  console.log();
  console.log(green(`Use configuration：${type}`));
  console.log(green(`Install Dependencies：yarn install ${deps.join(' ')} --save-dev`
  ));
  console.log();

  try {
    spawn.sync('npm', ['install', ...deps, '--save-dev'], { stdio: 'inherit' })
  } catch { }
}