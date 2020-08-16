import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store/index'
import VueSocialSharing from '../node_modules/vue-social-sharing'

import Paginate from 'vuejs-paginate'
/* eslint-disable */
import firebase from './firebase';
import auth from './auth';
/* eslint-enable */
Vue.config.productionTip = false
Vue.use(Paginate)
Vue.use(VueSocialSharing, {
  networks: {
    fakeblock: 'https://fakeblock.com/share?url=@url&title=@title'
  }
})
new Vue({
  vuetify,
  router,
  store,
  Paginate,
  VueSocialSharing,

  render: h => h(App)
}).$mount('#app')

new vuetify({
  theme: {
    themes: {
      light: {
        primary: '#e20074',
        secondary: '#6c757d',
        accent: '#3ea2fb',
        error: '#dc3545',
        petrol: '#17a499',
        background: '#fffbe6',
      }
    },
    options: {
      customProperties: true
    },
  },
})