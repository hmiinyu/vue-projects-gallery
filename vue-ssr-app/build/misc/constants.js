const env = require('../env');

module.exports = {
  nodeModules: /node_modules/,
  publicPath: env.isSSR ? (env.isDev ? 'http://127.0.0.1:8000/public/ssr/client/' : '/public/ssr/client/') : '/public/app/',
  defaultPage: 'index.html',
  clientHost: '0.0.0.0',
  clientPort: 8000,
  serverHost: '0.0.0.0',
  serverPort: 3000,
  clientManifestFile: 'vue-ssr-client-manifest.json',
  serverBundleFile: 'vue-ssr-server-bundle.json',
  serverEncoding: 'utf-8',
  serverLoadingText: '页面正在加载中，请稍后...'
};
