<template>
  <div class="view">
    <line-chart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, TimeScale } from 'chart.js'; // Import TimeScale
import 'chartjs-adapter-date-fns'; // Import the date adapter


// Register all necessary components
ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale, TimeScale);


export default {
  components: {
    LineChart: Line
  },

  props: {
  chartData: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: true
  }
},

data() {
  return {
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          title: {
            display: true,
            text: 'Date'
          },
          time: {
            unit: 'day', // Set the unit of time
            tooltipFormat: 'yyyy-mm-dd', // Format for tooltips
            displayFormats: {
              day: 'yyyy-mm-dd' // Format for x-axis labels
            },
          },
          min: null, // This will be set in the computed property
          max: null, // This will be set in the computed property
        },
        y: {
          title: {
            display: true,
            text: 'Total Beers'
          }
        }
      }
    }
  };
},

mounted() {
  console.log('Chart data:', this.chartData);
}
};
</script>

<style scoped>
.view{
  background-color: whitesmoke;
  margin-bottom: 5%;
}
</style>


