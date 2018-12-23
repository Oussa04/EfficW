import 'select2/dist/css/select2.css'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routes from './routes'

import Card from 'src/components/Elements/Card/Card.vue'
import TabSet from 'src/components/Elements/TabSet.vue'
import TabItem from 'src/components/Elements/TabItem.vue'
import Modal from 'src/components/Elements/Modal/Modal.vue'
import DataTable from 'src/components/Elements/DataTable/DataTable.vue'
import Select2 from 'src/components/Elements/Select2.vue'
import { getAccessToken, isLoggedIn, refreshToken, logout } from './components/Utils/auth'
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(require('vue-chartist'))
Vue.component('Card', Card)
Vue.component('TabSet', TabSet)
Vue.component('TabItem', TabItem)
Vue.component('Modal', Modal)
Vue.component('DataTable', DataTable)
Vue.component('Select2', Select2)

require('font-awesome/css/font-awesome.css')
require('highlightjs/styles/tomorrow-night.css')
require('jquery')
import hljs from 'highlightjs'
import Notifications from "vue-notification";
Vue.use(Notifications);
hljs.initHighlightingOnLoad()

/* eslint-disable no-new */
export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path != "/login" && to.path != "/index" && to.path != "/contact" && to.path != "/order" && to.path != "/features" && to.path != "/about" && to.path != "/confirm") {
    if (isLoggedIn()) {
      next();
    } else {
      next("login");
    }

  } else {
    if (to.path != "/index" && to.path != "/contact" && to.path != "/order" && to.path != "/features" && to.path != "/about"  && to.path != "/confirm"&& isLoggedIn()) {
      next("dashboard");
    } else {
      next();
    }

  }
})
import Axios from 'axios';
Vue.$http = Axios;
Axios.interceptors.request.use((config) => {


  if (isLoggedIn() && !config.headers['Authorization']) {
    config.headers["Authorization"] = "Bearer " + getAccessToken();
  }
  return config;
});

Axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  if (error.response)
    if (401 === error.response.status) {


      if (error.response.data.error_description.startsWith("Access token expired:")) {

        return refreshToken().then(response => {

          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("refresh", response.data.refresh_token);
          error.config.__isRetryRequest = true;

          error.config.headers["Authorization"] = "Bearer " + getAccessToken();

          let instance = Axios.create(error.config);
          return instance.request();
        }).catch(error1 => {
          logout(false, "");
          return Promise.reject(error1);
        });

      } else {

        logout(false, "");
        return Promise.reject(error);
      }


    }
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  router,
  template: `
  <div class="app app-default">
    <router-view class="view"></router-view>
  </div>`
}).$mount('#app')
