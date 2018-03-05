import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    getStudentsLoading: false,
    students: [],
  },

  mutations: {
    GET_STUDENTS_LOADING: (state) => {
      state.getStudentsLoading = true
    },
    GET_STUDENTS_SUCCESS: (state, payload) => {
      state.students = payload;
      state.getStudentsLoading = false
    },
    GET_STUDENTS_FAILURE: (state) => {
      state.getStudentsLoading = false
    },
  },

  getters: {
    getStudentById: (state, getters) => (id) => {
      return state.students.find(t => t.id === id)
    },
    getStudentsByClass: (state, getters) => (classId) => {
      return state.students.filter(s => s.classId === classId)
    }
  },

  actions: {
    addStudent: ({ commit, dispatch, state }, newStudent) => {
      commit('ADD_STUDENT_LOADING', newStudent);
      Vue.api.post('/etudiant', newStudent)
        .then(() => {
          commit('ADD_STUDENT_SUCCESS', newStudent);
          dispatch('snack/openSnack', { color: 'success', message: 'L\'enseignant à bien été ajouté' }, { root: true })
        })
        .catch(() => {
          commit('ADD_STUDENT_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout de l\'enseignant' }, { root: true })
        })
    },
    getStudents: ({ commit, dispatch, state }, newStudent) => {
      if (state.students.length > 0) return;

      const data = [{
        id: 1,
        firstname: 'Yann',
        lastname: 'Lemoal',
        classId: 1,
      }, {
        id: 2,
        firstname: 'Adrien',
        lastname: 'Fernandes',
        classId: 1,
      }, {
        id: 3,
        firstname: 'Kevin',
        lastname: 'BZ',
        classId: 1,
      }, {
        id: 4,
        firstname: 'Clement',
        lastname: 'Deboos',
        classId: 2,
      }]
      commit('GET_STUDENTS_LOADING', newStudent)
      Vue.api.post('/class', newStudent)
        .then(() => {
          commit('GET_STUDENTS_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_STUDENTS_SUCCESS', data)
          // commit('GET_STUDENTS_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des students' }, { root: true })
        })
    },
  },
}
