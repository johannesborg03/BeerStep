import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Register from './views/Register.vue'
import LogIn from './views/LogIn.vue'

const routes = [
  { path: '/LogIn', name: 'LogIn', component: Home , meta: { hideNavbar: true } },
  { path: '/Register', name: 'Register', component: Home, meta: { hideNavbar: true }  },
  { path: '/About', name: 'About', component: About, meta: { hideNavbar: true } },
  { path: '/', name: 'Home', component: Home },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
