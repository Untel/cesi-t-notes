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
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log('Is still logged in', storedUser)
export default new Vuex.Store({
  state: {
    loading: false,
    isDark: false,
    isLoggedIn: !!storedUser,
    user: storedUser ? storedUser : {},
  },

  mutations: {
    LOGIN_FAILURE: (state, payload) => {
      state.loading = false
    },
    LOGIN_SUCCESS: (state, payload) => {
      localStorage.setItem('user', JSON.stringify(payload));
      state.isLoggedIn = true
      state.user = payload;
    },
    LOGIN_LOADING: (state, payload) => {
      state.loading = true;
    },
    TOGGLE_DARK_MODE: (state) => {
      state.isDark = !state.isDark;
    },

    LOGOUT: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      router.push({ path: '/login' })
    }
  },

  getters: {
    isAllowed: (state, getters, rootState) => (roles) => {
      console.log('Is allowed ?', state.user, roles)
      return state.user && roles.includes(state.user.role);
    }
  },
  
  actions: {
    login: ({ commit, dispatch, state }, credentials) => {
      commit('LOGIN_LOADING', )
      Vue.api.post('/login', { login: credentials.username, password: credentials.password })
        .then(({ data }) => {
          const user = JSON.parse(data);
          console.log(user);
          commit('LOGIN_SUCCESS', user)
          dispatch('snack/openSnack', { color: 'success', message: `Bonjour ${user.firstname}` })
          console.log('Will redirect')
          router.push({ path: '/' })
        })
        .catch(error => {
          console.log('Err at login', error);
          dispatch('snack/openSnack', { color: 'error', message: 'Une erreure s\'est produite' });
        });
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
