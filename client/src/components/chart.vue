<template>
    <div>
      <line-chart :chart-data="data" :options="options" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs/legacy'
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, LineElement)
  
  export default {
    components: {
      LineChart: Line
    },
    data() {
      return {
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Sales',
              backgroundColor: '#42A5F5',
              data: [40, 60, 80, 100]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  }
  </script>
  