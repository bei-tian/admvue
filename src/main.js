import Vue from 'vue'
import iView from 'iview'
Vue.use(iView)
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}
import router from './router'
import App from './App.vue'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
