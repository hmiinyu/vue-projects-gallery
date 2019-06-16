import TodoList from '@/views/todo'
import UserLogin from '@/views/login'

export default [{
  path: '/todo',
  name: 'todo',
  component: TodoList
  // 命名视图(多个router-view)
  // components: {
  //   default: TodoList,
  //   rv: UserLogin
  // },
  // meta: {
  //   title: 'Todo List',
  //   description: 'This is todo list page'
  // },
  // 需要在TodoList组件中加入router-view
  // children: [{
  //   path: 'test',
  //   component: UserLogin
  // }],
  // beforeEnter(to, from, next) {
  //   console.log('app route before enter')
  //   next()
  // }
}, {
  path: '/todo/:id',
  name: 'todo-item',
  component: TodoList,
  props: true
  // props: {
  //   id: 456
  // },
  // props: (route) => ({ id: route.query.a })
}, {
  path: '/login',
  name: 'login',
  component: UserLogin
  // 命名视图(多个router-view)
  // components: {
  //   default: UserLogin,
  //   rv: TodoList
  // }
}, /*, {
  path: '/login/exact',
  name: 'login-exact',
  component: UserLogin
} */ {
  path: '*',
  redirect: '/todo'
}]
