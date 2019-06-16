const paths = require('../misc/paths');
const env = require('../env');
const { publicPath, nodeModules, defaultPage } = require('../misc/constants');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClientRendererPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: paths.client.template,
    filename: defaultPage,
    favicon: paths.app.favicon,
    minify: {
      removeAttributeQuotes: true,
      removeComments: true,
      collapseWhitespace: true
    }
  }),
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash:8].css",
    chunkFilename: "[id].[contenthash:8].css"
  })
];

module.exports = {
  output: {
    filename: '[name].[chunkhash:8].js',
    publicPath
  },
  devtool: 'cheap-module-source-map',
  plugins: env.isSSR ? defaultPlugins.concat([
    new ClientRendererPlugin()
  ]) : defaultPlugins,
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          ie8: false,
          mangle: true,
          output: { comments: false, },
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            unused: false,
          },
        },
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        },
        vendor: {
          test: nodeModules,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1,
          priority: 1
        },
        styles: {
          name: 'styles',
          test: /\.(s*)css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: true
  },
  performance: {
    hints: false
  },
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
      }
    ]
  }
};
