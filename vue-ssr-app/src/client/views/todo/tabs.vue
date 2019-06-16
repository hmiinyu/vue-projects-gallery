<template>
  <div class="todo-tabs">
    <span class="left">{{uncompletedTodoCount}} items left</span>
    <span class="tabs">
      <span v-for="item in ['All', 'Active', 'Completed']" :key="item"
            :class="['tab-item', filter === item ? 'active' : '']"
            @click="toggleFilter(item)">
        {{item}}
      </span>
    </span>
    <span class="right" @click="clearAllCompleted">Clear Completed</span>
  </div>
</template>

<script>
  export default {
    props: {
      filter: {
        type: String,
        required: true
      },
      todos: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        stateItems: ['All', 'Active', 'Completed']
      }
    },
    computed: {
      uncompletedTodoCount() {
        return this.todos.filter(item => !item.completed).length
      }
    },
    methods: {
      toggleFilter(item) {
        this.$emit('toggle', item)
      },
      clearAllCompleted() {
        this.$emit('clear')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@assets/css/todo/todo-tabs.less";
</style>