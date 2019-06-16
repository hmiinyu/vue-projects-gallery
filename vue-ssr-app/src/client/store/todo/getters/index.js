export default {
  fullText(state, getters, rootState) {
    return state.text + ',todo-getter' + ',root' + rootState.count + ',login' + rootState.login.text
  },
  fullText2(state) {
    return state.text + ',todo2-getter2'
  }
}
