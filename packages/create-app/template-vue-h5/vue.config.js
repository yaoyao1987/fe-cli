const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/styles/base/fn.less')
      ]
    })
}
module.exports = {
  // productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'button-primary-color': '#333333',
          'button-primary-background-color': '#FFD705',
          'button-primary-border-color': '#FFD705'
        }
      }
    }
  }
}
