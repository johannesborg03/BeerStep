<template>
  <div class="activity-view">
    <b-container>
      <b-row>
        <b-col>
         
          <p class="text-center">Log your steps (or Beer ;)</p>
        </b-col>
      </b-row>

      <BRow class="current-beer-container">
        <p class="current-beer">
          <img src="/src/assets/beerPic.webp" alt="Beer" class="beer-image" />
        : {{ total_beers }} 
          </p>
        </BRow>

        <BRow class="total-steps-container">
          <p class="total-steps">
            <img src="/src/assets/running.png" alt="Beer" class="running-image" />
          :     {{ total_steps }} <br>
         Steps Needed: {{ steps_needed }}
          </p>
        </BRow>

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
      <b-row v-if="showStepInput" class="justify-content-center mt-1">
        <b-col cols="12" md="5" class="text-center">
          <b-form-input v-model="steps" type="number" placeholder="Enter number of steps" class="mb-1" />
          <b-button @click="logSteps" variant="success" block class="submit-button">
            Submit
          </b-button>
        </b-col>
      </b-row>
      <!-- Reset button at the bottom -->
    <div class="d-flex justify-content-center mb-3">
      <div class="reset-steps">
      <b-button @click="confirmResetSteps" variant="danger" class="reset-button">
        Reset Steps
      </b-button>
    </div>
    </div>
  

      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive" aria-atomic="true" :class="{'show': showToast}">
          <div class="toast-header bg-dark" style="color: white;">
            <strong class="me-auto">Activity Tracker</strong>
            <small>Just now</small>
            <button type="button" class="btn-close" @click="showToast = false" aria-label="Close"></button>
          </div>
          <div class="toast-body">
            {{ toastMessage }}
          </div>
        </div>
      </div>

    </b-container>
  </div>

  <!-- Reset button at the bottom -->
 
    
  
</template>

<script>
export default {
  data() {
    return {
      showStepInput: false, // Track whether the step input should be shown
      steps: '', // Track the number of steps entered
      showBeerCanvas: false, // Controls visibility of beer selection OffCanvas
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
      showToast: false, // Controls the visibility of the toast
      toastMessage: '', // Holds the message for the toast

      total_beers: 0,
      total_steps: 0,
      steps_needed: 0,


    };
  },

  mounted() {
    this.fetchUserData();
  },
  methods: {

    confirmResetSteps() {
      const userConfirmed = window.confirm("Are you sure you want to reset your steps?");
      if (userConfirmed) {
        this.resetSteps();
      }
    },
    resetSteps(){
      const username = localStorage.getItem('username');

      fetch(`http://localhost:3000/api/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((user) => {
          let newTotalSteps = 0;
          let newStepsNeeded = 0;
          

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
          this.total_steps = updatedUser.total_steps;
          this.steps_needed = updatedUser.steps_needed;
          this.showToastNotification('Steps successfully logged!');
        })
        .catch((error) => {
          console.error('Error logging steps:', error);
          this.showToastNotification('Failed to log steps. Please try again.');
        });
      this.total_steps = 0; // Reset the total steps count to 0
      // You might also want to reset any other related state here
      console.log("Total steps reset to 0");
    },
    fetchUserData(){
      const username = localStorage.getItem('username');
      
      fetch(`http://localhost:3000/api/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((user) => {
          // Update the total beers, total steps, and steps needed
          this.total_beers = user.total_beers;
          this.total_steps = user.total_steps;
          this.steps_needed = user.steps_needed;
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    },
    // Toggle the beer selection OffCanvas
    toggleCanvas() {
      this.showBeerCanvas = !this.showBeerCanvas;
    },

    // Show toast with a message
    showToastNotification(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000); // Auto-hide after 3 seconds
    },

    // Handle step submission logic
    logSteps() {
      console.log('Steps logged:', this.steps);
      const username = localStorage.getItem('username');

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
          this.total_steps = updatedUser.total_steps;
          this.steps_needed = updatedUser.steps_needed;
          this.showToastNotification('Steps successfully logged!');
        })
        .catch((error) => {
          console.error('Error logging steps:', error);
          this.showToastNotification('Failed to log steps. Please try again.');
        });
    },

    // Handle beer selection and logging
    logBeer(selectedBeer) {
      console.log('Selected beer:', selectedBeer);
      const username = localStorage.getItem('username');

      fetch(`http://localhost:3000/api/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((user) => {
          const newTotalBeers = user.total_beers + 1;
          const newStepsNeeded = user.steps_needed + 2000;

          return fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              total_beers: newTotalBeers,
              steps_needed: newStepsNeeded }),
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
          this.showToastNotification('Beer successfully logged!');
          this.total_beers = updatedUser.total_beers;
          this.steps_needed = updatedUser.steps_needed;
          this.showBeerCanvas = false; // Close the OffCanvas after selection
        })
        .catch((error) => {
          console.error('Error logging beer:', error);
          this.showToastNotification('Failed to log beer. Please try again.');
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
  overflow: auto; 
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
  width: 30vh;
  height: 30vh;
  font-size: 10vh;
  color: rgb(6, 15, 3);
  border: none;
  border-radius: 1vh;
  /* rounded corners */
  cursor: pointer;
  /* Change cursor to pointer on hover */
  transition: transform 0.3s ease, background-color 0.3s ease;
  /* Smooth transitions */
  margin-bottom: 5%;
}

.beer {
  background-color: #ebb112;
}

.beer:hover {
  /* transform: translateY(-50px); */
  background-color: #f3b407;
  /* Darker shade on hover */
  transform: scale(1.2);
  /* Slightly enlarge on hover */
}

.log-step {
  background-color: #1a7fea;
}

.log-step:hover {
  /* transform: translateY(-50px); */
  background-color: #007bff; 
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
  font-size: 3vh;
  padding: 2vh;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5%;
  transition: background-color 0.3s ease;
  margin-top: 0%;
  margin-bottom: 10%;
  height: 10vh;
  width: 20vh;
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

.total-steps{
  text-align: center;
  margin: 0;
  color: #ebb112;
  font-size: 6vh;
  font-family: 'sans-serif';
  margin-bottom: 2.5%;
  margin-top: 0%;
  margin-right: 5%;
  border: 0%;
  
}

.current-beer{
  text-align: center;
  margin: 0;
  color: #ebb112;
  font-size: 10vh;
  font-family: 'sans-serif';
  margin-bottom: 0%;
  margin-top: 0%;
  border: 0%;
}

.text-center {
  text-align: center;
  margin: 0;
  color: #ebb112;
  font-size: 6vh;
  font-family: 'sans-serif';
  margin-bottom: 0%;
  margin-top: 2.5vh;
  border: 0%;
}

.current-beer-container{
  margin-top: 0%;
  margin-bottom: 0%;
  width: 100%;
}

.beer-image {
  width: 14vh; /* Adjust the width as needed */
  height: auto; /* Keep aspect ratio */
  margin-right: 0%; /* Space between image and text */
  vertical-align: middle; /* Align image with text */

}

.total-steps-container{
  margin-top: 0%;
  margin-bottom: 0%;
  width: 100%;
}

.running-image{
  width: 14vh; /* Adjust the width as needed */
  height: auto; /* Keep aspect ratio */
  margin-right: 0%; /* Space between image and text */
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: 4%;
  vertical-align: middle; /* Align image with text */
}

.justify-content-center{
  margin-top: 0%;
}

.reset-steps {
  margin-bottom: 5%;
  margin-top: 5%;

}

</style>
