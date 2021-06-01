function installCommitizen() {
  return {
    toInstallDeps: ['commitizen', 'cz-customizable'],
    toModifyPkg: [
      (pkg) => {
        pkg.config = Object.assign(pkg.config || {}, {
          commitizen: {
            path: './node_modules/cz-customizable',
          },
        });
      },
    ],
    toAddFiles: [
      ['../templates/_cz-config.js', '.cz-config.js']
    ]
  }
}

module.exports = {
  installCommitizen
}