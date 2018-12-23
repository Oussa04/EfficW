<template src="./TopNav.html"></template>
<style src="./TopNav.sass" lang="sass?indentedSyntax"></style>

<script>
 import {getName,isLoggedIn,logout} from "../../Utils/auth"
 import Router from 'vue-router';
  export default {
    name: 'TopNav',
    computed: {
      title: function() {
        this.$route.name
      }
    },
    data(){return {
      name : getName()
    };
    },
    methods:{
      Logout(){
        logout(true,"");
      }
    },

  }
</script>