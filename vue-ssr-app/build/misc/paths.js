const { resolve } = require('./utils');
const { clientManifestFile, serverBundleFile } = require('./constants');

module.exports = {
  app: {
    root: resolve(''),
    src: resolve('src'),
    pkg: resolve('package.json'),
    favicon: resolve('favicon.ico'),
    entry: resolve('src/client/main.js'),
    build: resolve('public/app')
  },
  client: {
    src: resolve('src/client'),
    entry: resolve('src/client/ssr/client-entry.js'),
    assets: resolve('src/client/assets'),
    template: resolve('static/client-template.html'),
    build: resolve( 'public/ssr/client'),
    manifest: resolve(`public/ssr/server/${clientManifestFile}`)
  },
  server: {
    src: resolve('src/server'),
    template: resolve('static/server-template.ejs'),
    entry: resolve('src/client/ssr/server-entry.js'),
    build: resolve('public/ssr/server'),
    bundle: resolve(`public/ssr/server/${serverBundleFile}`)
  },
  lib: {
    m2: resolve('m2'),
    vue: resolve('node_modules/vue/dist/vue.esm.js')
  }
};
