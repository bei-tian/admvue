import admvue from '../admvue/routes'

//新添加的路由,可以分模块进行导入
const routes = [
    {path: '/demo', title: '演示页', component: require('../pages/Demo.vue')},
]

export default admvue.concat(routes)