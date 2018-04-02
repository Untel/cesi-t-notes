import Vue from 'vue';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    getStudentsLoading: false,
    addStudentLoading: false,
    getMyMarksLoading: false,
    myMarks: [],
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
    GET_MY_MARKS_LOADING: (state) => {
      console.log('Gettings marks')
      state.getMyMarksLoading = true
    },
    GET_MY_MARKS_SUCCESS: (state, payload) => {
      state.myMarks = payload;
      state.getMyMarksLoading = false
    },
    GET_MY_MARKS_FAILURE: (state) => {
      state.getMyMarksLoading = false
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
    },
    hiddenMark: (state, getters) => (note) => {
      if (note === null || note === undefined) return {
        value: 'N/A',
        color: 'default'
      }
      switch(true) {
        case note > 16 :  return {
          value: 'A',
          color: 'success'
        }
        case note > 12  :  return {
          value: 'B',
          color: 'primary'
        }
        case note > 8 :  return {
          value: 'C',
          color: 'warning'
        }
        case note < 8 && note >= 0 : return {
          value: 'D',
          color: 'error'
        }
        default: return {
          value: 'abs',
          color: 'default'
        };
      }
    }
  },

  actions: {
    addStudent: ({ commit, dispatch, state }, newStudent) => {
      commit('ADD_STUDENT_LOADING', [newStudent]);
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
    getStudents: ({ commit, dispatch, state }) => {
      if (state.students.length > 0) return;

      commit('GET_STUDENTS_LOADING')
      Vue.api.get('/students')
        .then(({data}) => {
          commit('GET_STUDENTS_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_STUDENTS_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des étudiants' }, { root: true })
        })
    },
    getMyMarks: ({ commit, dispatch, state, rootState }) => {
      if (state.myMarks.length > 0) return;
      commit('GET_MY_MARKS_LOADING')
      Vue.api.get(`/studentsmarks/${/*rootState.user.id*/1}`)
        .then(({ data }) => {
          commit('GET_MY_MARKS_SUCCESS', data.marks)
        })
        .catch((err) => {
          commit('GET_MY_MARKS_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération de vos notes' }, { root: true })
        })
    },
  },
}
