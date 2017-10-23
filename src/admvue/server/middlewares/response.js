module.exports = async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");//处理跨域
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  ctx.set("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");

  //错误处理函数
  ctx.error = ({ msg, data, status,error }) => {
    ctx.status= status || 400;
    ctx.body = { code: -200, msg, data, error };
  }
  
  //接口成功输出
  ctx.success = ({ msg , data}) => {
    ctx.response.type = 'json';
    ctx.body = { code: 200, msg, data:data };
  }
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    }
  }
}