import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import VueMask from 'v-mask'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueYoutube from 'vue-youtube'

import vco from "v-click-outside"

import router from './router'
import store from '@/state/store'
import i18n from './i18n'

import "@/assets/scss/app.scss";

import { initFirebaseBackend } from './helpers/firebase/authUtils';

import { configureFakeBackend } from './helpers/fakebackend/fake-backend';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else {
  configureFakeBackend();
}

Vue.config.productionTip = false
Vue.use(VueYoutube)
Vue.use(BootstrapVue)
Vue.use(vco)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.use(VueMask)
Vue.use(require('vue-chartist'))
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',
    libraries: 'places',
  },
  installComponents: true
})
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')


// Global Variables
Vue.prototype.$api_host = 'http://127.0.0.1/api/v1/student/';
Vue.prototype.$host     = 'http://127.0.0.1/';

// Vue.prototype.$api_host = 'http://lms.olmaa.net/api/v1/student/';
// Vue.prototype.$host     = 'http://lms.olmaa.net/';


const loggeduser = localStorage.getItem('user');
if(loggeduser)
  Vue.prototype.$current_user = JSON.parse(loggeduser);
else
  Vue.prototype.$current_user = 
  { 
    id: 1,
    name: 'Anton Petrov', 
    role: 'Full stack web developer', 
    isPrivate: true, 
    image: '', 
    isActive: true,
    email: 'id.unreleased4@gmail.com',
    phone: '(001) 4544 565 333',
    balance: 1000
  };

  // Define global functions
Vue.mixin({
  methods: {
    convertWithDollar(num){
      var dollars = num / 1.0;
      dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"}); 
      return dollars;
    },

    balanceWithDollar(){
      var num = this.$current_user.balance;
      var dollars = num / 1.0;
      dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"}); 
      return dollars;
    }
  }
});