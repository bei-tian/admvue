const knex = require('../lib/knex');
const pre = knex.prefix

module.exports = async (ctx, next) => {
    let login_id = ctx.query.login_id
    let info = await knex(pre + 'admin as a')
        .select('privilege')
        .join(pre + 'admin_role as b', 'role_id', 'b.id')
        .where('a.id', login_id)
    
    let privilege = []
    if (info[0].privilege) {
        privilege = info[0].privilege.split(',')
    }
    
    let pathArr = ctx.path.split('/')
    let menu = await knex(pre + 'menu')
        .select('id')
        .where('api', 'like', '%' + ctx.path + '%')
        .orWhere('api', 'like', '%/' + pathArr[1] + '/*%')

    let havePri = false
    menu.map(function (item) {
        if (privilege.includes(item.id.toString())) {
            havePri = true
        }
    })
    if (havePri) {
        await next()
    } else {
        ctx.error({msg: '您无该功能操作权限！'})
    }
    
    
    
}