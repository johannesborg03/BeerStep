<template>

  <body>
    <main>
      <div class="beerBack">
        <img src="/src/assets/beerBackground.jpg">
        <div class="stats">
          <h2>2300</h2>
          <p>Steps required</p>
        </div>
        <div class="button-container">
          <router-link to="/log-activity" class="button red">Log activity</router-link>
  
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
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2b2b2b
}

/* Beer Background */
.beerBack {
  border-radius: 2%;
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
  width: 30%;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 80px;
}

.button {
  margin-top: 450px;
  padding: 4px 0;
  font-size: 17px;
  color: #f2f1ea;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  width: 60px;
  height: 35px;
  flex: 1;
  transition: 0.3s;
  background: #a62b23;
}

.button:hover {
  transform: translateY(-3px);
}

.stats {
  margin-top: 200px;
  font-size: 24px;
  text-align: center;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}
</style>
