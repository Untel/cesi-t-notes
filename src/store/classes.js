import Vue from 'vue';
import router from '@/router'

export default {
  namespaced: true,

  state: {
    selectedStudent: null,
    getClassesLoading: false,
    getMarksAndStudentsLoading: false,
    addClassLoading: false,    
    classes: [],
    marksAndStudents: [],
  },

  mutations: {
    SELECT_STUDENT: (state, payload) => {
      state.selectedStudent = payload
    },
    DESELECT_STUDENT: () => {
      state.selectedStudent = null
    },
    ADD_CLASS_LOADING: (state) => {
      state.addClassLoading = true
    },
    ADD_CLASS_SUCCESS: (state, payload) => {
      state.addClassLoading = false
      state.classes.unshift({ name: payload.name, students: [] });
    },
    ADD_CLASS_FAILURE: (state) => {
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

    GET_MARKS_AND_STUDENTS_BY_MODULE_LOADING: (state) => {
      state.getMarksAndStudentsLoading = true
    },
    GET_MARKS_AND_STUDENTS_BY_MODULE_SUCCESS: (state, payload) => {
      state.marksAndStudents = payload;
      state.getMarksAndStudentsLoading = false
    },
    GET_MARKS_AND_STUDENTS_BY_MODULE_FAILURE: (state) => {
      state.getMarksAndStudentsLoading = false
    },
  },

  getters: {
    getClassesByTraining: (state) => (idTraining) => {
      return state.classes.filter(c => parseInt(c.idTraining, 10) === parseInt(idTraining, 10));
    },
  },
  
  actions: {
    addClass: ({ commit, dispatch, state }, newClass) => {
      commit('ADD_CLASS_LOADING', newClass);
      Vue.api.post('/trainingclass', [newClass])
        .then(() => {
          router.push({ path: '/classes' })
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
        .then(({ data }) => {
          commit('GET_CLASSES_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_CLASSES_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des promotions' }, { root: true })
        })
    },

    getMarksAndStudents: ({ commit, dispatch, state }, { idModule, idClass }) => {
      if (state.marksAndStudents.length > 0) return;

      commit('GET_MARKS_AND_STUDENTS_BY_MODULE_LOADING')

      Vue.api.get(`/trainingclassmarks/${idModule}/${idClass}`)
        .then(({ data }) => {
          console.log(data)
          commit('GET_MARKS_AND_STUDENTS_BY_MODULE_SUCCESS', data)
        })
        .catch((err) => {
          console.log(err);
          commit('GET_MARKS_AND_STUDENTS_BY_MODULE_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des promotions' }, { root: true })
        });
    },
  },
}
