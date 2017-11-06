import {get,post} from '../utils/ajax'


//export const getMenu = (params,callback) => { get('/menu/index',params,callback) }
export const menuMy = callback => {
    get('/menu/my', {}, callback)
}
export const menuIndex = (callback) => {
    get('/menu/index', {}, callback)
}
export const menuSave = (params, callback) => {
    post('/menu/save', params, callback)
}
export const menuDel = (params, callback) => {
    post('/menu/del', params, callback)
}
export const menuSort = (params, callback) => {
    post('/menu/sort', params, callback)
}


export const adminLogin = (params, callback) => {
    post('/admin/login', params, callback)
}
export const adminIndex = (params, callback) => {
    get('/admin/index', params, callback)
}
export const adminMy = (callback) => {
    get('/admin/my', {}, callback)
}
export const adminInfo = (params, callback) => {
    get('/admin/info', params, callback)
}
export const adminSave = (params, callback) => {
    post('/admin/save', params, callback)
}
export const adminSetPwd = (params, callback) => {
    post('/admin/set-pwd', params, callback)
}
export const adminDel = (params, callback) => {
    post('/admin/del', params, callback)
}



export const adminRoleIndex = (params, callback) => {
    get('/admin-role/index', params, callback)
}
export const adminRoleInfo = (params, callback) => {
    get('/admin-role/info', params, callback)
}
export const adminRoleSave = (params, callback) => {
    post('/admin-role/save', params, callback)
}
export const adminRoleDel = (params, callback) => {
    post('/admin-role/del', params, callback)
}
export const adminRolePrivilegeSave = (params, callback) => {
    post('/admin-role/privilegeSave', params, callback)
}
export const adminRolePrivilege = (params, callback) => {
    get('/admin-role/privilege', params, callback)
}

