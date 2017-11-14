const md5 = require('../utils/md5')
const knex = require('../lib/knex');
const pre = knex.prefix

module.exports = async (ctx, next) => {
    let login_id = ctx.query.login_id
    if (login_id > 0) {
        
        let info = await knex(pre + 'admin').where('id', login_id)
        let admin = info[0]
    
        let token = md5(admin.id + admin.username + admin.password + admin.login_time.toLocaleString())
        
        if (token !== ctx.query.token) {
            ctx.error({msg: 'token无效'})
        } else {
            global.login_id = login_id
            global.role_id = admin.role_id
            await next()
        }
    } else if (ctx.url === '/admin/login') {
        await next()
    } else {
        ctx.error({msg: '未登陆'})
    }
    
    
}