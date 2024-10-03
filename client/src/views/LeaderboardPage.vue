<template>
  <div class="Leaderboard">
    <h1>Leaderboard</h1>
    <div>
      <label for="squadSelect">Select Squad:</label>
      <select v-model="selectedSquad" @change="fetchLeaderboardData">
        <option v-for="squad in squads" :key="squad._id" :value="squad.squad_id">
          {{ squad.squadName }}
        </option>
      </select>
    </div>
    <table>
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
      return steps - beers * 100
    },
    fetchLeaderboardData() {
      // For now, we are using static data, but you can fetch new data here based on the selected squad.
      console.log(`Fetching leaderboard for squad ID: ${this.selectedSquad}`)
      // Adjust the leaderboard data as per the selected squad, if needed
    }
  },
  mounted() {
    // Automatically loads the data for the first squad
    this.fetchLeaderboardData()
  }
}
</script>

<style scoped>
.Leaderboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  color: #2b2b2b;
}

h1 {
  font-size: 3rem;
  color: #000000;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f8f8f8;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #333;
  color: #f1f1f1;
}

th, td {
  padding: 15px;
  text-align: left;
}

th {
  font-size: 1.2rem;
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
  font-size: 1rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  th, td {
    font-size: 0.9rem;
    padding: 10px;
  }
}
</style>
