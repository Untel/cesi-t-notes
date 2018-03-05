import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    getNotesLoading: false,
    notes: [],
  },

  mutations: {
    GET_NOTES_LOADING: (state) => {
      state.getNotesLoading = true
    },
    GET_NOTES_SUCCESS: (state, payload) => {
      state.notes = payload;
      state.getNotesLoading = false
    },
    GET_NOTES_FAILURE: (state) => {
      state.getNotesLoading = false
    },
  },

  getters: {
    getNotesByStudent: (state, getters) => (studentId) => {
      return state.notes.filter(n => n.studentId === studentId)
    }
  },

  actions: {
    addNote: ({ commit, dispatch, state }, newNote) => {
      commit('ADD_NOTE_LOADING', newNote);
      Vue.api.post('/etudiant', newNote)
        .then(() => {
          commit('ADD_NOTE_SUCCESS', newNote);
          dispatch('snack/openSnack', { color: 'success', message: 'L\'enseignant à bien été ajouté' }, { root: true })
        })
        .catch(() => {
          commit('ADD_NOTE_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout de l\'enseignant' }, { root: true })
        })
    },
    getNotes: ({ commit, dispatch, state }, newNote) => {
      if (state.notes.length > 0) return;

      const data = [{
        id: 1,
        note: 15,
        studentId: 2,
      }, {
        id: 2,
        note: 12,
        studentId: 2,
      }, {
        id: 3,
        note: 10,
        studentId: 1,
      }, {
        id: 4,
        note: 9,
        studentId: 1,
      }]

      commit('GET_NOTES_LOADING', newNote)
      Vue.api.post('/class', newNote)
        .then(() => {
          commit('GET_NOTES_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_NOTES_SUCCESS', data)
          // commit('GET_NOTES_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des notes' }, { root: true })
        })
    },
  },
}
