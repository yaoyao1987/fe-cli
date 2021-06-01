function installEditorconfig() {
  return {
    toAddFiles: [
      ['../templates/_editorconfig', '.editorconfig']
    ]
  }
}

module.exports = {
  installEditorconfig
}