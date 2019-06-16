const axios = require('axios')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const Router = require('koa-router')
const MemoryFS = require('memory-fs')
const ServerRenderer = require('vue-server-renderer')
const serverConfig = require('@build/webpack/server.config')
const serverRender = require('@server/utils/render')
const paths = require('@build/misc/paths')
const { publicPath, clientManifestFile, serverBundleFile, serverEncoding, serverLoadingText } = require('@build/misc/constants')

const mfs = new MemoryFS()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(serverConfig.output.path, serverBundleFile)
  serverBundle = JSON.parse(mfs.readFileSync(bundlePath, serverEncoding))
  // console.log('new server bundle generated')
})

const router = new Router()
router.get('*', async (ctx) => {
  if (!serverBundle) {
    ctx.body = serverLoadingText
    return
  }

  const request = await axios.get(`${publicPath}${clientManifestFile}`)
  const template = fs.readFileSync(paths.server.template, serverEncoding)
  const renderer = ServerRenderer.createBundleRenderer(serverBundle, {
    inject: false,
    clientManifest: request.data
  })

  await serverRender(ctx, renderer, template)
})

module.exports = router
