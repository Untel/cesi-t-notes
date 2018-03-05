// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios';

Vue.use(Vuetify, { theme: {
  primary: '#009c9e',
  secondary: '#b0bec5',
  accent: '#8c9eff',
  error: '#ec6771',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFCA28'
}})

Vue.config.productionTip = false

Vue.api = Vue.prototype.$api = axios.create({ 
  baseURL: 'http://localhost:1664/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-type': 'application/json',
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
