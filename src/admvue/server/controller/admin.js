const admin ={
  async login(ctx) {
    ctx.response.body = 'login';
    const res = await query('SELECT * from member where id = ?',[1]);
    
    console.log(res)
    //await 读取数据库的promise对象
  },
  
  
  async add(ctx) {
    ctx.response.body = 'add';
  
    //await 读取数据库
  }
}

module.exports = admin