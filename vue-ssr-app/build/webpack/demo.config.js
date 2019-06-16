const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base.config');
const paths = require('../misc/paths');
const { resolve }  = require('../misc/utils');
const { clientHost } = require('../misc/constants');

module.exports = merge(baseConfig, {
  entry: resolve('demo/index.js'),
  output: {
    publicPath: ''
  },
  resolve: {
    alias: {
      'vue': paths.lib.vue
    }
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.client.template,
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // open: true,
    host: clientHost,
    port: 8080,
    hot: true,
    compress: true,
    progress: true,
    contentBase: paths.app.build,
    overlay: {
      errors: true
    }
  }
});
