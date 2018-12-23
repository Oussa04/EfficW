<template src="./LicencesPage.html"></template>
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
export default {
  name: "Licences",
  components: {
    PulseLoader
  },
  methods: {
    onModalClose: function() {
      this.id = -2;
    },
    onModalOk: function() {
      this.Remove();
    },
    reset() {
      this.name = "";
      this.length = "";
      this.$validator.reset();
    },
    promptRemove(idL) {
      this.id = idL;
      this.$modal.show("dialog", {
        title: "Confirmation",
        text: "Voulez vraiment Supprimer cette licence ?",
        buttons: [
          {
            title: "Oui",
            handler: () => {
              this.Remove();
            }
          },

          {
            title: "Non"
          }
        ]
      });
    },
    Remove() {
      var idL = this.id;
      var vm = this;
      this.loading = true;
      const url = `${BASE_URL}admin/licence/remove`;
      axios
        .post(url, {
          id: idL
        })
        .then(response => {
          vm.$modal.hide("dialog");
          vm.loading = false;
          for (var i = 0; i < vm.tableDataSimple.length; i++) {
            if (vm.tableDataSimple[i].id == idL) {
              vm.tableDataSimple.splice(i, i + 1);
              vm.$notify({
                group: "licence",
                title: "Succès",
                text: "Licence supprimée",
                type: "success"
              });
              return;
            }
          }
        })
        .catch(error => {
          vm.$modal.hide("dialog");
          vm.loading = false;
          if (error.response.status == 400) {
            vm.$notify({
              group: "licence",
              title: "Erreur",
              text: error.response.data,
              type: "error"
            });
          }
        });
    },
    addLicence() {
      var vm = this;
      this.loading = true;
      this.$validator.validateAll().then(function(valid) {
        if (valid) {
          const url = `${BASE_URL}admin/licence/add`;
          axios
            .post(url, {
              name: vm.name,
              length: vm.length
            })
            .then(response => {
              vm.loading = false;
              vm.tableDataSimple.push(response.data);
              vm.$notify({
                group: "licence",
                title: "Succès",
                text: "Licence ajoutée",
                type: "success"
              });
            })
            .catch(error => {
              vm.loading = false;
              if (error.response.status == 400) {
                vm.$notify({
                  group: "licence",
                  title: "Erreur",
                  text: error.response.data,
                  type: "error"
                });
              }
            });
        }
        vm.reset();
      });
    }
  },
  data: function() {
    return {
      id: -2,
      name: "",
      length: "",
      tableDataSimple: [],
      loading: true
    };
  },
  created() {
    const url = `${BASE_URL}admin/licence/get`;
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
        length: "Validité"
      }
    });

    this.$validator.localize("fr");
  }
};
</script>