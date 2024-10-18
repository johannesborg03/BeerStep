<template>
  <body>
    <header style="margin-bottom: 40px;"></header>
    <main>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="card p-3">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="h4">Your Squads</h2>
                <button class="btn btn-primary" @click="goToManageSquads">Manage</button>
              </div>
              <ul class="list-group mt-3">
                <li v-for="(squad, index) in squads" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                  <p class="squad-name" @click="goToSquadSpace(squad.squadName)"> {{ squad.squadName }}</p>
                  <div>
                    <button class="btn btn-warning btn-sm me-2" @click="openInviteModal(squad)">+ Invite</button>
                    <button class="btn btn-danger btn-sm" @click="openLeaveModal(squad)">Leave</button>
                  </div>
                </li>
                <li v-if="squads.length === 0" class="list-group-item text-muted">No squads yet</li>
              </ul>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card text-center p-3">
              <h1 class="h3">Create Your Squad</h1>

              <p v-if="!showForm && !successMessage" class="text-muted">
                Ready to create a squad and challenge others? Click the button to start!
              </p>

              <button v-if="!showForm" class="btn btn-warning btn-lg" @click="openForm">Create Squad</button>

              <div v-if="showForm" class="mt-3">
                <input type="text" v-model="squadName" class="form-control mb-3" placeholder="Enter Squad Name" />
                <button class="btn btn-warning btn-lg" @click="submitSquad">Submit Squad</button>
              </div>

              <p v-if="successMessage" class="text-success mt-3">Squad "{{ squadName }}" created!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Invite and Leave Modals remain unchanged -->
      <div v-if="showInviteModal" class="modal d-block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Invite a User</h5>
              <button type="button" class="btn-close" @click="closeInviteModal"></button>
            </div>
            <div class="modal-body">
              <input type="text" v-model="inviteUsername" class="form-control" placeholder="Enter username to invite" />
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" @click="sendInvite">Send Invite</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showLeaveModal" class="modal d-block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Leave Squad</h5>
              <button type="button" class="btn-close" @click="closeLeaveModal"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to leave {{ selectedSquad.squadName }}?</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger" @click="confirmLeave">Yes</button>
              <button class="btn btn-secondary" @click="closeLeaveModal">No</button>
            </div>
          </div>
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
      showForm: false,
      squadName: '',
      successMessage: false,
      squads: [],
      showInviteModal: false,
      showLeaveModal: false,
      inviteUsername: '',
      selectedSquad: null
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
      const username = localStorage.getItem('username')

      if (this.squadName.trim()) {
        try {
          const userResponse = await fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (!userResponse.ok) {
            const errorData = await userResponse.json()
            alert(`Error fetching user: ${errorData.message}`)
            return
          }

          const userData = await userResponse.json()
          const userId = userData._id

          const squadData = {
            squadName: this.squadName,
            created_by: userId,
            created_by_username: username,
            users: [userId],
            leaderboard: []
          }

          const response = await fetch('http://localhost:3000/api/squads', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(squadData)
          })

          if (response.ok) {
            const createdSquad = await response.json()
            this.successMessage = true
            this.showForm = false
            await this.fetchSquads()
          } else {
            const errorData = await response.json()
            alert(`Error creating squad: ${errorData.message}`)
          }
        } catch (err) {
          console.error('Error creating squad:', err)
          alert('An error occurred while creating the squad. Please try again.')
        }
      } else {
        alert('Please enter a squad name')
      }
    },

    openInviteModal(squad) {
      this.selectedSquad = squad
      this.showInviteModal = true
      this.inviteUsername = ''
    },

    closeInviteModal() {
      this.showInviteModal = false
    },

    async sendInvite() {
      if (this.inviteUsername.trim()) {
        const squad_id = this.selectedSquad._id
        const username = this.inviteUsername

        if (squad_id && username) {
          try {
            const response = await fetch(`http://localhost:3000/api/squads/${squad_id}/users/${username}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              }
            })

            if (response.ok) {
              alert(`Invite sent to ${this.inviteUsername} for squad ${this.selectedSquad.squadName}!`)
              this.closeInviteModal()
            } else {
              throw new Error('Failed to send invite')
            }
          } catch (error) {
            console.error('Error sending invite:', error)
            alert('An error occurred while sending the invite. Please try again.')
          }
        } else {
          alert('Invalid squad or username.')
        }
      } else {
        alert('Please enter a username to invite.')
      }
    },

    openLeaveModal(squad) {
      this.selectedSquad = squad
      this.showLeaveModal = true
    },

    async confirmLeave() {
      const username = localStorage.getItem('username')

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
            alert(`You have left the squad "${this.selectedSquad.squadName}".`)
            this.showLeaveModal = false
            this.selectedSquad = null
            await this.fetchSquads()
          } else {
            const errorData = await response.json()
            throw new Error(`Failed to leave squad: ${errorData.message}`)
          }
        } catch (error) {
          console.error('Error leaving squad:', error)
          alert('An error occurred while trying to leave the squad. Please try again.')
        }
      } else {
        alert('No squad selected.')
      }
    },

    closeLeaveModal() {
      this.showLeaveModal = false
    },

    openForm() {
      this.showForm = true
      this.successMessage = ''
      this.squadName = ''
    },

    goToManageSquads() {
      this.$router.push('/ManageSquads')
    },
    goToSquadSpace(squadName) {
    this.$router.push({ name: 'SquadSpace', params: { squadName } });
  },
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

header {
  background-color: transparent; /* Change to desired color */
  color: white; /* Set header text to white */
  padding: 10px; /* Add padding */
}

body {
  background: url('@/assets/set&homeBackground.jpg') no-repeat center center fixed;
  background-size: cover; /* Ensure the image covers the entire area */
  height: 100vh; /* Set full height for the body */
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
}

.container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
}

.row {
  margin-top: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  max-width: 400px;
}

.squad-name {
  margin: 0;
  color: #0d6efd;
  font-weight: 500;
}

.squad-name:hover {
  cursor: pointer;
}
</style>