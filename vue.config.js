const path = require('path');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const {
  styles
} = require('@ckeditor/ckeditor5-dev-utils');
const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    'https://cdn.bootcss.com/highlight.js/9.18.1/highlight.min.js'
  ]
};

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
    // 生产环境配置
    if (isProduction) {
      // 生产环境注入cdn
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        });
    }
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
  },
  configureWebpack: config => {
    if (isProduction) {
      // 用cdn方式引入
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'moment': 'moment',
        'highlight.js': 'hljs'
      }
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
};
