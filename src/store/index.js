import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import router from '../router'

import snack from './snack'
import classes from './classes'
import modules from './modules'
import teachers from './teachers'
import students from './students'
import trainings from './trainings'

Vue.use(Vuex)

const debug = true

export default new Vuex.Store({
  state: {
    loading: false,
    isDark: false,
    isLoggedIn: false,
    user: null,
  },

  mutations: {
    LOGIN_FAILURE: (state, payload) => {
      state.loading = false
    },
    LOGIN_SUCCESS: (state, payload) => {
      state.isLoggedIn = true
      state.user = {
        firstname: 'yolo',
        lastname: 'yala',
        role: payload.role,
        idTeacher: 3,
      }
    },
    LOGIN_LOADING: (state, payload) => {
      state.loading = true;
    },
    TOGGLE_DARK_MODE: (state) => {
      state.isDark = !state.isDark;
    }
  },

  getters: {
    isAllowed: (state, getters, rootState) => (roles) => {
      return state.user && roles.includes(state.user.role);
    }
  },
  
  actions: {
    login: ({ commit, dispatch, state }, credentials) => {
      commit('LOGIN_LOADING', );

      commit('LOGIN_SUCCESS', credentials);
      setTimeout(() => {
        router.push({ path: '/' });
        dispatch('snack/openSnack', { color: 'success', message: 'Vous êtes bien connecté' })
      }, 3000);
      // Vue.api.post('login', credentials)
      //   .then(() => {
      //     commit('LOGIN_SUCCESS');
      //     router.push({ path: '/' });
      //   })
      //   .catch(() => {
      //     // TODO COMMENT HERE

          
      //     // commit('LOGIN_FAILURE');
      //     // dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue' })
      //   })
    },
  },

  modules: {
    snack,
    classes,
    modules,
    teachers,
    students,
    trainings,
  },

  strict: debug,
  plugins: debug ? [createLogger()] : []
})
