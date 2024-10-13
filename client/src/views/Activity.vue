<template>
  <div class="activity-view">
    <b-container>
      <b-row>
        <b-col>
          <h1 class="text-center" style="color: white; margin-top: 5%;">Activity Header</h1>
          <p class="text-center" style="color: white;">Log your activity (or Beer ;)</p>
        </b-col>
      </b-row>

      <!-- Button container with responsive buttons -->
      <b-row class="justify-content-center">
        <b-col cols="12" md="5" class="text-center mb-3">
          <b-button @click="toggleCanvas" variant="success" block class="massive-button beer">
            Beer
          </b-button>

          <!-- OffCanvas for beer selection -->
          <b-offcanvas v-model="showBeerCanvas" title="Choose Your Beer" :placement="'bottom'" class="bg-dark" style="color: white; height: 40%;">
            <b-list-group>
              <b-list-group-item class="bg-dark" v-for="(beer, index) in beerChoices" :key="index" @click="logBeer(beer)" style="color: white;">
                <b-avatar :src="beer.avatar" class="mr-2" />
                {{ beer.name }} - {{ beer.kcal }} kcal
              </b-list-group-item>
            </b-list-group>
          </b-offcanvas>
        </b-col>
        <b-col cols="12" md="5" class="text-center">
          <b-button @click="showStepInput = true" variant="primary" block class="massive-button log-step">
            Step
          </b-button>
        </b-col>
      </b-row>

      <!-- Step input container with responsive input and button -->
      <b-row v-if="showStepInput" class="justify-content-center mt-3">
        <b-col cols="12" md="5" class="text-center">
          <b-form-input v-model="steps" type="number" placeholder="Enter number of steps" class="mb-2" />
          <b-button @click="logSteps" variant="success" block class="submit-button">
            Submit
          </b-button>
        </b-col>
      </b-row>

      <!-- Notification area -->
      <b-row v-if="showBeerNotification" class="justify-content-center mt-3">
        <b-col cols="12" md="5" class="text-center">
          <b-alert :show="showBeerNotification" variant="success" dismissible>
            Beer Logged! Good Job King! Keep It Up!
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showStepInput: false, // Track whether the step input should be shown
      steps: '', // Track the number of steps entered
      showBeerCanvas: false, // Controls visibility of beer selection OffCanvas
      // Modified beerChoices with name, avatar and kcal
      beerChoices: [
        {
          name: 'Lager',
          avatar: 'src/assets/ljus.png', 
          kcal: 180,
        },
        {
          name: 'IPA',
          avatar: 'src/assets/ipa.png',
          kcal: 220,
        },
        {
          name: 'Stout',
          avatar: 'src/assets/stout.png', 
          kcal: 250,
        },
        {
          name: 'Pilsner',
          avatar: 'src/assets/plisner.png',
          kcal: 170,
        },
      ],
      showBeerNotification: false, // Track beer notification visibility
    };
  },
  methods: {
    // Toggle the beer selection OffCanvas
    toggleCanvas() {
      this.showBeerCanvas = !this.showBeerCanvas;
    },

    // Handle step submission logic
    logSteps() {
      console.log('Steps logged:', this.steps);
      const username = localStorage.getItem('username');

      // Fetch user data to get current total_steps and steps_needed
      fetch(`http://localhost:3000/api/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((user) => {
          const newTotalSteps = user.total_steps + parseInt(this.steps);

          let newStepsNeeded = user.steps_needed - parseInt(this.steps);
          if (newStepsNeeded < 0) {
            newStepsNeeded = 0;
          }

          // Send a PATCH request to update the steps
          return fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              total_steps: newTotalSteps,
              steps_needed: newStepsNeeded,
            }),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error updating steps count: ${response.statusText}`);
          }
          return response.json();
        })
        .then((updatedUser) => {
          console.log('Steps Added:', updatedUser);
          this.steps = ''; // Reset the step input field
          this.showStepInput = false; // Hide the input field after submission
        })
        .catch((error) => {
          console.error('Error logging steps:', error);
        });
    },

    // Handle beer selection and logging
    logBeer(selectedBeer) {
      console.log('Selected beer:', selectedBeer);
      const username = localStorage.getItem('username');

      // Fetch user data to get current total_beers
      fetch(`http://localhost:3000/api/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((user) => {
          // Increment total_beers by 1
          const newTotalBeers = user.total_beers + 1;

          // Send a PATCH request to update the total_beers
          return fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ total_beers: newTotalBeers }),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error updating beer count: ${response.statusText}`);
          }
          return response.json();
        })
        .then((updatedUser) => {
          console.log('Beer incremented:', updatedUser);
          this.showBeerNotification = true; // Show the beer logged notification
          setTimeout(() => {
            this.showBeerNotification = false;
          }, 3000);
          this.showBeerCanvas = false; // Close the OffCanvas after selection
        })
        .catch((error) => {
          console.error('Error logging beer:', error);
        });
    },
  },
};
</script>


<style scoped>
/* Add view-specific styles */
.activity-view {
  text-align: center;
  background-color: #2b2b2b;
 /* overflow: hidden; */
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-image: url('@/assets/squad.jpg');
  background-size: cover;
  background-position: center;
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
