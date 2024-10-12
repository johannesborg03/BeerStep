<template>
  
  <BContainer fluid>
  <BRow class="align-items-center">

    <!-- Empty column for left side -->
    <BCol></BCol>
    
    <BCol class="text-center">
      <h1 class="main-title display-3">BeerStep</h1>
    </BCol>
    
    <BCol class="text-end">
      <router-link to="/LogIn">
        <BButton variant="warning">Log In</BButton>
      </router-link>
    </BCol>
  </BRow>
</BContainer>
  
    <BRow class="textArea text-start">
      <BCol>
        <h1 class="headline display-4 mb-3">Healthy drinking, made easy with BeerStep</h1>
        <p class="subtext lead">Join BeerStep and balance fun with wellness!</p>
      </BCol>
    </BRow>
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


.textArea{

}


</style>
