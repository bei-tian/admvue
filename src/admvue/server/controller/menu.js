module.exports ={
  async index(ctx) {
    let list = await query('SELECT id,icon,name,parent_id,url from menu');
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
  
  
  async add(ctx) {
    ctx.response.body = 'add';
  
    //await 读取数据库
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