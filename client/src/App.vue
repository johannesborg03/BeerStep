<template>
  <div id="app">
    <Navbar v-if="!$route.meta.hideNavbar" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar 
  }
}
</script>

<style>
#app {
  font-family:  Tahoma;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>
