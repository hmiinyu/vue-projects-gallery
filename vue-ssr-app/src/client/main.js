import Vue from 'vue'
import Meta from 'vue-meta'
import App from '@/views/app.vue'
import createRouter from '@/router'
import createStore from '@/store'
import '@assets/css/app/global.less'

Vue.use(Meta)

const router = createRouter()
const store = createStore()

// store.watch((state) => state.count + 1, (newCount) => {
//   console.log(`new count watch: ${newCount}`)
// })
//
// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

// store.subscribeAction((action, state) => {
//   console.log(action.type)
//   console.log(action.payload)
// })

new Vue({
  el: '#root',
  router,
  store,
  render: (h) => h(App)
})
