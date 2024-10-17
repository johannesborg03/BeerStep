<template>
  <div class="Leaderboard">
    <h1>Leaderboard</h1>
    <BCard class="b-card">
      <div class="controls">
        <!-- Squad Dropdown to select squad -->
        <label for="squadSelect" style="color: whitesmoke;">
          <strong>Select Squad:</strong>
        </label>
        <select v-model="selectedSquad" @change="fetchLeaderboardData" class="squad-select">
          <option v-for="squad in squads" :key="squad._id" :value="squad">
            {{ squad.squadName }}
          </option>
        </select>
        <button @click="fetchGlobalLeaderboardData" class="global-leaderboard-button">
          View Global Leaderboard
        </button>

        <!-- Filtering Input for Username -->
        <label class="input-username">
          <strong>Filter by Username:</strong>
        </label>
        <input style="border-radius: 8px;" v-model="usernameFilter" type="text" placeholder="Search by username" />

        <div class="toggle-rank">
          <label>
            <input type="checkbox" v-model="showRank" />
            Show Rank
          </label>
        </div>
      </div>
    </BCard>

    <!-- Leaderboard Table -->
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th v-if="showRank">Rank</th>
          <th>User</th>
          <th @click="sortBy('score')" style="cursor: pointer;">
            Points
            <span v-if="sortKey === 'score'">
              {{ sortOrder === 1 ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in filteredLeaderboard" :key="index">
          <td v-if="showRank">{{ index + 1 }}</td>
          <td>{{ entry.user }}</td>
          <td>{{ entry.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Leaderboard',
  data() {
    return {
      leaderboardData: [], // To store leaderboard rankings
      squads: [], // To store the fetched squads
      selectedSquad: null, // Stores the selected squad object
      sortKey: 'score', // Sort by score by default
      sortOrder: 1, // 1 for ascending, -1 for descending
      usernameFilter: '', // Filter for username
      showRank: true, // Control rank visibility
    };
  },
  computed: {
    filteredLeaderboard() {
      return this.leaderboardData
        .filter(entry => entry.user.toLowerCase().includes(this.usernameFilter.toLowerCase())) 
        .sort((a, b) => {
          if (this.sortKey === 'score') {
            return (a[this.sortKey] - b[this.sortKey]) * this.sortOrder; 
          }
          return 0; // Default case (no sorting if not by score)
        });
    },
  },
  methods: {
    // Fetch squads
    async fetchSquads() {
      const username = localStorage.getItem('username');
      if (!username) {
        alert('No username found. Please log in again.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/users/${username}/squads`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.squads = data.squads;
          if (this.squads.length > 0) {
            this.selectedSquad = this.squads[0]; // Select the first squad by default
            this.fetchLeaderboardData(); // Fetch leaderboard for the first squad
          }
        } else {
          alert('Error fetching squads. Please try again.');
        }
      } catch (error) {
        alert('Error fetching squads. Please try again.');
      }
    },

    async fetchLeaderboardData() {
      if (!this.selectedSquad) return;

      const leaderboardId = this.selectedSquad.leaderboard;
      try {
        const response = await fetch(`http://localhost:3000/api/leaderboards/${leaderboardId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const leaderboard = await response.json();
          this.leaderboardData = leaderboard.rankings.map((ranking) => ({
            user: ranking.userId.username,
            score: ranking.score,
          }));
          // Sorting is handled in the computed property
        } else {
          alert('Error fetching leaderboard. Please try again.');
        }
      } catch (error) {
        alert('Error fetching leaderboard. Please try again.');
      }
    },

    async fetchGlobalLeaderboardData() {
      try {
        const response = await fetch('http://localhost:3000/api/leaderboards/type/global', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const leaderboard = await response.json();
          this.leaderboardData = leaderboard.map((entry) => ({
            user: entry.username,
            score: entry.score,
          }));
          // Sorting is handled in the computed property
        } else {
          alert('Error fetching global leaderboard. Please try again.');
        }
      } catch (error) {
        alert('Error fetching global leaderboard. Please try again.');
      }
    },

    // Sort the leaderboard by the selected key (only score in this case)
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1; // Toggle sorting order
      } else {
        this.sortKey = key;
        this.sortOrder = 1; // Reset to ascending when a new column is selected
      }
  
    },
  },
  mounted() {
    this.fetchSquads();
  },
};
</script>

<style scoped>
/* Leaderboard Styles */
.Leaderboard {
  padding: 20px;
  text-align: center;
  background-image: url('/src/assets/squad.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center items horizontally */
}

h1 {
  font-size: 3rem;
  color: whitesmoke;
  margin-bottom: 20px;
  font-family: Tahoma;
}

.b-card {
  background-color: #333;
  max-width: 85%; 
 max-width: 980px; /* Set a max-width */
  margin: 0 auto; /* Center it horizontally */
  border-radius: 15px;
  align-items: center;
}

.controls {
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 20px; 
}

.squad-select {
  font-size: 24px;
  padding: 5px 20px;
  border-radius: 10px;
  border: 2px solid #333; 
}

.global-leaderboard-button {
  font-family: Tahoma;
  border-radius: 15px;
  background-color: whitesmoke;
  padding: 10px 5px; 
}

.input-username {
  color: whitesmoke;
  font-family: Tahoma;
}

.toggle-rank {
  color: whitesmoke;
}

.leaderboard-table {
  width: 90%;
  border-collapse: collapse;
  background-color: #f8f8f8;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}

thead {
  background-color: #333;
  color: #f1f1f1;
}

th,
td {
  padding: 15px;
  text-align: left;
  font-size: 1.5rem;
}

th {
  text-transform: uppercase;
  border-bottom: 2px solid #ddd;
}

th span {
  font-size: 0.8rem;
  margin-left: 5px;
}

tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #ddd;
}

td {
  font-size: 1.2rem;
}

@media (max-width: 815px) {
  h1 {
    font-size: 2rem;
  }

  .b-card {
    width: 100%; 
    padding: 10px; 
  }

  th,
  td {
    font-size: 1rem;
    padding: 10px;
  }

  .controls {
    flex-direction: column; /* Stack controls vertically on smaller screens */
    align-items: stretch; 
    gap: 10px; 
  }

  .squad-select {
    font-size: 20px; /* Adjust font size for smaller screens */
  }
}
</style>
