<template>
  <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'" expand="lg" class="d-flex flex-nowrap">
    <BNavbarBrand href="#" class="brand">BeerStep</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />

    <BCollapse id="nav-collapse" is-nav>
      <!-- Left Aligned Navbar Links -->
      <BNavbarNav class="d-flex gap-4responsive design">
        <BNavItem class="buttonsNav">
          <router-link to="/HomePage">Home</router-link>
        </BNavItem>
        <BNavItem class="buttonsNav">
          <router-link to="/SquadPage">Squads</router-link>
        </BNavItem>
        <BNavItem class="buttonsNav">
          <router-link to="/Leaderboard">Leaderboard</router-link>
        </BNavItem>
      </BNavbarNav>
      
      <!-- Right Aligned Navbar Items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <!-- Hide Username and Avatar on Small Screens -->
        <div class="d-none d-lg-flex align-items-center">
          <BAvatar class="avatar" bg-variant="primary" :text="firstIndex()" size="sm" />
          <span class="username ml-3">{{ username }}</span>
        </div>
        <BDropdown class="custom-dropdown ml-3" variant="transparent" size="sm" right>
          <BDropdownItem @click="goToSettings">Settings</BDropdownItem>
          <BDropdownItem @click="logout">Logout</BDropdownItem>
        </BDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
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
  font-size: 24px;
  margin-right: 5%;
  margin-left: 5%;
}
.buttonsNav{
  font-family: sans-serif;
  gap: 40px;
}
.username {
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
}
.buttonsNav a,
router-link {
  color: white;
  text-decoration: none;
}

.custom-dropdown{
padding-right: 30px;
}

.nav-collapse{
margin-right: 5%;
}


</style>
