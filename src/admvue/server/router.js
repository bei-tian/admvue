const router = require('koa-router')()

const admin = require('./controller/admin')
const menu = require('./controller/menu')
const adminRole = require('./controller/admin-role')
router
    .post('/admin/login', admin.login)
    .get('/admin/index', admin.index)
    .get('/admin/info', admin.info)
    .post('/admin/save', admin.save)
    .post('/admin/del', admin.del)
    
    
    .get('/admin-role/index', adminRole.index)
    .get('/admin-role/info', adminRole.info)
    .post('/admin-role/save', adminRole.save)
    .post('/admin-role/del', adminRole.del)
    .post('/admin-role/privilegeSave', adminRole.privilegeSave)
    .get('/admin-role/privilege', adminRole.privilege)
    
    .get('/menu/index', menu.index)
    .post('/menu/save', menu.save)
    .post('/menu/del', menu.del)
    .post('/menu/sort', menu.sort)
    
    
    

module.exports = router