function installEslint() {
  return {
    toRemoveFiles: [
      '.eslintrc.cjs',
      '.eslintrc.yaml',
      '.eslintrc.yml',
      '.eslintrc.json',
      '.eslintrc',
    ],
    toAddFiles: [
      ['../templates/_eslintignore', '.eslintignore'],
    ]
  }
}

module.exports = {
  installEslint
}