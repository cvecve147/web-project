export const state = () => ({
  list: []
})

export const mutations = {
  check(state, text) {
    for (let index = 0; index < state.list.length; index++) {
      if (state.list[index].name == text) {
        state.list[index].number = state.list[index].number + 1
        return false
      }
    }
    state.list.push({
      name: text,
      number: 1
    })
  },
  add(state, text) {
    mutations.check(state, text)
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
