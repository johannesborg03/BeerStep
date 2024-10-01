import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Activity from '@/views/Activity.vue'

const routes = [
  { path: '/', name: 'Squad', component: Home },
  { path: '/', name: 'Log activity', component: Home },
  { path: '/', name: 'Leaderboard', component: Home },
  { path: '/', name: 'Activity', component: Activity }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
