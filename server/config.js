module.exports = {
    md5Hash: 'DI389K23K21K403L2GS2', //密码加密方式 md5(md5(password)+md5Hash)
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'admvue'
    },
    pool: { min: 0, max: 7 },
    prefix: 'adm_',
    // debug: true
}
