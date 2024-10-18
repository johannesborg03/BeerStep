<template>
  <body>
    <header>
      <h1>Manage Squads</h1>
    </header>

    <main>
      <div class="container mt-4">
        <div class="row">
          <!-- Left side: Squads list -->
          <div class="col-lg-5">
            <div class="card shadow">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h2 class="h5 mb-0">Your Squads</h2>
                <div class="d-flex">
                  <select
                    v-model="squadFilter"
                    class="form-select form-select-sm me-2"
                    @change="filterSquads"
                  >
                    <option value="all">All Squads</option>
                    <option value="admin">Squads You Admin</option>
                  </select>
                  <button
                    class="btn btn-danger btn-sm"
                    v-if="isAdminView && filteredSquads.length > 0"
                    @click="deleteAllAdminSquads"
                  >
                    Delete All
                  </button>
                </div>
              </div>

              <ul class="list-group list-group-flush">
                <li
                  v-for="(squad, index) in filteredSquads"
                  :key="index"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span @click="openSquadDetails(squad)" class="squad-name">
                    {{ squad.squadName }}
                    <span v-if="isUserAdmin(squad)" class="badge bg-success ms-2">Admin</span>
                  </span>
                  <div>
                    <button
                      v-if="isUserAdmin(squad)"
                      class="btn btn-danger btn-sm me-2"
                      @click.stop="deleteSquad(squad)"
                    >
                      Delete
                    </button>
                    <button class="btn btn-warning btn-sm me-2" @click.stop="openInviteModal(squad)">
                      + Invite
                    </button>
                    <button class="btn btn-secondary btn-sm" @click.stop="openLeaveModal(squad)">
                      Leave
                    </button>
                  </div>
                </li>
                <li v-if="filteredSquads.length === 0" class="list-group-item text-center text-muted">
                  No squads yet
                </li>
              </ul>
            </div>
          </div>

          <!-- Right side: Squad Members List or Default Message -->
          <div class="col-lg-7">
            <div class="card shadow" v-if="selectedSquad">
              <div class="card-header">
                <h2 class="h5 mb-0">{{ selectedSquad.squadName }} Members</h2>
              </div>
              <ul class="list-group list-group-flush">
                <li v-for="(member, index) in selectedSquad.users" :key="index" class="list-group-item">
                  {{ member.username }}
                  <button
                    v-if="isUserAdmin(selectedSquad) && member.username !== currentUsername"
                    class="btn btn-danger btn-sm float-end"
                    @click="kickMember(selectedSquad, member)"
                  >
                    Kick
                  </button>
                </li>
              </ul>
            </div>
            <div v-else class="card shadow">
              <div class="card-body text-center">
                <h2 class="h5">Select a Squad to View Members</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Invite Modal -->
      <div v-if="showInviteModal" class="modal show d-block" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Invite a User</h5>
              <button type="button" class="btn-close" @click="closeInviteModal"></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                v-model="inviteUsername"
                placeholder="Enter username to invite"
                class="form-control"
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="sendInvite">Send Invite</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Leave Modal -->
      <div v-if="showLeaveModal" class="modal show d-block" tabindex="-1">
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
              <button type="button" class="btn btn-danger" @click="confirmLeave">Yes</button>
              <button type="button" class="btn btn-secondary" @click="closeLeaveModal">No</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  name: "SquadManager",
  data() {
    return {
      squads: [],
      selectedSquad: null,
      squadFilter: "all",
      currentUsername: localStorage.getItem("username"),
      showInviteModal: false,
      showLeaveModal: false,
      inviteUsername: "",
      filteredSquads: [],
      isAdminView: false,
    };
  },
  async mounted() {
    await this.fetchSquads();
    this.filterSquads();
  },
  methods: {
    async fetchSquads() {
      const username = this.currentUsername;
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${username}/squads`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.squads = data.squads.map((squad) => ({
          ...squad,
          isAdmin: squad.created_by.username === this.currentUsername,
        }));
        this.filterSquads();
      } catch (error) {
        console.error("Error fetching squads:", error);
      }
    },
    isUserAdmin(squad) {
      return squad.isAdmin;
    },
    filterSquads() {
      this.isAdminView = this.squadFilter === "admin";
      if (this.isAdminView) {
        this.filteredSquads = this.squads.filter((squad) =>
          this.isUserAdmin(squad)
        );
      } else {
        this.filteredSquads = this.squads;
      }
    },
    async openSquadDetails(squad) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/squads/${squad._id}/users/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const users = await response.json();
        this.selectedSquad = { ...squad, users };
      } catch (error) {
        console.error("Error fetching squad members:", error);
      }
    },
    async deleteSquad(squad) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/squads/${squad._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          alert("Squad successfully deleted");
          this.fetchSquads();
          this.selectedSquad = null;
        } else {
          const errorData = await response.json();
          throw new Error(`Failed to delete squad: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error while deleting squad:", error);
        alert("An error occurred while trying to delete the squad.");
      }
    },
    async deleteAllAdminSquads() {
      const confirmDeletion = confirm(
        "Are you sure you want to delete all squads you admin?"
      );
      if (!confirmDeletion) return;

      const username = this.currentUsername;
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${username}/squads`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          alert(`Deleted squads: ${result.deletedSquads.join(", ")}`);
          await this.fetchSquads();
          this.selectedSquad = null;
        } else {
          const errorData = await response.json();
          throw new Error(`Failed to delete squads: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error while deleting all admin squads:", error);
        alert("An error occurred while trying to delete all admin squads.");
      }
    },
    async kickMember(squad, member) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/squads/${squad._id}/users/${member.username}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          alert(`Successfully removed ${member.username} from the squad.`);
          this.openSquadDetails(squad); // Refresh the squad members
        } else {
          const errorData = await response.json();
          throw new Error(`Failed to kick member: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error while kicking member:", error);
        alert("An error occurred while trying to kick the member.");
      }
    },
    openInviteModal(squad) {
      this.selectedSquad = squad;
      this.showInviteModal = true;
    },
    closeInviteModal() {
      this.showInviteModal = false;
    },
    openLeaveModal(squad) {
      this.selectedSquad = squad;
      this.showLeaveModal = true;
    },
    closeLeaveModal() {
      this.showLeaveModal = false;
    },
    confirmLeave() {
      alert(`Left the squad: ${this.selectedSquad.squadName}`);
      this.showLeaveModal = false;
    },
    sendInvite() {
      alert(`Sent invite to ${this.inviteUsername}`);
      this.closeInviteModal();
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-image: url("/src/assets/logInBack.jpg");
  background-size: cover;
  background-position: center;
  margin: 0;
  height: 100vh;
}

header {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 1rem 0;
}

h1 {
  margin: 0;
}

.squad-name {
  cursor: pointer;
  font-weight: 500;
}

.squad-name:hover {
  text-decoration: underline;
}

.card {
  border-radius: 0.5rem;
}

.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>