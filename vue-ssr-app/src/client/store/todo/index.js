import initialState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
  name: 'todo',
  namespaced: true,
  state: initialState,
  mutations,
  getters,
  actions
}
