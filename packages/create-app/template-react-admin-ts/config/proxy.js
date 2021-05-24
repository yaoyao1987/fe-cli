module.exports = {
  target: 'http://192.168.46.147:3000/mock/20',
  changeOrigin: true,
  ws: true,
  pathRewrite: { '^/api': '/api' },
}
