export default {
  add ({ state, commit, rootState }, payload = '') {
    // commit('updateCount', rootState.count, { root: true })
    // commit('updateText', 'todo-action')
    // commit('login/updateText', 'todo-update-login-text', { root: true })
    commit('updateText', 'todo-action-' + payload)
  }
}
