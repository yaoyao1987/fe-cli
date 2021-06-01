function installPrettier() {
  return {
    toInstallDeps: ['prettier'],
    toRemoveFiles: [
      '.prettierrc',
      'prettier.config.js',
      '.prettierrc.toml',
    ],
    toAddFiles: [
      ['../templates/_prettierrc.js', '.prettierrc.js'],
      ['../templates/_prettierignore', '.prettierignore']
    ]
  }
}

module.exports = {
  installPrettier
}