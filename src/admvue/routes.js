export default [
    {path: '/', title: '首页', component: require('./pages/home/Index.vue')},
    {path: '/login', title: '登陆', component: require('./pages/Login.vue')},
    {path: '/adm/menu', title: '菜单管理', component: require('./pages/menu/Index.vue')},
    {path: '/adm/admin', title: '帐号管理', component: require('./pages/admin/Index.vue')},
    {path: '/adm/admin-role', title: '角色管理', component: require('./pages/admin-role/Index.vue')},
    {path: '/adm/theme', title: '主题设置', component: require('./pages/theme/Index.vue')},
]