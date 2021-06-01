function installCommitlint() {
  return {
    toInstallDeps: [
      '@commitlint/cli',
      '@commitlint/config-conventional'
    ],
    toModifyPkg: [
      (pkg) => {
        pkg.husky = Object.assign(pkg.husky || {}, {
          hooks: {
            "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
          }
        });
      },
    ],
    toAddFiles: [
      [
        '../templates/_commitlintrc.js',
        '.commitlintrc.js'
      ],
    ]
  }
}

module.exports = {
  installCommitlint
}