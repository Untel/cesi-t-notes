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
    getClassesByFormation: (state) => (formationId) => {
      state.classes.filter(c => c.formationId === formationId);
    }
  },
  
  actions: {
    addClass: ({ commit, dispatch, state }, newClass) => {
      commit('ADD_CLASS_LOADING', newClass);
      Vue.api.post('/formations', newClass)
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

      commit('GET_CLASSES_LOADING', newClass)
      const data = [
        {
          id: 1,
          code: 'BR001',
          year: 2015,
          formationId: 2
        },
        {
          id: 4,
          code: 'BR005',
          year: 2016,
          formationId: 3
        },
        {
          id: 3,
          code: 'BR004',
          year: 2017,
          formationId: 2
        },
        {
          id: 4,
          code: 'BR003',
          year: 2017,
          formationId: 1
        },
      ]

      Vue.api.get('/formations', newClass)
        .then(() => {
          commit('GET_CLASSES_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_CLASSES_SUCCESS', data)
          // commit('GET_CLASSES_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des promotions' }, { root: true })
        })
    },
  },
}
