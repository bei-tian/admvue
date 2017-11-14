const config = require('../config')
const md5 = require('../utils/md5')

const knex = require('../lib/knex');
const pre = knex.prefix

module.exports = {
    async index(ctx) {
        let page = parseInt(ctx.query.page)
        let role_id = parseInt(ctx.query.role_id)
        let username = ctx.query.username
        let where = function () {
            if (role_id > 0) this.where('role_id', role_id)
            if (username) this.where('username', 'like', '%' + username + '%')
        }
    
        let list = await knex(pre + 'admin as a')
            .select('a.id','a.username','a.create_time','b.name as role')
            .where(where)
            .join(pre + 'admin_role as b', 'role_id', 'b.id')
            .orderBy('a.id', 'asc')
            .limit(10)
            .offset((page - 1) * 10)
        
        let total = await knex(pre + 'admin as a').where(where).count('* as num')
        total = total[0].num
        
        
        let role = await knex(pre + 'admin_role')
        
        
        ctx.success({data: {list, total, role}})
    },
    async info(ctx) {
        let id = parseInt(ctx.query.id)
        let info = await knex(pre + 'admin')
            .select('id','username','role_id')
            .where('id',id)
        let role = await knex(pre + 'admin_role')
        ctx.success({data: {info: info[0], roleList: role}})
    },
    
    async save(ctx) {
        let post = ctx.request.body
        if (post.password) {
            post.password = md5(md5(post.password) + config.md5Hash)
        } else {
            delete post.password
        }
        if (post.id) {
            await knex(pre + 'admin').where('id',parseInt(post.id)).update(post)
        } else {
            await knex(pre + 'admin').insert(post)
        }
        ctx.success({data: post})
    },
    
    async del(ctx) {
        let post = ctx.request.body
        await knex(pre + 'admin').where('id',parseInt(post.id)).del()
        ctx.success({data: post})
    },
    
    
    async login(ctx) {
        let post = ctx.request.body
        post.password = md5(md5(post.password) + config.md5Hash)
        let info = await knex(pre + 'admin').where(post)
        let admin = info[0]
        if (admin) {
            let D = new Date()
            let time = D.toLocaleString()
            await knex(pre + 'admin').where('id',admin.id).update({login_time: time})
            
            let token = md5(admin.id + admin.username + admin.password + time)
            ctx.success({data: {id: admin.id, token: token}})
        } else {
            ctx.error({msg: '账号或密码错误'})
        }
    },
    
    async my(ctx) {
        let login_id = parseInt(ctx.query.login_id)
        let info = await knex(pre + 'admin as a')
            .select('a.id','a.username','a.login_time','b.name as role')
            .where('a.id',login_id)
            .join(pre + 'admin_role as b', 'role_id', 'b.id')

        info = info[0]
        info.login_time = info.login_time.toLocaleString()
        ctx.success({data: {info}})
    },
    
    
    async setPwd(ctx) {
        let login_id = parseInt(ctx.query.login_id)
        
        let info = await knex(pre + 'admin').select('id','username','role_id','password').where('id',login_id)
        let post = ctx.request.body
        if (md5(md5(post.oldPass) + config.md5Hash) === info[0].password) {
            await knex(pre + 'admin').where('id',login_id).update({password: md5(md5(post.newPass) + config.md5Hash)})
            ctx.success({})
        } else {
            ctx.error({msg: '原密码错误'})
        }
    },
}
