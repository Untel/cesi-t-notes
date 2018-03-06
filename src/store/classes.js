import Vue from 'vue';

export default {
  namespaced: true,

  state: {
    selectedStudent: null,
    getClassesLoading: false,
    addClassLoading: false,    
    classes: []
  },

  mutations: {
    SELECT_STUDENT: (state, payload) => {
      state.selectedStudent = payload
    },
    DESELECT_STUDENT: () => {
      state.selectedStudent = null
    },
    ADD_CLASSES_LOADING: (state) => {
      state.addClassLoading = true
    },
    ADD_CLASSES_SUCCESS: (state, payload) => {
      state.addClassLoading = false
      state.classes.unshift({ name: payload.name, students: [] });
    },
    ADD_CLASSES_FAILURE: (state) => {
      state.addClassLoading = false
    },
    GET_CLASSES_LOADING: (state) => {
      state.getClassesLoading = true
    },
    GET_CLASSES_SUCCESS: (state, payload) => {
      state.classes = payload;
      state.getClassesLoading = false
    },
    GET_CLASSES_FAILURE: (state) => {
      state.getClassesLoading = false
    },
  },

  getters: {
    getClassesBytraining: (state) => (idtraining) => {
      state.classes.filter(c => c.idTraining === idTraining);
    },
  },
  
  actions: {
    addClass: ({ commit, dispatch, state }, newClass) => {
      commit('ADD_CLASS_LOADING', newClass);
      Vue.api.post('/trainingclass', [newClass])
        .then(() => {
          commit('ADD_CLASS_SUCCESS', newClass);
          dispatch('snack/openSnack', { color: 'success', message: 'La promotion à bien été ajouté' }, { root: true })
        })
        .catch(() => {
          commit('ADD_CLASS_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout de la promotion' }, { root: true })
        })
    },
    getClasses: ({ commit, dispatch, state }, newClass) => {
      if (state.classes.length > 0) return;

      commit('GET_CLASSES_LOADING')

      Vue.api.get('/trainingclass')
        .then(({data}) => {
          commit('GET_CLASSES_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_CLASSES_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des promotions' }, { root: true })
        })
    },
  },
}
