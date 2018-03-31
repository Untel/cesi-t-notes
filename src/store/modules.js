import Vue from 'vue';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    addModuleLoading: false,
    getModulesLoading: false,
    getMyModulesLoading: false,
    modules: [],
    myModules: [],
  },

  mutations: {
    ADD_MODULE_LOADING: (state) => {
      state.addModuleLoading = true
    },
    ADD_MODULE_SUCCESS: (state, payload) => {
      state.modules.unshift(payload);
      state.addModuleLoading = false
    },
    ADD_MODULE_FAILURE: (state) => {
      state.addModuleLoading = false
    },
    
    GET_MODULES_LOADING: (state) => {
      state.getModulesLoading = true
    },
    GET_MODULES_SUCCESS: (state, payload) => {
      state.modules = payload;
      state.getModulesLoading = false
    },
    GET_MODULES_FAILURE: (state) => {
      state.getModulesLoading = false
    },

    GET_MY_MODULES_LOADING: (state) => {
      state.getMyModulesLoading = true
    },
    GET_MY_MODULES_SUCCESS: (state, payload) => {
      state.myModules = payload;
      state.getMyModulesLoading = false
    },
    GET_MY_MODULES_FAILURE: (state) => {
      state.getMyModulesLoading = false
    },
  },

  getters: {
    myModules: (state, getters, rootState) => () => {
      console.log(rootState.user, getters)
      if (rootState.user.role === 'teacher' && !!rootState.user.idTeacher) {
        return state.modules.filter(m => m.idTeacher === rootState.user.idTeacher)
      } else {
        console.log('No module for u')
        return []
      }
    },
  },
  
  actions: {
    addModule: ({ commit, dispatch, state }, newModule) => {
      commit('ADD_MODULE_LOADING', newModule)
      Vue.api.post('/modules', [newModule])
        .then(() => {
          commit('ADD_MODULE_SUCCESS', newModule);
          router.push('/modules')
          dispatch('snack/openSnack', { color: 'success', message: 'Le module à bien été ajouté' }, { root: true })
        })
        .catch(() => {
          commit('ADD_MODULE_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout du module' }, { root: true })
        })
    },
    getModules: ({ commit, dispatch, state }) => {
      if (state.modules.length > 0) return;

      commit('GET_MODULES_LOADING')
      Vue.api.get('/modules')
        .then(({data}) => {
          commit('GET_MODULES_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_MODULES_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des modules' }, { root: true })
        })
    },
    getMyModules: ({ commit, dispatch, state, rootState }) => {
      if (state.myModules.length > 0) return;

      commit('GET_MY_MODULES_LOADING')
      Vue.api.get(`/teachersmodules/${rootState.user.idTeacher}`)
        .then(({data}) => {
          commit('GET_MY_MODULES_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_MY_MODULES_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récuparation de vos modules' }, { root: true })
        })
    },
  },
}
