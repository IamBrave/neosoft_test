const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const extractCSS = require('./webpack/css.extract');
const css = require('./webpack/css');
const webpack = require('webpack');
const sourceMap = require('./webpack/sourceMap');
const lintCSS = require('./webpack/sass.lint');
const images = require('./webpack/images');
const favicon = require('./webpack/favicons');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};
const common = merge([
  {
    entry: {
			'index': PATHS.source + '/js/main.js',
			'sass': PATHS.source + '/sass/style.sass',
      // 'blog': PATHS.source + '/pages/blog/blog.js',
    },
    output: {
      path: PATHS.build,
      filename: './js/[name].js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATHS.source + '/index.pug',
      }),
      // new HtmlWebpackPlugin({
      //   filename: 'blog.html',
      //   chunks: ['blog', 'common'],
      //   emplate: PATHS.source + '/pages/blog/blog.pug',
      // }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          'common': {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    
  },
  pug(),
  lintCSS(),
  images(),
]);


module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      common,
      extractCSS(),
      favicon(),
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css(),
      sourceMap(),
    ]);
  }
};