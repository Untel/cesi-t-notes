import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    getTrainingsLoading: false,
    trainings: [],
  },

  mutations: {
    GET_TRAININGS_LOADING: (state) => {
      state.getTrainingsLoading = true
    },
    GET_TRAININGS_SUCCESS: (state, payload) => {
      state.trainings = payload;
      state.getTrainingsLoading = false
    },
    GET_TRAININGS_FAILURE: (state) => {
      state.getTrainingsLoading = false
    },
  },

  getters: {
    getClassName: (state) => (_class) => {
      if (!_class) return 'N/A';
      const training = state.trainings.find(t => t.id === parseInt(_class.idTraining))
      return `${training ? training.code : ''} ${_class.year} - ${_class.students.length} étudiant${_class.students.length > 1 ? 's' : ''}`
    },

    getTrainingsByModule: (state, getters, rootState) => (moduleId) => {
      console.log(moduleId);
      return state.trainings.filter(t => {
        console.log('Training ', t)
        return t.modules.some(tm => {
          console.log('TModule', tm)
          return parseInt(tm.idModule, 10) === parseInt(moduleId, 10)
        })
      })
    },
  },

  actions: {
    addTraining: ({ commit, dispatch, state }, newtraining) => {
      commit('ADD_TRAINING_LOADING', newtraining);
      Vue.api.post('/trainings')
        .then(() => {
          commit('ADD_TRAINING_SUCCESS', newtraining);
          dispatch('snack/openSnack', { color: 'success', message: 'L\'enseignant à bien été ajouté' }, { root: true })
        })
        .catch(() => {
          commit('ADD_TRAINING_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout de la formation' }, { root: true })
        })
    },
    getTrainings: ({ commit, dispatch, state }) => {
      if (state.trainings.length > 0) return;

      commit('GET_TRAININGS_LOADING')
      Vue.api.get('/trainings')
        .then(({data}) => {
          commit('GET_TRAININGS_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_TRAININGS_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des formations' }, { root: true })
        })
    },
  },
}
