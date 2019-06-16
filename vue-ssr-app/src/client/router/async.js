export default [{
  path: '/',
  redirect: '/todo'
}, {
  path: '/todo',
  name: 'todo',
  component: () => import('@/views/todo')
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
}]
