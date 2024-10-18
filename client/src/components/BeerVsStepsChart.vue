<template>
  <div>
    <line-chart :data="chartData" :options="options" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)


export default {
  components: {
    LineChart: Line
  },

  props: {
  chartData: {
    type: Object,
    required: true
  }
},

data() {
  return {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Total Beers'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Total Steps'
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

