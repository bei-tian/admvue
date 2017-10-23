const router = require('koa-router')()

const admin = require('./controller/admin')
const menu = require('./controller/menu')
router
  .get('/admin/login', admin.login)
  .get('/admin/add', admin.add)
  .get('/menu/index', menu.index)
  .post('/menu/edit', menu.edit)
  .post('/menu/del', menu.del)

module.exports = router