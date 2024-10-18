<template>
  <BNavbar toggleable="lg" variant="dark" v-b-color-mode="'dark'" expand="lg">
    <BNavbarBrand class="brand">BeerStep</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />

    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav class="d-flex gap-2">
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

      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <div class="d-none d-lg-flex align-items-center">
          <BAvatar class="avatar" :text="firstIndex()" size="sm" />
          <span class="username ml-3">{{ username }}</span>
        </div>

        <!-- Dropdown for Settings and Logout with Label for Small Screens -->
        <BDropdown class="custom-dropdown ml-3 text-center" variant="transparent" size="sm" right>
          <template #button-content>
            <span class="d-lg-none" style="margin-left: 26%; font-size: 16px; font-family: sans-serif;">Account</span>  
          </template>
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
      username: '' 
    };
  },
  mounted() {
    this.username = localStorage.getItem('username') || 'Guest';
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    goToSettings() {
      const username = localStorage.getItem('username');
      if (username) {
        this.$router.push({ name: 'SettingsPage', params: { username: this.username } });
      } else {
        console.error('No username found in localStorage');
      } 
    },
    firstIndex() {
      return this.username.charAt(0); 
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
  gap: 30px;
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
