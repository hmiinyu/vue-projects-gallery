const Router = require('koa-router')
const send = require('koa-send')

const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('*', async (ctx) => send(ctx, ctx.path))

module.exports = staticRouter
