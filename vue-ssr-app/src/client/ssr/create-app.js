import Vue from 'vue'
import Meta from 'vue-meta'
import App from '@/views/app.vue'
import createRouter from '@/router'
import createStore from '@/store'
import '@assets/css/app/global.less'

Vue.use(Meta)

export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return { app, router, store }
}
