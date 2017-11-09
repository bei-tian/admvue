const knex = require('../lib/knex');
const pre = knex.prefix

module.exports = {
    async index(ctx) {
        let page = parseInt(ctx.query.page)
    
        let where = function () {
            if (ctx.query.name) this.where('name', 'like', '%' + ctx.query.name + '%')
        }
    
        let list = await knex(pre + 'admin_role')
            .where(where)
            .limit(10).offset((page - 1) * 10)
        let total = await knex(pre + 'admin_role').where(where).count('* as num')
        total = total[0].num
        
        ctx.success({data: {list, total}})
    },
    async info(ctx) {
        let id = parseInt(ctx.query.id)
        let info = await knex(pre + 'admin_role').where({id:id})
        ctx.success({data: {info: info[0]}})
    },
    
    async save(ctx) {
        let post = ctx.request.body
        
        if (post.id) {
            await knex(pre + 'admin_role').where('id',parseInt(post.id)).update(post)
        } else {
            await knex(pre + 'admin_role').insert(post)
        }
        ctx.success({data: post})
    },
    
    async del(ctx) {
        let post = ctx.request.body
        await knex(pre + 'admin_role').where('id',parseInt(post.id)).del()
        ctx.success({data: post})
    },
    
    async privilegeSave(ctx) {
        let post = ctx.request.body
        await knex(pre + 'admin_role').where('id',parseInt(post.id)).update(post)
        ctx.success({data: post})
    },
    
    
    async privilege(ctx) {
        let id = parseInt(ctx.query.id)
        let info = await knex(pre + 'admin_role').select('privilege').where({id:id})
        let privilege = []
        if (info[0]) {
            if (info[0].privilege)
                privilege = info[0].privilege.split(',')
        }
        let list = await knex(pre + 'menu').select('id','name as title','parent_id').orderBy('sort','asc')
        for (let i in list) {
            if (privilege.includes(list[i].id.toString())) {
                list[i].checked = true
            }
        }
        
        
        let nav = getSub(list, 0)
        for (let i in nav) {
            let menu = getSub(list, nav[i].id)
            for (let j in menu) {
                menu[j].expand = true
                menu[j].children = getSub(list, menu[j].id)
            }
            nav[i].expand = true
            nav[i].children = menu
        }
        
        ctx.success({data: nav})
    },
    
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