import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    getFormationsLoading: false,
    formations: [],
  },

  mutations: {
    GET_FORMATIONS_LOADING: (state) => {
      state.getFormationsLoading = true
    },
    GET_FORMATIONS_SUCCESS: (state, payload) => {
      state.formations = payload;
      state.getFormationsLoading = false
    },
    GET_FORMATIONS_FAILURE: (state) => {
      state.getFormationsLoading = false
    },
  },

  getters: {
  },

  actions: {
    addFormation: ({ commit, dispatch, state }, newFormation) => {
      commit('ADD_FORMATION_LOADING', newFormation);
      Vue.api.post('/etudiant', newFormation)
        .then(() => {
          commit('ADD_FORMATION_SUCCESS', newFormation);
          dispatch('snack/openSnack', { color: 'success', message: 'L\'enseignant à bien été ajouté' }, { root: true })
        })
        .catch(() => {
          commit('ADD_FORMATION_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout de l\'enseignant' }, { root: true })
        })
    },
    getFormations: ({ commit, dispatch, state }) => {
      if (state.formations.length > 0) return;

      commit('GET_FORMATIONS_LOADING')
      Vue.api.get('/formations')
        .then(() => {
          commit('GET_FORMATIONS_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_FORMATIONS_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des formations' }, { root: true })
        })
    },
  },
}
