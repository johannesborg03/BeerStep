<template>
  <div class="activity-view">
    <h1>Activity Header</h1>
    <!-- Add the content you want to display in the view -->
    <p>Log your activity (or Beer ;)</p>
    <div class="button-container">
      <button class="massive-button beer" :class="{ 'disabled-button': showBeerNotification }" @click="logBeer"
        :disabled="showBeerNotification">Beer</button>
      <button class="massive-button log-step" @click="showStepInput = true">Step</button>
    </div>

    <div v-if="showStepInput" class="step-input-container">
      <input v-model="steps" type="number" placeholder="Enter number of steps" class="step-input" />
      <button @click="logSteps" class="submit-button">Submit</button>
    </div>
    <div v-if="showBeerNotification" class="notification">
      Beer Logged! Good Job King! Keep It Up!
    </div>
  </div>

</template>

<script>
export default {
  name: 'activityView',
  data() {
    return {
      showStepInput: false, /* Track wether input should be shown */
      steps: '', /* Track number of steps */
      showBeerNotification: false
    }
  },

  methods: {
    logSteps() {
      /* Add your logic to handle the steps (e.g., save it, or perform an action) */
      console.log('Steps logged:', this.steps)

      // Reset the input field and hide it again after submission
      this.steps = ''
      this.showStepInput = false
    },
    logBeer() {
      console.log('Beer logged');


      const username = localStorage.getItem('username');

      // Step 1: Get the current total_beers value
      fetch(`http://localhost:3000/api/users/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          return response.json();
        })
        .then(user => {
          // Step 2: Increment total_beers
          const newTotalBeers = user.total_beers + 1; // Increment by 1

          // Step 3: Send a PATCH request to update the total_beers
          return fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ total_beers: newTotalBeers }), // Use the incremented value
          });
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error updating beer count: ${response.statusText}`);
          }
          return response.json();
        })
        .then(updatedUser => {
          console.log('Beer incremented:', updatedUser);
          this.showBeerNotification = true; // Show notification
          setTimeout(() => {
            this.showBeerNotification = false;
          }, 3000);
        })
        .catch(error => {
          console.error('Error logging beer:', error);
        });
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
  gap: 500px;
  /* Gap between buttons */
  margin-top: 20px;
}

.massive-button {
  font-family: 'sans-serif';
  width: 600px;
  height: 500px;
  font-size: 100px;
  color: rgb(6, 4, 1);
  border: none;
  border-radius: 10px;
  /* rounded corners */
  cursor: pointer;
  /* Change cursor to pointer on hover */
  transition: transform 0.3s ease, background-color 0.3s ease;
  /* Smooth transitions */
}

.beer {
  background-color: #28a745;
}

.beer:hover {
  /* transform: translateY(-50px); */
  background-color: #218838;
  /* Darker shade on hover */
  transform: scale(1.2);
  /* Slightly enlarge on hover */
}

.log-step {
  background-color: #007bff;
}

.log-step:hover {
  /* transform: translateY(-50px); */
  background-color: #0056b3;
  /* Darker shade on hover */
  transform: scale(1.2);
  /* Slightly enlarge on hover */
}

.step-input-container {
  display: flex;
  /* Ensures the input and button are aligned */
  flex-direction: column;
  /* Stack the input and button vertically */
  justify-content: center;
  /* Centers the input and button */
  align-items: center;
  /* Aligns horizontally to center */
  /* padding: 20px; /* Adds padding inside the container */
  margin-top: 20px;
  /* Adds space above the container */
  width: 300px;
  /* Ensures the container is as wide as possible */
  height: auto;
  /* Auto-adjusts the height based on content */
  position: absolute;
  left: 40%;
  right: 40%;
  padding-bottom: 500px;
}

.step-input {
  font-size: 24px;
  padding: 20px 20px;
  height: 80px;
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

.notification {
  margin-top: 20px;
  font-size: 32px;
  color: #fff;
  background-color: #28a745;
  padding: 20px;
  border-radius: 10px;
  opacity: 0.9;
  animation: fadeout 3s ease-out forwards;
  /* Animate fading out after a while */
  pointer-events: none;
  /* Disable pointer events when animating */
}

@keyframes fadeout {
  0% {
    /* 0%: This represents the starting point of the animation (the beginning).
                           At 0%, the opacity is set to 0.9, which means the element is almost fully visible but slightly transparent. */
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    /* 100%: This represents the end point of the animation (the end).
    At 100%, the opacity is set to 0, meaning the element becomes fully transparent (completely invisible). */
    opacity: 0;
  }
}

.disabled-button {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}
</style>
