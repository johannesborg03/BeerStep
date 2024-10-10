<template>
  <body>
    <header>
      <h1>BeerStep</h1>
    </header>

    <main>
      <div class="container">
        <div class="box">
          <!-- Left side: Squads list -->
          <div class="squad-list-container">
            <h2 class="squad-list-title">Your Squads</h2>
            <ul class="squad-list">
              <li v-for="(squad, index) in squads" :key="index">
                {{ squad.squadName }} <!-- Display squad name -->
                <button class="invite-button" @click="openInviteModal(squad)">+ Invite</button>
              </li>
              <li v-if="squads.length === 0" class="no-squads">No squads yet</li>
            </ul>
          </div>

          <!-- Right side: Create Squad Form -->
          <div class="create-squad-container">
            <h1 class="title">Create Your Squad</h1>
            <p class="subtitle">
              Ready to create a squad and challenge others? Click the button to start!
            </p>

            <!-- Initial Create Squad Button -->
            <button v-if="!showForm" class="submit-button" @click="showForm = true">
              Create Squad
            </button>

            <!-- Form for entering squad name -->
            <div v-if="showForm">
              <input
                type="text"
                v-model="squadName"
                class="input-field"
                placeholder="Enter Squad Name"
              />
              <br /><br />
              <button class="submit-button" @click="submitSquad">
                Submit Squad
              </button>
            </div>

            <!-- Display success message -->
            <p v-if="successMessage" class="success-message">
              Squad "{{ squadName }}" created!
            </p>
          </div>
        </div>
      </div>

      <!-- Invite Modal -->
      <div v-if="showInviteModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeInviteModal">&times;</span>
          <h2>Invite a User</h2>
          <input
            type="text"
            v-model="inviteUsername"
            placeholder="Enter username to invite"
            class="input-field"
          />
          <button class="invite-button" @click="sendInvite">Send Invite</button>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  name: 'CreateSquad',
  data() {
    return {
      showForm: false, // Controls when to show the input field
      squadName: '', // Holds the squad name entered by the user
      successMessage: false, // Controls when to show the success message
      squads: [], // Array to hold the squads the user is a member of
      showInviteModal: false, // Controls the visibility of the invite modal
      inviteUsername: '', // Holds the username to invite
      selectedSquad: null // To store the currently selected squad for inviting
    }
  },
  async mounted() {
    // Call fetchSquads when the component is mounted
    await this.fetchSquads()
  },
  methods: {
    async fetchSquads() {
      const username = localStorage.getItem('username') // Retrieve the username from localStorage
      if (username) {
        try {
          const response = await fetch(`http://localhost:3000/api/users/${username}/squads`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (response.ok) {
            const data = await response.json()
            this.squads = data.squads // Set the squads from the response data
          } else {
            const errorData = await response.json()
            console.error(`Error fetching squads: ${errorData.message}`)
          }
        } catch (error) {
          console.error('Error fetching squads:', error)
        }
      } else {
        console.error('No username found in localStorage')
      }
    },

    async submitSquad() {
      const username = localStorage.getItem('username') // Retrieve the username from localStorage

      if (this.squadName.trim()) {
        try {
          // Step 1: Fetch user details including the user ID from the backend using the username
          const userResponse = await fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          // Step 2: Check if user is found and extract the user ID
          if (!userResponse.ok) {
            const errorData = await userResponse.json()
            alert(`Error fetching user: ${errorData.message}`)
            return // Stop the execution if user not found
          }

          const userData = await userResponse.json()
          const userId = userData._id // Assuming _id is the user ID field in MongoDB

          // Step 3: Prepare the squad data using the user ID and username
          const squadData = {
            squadName: this.squadName, // The squad name from the input field
            created_by: userId, // The user's ID from the fetched data
            created_by_username: username, // The username from localStorage
            users: [userId], // Initialize with the creator's user ID
            leaderboard: [] // Empty leaderboard initially
          }

          // Step 4: Call the API to create the squad
          const response = await fetch('http://localhost:3000/api/squads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(squadData) // Send the squad data in the request body
          })

          // Step 5: Handle the squad creation response
          if (response.ok) {
            const createdSquad = await response.json()
            // Display success message
            this.successMessage = true
            this.showForm = false // Hide the form after submitting
            console.log('Squad created:', createdSquad)

            // Fetch squads again to update the list
            await this.fetchSquads()
          } else {
            const errorData = await response.json()
            alert(`Error creating squad: ${errorData.message}`)
          }
        } catch (err) {
          // Handle any unexpected errors
          console.error('Error creating squad:', err)
          alert('An error occurred while creating the squad. Please try again.')
        }
      } else {
        // Handle case where the squad name is not entered
        alert('Please enter a squad name')
      }
    },

    openInviteModal(squad) {
      this.selectedSquad = squad // Store the squad being invited to
      this.showInviteModal = true // Show the modal
      this.inviteUsername = '' // Clear the input field
    },

    closeInviteModal() {
      this.showInviteModal = false // Hide the modal
    },

    sendInvite() {
      
      if (this.inviteUsername.trim()) {
        console.log(`Inviting ${this.inviteUsername} to ${this.selectedSquad.squadName}`)
        

        
        this.closeInviteModal()
      } else {
        alert('Please enter a username to invite.')
      }
    }
  }
}
</script>

<style scoped>
header {
  text-align: center;
  color: white;
  font-size: 16px;
  padding: 20px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-image: url("/src/assets/logInBack.jpg");
  background-size: cover;
  background-position: center;
  margin: 0;
  height: 100vh;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.box {
  display: flex;
  justify-content: space-between;
  width: 80%;
  background-color: rgb(238, 238, 238);
  border-radius: 3%;
  padding: 20px;
  height: 70vh;
  margin: 0;
  color: black;
}

.squad-list-container {
  width: 40%;
  text-align: left;
  margin-right: 20px;
}

.squad-list-title {
  font-size: 24px;
  font-weight: 500;
  color: black;
}

.squad-list {
  list-style: none;
  padding: 0;
}

.squad-list li {
  font-size: 18px;
  padding: 5px 0;
}

.no-squads {
  font-size: 16px;
  color: grey;
}

.create-squad-container {
  width: 50%;
  text-align: center;
}

.title {
  color: black;
  margin: 0;
  font-weight: 400;
}

.subtitle {
  padding-top: 10px;
  padding-bottom: 70px;
  font-weight: 400;
  color: black;
}

.input-field {
  width: 380px;
  height: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 18px;
  font-size: 14px;
}

.submit-button {
  width: 400px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 18px;
  font-size: 16px;
  background-color: #ebb112;
  margin-bottom: 30px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #d99f10;
}

.success-message {
  color: green;
  font-weight: bold;
  font-size: 18px;
  padding-top: 20px;
}

/* Modal styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000; /* Increased z-index for visibility */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  margin: auto; /* Centers the modal horizontally */
  padding: 20px;
  border: 1px solid #888;
  width: 300px; /* Fixed width for better alignment */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added shadow for depth */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.invite-button {
  margin-left: 10px;
  background-color: #ebb112;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}

.invite-button:hover {
  background-color: #d99f10;
}
</style>