import Vue from 'vue';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    getTeachersLoading: false,
    addMarkLoading: false,
    addTeacherLoading: false,
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
    ADD_TEACHER_LOADING: (state) => {
      state.addTeacherLoading = true
    },
    ADD_TEACHER_SUCCESS: (state, payload) => {
      state.addTeacherLoading = false
    },
    ADD_TEACHER_FAILURE: (state) => {
      state.addTeacherLoading = false
    },
    ADD_MARK_LOADING: (state) => {
      state.addMarkLoading = true
    },
    ADD_MARK_ENDED: (state, payload) => {
      state.getTeachersLoading = false
    },
  },

  getters: {
    getTeacherNameById: (state, getters) => (id) => {
      const teacher = state.teachers.find(t => parseInt(t.id, 10) === parseInt(id, 10))
      if (teacher) {
        return `${teacher.firstname} ${teacher.name}`
      } else {
        return 'N/A';
      }
    }
  },
  
  actions: {
    addTeacher: ({ commit, dispatch, state }, newTeacher) => {
      commit('ADD_TEACHER_LOADING');
      Vue.api.post('/teachers', [newTeacher])
        .then(({ data }) => {
          commit('ADD_TEACHER_SUCCESS', data);
          dispatch('snack/openSnack', { color: 'success', message: 'L\'enseignant à bien été ajouté' }, { root: true })
          router.push({ path: '/teachers' });
        })
        .catch(() => {
          commit('ADD_TEACHER_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout de l\'enseignant' }, { root: true })
        })
    },
    getTeachers: ({ commit, dispatch, state }, newTeacher) => {
      commit('GET_TEACHERS_LOADING', newTeacher)
      Vue.api.get('/teachers', newTeacher)
        .then(({data}) => {
          commit('GET_TEACHERS_SUCCESS', data);
        })
        .catch((err) => {
          commit('GET_TEACHERS_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des enseignants' }, { root: true })
        })
    },

    addMark: ({ commit, dispatch, state }, marks) => {

      commit('ADD_MARK_LOADING')
      Vue.api.post('/marks', marks)
        .then(({ data }) => {
          commit('ADD_MARK_ENDED')
          dispatch('snack/openSnack', { color: 'success', message: 'Les notes ont bien été sauvegardées' }, { root: true })
          router.go(-1);
        })
        .catch((err) => {
          commit('ADD_MARK_ENDED')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la sauvegarde des notes' }, { root: true })
        })
    },
  },
}
