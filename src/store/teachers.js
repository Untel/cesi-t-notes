import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    getTeachersLoading: false,
    teachers: [],
  },

  mutations: {
    GET_TEACHERS_LOADING: (state) => {
      state.getTeachersLoading = true
    },
    GET_TEACHERS_SUCCESS: (state, payload) => {
      state.teachers = payload;
      state.getTeachersLoading = false
    },
    GET_TEACHERS_FAILURE: (state) => {
      state.getTeachersLoading = false
    },
  },

  getters: {
    getTeacherById: (state, getters) => (id) => {
      return state.teachers.find(t => t.id === id)
    }
  },
  
  actions: {
    addTeacher: ({ commit, dispatch, state }, newTeacher) => {
      commit('ADD_TEACHER_LOADING', newTeacher);
      Vue.api.post('/class', newTeacher)
        .then(() => {
          commit('ADD_TEACHER_SUCCESS', newTeacher);
          dispatch('snack/openSnack', { color: 'success', message: 'L\'enseignant à bien été ajouté' }, { root: true })
        })
        .catch(() => {
          commit('ADD_TEACHER_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout de l\'enseignant' }, { root: true })
        })
    },
    getTeachers: ({ commit, dispatch, state }, newTeacher) => {
      if (state.teachers.length > 0) return;

      const data = [{
        id: 1,
        name: 'Yann Payet'
      }, {
        id: 2,
        name: 'David Martin',
      }, {
        id: 3,
        name: 'Horacio Gonzalez',
      }, {
        id: 4,
        name: 'Adrien Fernandes',
      }]
      commit('GET_TEACHERS_LOADING', newTeacher)
      Vue.api.post('/class', newTeacher)
        .then(() => {
          commit('GET_TEACHERS_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_TEACHERS_SUCCESS', data)
          // commit('GET_TEACHERS_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des teachers' }, { root: true })
        })
    },
  },
}
