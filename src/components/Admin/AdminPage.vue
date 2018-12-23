<template src = "./AdminPage.html"></template>
<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import "../../assets/style/overlay.css";
var Vue = require("vue");
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
export default {
  name: "Admins",
  components: {
    PulseLoader
  },
  methods: {
    onModalClose: function() {
      this.reset();
    },
    onModalOk: function() {
      var vm = this;
      const url = `${BASE_URL}admin/admin/add`;
      vm.loading = true;
      axios
        .post(url, {
          name: vm.name,
          username: vm.username,
          password: vm.password,
          email: vm.email
        })
        .then(response => {
          vm.loading = false;
          vm.$modal.hide("dialog");
          vm.tableDataSimple.push(response.data);
          vm.$notify({
            group: "admin",
            title: "Succès",
            text: "Admin ajouté",
            type: "success"
          });
          vm.reset();
        })
        .catch(error => {
          vm.loading = false;
          vm.$modal.hide("dialog");
          if (error.response.status == 400) {
            vm.$notify({
              group: "admin",
              title: "Erreur",
              text: error.response.data,
              type: "error"
            });
          }
        });
    },
    reset() {
      this.name = "";
      this.username = "";
      this.password = "";
      this.repeat = "";
      this.email = "";
      this.$validator.reset();
    },
    addAdmin() {
      var vm = this;

      this.$validator.validateAll().then(function(valid) {
        if (valid) {
          vm.$modal.show("dialog", {
            title: "Confirmation",
            text: "Voulez vous vraiment ajouter un admin ?",
            buttons: [
              {
                title: "Oui",
                handler: () => {
                  this.onModalOk();
                }
              },

              {
                title: "Non"
              }
            ]
          });
        }
      });
    }
  },
  data: function() {
    return {
      loading: true,
      name: "",
      username: "",
      email: "",
      password: "",
      repeat: "",
      tableDataSimple: []
    };
  },
  created() {
    const url = `${BASE_URL}admin/admin/list`;
    axios
      .get(url)
      .then(response => {
        this.loading = false;
        this.tableDataSimple = response.data;
      })
      .catch(error => {
        this.loading = false;
      });
    this.$validator.localize("fr", {
      messages: fr.messages,
      attributes: {
        name: "Nom",
        length: "Validité",
        username: "Nom d'utilisateur",
        email: "Email",
        password: "Mot de passe",
        repeat: "Repeter le mot de passe"
      }
    });

    this.$validator.localize("fr");
  }
};
</script>