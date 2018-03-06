import Vue from 'vue';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    getStudentsLoading: false,
    students: [],
  },

  mutations: {

    ADD_STUDENT_LOADING: (state) => {
      state.addStudentLoading = true
    },
    ADD_STUDENT_SUCCESS: (state, payload) => {
      state.addStudentLoading = false
      state.students.unshift(payload);
    },
    ADD_STUDENT_FAILURE: (state) => {
      state.addStudentLoading = false
    },
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
    getStudentNameById: (state, getters) => (id) => {
      const student = state.students.find(t => t.id === id)
      if (student) {
        return `${student.firstname} ${student.name}`
      } else {
        return 'N/A';
      }
    },
    getStudentsByClass: (state, getters) => (idClass) => {
      return state.students.filter(s => s.idClass === idClass)
    }
  },

  actions: {
    addStudent: ({ commit, dispatch, state }, newStudent) => {
      commit('ADD_STUDENT_LOADING', newStudent);
      Vue.api.post('/students', newStudent)
        .then(() => {
          router.push({ path: '/' })
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

      commit('GET_STUDENTS_LOADING')
      Vue.api.get('/students')
        .then(({data}) => {
          commit('GET_STUDENTS_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_STUDENTS_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des students' }, { root: true })
        })
    },
  },
}
