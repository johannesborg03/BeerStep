import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Register from './views/Register.vue'
import LogIn from './views/LogIn.vue'
import Leaderboard from './views/Leaderboard.vue'

const routes = [
  { path: '/LogIn', name: 'LogIn', component: LogIn, meta: { hideNavbar: true } },
  { path: '/Register', name: 'Register', component: Register, meta: { hideNavbar: true } },
  { path: '/About', name: 'About', component: About, meta: { hideNavbar: true } },
  { path: '/', name: 'Home', component: Home },

  { path: '/', name: 'Squad', component: Home },
  { path: '/', name: 'Log activity', component: Home },
  { path: '/leaderboard', name: 'Leaderboard', component: Leaderboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
