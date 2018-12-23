<template src="./Dashboard.html"></template>

<script>
import TodaySaleChart from "./TodaySaleChart/TodaySaleChart.vue";
import Statuses from "./Statuses/Statuses.vue";
import CircleChart from "./CircleChart/CircleChart.vue";
import { BASE_URL } from "../Utils/serverApi";
import axios from "axios";

export default {
  name: 'Dashboard',
    data: function() {
    return {
      count: {
        package: "Loading",
        LicenceEnded: "Loading",
        bug: "Loading",

      }
    };
  },
  components: {
    TodaySaleChart,
    Statuses,
    CircleChart
  },
    created() {
    const url = `${BASE_URL}admin/stats/infos`;

    axios.get(url).then(response => {
      this.count = response.data;
    });
  }
}
</script>

<style>

</style>