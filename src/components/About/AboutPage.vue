<template src = "./AboutPage.html"></template>
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
import VueRecaptcha from "vue-recaptcha";
export default {
  name: "AboutPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        recaptcha: "",
        pack: ""
      },
      imagebg: require("../../assets/images/img_bg_1.jpg")
    };
  },
  methods: {
    onVerify: function(response) {
      recaptcha = response;
    },
    onExpired: function() {
      recaptcha = "";
    }
  },
  components: { VueRecaptcha }
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