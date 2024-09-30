<template>
<div class="Leaderboard">
    <h1>Leaderboard</h1>
    <table>
        <head>
            <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Steps Taken</th>
                <th>Steps Needed</th>
                <th>Beers Consumed</th>
            </tr>
        </head>
        <body>
            <tr v-for="(entry, index) in leaderboardData" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ entry.username }}</td>
                <td>{{ entry.stepsTaken }}</td>
                <td>{{ entry.stepsNeeded}}</td>
                <td>{{ entry.beersConsumed }}</td>
            </tr>
        </body>
    </table>
</div>
</template>

<script>
export default {
  name: 'Leaderboard',
  data() {
    return {
      leaderboardData: [
        // Sample data, eventually fetch real data
        { username: 'User1', stepsTaken: 22, steepsNeeded: 2, beersConsumed: 2 },
        { username: 'User2', stepsTaken: 222, steepsNeeded: 21, beersConsumed: 22 },
        { username: 'User3', stepsTaken: 221, steepsNeeded: 23, beersConsumed: 24 }
      ]
    }
  }
}

</script>
