<template>
  <section class="todo-list">
    <input type="text" class="add-todo" placeholder="接下来要做什么?" autofocus
           @keyup.enter="addTodo"/>
    <todo-item v-for="item in filterTodos" :key="item.id"
               :todo="item" @del="deleteTodo"/>
    <todo-tabs :filter="filter" :todos="todos"
               @toggle="toggleFilter" @clear="clearAllComplete"/>
    <!--<router-view/>-->
  </section>
</template>

<script>
  import TodoTabs from './tabs'
  import TodoItem from './item'

  export default {
    metaInfo: {
      title: 'Todo List Page'
    },
    props: ['id'],
    created() {
      this.num = 1
    },
    data() {
      return {
        todos: [],
        filter: 'All'
      }
    },
    mounted() {
      console.log(this.$route, this.$route.params, this.$route.query)
      console.log(`id: ${this.id}`) // 替代this.$route.params.id
      console.log('todo mounted')
    },
    computed: {
      filterTodos() {
        if (this.filter === 'All') return this.todos
        const isCompleted = this.filter === 'Completed'
        return this.todos.filter(item => item.completed === isCompleted)
      }
    },
    methods: {
      addTodo(e) {
        const val = e.target.value
        if (!val.trim().length) return

        this.todos.unshift({
          id: this.num++,
          content: val.trim(),
          completed: false
        })
        e.target.value = ''
      },
      deleteTodo(id) {
        this.todos = this.todos.filter(item => item.id !== id)
      },
      toggleFilter(state) {
        this.filter = state
      },
      clearAllComplete() {
        this.todos = this.todos.filter(item => !item.completed)
      }
    },
    components: {
      TodoTabs,
      TodoItem
    }
    // beforeRouteEnter(to, from, next) {
    //   console.log('todo before enter')
    //   next()
    //   // 此时拿不到组件的this
    //   // next(vm => {
    //   //   console.log(`after enter id = ${vm.id}`)
    //   // })
    // },
    // beforeRouteUpdate(to, from, next) {
    //   // 同一组件带不同参数时会调用
    //   console.log('todo before update')
    //   next()
    // },
    // beforeRouteLeave(to, from, next) {
    //   console.log('todo before leave')
    //   // if (global.confirm('are you sure to leave?')) {
    //   //   next()
    //   // }
    //   next()
    // }
  }
</script>

<style lang="less" scoped>
  @import "~@assets/css/todo/todo-list.less";
</style>
