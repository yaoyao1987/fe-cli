function installHusky() {
  return {
    toInstallDeps: [
      'husky',
    ],
    toRemoveFiles: [
      '.huskyrc',
      '.huskyrc.json',
      'husky.config.js',
      '.husky.config.js',
    ],
  }
}

module.exports = {
  installHusky
}