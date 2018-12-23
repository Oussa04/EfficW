<template src = "./StoreTypePage.html"></template>
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
  name: "StoreType",
  components: {
    PulseLoader
  },
  methods: {
    promptRemove(idL) {
      this.row = idL;
      this.$modal.show("dialog", {
        title: "Confirmation",
        text: "Voulez vraiment Supprimer ce type ?",
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
      var idL = this.row;
      var vm = this;
      this.loading = true;
      const url = `${BASE_URL}admin/store/type/remove`;
      axios
        .post(url, idL)
        .then(response => {
          vm.loading = false;
          vm.$modal.hide("dialog");
          for (var i = 0; i < vm.tableDataSimple.length; i++) {
            if (vm.tableDataSimple[i].name == idL.name) {
              vm.tableDataSimple.splice(i, i + 1);
              vm.$notify({
                group: "storetype",
                title: "Succès",
                text: "type supprimée",
                type: "success"
              });

              return;
            }
          }
        })
        .catch(error => {
          vm.loading = false;
          vm.$modal.hide("dialog");
          if (error.response.status == 400) {
            vm.$notify({
              group: "storetype",
              title: "Erreur",
              text: error.response.data,
              type: "error"
            });
          }
        });
    },
    reset() {
      this.name = "";
      this.type = null;
    
      this.$validator.reset();
    },
    addType() {
      var vm = this;

      this.$validator.validateAll().then(function(valid) {
        if (valid) {
      const url = `${BASE_URL}admin/store/type/add`;
      vm.loading = true;
      axios
        .post(url, {
          name: vm.name,
          type: parseInt(vm.type)
        })
        .then(response => {
          vm.loading = false;
          vm.$modal.hide("dialog");
          vm.tableDataSimple.push(response.data);
          vm.$notify({
            group: "storetype",
            title: "Succès",
            text: "Type ajouté",
            type: "success"
          });
          vm.reset();
        })
        .catch(error => {
          vm.loading = false;
          vm.$modal.hide("dialog");
          if (error.response.status == 400) {
            vm.$notify({
              group: "storetype",
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
  data: function() {
    return {
      loading: true,
      row: {},
      name: "",

      type: null,
      tableDataSimple: []
    };
  },
  created() {
    const url = `${BASE_URL}admin/store/type/get`;
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

        type: "Type"
      }
    });

    this.$validator.localize("fr");
  }
};
</script>