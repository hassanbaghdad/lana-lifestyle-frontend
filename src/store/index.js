import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
import axios from 'axios'
import router from '@/router/index'
axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  if (error.response.status==401) {
    console.log(error.response.status)
      localStorage.clear();

      console.log("44401");
    router.push("login");

  } else {
    return Promise.reject(error);
  }
});
export default new Vuex.Store({
  state: {
    user:{

    },
    account:false,
    view:false,
    target_product:[],
    target_brand:[],
    dashboard:false,
    loading:false,
    brands:{
      brands:[],
      target:[],
      forms:{
        add_brand:false,
        edit_brand:false,
        delete_brand:false
      }
    },
    products:{
      products:[],
      forms:{
        add_product:false,
        edit_product:false,
        delete_product:false
      },
      target:[]
    },
    messages:{
      messages:[],
      target:[],
      forms:{
        delete_message:false
      }
    },
    settings:{
      settings:[]
    },
    socials:{
      socials:[],
      target_social:[],
      forms:{
        add_social:false,
        edit_social:false,
        delete_social:false
      }
    },
    ui:{
      lang_ar:true,
      appbar_ar:{
        home:'الرئيسية',

      }
    },
    render:{
      brands:[],
      products:[],
      slides:[],
      settings:[],
      socials:[]
    }
  },
  mutations: {
    async GET_BRANDS(state)
    {
      await axios.get('api/get-brands').then(res=>{
        console.log(res.data)
        state.brands.brands = res.data;
      })
    },
    async GET_PRODUCTS(state)
    {
     await axios.get('api/get-products').then(res=>{
        console.log(res.data)
        state.products.products = res.data;
      })
    },
    async GET_MESSAGES(state)
    {
      await axios.get('api/get-messages').then(res=>{
        console.log(res.data)
        state.messages.messages = res.data;
      })
    },
    async  GET_SETTINGS(state)
    {
      await axios.get('api/get-settings').then(res=>{
        console.log(res.data)
        state.settings.settings = res.data[0];
      })
    },
    async  GET_SOCIALS(state)
    {
      await axios.get('api/get-socials').then(res=>{
        console.log(res.data)
        state.socials.socials = res.data;
      })
    },

  },
  actions: {
  },
  modules: {
  },
      plugins: [createPersistedState()],

    },

    )
