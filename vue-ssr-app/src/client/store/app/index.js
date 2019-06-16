import initialState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
  name: 'app',
  state: initialState,
  mutations,
  getters,
  actions
}
