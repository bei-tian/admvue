const Koa = require('koa');
const app = new Koa();
require('./lib/db')

const response = require('./middlewares/response')
app.use(response)

const router = require('./router')
app.use(router.routes())

app.listen(3000);