export default {
  updateText(state, payload) {
    console.log('login.text', payload)
    state.text = payload
  }
}
