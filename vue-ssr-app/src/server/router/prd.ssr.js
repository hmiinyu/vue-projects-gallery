const fs = require('fs')
const Router = require('koa-router')
const ServerRenderer = require('vue-server-renderer')
const serverRender = require('@server/utils/render')
const paths = require('@build/misc/paths')
const clientManifest = require('@public/client/vue-ssr-client-manifest.json')
const { serverEncoding } = require('@build/misc/constants')

const renderer = ServerRenderer.createBundleRenderer(paths.server.bundle, {
  inject: false,
  clientManifest
})

const template = fs.readFileSync(paths.server.template, serverEncoding)

const router = new Router()
router.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = router
