<template>
  <div id="app">
    <div class="cover"></div>
    <app-header/>
    <router-link to="/todo">todo</router-link>
    <router-link to="/todo/123">todo-123</router-link>
    <router-link to="/todo/456">todo-456</router-link>
    <!--<router-link :to="{name:'todo'}">todo</router-link>-->
    <router-link to="/login">login</router-link>
    <!--<router-link to="/login/exact">login exact</router-link>-->
    <!--Vuex功能测试-->
    <p>{{counter}}--{{firstName}}--{{last}}-{{fullName}}</p>
    <p>todo module: {{todo_text}}--{{todo_fullText}}</p>
    <p>login module: {{login_text}}</p>
    <!--也可单独作用于某个组件-->
    <transition name="fade">
      <router-view/>
    </transition>
    <app-footer/>
    <!--命名视图-->
    <!--<router-view name="rv"/>-->
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from '@m2/m2-vuex'
  import AppHeader from '@/components/app-header'
  import AppFooter from '@/components/app-footer'

  export default {
    metaInfo: {
      titleTemplate: 'Miracle\'s Todo App - %s'
    },
    mounted() {
      // this.$store.state.count = 3 // 建议不建议直接修改state(而是通过mutations或actions)，可以添加strict做限制

      this.updateCount(1)
      // this.todo_updateText('123')
      this.td_newUpdateText('123')
      this.login_updateText('456')
      this.updateCountAsync({ num: 5, time: 2000 })
      this.todo_add('~~~~~~~')
    },
    computed: {
      ...mapState(['count:counter',
        'firstName',
        { 'lastName:last': (state) => state.lastName + '*' },
        'todo/text',
        'login/text'
      ]),
      ...mapGetters(['fullName', 'todo/fullText', 'todo/fullText2'])
    },
    methods: {
      ...mapMutations(['updateCount', 'todo:td/updateText:newUpdateText', 'login/updateText']),
      ...mapActions(['updateCountAsync', 'todo/add'])
    },
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>

<style lang="less" scoped>
  @import "~@assets/css/app/main.less";
</style>
