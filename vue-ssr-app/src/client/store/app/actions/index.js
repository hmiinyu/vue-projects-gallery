export default {
  updateCountAsync(store, payload) {
    setTimeout(() => {
      store.commit('updateCount', payload.num)
    }, payload.time)
  }
}
