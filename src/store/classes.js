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
    ADD_STUDENT: (state, { classId, student }) => {
      const classToAdd = state.classes.find(name === classId);
      if (classToAdd) {
        classToAdd.unshift(student);
      }
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
  
  actions: {
    addClass: ({ commit, dispatch, state }, newClass) => {
      commit('ADD_CLASS_LOADING', newClass);
      Vue.api.post('/class', newClass)
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
          name: 'RIL 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Kevin', lastname: 'Buzit' },
            { id: 3, firstname: 'Kevin', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Buzit' },
            { id: 5, firstname: 'Kevin', lastname: 'Kevin' },
            { id: 6, firstname: 'Kevin', lastname: 'Kevin' },
            { id: 7, firstname: 'Kevin', lastname: 'Kevin' },
            { id: 8, firstname: 'Kevin', lastname: 'Kevin' },
            { id: 9, firstname: 'Kevin', lastname: 'Kevin' },              
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        },
        {
          name: 'RIRSR 2017',
          students: [
            { id: 1, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 2, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 3, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 4, firstname: 'Adrien', lastname: 'Fernandes' },
            { id: 5, firstname: 'Adrien', lastname: 'Fernandes' },
          ]
        }
      ]
      Vue.api.post('/class', newClass)
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
