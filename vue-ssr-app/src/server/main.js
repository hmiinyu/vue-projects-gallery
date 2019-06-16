const Koa = require('koa')
const send = require('koa-send')

require('./utils/ready')(({ env, paths, constants }) => {
  const router = env.isDev ? require('@server/router/dev.ssr') : require('@server/router/prd.ssr')
  const staticRouter = require('@server/utils/static')
  const { serverHost, serverPort } = constants
  const app = new Koa()

  app.use(async (ctx, next) => {
    try {
      // console.log(`request path ${ctx.path}`)
      await next()
    } catch (err) {
      console.error(err)
      ctx.status = 500
      if (env.isDev) {
        ctx.body = err.message
      } else {
        ctx.body = 'please try again later'
      }
    }
  })

  app.use(async (ctx, next) => {
    if (ctx.path.endsWith('/favicon.ico')) {
      await send(ctx, '/favicon.ico', { root: paths.app.root })
    } else {
      await next()
    }
  })

  app.use(staticRouter.routes()).use(router.allowedMethods())
  app.use(router.routes()).use(router.allowedMethods())

  app.listen(serverPort, serverHost, () => {
    console.log(`server is listening on ${serverHost}:${serverPort}`)
  })
})
