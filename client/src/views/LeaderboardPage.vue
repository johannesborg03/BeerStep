<template>
  <div class="Leaderboard">
    <h1>Leaderboard</h1>
    <div>
      <label for="squadSelect">Select Squad:</label>
      <select v-model="selectedSquad" @change="fetchLeaderboardData" class="squad-select">
        <option v-for="squad in squads" :key="squad._id" :value="squad.squad_id">
          {{ squad.squadName }}
        </option>
      </select>
    </div>
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Steps Taken</th>
          <th>Beers Consumed</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in leaderboardData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ entry.username }}</td>
          <td>{{ entry.stepsTaken }}</td>
          <td>{{ entry.beersConsumed }}</td>
          <td>{{ calculatePoints(entry.stepsTaken, entry.beersConsumed) }}</td>
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
      leaderboardData: [
        { username: 'John Doe', stepsTaken: 10000, beersConsumed: 5 },
        { username: 'Jane Smith', stepsTaken: 12000, beersConsumed: 3 },
        { username: 'Alex Johnson', stepsTaken: 8000, beersConsumed: 2 },
        { username: 'Emily Davis', stepsTaken: 9000, beersConsumed: 6 },
        { username: 'Michael Brown', stepsTaken: 11000, beersConsumed: 4 }
      ],
      squads: [
        { squad_id: 1, squadName: 'Alpha Squad' },
        { squad_id: 2, squadName: 'Beta Squad' },
        { squad_id: 3, squadName: 'Gamma Squad' }
      ],
      selectedSquad: 1
    }
  },
  methods: {
    calculatePoints(steps, beers) {
      return (steps - beers) * 100
    },
    fetchLeaderboardData() {
      console.log(`Fetching leaderboard for squad ID: ${this.selectedSquad}`)
    }
  },
  mounted() {
    this.fetchLeaderboardData()
  }
}
</script>

<style scoped>
/* Leaderboard Styles */
.Leaderboard {
  padding: 20px;
  text-align: center;
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
  font-size: 1.5rem; /* Increase font size for better visibility */
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

/* Consistent Button Styles */
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
