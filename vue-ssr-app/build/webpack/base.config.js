const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueLoaderConfig = require('../config/vue-loader.config');
const env = require('../env');
const paths = require('../misc/paths');
const { publicPath, nodeModules } = require('../misc/constants');

module.exports = {
  mode: env.mode,
  target: 'web',
  entry: env.isSSR ? paths.client.entry : paths.app.entry,
  output: {
    filename: 'bundle.[hash:8].js',
    path: env.isSSR ? paths.client.build : paths.app.build,
    publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': paths.client.src,
      '@assets': paths.client.assets,
      '@m2': paths.lib.m2
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env.mode + '"'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: VueLoaderConfig
        },
        exclude: nodeModules,
        include: paths.client.src
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: nodeModules,
        include: paths.client.src
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8096,
            name: '[name].[hash:8].[ext]'
          }
        }]
      },
      {
        test: /\.ico$/,
        use: 'url-loader'
      },
      {
        test: /\.(htm|html)$/,
        use: [
          'html-withimg-loader',
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href']
            }
          }
        ]
      }
    ]
  }
};
