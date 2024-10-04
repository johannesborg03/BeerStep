import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './views/HomePage.vue'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import LogIn from './views/LogIn.vue'
import Activity from '@/views/Activity.vue'
import Leaderboard from './views/Leaderboard.vue'

const routes = [
  { path: '/LogIn', name: 'LogIn', component: LogIn , meta: { hideNavbar: true } },
  { path: '/Register', name: 'Register', component: Register, meta: { hideNavbar: true }  },
  { path: '/HomePage', name: 'HomePage', component: HomePage },
  { path: '/', name: 'Home', component: Home, meta: { hideNavbar: true } },
  { path: '/Activity', name: 'Activity', component: Activity }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
