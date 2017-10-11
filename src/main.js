import Vue from 'vue'
import router from './router/index'
import App from './App.vue'
import store from './admvue/store/index'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
