import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'

const routes = [
  { path: '/LogIn', name: 'LogIn', component: Home },
  { path: '/Register', name: 'Register', component: Home },
  { path: '/About', name: 'About', component: About },
  { path: '/', name: 'Squad', component: Home },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
