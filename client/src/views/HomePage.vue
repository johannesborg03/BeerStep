<template bg-dark>
  <div class ="main bg-dark">
  <BRow>
      <div class="beerBack">
        <b-img src="/src/assets/set&homeBackground.jpg" fluid class="bg-cover" />
      </div>
    <BCol class ="overlay">
      <div class="stats">
        <h2>2300</h2>
        <p>Steps Needed</p>
      </div>
      <router-link to="/Activity" class="btn btn-danger w-25">Log activity</router-link>
    </BCol>
   
   
  <BCol class="quotes text-start">
    <p style="color: #ebb112;">Quote of the week</p>
    <BCard class="card-quotes">
      <p>Walk off the beer and enjoy the next one guilt-free!</p>
    </BCard>
    </BCol>
  
    <BCol class= "middleColumn"></BCol>

    <BCol class="goal text-end">
 <p style="color: #ebb112; font-size:20px; ">Personal Goal</p>
  <BCard class= "card-goal">
      <pre v-if="submittedGoal" class="goal-display">My Goal: {{ submittedGoal }}</pre>

      <BFormInput id="inputfield" v-model="goal" placeholder="Enter your goal..." />
    
      <BButton variant="warning" @click="submitGoal" class="button">Submit Goal</BButton>

  </BCard>
</BCol>

  </BRow>
</div>
</template>


<script setup lang="ts">

import { ref } from 'vue'

const goal = ref('')           // Holds the goal input
const submittedGoal = ref('')  // Holds the submitted goal

const submitGoal = () => {
  if (goal.value.trim()) {      // Ensure goal is not empty
    submittedGoal.value = goal.value
    goal.value = ''             // Clear input after submission
  }
}
</script>

<style scoped>


.beerBack {
  position: relative;
  width: 100%;
  height: 64vh; 
  overflow: hidden;
  box-shadow: #292929;
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

}
</style>
