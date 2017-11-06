import
{
    Login,
    Index,
    Home,
    AdmMenu,
    AdmAdmin,
    AdmAdminRole
}
    from '../admvue/index'


export default [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/adm/menu', component: AdmMenu},
    {path: '/adm/admin', component: AdmAdmin},
    {path: '/adm/admin-role', component: AdmAdminRole},
]