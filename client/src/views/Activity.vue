<template>
    <div class="activity-view">
      <h1>Activity</h1>
      <!-- Add the content you want to display in the view -->
      <p>This is where the activity data will appear.</p>
      <div class="button-container">
        <button class="massive-button log-beer">Beer</button>
        <button class="massive-button log-beer">Log Steps</button>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'activityView'
}
</script>

<style scoped>
/* Add view-specific styles */
.activity-view {
  padding: 20px;
  text-align: center;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 500px; /* Gap between buttons */
    margin-top: 20px;
}
</style>
