import Vue from 'vue'
import iView from 'iview'
Vue.use(iView);


import Login from './pages/Login.vue'
import Index from './pages/Index.vue'
import Home from './pages/home/Index.vue'
import AdmMenu from './pages/menu/Index.vue'
import AdmAdmin from './pages/admin/Index.vue'
import AdmAdminRole from './pages/admin-role/Index.vue'


export {
    Login,
    Index,
    Home,
    AdmMenu,
    AdmAdmin,
    AdmAdminRole
}