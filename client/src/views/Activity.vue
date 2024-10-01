<template>
    <div class="activity-view">
      <h1>Activity</h1>
      <!-- Add the content you want to display in the view -->
      <p>This is where the activity data will appear.</p>
      <div class="button-container">
        <button class="massive-button beer">Beer</button>
        <button class="massive-button log-step">Log Steps</button>
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

.massive-button {
    width: 600px;
    height: 500px;
    font-size: 48px;
    color: rgb(46, 7, 7);
    border: none;
    border-radius: 10px; /* rounded corners */
    cursor: pointer; /* Change cursor to pointer on hover */
    transition: transform 0.3s ease, background-color 0.3s ease; /* Smooth transitions */
}

.beer {
    background-color: #28a745;
}

.beer:hover {
transform: translateY(-50px);
background-color: #218838; /* Darker shade on hover */
transform: scale(1.2); /* Slightly enlarge on hover */
}

.log-step {
    background-color: #007bff;
}

.log-step:hover {
transform: translateY(-50px);
background-color: #0056b3; /* Darker shade on hover */
transform: scale(1.2); /* Slightly enlarge on hover */
}

</style>
