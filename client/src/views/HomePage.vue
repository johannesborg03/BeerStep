<template>
  <div class="main bg-dark" style="min-height: 100vh;">
    <BRow>
      <b-img src="/src/assets/set&homeBackground.jpg" fluid class="beerBack" />
      <BCol class="overlay">
        <div class="stats">
          <h2>{{ stepsNeeded }}</h2>
          <p>Steps Needed</p>
        </div>
        <router-link to="/Activity" class="btn btn-danger w-25">Log activity</router-link>
      </BCol>

      <BCol class="quotes text-start">
        <p style="color: #ebb112;">Quote of the week</p>
        <BCard class="card-quotes">
          <p> {{ quote }}</p>
        </BCard>
      </BCol>
      <BCol class="middleColumn"></BCol>
      <BCol class="goal text-end">
        <p style="color: #ebb112; font-size: 20px;">Personal Goal</p>
        <BCard class="card-goal">
          <pre v-if="submittedGoal" class="goal-display">My Goal: {{ submittedGoal }}</pre>
          <BFormInput id="inputfield" v-model="goal" placeholder="Enter your goal..." />
          <BButton variant="warning" @click="submitGoal" class="button">Submit Goal</BButton>
        </BCard>
      </BCol>
    </BRow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goal: "",            
      submittedGoal: "",   
      stepsNeeded: 0,      
      username: "",     
      quote: ""
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

    // Submit goal and clear input field
    submitGoal() {
      if (this.goal.trim()) {
        this.submittedGoal = this.goal;
        this.goal = ""; 
      }
    },
    displayQuotes(){

    const quotesArray = ['Walk off the beer and enjoy the next one guilt-free!','Step it up! Each one brings you one step closer to beer o’clock!','The more steps you take, the more reasons you have to enjoy that brew!','Keep stepping and let the beer flow guilt-free!"'];

    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
    }
  },
};
</script>

<style scoped>

.beerBack {
  position: relative;
  width: 100%;
  height: 64vh; 
  overflow: hidden;
  box-shadow: #292929;
  background-size: cover;
  background-position: center;
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

.quotes{
margin-top: 2%;
color: #292929;
font-size: 20px;
margin-left: 5%;

}

.card-quotes{
  background-color: #292929; 
  color: white; 
  height: 70%; 
  text-align: center; 
  padding-top: 10%;
}
.goal{
display: flex; 
flex-direction: column; 
align-items: center;
margin: 2% 7%;
}

.card-goal{
width: 100%; 
background-color: #292929;
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

.quotes{
  display: none;
}

.middleColumn{
display: none;
}

.overlay{
margin-top: 200px;
}

.btn{
font-size: 12px;
}


}
</style>
