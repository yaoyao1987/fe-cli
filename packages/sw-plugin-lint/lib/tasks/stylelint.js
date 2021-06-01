function installStylelint() {
  return {
    toInstallDeps: [
      'stylelint',
      'stylelint-config-standard',
      'stylelint-order'
    ],
    toRemoveFiles: [
      '.stylelintrc.cjs',
      '.stylelintrc.yaml',
      '.stylelintrc.yml',
      '.stylelintrc.json',
      '.stylelintrc',
    ],
    toAddFiles: [
      ['../templates/_stylelintrc.js', '.stylelintrc.js'],
      ['../templates/_stylelintignore', '.stylelintignore']
    ]
  }
}

module.exports = {
  installStylelint
}