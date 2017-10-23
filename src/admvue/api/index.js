import reqwest from 'reqwest';



const baseUrl = 'http://localhost:3000';
function ajax(url,param,callback,type){
  reqwest({
    url: url ,
    method: type,
    crossOrigin: true,
    data: param,
    success: function(ret){
      if(ret.code === 200){
        callback(ret.data);
      } else {
        alert('error:'+ ret.msg);
      }
    }
  });
}

function get(url,param,callback) {
  ajax(baseUrl + url,param,callback,'GET');
}
function post(url,param,callback) {
  ajax(baseUrl + url,param,callback,'POST');
}


//export const getMenu = (params,callback) => { get('/menu/index',params,callback) }
export const getMenu = callback => { get('/menu/index',{},callback) }
export const editMenu = (params,callback) => { post('/menu/edit',params,callback) }
export const delMenu = (params,callback) => { post('/menu/del',params,callback) }
