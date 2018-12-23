
import axios from 'axios';
import Router from 'vue-router';
import { BASE_URL } from './serverApi';
import {router} from "../../main.js";

var querystring = require('querystring');
export function login(username, password) {
  const url = `${BASE_URL}oauth/token`;
  return axios.post(url, querystring.stringify({
    'username': username,
    "password": password,
    "grant_type": "password"
  }), { auth: { username: "efficaiseAuthorization", password: "eff20186978" } })
    .then(response => {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh", response.data.refresh_token);
      localStorage.setItem("username", "temporary");
      return getUser().catch(error => {
        localStorage.removeItem("username");
        return Promise.reject(error);
      });

    });
}
export function getUser() {
  const url = `${BASE_URL}admin/user/get`;
  return axios.get(url).then(response => {
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("email", response.data.email);
    router.push("dashboard");
    router.forward();

  });

}



export function logout(success, message) {
  localStorage.clear();
  router.push("login");

  router.forward();

}
export function refreshToken() {
  const url = `${BASE_URL}oauth/token`;
  return axios.post(url, querystring.stringify({
    'refresh_token': localStorage.getItem("refresh"),
    "grant_type": "refresh_token"
  }), { auth: { username: "efficaiseAuthorization", password: "eff20186978" } });

}
export function getAccessToken() {
  return localStorage.getItem("token");
}
export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export function getName() {
  return localStorage.getItem("name");
}





export function isLoggedIn() {
  return localStorage.getItem("token") != null && localStorage.getItem("username") != null;
}


