/**
 * @file 封装Vuex创建工厂
 * @author Miracle He
 * @version v1.0.0
 * @description 创建Store, initialState, Action(sync/async), Reducer(sync/async)
 * @createDate 2019-04-10
 */
import Vuex from 'vuex';

export class VuexFactory {
  /**
   * @method 创建应用的Store
   * @param {Object} [Required] 全局模块(app)对应的配置项(state, mutations, getters, actions)
   * @param {Object} [Optional] modules Vuex模块配置
   * @param {Object} [Optional] plugins Vuex插件配置
   * @param {Object} [Optional] hot Vuex是否启用热加载(默认启用)
   */
  static createStore(appModule, { modules, plugins, hot = true } = {}) {
    let options = appModule.__esModule ? appModule.default : appModule;
    options.strict = process.env.NODE_ENV === 'development';
    if (modules) {
      options = { ...options, modules };
    }
    if (plugins) {
      options = { ...options, plugins };
    }

    const store = new Vuex.Store(options);

    if (module.hot) {
      module.hot.accept([
        '@/store/app/state',
        '@/store/app/mutations',
        '@/store/app/getters',
        '@/store/app/actions'
      ], () => {
        store.hotUpdate({
          state: require('@/store/app/state').default,
          mutations: require('@/store/app/mutations').default,
          getters: require('@/store/app/getters').default,
          actions: require('@/store/app/actions').default
        })
      })
    }

    return store;
  }
}
