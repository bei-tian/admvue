const router = require('koa-router')()

const admin = require('./controller/admin')
const menu = require('./controller/menu')
router
  .get('/admin/login', admin.login)
  .get('/admin/add', admin.add)
  .get('/menu/index', menu.index)
  .get('/menu/add', menu.add)

module.exports = router