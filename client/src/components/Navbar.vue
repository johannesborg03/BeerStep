<template>
  <BContainer>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand class="brand">BeerStep</b-navbar-brand>
     
      <BNav class="nav justify-content-end">
        <BNavItem class="buttonsNav"><router-link to="/HomePage">Home</router-link></BNavItem>
        <BNavItem class="buttonsNav"><router-link to="/SquadPage">Squads</router-link></BNavItem>
        <BNavItem class="buttonsNav"><router-link to="/Leaderboard">Leaderboard</router-link></BNavItem>
      </BNav>

      <BAvatar class="avatar" bg-variant="primary" :text="firstIndex()" size="sm" />
      <BDropdown class="custom-dropdown" variant="transparent" v-model="menuVisible" size="sm" no-flip @click="goToSettings"> 
        <BDropdownItem @click="goToSettings">Settings</BDropdownItem>
        <BDropdownItem @click="logout">Logout</BDropdownItem>
      </BDropdown>
    </b-navbar>
 
    
    
  </BContainer>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuVisible: false,
      username: ''  // Add a property to hold the username
    };
  },
  mounted() {
    // Retrieve the username from local storage on component mount
    this.username = localStorage.getItem('username') || 'Guest';
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    goToSettings() {
      const username = localStorage.getItem('username');
      // Navigate to the settings page with the username as a route param
      if (username) {
        this.$router.push({ name: 'SettingsPage', params: { username: this.username } });
      } else {
        console.error('No username found in localStorage');
      } 
    },
    firstIndex() {
      return this.username.charAt(0); // Get the first character of the username
    },
    logout() {
      // Clear the localStorage on logout
      localStorage.removeItem('username');
      this.$router.push('/LogIn');
    }
  }
}
</script>

<style scoped>
.brand {
  color: #ebb112;
}
.username {
  font-size: 16px;
  color: #ffffff;
}
.buttonsNav a,
router-link {
  color: white;
  text-decoration: none;
}
</style>
