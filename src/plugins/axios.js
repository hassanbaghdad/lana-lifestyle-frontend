"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
//axios.defaults.baseURL =  'http://localhost:81/lifestyle_backend/public/';
//axios.defaults.baseURL =  'http://127.0.0.1:8000';
axios.defaults.baseURL =  'https://lana-lifestyle.com/lifestyle_backend/public/';
//axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS, post, get";
axios.defaults.headers.common["Access-Control-Max-Age"] = "3600";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, Content-Type, X-Auth-Token";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error

    if (error.response.status === 401) {
      localStorage.clear();
      this.$route.push("login");
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
