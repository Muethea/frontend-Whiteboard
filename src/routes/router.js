import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/pages/HomePage.vue'
import LoginPage from '@/components/pages/LoginPage.vue'
import SingupPage from '@/components/pages/SingupPage.vue'
import DashboardPage from '@/components/pages/DashboardPage.vue'
import WhiteBoardPage from '@/components/pages/WhiteBoardPage.vue'
import store from '@/store/store'
import { IS_USER_AUTHENTICATE_GETTER } from '@/store/modules/auth/storeconstants'

const routes = [
  {
    path: '',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { auth: false }
  },
  {
    path: '/singup',
    name: 'signup',
    component: SingupPage,
    meta: { auth: false }
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    meta: { auth: true }
  },
  {
    path: '/whiteboard',
    name: 'whiteboard',
    component: WhiteBoardPage,
    meta: { auth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if ('auth' in to.meta &&  to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]) {
    next('/login')
  } else if (
    'auth' in to.meta &&
    !to.meta.auth &&
    store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  ) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
