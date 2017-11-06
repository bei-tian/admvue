import Vue from 'vue'
import iView from 'iview'
Vue.use(iView)

import router from './router'
import App from './App.vue'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
