import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
// import routes from './async'
// import guard from './guard'

Vue.use(Router)

export default () => {
  const router = new Router({
    routes,
    mode: 'history', // default 'hash'
    // base: '/app/',
    // linkActiveClass: 'active-link',
    // linkExactActiveClass: 'exact-active-link',
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   }
    //   return {
    //     x: 0, y: 0 // 返回到顶部
    //   }
    // },
    // parseQuery(query) {
    // },
    // stringifyQuery(object) {
    // },
    fallback: true // 当浏览器不支持history模式时，自动转到hash router上
  })

  // 配置路由守卫
  // guard(router)

  return router
}
