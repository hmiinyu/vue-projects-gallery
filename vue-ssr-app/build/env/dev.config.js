const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClientRendererPlugin = require('vue-server-renderer/client-plugin');
const env = require('../env');
const paths = require('../misc/paths');
const { publicPath, nodeModules, defaultPage, clientHost, clientPort } = require('../misc/constants');

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: paths.client.template,
    filename: defaultPage,
    favicon: paths.app.favicon
  }),
  new webpack.HotModuleReplacementPlugin()
];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  plugins: env.isSSR ? defaultPlugins.concat([
    new ClientRendererPlugin()
  ]) : defaultPlugins,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: nodeModules,
        include: paths.client.src,
        enforce: 'pre'
      }
    ]
  },
  devServer: {
    // open: true,
    host: clientHost,
    port: clientPort,
    hot: true,
    compress: true,
    progress: true,
    contentBase: env.isSSR ? paths.client.build : paths.app.build,
    overlay: {
      errors: true
    },
    historyApiFallback: {
      index: `${publicPath}${defaultPage}`
    }
  }
};
