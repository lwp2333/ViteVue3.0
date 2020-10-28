import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    author: {
      name: 'lwp',
      age: 24
    }
  },
  mutations: {
    setAuth(state, value) {
      state.author = value
    }
  },
  getters: {
    getAuthor(state) {
      return state.author
    }
  },
  actions: {},
  modules: {}
})
