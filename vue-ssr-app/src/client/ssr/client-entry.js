import createApp from '@/ssr/create-app'

const { app, router } = createApp()

router.onReady(() => {
  app.$mount('#root')
})
