import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import snack from './snack'
import router from '../router'

Vue.use(Vuex)

const debug = true

export default new Vuex.Store({
  state: {
    loading: false,
    isDark: false,
    isLoggedIn: false,
    user: null,
    selectedStudent: null,
  },

  mutations: {
    SELECT_STUDENT: (state, payload) => {
      state.selectedStudent = payload
    },
    DESELECT_STUDENT: () => {
      state.selectedStudent = null
    },
    LOGIN_FAILURE: (state, payload) => {
      state.loading = false
    },
    LOGIN_SUCCESS: (state, payload) => {
      state.isLoggedIn = true
      state.user = {
        firstname: 'yolo',
        lastname: 'yala',
        role: 'admin',
      }
    },
    LOGIN_LOADING: (state, payload) => {
      state.loading = true;
    },

  },
  
  actions: {
    login: ({ commit, dispatch, state }, credentials) => {
      commit('LOGIN_LOADING');
      Vue.api.post('login', credentials)
        .then(() => {
          commit('LOGIN_SUCCESS');
          router.push({ path: '/' });
        })
        .catch(() => {
          // TODO COMMENT HERE
          // commit('LOGIN_SUCCESS');
          // router.push({ path: '/' });
          
          commit('LOGIN_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue' })
        })
    },
  },

  modules: {
    snack,
  },

  strict: debug,
  plugins: debug ? [createLogger()] : []
})
