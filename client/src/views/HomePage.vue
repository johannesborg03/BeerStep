<template>
  <div class="main bg-dark" style="min-height: 100vh;">
    <BRow>
      <BContainer fluid class="beerBack" />
      <BCol class="overlay">
        <div class="stats">
          <h2>{{ stepsNeeded }}</h2>
          <p>Steps Needed</p>
        </div>
        <router-link to="/Activity" class="btn btn-danger w-25">Log activity</router-link>
      </BCol>

      <BCol class="quotes text-center">
        <p style="color: #ebb112;">Words of Wisdom</p>
        <BCard class="card-quotes">
          <p> {{ quote }}</p>
        </BCard>
      </BCol> 
    </BRow>
  </div>
</template>

<script>
export default {
  data() {
    return {         
      submittedGoal: "",   
      stepsNeeded: 0,      
      username: "",     
      quote: "",
      HomeBackgroundImg: '/src/assets/set&homeBackground.jpg'
    };
  },

  mounted() {
    this.username = localStorage.getItem("username") || "Guest";
    this.displaySteps(); 
    this.quote = this.displayQuotes(); 
  },

  methods: {
  
    async displaySteps() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${this.username}`);
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const data = await response.json();
        this.stepsNeeded = data.steps_needed || 0;
      } catch (error) {
        console.error("Error fetching steps:", error);
      }
    },

    displayQuotes(){

    const quotesArray = ['Walk off the beer and enjoy the next one guilt-free!','Step it up! Each one brings you one step closer to beer o’clock!','The more steps you take, the more reasons you have to enjoy that brew!','Keep stepping and let the beer flow guilt-free!'];

    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
    }
  },
};
</script>

<style scoped>

.beerBack {
  background-image: url('/src/assets/set&homeBackground.jpg');
  position: relative;
  width: 100%;
  height: 64vh; 
  overflow: hidden;
  box-shadow: #292929;
  background-size: cover;
  background-position: center;
}

.main {
  overflow-x: hidden;
}

.overlay {
  position: absolute;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  font-size: 28px;
  font-family: sans-serif;
  margin-top: 10%;
}

.btn{
 border-radius: 20px;
}

.btn:hover {
  transform: translateY(-3px);
}

.quotes {
  margin-top: 2%;
  color: #292929;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.card-quotes {
  background-color: #292929; 
  color: white; 
  height: 70%; 
  text-align: center; 
  padding: 40px ;
  width: 100%; 
  max-width: 500px; 
}

#inputfield{
  width: 100%; background-color: #333; 
  margin-top: 20px; 
  border: 1px solid #555;
  background-color: #fff;
}
.button{
margin-top: 20px; 
width: 100%; 
margin-bottom:20px;
}

.goal-display{
  color: #ffffff;
  text-decoration: underline;
  font-size: 20px;
 text-align: center;
}

@media (max-width: 768px) {


.overlay{
margin-top: 200px;
margin-left: 10px;


}

.btn{
font-size: 12px;
}

.card-quotes{
width: 95%;
}

.quotes{
  display:none;
}

.beerBack {
  height: 100vh; 
  position: relative;
  width: 100%;
}



}
</style>
