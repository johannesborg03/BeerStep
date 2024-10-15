<template>
  <div class="Leaderboard">
    <h1>Leaderboard</h1>
    <div>
      <!-- Squad Dropdown to select squad -->
      <label for="squadSelect">Select Squad:</label>
      <select v-model="selectedSquad" @change="fetchLeaderboardData" class="squad-select">
        <option v-for="squad in squads" :key="squad._id" :value="squad">
          {{ squad.squadName }}
        </option>
      </select>

      <!-- Global Leaderboard Button -->
      <button @click="fetchGlobalLeaderboardData" class="global-leaderboard-button">
        View Global Leaderboard
      </button>
    </div>

    <!-- Leaderboard Table -->
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in leaderboardData" :key="index">
          <td>{{ index + 1 }}</td>
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
    };
  },
  methods: {
    async fetchSquads() {
      const username = localStorage.getItem('username'); // Get the username from localStorage
      if (!username) {
        alert('No username found. Please log in again.');
        return;
      }

      try {
        // Fetch the squads for the user
        const response = await fetch(`http://localhost:3000/api/users/${username}/squads`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.squads = data.squads; // Populate the squads array with the API response
          if (this.squads.length > 0) {
            this.selectedSquad = this.squads[0]; // Select the first squad by default
            this.fetchLeaderboardData(); // Fetch leaderboard for the first squad
          }
        } else {
          const errorData = await response.json();
          console.error('Error fetching squads:', errorData.message);
          alert('Error fetching squads. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching squads:', error);
        alert('Error fetching squads. Please try again.');
      }
    },

    async fetchLeaderboardData() {
      if (!this.selectedSquad) {
        return; // Do nothing if no squad is selected
      }
    
      const leaderboardId = this.selectedSquad.leaderboard; // Get leaderboard_id from the selected squad
      console.log(leaderboardId);

      try {
        // Fetch the leaderboard data using the leaderboard_id
        const response = await fetch(`http://localhost:3000/api/leaderboards/${leaderboardId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const leaderboard = await response.json();
          // Populate the leaderboardData with user data and scores
          this.leaderboardData = leaderboard.rankings.map((ranking) => ({
            user: ranking.userId.username, // Assuming the `userId` is populated with the user object containing `username`
            score: ranking.score,
          }));
        } else {
          const errorData = await response.json();
          console.error('Error fetching leaderboard:', errorData.message);
          alert('Error fetching leaderboard. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        alert('Error fetching leaderboard. Please try again.');
      }
    },

    // New Method to fetch the Global Leaderboard
    async fetchGlobalLeaderboardData() {
      try {
        console.log("Entered method");
        // Fetch the global leaderboard data
        const response = await fetch('http://localhost:3000/api/leaderboards/type/global', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("call good");
        if (response.ok) {
          const leaderboard = await response.json();
          // Populate the leaderboardData with global user data and scores
          this.leaderboardData = leaderboard.map((entry) => ({
            user: entry.username, // Use the username directly from the global leaderboard data
            score: entry.score,
          }));
        } else {
          const errorData = await response.json();
          console.error('Error fetching global leaderboard:', errorData.message);
          alert('Error fetching global leaderboard. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching global leaderboard:', error);
        alert('Error fetching global leaderboard. Please try again.');
      }
    },
  },
  mounted() {
    this.fetchSquads(); // Fetch the squads when the component is mounted
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
}

h1 {
  font-size: 3rem;
  color: #000000;
  margin-bottom: 20px;
}

.squad-select {
  font-size: 24px;
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #ccc;
  margin-bottom: 20px;
}

.leaderboard-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f8f8f8;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

thead {
  background-color: #333;
  color: #f1f1f1;
}

th, td {
  padding: 15px;
  text-align: left;
  font-size: 1.5rem; 
}

th {
  text-transform: uppercase;
  border-bottom: 2px solid #ddd;
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

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  th, td {
    font-size: 1rem;
    padding: 10px;
  }
}
.massive-button {
  font-family: 'sans-serif';
  width: 600px;
  height: 500px;
  font-size: 100px;
  color: rgb(6, 4, 1);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.beer {
  background-color: #28a745;
}

.beer:hover {
  background-color: #218838;
  transform: scale(1.2);
}

.log-step {
  background-color: #007bff;
}

.log-step:hover {
  background-color: #0056b3;
  transform: scale(1.2);
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 500px;
  margin-top: 20px;
}
</style>
