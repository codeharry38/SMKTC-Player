import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = process.env.VUE_APP_API;

export const store = new Vuex.Store({

    state: {
        token: localStorage.getItem('access_token') || null,
        //unit: localStorage.getItem('un') || null,
        role: localStorage.getItem('rl') || null,
        uName: localStorage.getItem('uName') || null,
        stripAccount: localStorage.getItem('sAccount') || null,
        cart: localStorage.getItem('cart') || null,
        claim: localStorage.getItem('claim') || null,

    },
    // Gater
    getters: {
        loggedIn(state) {
          return state.token !== null
        },
    },
    mutations: {
        retrieveToken(state, token) {
          state.token = token
        },
        setCart(state, data){
          state.cart = JSON.stringify(data)
        },
        destroyToken(state) {
          state.token = null;
          state.role = null;
        },
        removeCart(state){
          state.cart = null;
        },
        setClaim(state, data){
          state.claim = JSON.stringify(data)
        },
        removeClaim(state){
          state.claim = null;
        },
    },
    actions: {
      // Destroy Token on logout
      destroyToken(context) {
        if (context.getters.loggedIn) {
          return new Promise((resolve, reject) => {
            axios.post('/player/logout')
              .then(response => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('rl')
                localStorage.removeItem('uName')
                localStorage.removeItem('sAccount')
                context.commit('destroyToken')
                resolve(response)
              })
              .catch(error => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('rl')
                localStorage.removeItem('sAccount')
                localStorage.removeItem('uName')
                context.commit('destroyToken')
                reject(error)
              })
          })
        }
      },
      // Fetch Token on Login
      retrieveToken(context, credentials) {
        return new Promise((resolve, reject) => {
          axios.post('/player/login', {
            username: credentials.username,
            password: credentials.password,
          })
          .then(response => {
            if(response.data.action == true){
              const token = response.data.data
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
              localStorage.setItem('access_token', token);
              localStorage.setItem('sAccount', response.data.loginManage.stripe_account);
              localStorage.setItem('rl',response.data.loginManage.role);
              localStorage.setItem('uName',response.data.loginManage.name);
              context.commit('retrieveToken', token);
              resolve(response)
            }else{
              resolve(response);
            }
             
          })
          .catch(error => {
           reject(error)
          })
        })
      },
      // Set cart Value
      setCart(context, data) {
        localStorage.setItem('cart', JSON.stringify(data));
        context.commit('setCart', data);
      },
      removeCart(context) {
        localStorage.removeItem('cart');
        context.commit('removeCart');
      },
      // Sign up with Claim cold
      setClaim(context, data) {
        localStorage.setItem('claim', JSON.stringify(data));
        context.commit('setClaim', data);
      },
      removeClaim(context) {
        localStorage.removeItem('claim');
        context.commit('removeClaim');
      },

    }
});