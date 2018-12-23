<template src="./StoresPage.html"></template>
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
  name: "Stores",
  components: {
    PulseLoader
  },
  methods: {
    expirationDate: function(time, licence) {
      if (!time) return "";
      var date = new Date(time);
      date.setMonth(date.getMonth() + licence);
      return date;
    },
    onModalClose: function() {
      this.reset();
    },
    addClient: function() {
      var vm = this;
      var url = `${BASE_URL}admin/client/add`;

      var user = this.package.user;
      this.$validator.validateAll("package").then(function(valid) {
        if (valid) {
          if (vm.package.selected != null) {
            url = url + "?id=" + vm.package.selected.id;
          }
          vm.loading = true;

          axios
            .post(url, user)
            .then(response => {
              vm.loading = false;
              vm.licence.tableDataSimple.push(response.data);
              if (vm.package.selected != null) {
                for (var i = 0; i < vm.package.tableDataSimple.length; i++) {
                  if (
                    vm.package.tableDataSimple[i].id == vm.package.selected.id
                  ) {
                    vm.package.tableDataSimple.splice(i, i + 1);
                  }
                }
              }
              vm.$notify({
                group: "store",
                title: "Succès",
                text: "Client Ajouté avec succés",
                type: "success"
              });
              vm.resetRequest();
            })
            .catch(error => {
              vm.loading = false;
              if (error.response.status == 400) {
                vm.$notify({
                  group: "store",
                  title: "Erreur",
                  text: error.response.data,
                  type: "error"
                });
              }
              vm.resetRequest();
            });
        }
      });
    },
    onModalOk: function() {
      var vm = this;
      const url = `${BASE_URL}admin/client/addLicence`;
      vm.loading = true;
      var store = this.licence.selected;
      store.licence.name = this.licence.selectedLicence;
      axios
        .post(url, store)
        .then(response => {
          vm.loading = false;
          vm.$modal.hide("dialog");
          for (var i = 0; i < vm.licence.tableDataSimple.length; i++) {
            if (
              response.data.registerDC ==
              vm.licence.tableDataSimple[i].registerDC
            ) {
              vm.licence.tableDataSimple[i] = response.data;
            }
          }
          vm.$notify({
            group: "store",
            title: "Succès",
            text: "Licence assignée avec succèe",
            type: "success"
          });
          vm.resetlicence();
        })
        .catch(error => {
          vm.$modal.hide("dialog");
          vm.loading = false;
          if (error.response.status == 400) {
            vm.$notify({
              group: "store",
              title: "Erreur",
              text: error.response.data,
              type: "error"
            });
          }
          vm.resetlicence();
        });
    },
    resetlicence() {
      this.licence.selectedLicence = "-";
      this.licence.selected = {
        id: null,
        rDC: null,
        name: null,
        adress: null,
        phone: null,
        licence: {
          id: null,
          name: null,
          length: null
        },
        payDate: null
      };
      this.errors.clear("licence");
    },
    resetRequest() {
      this.package.user = {
        name: "",
        username: "",
        email: "",
        password: "",
        repeat: "",
        store: {
          registerDC: "",
          name: "",
          adress: "",
          phone: "",
          licence: {
            name: "-"
          },
          type: {
            name: "-"
          },
          pack: "-"
        }
      };
      this.package.selected = null;
      this.errors.clear("package");
    },
    clearpackageList() {
      this.package.selected = null;
    },
    assignLicence() {
      var vm = this;

      this.$validator.validateAll("licence").then(function(valid) {
        if (valid) {
          vm.$modal.show("dialog", {
            title: "Confirmation",
            text: "Voulez vous vraiment ajouter cette licence à ce store ?",
            buttons: [
              {
                title: "Oui",
                handler: () => {
                  vm.onModalOk(); 
                }
              },

              {
                title: "Non"
              }
            ]
          });
        }
      });
    },
    selectReq: function(event) {
      this.package.user.name = event.name;
      this.package.user.store.pack = event.pack;
      this.package.user.store.phone = event.phone;
      this.package.user.email = event.email;
    }
  },
  data: function() {
    return {
      activeTab: 0,
      package: {
        tableDataSimple: [],
        selected: null,
        licences: [],
        user: {
          name: "",
          username: "",
          email: "",
          password: "",
          repeat: "",
          store: {
            registerDC: "",
            name: "",
            adress: "",
            phone: "",
            licence: {
              name: "-"
            },
            type: {
              name: "-"
            },
            pack: "-"
          }
        }
      },
      licence: {
        licences: [],
        tableDataSimple: [],
        selectedLicence: "-",
        selected: {
          id: null,
          registerDC: null,
          name: null,
          adress: null,
          phone: null,
          licence: {
            id: null,
            name: null,
            length: null
          },
          payDate: null
        },
        name: ""
      },
      types: [],
      loading: true
    };
  },
  created() {
    const urlstoreList = `${BASE_URL}admin/store/list`;
    const urlLic = `${BASE_URL}admin/licence/get`;
    const urlrequestList = `${BASE_URL}admin/request/list`;
    const typeurl = `${BASE_URL}admin/store/type/get`;
    axios
      .get(typeurl)
      .then(response => {
        this.loading = false;
        this.types = response.data;
      })
      .catch(error => {
        this.loading = false;
      });
    axios
      .get(urlstoreList)
      .then(response => {
        this.loading = false;
        this.licence.tableDataSimple = response.data;
      })
      .catch(error => {
        this.loading = false;
      });
    axios
      .get(urlrequestList)
      .then(response => {
        this.loading = false;
        this.package.tableDataSimple = response.data;
      })
      .catch(error => {
        this.loading = false;
      });
    axios.get(urlLic).then(response => {
      this.licence.licences = response.data;
      this.package.licences = response.data;
    });
    this.$validator.localize("fr", {
      messages: fr.messages,
      attributes: {
        selectedLicence: "La licence"
      }
    });

    this.$validator.localize("fr");
  }
};
</script>