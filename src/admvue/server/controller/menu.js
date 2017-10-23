module.exports ={
  async index(ctx) {
    let list = await db.query('SELECT id,icon,name,parent_id,url from '+ db.prefix +'menu');
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
  
  
  async edit(ctx) {
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
  }
}


function getSub(data, parentId) {
  let nav = [
    {icon:'folder', name:'UI示例', menu:[
      {icon:'folder', name:'内容管理',sub:[
        {name:'文章管理',url:'/login'},
        {name:'评论管理',url:'/login2'},
      ]},
      {icon:'locked', name:'用户管理',sub:[
        {name:'新增用户'},
        {name:'活跃用户'},
      ]},
    ]},
    
    
    {icon:'locked', name:'页面示例', menu:[
      {icon:'folder', name:'内容管理2',sub:[
        {name:'文章管理2',url:'/login3'},
        {name:'评论管理2'},
      ]},
      {icon:'locked', name:'用户管理2',sub:[
        {name:'新增用户2'},
        {name:'活跃用户'},
      ]},
    ]},
    {icon:'clipboard', name:'表格示例'},
    {icon:'gear-a', name:'UI示例'},
  ]
  let sub = []
  for(let i in data) {
    if(data[i].parent_id === parentId) {
      sub.push(data[i])
    }
  }
  
  return sub
}