import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import customBrandcrumb from './components/inc/crumbs.vue'
import VueRouter from 'vue-router';
import Route from './router';
import axios from 'axios'
import Vuex from 'vuex'
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";
import VueAxios from 'vue-axios'
import { store } from './store'
import Config from './config'


Stock(Highcharts);
Vue.use(HighchartsVue)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuex);
Vue.prototype.$config = Config;
Vue.config.productionTip = false


const router = new VueRouter({
  routes: Route,
  mode: 'history'
});

axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'signin',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'game',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export const bus  = new Vue();

Vue.component('customBrandcrumb', customBrandcrumb)
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
