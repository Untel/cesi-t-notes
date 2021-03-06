import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/Login'
import BasicLayout from '@/containers/BasicLayout'
import EmptyLayout from '@/containers/EmptyLayout'

import ManageClasses from '@/containers/Admin/ManageClasses'
import ManageModules from '@/containers/Admin/ManageModules'
import ManageTeachers from '@/containers/Admin/ManageTeachers'

import NewModule from '@/containers/Admin/NewModule'
import NewClass from '@/containers/Admin/NewClass'
import NewStudent from '@/containers/Admin/NewStudent'
import NewTeacher from '@/containers/Admin/NewTeacher'

import ManageMarks from '@/containers/Teacher/ManageMarks'
import MyModules from '@/containers/Teacher/ManageModules'

import ShowMyMarks from '@/containers/Student/ShowMyMarks'



import store from '@/store';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '',
      name: 'Application',
      component: BasicLayout,
      meta: { logged: true },
      children: [
        {
          path: 'classes',
          component: EmptyLayout,
          meta: { roles: ['Admin'] },
          children: [
            {
              path: '',
              name: 'AdminManageClasses',
              component: ManageClasses,
            },
            {
              path: 'new',
              name: 'AdminNewClass',
              component: NewClass,
            },
          ]
        },
        {
          path: 'modules',
          component: EmptyLayout,
          meta: { roles: ['Admin'] },
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
        {
          path: 'teachers',
          component: EmptyLayout,
          meta: { roles: ['Admin'] },
          children: [
            {
              path: '',
              name: 'AdminManageTeachers',
              component: ManageTeachers,
            },
            {
              path: 'new',
              name: 'AdminNewTeacher',
              component: NewTeacher,
            },
          ]
        },
        {
          path: 'students',
          component: EmptyLayout,
          meta: { roles: ['Admin'] },
          children: [
            {
              path: 'new',
              name: 'AdminNewStudent',
              component: NewStudent,
            },
          ]
        },

        {
          path: 'mymodules',
          component: EmptyLayout,
          meta: { roles: ['Teachers'] },
          children: [
            {
              path: '',
              name: 'TeacherMyModules',
              component: MyModules,
            },
            {
              path: ':idModule/class/:idClass',
              name: 'TeacherManageMarks',
              component: ManageMarks,
            },
          ]
        },

        {
          path: 'mymarks',
          component: EmptyLayout,
          meta: { roles: ['Student'] },
          children: [
            {
              path: '',
              name: 'ShowMyMarks',
              component: ShowMyMarks,
            },
          ]
        },

      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('Check if allowed')
  const hasToBeChecked = to.matched.find(m => m.meta.roles && m.meta.roles.length)
  if (hasToBeChecked) {
    console.log('Checking', hasToBeChecked)
    
    if (store.getters.isAllowed(hasToBeChecked.meta.roles)) {
      return next()
    } else {
      return next({ path: 'login' })
    }
  } else {
    return next()
  }
});

export default router;
