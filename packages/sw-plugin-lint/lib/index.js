const path = require('path');
const fs = require('fs-extra');
const { hasYarn, exec, logWithSpinner, stopSpinner } = require('sw-shared-utils')
const { askForLanguage, askForFramework } = require('./ask');
const { eslintrcConfig, needDeps } = require('./config/eslint');
const { removeDepVersion, rm, copy } = require('./utils');
const { installEditorconfig } = require('./tasks/editorconfig');
const { installEslint } = require('./tasks/eslint');
const { installPrettier } = require('./tasks/prettier');
const { installHusky } = require('./tasks/husky');
const { installLintStaged } = require('./tasks/lint-staged');
const { installStylelint } = require('./tasks/stylelint');
const { installCommitizen } = require('./tasks/commitizen');
const { installCommitlint } = require('./tasks/commitlint');

// const { overrideEditorConfig, overrideEslint, overridePrettier, updatePackageJson, installDependencies, addHusky } = require('./schedule');

module.exports = async () => {
  const pkgPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`No package.json find in ${process.cwd()}`);
  }

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
  const toAddFiles = [];
  const toRemoveFiles = [];
  const toInstallDeps = [...deps];
  const toRemoveDeps = [];
  const toModifyPkg = [];

  function collect(fn) {
    const {
      toAddFiles: s0 = [],
      toRemoveFiles: s1 = [],
      toInstallDeps: s2 = [],
      toRemoveDeps: s3 = [],
      toModifyPkg: s4 = [],
    } = fn();

    /* eslint-disable prefer-spread */
    toAddFiles.push.apply(toAddFiles, s0);
    toRemoveFiles.push.apply(toRemoveFiles, s1);
    toInstallDeps.push.apply(toInstallDeps, s2);
    toRemoveDeps.push.apply(toRemoveDeps, s3);
    toModifyPkg.push.apply(toModifyPkg, s4);
  };

  [
    installEditorconfig,
    installEslint,
    installStylelint,
    installPrettier,
    installHusky,
    installLintStaged,
    installCommitizen,
    installCommitlint,
  ].forEach(collect);

  const useYarn = hasYarn();
  if (useYarn) {
    await exec('yarn install');
  }

  const removeCommand = useYarn
    ? (deps) => `yarn remove ${deps} -D`
    : (deps) => `npm uninstall ${deps} --save-dev`;
  const installCommand = useYarn
    ? (deps) => `yarn add ${deps} -D`
    : (deps) => `npm install ${deps} --save-dev`;

  const toRemoveDepsWithoutVersion = toRemoveDeps.map(removeDepVersion).join(' ');
  const toInstallDepsWithoutVersion = toInstallDeps.map(removeDepVersion).join(' ');

  try {
    await exec(`${removeCommand(toRemoveDepsWithoutVersion)}`);
  } catch (e) {
  }

  logWithSpinner(`Now install dependencies...`)
  await exec(`${installCommand(toInstallDepsWithoutVersion)}`);
  stopSpinner()

  toRemoveFiles.forEach(rm);
  toAddFiles.forEach(([s, t]) => copy(s, t));

  const pkg = fs.readJsonSync(pkgPath);

  toModifyPkg.forEach((patch) => {
    patch(pkg);
  });

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  console.log(`✨  Done`)
}