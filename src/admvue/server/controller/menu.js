module.exports ={
    async index(ctx) {
        let list = await db.query('SELECT id,icon,name,parent_id,url from '+ db.prefix +'menu order by sort asc,id asc');
        let nav = getSub(list, 0)
        
        for(let i in nav) {
            let menu = getSub(list, nav[i].id)
            for(let j in menu) {
                menu[j].sub = getSub(list, menu[j].id)
            }
            nav[i].menu = menu
        }
        
        ctx.success({data:nav})
    },
    
    
    
    
    async save(ctx) {
        let post = ctx.request.body
        if(post.id) {
            await db.save('menu', post, 'id='+ parseInt(post.id))
        } else {
            await db.add('menu', post)
        }
        ctx.success({data:post})
    },
    
    async del(ctx) {
        let post = ctx.request.body
        await db.delete('menu', 'id='+ parseInt(post.id))
        ctx.success({data:post})
    },
    
    
    async sort(ctx) {
        let post = ctx.request.body
        let sort = post.sort
        for(let i in sort) {
            await db.save('menu',sort[i], 'id='+ parseInt(sort[i].id))
        }
        //await db.delete('menu', 'id='+ parseInt(post.id))
        ctx.success({data:post})
    }
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