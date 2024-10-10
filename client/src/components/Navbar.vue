<template>
  <header>
    <div class="settings" @click="toggleMenu">
      <img src="/src/assets/settings.png" alt="Settings" />
      <div v-if="menuVisible" class="menu">
        <ul>
          <li @click="goToSettings">Settings</li>
          <li @click="logout">Logout</li>
        </ul>
      </div>
    </div>
    <div class="buttonsNav">
      <router-link to="/HomePage">Home</router-link>
      <router-link to="/SquadPage">Squads</router-link>
      <router-link to="/Leaderboard">Leaderboard</router-link>
    </div>
    <h1>BeerStep</h1>
    <div class="user">
      <div class="profile-pic">
        <img src="/src/assets/userPic.png" alt="User profile picture" />
      </div>
      <!-- Display the username from localStorage -->
      <p class="username">{{ username }}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuVisible: false,
      username: ''  // Add a property to hold the username
    }
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


     // this.$router.push('/SettingsPage')
     // this.$router.push({ name: 'SettingsPage', params: { username: this.input.username } }); //For when A username GLobal Variable is added

    logout() {
      // Clear the localStorage on logout
      localStorage.removeItem('username');
      this.$router.push('/LogIn');
    }
  }
}
</script>

<style scoped>
header {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 80px;
  width: 100%;
  background: #333;
  display: flex;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

header h1 {
  flex: 1;
  font-size: 44px;
  text-align: center;
  margin: 0;
  color: #ebb112;
  margin-top: 10px;
  font-family: 'Segoe UI';
  margin-right: 320px;
}

.user {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.profile-pic {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.settings {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 100px;
  margin-right: 75px;
  margin-top: 23px;
  cursor: pointer;
}

.settings img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-size: 16px;
  color: #ffffff;
  margin-right: 100px;
  margin-top: 9px;
}

.menu {
  top: 80px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
  position: absolute;
}

.menu li {
  padding: 10px 20px;
}

.buttonsNav {
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 28px;
  margin-left: 45px;
  margin-top: 15px;
}

.buttonsNav button {
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
}

.buttonsNav a,
router-link { 
  color: white; 
  text-decoration: none;
}
</style>
