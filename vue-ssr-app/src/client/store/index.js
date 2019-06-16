import Vue from 'vue'
import Vuex from 'vuex'
import { VuexFactory } from '@m2/m2-vuex'
import AppModule from './app'
import TodoModule from './todo'
import LoginModule from './login'

Vue.use(Vuex)

export default () => VuexFactory.createStore(AppModule, {
  modules: {
    todo: TodoModule,
    login: LoginModule
  }
  // plugins: [
  //   (store) => {
  //     console.log('my plugin invoked!')
  //   }
  // ]
})
