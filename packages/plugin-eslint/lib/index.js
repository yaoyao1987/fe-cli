const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const { green } = require('chalk');

const { askForLanguage, askForFramework } = require('./ask');
const { eslintrcConfig, needDeps } = require('./config');

module.exports = async () => {
  const language = await askForLanguage();
  const framework = await askForFramework();

  let type = language
  if (framework) {
    type += `/${framework}`
  }

  // 写 .eslintrc.js 文件
  fs.writeFileSync(
    path.join(process.cwd(), '.eslintrc.js'),
    `module.exports = ${JSON.stringify(
      eslintrcConfig(type),
      null,
      2
    )}`
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