<template>

  <body>
    <main>
      <div class="beerBack">
        <img src="/src/assets/beerBackground.jpg">
        <router-link to="/">Home</router-link>
        <div class="button-container">
          <router-link to="/squad" class="button green">Squad</router-link>
          <router-link to="/log-activity" class="button red">Log activity</router-link>
          <router-link to="/leaderboard" class="button blue">Leaderboard</router-link>
        </div>
      </div>

    </main>
  </body>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
/* General */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #2b2b2b;
  color: #f1f1f1;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

/* Main */
main {
  position: relative;
  width: 100%;
  display: flex;
  /* Enable flexbox layout for the main section */
  flex-direction: column;
  /* Ensure main content flows vertically */
  align-items: center;
  /* Center align items */

}

/* Beer Background */
.beerBack {
  border-radius: 3%;
  overflow: hidden;
  width: 91vw;
  height: 70vh;
  margin: 0 auto;
  position: relative;
}

.beerBack img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 150px;
  /* Adjusted to reduce spacing */
  width: 100%;
  max-width: 1200px;
  /* Increased to fit larger buttons */
  position: absolute;
  top: 60%;
  /* Move down on the page */
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 80px;
}

.button {
  margin-top: 500px;
  padding: 6px 0;
  font-size: 16px;
  color: #f2f1ea;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  width: 60px;
  height: 35px;
  flex: 1;
  transition: 0.3s;
}

.button:hover {
  transform: translateY(-3px);
}

.button.green {
  background: #276229;
}

.button.red {
  background: #a62b23;
}

.button.blue {
  background: #156eb6;
}
</style>
