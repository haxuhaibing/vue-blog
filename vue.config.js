 const path = require('path');
 const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
 const {
   styles
 } = require('@ckeditor/ckeditor5-dev-utils');
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
   },
   transpileDependencies: [
     /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
   ],
   configureWebpack: {
     plugins: [
       new CKEditorWebpackPlugin({
         language: 'en'
       })
     ]
   },
   chainWebpack: config => {
     config
       .plugin('webpack-bundle-analyzer')
       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
     const svgRule = config.module.rule('svg');
     svgRule.uses.clear();
     svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
     config.module
       .rule('cke-svg')
       .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
       .use('raw-loader')
       .loader('raw-loader');
     config.module
       .rule('cke-css')
       .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
       .use('postcss-loader')
       .loader('postcss-loader')
       .tap(() => {
         return styles.getPostCssConfig({
           themeImporter: {
             themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
           },
           minify: true
         });
       });
   }
 };
