<template>
    <body>
      <header>
        <h1>Manage Squads</h1>
      </header>

      <main>
        <div class="container">
          <div class="box">
            <!-- Left side: Squads list -->
            <div class="squad-list-container">
              <div class="squad-list-header">
                <h2 class="squad-list-title">Your Squads</h2>
                <div>
                  <select v-model="squadFilter" @change="filterSquads">
                    <option value="all">All Squads</option>
                    <option value="admin">Squads You Admin</option>
                  </select>
                  <button
                    class="manage-button"
                    v-if="isAdminView && filteredSquads.length > 0"
                    @click="deleteAllAdminSquads"
                  >
                    Delete All
                  </button>
                </div>
              </div>

              <ul class="squad-list">
  <li
    v-for="(squad, index) in filteredSquads"
    :key="index"
    @click="openSquadDetails(squad)"
    class="squad-item"
  >
    {{ squad.squadName }}
    <!-- Display 'Admin' label if the user is the admin of the squad -->
    <span v-if="isUserAdmin(squad)" class="admin-label">Admin</span>
    <button
      v-if="isUserAdmin(squad)"
      class="delete-button"
      @click.stop="deleteSquad(squad)"
    >
      Delete
    </button>
    <button class="invite-button" @click.stop="openInviteModal(squad)">
      + Invite
    </button>
    <button class="leave-button" @click.stop="openLeaveModal(squad)">
      Leave
    </button>
  </li>
  <li v-if="filteredSquads.length === 0" class="no-squads">No squads yet</li>
</ul>
            </div>

            <!-- Right side: Squad Members List or Default Message -->
            <div class="squad-members-container" v-if="selectedSquad">
              <h1 class="title">{{ selectedSquad.squadName }} Members</h1>
              <ul class="members-list">
                <li v-for="(member, index) in selectedSquad.users" :key="index">
                  {{ member.username }}
                  <button
                    v-if="isUserAdmin(selectedSquad) && member.username !== currentUsername"
                    class="kick-button"
                    @click="kickMember(selectedSquad, member)"
                  >
                    Kick
                  </button>
                </li>
              </ul>
            </div>

            <!-- Default content before selecting a squad -->
            <div v-else class="default-message">
              <h1 class="title">Select a Squad to View Members</h1>
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
  name: 'SquadManager',
  data() {
    return {
      squads: [], // Full list of squads
      selectedSquad: null, // The currently selected squad for viewing members
      squadFilter: 'all', // 'all' or 'admin'
      currentUsername: localStorage.getItem('username'), // The current user's username
      showInviteModal: false,
      showLeaveModal: false,
      inviteUsername: '',
      filteredSquads: [], // Squads filtered by 'all' or 'admin'
      isAdminView: false // Determines if the user is viewing admin squads
    }
  },
  async mounted() {
    await this.fetchSquads()
    this.filterSquads() // Set initial filtered squads list
  },
  methods: {
    async fetchSquads() {
  const username = this.currentUsername;
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${username}/squads`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    
    this.squads = data.squads.map(squad => ({
      ...squad,
      isAdmin: squad.created_by.username === this.currentUsername
    }));
    
    this.filterSquads(); 
  } catch (error) {
    console.error('Error fetching squads:', error);
  }
},

    isUserAdmin(squad) {
    
      return squad.isAdmin
    },

    filterSquads() {
      this.isAdminView = this.squadFilter === 'admin'
      if (this.isAdminView) {
        // Filter only squads where the user is the admin
        this.filteredSquads = this.squads.filter((squad) =>
          this.isUserAdmin(squad)
        )
      } else {
        // Show all squads
        this.filteredSquads = this.squads
      }
    },

    async openSquadDetails(squad) {
      try {
        // Fetch the squad members from the API
        const response = await fetch(
            `http://localhost:3000/api/squads/${squad._id}/users/`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }
        )
        const users = await response.json()

        // Update the selected squad with members from the response
        this.selectedSquad = {
          ...squad,
          users // Add users to the selected squad
        }
      } catch (error) {
        console.error('Error fetching squad members:', error)
      }
    },

    deleteSquad(squad) {
      alert(`Delete squad: ${squad.squadName}`)
    },

    deleteAllAdminSquads() {
      alert('Delete all admin squads')
    },

    async kickMember(squad, member) {
  const username = localStorage.getItem('username'); // Current logged-in user's username

  if (!username) {
    alert('No username found, please log in again.');
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/squads/${squad._id}/users/${member.username}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`Successfully kicked user: ${member.username}`, data.message);
      alert(`User ${member.username} has been kicked from squad "${squad.squadName}".`);

      
      await this.openSquadDetails(squad);
    } else {
      const errorData = await response.json();
      throw new Error(`Failed to kick member: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error while kicking the member:', error);
    alert('An error occurred while trying to kick the member. Please try again.');
  }
},

    openInviteModal(squad) {
      this.selectedSquad = squad
      this.showInviteModal = true
    },

    closeInviteModal() {
      this.showInviteModal = false
    },

    openLeaveModal(squad) {
      this.selectedSquad = squad
      this.showLeaveModal = true
    },

    closeLeaveModal() {
      this.showLeaveModal = false
    },

    confirmLeave() {
      alert(`Left the squad: ${this.selectedSquad.squadName}`)
      this.showLeaveModal = false
    },

    sendInvite() {
      alert(`Sent invite to ${this.inviteUsername}`)
      this.closeInviteModal()
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .manage-button {
    margin-left: 10px;
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

  .squad-item {
    font-size: 18px;
    padding: 5px 0;
    cursor: pointer;
  }

  .admin-label {
    color: green;
    font-weight: bold;
    margin-left: 10px;
  }

  .no-squads {
    font-size: 16px;
    color: grey;
  }

  .default-message {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .title {
    font-size: 20px;
    color: black;
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

.squad-members-container {
  width: 50%;
  text-align: left;
  padding-left: 20px;
}

.members-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.members-list li {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.kick-button, .delete-button, .leave-button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

.kick-button:hover, .delete-button:hover, .leave-button:hover {
    background-color: #d32f2f;
  }

  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    background-color: white;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover, .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
