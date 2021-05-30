const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const { green } = require('chalk');
const { eslintrcConfig, needDeps } = require('./config');

const templatePath = path.resolve(__dirname, '../template')

// 写入 editorconfig 文件
function overrideEditorConfig(filePath) {
  const exiting = fs.existsSync(`${filePath}/.editorconfig`)
  if (exiting) return;

  // editorConfig
  const editorConfig = fs.readFileSync(`${templatePath}/_editorconfig`, 'utf-8')
  fs.writeFileSync(path.join(filePath, '.editorconfig'), editorConfig)
}

// 写入 eslint 配置文件
function overrideEslint(filePath, type) {
  const exitingEslint = fs.existsSync(`${filePath}/.eslintrc.js`)
  if (!exitingEslint) {
    fs.writeFileSync(
      path.join(filePath, '.eslintrc.js'),
      `module.exports = ${JSON.stringify(
        eslintrcConfig(type),
        null,
        2
      )}`
    );
  }

  // eslintignore
  const exiting = fs.existsSync(`${filePath}/.eslintignore`)
  if (exiting) return;
  const eslintIgnore = fs.readFileSync(`${templatePath}/_eslintignore`, 'utf-8')
  fs.writeFileSync(path.join(filePath, '.eslintignore'), eslintIgnore)
}

// 写入 prettier 配置文件
function overridePrettier(filePath) {
  const exitingPrettier = fs.existsSync(`${filePath}/.prettierrc.js`)
  if (!exitingPrettier) {
    fs.writeFileSync(
      path.join(filePath, '.prettierrc.js'),
      fs.readFileSync(`${templatePath}/_prettierrc.js`, 'utf-8')
    );
  }

  // prettierignore
  const exiting = fs.existsSync(`${filePath}/.prettierignore`)
  if (exiting) return;
  const prettierIgnore = fs.readFileSync(`${templatePath}/_prettierignore`, 'utf-8')
  fs.writeFileSync(path.join(filePath, '.prettierignore'), prettierIgnore)
}

// 更新 package.json 配置文件
function updatePackageJson() {
  const pkgPath = path.join(worker.getWorkDir(), './package.json');
  const pkgConfig = getPackageJsonConfig();
  fs.writeFileSync(pkPath, JSON.stringify(pkConfig, null, 2));
}

// 获取当前项目的package.json
function getPackageJsonConfig(filePath) {
  const pkgConfig = this.standardConfig.getPackageJsonConfig();
  const pkgPath = path.join(filePath, './package.json');
  const currentPkgConfig = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const config = merge(currentPkgConfig, pkgConfig);

  // 清除某些被设置在 dependencies 中的 eslint 相关依赖
  const dependencies = config.dependencies;
  const devDependencies = config.devDependencies;
  for (const key in dependencies) {
    if (dependencies[key] && devDependencies[key]) {
      delete dependencies[key];
    }
  }
  return config;
}

// 安装相关依赖
function installDependencies(filePath, deps) {
  // const spinner = ora(chalk.blue('配置文件更新完成，正在安装相关依赖，请耐心等待...')).start();
  // const reply = shell.exec('npm install --only=dev');
  // spinner.stop();
  // if (reply.code !== 0) {
  //   shell.exit(1);
  // }
  command = 'npm';
  args = [
    'install',
    '--save-dev',
    '--save-exact',
    '--loglevel',
    'error',
  ].concat(deps);

  const child = spawn(command, args, { stdio: 'inherit' });
}

// 添加 commit 自动检测
function addHusky() {
  // shell.exec('npx husky install && npx husky set .husky/pre-commit "npm run jgxl-pre-commit"');
}

module.exports = {
  overrideEditorConfig,
  overrideEslint,
  overridePrettier,
  updatePackageJson,
  installDependencies,
  addHusky
};