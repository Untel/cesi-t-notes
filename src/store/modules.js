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
        return state.modules.filter(m => m.idTeacher === rootState.user.id)
      } else {
        console.log('No module for u')
        return []
      }
    },

    getModuleById: (state, getters, rootState) => (id) => {
      const _module = state.modules.find(m => m.id === parseInt(id, 10));
      return _module || { title: 'N/A' };
    },

    getModulesByTeacher: (state, getters, rootState) => (id) => {
      return state.modules.filter(m => m.teachers.some(mt => parseInt(mt.idTeacher, 10) === parseInt(id, 10)));
    }
  },
  
  actions: {
    addModule: ({ commit, dispatch, state }, newModule) => {
      commit('ADD_MODULE_LOADING', newModule)
      Vue.api.post('/modules', [newModule])
        .then(({ data }) => {
          const _module = data[0];
          console.log('After received', _module)

          const addTeacher = Vue.api.post('/addteacher', [{ idModule: _module.id, idTeacher: newModule.idTeacher, startDate: '03-04-2018', endDate: null }])
          const addModule = Vue.api.post('/addmodules', [{ idModule: _module.id, idTraining: newModule.idTrainingClass, startDate: '03-04-2018', endDate: null }])
          console.log('newModule', newModule)
          Promise.all(addModule, addTeacher)
            .then(() => {
              commit('ADD_MODULE_SUCCESS', {..._module, idTeacher: newModule.idTeacher, idTraining: newModule.idTrainingClass});
              router.push('/modules')
              dispatch('snack/openSnack', { color: 'success', message: 'Le module à bien été ajouté' }, { root: true })
            })
        })
        .catch(() => {
          commit('ADD_MODULE_FAILURE');
          dispatch('snack/openSnack', { color: 'error', message: 'Une érreur est survenue lors de l\'ajout du module' }, { root: true })
        })
    },
    getModules: ({ commit, dispatch, state }) => {
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
      commit('GET_MY_MODULES_LOADING')
      Vue.api.get(`/teachersmodules/${rootState.user.id}`)
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
