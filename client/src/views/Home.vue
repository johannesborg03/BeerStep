<template>
  <BContainer fluid class="landing-view">
    <h1 class="main-title">BeerStep</h1>
    <BRow class="text-start">
      <BCol class="text-end ">
        <router-link to="/LogIn">
          <BButton variant="warning" class="login-button">Log In</BButton>
        </router-link>
      </BCol>
    </BRow>

    <BRow style="margin-top: 10%; text-align: start;">
      <BCol class="textSec">
        <p class="balance">Keep the balance</p>
        <h1 class="headline display-4 mb-2">Healthy drinking, made easy with BeerStep</h1>
        <p class="subtext lead">Join BeerStep and balance fun with wellness!</p>
        <router-link to="/Register">
          <BButton variant="warning w-25">Register</BButton>
        </router-link>
      </BCol>
    </BRow>
  </BContainer>
</template>



<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none',
      landingImg: '/src/assets/landingPage.png'
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
.landing-view {
  font-family: Tahoma;
  background-image: url('/src/assets/aboutImg.jpg');
  background-size: cover;
  background-position: center;
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-title {
  font-size: 45px;
  font-family: 'sans-serif';
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  color:  whitesmoke;
  text-align: center;
  margin-top: 10px
}

.headline {
  font-size: 38px;
  color: whitesmoke;
}

.subtext {
  color: whitesmoke;
}

.textSec {
  margin-top: 5%;
  margin-left: 5%;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.balance {
  color: #ebb112;
  font-size: 24px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.btn {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.login-button {
  color: #000000;
  border-radius: 10px;
  position: absolute;
  top: 2%;
  right: 5%;
  width: 7%;
}

/* Media queries for different screen sizes */
@media (max-width: 768px) {
  .subtext {
    display: none;
  }

  .balance {
    display: none;
  }

  .headline {
    margin-top: 50%;
    margin-left: 10%;
    font-size: 1.7em;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  .main-title {
    font-size: 2.0em;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  .backgroundImg {
    display: none;
  }


  .btn {
    width: 50% !important;
    font-size: 0.9em;
    padding: 10px 15px;
    margin-left: 10%;
  }


  .login-button {
    width: 20% !important;
    padding: 10px 15px;
    font-size: 0.9em;
  }
}

@media (max-width: 1400px) {
  .backgroundImg {
    display: none;
  }
}
</style>
