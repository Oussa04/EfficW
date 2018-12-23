<template src="./Categories.html"></template>
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
import "../../assets/style/image.css";
Vue.use(Buefy);
export default {
  name: "Categories",
  components: {
    PulseLoader
  },
  methods: {
    onModalClose: function() {
      this.name = "";
    },
    onModalOk: function() {
      this.Remove();
    },
    reset() {
      this.tagList = [];
      this.nameCategorie = "";
      this.image = [];
      this.$validator.reset();
    },
    promptRemove(idL) {
      this.name = idL;
      this.$modal.show("dialog", {
        title: "Confirmation",
        text: "Voulez vraiment Supprimer cette categorie ?",
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
      var idL = this.name;
      var vm = this;
      this.loading = true;
      const url = `${BASE_URL}admin/category/delete`;
      axios
        .post(url, {
          name: idL
        })
        .then(response => {
          vm.loading = false;
          vm.$modal.hide("dialog");
          for (var i = 0; i < vm.tableDataSimple.length; i++) {
            if (vm.tableDataSimple[i].name == idL) {
              vm.tableDataSimple.splice(i, i + 1);
              vm.$notify({
                group: "categorie",
                title: "Succès",
                text: "Categorie supprimée",
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
              group: "categorie",
              title: "Erreur",
              text: error.response.data,
              type: "error"
            });
          }
        });
    },
    splitTags(string) {
      return string.split(";");
    },
    addCategory() {
      var vm = this;
      this.$validator.validateAll().then(function(valid) {
        if (valid) {
          vm.loading = true;
          let formData = new FormData();
          var tag = "";
          vm.tagList.forEach(element => {
            tag = tag + element.name + ";";
          });
          if (tag[tag.length - 1] == ";") {
            tag = tag.substring(0, tag.length - 1);
          }
          formData.append("file", vm.image[0]);
          formData.append("name", vm.nameCategorie);
          formData.append("tag", tag);
          const url = `${BASE_URL}admin/category/add`;
          axios
            .post(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(response => {
              vm.loading = false;
              vm.tableDataSimple.push(response.data);
              vm.$notify({
                group: "categorie",
                title: "Succès",
                text: "Categorie ajoutée",
                type: "success"
              });
              vm.reset();
            })
            .catch(error => {
              vm.loading = false;
              if (error.response.status == 400) {
                vm.$notify({
                  group: "categorie",
                  title: "Erreur",
                  text: error.response.data,
                  type: "error"
                });
              }
              vm.reset();
            });
        }
      });
    },
    generateLink(file) {
      return `${BASE_URL}images/categories/` + file;
    },
    getFilteredTags(text) {
      this.filteredTags = this.types.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  },
  data: function() {
    return {
      types: [],
      name: "",
      tableDataSimple: [],
      image: [],
      nameCategorie: "",

      loading: true,
      tagList: [],
      filteredTags: []
    };
  },
  created() {
    const caturl = `${BASE_URL}admin/category/get`;

    axios
      .get(caturl)
      .then(response => {
        this.loading = false;
        this.tableDataSimple = response.data;
      })
      .catch(error => {
        this.loading = false;
      });
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
    this.$validator.localize("fr", {
      messages: fr.messages,
      attributes: {
        nameCategorie: "Nom",
        image: "Le fichier",
        tagList: "Types"
      }
    });

    this.$validator.localize("fr");
  }
};
</script>