module.exports = {
  lintOnSave: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://api.xuhaibing.com/v1',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
}
