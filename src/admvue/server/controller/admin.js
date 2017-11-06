const config = require('../../../config/config')
const md5 = require('../utils/md5')

module.exports = {
    async index(ctx) {
        let page = parseInt(ctx.query.page)
        let role_id = parseInt(ctx.query.role_id)
        let username = ctx.query.username
        let values = []
        let sql = 'SELECT ' +
            'a.id,a.username,a.create_time,b.name as role ' +
            'from ' +
            '' + db.prefix + 'admin a,' + db.prefix + 'admin_role b ' +
            'where a.role_id = b.id '
        if (role_id > 0) {
            sql = sql + ' AND role_id = ? '
            values.push(role_id)
        }
        if (username) {
            sql = sql + ' AND username like ? '
            values.push('%'+username+'%')
        }
        
        
        let total = await db.query(sql.replace('a.id,a.username,a.create_time,b.name as role','count(*) as num'), values);
        total = total[0].num
        
        sql = sql + 'order by a.id asc '
        sql = sql + 'limit '+ ((page-1)*10) +', 10'
        let list = await db.query(sql, values);
        
        let role = await db.query('SELECT * from ' + db.prefix + 'admin_role')
        ctx.success({data: {list, total, role}})
    },
    async info(ctx) {
        let id = parseInt(ctx.query.id)
        let info = await db.query('SELECT id,username,role_id from ' + db.prefix + 'admin where id=' + id);
        let role = await db.query('SELECT * from ' + db.prefix + 'admin_role')
        ctx.success({data: {info:info[0],roleList:role}})
    },
    
    async save(ctx) {
        let post = ctx.request.body
        if(post.password) {
            post.password = md5(md5(post.password)+ config.md5Hash)
        } else {
            delete post.password
        }
        if (post.id) {
            await db.save('admin', post, 'id=' + parseInt(post.id))
        } else {
            await db.add('admin', post)
        }
        ctx.success({data: post})
    },
    
    async del(ctx) {
        let post = ctx.request.body
        await db.delete('admin', 'id=' + parseInt(post.id))
        ctx.success({data: post})
    },
    
    
    async login(ctx) {
        let post = ctx.request.body
        post.password = md5(md5(post.password)+ config.md5Hash)
        let info = await db.query('SELECT * from ' + db.prefix + 'admin where username=? and password=?',[post.username,post.password])
        let admin = info[0]
        if(admin) {
            let D = new Date()
            let time = D.toLocaleString()
            await db.save('admin', {login_time:time}, 'id=' + parseInt(admin.id))
            
            let token = md5(admin.id + admin.username + admin.password + time)
            ctx.success({data: {id:admin.id,token:token}})
        } else {
            ctx.error({msg: '账号或密码错误'})
        }
    },
    
    async my(ctx) {
        let login_id = parseInt(ctx.query.login_id)
        let info = await db.query('SELECT a.id,username,login_time,name as role from ' + db.prefix + 'admin a ,' + db.prefix + 'admin_role b  where a.role_id = b.id and a.id=' + login_id);
        info = info[0]
        info.login_time = info.login_time.toLocaleString()
        ctx.success({data: {info}})
    },
    
    
    async setPwd(ctx) {
        let login_id = parseInt(ctx.query.login_id)
        let info = await db.query('SELECT id,username,role_id from ' + db.prefix + 'admin where id=' + login_id);
        let post = ctx.request.body
        if(md5(md5(post.oldPass)+ config.md5Hash) === info[0].password) {
            
            await db.save('admin', {password: md5(md5(post.newPass)+ config.md5Hash)}, 'id=' + login_id)
            ctx.success({})
        } else {
            ctx.error({msg: '原密码错误'})
        }
    },
}
