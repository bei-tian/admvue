const knex = require('../lib/knex');
const pre = knex.prefix

module.exports = {
    async my(ctx) {
        let login_id = parseInt(ctx.query.login_id)
        
        let info = await knex(pre + 'admin as a')
            .select('privilege')
            .join(pre + 'admin_role as b', 'role_id', 'b.id')
            .where('a.id', login_id)
        
        let privilege = []
        if (info[0].privilege) {
            privilege = info[0].privilege.split(',')
        }
        
        let menu = await knex(pre + 'menu').select('id', 'icon', 'name', 'parent_id', 'url').where({is_menu:1}).orderBy('sort', 'asc').orderBy('id', 'asc')
        let list = []
        for (let i in menu) {
            if (privilege.includes(menu[i].id.toString())) {
                list.push(menu[i])
            }
        }
        
        let nav = getSub(list, 0)
        
        for (let i in nav) {
            let menu = getSub(list, nav[i].id)
            for (let j in menu) {
                menu[j].sub = getSub(list, menu[j].id)
            }
            nav[i].menu = menu
        }
        
        ctx.success({data: nav})
    },
    
    
    async index(ctx) {
        let list = await knex(pre + 'menu').select('id', 'icon', 'name', 'parent_id', 'url', 'api', 'is_menu').orderBy('sort', 'asc').orderBy('id', 'asc')
        let nav = getSub(list, 0)
        
        for (let i in nav) {
            let menu = getSub(list, nav[i].id)
            for (let j in menu) {
                menu[j].sub = getSub(list, menu[j].id)
            }
            nav[i].menu = menu
        }
        
        ctx.success({data: nav})
    },
    
    
    async save(ctx) {
        let post = ctx.request.body
        
        if (post.id) {
            await knex(pre + 'menu').where('id', parseInt(post.id)).update(post)
        } else {
            await knex(pre + 'menu').insert(post)
        }
        ctx.success({data: post})
    },
    
    async del(ctx) {
        let post = ctx.request.body
        await knex(pre + 'menu').where('id', parseInt(post.id)).del()
        ctx.success({data: post})
    },
    
    
    async sort(ctx) {
        let post = ctx.request.body
        let sort = post.sort
        for (let i in sort) {
            await knex(pre + 'menu').where('id', parseInt(sort[i].id)).update(sort[i])
        }
        ctx.success({data: post})
    }
}

function getSub(data, parentId) {
    
    let sub = []
    for (let i in data) {
        if (data[i].parent_id === parentId) {
            sub.push(data[i])
        }
    }
    
    return sub
}