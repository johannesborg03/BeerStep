import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Leaderboard from './components/Leaderboard.vue'

const routes = [
  { path: '/', name: 'Squad', component: Home },
  { path: '/', name: 'Log activity', component: Home },
  { path: '/leaderboard', name: 'Leaderboard', component: Leaderboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
