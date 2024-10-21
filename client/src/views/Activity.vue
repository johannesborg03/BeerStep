<template>

  <div class="activity-view">
    <b-container>
      <b-row>
        <b-col>
        </b-col>
      </b-row>
      <BRow class="bcard" v-if="isBcardView">
        <BCard class="box bg-dark">

          <div class="milestone-view" v-if="isMilestoneView">
            <div class="d-flex justify-content-center mb-3">
            </div>
            <h3 class="milestone-title">Your Milestones: ({{ milestones.length }}) </h3>
            <b-row v-if="milestones.length > 0" class="mt-3">
              <b-col class="milestone-list" cols="12">

                <ul class="list-group">
                  <li v-for="(milestone, index) in milestones" :key="index" class="list-group-item">
                    <strong>{{ milestone.title }}</strong> <br>

                    <strong>Description: </strong> {{ milestone.description }}
                    <br>

                    <strong> Beers: </strong> {{ milestone.beers }}<br>
                    <strong> Steps: </strong> {{ milestone.steps }}
                    <div>
                      <b-button @click="prepareEditMilestone(milestone)" variant="primary"
                        class="edit-milestones-button">
                        Edit Milestone
                      </b-button>
                    </div>
                  </li>
                </ul>
              </b-col>
            </b-row>

            <b-row justify-content-center d-flex>

              <div class="col-md-6">
                <div class="create-milestones-button">
                  <b-button @click="toggleCreateMilestones" variant="success" class="create-milestones-button">
                    Create Milestone
                  </b-button>
                </div>
              </div>

              <div class="col-md-6">
                <div class="delete-milestones">
                  <b-button @click="confirmDeleteMilestones" variant="danger" class="delete-milestones-button">
                    Delete Milestones
                  </b-button>
                </div>
              </div>

            </b-row>

            <b-button @click="toggleMilestones" class="go-back-button">
              Go Back
            </b-button>
          </div>

      <div class="activity" v-if="!isActivityView">
          <h1 class="title">Activity Status</h1>
          <p class="beer-chart-title">Beer Progress:</p>
      

            <BeerVsStepsChart ref="myChart" :chart-data="chartData" :options="chartOptions" class ="chart" />

            <BCard class="activity-buttons-container">
              <div class="row d-flex flex-column align-items-center">


                <div class="col-md-3 d-flex flex-column align-items-center ber">

                  <p class="view-info" style="font-weight: 550;">Beers: {{ total_beers }} </p>
                  <div class="d-flex justify-content-center mb-3 reset-button">

                    <b-button @click="confirmResetBeer" variant="danger" class="reset-buton-button">
                      Reset Beers
                    </b-button>

                  </div>

                </div>

                <div class="col-md-6 d-flex flex-column align-items-center milestone">

                  <p class="view-info" style="font-weight: 550;">Milestones: {{ total_milestones }}</p>
                  <div class="d-flex justify-content-center">
                    <div class="milestones">
                      <b-button @click="toggleMilestones" variant="primary" class="milestones-button">
                        Milestones
                      </b-button>
                    </div>
                  </div>

                </div>

                <div class="col-md-3 d-flex flex-column align-items-center steps">

                  <p class="view-info-steps" style="font-weight: 550;">Steps: {{ total_steps }}</p>
                  <p class="view-info" style="font-weight: 550;">Steps Needed: {{ steps_needed }}</p>
                  <div class="d-flex justify-content-center mb-3 reset-button">

                    <b-button @click="confirmResetSteps" variant="danger" class="reset-buton-button">
                      Reset Steps
                    </b-button>

                  </div>

                </div>


              </div>
            </BCard>

          </div>

        </BCard>
      </BRow>

      <div class="fixed-bottom bg-dark p-3 w-100 text-center">
        <b-container>
          <b-row class="justify-content-center buttons-container">
            <b-col cols="6" md="auto">
              <b-button @click="toggleCanvas" variant="primary" class="massive-button beer">
                Beer
              </b-button>
            </b-col>
            <b-col cols="6" md="auto">
              <b-button @click="toggleStepInput" variant="primary" class="massive-button log-step">
                Step
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <b-offcanvas v-model="showBeerCanvas" title="Choose Your Beer" :placement="'bottom'" class="bg-dark"
        style="color: white; height: 40%;">
        <b-list-group>
          <b-list-group-item class="bg-dark" v-for="(beer, index) in beerChoices" :key="index" @click="logBeer(beer)"
            style="color: white;">
            <b-avatar :src="beer.avatar" class="mr-2" />
            {{ beer.name }} - {{ beer.kcal }} kcal
          </b-list-group-item>
        </b-list-group>
      </b-offcanvas>



      <b-row v-if="showStepInput" class="justify-content-center mt-1">
        <BCard class="justify-content-center box bg-dark">
          <b-col cols="12" md="12" class="text-step-center">
            <b-form-input v-model="steps" type="number" placeholder="Enter number of steps" class="mb-1" />
          </b-col>
          <b-col cols="12" md="12">
            <b-button @click="logSteps" variant="success" block class="submit-steps-button">
              Submit
            </b-button>
          </b-col>

        </BCard>
      </b-row>
    
      <b-row v-if="showCreateMilestones" class="justify-content-center mb-3 milestone-view">
        <div class="create-milestone-view">
          <b-row v-if="showCreateMilestones" class="justify-content-center mb-3">
            <BRow class="bcard">
              <BCard class="box bg-dark">
                <b-col cols="12" md="8" class="milestone-form">
                  <b-form @submit.prevent="createMilestone">
                    <b-form-group label="Milestone Title" label-class="milestone-label">
                      <b-form-input v-model="milestone.title" required
                        placeholder="Enter milestone title"></b-form-input>
                    </b-form-group>

                    <b-form-group label="Milestone Description" label-class="milestone-label">
                      <b-form-textarea v-model="milestone.description" required
                        placeholder="Enter milestone description"></b-form-textarea>
                    </b-form-group>

                    <b-form-group label="Number of Beers" label-class="milestone-label">
                      <b-form-input type="number" v-model="milestone.beers" required
                        placeholder="Enter number of beers"></b-form-input>
                    </b-form-group>

                    <b-form-group label="Number of Steps" label-class="milestone-label">
                      <b-form-input type="number" v-model="milestone.steps" required
                        placeholder="Enter number of steps"></b-form-input>
                    </b-form-group>

                    <b-button class="save-milestone" type="submit" variant="success">Save Milestone</b-button>
                    <b-button @click="goBackToMilestonesFromCreateMilestone" class="go-back-button">
                      Go Back
                    </b-button>

                  </b-form>
                </b-col>
              </BCard>
            </BRow>
          </b-row>
        </div>
      </b-row>

      <b-row v-if="showEditMilestoneForm" class="justify-content-center mb-3">
        <BRow class="bcard">
          <BCard class="box bg-dark">
            <b-col cols="12" md="8" class="milestone-form">
              <b-form @submit.prevent="saveMilestone(milestone)">
                <b-form-group label="Milestone Title">
                  <b-form-input v-model="milestone.title" required placeholder="Enter milestone title"></b-form-input>
                </b-form-group>

                <b-form-group label="Milestone Description">
                  <b-form-textarea v-model="milestone.description" required
                    placeholder="Enter milestone description"></b-form-textarea>
                </b-form-group>

                <b-form-group label="Number of Beers">
                  <b-form-input type="number" v-model="milestone.beers" required
                    placeholder="Enter number of beers"></b-form-input>
                </b-form-group>

                <b-form-group label="Number of Steps">
                  <b-form-input type="number" v-model="milestone.steps" required
                    placeholder="Enter number of steps"></b-form-input>
                </b-form-group>

                <div>
                  <b-button class="save-milestone" type="save-milestone" variant="success">
                    Save Milestone
                  </b-button>
                </div>

                <b-button @click="goBackToMilestonesFromEditMilestone" class="go-back-button">
                  Go Back
                </b-button>
              </b-form>
            </b-col>
          </BCard>
        </BRow>
      </b-row>

      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="liveToast" class="toast bg-dark" role="alert" style="color: white;" aria-live="assertive"
          aria-atomic="true" :class="{ 'show': showToast }">
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
import BeerVsStepsChart from '@/components/BeerVsStepsChart.vue';
import 'chartjs-adapter-date-fns';

import lagerImage from '@/assets/ljus.png';
import ipaImage from '@/assets/ipa.png';
import stoutImage from '@/assets/stout.png';
import pilsnerImage from '@/assets/plisner.png';



export default {
  components: {
    BeerVsStepsChart
  },
  data() {
    return {
      isFirstClick: false,
      showCreateMilestones: false,
      showEditMilestoneForm: false,
      isBcardView: true,
      showMilestoneForm: false, // Toggle milestone form visibility
      isActivityView: false, // Determines which container is visible
      isMilestoneView: false,
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
          
          avatar: lagerImage,
          kcal: 180,
        },
        {
          name: 'IPA',
          avatar: ipaImage,
          kcal: 220,
        },
        {
          name: 'Stout',
          avatar: stoutImage,
          kcal: 250,
        },
        {
          name: 'Pilsner',
          avatar: pilsnerImage,
          kcal: 170,
        },
      ],
      showToast: false, // Controls the visibility of the toast
      toastMessage: '', // Holds the message for the toast

      total_beers: 0,
      total_steps: 0,
      steps_needed: 0,
      beerLogs: [],

    };
  },

  computed: {
    chartData() {
      const beerLogsData = this.beerLogs.map(log => ({
        x: new Date(log.date).toISOString().split('T')[0], // Convert the log date to Date object for x-axis
        y: log.count // Use the beer count for y-axis
      }));


      return {
        labels: ['Beers'],
        datasets: [
          {
            label: 'Beer Consumption',
            backgroundColor: '#ebb112',
            borderColor: '#ebb112',
            data: beerLogsData,
          },

        ],
      };
    },

    chartOptions() {
      // Get first and last date from beerLogs
      const firstDate = this.beerLogs.length > 0 ? new Date(this.beerLogs[0].date) : null;
      const lastDate = this.beerLogs.length > 0 ? new Date(this.beerLogs[this.beerLogs.length - 1].date) : null;

      // Ensure min and max are valid Date objects or fallback to default
      const minDate = firstDate instanceof Date && !isNaN(firstDate) ? firstDate : new Date();
      const maxDate = lastDate instanceof Date && !isNaN(lastDate) ? lastDate : new Date();

      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            title: {
              display: true,
              text: 'Date'
            },
            time: {
              unit: 'day',
              tooltipFormat: 'yyyy-MM-dd',
              //  parser: 'yyyy-MM-dd', // Ensure correct date parsing format
              displayFormats: {
                day: 'yyyy-MM-dd'
              }
            },
            min: minDate, // Set min to the first logged beer date
            max: maxDate, // Set max to the last logged beer date

          },
          y: {
            title: {
              display: true,
              text: 'Total Count'
            }
          }
        }
      };
    }

  },




  mounted() {
    this.fetchUserData();
    this.fetchUserMilestones();
    console.log('Chart data on mount:', this.chartData);
    //  this.updateChartData();
  },



  methods: {

    async prepareEditMilestone(milestone) {

      await this.fetchMilestone(milestone._id);
      this.milestone = { ...milestone }; // Clone the milestone data to the form
      this.isBcardView = false;
      this.isMilestoneView = false;
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
          this.isBcardView = true;
          this.isMilestoneView = true;

        })
        .catch((error) => {
          console.error('Error updating milestone:', error);
          this.showToastNotification('Failed to update milestone. Please try again.');
        });

    },

    async fetchMilestone(milestoneId) {
      console.log('Fetching Milestone with id:', milestoneId);
      try {
        const response = await fetch(`http://localhost:3000/api/milestones/${milestoneId}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Error fetching milestone');
        }
        const milestoneData = await response.json();
        this.currentMilestone = milestoneData;

       
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

          // Check if there's only one milestone and fetch that specific milestone
          if (this.milestones.length === 1) {
            const milestoneId = this.milestones[0]._id; // Get the ID of the milestone
            this.fetchSingleMilestone(username, milestoneId); // Call the method to fetch the specific milestone
          }

        })
        .catch((error) => {
          console.error('Error fetching milestones:', error);
          
        });
    },


    fetchSingleMilestone(username, milestoneId) {
      fetch(`http://localhost:3000/api/users/${username}/milestones/${milestoneId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error fetching single milestone: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Single milestone fetched successfully:', data.milestone);
          // Handle the single milestone data (e.g., update the UI, save in state, etc.)
        })
        .catch((error) => {
          console.error('Error fetching single milestone:', error);
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

          this.toggleCreateMilestones();

        })
        .catch((error) => {
          console.error('Error saving milestone:', error);
          this.showToastNotification('Failed to save milestone. Please try again.');


          this.milestone = { title: '', description: '', beers: 0, steps: 0 }; // Reset form fields
          this.showMilestoneForm = false; // Hide the form


        });
    },

    toggleStepInput() {
      if (this.isFirstClick) {
        this.runFirstMethod();  // Call the first method
      } else {
        this.runSecondMethod(); // Call the second method
      }
      // Toggle the flag to switch between the methods on subsequent clicks
      this.isFirstClick = !this.isFirstClick;
    },

    runFirstMethod() {

      this.showCreateMilestones = false;
      this.showEditMilestoneForm = false;
      this.isBcardView = false;
      this.showMilestoneForm = false; // Toggle milestone form visibility
      this.isActivityView = false; // Determines which container is visible
      this.isMilestoneView = false;
      this.showStepInput = true;
    },
    runSecondMethod() {
      this.showCreateMilestones = false;
      this.showEditMilestoneForm = false;
      this.isBcardView = true;
      this.showMilestoneForm = false; // Toggle milestone form visibility
      this.isActivityView = false; // Determines which container is visible
      this.isMilestoneView = false;
      this.showStepInput = false;
    },
    toggleMilestoneForm() {
      this.showMilestoneForm = !this.showMilestoneForm;
    },
    toggleCreateMilestones() {
      this.showCreateMilestones = !this.showCreateMilestones;
      this.isMilestoneView = !this.isMilestoneView;
      this.isBcardView = !this.isBcardView;
    },

    toggleMilestones() {
      this.isMilestoneView = !this.isMilestoneView;
      this.isActivityView = !this.isActivityView;
    },
    goBackToMilestonesFromEditMilestone() {
      this.showEditMilestoneForm = false;
      this.isMilestoneView = true;
      this.isBcardView = true;
    },
    goBackToMilestonesFromCreateMilestone() {
      this.milestone = { title: '', description: '', beers: 0, steps: 0 }; // Reset form fields
      this.showCreateMilestones = false;
      this.isMilestoneView = true;
      this.isBcardView = true;
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

    confirmResetBeer() {
      const userConfirmed = window.confirm("Are you sure you want to reset your beers?");
      if (userConfirmed) {
        this.resetBeers();
      }
    },

  

    async deleteMilestones() {
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

    resetBeers() {
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
      
      console.log("Total beers reset to 0");
    },

    fetchUserData() {
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
          // Make sure beerLogs has valid dates
           // Ensure beerLogs has valid ISO date strings
      this.beerLogs = user.beerLogs; 
      console.log('Fetched beerLogs:', this.beerLogs); // Log to check data


          console.log('Fetched beerLogs:', this.beerLogs); // Log to check data
          
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });

    },


    resetSteps() {
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
       
          this.showToastNotification('Steps successfully logged!');
        })
        .catch((error) => {
          console.error('Error logging steps:', error);
          this.showToastNotification('Failed to log steps. Please try again.');
        });
      this.total_steps = 0; // Reset the total steps count to 0
  
      console.log("Total steps reset to 0");
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
          this.runSecondMethod();
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
          console.log('Selected beer:', selectedBeer.kcal);
          let newStepsNeeded = 0;
          if (selectedBeer.kcal = 170) {
            newStepsNeeded = user.steps_needed + 1888;
          } else if (selectedBeer.kcal = 220) {
            newStepsNeeded = user.steps_needed + 2444;
          } else if (selectedBeer.kcal = 250) {
            newStepsNeeded = user.steps_needed + 2777;
          } else {
            newStepsNeeded = 2000;
          }
          const newTotalBeers = user.total_beers + 1;
          
          // Prepare the new beer log
          const newBeerLog = {
            date: new Date().toISOString(), // Use ISO 8601 format to ensure correct
            count: newTotalBeers, // Total beers after increment
          };



          // Prepare the request body
          const requestBody = {
            total_beers: newTotalBeers,
            steps_needed: newStepsNeeded,
            beerLogs: [...user.beerLogs, newBeerLog], // Combine existing logs with the new one
          };



          return fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),


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
          this.beerLogs = updatedUser.beerLogs; // Update beerLogs with the latest logs
          this.$forceUpdate(); // Force Vue to re-render the chart; // Ensure the chart gets updated with the new
          this.showBeerCanvas = false; // Close the OffCanvas after selection
        })
        .catch((error) => {
          console.error('Error logging beer:', error);
          this.showToastNotification('Failed to log beer. Please try again.');
        });
    },
    updateChartData() {
      // Prepare beer data from the logs
      const beerData = this.beerLogs.map(log => {
        const logDate = new Date(log.date); // Parse the log date

        return {
          x: logDate, // Pass the full Date object to Chart.js (it will use the correct month)
          y: log.count, // Each log's count (1 for each logged beer)
        };
      });

      // Add the beer data to the chart
      this.chartData.datasets[0].data = beerData;
      console.log('Updating chart data:', this.chartData); // Debugging to verify data
    },
  },
};
</script>

<style scoped>



.activity-view {

  background: url('@/assets/set&homeBackground.jpg') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.milestone-label {
  color: whitesmoke;
  background-color: whitesmoke;
}

.save-milestone {
  margin-top: 5%;
}

.title {
  font-weight: 500;
  color: whitesmoke;
}

.beer-chart-title {
  font-weight: 500;
  color: whitesmoke;
}

.view-info {
  color: whitesmoke;
  margin-bottom: 5%;
  margin-top: 0%;
}

.view-info-steps {
  color: whitesmoke;
  margin-top: 5%;
  margin-bottom: 2.5%;
}

.milestone-title {
  color: whitesmoke;
}

.step-input-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 300px;
  height: auto;
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

.submit-steps-button {
  font-family: 'Tahoma';
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.3s ease;
  justify-content: center;
  width: 100%;
  margin-top: 2.5%;

}

.submit-button:hover {
  background-color: #218838;
}



.disabled-button {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}


.text-step-center {
  text-align: center;
  margin: 0;
  color: #ebb112;
  font-size: 6vh;
  font-family: 'sans-serif';
  margin-bottom: 0%;
  margin-top: 0vh;
  border: 0%;
  border-radius: 15px;
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
 /* border-radius: 15px; */
}

.go-back-button {
  margin-top: 5%;
  background-color: #ff5733;
  color: white;
  border: none;
}

.justify-content-center {
  margin-top: 0%;
}


.edit-milestones-button {
  margin-top: 2.5%;
}


.Milestones {
  width: 5vh;
  height: 100vh;
  margin-top: 5%;

}

.create-milestones-button {
  height: 100%;
  color: whitesmoke;
}

.milestones-button {
  margin-top: 10%;
  width: 15vh;
  height: 10vh;
  color: whitesmoke;

}

.reset-buton-button {
  border-radius: 15px;
}


.milestone-form {

  margin: auto;
}

.box {
  background-color: #02032b;
  border-radius: 3%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 0%;
  width: 50%;
  padding: 0;
}

.bcard {
  justify-content: center;
  display: flex;
  width: 100%;
}

.milestone-list {
  list-style-type: none;
  width: 100%;
  margin-bottom: 5%;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 15px;
}


.fixed-bottom {
  z-index: 1030;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.massive-button {
  font-family: 'Tahoma';
  color: whitesmoke;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  /* Smooth transitions */
  font-size: 100%;
  /* Increases the size of the text */
  width: 100%;
  height: 100%;
  /* Sets a fixed height */
  border-radius: 15px;
  flex: 1;
  /* Allows the button to grow and fill space */
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
  width: 100%;
  /* Ensures the container takes full width */
  display: flex;
  /* Use flexbox for the buttons to align */
  flex-wrap: nowrap;
  /* Prevent buttons from wrapping to the next line */
  justify-content: center;
  /* Center buttons within the container */
}

.button-col {
  flex: 1;
  /* Allow columns to grow equally */
  display: flex;
  /* Enable flexbox for button alignment */
  justify-content: center;
  /* Center the button within the column */
}

.milestones-button {
  border-radius: 15px;
  height: 100%;

}

.ber {
  margin-top: 0%;
}

.reset-button {
  border-radius: 15px;
}


.activity-buttons-container {

  background-color: #333;
}

/* Media Queries for smaller screens */

@media (max-width: 768px) {

.chart{
    display: none;
  }
 .bcard{
  width: 100%;
 }
}

@media (min-width: 320px) {

  .milestones-button {
    width: 100px;
  }

  .reset-button {
    width: 1px;

  }

  .box {
    margin-top: 50px;

  }


}

@media (min-width: 1024px) {

  .massive-button {
    width: 400px;
  }
}


@media (min-width: 768px) {


  .massive-button {
    width: 350px;
  }

  .buttons-container {
    width: 100%;
  }


  .steps {
    margin-top: 5%;
    text-align: center;
    /* Center the button within the column */
  }

  .ber {
    text-align: center;
  }
}

.milestones-button {
  margin: 0%;
}

@media (min-width: 1024px) {

  .massive-button {
    width: 470px;
  }


  .steps {

    text-align: center;
    /* Center the button within the column */
  }


}

@media (min-width: 1440px) {

  .row {
    justify-content: center;
    gap: 10px;
  }




  .massive-button {
    width: 650px;
  }

}




.reset-button {
  width: 150px;
  margin-left: 50px;
  margin-right: 50px;

}


.activity-box {
  width: 100%;
}


@media (min-height: 400px) {

  .box {
    margin-bottom: 250px;
  }

}


</style>
