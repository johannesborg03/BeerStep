<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Include the Navbar component here -->
    <Navbar v-if="!$route.meta.hideNavbar" />

    <!-- Render the content of the current page view -->
    <router-view />
  </div>
</template>

<script>
// Import the Navbar component
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar, // Register Navbar as a component in App.vue
  },
};
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%; 
}
</style>
