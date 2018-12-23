<template src="./StatisticsPage.html"></template>
<script>
var Vue = require("vue");
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import "../../assets/style/overlay.css";
import { BASE_URL } from "../Utils/serverApi";
import axios from "axios";
import Notifications from "vue-notification";
import moment from "moment";
Vue.use(Notifications);
import Buefy from "buefy";
import "../../assets/style/image.css";
Vue.use(Buefy);
import VModal from "vue-js-modal";

Vue.use(VModal, { dialog: true });
import "../../assets/style/buefy.css";
Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm");
  }
});
export default {
  name: "Statistics",
  components: {
    PulseLoader
  },
  methods: {
 
  },
  data: function() {
    return {
      stacktraces: [],

      loading: true,
      detail: ""
    };
  },
  created() {
    const caturl = `${BASE_URL}admin/stacktrace/list`;

    axios
      .get(caturl)
      .then(response => {
        this.loading = false;
        this.stacktraces = response.data;
      })
      .catch(error => {
        this.loading = false;
      });
  }
};
</script>