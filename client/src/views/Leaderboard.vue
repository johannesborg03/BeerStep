<template>
  <div class="Leaderboard">
    <BCard class="b-card">
      <div class="controls">
        <button @click="fetchGlobalLeaderboardData" class="global-leaderboard-button">Global Ranking</button>
        
        <label for="squadSelect" style="color: whitesmoke;">
          <strong>Select Squad:</strong>
        </label>
        <select v-model="selectedSquad" @change="fetchLeaderboardData" class="squad-select">
          <option v-for="squad in squads" :key="squad._id" :value="squad">
            {{ squad.squadName }}
          </option>
        </select>
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
            <span v-if="sortKey === 'score'" class="sort-icon">
              {{ sortOrder === 1 ? '▲' : '▼' }}
            </span>
          </th>

          <th @click="sortBy('beers')" style="cursor: pointer;">
            Beers
            <span v-if="sortKey === 'totalBeers'">
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
          <td>{{ entry.beers }}</td> <!-- Display beers -->
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
            return (b[this.sortKey] - a[this.sortKey]) * this.sortOrder; // Change to descending order for ranking
          } else if (this.sortKey === 'beers') {
            return (b.beers - a.beers) * this.sortOrder; // Sort by beers
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
        const response = await fetch(`/api/users/${username}/squads`, {
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
        const response = await fetch(`/api/leaderboards/${leaderboardId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const leaderboard = await response.json();
          this.leaderboardData = leaderboard.rankings.map((ranking) => ({
            user: ranking.user,
            score: ranking.score,
            beers: ranking.beers,
          }));
          // Sorting is handled in the computed property
        } else {
          alert('Error fetching leaderboard. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        alert('Error fetching leaderboard. Please try again.');
      }
    },

    async fetchGlobalLeaderboardData() {
      try {
        const response = await fetch('/api/leaderboards?global=true', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();

          // Access the leaderboard array from the response
          const leaderboard = data.leaderboard;
          this.leaderboardData = leaderboard.map((entry) => ({
            user: entry.username,
            score: entry.score,
            beers: entry.beers
          }));
        } else {
          alert('Error fetching global leaderboard. Please try again.');
        }
      } catch (error) {
        alert('Error fetching global leaderboard. Please try again.');
      }
    },
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

.Leaderboard {
  padding: 20px;
  text-align: center;
  background-image: url('/src/assets/set&homeBackground.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column; 
  align-items: center;
}

h1 {
  font-size: 3rem;
  color: whitesmoke;
  margin-bottom: 20px;
  font-family: Tahoma;
}

.leaderboard-container {
  width: 60%;
  margin: 0 auto; 
}

.b-card {
  background-color: #333;
  width: 70%; 
  border-radius: 15px;
  padding: 10px;
  margin-top: 45px;
  border-radius: 15px;
}

.controls {
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 20px; 
}

.squad-select {
  font-family: Tahoma;
  font-size: 18px;
  width: 700px;
  border-radius: 10px;
  border: 2px solid #333; 
  font-family: Tahoma;
  padding: 8px 3px;
  color: #000;
}

.global-leaderboard-button {
  font-family: Tahoma;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 6.5px 10px;
}

.input-username {
  color: whitesmoke;
  font-family: Tahoma;
}

.toggle-rank {
  color: whitesmoke;
}

.leaderboard-table {
  width: 70%; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  border-radius: 15px; 
  overflow: hidden; 
  border: 0.5px solid #333;
}

thead {
  background-color: #333;
  color: #f1f1f1;
  border-top-left-radius: 15px; 
  border-top-right-radius: 15px;
  padding: 10px;
}

th,td {
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

tbody tr {
  background-color: #ddd;
}

td {
  font-size: 1.2rem;
}

@media (max-width: 1250px) {
  .leaderboard-container {
    width: 75%; 
  }

  th,td {
    font-size: 1rem;
    padding: 10px;
  }

  .controls {
    flex-direction: column; 
    align-items: stretch; 
    gap: 10px; 
  }
}

.squad-select {
  font-size: 18px;
  width: 100%;
  max-width: 700px;
  border-radius: 10px;
  padding: 8px;
}

@media (max-width: 600px) {
  .squad-select {
    width: 100%;
    font-size: 16px;
    padding: 5px;
  }

  th{
    font-size: 12px;
  }
  .sort-icon{
    font-size: 10px;
  }

  .leaderboard-table{
    width: 100%;
  }

  .b-card{
    width: 100%;
  }
}

@media (max-width: 400px) {
  .squad-select {
    font-size: 14px;
    padding: 4px;
  } 
}

</style>
