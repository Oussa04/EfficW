
<template src = "./Login.html"></template>

<script>
var Vue = require("vue");
import VeeValidate from "vee-validate";
import fr from "vee-validate/dist/locale/fr";
Vue.use(VeeValidate);
import Notifications from "vue-notification";

Vue.use(Notifications);
import { login } from "../Utils/auth";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import '../../assets/style/overlay.css';
export default {
  name: "LoginPage",
      components:{
 PulseLoader
    },
  methods: {
checkEnter (object) {
    console.log('CHECKING ENTER')
    console.log(object)
  },
    Login() {
      var vm = this;
      this.$validator.validateAll().then(function(valid) {
        if (valid) {
          vm.loading = true;
          login(vm.username, vm.password).catch(error => {
            vm.loading = false;
            if (error.response.data.error_description == "Bad credentials") {
              vm.$notify({
                group: "login",
                title: "Erreur",
                text: "Nom d'utilisateur ou mot de passe non valide",
                type: "error"
              });
            }
            if (403 === error.response.status) {
            vm.$notify({
        group: "login",
        title: "Erreur",
        text: "Vous n'êtes pas un administraeur",
        type: "error"
      });
        }
          });
        }
      });
    },
    notify() {
  this.$notify({
    group: "login",
    title: "Erreur",
    text: "Vous n'êtes pas un administraeur",
    type: "error"
  });
}
  },

  data() {
    return {
      loading: false,
      username: "",
      password: "",
      images:{
        logo : require('../../assets/logo.png')
      }
    };
  },
  created() {
    this.$validator.localize("fr", {
      messages: fr.messages,
      attributes: {
        username: "Nom d'utilisateur",
        password: "Mot de passe"
      }
    });

    this.$validator.localize("fr");
  }
};
</script>