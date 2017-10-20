module.exports = async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");//处理跨域
  //错误处理函数
  ctx.error = ({ msg, data, status,error }) => {
    ctx.status= status || 400;
    ctx.body = { code: -200, msg, data, error };
  }
  
  //接口成功输出
  ctx.success = ({ msg , data}) => {
    ctx.response.type = 'json';
    ctx.body = { code: 200, msg, data };
  }
  await next()
}