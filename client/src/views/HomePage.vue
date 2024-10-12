<template bg-dark>
  <div class ="main bg-dark">
  <BRow>
      <div class="beerBack">
        <b-img src="/src/assets/beerBackground.jpg" fluid class="bg-cover" />
      </div>
    <BCol class ="overlay">
      <div class="stats">
        <h2>2300</h2>
        <p>Steps Needed</p>
      </div>
      <router-link to="/Activity" class="btn btn-danger w-25">Log activity</router-link>
    </BCol>
   
   
  <BCol class="quotes text-start">
    <BCard class="card-quotes">
      <p>Walk off the beer and enjoy the next one guilt-free!</p>
    </BCard>
    </BCol>
  
    <BCol></BCol>

    <BCol class="goal text-end">

  <BCard style = "width: 100%; background-color: #292929;">
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
  height: 65vh; 
  overflow: hidden;
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
  height: 80%; 
  text-align: center; 
  padding-top: 10%;
}
.goal{
display: flex; 
flex-direction: column; 
align-items: center;
margin: 2% 7%;
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
</style>
