import Vue from 'vue';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    addModuleLoading: false,
    getModulesLoading: false,
    modules: [],
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
  },
  
  actions: {
    addModule: ({ commit, dispatch, state }, newModule) => {
      commit('ADD_MODULE_LOADING', newModule);
      Vue.api.post('/class', newModule)
        .then(() => {
          commit('ADD_MODULE_SUCCESS', newModule);
          router.push('/modules')
          dispatch('snack/openSnack', { color: 'success', message: 'Le module à bien été ajouté' }, { root: true })
        })
        .catch(() => {
          // commit('ADD_MODULE_FAILURE');
          commit('ADD_MODULE_SUCCESS', newModule);
          router.push('/modules')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout du module' }, { root: true })
        })
    },
    getModules: ({ commit, dispatch, state }, newModule) => {
      const data = [{
        id: 1,
        name: 'Anglais',
        teacherId: 1
      }, {
        id: 2,
        name: 'Projet web',
        teacherId: 2,
      }, {
        id: 3,
        name: 'Anglais',
        teacherId: 2,
      }, {
        id: 4,
        name: 'Anglais',
        teacherId: 3,
      }]

      if (state.modules.length > 0) return;

      commit('GET_MODULES_LOADING', newModule)
      Vue.api.post('/class', newModule)
        .then(() => {
          commit('GET_MODULES_SUCCESS', data)
        })
        .catch((err) => {
          commit('GET_MODULES_SUCCESS', data)
          // commit('GET_MODULES_FAILURE')
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de la récupération des modules' }, { root: true })
        })
    },
  },
}
