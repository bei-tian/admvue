import axios from 'axios';

let api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000
});

let get = (url, params, callback) => {
  api.get(url, { params })
    .then(response => {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}

let post = (url, params, callback) => {
  api.post(url, { params })
    .then(response => {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}

//export const getMenu = (params,callback) => { get('/menu/index',params,callback) }
export const getMenu = callback => { get('/menu/index',{},callback) }
export const addMenu = (params,callback) => { post('/menu/add',params,callback) }
