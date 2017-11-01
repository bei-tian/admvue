
module.exports = {
    async index(ctx) {
        let page = parseInt(ctx.query.page)
        let values = []
        let sql = 'SELECT ' +
            '* ' +
            'from ' +
            '' + db.prefix + 'admin_role ' +
            'where 1 '
        if (ctx.query.name) {
            sql = sql + ' AND name like ? '
            values.push('%'+ctx.query.name+'%')
        }
    
        let total = await db.query(sql.replace('*','count(*) as num'), values);
        total = total[0].num
        
        sql= sql + 'order by id asc '
        sql= sql + 'limit '+ ((page-1)*10) +', 10'
        let list = await db.query(sql, values);
        
        ctx.success({data: {list,total}})
    },
    async info(ctx) {
        let id = parseInt(ctx.query.id)
        let info = await db.query('SELECT * from ' + db.prefix + 'admin_role where id=' + id);
        ctx.success({data: {info:info[0]}})
    },
    
    async save(ctx) {
        let post = ctx.request.body

        if (post.id) {
            await db.save('admin_role', post, 'id=' + parseInt(post.id))
        } else {
            await db.add('admin_role', post)
        }
        ctx.success({data: post})
    },
    
    async del(ctx) {
        let post = ctx.request.body
        await db.delete('admin_role', 'id=' + parseInt(post.id))
        ctx.success({data: post})
    },
    
    async privilegeSave(ctx) {
        let post = ctx.request.body
        await db.save('admin_role', post, 'id=' + parseInt(post.id))
        ctx.success({data: post})
    },
    
    
    async privilege(ctx) {
        let id = parseInt(ctx.query.id)
        let info = await db.query('SELECT privilege from ' + db.prefix + 'admin_role where id=' + id);
        let privilege = []
        if(info[0].privilege) {
            privilege = info[0].privilege.split(',')
        }
        let list = await db.query('SELECT id,name as title,parent_id from '+ db.prefix +'menu order by sort asc,id asc');
        for(let i in list) {
            if(privilege.includes(list[i].id.toString())) {
                list[i].checked = true
            }
        }
        
        
        let nav = getSub(list, 0)
        for(let i in nav) {
            let menu = getSub(list, nav[i].id)
            for(let j in menu) {
                menu[j].expand = true
                menu[j].children = getSub(list, menu[j].id)
            }
            nav[i].expand = true
            nav[i].children = menu
        }
        
        ctx.success({data:nav})
    },
    
}



function getSub(data, parentId) {
    
    let sub = []
    for(let i in data) {
        if(data[i].parent_id === parentId) {
            sub.push(data[i])
        }
    }
    
    return sub
}