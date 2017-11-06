const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
app.use(koaBody());

require('./lib/db')

const response = require('./middlewares/response')
app.use(response)

const logined = require('./middlewares/check-login')
app.use(logined)

const router = require('./router')
app.use(router.routes())

app.listen(3000);