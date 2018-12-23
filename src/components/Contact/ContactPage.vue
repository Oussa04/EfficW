<template src = "./ContactPage.html"></template>
<script>
var Vue = require("vue");
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import "../../assets/style/overlay.css";
import { BASE_URL } from "../Utils/serverApi";
import axios from "axios";
import fr from "vee-validate/dist/locale/fr";
import VeeValidate from "vee-validate";
import Notifications from "vue-notification";
Vue.use(Notifications);
Vue.use(VeeValidate);
import Buefy from "buefy";
import "../../assets/style/buefy.css";

Vue.use(Buefy);
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
  name: "ContactPage",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject:"",
        message:"",
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
    },

    contact: function(){
      var vm = this;
       var url = `${BASE_URL}admin/client/contactSend`;
      

       url = url + "?message=" + vm.form.message + "&mail="+vm.form.email+"&subject="+vm.form.subject;
       axios
            .post(url)
            .then(response => {
              
              vm.$notify({
                group: "Contact",
                title: "Succès",
                text: "Message envoyé avec succès",
                type: "success"
              });
            })
            .catch(error => {
              
                vm.$notify({
                  group: "Contact",
                  title: "Erreur",
                  text: "Votre message n'a pas pu etre envoyé, réeessayez plus tard",
                  type: "error"
                });
              
            });

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