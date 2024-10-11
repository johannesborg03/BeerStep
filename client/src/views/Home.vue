<template>
  <main>
    <div class="content">
      <h1 class="main-title">BeerStep</h1>
    </div>
    <div class="login-wrapper">
      <router-link to="/LogIn" class="buttonNav">Log in</router-link>
      <b-container class="d-flex justify-content-center align-items-center vh-100"></b-container>
    </div>
    <b-container class="subtitle mt-10">
      <h1 class="headline">Healthy drinking, made easy with BeerStep</h1>
      <p class="subtext">Join BeerStep and balance fun with wellness!</p>
    </b-container>
  </main>
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

<style scoped>

.headline {
  font-size: 1.5em;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  /* Hide the subtext (paragraph) on small screens */
  .subtext {
    display: none;
  }

  /* Reduce the size of the headline on small screens */
  .headline {
    font-size: 0.8em;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  .main-title {
    font-size: 1.5em;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
}
main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-wrapper { 
    background-image: url('@/assets/aboutImg.jpg');
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
}

/* Center the content over the image */
.content {
    position: absolute;
    text-align: center;
    color: white;
    left: 50%;
    margin-top: 50px;
    transform: translate(-50%, -50%);
    position: absolute;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    margin-right: 15px;

}

.buttonNav {
    padding: 10px;
    position: absolute;
    right: 30px; 
    margin-top: 40px;
    transform: translateY(-50%);
}

.buttonNav,
router-link {
    color: white;
    text-decoration: none;
    font-size: 18px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.subtitle {
    position: absolute;
    text-align: left;
    color: white;
    font-family: 'Segoe UI';
    margin-top: 200px;
    max-width: 450px;
    left: 20px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    padding-left: 50px;
    font-size: 28px;
    
}
</style>
