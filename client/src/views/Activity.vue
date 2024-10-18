<template>
  <div class="activity-view">
    <b-container>
      <b-row>
        <b-col>
         
          <p class="text-center">Log your steps (or Beer ;)</p>
        </b-col>
      </b-row>

      <!--
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
        -->


        <BRow class="bcard">
          <BCard class="box">
            <h1 class="title">Activity Status</h1>
            <p class="beer-chart-title">Beer Progress:</p>
            <!-- INSERT BEER CHART-->

              <!-- Insert your Chart component here
              <beer-vs-steps-chart :totalBeers="total_beers" :totalSteps="total_steps" />
            -->
            <BeerVsStepsChart :chart-data="chartData" />



          </BCard>
        </BRow>




             <!-- Fixed button container -->
      <div class="fixed-bottom bg-dark p-3 w-100 text-center">
        <b-container>
          <b-row class="justify-content-center buttons-container">
            <b-col cols="6" md="auto">
              <b-button @click="toggleCanvas" variant="primary" class="massive-button beer">
                Beer
              </b-button>
            </b-col>
            <b-col cols="6" md="auto">
              <b-button @click="showStepInput = true" variant="primary" class="massive-button log-step">
                Step
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    

      <!-- Button container with responsive buttons -->


       <!--
      <b-row class="justify-content-center">
        <b-col cols="12" md="5" class="text-center mb-3">
          <b-button @click="toggleCanvas" variant="success" block class="massive-button beer">
            Beer
          </b-button>
        </b-col>
      </b-row>

    -->


          <div class="d-flex justify-content-center mb-3">
      <div class="reset">
      <b-button @click="confirmResetBeer" variant="danger" class="reset-button">
        Reset Beers
      </b-button>
    </div>
    </div>

          <!-- OffCanvas for beer selection -->
          <b-offcanvas v-model="showBeerCanvas" title="Choose Your Beer" :placement="'bottom'" class="bg-dark" style="color: white; height: 40%;">
            <b-list-group>
              <b-list-group-item class="bg-dark" v-for="(beer, index) in beerChoices" :key="index" @click="logBeer(beer)" style="color: white;">
                <b-avatar :src="beer.avatar" class="mr-2" />
                {{ beer.name }} - {{ beer.kcal }} kcal
              </b-list-group-item>
            </b-list-group>
          </b-offcanvas>


          <!--
       
        <b-col cols="12" md="5" class="text-center">
          <b-button @click="showStepInput = true" variant="primary" block class="massive-button log-step">
            Step
          </b-button>
        </b-col>
         -->
     

          <div class="d-flex justify-content-center mb-3">
      <div class="reset">
      <b-button @click="confirmResetSteps" variant="danger" class="reset-button">
        Reset Steps
      </b-button>
    </div>
    </div>

        

      <!-- Step input container with responsive input and button -->
      <b-row v-if="showStepInput" class="justify-content-center mt-1">
        <b-col cols="12" md="5" class="text-center">
          <b-form-input v-model="steps" type="number" placeholder="Enter number of steps" class="mb-1" />
          <b-button @click="logSteps" variant="success" block class="submit-button">
            Submit
          </b-button>
        </b-col>
      </b-row>

       <!-- 
      <div class="d-flex justify-content-center mb-3">
        <div class="milestones">
          <b-button @click="toggleMilestoneForm" class="milestones-button">
            Milestones
          </b-button>
        </div>
      </div>
    -->

 <div class="d-flex justify-content-center mb-3">
        <div class="milestones">
          <b-button @click="toggleMilestones" class="milestones-button">
            Milestones
          </b-button>
        </div>
      </div>

      
     
    

      <b-row v-if="showMilestones" class = "justify-content-center mb-3">


        <div class="d-flex justify-content-center mb-3">
        <div class="milestones">
          <b-button @click="toggleMilestoneForm" class="milestones-button">
            Create Milestone
          </b-button>
        </div>
      </div>

      <b-row v-if="showMilestoneForm" class="justify-content-center mb-3">
        <BRow class="bcard">
          <BCard class="box">
        <b-col cols="12" md="8" class="milestone-form">
          <b-form @submit.prevent="createMilestone">
            <b-form-group label="Milestone Title">
              <b-form-input v-model="milestone.title" required placeholder="Enter milestone title"></b-form-input>
            </b-form-group>

            <b-form-group label="Milestone Description">
              <b-form-textarea v-model="milestone.description" required placeholder="Enter milestone description"></b-form-textarea>
            </b-form-group>

            <b-form-group label="Number of Beers">
              <b-form-input type="number" v-model="milestone.beers" required placeholder="Enter number of beers"></b-form-input>
            </b-form-group>

            <b-form-group label="Number of Steps">
              <b-form-input type="number" v-model="milestone.steps" required placeholder="Enter number of steps"></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="success">Save Milestone</b-button>
          </b-form>
        </b-col>
      </BCard>
      
    </BRow>
      </b-row>
      

      <b-row v-if="milestones.length > 0" class="mt-3">
        <b-col cols="12">
          <h3>Your Milestones</h3>
          <ul class="list-group">
            <li v-for="(milestone, index) in milestones" :key="index" class="list-group-item">
              <strong>Title: {{ milestone.title }} <br>
              </strong>
              <strong>Description: {{ milestone.description }}
              <br>
            </strong>
              Beers: {{ milestone.beers }}<br>
              Steps: {{ milestone.steps }}
              <div>
              <b-button @click="prepareEditMilestone(milestone)" variant="primary" class="edit-milestones-button">
                Edit Milestone
              </b-button>
            </div>
          </li>
        </ul>
      </b-col>
    </b-row>

    <div class="delete-milestones">
      <b-button @click="confirmDeleteMilestones" variant="danger" class="delete-milestones-button">
        Delete Milestones
      </b-button>
    </div>
    

  </b-row>

     <!-- Milestone form for editing -->
  <b-row v-if="showEditMilestoneForm" class="justify-content-center mb-3">
    <BRow class="bcard">
      <BCard class="box">
        <b-col cols="12" md="8" class="milestone-form">
          <b-form @submit.prevent="saveMilestone(milestone)">
            <b-form-group label="Milestone Title">
              <b-form-input
                v-model="milestone.title"
                required
                placeholder="Enter milestone title"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Milestone Description">
              <b-form-textarea
                v-model="milestone.description"
                required
                placeholder="Enter milestone description"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group label="Number of Beers">
              <b-form-input
                type="number"
                v-model="milestone.beers"
                required
                placeholder="Enter number of beers"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Number of Steps">
              <b-form-input
                type="number"
                v-model="milestone.steps"
                required
                placeholder="Enter number of steps"
              ></b-form-input>
            </b-form-group>

            <b-button type="save-milestone" variant="success">
              Save Milestone
            </b-button>
          </b-form>
        </b-col>
      </BCard>
    </BRow>
  </b-row>
      
<!--
      <div class="d-flex justify-content-center mb-3">
        
        <div class="edit-milestones">
      <b-button @click="confirmEditMilestones" variant="primary" class="edit-milestones-button">
        Edit Milestone
      </b-button>
    </div>
    -->


      

      <!-- Reset button at the bottom 
    <div class="d-flex justify-content-center mb-3">
      <div class="reset-steps">
      <b-button @click="confirmResetSteps" variant="danger" class="reset-button">
        Reset Steps
      </b-button>
    </div>
    </div>
  -->
  
  

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

  
 












  
    
  
</template>

<script>
// Import your Chart Component
import BeerVsStepsChart from '/Users/Lenovo/group-25-web-2/client/src/components/BeerVsStepsChart.vue'




export default {
  components: {
    BeerVsStepsChart
  },
  data() {
    return {
      showMilestones: false,
      showEditMilestoneForm: false,
      showMilestoneForm: false, // Toggle milestone form visibility
      milestone: {
        _id: '',
        title: '',
        description: '',
        beers: 0,
        steps: 0,
      },
      milestones: [],

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
    /*  chartData: {
      labels: ['Beers vs Steps'],
      datasets: [
        {
          label: 'Beer Consumption',
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5',
          data: [{ x: this.total_beers, y: this.total_steps}],
        },
        
        {
          label: 'Steps Taken',
          backgroundColor: '#66BB6A',
          borderColor: '#66BB6A',
          data: [{ x: 0, y: this.total_steps}],
        }, 
        
      ],
    }, */
  };
},

computed: {
  chartData() {
    return {
      labels: ['Beers vs Steps'],
                datasets: [
                    {
                        label: 'Beer Consumption',
                        backgroundColor: '#42A5F5',
                        borderColor: '#42A5F5',
                        data: [{ x: this.total_beers, y: this.total_steps }],
                    },
                    {
                        label: 'Steps Taken',
                        backgroundColor: '#66BB6A',
                        borderColor: '#66BB6A',
                        data: [{ x: 0, y: this.total_steps }],
                    }, 
                ],
            };
        },
    },


  mounted() {
    this.fetchUserData();
    this.fetchUserMilestones();
  //  this.updateChartData();
  },
  methods: {
   
   async prepareEditMilestone(milestone) {

     await this.fetchMilestone(milestone._id);
      this.milestone = { ...milestone }; // Clone the milestone data to the form
      this.showEditMilestoneForm = true; // Show the form
    },

    saveMilestone(milestone) {
      console.log('Milestone ID:', this.milestone._id); // Log the milestone ID
      const username = localStorage.getItem('username');
      const milestoneData = {
        title: this.milestone.title,
        description: this.milestone.description,
        beers: this.milestone.beers,
        steps: this.milestone.steps,
      };

      fetch(`http://localhost:3000/api/milestones/${this.milestone._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milestoneData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error updating milestone: ${response.statusText}`);
          }
          return response.json();
        })
        .then((updatedMilestone) => {
          // Update the milestones array
          const index = this.milestones.findIndex((m) => m._id === updatedMilestone._id);
          if (index !== -1) {
            this.milestones.splice(index, 1, updatedMilestone); // Replace the old milestone
          }
          this.showEditMilestoneForm = false; // Hide the form
          this.milestone = { _id: '', title: '', description: '', beers: 0, steps: 0 }; // Reset the form fields
          this.showToastNotification('Milestone successfully updated!');
          
        })
        .catch((error) => {
          console.error('Error updating milestone:', error);
          this.showToastNotification('Failed to update milestone. Please try again.');
        });

    },

    async fetchMilestone(milestoneId) {
      console.log('Fetching Milestone with id:', milestoneId );
    try {
      const response = await fetch(`http://localhost:3000/api/milestones/${milestoneId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Error fetching milestone');
      }
      const milestoneData = await response.json();
      this.currentMilestone = milestoneData;
      
    //  this.milestone = { ...milestoneId }; // Clone the milestone data to the form
      // Open the milestone edit form
     // this.showEditMilestoneForm = true;
    } catch (error) {
      console.error('Error fetching milestone:', error);
    }
  },

    fetchUserMilestones() {
        const username = localStorage.getItem('username'); // Retrieve the username from local storage
        fetch(`http://localhost:3000/api/users/${username}/milestones`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error fetching milestones: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                this.milestones = data.milestones; // Assign the milestones to the component's data property
            })
            .catch((error) => {
                console.error('Error fetching milestones:', error);
             /*   this.showToastNotification('Failed to load milestones. Please try again.'); THIS SHOWS UP IF NO MILESTONES ARE THERE */ 
            });
    },

     // Create and save the milestone
     createMilestone() {
      const username = localStorage.getItem('username'); // Retrieve the username from local storage
      const milestoneData = {
        title: this.milestone.title,
        description: this.milestone.description,
        beers: this.milestone.beers,
        steps: this.milestone.steps
        
  };

  // Send a POST request to the backend API
  fetch(`http://localhost:3000/api/users/${username}/milestones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(milestoneData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error saving milestone: ${response.statusText}`);
      }
      return response.json();
    })
    .then((savedMilestone) => {

      
      // Push the saved milestone to the milestones array
      this.milestones.push(savedMilestone); 
      this.fetchUserMilestones(); 
      this.showToastNotification('Milestone successfully saved!'); // Show success toast
      this.milestone = { title: '', description: '', beers: 0, steps: 0 }; // Reset the form fields
      this.showMilestoneForm = false; // Hide the form
    })
    .catch((error) => {
      console.error('Error saving milestone:', error);
      this.showToastNotification('Failed to save milestone. Please try again.');
   
      
      this.milestone = { title: '', description: '', beers: 0, steps: 0 }; // Reset form fields
      this.showMilestoneForm = false; // Hide the form
      
    });
    },
    toggleMilestoneForm() {
      this.showMilestoneForm = !this.showMilestoneForm;
    },
    
    toggleMilestones() {
      this.showMilestones = !this.showMilestones;
    },

    confirmDeleteMilestones() {
      const userConfirmed = window.confirm("Are you sure you want to delete your milestones?");
      if (userConfirmed) {
        this.deleteMilestones();
      }
    },

    confirmEditMilestone() {
      const userConfirmed = window.confirm("Are you sure you want to change your Milestone?");
      if (userCOnfirmed) {
        this.editMilestone();
      }
    },

    confirmResetSteps() {
      const userConfirmed = window.confirm("Are you sure you want to reset your steps?");
      if (userConfirmed) {
        this.resetSteps();
      }
    },

    confirmResetBeer(){
      const userConfirmed = window.confirm("Are you sure you want to reset your beers?");
      if(userConfirmed) {
        this.resetBeers();
      }
    },

    /*
    async editMilestone() {
      const username = localStorage.getItem('username');

      try {
        const response = await fetch()
      }
    },
  */


    async deleteMilestones(){
      const username = localStorage.getItem('username');

      try {
      const response = await fetch(`http://localhost:3000/api/users/${username}/milestones`, {
        method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      this.milestones = [];
      alert(data.message);
      this.showToastNotification('Milestones successfully Deleted!');
    } else {
      alert(`Error: ${data.message}`);
        
    }
  } catch (error) {
    console.error('Error deleting milestones:', error);
    alert('An error occurred while deleting milestones.');
        this.showToastNotification('Failed to delete milestones. Please try again.');
  }
    },

    resetBeers(){
      const username = localStorage.getItem('username');

      fetch(`http://localhost:3000/api/users/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
          }
          return response.json();
        })
        .then((user) => {
          let newTotalBeers = 0;
          
          return fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              total_beers: newTotalBeers,
            }),
          });
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error updating beers count: ${response.statusText}`);
          }
          return response.json();
        })
        .then((updatedUser) => {
          console.log('Beers Added:', updatedUser);
          
          this.total_beers = updatedUser.total_beers;
          
          this.showToastNotification('Beers successfully logged!');
        })
        .catch((error) => {
          console.error('Error logging steps:', error);
          this.showToastNotification('Failed to log beers. Please try again.');
        });
      this.total_beers = 0; // Reset the total steps count to 0
      // You might also want to reset any other related state here
      console.log("Total beers reset to 0");
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
          this.updateChartData();
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
    updateChartData() {
    if (this.chartData && this.chartData.datasets) {
        this.chartData.datasets[0].data[0].x = this.total_beers; // Update Beer Consumption
     //   this.chartData.datasets[1].data[0].y = this.total_steps; // Update Steps Taken
        console.log('Updating chart data:', this.total_beers, this.total_steps);
    // Update logic...
    } else {
        console.error('chartData or datasets is not defined.');
    }
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

.reset {
  margin-bottom: 0%;
  margin-top: 0%;

}

.delete-milestones{
  margin-top: 2.5%;

}

.edit-milestones-button {
  margin-top: 2.5%;
}


.Milestones {
  width: 5vh;
  height: 100vh;
  margin-top: 5%; 

}

.milestones-button {
  margin-top: 10%;
  width: 30vh;
  height: 10vh;
  color: #000000;
  background-color: #ebb112;
}


.milestone-form {
  
  margin: auto; /* Centers the form horizontally */

}

.box {
    background-color: rgb(238, 238, 238);
    border-radius: 3%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 15%;
    width: 50%; /* Adjust the width */
    padding: 0; /* Add padding */
}

.bcard {
  justify-content: center;
  display: flex; /* Aligns content inside */
  width: 100%;
}

.milestone-list {
  list-style-type: none;
  width: 100%;
}


.fixed-bottom {
  z-index: 1030; /* Ensure it stays above other content */
  height: auto; /* This controls the height of the bottom section */
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */

}

.massive-button {
  font-family: 'Tahoma';
  color: whitesmoke;
  /* rounded corners */
  cursor: pointer;
  /* Change cursor to pointer on hover */
  transition: transform 0.3s ease, background-color 0.3s ease;
  /* Smooth transitions */
  
  
   /* Controls the space inside the button */
  font-size: 100%;     /* Increases the size of the text */
  width: 100%;        /* Sets a fixed width */
  height: 100%;        /* Sets a fixed height */
  border-radius: 15px;  /* Optional: makes the corners rounded */

  flex: 1;       /* Allows the button to grow and fill space */
   /* Center text inside the button */
   display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: normal;
  


}

.beer {
  background-color: #ebb112;
  margin-bottom: 0;
}

.beer:hover {
  /* transform: translateY(-50px); */
  background-color: #f3b407;
  /* Darker shade on hover */
  transform: scale(1.05);
  /* Slightly enlarge on hover */
}

.log-step {
  background-color: #1a7fea;

}


.log-step:hover {
  /* transform: translateY(-50px); */
  background-color: #007bff; 
  /* Darker shade on hover */
  transform: scale(1.05);
  /* Slightly enlarge on hover */
}






.buttons-container {
  margin: 0;
  width: 100%; /* Ensures the container takes full width */
  display: flex; /* Use flexbox for the buttons to align */
  flex-wrap: nowrap; /* Prevent buttons from wrapping to the next line */
  justify-content: center; /* Center buttons within the container */
}

.button-col {
  flex: 1; /* Allow columns to grow equally */
  display: flex; /* Enable flexbox for button alignment */
  justify-content: center; /* Center the button within the column */
}
/* Media Queries for smaller screens */

@media (min-width: 1024px) { 

.massive-button{
  width: 400px;
}
}


@media (min-width: 768px) { 

.massive-button{
  width: 350px;
}

.buttons-container{
  width: 100%;
}
}

@media (min-width: 1024px) { 

.massive-button{
  width: 470px;
}
}

@media (min-width: 1440px) { 

.massive-button{
  width: 650px;
}
}
</style>
