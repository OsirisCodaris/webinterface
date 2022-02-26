import Vue from 'vue'
import Router from 'vue-router'
import Landing from './dev_page/Landing.vue'
import PageNoFound from './dev_page/PageNoFound.vue'

import StarterNavbar from './layout/StarterNavbar.vue'
import StarterFooter from './layout/StarterFooter.vue'
import Privacy from './dev_page/Credentials'
import ForgetPassword from './dev_page/ForgetPassword.vue'
import Password from './dev_page/Password.vue'
import Classes from './dev_page/Classes/Classes.vue'
import DashBoard from './dev_page/Dashboard.vue'
import Login from './dev_page/Login.vue'
import Profile from './dev_page/Profile.vue'

import ClasseSubject from './dev_page/Classes/ClasseSubject.vue'

import Subjects from './dev_page/Subjects/Subjects.vue'
import TypeDocs from './dev_page/TypeDocs/TypeDocs.vue'
import Docs from './dev_page/Documents/Docs.vue'

import Setting from './dev_page/Setting.vue'

import store from '@/store/store'

Vue.use(Router)
let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      components: {
        default: Landing,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        guest: true,
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      components: {
        default: Privacy,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        guest: true,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      components: {
        default: DashBoard,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: Profile,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: Login,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        guest: true,
      },
    },
    {
      path: '/forget-password',
      name: 'forget',
      components: {
        default: ForgetPassword,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        guest: true,
      },
    },
    {
      path: '/password/:resettoken',
      name: 'password',
      components: {
        default: Password,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
    },
    /*{
      path: '/classes',
      name: 'classes',
      components: {
        default: Classes,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/classesubjects',
      name: 'classesubjects',
      components: {
        default: ClasseSubject,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/subjects',
      name: 'subjects',
      components: {
        default: Subjects,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/typedocs',
      name: 'typedocs',
      components: {
        default: TypeDocs,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/documents',
      name: 'documents',
      components: {
        default: Docs,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/setting',
      name: 'setting',
      components: {
        default: Setting,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
      meta: {
        requiresAuth: true,
        is_codaris: true,
      },
    },*/
    {
      path: '*',
      name: 'PageNoFound',
      components: {
        default: PageNoFound,
        header: StarterNavbar,
        footer: StarterFooter,
      },
      props: {
        header: {
          colorOnScroll: 400,
        },
        footer: {
          backgroundColor: 'black',
        },
      },
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return {
        selector: to.hash,
      }
    } else {
      return {
        x: 0,
        y: 0,
      }
    }
  },
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      })
    } else {
      let user = store.state.user
      if (to.matched.some(record => record.meta.is_codaris)) {
        if (user.role == 'CODARIS') {
          next()
        } else {
          next({ name: 'dashboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.state.token == null) {
      next()
    } else {
      let user = store.state.user
      if(user.role == 'PROMOTER'){
        next({ name: 'dashboard' })
      }else{
        next({ name: 'profile' })
      }
      
    }
  } else {
    next()
  }
})

export default router
