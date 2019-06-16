const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const paths = require('../misc/paths');
const { nodeModules } = require('../misc/constants');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServerRendererPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(baseConfig, {
  target: 'node',
  entry: paths.server.entry,
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js', // 不需要hash
    path: paths.server.build
  },
  devtool: '#source-map',
  externals: Object.keys(require(paths.app.pkg).dependencies),
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css"
    }),
    new ServerRendererPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: nodeModules,
        include: paths.server.src,
        enforce: 'pre'
      }
    ]
  }
});
