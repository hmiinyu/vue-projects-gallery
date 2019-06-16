import createApp from '@/ssr/create-app'

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    router.push(context.url)
    router.onReady(() => {
      const components = router.getMatchedComponents()
      if (!components.length) {
        return reject(new Error('no matched components'))
      }

      context.meta = app.$meta()
      resolve(app)
    })
  })
}
