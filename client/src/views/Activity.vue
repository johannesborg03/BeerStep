<template>
    <div class="activity-view">
      <h1>Activity Header</h1>
      <!-- Add the content you want to display in the view -->
      <p>Log your activity (or Beer ;)</p>
      <div class="button-container">
        <button class="massive-button beer">Beer</button>
        <button class="massive-button log-step" @click="showStepInput = true">Step</button>
      </div>

    <div v-if="showStepInput" class="step-input-container">
        <input
        v-model="steps"
        type="number"
        placeholder="Enter number of steps"
        class="step-input"
        />
        <button @click="log-steps" class="submit-button">Submit</button>
    </div>
</div>
</template>

<script>
export default {
  name: 'activityView',
  data() {
    return {
      showStepInput: false, /* Track wether input should be shown */
      steps: '' /* Track number of steps */
    }
  },

  methods: {
    logSteps() {
    /* Add your logic to handle the steps (e.g., save it, or perform an action)
      console.log('Steps logged:', this.steps); */

      // Reset the input field and hide it again after submission
      this.steps = ''
      this.showStepInput = false
    }
  }
}
</script>

<style scoped>
/* Add view-specific styles */
.activity-view {
  padding: 20px;
  text-align: center;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 500px; /* Gap between buttons */
    margin-top: 20px;
}

.massive-button {
    font-family: 'sans-serif';
    width: 600px;
    height: 500px;
    font-size: 100px;
    color: rgb(6, 4, 1);
    border: none;
    border-radius: 10px; /* rounded corners */
    cursor: pointer; /* Change cursor to pointer on hover */
    transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth transitions */
}

.beer {
    background-color: #28a745;
}

.beer:hover {
/* transform: translateY(-50px); */
background-color: #218838; /* Darker shade on hover */
transform: scale(1.2); /* Slightly enlarge on hover */
}

.log-step {
    background-color: #007bff;
}

.log-step:hover {
/* transform: translateY(-50px); */
background-color: #0056b3; /* Darker shade on hover */
transform: scale(1.2); /* Slightly enlarge on hover */
}

.step-input-container {
    margin-top: 20px
}

.step-input {
    font-size: 24px;
    padding: 20px;
    border-radius: 5px;
    border: 2px solid #ccc;
    width: 300px;
    margin-right: 10px;
}

.submit-button {
    font-size: 24px;
    padding: 20px;
    border: none;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #218838;
}

</style>
