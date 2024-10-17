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
            <div class="squad-list-header">
              <h2 class="squad-list-title">Your Squads</h2>
              <button class="manage-button" @click="goToManageSquads">Manage</button>
            </div>
            <ul class="squad-list">
              <li v-for="(squad, index) in squads" :key="index">
                <router-link :to="{ name: 'SquadSpace', params: { squadName: squad.squadName } }"> <p class="squad-name">{{ squad.squadName }}</p></router-link>
                <button class="invite-button" @click="openInviteModal(squad)">+ Invite</button>
                <button class="leave-button" @click="openLeaveModal(squad)">Leave</button>
              </li>
            <li v-if="squads.length === 0" class="no-squads">No squads yet</li>
          </ul>
        </div>

          <router-link to="/SquadSpace">Squad page</router-link>

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

      <!-- Leave Modal -->
      <div v-if="showLeaveModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeLeaveModal">&times;</span>
          <h2>Are you sure you want to leave {{ selectedSquad.squadName }}?</h2>
          <button class="leave-confirm-button" @click="confirmLeave">Yes</button>
          <button class="leave-cancel-button" @click="closeLeaveModal">No</button>
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
      showLeaveModal: false, // Controls viibility of leave modal
      inviteUsername: '', // Holds the username to invite
      selectedSquad: null // To store the currently selected squad for inviting
    }
  },
  async mounted() {
    await this.fetchSquads()
  },
  methods: {
    async fetchSquads() {
      const username = localStorage.getItem('username')
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
            this.squads = data.squads
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

    async sendInvite() {
      if (this.inviteUsername.trim()) {
        const squad_id = this.selectedSquad._id
        const username = this.inviteUsername

        if (squad_id && username) {
          try {
            // PATCH request to send the invite
            const response = await fetch(`http://localhost:3000/api/squads/${squad_id}/users/${username}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              }
            })

            if (response.ok) {
              const data = await response.json() // Parse JSON response
              console.log('Invite sent:', data)
              alert(`Invite sent to ${this.inviteUsername} for squad ${this.selectedSquad.squadName}!`) // Success message
              this.closeInviteModal() // Close the modal after sending the invite
            } else {
              throw new Error('Failed to send invite') // Throw an error for non-200 responses
            }
          } catch (error) {
            console.error('Error sending invite:', error)
            alert('An error occurred while sending the invite. Please try again.') // Error handling
          }
        } else {
          alert('Invalid squad or username.') // Additional validation if necessary
        }
      } else {
        alert('Please enter a username to invite.') // Input validation
      }
    },
    openLeaveModal(squad) {
      this.selectedSquad = squad // Store the selected squad
      this.showLeaveModal = true // Show the modal
    },

    async confirmLeave() {
      const username = localStorage.getItem('username') // Get the current user's username

      if (!username) {
        alert('No username found, please log in again.')
        return
      }

      if (this.selectedSquad && this.selectedSquad._id) { 
        const squad_id = this.selectedSquad._id 

        try {
          
          const response = await fetch(`http://localhost:3000/api/squads/${squad_id}/users/${username}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
            
          })

          
          if (response.ok) {
            const data = await response.json()
            console.log('Successfully left the squad:', data.message)
            alert(`You have left the squad "${this.selectedSquad.squadName}".`)
            this.showLeaveModal = false
            this.selectedSquad = null
            await this.fetchSquads() 
          } else {
            const errorData = await response.json()
            throw new Error(`Failed to leave squad: ${errorData.message}`)
          }
        } catch (error) {
          console.error('Error while leaving the squad:', error)
          alert('An error occurred while trying to leave the squad. Please try again.')
        }
      } else {
        alert('No squad selected to leave.')
      }
    },
    // Close the Leave Squad Modal
    closeLeaveModal() {
      this.showLeaveModal = false // Hide the modal
    },

    goToManageSquads() {
      this.$router.push('/ManageSquads');
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

.squad-list-header {
  display: flex;
  justify-content: space-between; /* This spaces out the title and button */
  align-items: center;
  margin-bottom: 20px; /* Adds space below the header */
}

.manage-button {
  margin-left: 10px; /* Slight margin for spacing */
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.manage-button:hover {
  background-color: #0056b3;
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

.squad-name {
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
  z-index: 1000; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  margin: auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 300px; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
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

.leave-button {
  margin-left: 10px;
  background-color: #ff4d4d;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}

.leave-button:hover {
  background-color: #e63939;
}

.leave-confirm-button {
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.leave-confirm-button:hover {
  background-color: #e63939;
}

.leave-cancel-button {
  background-color: #ccc;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.leave-cancel-button:hover {
  background-color: #aaa;
}
</style>
