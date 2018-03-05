import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/Login'
import BasicLayout from '@/containers/BasicLayout'
import ManageStudents from '@/containers/ManageStudents'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Application',
      component: BasicLayout,
      children: [
        {
          path: '/students',
          name: 'AdminManageStudents',
          component: ManageStudents,
        },
    ]
    }
  ]
})
