<template src = "./ActivateUserPage.html"></template>
<script>
require("../../assets/js/bootstrap.min.js");
require("../../assets/js/jquery.easing.1.3.js");
require("../../assets/js/bootstrap.min.js");
require("../../assets/js/jquery.waypoints.min.js");
require("../../assets/js/jquery.countTo.js");
require("../../assets/js/jquery.magnific-popup.min.js");
require("../../assets/js/magnific-popup-options.js");
require("../../assets/js/main.js");
require("../../assets/js/modernizr.js");
import { BASE_URL } from "../Utils/serverApi";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";
export default {
  name: "Activation",
  components: {
    PulseLoader
  },
  data() {
   return {
      logo: require("../../assets/logo.png"),
      imagebg: require("../../assets/images/bg.jpg"),
      response:null,
      success:false,
      loading : true,
   }
  },
  methods: {
    
  },
  created() {
    const url = `${BASE_URL}user/confirm?token=`;
    if(this.$route.query.token != null)
    axios
      .get(url+this.$route.query.token )
      .then(response => {
        this.loading = false;
        this.success = true;
        this.response = response.data;
      })
      .catch(error => {
        this.loading = false;
        this.response=error.response.data;
      });
  
  }
};
</script>
<style>
@import "../../assets/css/animate.css";
@import "../../assets/css/icomoon.css";
@import "../../assets/css/themify-icons.css";
@import "../../assets/css/magnific-popup.css";

@import "../../assets/css/owl.carousel.min.css";
@import "../../assets/css/owl.theme.default.min.css";
@import "../../assets/css/style.css";
</style>