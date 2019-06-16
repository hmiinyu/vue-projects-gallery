export default (router) => {
  if (router) {
    router.beforeEach((to, from, next) => {
      console.log('before each invoked!')
      // if (to.fullPath === '/todo') {
      //   next('/login')
      //   // next({
      //   //   path: '/login',
      //   //   replace: true
      //   // })
      //   // next({
      //   //   name: 'login'
      //   // })
      // } else {
      //   next()
      // }
      next()
    })

    router.beforeResolve((to, from, next) => {
      console.log('before resolved invoked!')
      next()
    })

    router.afterEach((to, from) => {
      console.log('after each invoked!')
    })
  }
}
