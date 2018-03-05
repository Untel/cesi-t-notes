export default {
  namespaced: true,
  state: {
    timeout: 6000,
    color: 'primary',
    message: '',
    vertical: false,
    open: false,
  },
  mutations: {
    CLOSE_SNACK: (state) => {
      state.open = false;
    },
    OPEN_SNACK: (state, payload) => {
      if (payload && payload.color) {
        state.color = payload.color;
      }
      if (payload && payload.timeout) {
        state.timeout = payload.timeout;
      }
      if (payload && payload.message) {
        state.message = payload.message;
      }
      state.open = true;
      return state;
    },
  },
  actions: {
    openSnack: ({ commit, state }, payload) => {
      commit('OPEN_SNACK', payload);
      setTimeout(() => {
        if(state.open) commit('CLOSE_SNACK')
      }, state.timeout);
    },
  }
}