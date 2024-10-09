import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './views/HomePage.vue'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import LogIn from './views/LogIn.vue'
import Activity from '@/views/Activity.vue'
import Leaderboard from './views/Leaderboard.vue'
<<<<<<< HEAD
import SettingsPage from './views/SettingsPage.vue'
=======
import SquadPage from './views/SquadPage.vue'

>>>>>>> d76d275a317b5d1608ef8f502065e366ab059d67

const routes = [
  { path: '/LogIn', name: 'LogIn', component: LogIn , meta: { hideNavbar: true } },
  { path: '/Register', name: 'Register', component: Register, meta: { hideNavbar: true }  },
  { path: '/HomePage', name: 'HomePage', component: HomePage },
  { path: '/', name: 'Home', component: Home, meta: { hideNavbar: true } },
  { path: '/Activity', name: 'Activity', component: Activity },
  { path: '/Leaderboard', name: 'Leaderboard', component: Leaderboard },
<<<<<<< HEAD
  { path: '/SettingsPage', name: 'SettingsPage', component: SettingsPage }
=======
  { path: '/SquadPage', name: 'SquadPage', component: SquadPage }
>>>>>>> d76d275a317b5d1608ef8f502065e366ab059d67
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
