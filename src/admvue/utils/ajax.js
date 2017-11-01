import reqwest from 'reqwest';
import Cookie from '../utils/Cookie'

const baseUrl = 'http://localhost:3000';
export function ajax(url, param, callback, type) {
    let token = '';
    const adm_login_id = Cookie.get("adm_login_id");
    if(adm_login_id > 0) {
        token = token + '&login_id='+  Cookie.get("adm_login_id") +'&token='+ Cookie.get("token");
    }
    url = baseUrl + url + token;
    if(url.indexOf('?') === -1) {
        url = url.replace('&','?');
    }
    reqwest({
        url: url,
        method: type,
        crossOrigin: true,
        data: param,
        success: function (ret) {
            if (ret.code === 200) {
                callback(ret.data);
            } else {
                if(ret.msg === '登陆超时，请重新登陆') {
                    Cookie.delete('adm_login_id')
                    location.reload()
                } else {
                    alert(ret.msg);
                }
            }
        }
    });
}

export function get(url, param, callback) {
    ajax(url, param, callback, 'GET');
}
export function post(url, param, callback) {
    ajax(url, param, callback, 'POST');
}
