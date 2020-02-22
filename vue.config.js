module.exports = {
  lintOnSave: true,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://www.xuhaibing.io/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
}
