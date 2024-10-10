<template>
    <main>
        <div class="aboutImg">
            <img src="/src/assets/aboutImg.jpg">
            <div class="content">
                <h1>BeerStep</h1>
            </div>
            <router-link to="/LogIn" class="buttonNav">Log in</router-link>
        </div>
        <div class = "subtitle">
            <h1>Healthy drinking, made easy with BeerStep</h1>
            <p>Join BeerStep and balance fun with wellness!</p>
     </div>
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
main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.aboutImg {
    overflow: hidden;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    position: relative;
}


.aboutImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
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
    right: 40px; 
    margin-top: 40px;
    transform: translateY(-50%);
}


.buttonNav button {
    border: none;
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
