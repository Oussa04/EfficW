<template src = "./OrderPage.html"></template>
<script>
require("../../assets/js/jquery.easing.1.3.js");
require("../../assets/js/bootstrap.min.js");
require("../../assets/js/jquery.waypoints.min.js");
require("../../assets/js/jquery.countTo.js");
require("../../assets/js/jquery.magnific-popup.min.js");
require("../../assets/js/magnific-popup-options.js");
require("../../assets/js/main.js");
require("../../assets/js/modernizr.js");

import VueRecaptcha from "vue-recaptcha";

var Vue = require("vue");
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import { BASE_URL } from "../Utils/serverApi";
import axios from "axios";
import fr from "vee-validate/dist/locale/fr";
import VeeValidate from "vee-validate";
import Notifications from "vue-notification";
Vue.use(Notifications);
Vue.use(VeeValidate);

export default {
  name: "Order",

  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        recaptcha: "",
        pack: "-"
      },
      checked: true,
      loading: false,
      imagebg: require("../../assets/images/img_bg_1.jpg")
    };
  },

  methods: {
    reset:function(){
        this.form.name = "";
        this.form.email = "";
        this.form.phone = "";
        this.form.recaptcha = "";
        this.form.pack = "-";
        this.$refs.recaptcha.reset();
        this.checked = true;
        this.$validator.reset();
    },
    onVerify: function(response) {
      this.form.recaptcha = response;
      this.checked = true;
    },
    onExpired: function() {
      this.form.recaptcha = "";
    },
    onBuy: function(pack) {
      this.form.pack = pack;
      
    },
    onSubmit() {
      const url = `${BASE_URL}pack/request`;
      var vm = this;
      
      this.$validator.validateAll().then(function(valid) {
        vm.checked = vm.form.recaptcha.length > 0;
        if (valid && vm.checked) {
          vm.loading = true;
          axios
            .post(url, vm.form)
            .then(response => {
              vm.loading = false;
              vm.$notify({
                group: "order",
                title: "Succès",
                text: response.data,
                type: "success"
              });
              vm.reset();
            })
            .catch(error => {
              vm.loading = false;
              if (error.response.status == 400) {
                vm.$notify({
                  group: "order",
                  title: "Erreur",
                  text: error.response.data,
                  type: "error"
                });
              }
            });
        }
      });
    }
  },
  components: {
    VueRecaptcha,
    PulseLoader
  },
  created() {
    this.$validator.localize("fr", {
      messages: fr.messages,
      attributes: {
        name: "Nom",
        email: "Email",
        phone: "Numéro de téléphone",
        pack: "Type de Pack"
      }
    });

    this.$validator.localize("fr");
  }
};
</script>
<style>
@import "../../assets/css/animate.css";
@import "../../assets/css/icomoon.css";
@import "../../assets/css/themify-icons.css";
@import "../../assets/css/magnific-popup.css";
@import "../../assets/style/overlay.css";
@import "../../assets/css/owl.carousel.min.css";
@import "../../assets/css/owl.theme.default.min.css";
@import "../../assets/css/style.css";
</style>