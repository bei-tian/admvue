import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import baseRoutes from '../admvue/routes'

const myRoutes = [] //自定义路由,可以分模块进行导入
const routes = baseRoutes.concat(myRoutes)

const router = new Router({
    mode: 'history',
    routes: routes
})
export default router