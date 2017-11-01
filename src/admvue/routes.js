import
{
    Login,
    Index,
    AdmMenu,
    AdmAdmin,
    AdmAdminRole
}
    from './index'


export default [
    {path: '/login', component: Login},
    {path: '/home', component: Index},
    {path: '/adm/menu', component: AdmMenu},
    {path: '/adm/admin', component: AdmAdmin},
    {path: '/adm/admin-role', component: AdmAdminRole},
]