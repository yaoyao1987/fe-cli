function installLintStaged() {
  return {
    toInstallDeps: ['lint-staged'],
    toModifyPkg: [
      (pkg) => {
        pkg.husky = Object.assign(pkg.husky || {}, {
          hooks: {
            "pre-commit": "lint-staged"
          }
        });
        pkg['lint-staged'] = Object.assign(pkg['lint-staged'] || {}, {
          '*.{js,jsx,ts,tsx}': (fileNames) => {
            const fileList = fileNames.join(' ');
            const actions = [`eslint --fix ${fileList}`];

            if (fs.existsSync('./tsconfig.json')) {
              actions.push('tsc -p tsconfig.json --noEmit');
            }

            return actions;
          },
          '*.{css,scss,sass}': ['stylelint --fix --formatter verbose --allow-empty-input'],
          '*.md': ['prettier --write', 'git add'],
        });
      },
    ]
  }
}

module.exports = {
  installLintStaged
}