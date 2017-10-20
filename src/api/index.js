import axios from 'axios';

let base = 'http://localhost:3000';


export const getMenu = params => { return axios.get(`${base}/menu/index`, { params: params }); };
