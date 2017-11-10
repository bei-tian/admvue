const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
app.use(koaBody())


const response = require('./middlewares/response')
app.use(response)

const checkLogin = require('./middlewares/check-login')
app.use(checkLogin)

const checkPrivilege = require('./middlewares/check-privilege')
app.use(checkPrivilege)

const router = require('./router')
app.use(router.routes())

app.listen(3000)