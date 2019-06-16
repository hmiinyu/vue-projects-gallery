export default {
  updateText(state, payload) {
    console.log('todo.text', payload)
    state.text = payload
  }
}
