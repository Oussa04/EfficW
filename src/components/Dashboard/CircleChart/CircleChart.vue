<template src="./CircleChart.html"></template>

<script>
  var Vue = require("vue");

  import PulseLoader from "vue-spinner/src/PulseLoader.vue";
  import {BASE_URL} from "../../Utils/serverApi";
  import VueHighcharts from "vue2-highcharts";

  Vue.component("vue-highcharts", VueHighcharts);
  import axios from "axios";


  export default {
    name: "CircleChart",
    data: function () {
      return {
        pie: {
          options: {
            chart: {
              type: "pie",
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
            },
            title: {
              text: "Nombre de licence par type"
            },
            subtitle: {
              text: ""
            },
            colors: ['#7cb5ec', '#FFC329', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066',
              '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                }
              }
            },
            series: [
              {
                name: "Nombre de licences: ",
                data: []
              }
            ]
          }
        }
      };
    },
    methods: {},
    created() {
      const url = `${BASE_URL}admin/stats/`;

      axios.get(url + "showNbrLicence").then(response => {
        let pieChart = this.$refs.pieChart;
        var sum = 0
        pieChart.delegateMethod("showLoading", "Loading...");
        response.data.forEach(element => {
          this.pie.options.series[0].data.push([element.x, element.y]);
          sum += element.y;
        });
        this.pie.options.series[0].data.forEach(element => {
          element[0] = element[0] + " :" + parseFloat(Math.round((element[1] / sum) * 100 * 100) / 100).toFixed(2) + '%';

        });

        axios.get(url + "numberOfStores").then(response1 => {
          if (response1.data - sum > 0)
            this.pie.options.series[0].data.push(["Others :" + parseFloat(Math.round(((response1.data - sum) / sum) * 100 * 100) / 100).toFixed(2) + '%', response1.data - sum]);
          pieChart.addSeries(this.pie.options.series[0]);
          pieChart.hideLoading();
        });

      });
    }
  };
</script>
