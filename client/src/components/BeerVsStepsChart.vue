<template>
    <div>
      <line-chart :chart-data="data" :options="options" />
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
      totalBeers: {
      type: Number,
      required: true
    },
    totalSteps: {
      type: Number,
      required: true
    }
  },
  computed: {
    chartData(){
      return {
        labels: ['Beers vs Steps'], // Optional, could also be dates or milestones
        datasets: [
          {
            label: 'Beer Consumption vs Steps Taken',
            backgroundColor: '#42A5F5',
            borderColor: '#42A5F5',
            fill: false,
            data: [
              {
                x: this.totalSteps,  // Total steps on the x-axis
                y: this.totalBeers   // Total beers on the y-axis
              }
            ]
          }
        ]
      }
    }
  },
    data() {
      return {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales:{
            x: {
            title: {
              display: true,
              text: 'Total Steps'
          }
            },
          y: {
            title: {
              display: true,
              text: 'Total Beers'
            }
          }
        }
      }
    }
  }
}
  </script>
  