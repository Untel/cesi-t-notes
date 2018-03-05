import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/Login'
import BasicLayout from '@/containers/BasicLayout'
import EmptyLayout from '@/containers/EmptyLayout'

import ManageClasses from '@/containers/Admin/ManageClasses'
import ManageModules from '@/containers/Admin/ManageModules'
import NewModule from '@/containers/Admin/NewModule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: 'login',
      name: 'Login',
      component: Login
    },
    {
      path: '',
      name: 'Application',
      component: BasicLayout,
      children: [
        {
          path: 'classes',
          name: 'AdminManageClasses',
          component: ManageClasses,
        },
        {
          path: 'modules',
          // name: 'AdminModules',
          component: EmptyLayout,
          children: [
            {
              path: '',
              name: 'AdminManageModules',
              component: ManageModules,
            },
            {
              path: 'new',
              name: 'AdminNewModule',
              component: NewModule,
            },
          ]
        },
      ]
    }
  ]
})
