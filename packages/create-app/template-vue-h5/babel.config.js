module.exports = {
  presets: [
    ['@vue/app',
      {
        'modules': false,
        'useBuiltIns': 'entry'
      }]
  ],
  plugins: [
    ['import', {
      'libraryName': 'vant',
      'libraryDirectory': 'es',
      'style': name => `${name}/style/less`
    }, 'vant']
  ]
}
