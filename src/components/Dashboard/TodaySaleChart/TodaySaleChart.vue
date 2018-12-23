<template src="./TodaySaleChart.html"></template>
<script>
var Vue = require("vue");
Vue.use(VueHighcharts);

  import { BASE_URL } from "../../Utils/serverApi";
import VueHighcharts from "vue2-highcharts";
Vue.component("vue-highcharts", VueHighcharts);
import axios from "axios";

  export default {
    name: 'TodaySaleChard',
    data: function() {
     return {
      bar: {
        options: {
          chart: {
            type: "column"
          },
          title: {
            text: "Nombre de licences par type de commerce"
          },
          subtitle: {
            text: ""
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            min: 0,
            title: {
              text: "Nombre de licences",
              align: "middle"
            },
            labels: {
              overflow: "justify"
            }
          },
          tooltip: {
            valueSuffix: " "
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            },
            series:{
              color: '#3FCD6F'
            }
          },

          credits: {
            enabled: false
          },
          series: []
        }
      }
    };
    },
    methods: {},
  created() {
    const url = `${BASE_URL}admin/stats/showNbrOfStoresByType`;
    axios.get(url).then(response => {
      let barChart = this.$refs.barChart;

      var serie = [];
      barChart.delegateMethod("showLoading", "Loading...");
      response.data.forEach(element => {
        serie.push(element.y);
        this.bar.options.xAxis.categories.push(element.x);
      });

      barChart.addSeries({
        name: "Type de commerce",
        data: serie
      });
      barChart.hideLoading();
    });
  }
};
</script>
